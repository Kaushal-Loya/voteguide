export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { accessToken, events } = req.body;

  if (!accessToken || !events || !Array.isArray(events)) {
    return res.status(400).json({ error: "Access token and events array are required" });
  }

  try {
    const results = [];
    for (const event of events) {
      // TODO: Replace the API key in .env.local before running.
      // See README.md > Google Services Used for setup instructions.
      const response = await fetch(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(event),
        }
      );

      const data = await response.json();
      results.push(data);
    }

    res.status(200).json({ success: true, results });
  } catch (error) {
    console.error("Calendar API error:", error);
    res.status(500).json({ error: "Failed to create calendar events" });
  }
}
