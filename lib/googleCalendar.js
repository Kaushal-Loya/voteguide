/**
 * Generates an ICS file content for one or more events
 * @param {Array} events - List of events {title, description, date}
 * @returns {string} ICS file content
 */
export function generateMultiEventICS(events) {
  const formatDate = (dateObj) => {
    return dateObj.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  };

  const icsLines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//VoteGuide AI//Election Assistant//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH"
  ];

  events.forEach(event => {
    const startDate = formatDate(event.date);
    const endDateObj = new Date(event.date.getTime() + 60 * 60 * 1000); // 1 hour event
    const endDate = formatDate(endDateObj);

    icsLines.push(
      "BEGIN:VEVENT",
      `UID:${Date.now()}-${Math.random().toString(36).substr(2, 9)}@voteguide.ai`,
      `DTSTAMP:${formatDate(new Date())}`,
      `DTSTART:${startDate}`,
      `DTEND:${endDate}`,
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description}`,
      "END:VEVENT"
    );
  });

  icsLines.push("END:VCALENDAR");

  return icsLines.join("\r\n");
}

/**
 * Triggers a download of an ICS file with multiple events
 * @param {Array} events - List of events {title, description, date}
 */
export function downloadMultiEventICS(events) {
  const icsContent = generateMultiEventICS(events);
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute("download", "Election_Reminders.ics");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
