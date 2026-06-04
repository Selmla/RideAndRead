const NoScreen = ({ senderName }) => (
  <div style={{ animation: "fadeUp 0.5s ease both", textAlign: "center", padding: "60px 0" }}>
    <div style={{ fontSize: "32px", marginBottom: "24px", opacity: 0.5 }}>🖤</div>
    <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "28px", color: "#E8E0D0", fontStyle: "italic", margin: "0 0 16px", lineHeight: 1.4 }}>
      Not this chapter.
    </p>
    <p style={{ fontFamily: "'Crimson Text', Georgia, serif", fontSize: "17px", color: "#5A5A5A", lineHeight: 1.7, margin: 0 }}>
      {senderName} will understand.<br />Some stories take time to begin.
    </p>
  </div>
);

export default NoScreen;
