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
  const fmt = d => `${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
  const end = new Date(dt.getTime() + 2 * 60 * 60 * 1000);
  return [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Ride&Read//EN",
    "BEGIN:VEVENT",
    `DTSTART:${fmt(dt)}`, `DTEND:${fmt(end)}`,
    `SUMMARY:${activity} with ${senderName}`,
    `DESCRIPTION:A date arranged via Ride & Read. ${recipientName} said yes.`,
    "END:VEVENT", "END:VCALENDAR"
  ].join("\r\n");
}
