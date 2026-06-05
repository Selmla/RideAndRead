import { useState } from "react";

const canNativeShare = typeof navigator !== "undefined" && !!navigator.share;

const LinkScreen = ({ data, url, onBack }) => {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    const success = () => { setCopied(true); setTimeout(() => setCopied(false), 2500); };
    const fallback = () => {
      const el = document.createElement("textarea");
      el.value = url; el.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(el); el.focus(); el.select();
      document.execCommand("copy"); document.body.removeChild(el);
      success();
    };
    navigator.clipboard ? navigator.clipboard.writeText(url).then(success).catch(fallback) : fallback();
  };

  const share = () => {
    navigator.share({
      title: "Someone wants to take you on a date 🖤",
      text: `${data.from} wants to take you on a date — open to find out more.`,
      url,
    }).catch(() => {});
  };

  return (
    <div style={{ animation: "fadeUp 0.5s ease both", textAlign: "center", position: "relative" }}>
      {copied && (
        <div style={{
          position: "fixed", top: "24px", left: "50%", transform: "translateX(-50%)",
          background: "#1A3A1A", border: "1px solid #4A8A4A", borderRadius: "8px",
          padding: "12px 24px", color: "#8ACA8A", fontFamily: "Georgia, serif",
          fontSize: "13px", letterSpacing: "0.1em", zIndex: 9999,
          boxShadow: "0 8px 32px rgba(0,0,0,0.6)", whiteSpace: "nowrap",
          animation: "fadeUp 0.2s ease both"
        }}>
          ✓ Link copied to clipboard
        </div>
      )}

      <p style={{ fontSize: "11px", letterSpacing: "0.16em", color: "#C4956A", textTransform: "uppercase", fontFamily: "Georgia, serif", margin: "0 0 8px" }}>Consignment ready</p>
      <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "30px", color: "#E8E0D0", margin: "0 0 32px", lineHeight: 1.2 }}>Your request is ready.</p>

      <div style={{
        background: "#F0EBE0", borderRadius: "12px", padding: "40px 32px 32px", margin: "0 0 24px",
        position: "relative", overflow: "hidden"
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 20% 80%, rgba(107,30,30,0.06) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ fontSize: "28px", marginBottom: "20px", opacity: 0.4 }}>📖</div>
        <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "24px", color: "#1A1210", lineHeight: 1.4, margin: "0 0 16px", fontStyle: "italic" }}>
          {data.from} wants to<br />take you on a date.
        </p>
        <div style={{ width: "40px", height: "1px", background: "#9A8A7A", margin: "0 auto 16px" }} />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
          <span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: "#6B1E1E", animation: "pulse 1.8s ease-in-out infinite" }} />
          <p style={{ fontSize: "11px", letterSpacing: "0.12em", color: "#7A6A5A", fontFamily: "Georgia, serif", textTransform: "uppercase", margin: 0 }}>
            Waiting for {data.to}
          </p>
        </div>
        <style>{`@keyframes pulse { 0%,100%{opacity:0.3;transform:scale(0.8)} 50%{opacity:1;transform:scale(1)} }`}</style>
      </div>

      {canNativeShare ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
          <button onClick={share} style={{
            width: "100%", padding: "18px", background: "#6B1E1E", border: "1px solid #6B1E1E",
            borderRadius: "8px", color: "#E8E0D0", fontFamily: "Georgia, serif", fontSize: "12px",
            letterSpacing: "0.14em", textTransform: "uppercase", cursor: "pointer",
            transition: "all 0.3s", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px"
          }}>
            <span style={{ fontSize: "16px" }}>↗</span> Send invitation
          </button>
          <button onClick={copy} style={{
            width: "100%", padding: "14px", background: "transparent",
            border: `1px solid ${copied ? "#4A8A4A" : "#383838"}`, borderRadius: "8px",
            color: copied ? "#8ACA8A" : "#707070", fontFamily: "Georgia, serif", fontSize: "12px",
            letterSpacing: "0.14em", textTransform: "uppercase", cursor: "pointer",
            transition: "all 0.3s", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px"
          }}>
            <span style={{ fontSize: "14px" }}>{copied ? "✓" : "⎘"}</span>
            {copied ? "Copied!" : "Copy link instead"}
          </button>
        </div>
      ) : (
        <button onClick={copy} style={{
          width: "100%", padding: "18px", background: copied ? "#2A4A2A" : "#6B1E1E",
          border: `1px solid ${copied ? "#4A8A4A" : "#6B1E1E"}`, borderRadius: "8px",
          color: "#E8E0D0", fontFamily: "Georgia, serif", fontSize: "12px",
          letterSpacing: "0.14em", textTransform: "uppercase", cursor: "pointer",
          transition: "all 0.3s", marginBottom: "16px", display: "flex",
          alignItems: "center", justifyContent: "center", gap: "10px"
        }}>
          <span style={{ fontSize: "16px" }}>{copied ? "✓" : "⎘"}</span>
          {copied ? "Copied!" : "Copy link"}
        </button>
      )}

      <p style={{ fontSize: "11px", color: "#585858", fontFamily: "Georgia, serif", letterSpacing: "0.08em", background: "#181818", border: "1px solid #2A2A2A", borderRadius: "6px", padding: "10px 14px", lineHeight: 1.6, marginBottom: "10px" }}>
        🔒 This link contains private details — only share it directly with {data.to}
      </p>

      <button onClick={onBack} style={{
        background: "none", border: "none", color: "#686868", fontFamily: "Georgia, serif",
        fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer",
        display: "flex", alignItems: "center", gap: "8px", margin: "24px auto 0"
      }}>
        ← Return to form
      </button>
    </div>
  );
};

export default LinkScreen;
