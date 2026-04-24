"use client";

import { useState } from "react";
import Image from "next/image";
import businessConfig from "@/config/business";
import { buildWhatsAppUrl } from "@/lib/contact";

type Category = "all" | "remodelacion" | "obra" | "mantencion";

type PortfolioItem = {
  image: string;
  label: string;
  title: string;
  cat: Exclude<Category, "all">;
  size: "big" | "small";
};

const ITEMS: PortfolioItem[] = [
  // Nuevos proyectos (más recientes primero)
  { image: "/REFORMAS/IMG-20260422-WA0085.jpg", label: "Remodelación", title: "Proyecto de Reforma", cat: "remodelacion", size: "big" },
  { image: "/REFORMAS/IMG-20260422-WA0083.jpg", label: "Remodelación", title: "Proyecto de Reforma", cat: "remodelacion", size: "small" },
  { image: "/REFORMAS/IMG-20260422-WA0081.jpg", label: "Remodelación", title: "Proyecto de Reforma", cat: "remodelacion", size: "small" },
  { image: "/REFORMAS/IMG-20260422-WA0079.jpg", label: "Remodelación", title: "Proyecto de Reforma", cat: "remodelacion", size: "small" },
  { image: "/REFORMAS/IMG-20260422-WA0077.jpg", label: "Remodelación", title: "Proyecto de Reforma", cat: "remodelacion", size: "small" },
  { image: "/REFORMAS/IMG-20260422-WA0075.jpg", label: "Remodelación", title: "Proyecto de Reforma", cat: "remodelacion", size: "big" },
  { image: "/REFORMAS/IMG-20260422-WA0073.jpg", label: "Remodelación", title: "Proyecto de Reforma", cat: "remodelacion", size: "small" },
  { image: "/REFORMAS/IMG-20260422-WA0070.jpg", label: "Remodelación", title: "Proyecto de Reforma", cat: "remodelacion", size: "small" },
  { image: "/REFORMAS/IMG-20260422-WA0068.jpg", label: "Remodelación", title: "Proyecto de Reforma", cat: "remodelacion", size: "small" },
  { image: "/REFORMAS/IMG-20260422-WA0066.jpg", label: "Remodelación", title: "Proyecto de Reforma", cat: "remodelacion", size: "small" },
  { image: "/REFORMAS/IMG-20260422-WA0064.jpg", label: "Remodelación", title: "Proyecto de Reforma", cat: "remodelacion", size: "big" },
  { image: "/REFORMAS/IMG-20260422-WA0062.jpg", label: "Remodelación", title: "Proyecto de Reforma", cat: "remodelacion", size: "small" },
  { image: "/REFORMAS/IMG-20260422-WA0060.jpg", label: "Remodelación", title: "Proyecto de Reforma", cat: "remodelacion", size: "small" },
  { image: "/REFORMAS/IMG-20260422-WA0048.jpg", label: "Remodelación", title: "Proyecto de Reforma", cat: "remodelacion", size: "small" },
  { image: "/REFORMAS/IMG-20260422-WA0046.jpg", label: "Remodelación", title: "Proyecto de Reforma", cat: "remodelacion", size: "small" },
  // Proyectos anteriores
  { image: "/REFORMAS/refor3.jpg", label: "Obra Nueva", title: "Construcción de Oficina", cat: "obra", size: "big" },
  { image: "/REFORMAS/refor4.jpg", label: "Remodelación", title: "Acabados de Baño", cat: "remodelacion", size: "small" },
  { image: "/REFORMAS/refor5.jpg", label: "Obra Nueva", title: "Estructura Metálica", cat: "obra", size: "small" },
  { image: "/REFORMAS/refor7.jpg", label: "Remodelación", title: "Diseño de Living", cat: "remodelacion", size: "small" },
  { image: "/REFORMAS/refor6.jpg", label: "Mantención", title: "Mantención Fachada", cat: "mantencion", size: "small" },
  { image: "/REFORMAS/refor1.jpg", label: "Remodelación", title: "Remodelación Casa", cat: "remodelacion", size: "big" },
];

