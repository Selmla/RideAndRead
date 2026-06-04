const canNativeShare = typeof navigator !== "undefined" && !!navigator.share;

const NoScreen = ({ data }) => {
  const replyText = `Not this time — but some stories take time to begin. — ${data.to}`;

  const sendReply = () => {
    if (canNativeShare) {
      navigator.share({ text: replyText }).catch(() => {});
    } else {
      const phone = data.phone.replace(/\s+/g, "");
      const separator = /android/i.test(navigator.userAgent) ? "?" : "&";
      window.location.href = `sms:${phone}${separator}body=${encodeURIComponent(replyText)}`;
    }
  };

  return (
    <div style={{ animation: "fadeUp 0.5s ease both", textAlign: "center", padding: "60px 0" }}>
      <div style={{ fontSize: "32px", marginBottom: "24px", opacity: 0.5 }}>🖤</div>
      <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "28px", color: "#E8E0D0", fontStyle: "italic", margin: "0 0 16px", lineHeight: 1.4 }}>
        Not this chapter.
      </p>
      <p style={{ fontFamily: "'Crimson Text', Georgia, serif", fontSize: "17px", color: "#5A5A5A", lineHeight: 1.7, margin: "0 0 40px" }}>
        {data.from} will understand.<br />Some stories take time to begin.
      </p>

      <div style={{ background: "#111", border: "1px solid #1E1E1E", borderLeft: "3px solid #2A2A2A", borderRadius: "8px", padding: "20px", textAlign: "left" }}>
        <p style={{ fontSize: "10px", letterSpacing: "0.14em", color: "#4A4A4A", textTransform: "uppercase", fontFamily: "Georgia, serif", margin: "0 0 10px" }}>
          Let them know
        </p>
        <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "15px", color: "#5A5A5A", fontStyle: "italic", lineHeight: 1.6, margin: "0 0 16px" }}>
          "{replyText}"
        </p>
        <button onClick={sendReply} style={{
          width: "100%", padding: "14px", background: "transparent", border: "1px solid #2A2A2A",
          borderRadius: "6px", color: "#5A5A5A", fontFamily: "Georgia, serif", fontSize: "11px",
          letterSpacing: "0.14em", textTransform: "uppercase", cursor: "pointer"
        }}>
          {canNativeShare ? "↗ Send reply" : `📱 Send SMS to ${data.from}`}
        </button>
      </div>
    </div>
  );
};

export default NoScreen;
