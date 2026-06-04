const StepDots = ({ current, total }) => (
  <div style={{ display: "flex", gap: "8px", justifyContent: "center", margin: "24px 0" }}>
    {Array.from({ length: total }, (_, i) => (
      <div key={i} style={{
        width: i === current ? "24px" : "6px", height: "6px",
        borderRadius: "3px", transition: "all 0.4s ease",
        background: i === current ? "#6B1E1E" : i < current ? "#C4956A" : "#2A2A2A"
      }} />
    ))}
  </div>
);

export default StepDots;
