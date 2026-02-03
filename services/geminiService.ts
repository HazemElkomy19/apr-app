
import { Message, Sender } from "../types";

export const getGeminiResponse = async (
  message: string, 
  history: Message[], 
  attachments: { data: string; mimeType: string }[] = []
): Promise<string> => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        history: history.map(msg => ({
          sender: msg.sender === Sender.USER ? 'user' : 'model',
          text: msg.text
        })),
        attachments
      })
    });

    const data = await response.json();

    if (!response.ok) {
      if (data.error === 'QUOTA_EXHAUSTED') {
        throw new Error('QUOTA_EXHAUSTED');
      }
      throw new Error('GENERIC_ERROR');
    }

    return data.text || "I'm sorry, I couldn't process that request.";
  } catch (error: any) {
    console.error("API Error:", error);
    
    if (error.message === 'QUOTA_EXHAUSTED') {
      throw error;
    }
    
    throw new Error('GENERIC_ERROR');
  }
};