const FILTERS: { key: Category; label: string }[] = [
  { key: "all", label: "Todos" },
  { key: "remodelacion", label: "Remodelación" },
  { key: "obra", label: "Obra Nueva" },
  { key: "mantencion", label: "Mantención" },
];

export default function PortfolioSection() {
  const [active, setActive] = useState<Category>("all");

  const visible = ITEMS.filter((item) => active === "all" || item.cat === active);

  return (
    <section id="proyectos" style={{ padding: "56px 0" }}>
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
          Trabajos realizados
        </div>
        <div
          style={{
            fontFamily: "var(--font-poppins)",
            fontWeight: 800,
            fontSize: "clamp(1.4rem,3vw,2rem)",
            marginBottom: 20,
          }}
        >
          Nuestros Proyectos
        </div>

        {/* Filter chips */}
        <div style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 20, paddingBottom: 4 }}>
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              style={{
                flexShrink: 0,
                border: `1px solid ${active === f.key ? "var(--yellow)" : "var(--border2)"}`,
                borderRadius: 20,
                padding: "7px 16px",
                fontSize: "0.78rem",
                fontWeight: 600,
                fontFamily: "var(--font-poppins)",
                background: active === f.key ? "var(--yellow)" : "transparent",
                color: active === f.key ? "#111" : "var(--muted)",
                cursor: "pointer",
                transition: "all .2s",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
          }}
          className="md:!grid-cols-3"
        >
          {visible.map((item, i) => {
            const isBig = i === 0;
            return (
              <div
                key={`${item.image}-${active}`}
                style={{
                  gridColumn: isBig ? "1 / -1" : undefined,
                  aspectRatio: isBig ? "16/7" : "1",
                  position: "relative",
                  borderRadius: "var(--radius-sm)",
                  overflow: "hidden",
                  cursor: "pointer",
                  background: "#222",
                }}
                className={isBig ? "md:!col-span-2" : ""}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes={isBig ? "100vw" : "(max-width:768px) 50vw, 33vw"}
                  style={{ objectFit: "cover", transition: "transform .4s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
                <span
                  style={{
                    position: "absolute",
                    bottom: 8,
                    left: 8,
                    background: "var(--yellow)",
                    color: "#111",
                    fontFamily: "var(--font-poppins)",
                    fontWeight: 700,
                    fontSize: "0.62rem",
                    letterSpacing: 0.5,
                    textTransform: "uppercase",
                    padding: "3px 8px",
                    borderRadius: 4,
                  }}
                >
                  {item.label}
                </span>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0,0,0,.5)",
                    opacity: 0,
                    transition: "opacity .3s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
                >
                  <span
                    style={{
                      color: "#fff",
                      fontFamily: "var(--font-poppins)",
                      fontWeight: 700,
                      fontSize: "0.88rem",
                      textAlign: "center",
                      padding: "0 12px",
                    }}
                  >
                    {item.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <a
          href={buildWhatsAppUrl(businessConfig.contact.whatsapp, "Hola RC Reformas, me gustaria cotizar mi proyecto")}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "block",
            textAlign: "center",
            marginTop: 18,
            border: "1px solid var(--border2)",
            borderRadius: "var(--radius)",
            padding: 14,
            fontFamily: "var(--font-poppins)",
            fontWeight: 600,
            fontSize: "0.9rem",
            color: "var(--text)",
            cursor: "pointer",
            background: "none",
            width: "100%",
            transition: "border-color .2s,color .2s",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--yellow)";
            e.currentTarget.style.color = "var(--yellow)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border2)";
            e.currentTarget.style.color = "var(--text)";
          }}
        >
          Cotiza tu proyecto →
        </a>
      </div>
    </section>
  );
}
