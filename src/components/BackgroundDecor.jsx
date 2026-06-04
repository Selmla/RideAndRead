const BackgroundDecor = () => (
  <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
    <span style={{
      position: "absolute", top: "-20px", right: "-30px",
      fontSize: "280px", opacity: 0.045, filter: "blur(2px)",
      transform: "rotate(-18deg)", lineHeight: 1, userSelect: "none"
    }}>📖</span>

    <span style={{
      position: "absolute", bottom: "60px", left: "-40px",
      fontSize: "240px", opacity: 0.04, filter: "blur(2.5px)",
      transform: "rotate(15deg)", lineHeight: 1, userSelect: "none"
    }}>🌹</span>

    <span style={{
      position: "absolute", top: "42%", right: "-20px",
      fontSize: "200px", opacity: 0.03, filter: "blur(3px)",
      transform: "rotate(-8deg)", lineHeight: 1, userSelect: "none"
    }}>🏍️</span>
  </div>
);

export default BackgroundDecor;
