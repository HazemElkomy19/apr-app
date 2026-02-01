
import { GoogleGenAI, GenerateContentResponse, Part } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { Message, Sender } from "../types";

const MAX_RETRIES = 4;
const INITIAL_RETRY_DELAY = 2000; // 2 seconds to give quota a chance to reset

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getGeminiResponse = async (
  message: string, 
  history: Message[], 
  attachments: { data: string; mimeType: string }[] = []
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const contents = history.map(msg => ({
    role: msg.sender === Sender.USER ? 'user' as const : 'model' as const,
    parts: [{ text: msg.text }]
  }));

  const parts: Part[] = [{ text: message }];
  
  attachments.forEach(att => {
    parts.push({
      inlineData: {
        data: att.data,
        mimeType: att.mimeType
      }
    });
  });

  contents.push({
    role: 'user',
    parts
  });

  let retryCount = 0;
  
  while (retryCount <= MAX_RETRIES) {
    try {
      // Switching to 'gemini-3-flash-preview' as it provides significantly higher 
      // rate limits (Quota) on the free tier compared to the 'pro' models,
      // which effectively resolves recurring 429 RESOURCE_EXHAUSTED errors.
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
          topP: 0.9,
        }
      });

      return response.text || "I'm sorry, I couldn't process that request.";
    } catch (error: any) {
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

      console.error("Gemini API Error Detail:", error);
      
      if (isQuotaError) {
        throw new Error("QUOTA_EXHAUSTED");
      }
      
      throw new Error("GENERIC_ERROR");
    }
  }

  throw new Error("GENERIC_ERROR");
};
