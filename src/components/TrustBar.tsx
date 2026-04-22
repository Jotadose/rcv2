import businessConfig from "@/config/business";

const items = [
  { num: `+${businessConfig.stats.yearsExperience}`, label: "Años de exp." },
  { num: `+${businessConfig.stats.projectsCompleted}`, label: "Proyectos" },
  { num: `${businessConfig.stats.clientSatisfaction}%`, label: "Satisfacción" },
  { num: "24h", label: "Respuesta" },
];

export default function TrustBar() {
  return (
    <div style={{ background: "var(--yellow)", padding: "14px 0" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          maxWidth: "var(--max)",
          margin: "0 auto",
          padding: "0 20px",
        }}
      >
        {items.map((item) => (
          <div key={item.label} style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: "var(--font-poppins)",
                fontWeight: 800,
                fontSize: "clamp(1.1rem,3vw,1.6rem)",
                color: "#111",
                lineHeight: 1,
              }}
            >
              {item.num}
            </div>
            <div
              style={{
                fontSize: "clamp(0.58rem,1.5vw,0.75rem)",
                color: "rgba(0,0,0,.6)",
                marginTop: 2,
                fontWeight: 500,
              }}
            >
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
