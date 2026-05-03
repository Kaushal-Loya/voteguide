import { translateText } from "../../lib/googleTranslate";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text, targetLang } = req.body;

  if (!text || !targetLang) {
    return res.status(400).json({ error: "Text and targetLang are required" });
  }

  try {
    const translatedText = await translateText(text, targetLang);
    res.status(200).json({ translatedText });
  } catch (error) {
    console.error("Translate API error:", error);
    res.status(500).json({ error: "Failed to translate text" });
  }
}
