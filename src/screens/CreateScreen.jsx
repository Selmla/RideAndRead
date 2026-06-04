import { useState } from "react";
import ActivityDropdown from "../components/ActivityDropdown.jsx";
import { encodeRequest } from "../utils.js";

const today = new Date().toISOString().split("T")[0];

const CreateScreen = ({ onNext }) => {
  const [form, setForm] = useState({
    from: "", to: "", phone: "", dates: ["", "", ""], time: "", activities: [], message: ""
  });
  const [errors, setErrors] = useState({});

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const setDate = (i, val) => {
    const dates = [...form.dates];
    dates[i] = val;
    setForm(f => ({ ...f, dates }));
  };

  const validate = () => {
    const e = {};
    if (!form.from.trim()) e.from = true;
    if (!form.to.trim()) e.to = true;
    if (!form.phone.trim()) e.phone = true;
    if (!form.dates.some(d => d)) e.dates = true;
    if (!form.time) e.time = true;
    if (form.activities.length < 1) e.activities = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const data = { ...form, dates: form.dates.filter(Boolean) };
    const encoded = encodeRequest(data);
    const url = `${window.location.origin}${window.location.pathname}#${encoded}`;
    onNext({ data, url });
  };

  const inputStyle = (err) => ({
    width: "100%", padding: "14px 16px", background: "#181818",
    border: `1px solid ${err ? "#8B2020" : "#383838"}`, borderRadius: "8px",
    color: "#E8E0D0", fontFamily: "'Crimson Text', Georgia, serif", fontSize: "17px",
    outline: "none", boxSizing: "border-box", transition: "border-color 0.2s",
    WebkitAppearance: "none"
  });

  const labelStyle = {
    display: "block", fontSize: "10px", letterSpacing: "0.14em", color: "#C4956A",
    fontFamily: "Georgia, serif", textTransform: "uppercase", marginBottom: "8px"
  };

  return (
    <div style={{ animation: "fadeUp 0.5s ease both" }}>
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "32px", color: "#E8E0D0", margin: "0 0 8px", lineHeight: 1.2 }}>
          Send a Request
        </p>
        <p style={{ fontFamily: "'Crimson Text', Georgia, serif", fontSize: "16px", color: "#8A7A6A", fontStyle: "italic", margin: 0 }}>
          Ink your intentions. Seal the destination.
        </p>
      </div>

      <div style={{ background: "rgba(24,20,16,0.9)", border: "1px solid #2A2A2A", borderRadius: "16px", padding: "28px 24px", display: "flex", flexDirection: "column", gap: "20px" }}>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div>
            <label style={labelStyle}>From</label>
            <input placeholder="Your name" value={form.from} onChange={e => set("from", e.target.value)}
              style={inputStyle(errors.from)} />
          </div>
          <div>
            <label style={labelStyle}>To</label>
            <input placeholder="Their name" value={form.to} onChange={e => set("to", e.target.value)}
              style={inputStyle(errors.to)} />
          </div>
        </div>

        <div>
          <label style={labelStyle}>Your phone number</label>
          <input placeholder="+46 70 000 00 00" type="tel" value={form.phone} onChange={e => set("phone", e.target.value)}
            style={inputStyle(errors.phone)} />
          <p style={{ fontSize: "12px", color: "#686868", fontFamily: "'Crimson Text', Georgia, serif", margin: "6px 0 0", fontStyle: "italic" }}>
            So they can reach you with their answer
          </p>
        </div>

        <div>
          <label style={labelStyle}>Proposed dates — pick up to three</label>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {["First choice", "Second choice", "Third choice"].map((placeholder, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "11px", color: "#686868", width: "12px", fontFamily: "Georgia, serif" }}>{i + 1}</span>
                <input type="date" value={form.dates[i]} min={today} onChange={e => setDate(i, e.target.value)}
                  style={{ ...inputStyle(i === 0 && errors.dates), flex: 1, colorScheme: "dark" }} />
              </div>
            ))}
          </div>
        </div>

        <div>
          <label style={labelStyle}>Suggested time</label>
          <input type="time" value={form.time} onChange={e => set("time", e.target.value)}
            style={{ ...inputStyle(errors.time), colorScheme: "dark" }} />
        </div>

        <div>
          <label style={labelStyle}>Choose our adventure <span style={{ color: "#686868", textTransform: "none", letterSpacing: 0 }}>— select up to 5</span></label>
          <ActivityDropdown selected={form.activities} onChange={v => set("activities", v)} />
          {errors.activities && <p style={{ fontSize: "12px", color: "#8B2020", margin: "6px 0 0", fontFamily: "Georgia, serif" }}>Please select at least one activity</p>}
        </div>

        <div>
          <label style={labelStyle}>A message for them <span style={{ color: "#686868", textTransform: "none", letterSpacing: 0 }}>— optional</span></label>
          <textarea placeholder="Words from the soul..." value={form.message} onChange={e => set("message", e.target.value)}
            rows={4} style={{ ...inputStyle(false), resize: "none", lineHeight: 1.6 }} />
        </div>

        <button onClick={handleSubmit} style={{
          width: "100%", padding: "18px", background: "#6B1E1E", border: "none", borderRadius: "8px",
          color: "#E8E0D0", fontFamily: "Georgia, serif", fontSize: "12px", letterSpacing: "0.16em",
          textTransform: "uppercase", cursor: "pointer", marginTop: "8px",
          transition: "background 0.2s, transform 0.1s",
        }}
          onMouseEnter={e => e.target.style.background = "#7D2222"}
          onMouseLeave={e => e.target.style.background = "#6B1E1E"}
          onMouseDown={e => e.target.style.transform = "scale(0.99)"}
          onMouseUp={e => e.target.style.transform = "scale(1)"}
        >
          Seal with a kiss
        </button>
        <p style={{ textAlign: "center", fontSize: "11px", color: "#585858", fontFamily: "Georgia, serif", letterSpacing: "0.1em", margin: "-12px 0 0", fontStyle: "italic" }}>
          A private arrangement between two souls
        </p>
      </div>
    </div>
  );
};

export default CreateScreen;
