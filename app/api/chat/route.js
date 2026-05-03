import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { translateText } from "../../../lib/googleTranslate";

export async function POST(req) {
  try {
    const { message, context } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY || "YOUR_GEMINI_API_KEY_HERE";
    if (apiKey === "YOUR_GEMINI_API_KEY_HERE") {
      return NextResponse.json({ 
        response: "This is a placeholder response. Please configure GEMINI_API_KEY in .env.local to see real AI responses." 
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const systemPrompt = `You are VoteGuide AI, an assistant helping Indian citizens with the election process.
Context about the current user:
- Age: ${context?.age || "Unknown"}
- Location: ${context?.location?.district || "Unknown"}, ${context?.location?.state || "Unknown"}
- Registered to vote: ${context?.isRegistered === true ? "Yes" : context?.isRegistered === false ? "No" : "Unknown"}

Instructions:
1. Always base your answers on standard Indian Election Commission (ECI) rules.
2. If the user is under 18, gently remind them they are not eligible to vote yet, but educate them for the future.
3. If they are >= 18 and NOT registered, guide them on how to register (Form 6, NVSP portal).
4. If they are >= 18 and registered, help them with polling day queries (Voter ID, finding booths, EVM).
5. Keep your answers concise, clear, and easy to understand.
6. Do NOT ask for personally identifiable information.`;

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: systemPrompt }],
        },
        {
          role: "model",
          parts: [{ text: "Understood. I will act as VoteGuide AI and follow these instructions." }],
        },
      ],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    let text = response.text();

    // If a language is specified and it's not English, translate the response
    const targetLang = context?.language;
    if (targetLang && targetLang !== "en") {
      try {
        text = await translateText(text, targetLang);
      } catch (transError) {
        console.error("AI Translation Error:", transError);
      }
    }

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: error.message || error.toString() }, { status: 500 });
  }
}
