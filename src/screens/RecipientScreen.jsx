import { useState } from "react";
import { ACTIVITIES } from "../constants.js";

const RecipientScreen = ({ data, onYes, onNo }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const activities = data.activities.map(id => ACTIVITIES.find(a => a.id === id)).filter(Boolean);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr + "T12:00:00");
    return d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
  };

  const canSubmit = selectedDate && selectedActivity;

  const cardStyle = (selected) => ({
    padding: "14px 18px", border: `1.5px solid ${selected ? "#6B1E1E" : "#2A2A2A"}`,
    borderRadius: "10px", cursor: "pointer", background: selected ? "rgba(107,30,30,0.2)" : "#111",
    transition: "all 0.2s", display: "flex", alignItems: "center", gap: "12px"
  });

  return (
    <div style={{ animation: "fadeUp 0.5s ease both" }}>
      <div style={{ textAlign: "center", marginBottom: "28px" }}>
        <p style={{ fontSize: "11px", letterSpacing: "0.16em", color: "#6B1E1E", textTransform: "uppercase", fontFamily: "Georgia, serif", margin: "0 0 8px" }}>A request for you</p>
        <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "28px", color: "#E8E0D0", margin: 0, lineHeight: 1.3 }}>
          {data.from} wants to<br />take you on a date.
        </p>
      </div>

      {data.message && (
        <div style={{
          background: "#111", border: "1px solid #222", borderRadius: "12px",
          padding: "22px 20px", marginBottom: "28px", position: "relative"
        }}>
          <p style={{ fontSize: "10px", letterSpacing: "0.14em", color: "#6B1E1E", textTransform: "uppercase", fontFamily: "Georgia, serif", margin: "0 0 12px" }}>
            A message from {data.from}
          </p>
          <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "18px", color: "#C4B89A", fontStyle: "italic", lineHeight: 1.7, margin: 0 }}>
            "{data.message}"
          </p>
        </div>
      )}

      <div style={{ marginBottom: "24px" }}>
        <p style={{ fontSize: "10px", letterSpacing: "0.14em", color: "#6B1E1E", textTransform: "uppercase", fontFamily: "Georgia, serif", margin: "0 0 12px" }}>Pick a date</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {data.dates.map((d, i) => (
            <div key={i} onClick={() => setSelectedDate(d)} style={cardStyle(selectedDate === d)}>
              <div style={{
                width: "20px", height: "20px", borderRadius: "50%", flexShrink: 0,
                border: `2px solid ${selectedDate === d ? "#6B1E1E" : "#333"}`,
                background: selectedDate === d ? "#6B1E1E" : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s"
              }}>
                {selectedDate === d && <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#fff", display: "block" }} />}
              </div>
              <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "17px", color: "#E8E0D0" }}>
                {formatDate(d)}{data.time && `, ${data.time}`}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: "32px" }}>
        <p style={{ fontSize: "10px", letterSpacing: "0.14em", color: "#6B1E1E", textTransform: "uppercase", fontFamily: "Georgia, serif", margin: "0 0 12px" }}>Choose our adventure</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {activities.map(a => (
            <div key={a.id} onClick={() => setSelectedActivity(a)} style={cardStyle(selectedActivity?.id === a.id)}>
              <div style={{
                width: "20px", height: "20px", borderRadius: "50%", flexShrink: 0,
                border: `2px solid ${selectedActivity?.id === a.id ? "#6B1E1E" : "#333"}`,
                background: selectedActivity?.id === a.id ? "#6B1E1E" : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s"
              }}>
                {selectedActivity?.id === a.id && <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#fff", display: "block" }} />}
              </div>
              <span style={{ fontSize: "18px" }}>{a.emoji}</span>
              <span style={{ fontFamily: "'Crimson Text', Georgia, serif", fontSize: "16px", color: "#E8E0D0", lineHeight: 1.3 }}>{a.label}</span>
            </div>
          ))}
        </div>
      </div>

      <button onClick={() => canSubmit && onYes(selectedDate, selectedActivity)} style={{
        width: "100%", padding: "18px", background: canSubmit ? "#6B1E1E" : "#1A1A1A",
        border: `1px solid ${canSubmit ? "#6B1E1E" : "#2A2A2A"}`, borderRadius: "8px",
        color: canSubmit ? "#E8E0D0" : "#4A4A4A", fontFamily: "Georgia, serif", fontSize: "14px",
        letterSpacing: "0.12em", textTransform: "uppercase", cursor: canSubmit ? "pointer" : "default",
        transition: "all 0.3s", marginBottom: "12px"
      }}>
        I'm in 🖤
      </button>

      {!canSubmit && <p style={{ textAlign: "center", fontSize: "12px", color: "#4A4A4A", fontFamily: "'Crimson Text', Georgia, serif", fontStyle: "italic", margin: "0 0 12px" }}>
        Pick a date and an adventure first
      </p>}

      <button onClick={onNo} style={{
        width: "100%", padding: "14px", background: "transparent",
        border: "1px solid #2A2A2A", borderRadius: "8px",
        color: "#5A5A5A", fontFamily: "Georgia, serif", fontSize: "12px",
        letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer"
      }}>
        Not this time...
      </button>
    </div>
  );
};

export default RecipientScreen;
