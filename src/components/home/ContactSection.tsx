"use client";

import businessConfig from "@/config/business";
import { buildWhatsAppUrl } from "@/lib/contact";
import LeadForm from "@/components/home/LeadForm";

const WA_ICON = (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.558 4.14 1.532 5.876L.054 23.25a.75.75 0 00.916.916l5.374-1.478A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.946 0-3.77-.503-5.352-1.384l-.383-.22-3.99 1.097 1.098-3.988-.22-.383A9.953 9.953 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--yellow)" strokeWidth="1.8">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.08 1.18 2 2 0 012.07 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
);
const MailIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--yellow)" strokeWidth="1.8">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const PinIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--yellow)" strokeWidth="1.8">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export default function ContactSection() {
  const { contact, location } = businessConfig;
  const waUrl = buildWhatsAppUrl(contact.whatsapp, "Hola, me gustaria cotizar un proyecto.");

  return (
    <section id="contacto" style={{ background: "var(--surface)", padding: "56px 0" }}>
      <div style={{ maxWidth: "var(--max)", margin: "0 auto", padding: "0 20px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 40,
          }}
          className="md:!grid-cols-2 md:!gap-[60px] md:!items-start"
        >
          {/* Left */}
          <div>
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
              Habla con nosotros
            </div>
            <div
              style={{
                fontFamily: "var(--font-poppins)",
                fontWeight: 800,
                fontSize: "clamp(1.4rem,3vw,2rem)",
                marginBottom: 6,
              }}
            >
              Cotiza tu Proyecto
            </div>
            <div style={{ color: "var(--muted)", fontSize: "0.9rem", marginBottom: 24 }}>
              Sin compromiso. Te respondemos hoy.
            </div>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                background: "var(--green)",
                color: "#fff",
                borderRadius: "var(--radius)",
                padding: "18px 22px",
                width: "100%",
                marginBottom: 16,
                boxShadow: "0 12px 32px rgba(37,211,102,.28)",
                transition: "transform .2s",
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {WA_ICON}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-poppins)",
                    fontWeight: 700,
                    fontSize: "1.05rem",
                  }}
                >
                  Escribir por WhatsApp
                </div>
                <span style={{ fontSize: "0.75rem", opacity: 0.8 }}>
                  {contact.whatsapp} · Respuesta rápida
                </span>
              </div>
            </a>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
              {[
                { icon: <PhoneIcon />, text: contact.phone },
                { icon: <MailIcon />, text: contact.email },
                { icon: <PinIcon />, text: `${location.city} · ${location.region}, Chile` },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    fontSize: "0.85rem",
                    color: "var(--muted)",
                  }}
                >
                  {item.icon}
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div>
            <LeadForm variant="inline" />
          </div>
        </div>
      </div>
    </section>
  );
}
