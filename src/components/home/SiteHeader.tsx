"use client";

import { useState } from "react";
import Image from "next/image";
import businessConfig from "@/config/business";
import { buildWhatsAppUrl } from "@/lib/contact";

const WA_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.558 4.14 1.532 5.876L.054 23.25a.75.75 0 00.916.916l5.374-1.478A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.946 0-3.77-.503-5.352-1.384l-.383-.22-3.99 1.097 1.098-3.988-.22-.383A9.953 9.953 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
  </svg>
);

const navLinks = [
  { href: "#servicios", label: "Servicios" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#faq", label: "FAQ" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const waUrl = buildWhatsAppUrl(businessConfig.contact.whatsapp, "Hola, me gustaria cotizar un proyecto.");

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(17,17,17,0.92)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid var(--border)",
          height: 60,
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "var(--max)",
            margin: "0 auto",
            padding: "0 20px",
          }}
        >
          <a href="#inicio">
            <Image
              src="/REFORMAS/reformaslogoblanco.jpg"
              alt={businessConfig.name}
              width={120}
              height={36}
              className="h-9 w-auto rounded"
              style={{ objectFit: "contain" }}
            />
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontFamily: "var(--font-poppins)",
                  fontWeight: 600,
                  fontSize: "0.88rem",
                  color: "var(--muted)",
                  textDecoration: "none",
                  transition: "color .2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--yellow)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5"
              style={{
                background: "var(--green)",
                color: "#fff",
                border: "none",
                borderRadius: 20,
                padding: "8px 16px",
                fontFamily: "var(--font-poppins)",
                fontWeight: 600,
                fontSize: "0.82rem",
                whiteSpace: "nowrap",
                textDecoration: "none",
              }}
            >
              {WA_ICON} WhatsApp
            </a>

            <button
              className="md:hidden flex flex-col gap-1 p-1"
              style={{ background: "none", border: "none", cursor: "pointer" }}
              onClick={() => setOpen(true)}
              aria-label="Abrir menu"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    display: "block",
                    width: 22,
                    height: 2,
                    background: "var(--text)",
                    borderRadius: 2,
                  }}
                />
              ))}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        onClick={() => setOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99,
          background: "rgba(0,0,0,0.7)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "all" : "none",
          transition: "opacity .3s",
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "75%",
            maxWidth: 280,
            background: "var(--surface)",
            padding: "24px 20px",
            transform: open ? "translateX(0)" : "translateX(100%)",
            transition: "transform .35s cubic-bezier(.4,0,.2,1)",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <button
            onClick={() => setOpen(false)}
            style={{
              background: "none",
              border: "none",
              color: "var(--muted)",
              fontSize: "1.4rem",
              cursor: "pointer",
              alignSelf: "flex-end",
              marginBottom: 16,
            }}
            aria-label="Cerrar menu"
          >
            ✕
          </button>

          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{
                padding: "14px 16px",
                borderRadius: "var(--radius-sm)",
                fontFamily: "var(--font-poppins)",
                fontWeight: 600,
                fontSize: "1rem",
                color: "var(--text)",
                textDecoration: "none",
              }}
            >
              {link.label}
            </a>
          ))}

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            style={{
              marginTop: "auto",
              background: "var(--green)",
              color: "#fff",
              borderRadius: "var(--radius)",
              padding: 14,
              fontFamily: "var(--font-poppins)",
              fontWeight: 700,
              fontSize: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              textDecoration: "none",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.558 4.14 1.532 5.876L.054 23.25a.75.75 0 00.916.916l5.374-1.478A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.946 0-3.77-.503-5.352-1.384l-.383-.22-3.99 1.097 1.098-3.988-.22-.383A9.953 9.953 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
            Cotizar por WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
