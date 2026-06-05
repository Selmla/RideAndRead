import { generateICS } from "../utils.js";

const ConfirmedScreen = ({ data, date, activity }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr + "T12:00:00");
    return d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
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
        background: "#F0EBE0", borderRadius: "16px", padding: "48px 32px 40px",
        margin: "0 0 28px", position: "relative", overflow: "hidden"
      }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 0%, rgba(107,30,30,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "42px", color: "#1A1210", fontStyle: "italic", margin: "0 0 8px", lineHeight: 1.1 }}>
          It's a date.
        </p>
        <div style={{ width: "40px", height: "1px", background: "#9A8A7A", margin: "16px auto" }} />
        <p style={{ fontFamily: "'Crimson Text', Georgia, serif", fontSize: "18px", color: "#3A2A1A", lineHeight: 1.8, margin: "0 0 32px" }}>
          {activity.emoji} <strong>{activity.label}</strong><br />
          <strong>{formatDate(date)}</strong>{data.time && ` at ${data.time}`}
        </p>
        <button onClick={downloadICS} style={{
          padding: "14px 24px", background: "#6B1E1E", border: "none", borderRadius: "6px",
          color: "#E8E0D0", fontFamily: "Georgia, serif", fontSize: "11px", letterSpacing: "0.14em",
          textTransform: "uppercase", cursor: "pointer", width: "100%"
        }}>
          Add to calendar
        </button>
      </div>

      <p style={{ fontFamily: "'Crimson Text', Georgia, serif", fontSize: "15px", color: "#585858", fontStyle: "italic", lineHeight: 1.7, margin: 0 }}>
        {data.from} & {data.to}<br />
        <span style={{ fontSize: "13px", color: "#484848" }}>A night arranged in silence.</span>
      </p>
    </div>
  );
};

export default ConfirmedScreen;
