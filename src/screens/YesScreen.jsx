import { generateICS } from "../utils.js";

const YesScreen = ({ data, date, activity }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr + "T12:00:00");
    return d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
  };

  const sendSMS = () => {
    const msg = encodeURIComponent(`I'm in! I'd love to ${activity.label.toLowerCase()} on ${formatDate(date)}. — ${data.to}`);
    const phone = data.phone.replace(/\s+/g, "");
    window.location.href = `sms:${phone}&body=${msg}`;
  };

  const downloadICS = () => {
    const ics = generateICS(data.from, data.to, activity.label, date, data.time);
    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "ride-and-read-date.ics"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ animation: "fadeUp 0.5s ease both", textAlign: "center" }}>
      <div style={{
        background: "#F0EBE0", borderRadius: "16px", padding: "48px 32px", margin: "0 0 28px", position: "relative", overflow: "hidden"
      }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 0%, rgba(107,30,30,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "38px", color: "#1A1210", fontStyle: "italic", margin: "0 0 20px" }}>
          It's a date.
        </p>
        <p style={{ fontFamily: "'Crimson Text', Georgia, serif", fontSize: "18px", color: "#3A2A1A", lineHeight: 1.7, margin: "0 0 28px" }}>
          We'll go <strong>{activity.emoji} {activity.label}</strong><br />on <strong>{formatDate(date)}</strong>{data.time && ` at ${data.time}`}.
        </p>
        <button onClick={downloadICS} style={{
          padding: "14px 24px", background: "#6B1E1E", border: "none", borderRadius: "6px",
          color: "#E8E0D0", fontFamily: "Georgia, serif", fontSize: "11px", letterSpacing: "0.14em",
          textTransform: "uppercase", cursor: "pointer", width: "100%"
        }}>
          Download calendar invite
        </button>
      </div>

      <div style={{ background: "#111", border: "1px solid #1E1E1E", borderLeft: "3px solid #6B1E1E", borderRadius: "8px", padding: "20px", marginBottom: "20px", textAlign: "left" }}>
        <p style={{ fontSize: "10px", letterSpacing: "0.14em", color: "#6B1E1E", textTransform: "uppercase", fontFamily: "Georgia, serif", margin: "0 0 10px" }}>
          Send your answer
        </p>
        <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "15px", color: "#C4B89A", fontStyle: "italic", lineHeight: 1.6, margin: "0 0 16px" }}>
          "I'm in! I'd love to {activity.label.toLowerCase()} on {formatDate(date)}. — {data.to}"
        </p>
        <button onClick={sendSMS} style={{
          width: "100%", padding: "14px", background: "#6B1E1E", border: "none", borderRadius: "6px",
          color: "#E8E0D0", fontFamily: "Georgia, serif", fontSize: "11px", letterSpacing: "0.14em",
          textTransform: "uppercase", cursor: "pointer"
        }}>
          📱 Send SMS to {data.from}
        </button>
        <p style={{ fontSize: "11px", color: "#3A3A3A", fontFamily: "Georgia, serif", margin: "10px 0 0", textAlign: "center", fontStyle: "italic" }}>
          Works best on mobile
        </p>
      </div>
    </div>
  );
};

export default YesScreen;
