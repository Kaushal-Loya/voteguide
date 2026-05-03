/**
 * Generates an ICS file content for an event
 * @param {string} title - Event title
 * @param {string} description - Event description
 * @param {Date} date - Event date
 * @returns {string} ICS file content
 */
export function generateICS(title, description, date) {
  const formatDate = (dateObj) => {
    return dateObj.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  };

  const startDate = formatDate(date);
  const endDateObj = new Date(date.getTime() + 60 * 60 * 1000); // 1 hour event
  const endDate = formatDate(endDateObj);

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `DTSTART:${startDate}`,
    `DTEND:${endDate}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

/**
 * Triggers a download of an ICS file
 * @param {string} title - Event title
 * @param {string} description - Event description
 * @param {Date} date - Event date
 */
export function downloadICS(title, description, date) {
  const icsContent = generateICS(title, description, date);
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute("download", `${title.replace(/\s+/g, "_")}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
