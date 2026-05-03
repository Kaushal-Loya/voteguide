import { GoogleGenerativeAI } from "@google/generative-ai";

// Rate limiting map
const ipMap = new Map();
const RATE_LIMIT = 20; // 20 requests
const WINDOW_MS = 60 * 1000; // 1 minute

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Rate limiting check
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown";
  const now = Date.now();
  const userRate = ipMap.get(ip) || { count: 0, firstRequest: now };

  if (now - userRate.firstRequest > WINDOW_MS) {
    userRate.count = 1;
    userRate.firstRequest = now;
  } else {
    userRate.count++;
  }
  ipMap.set(ip, userRate);

  if (userRate.count > RATE_LIMIT) {
    return res.status(429).json({ error: "Too many requests" });
  }

  const { message, context } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  // TODO: Replace the API key in .env.local before running.
  // See README.md > Google Services Used for setup instructions.
  const apiKey = process.env.GEMINI_API_KEY || "YOUR_GEMINI_API_KEY_HERE";
  
  if (apiKey === "YOUR_GEMINI_API_KEY_HERE") {
    return res.status(200).json({ 
      response: "This is a placeholder response. Please configure GEMINI_API_KEY to see real AI responses." 
    });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const systemPrompt = `You are VoteGuide AI, an election education assistant for Indian voters. The current user is ${context?.age || 'unknown'} years old, located in ${context?.location?.district || 'unknown'}, ${context?.location?.state || 'unknown'}, and is ${context?.isRegistered ? 'registered' : 'not registered'} to vote. Answer all questions clearly and in simple language. Stay focused on the Indian election process only.`;

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: systemPrompt }]
        },
        {
          role: "model",
          parts: [{ text: "Understood. I will act as VoteGuide AI." }]
        }
      ],
    });

    const result = await chat.sendMessage(message);
    const responseText = result.response.text();

    res.status(200).json({ response: responseText });
  } catch (error) {
    console.error("Chat API error:", error);
    res.status(500).json({ error: "Failed to fetch response" });
  }
}
