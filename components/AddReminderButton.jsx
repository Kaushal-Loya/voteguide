"use client";

import React, { useState } from "react";
import { downloadICS } from "../lib/googleCalendar";
import { Button } from "./ui/button";
import { Calendar } from "lucide-react";

export default function AddReminderButton() {
  const [loading, setLoading] = useState(false);

  const handleAddReminders = () => {
    // Fallback directly to ICS download as OAuth requires active client ID setup
    // TODO: Replace the API key in .env.local before running.
    // See README.md > Google Services Used for setup instructions.
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_CLIENT_ID || "YOUR_GOOGLE_CALENDAR_CLIENT_ID_HERE";
    
    const events = [
      {
        title: "Voter Registration Deadline",
        description: "Last day to register to vote for the upcoming elections.",
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      },
      {
        title: "Election Day — Go Vote!",
        description: "Today is election day. Remember to carry your Voter ID (EPIC) to the polling booth.",
        date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      }
    ];

    if (clientId === "YOUR_GOOGLE_CALENDAR_CLIENT_ID_HERE") {
      // Fallback to ICS
      events.forEach(event => {
        downloadICS(event.title, event.description, event.date);
      });
      alert("Calendar credentials not found. Downloading .ics files instead.");
      return;
    }

    // In a real OAuth flow, we would redirect to Google's OAuth 2.0 endpoint here
    // e.g. window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}...`;
    // For this demonstration, we'll download ICS as the immediate fallback
    events.forEach(event => {
      downloadICS(event.title, event.description, event.date);
    });
    alert("Downloaded calendar reminders!");
  };

  return (
    <Button 
      onClick={handleAddReminders} 
      disabled={loading}
      className="flex items-center gap-2"
      aria-label="Add Election Reminders to Calendar"
    >
      <Calendar className="w-4 h-4" />
      {loading ? "Adding..." : "Add Reminders"}
    </Button>
  );
}
