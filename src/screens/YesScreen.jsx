import { generateICS } from "../utils.js";

const canNativeShare = typeof navigator !== "undefined" && !!navigator.share;

const YesScreen = ({ data, date, activity }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr + "T12:00:00");
    return d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
  };

  const replyText = `I'm in! I'd love to ${activity.label.toLowerCase()} on ${formatDate(date)}. — ${data.to}`;

  const sendReply = () => {
    if (canNativeShare) {
      navigator.share({ text: replyText }).catch(() => {});
    } else {
      const phone = data.phone.replace(/\s+/g, "");
      const separator = /android/i.test(navigator.userAgent) ? "?" : "&";
      window.location.href = `sms:${phone}${separator}body=${encodeURIComponent(replyText)}`;
    }
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

      <div style={{ background: "#181818", border: "1px solid #2A2A2A", borderLeft: "3px solid #6B1E1E", borderRadius: "8px", padding: "20px", marginBottom: "20px", textAlign: "left" }}>
        <p style={{ fontSize: "10px", letterSpacing: "0.14em", color: "#C4956A", textTransform: "uppercase", fontFamily: "Georgia, serif", margin: "0 0 10px" }}>
          Send your answer
        </p>
        <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "15px", color: "#C4B89A", fontStyle: "italic", lineHeight: 1.6, margin: "0 0 16px" }}>
          "{replyText}"
        </p>
        <button onClick={sendReply} style={{
          width: "100%", padding: "14px", background: "#6B1E1E", border: "none", borderRadius: "6px",
          color: "#E8E0D0", fontFamily: "Georgia, serif", fontSize: "11px", letterSpacing: "0.14em",
          textTransform: "uppercase", cursor: "pointer"
        }}>
          {canNativeShare ? "↗ Send reply" : `📱 Send SMS to ${data.from}`}
        </button>
        {!canNativeShare && (
          <p style={{ fontSize: "11px", color: "#585858", fontFamily: "Georgia, serif", margin: "10px 0 0", textAlign: "center", fontStyle: "italic" }}>
            Works best on mobile
          </p>
        )}
      </div>
    </div>
  );
};

export default YesScreen;
