export function generateInviteId() {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

export function encodeRequest(data) {
  try {
    return btoa(unescape(encodeURIComponent(JSON.stringify(data))));
  } catch { return null; }
}

export function decodeRequest(str) {
  try {
    return JSON.parse(decodeURIComponent(escape(atob(str))));
  } catch { return null; }
}

export function generateICS(senderName, recipientName, activity, date, time) {
  const dt = new Date(`${date}T${time || "19:00"}:00`);
  const pad = n => String(n).padStart(2, "0");
  const fmtUTC = d => `${d.getUTCFullYear()}${pad(d.getUTCMonth()+1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;
  const end = new Date(dt.getTime() + 2 * 60 * 60 * 1000);
  return [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Ride&Read//EN",
    "BEGIN:VEVENT",
    `DTSTART:${fmtUTC(dt)}`, `DTEND:${fmtUTC(end)}`,
    `SUMMARY:${activity} with ${senderName}`,
    `DESCRIPTION:A date arranged via Ride & Read. ${recipientName} said yes.`,
    "END:VEVENT", "END:VCALENDAR"
  ].join("\r\n");
}
