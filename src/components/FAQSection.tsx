"use client";

import { useState } from "react";

const faqs = [
  {
    q: "¿Hacen cotizaciones gratuitas?",
    a: "Sí, siempre. Contáctanos por WhatsApp o el formulario y en menos de 24 horas te entregamos un presupuesto detallado sin costo.",
  },
  {
    q: "¿En qué zonas trabajan?",
    a: "Principalmente en La Serena, Coquimbo y comunas cercanas de la Región de Coquimbo. Para proyectos fuera de la región, contáctanos para evaluar.",
  },
  {
    q: "¿Tienen garantía en sus trabajos?",
    a: "Sí. Todos nuestros trabajos cuentan con garantía de satisfacción. Si algo no quedó como acordamos, lo solucionamos sin costo adicional.",
  },
  {
    q: "¿Cuánto demora una remodelación?",
    a: "Depende del alcance. Un baño puede tomar 5–10 días, una remodelación integral 4–8 semanas. Te damos plazos exactos en la cotización.",
  },
  {
    q: "¿Cómo son los pagos?",
    a: "Trabajamos con un anticipo al inicio y cuotas según el avance de obra. Todo por escrito antes de comenzar. Aceptamos transferencia y efectivo.",
  },
];

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" style={{ padding: "56px 0", background: "var(--surface)" }}>
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
          Preguntas frecuentes
        </div>
        <div
          style={{
            fontFamily: "var(--font-poppins)",
            fontWeight: 800,
            fontSize: "clamp(1.4rem,3vw,2rem)",
            marginBottom: 28,
          }}
        >
          FAQ
        </div>

        <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", flexDirection: "column", gap: 8 }}>
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                style={{
                  background: "var(--surface2)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-sm)",
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 18,
                    cursor: "pointer",
                    fontFamily: "var(--font-poppins)",
                    fontWeight: 600,
                    fontSize: "0.92rem",
                    gap: 12,
                    background: "none",
                    border: "none",
                    color: "var(--text)",
                    width: "100%",
                    textAlign: "left",
                  }}
                >
                  {faq.q}
                  <span
                    style={{
                      flexShrink: 0,
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      border: `1.5px solid ${isOpen ? "var(--yellow)" : "var(--border2)"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: isOpen ? "#111" : "var(--muted)",
                      fontSize: "1rem",
                      transition: "all .3s",
                      background: isOpen ? "var(--yellow)" : "transparent",
                    }}
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                <div
                  style={{
                    maxHeight: isOpen ? 200 : 0,
                    overflow: "hidden",
                    transition: "max-height .35s cubic-bezier(.4,0,.2,1)",
                    padding: isOpen ? "0 18px 18px" : "0 18px",
                    fontSize: "0.84rem",
                    color: "var(--muted)",
                    lineHeight: 1.7,
                  }}
                >
                  {faq.a}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
