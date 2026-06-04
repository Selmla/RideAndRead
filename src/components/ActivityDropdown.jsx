import { useState, useEffect } from "react";
import { ACTIVITIES, VIBE_LABELS } from "../constants.js";

const ActivityDropdown = ({ selected, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useState(() => ({ current: null }))[0];
  const grouped = ["booktok", "biker", "both"].map(v => ({
    vibe: v, items: ACTIVITIES.filter(a => a.vibe === v)
  }));

  const toggle = (id) => {
    if (selected.includes(id)) onChange(selected.filter(s => s !== id));
    else if (selected.length < 5) onChange([...selected, id]);
  };

  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div ref={el => ref.current = el} style={{ position: "relative" }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", padding: "14px 18px", background: "#252525",
        border: `1px solid ${open ? "#6B1E1E" : "#454545"}`, borderRadius: "8px",
        color: "#E8E0D0", fontFamily: "'Crimson Text', Georgia, serif", fontSize: "16px",
        cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center",
        transition: "border-color 0.2s"
      }}>
        <span>{selected.length === 0 ? "Choose up to 5 adventures..." : `${selected.length}/5 selected`}</span>
        <span style={{ color: "#C4956A", transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "none" }}>▾</span>
      </button>

      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0, zIndex: 100,
          background: "#1E1E1E", border: "1px solid #383838", borderRadius: "8px",
          maxHeight: "360px", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.8)"
        }}>
          {selected.length >= 5 && (
            <div style={{ padding: "10px 16px", borderBottom: "1px solid #383838", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, background: "#1E1E1E", zIndex: 1 }}>
              <span style={{ fontSize: "12px", color: "#C4956A", fontFamily: "Georgia, serif", fontStyle: "italic" }}>5/5 — uncheck to swap</span>
              <button onClick={() => setOpen(false)} style={{
                background: "#6B1E1E", border: "none", borderRadius: "4px", color: "#E8E0D0",
                fontFamily: "Georgia, serif", fontSize: "10px", letterSpacing: "0.1em",
                textTransform: "uppercase", padding: "6px 12px", cursor: "pointer"
              }}>Done ✓</button>
            </div>
          )}
          {grouped.map(({ vibe, items }) => (
            <div key={vibe}>
              <div style={{ padding: "10px 16px 6px", fontSize: "10px", letterSpacing: "0.12em", color: "#C4956A", fontFamily: "Georgia, serif", textTransform: "uppercase" }}>
                {VIBE_LABELS[vibe]}
              </div>
              {items.map(a => {
                const isSelected = selected.includes(a.id);
                const isDisabled = !isSelected && selected.length >= 5;
                return (
                  <div key={a.id} onClick={() => !isDisabled && toggle(a.id)} style={{
                    padding: "12px 16px", display: "flex", alignItems: "center", gap: "12px",
                    cursor: isDisabled ? "not-allowed" : "pointer", opacity: isDisabled ? 0.35 : 1,
                    background: isSelected ? "rgba(107,30,30,0.25)" : "transparent",
                    transition: "background 0.15s", borderBottom: "1px solid #2A2A2A"
                  }}>
                    <div style={{
                      width: "18px", height: "18px", borderRadius: "4px", flexShrink: 0,
                      border: `1.5px solid ${isSelected ? "#6B1E1E" : "#555"}`,
                      background: isSelected ? "#6B1E1E" : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all 0.15s"
                    }}>
                      {isSelected && <span style={{ color: "#fff", fontSize: "11px", lineHeight: 1 }}>✓</span>}
                    </div>
                    <span style={{ fontSize: "14px" }}>{a.emoji}</span>
                    <span style={{ color: "#E8E0D0", fontFamily: "'Crimson Text', Georgia, serif", fontSize: "15px" }}>{a.label}</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {selected.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "12px" }}>
          {selected.map(id => {
            const a = ACTIVITIES.find(x => x.id === id);
            return (
              <span key={id} onClick={() => toggle(id)} style={{
                padding: "6px 12px", background: "rgba(107,30,30,0.3)", border: "1px solid #6B1E1E",
                borderRadius: "20px", color: "#E8E0D0", fontSize: "13px", cursor: "pointer",
                fontFamily: "'Crimson Text', Georgia, serif", display: "flex", alignItems: "center", gap: "6px"
              }}>
                {a.emoji} {a.label.split(" — ")[0].split(" or ")[0]}
                <span style={{ color: "#C4956A", fontWeight: 700, marginLeft: "2px" }}>×</span>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ActivityDropdown;
