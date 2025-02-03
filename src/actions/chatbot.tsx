"use server";

import { features, ITR_FORM_RECOMMENDATION } from "@/constants";
import { OpenAI } from "openai";

// Initialize Groq API with the correct base URL
const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY, // Ensure this is correctly set in your environment variables
  baseURL: "https://api.groq.com/openai/v1", // ✅ Corrected API base URL
});

// Server Action for Chatbot
export async function chatWithGroq(userMessage: string, chatbot: string) {
  try {
    // Define system prompt for AI behavior
    const list = features.find((f) => f.href === `${chatbot}`)
    console.log(list);
    
    const systemPrompt = list?.prompt || ITR_FORM_RECOMMENDATION ;

    // Make API request to Groq AI
    const response = await groq.chat.completions.create({
      model: "mixtral-8x7b-32768", // Use a supported Groq model
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      temperature: 0.7,
    });

    // Extract and return AI response
    return response.choices?.[0]?.message?.content || "Sorry, I couldn't understand that.";
  } catch (error: any) {
    console.error("Groq API Error:", error);
    return error?.message || "An error occurred while processing your request.";
  }
}
