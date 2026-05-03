"use client";

import React, { useState } from "react";
import { downloadMultiEventICS } from "../lib/googleCalendar";
import { Button } from "./ui/button";
import { Calendar } from "lucide-react";
import { toast } from "sonner";

export default function AddReminderButton() {
  const [loading, setLoading] = useState(false);

  const handleAddReminders = () => {
    setLoading(true);
    
    const events = [
      {
        title: "Voter Registration Deadline",
        description: "Last day to register to vote for the upcoming elections. Check ECI portal.",
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 
      },
      {
        title: "Election Day — Go Vote!",
        description: "Today is election day. Remember to carry your Voter ID (EPIC) to the polling booth.",
        date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), 
      }
    ];

    try {
      downloadMultiEventICS(events);
      toast.success("Calendar reminders downloaded!", {
        description: "Import the .ics file into your Google Calendar or Outlook.",
        duration: 5000,
      });
    } catch (error) {
      toast.error("Failed to generate reminders.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleAddReminders} 
      disabled={loading}
      className="rounded-2xl px-6 h-12 font-bold bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all active:scale-95 flex items-center gap-2"
      aria-label="Add Election Reminders to Calendar"
    >
      <Calendar className="w-5 h-5" />
      {loading ? "Preparing..." : "Add Reminders"}
    </Button>
  );
}
