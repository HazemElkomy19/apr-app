import { GoogleGenAI } from '@google/genai';
import { SYSTEM_INSTRUCTION, MAX_RETRIES, INITIAL_RETRY_DELAY } from '../config/serverConfig.js';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, history, attachments } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured on server' });
    }

    const ai = new GoogleGenAI({ apiKey });

    // Build contents array from history
    const contents = (history || []).map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    // Add current message with attachments
    const parts = [{ text: message }];
    
    if (attachments && attachments.length > 0) {
      attachments.forEach(att => {
        parts.push({
          inlineData: {
            data: att.data,
            mimeType: att.mimeType
          }
        });
      });
    }

    contents.push({
      role: 'user',
      parts
    });

    let retryCount = 0;
    
    while (retryCount <= MAX_RETRIES) {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
            topP: 0.9,
          }
        });

        return res.status(200).json({ 
          text: response.text || "I'm sorry, I couldn't process that request." 
        });
      } catch (error) {
        const isQuotaError = 
          error?.message?.includes("429") || 
          error?.status === 429 || 
          error?.message?.includes("RESOURCE_EXHAUSTED") ||
          error?.message?.includes("quota");
        
        if (isQuotaError && retryCount < MAX_RETRIES) {
          retryCount++;
          const delay = INITIAL_RETRY_DELAY * Math.pow(2, retryCount - 1);
          console.warn(`Quota exhausted. Retrying in ${delay}ms... (Attempt ${retryCount}/${MAX_RETRIES})`);
          await sleep(delay);
          continue;
        }

        console.error("Gemini API Error:", error);
        
        if (isQuotaError) {
          return res.status(429).json({ error: 'QUOTA_EXHAUSTED' });
        }
        
        return res.status(500).json({ error: 'GENERIC_ERROR' });
      }
    }

    return res.status(500).json({ error: 'GENERIC_ERROR' });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'GENERIC_ERROR' });
  }
}
