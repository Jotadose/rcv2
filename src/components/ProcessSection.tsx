const steps = [
  {
    num: "1",
    title: "Cotiza gratis",
    desc: "Escríbenos por WhatsApp o el formulario. Respondemos en menos de 24 horas.",
  },
  {
    num: "2",
    title: "Visita técnica",
    desc: "Evaluamos tu espacio y entregamos un presupuesto detallado sin costo.",
  },
  {
    num: "3",
    title: "Aprueba el plan",
    desc: "Materiales, plazos y pago por escrito. Sin cambios inesperados.",
  },
  {
    num: "4",
    title: "¡Disfruta!",
    desc: "Entregamos a tiempo con garantía de satisfacción en cada trabajo.",
  },
];

export default function ProcessSection() {
  return (
    <section id="nosotros" style={{ padding: "56px 0", background: "var(--surface)" }}>
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
          ¿Cómo trabajamos?
        </div>
        <div
          style={{
            fontFamily: "var(--font-poppins)",
            fontWeight: 800,
            fontSize: "clamp(1.4rem,3vw,2rem)",
            marginBottom: 6,
          }}
        >
          Proceso Simple
        </div>
        <div style={{ color: "var(--muted)", fontSize: "0.9rem", marginBottom: 28 }}>
          Sin sorpresas, sin letra chica.
        </div>

        <div
          style={{ display: "flex", flexDirection: "column", gap: 0 }}
          className="md:!flex-row"
        >
          {steps.map((step, i) => (
            <div
              key={step.num}
              style={{
                display: "flex",
                gap: 16,
                position: "relative",
                flex: 1,
              }}
              className="md:!flex-col md:!items-center md:!text-center md:!gap-3"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <>
                  {/* Mobile vertical */}
                  <div
                    className="md:hidden"
                    style={{
                      position: "absolute",
                      left: 19,
                      top: 40,
                      bottom: -8,
                      width: 1,
                      background: "linear-gradient(to bottom,var(--yellow),transparent)",
                    }}
                  />
                  {/* Desktop horizontal */}
                  <div
                    className="hidden md:block"
                    style={{
                      position: "absolute",
                      top: 19,
                      left: "calc(50% + 30px)",
                      right: "calc(-50% + 30px)",
                      height: 1,
                      background: "linear-gradient(to right,var(--yellow),transparent)",
                    }}
                  />
                </>
              )}

              <div
                style={{
                  flexShrink: 0,
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: "var(--yellow)",
                  color: "#111",
                  fontFamily: "var(--font-poppins)",
                  fontWeight: 800,
                  fontSize: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid rgba(255,214,0,.3)",
                  boxShadow: "0 0 0 6px var(--yellow-dim)",
                  marginTop: 2,
                  zIndex: 1,
                }}
                className="md:!mx-auto md:!mt-0"
              >
                {step.num}
              </div>

              <div style={{ paddingBottom: 28 }} className="md:!pb-0">
                <h3
                  style={{
                    fontFamily: "var(--font-poppins)",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    marginBottom: 5,
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ fontSize: "0.8rem", color: "var(--muted)", lineHeight: 1.55 }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
