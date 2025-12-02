import { GoogleGenAI } from "@google/genai";
import { INITIAL_PRODUCTS } from '../constants';

const getAiClient = () => {
  // In a real app, strict error handling for missing key
  const apiKey = process.env.API_KEY || '';
  return new GoogleGenAI({ apiKey });
};

export const getStylingAdvice = async (userQuery: string, currentContext?: string) => {
  try {
    const ai = getAiClient();
    const productCatalog = INITIAL_PRODUCTS.map(p => `${p.name} ($${p.price})`).join(', ');
    
    const systemInstruction = `You are a high-end streetwear stylist for 'Biggie Trends'. 
    Your tone is cool, youthful, and confident. 
    Recommend outfits based on the user's request. 
    You have access to our catalog: ${productCatalog}.
    If the user asks for something we don't have, suggest a vibe or a similar item from our catalog.
    Keep responses short (under 100 words) and punchy.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userQuery,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Yo, my style circuits are a bit jammed right now. Try again in a sec!";
  }
};