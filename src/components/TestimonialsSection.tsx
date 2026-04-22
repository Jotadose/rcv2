import Image from "next/image";

const testimonials = [
  {
    stars: 5,
    text: "El equipo de RC transformó completamente la fachada de mi casa. Profesionalismo y atención al detalle que superaron mis expectativas. ¡Totalmente recomendados!",
    name: "Ana G.",
    city: "La Serena",
    avatar: "/REFORMAS/refor11.jpg",
  },
  {
    stars: 5,
    text: "Necesitaba mantención rápida para mi local y cumplieron con todo. Mínima interrupción y un trabajo impecable. Gran servicio, los volvería a contratar.",
    name: "Carlos M.",
    city: "Coquimbo",
    initials: "C",
  },
  {
    stars: 5,
    text: "Desde el diseño hasta la ejecución fueron transparentes y comunicativos en todo el proceso. Estamos muy felices con nuestro nuevo hogar.",
    name: "Familia Torres",
    city: "La Serena",
    initials: "T",
  },
];

export default function TestimonialsSection() {
  return (
    <section style={{ padding: "56px 0" }}>
      <div style={{ maxWidth: "var(--max)", margin: "0 auto", padding: "0 20px" }}>
        <div
          style={{
            fontSize: "0.7rem",
            fontWeight: 600,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "var(--yellow)",
            marginBottom: 4,
            fontFamily: "var(--font-poppins)",
          }}
        >
          Lo que dicen
        </div>
        <div
          style={{
            fontFamily: "var(--font-poppins)",
            fontWeight: 800,
            fontSize: "clamp(1.4rem,3vw,2rem)",
            marginBottom: 28,
          }}
        >
          Nuestros Clientes
        </div>

        <div
          style={{
            display: "flex",
            gap: 16,
            overflowX: "auto",
            scrollbarWidth: "none",
            margin: "0 -20px",
            padding: "4px 20px 16px",
          }}
          className="md:!grid md:!grid-cols-3 md:!overflow-visible md:!m-0 md:!p-0"
        >
          {testimonials.map((t) => (
            <div
              key={t.name}
              style={{
                flexShrink: 0,
                minWidth: 270,
                background: "var(--surface2)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: 20,
              }}
              className="md:!min-w-0"
            >
              <div
                style={{
                  color: "var(--yellow)",
                  fontSize: "0.9rem",
                  letterSpacing: 2,
                  marginBottom: 12,
                }}
              >
                {"★".repeat(t.stars)}
              </div>
              <p
                style={{
                  fontSize: "0.84rem",
                  color: "var(--muted)",
                  lineHeight: 1.65,
                  fontStyle: "italic",
                }}
              >
                &ldquo;{t.text}&rdquo;
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginTop: 16,
                  paddingTop: 14,
                  borderTop: "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "2px solid var(--yellow)",
                    flexShrink: 0,
                    background: "#333",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-poppins)",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    color: "var(--yellow)",
                    position: "relative",
                  }}
                >
                  {t.avatar ? (
                    <Image src={t.avatar} alt={t.name} fill style={{ objectFit: "cover" }} />
                  ) : (
                    t.initials
                  )}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-poppins)",
                      fontWeight: 700,
                      fontSize: "0.88rem",
                    }}
                  >
                    {t.name}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--muted)" }}>{t.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
