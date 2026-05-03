/**
 * Calls the Google Translate REST API v2
 * @param {string} text - The text to translate
 * @param {string} targetLang - The target language code
 * @returns {Promise<string>} - The translated text
 */
export async function translateText(text, targetLang) {
  // TODO: Replace the API key in .env.local before running.
  // See README.md > Google Services Used for setup instructions.
  const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY || "YOUR_GOOGLE_TRANSLATE_API_KEY_HERE";
  
  if (!apiKey || apiKey === "YOUR_GOOGLE_TRANSLATE_API_KEY_HERE") {
    // Fallback if no API key
    return text;
  }

  try {
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          q: text,
          target: targetLang,
        }),
      }
    );

    const data = await response.json();
    if (data && data.data && data.data.translations) {
      return data.data.translations[0].translatedText;
    }
    return text;
  } catch (error) {
    console.error("Translation error", error);
    return text;
  }
}
