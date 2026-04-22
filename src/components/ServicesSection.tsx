"use client";

import businessConfig from "@/config/business";
import { buildWhatsAppUrl } from "@/lib/contact";

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  construccion: (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="var(--yellow)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  reformas: (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="var(--yellow)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  ),
  mantenciones: (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="var(--yellow)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
};

export default function ServicesSection() {
  const { services, contact } = businessConfig;

  return (
    <section id="servicios" style={{ padding: "56px 0" }}>
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
          Lo que hacemos
        </div>
        <div
          style={{
            fontFamily: "var(--font-poppins)",
            fontWeight: 800,
            fontSize: "clamp(1.4rem,3vw,2rem)",
            lineHeight: 1.15,
            marginBottom: 6,
          }}
        >
          Nuestros Servicios
        </div>
        <div style={{ color: "var(--muted)", fontSize: "0.9rem", marginBottom: 28 }}>
          Soluciones integrales para cada necesidad de tu espacio.
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: 12,
          }}
          className="md:!grid-cols-3 lg:!grid-cols-4"
        >
          {services.map((service) => (
            <a
              key={service.id}
              href={buildWhatsAppUrl(contact.whatsapp, `Hola RC Reformas, me interesa el servicio de ${service.name}`)}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "var(--surface2)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: 20,
                cursor: "pointer",
                transition: "border-color .2s,transform .2s",
                textDecoration: "none",
                color: "inherit",
                display: "block",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--yellow)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: "var(--yellow-dim)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 12,
                }}
              >
                {SERVICE_ICONS[service.id]}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-poppins)",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  marginBottom: 5,
                }}
              >
                {service.name}
              </h3>
              <p style={{ fontSize: "0.75rem", color: "var(--muted)", lineHeight: 1.5 }}>
                {service.description}
              </p>
            </a>
          ))}

          <a
            href={buildWhatsAppUrl(contact.whatsapp, "Hola RC Reformas, necesito un proyecto personalizado")}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              border: "1px dashed var(--border2)",
              borderRadius: "var(--radius)",
              padding: 20,
              textAlign: "center",
              cursor: "pointer",
              color: "var(--muted)",
              fontSize: "0.85rem",
              transition: "border-color .2s,color .2s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--yellow)";
              e.currentTarget.style.color = "var(--yellow)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border2)";
              e.currentTarget.style.color = "var(--muted)";
            }}
          >
            Ver todos los servicios →
          </a>
        </div>
      </div>
    </section>
  );
}
