
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export async function getCourseAdvice(query: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: query,
      config: {
        systemInstruction: "You are an expert golf concierge in Vietnam. Recommend the best courses based on location, difficulty, and prestige. Keep answers concise and helpful.",
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to the concierge service. Please try again later.";
  }
}
