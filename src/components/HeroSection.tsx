"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import businessConfig from "@/config/business";
import { buildWhatsAppUrl } from "@/lib/contact";

const WA_ICON = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.558 4.14 1.532 5.876L.054 23.25a.75.75 0 00.916.916l5.374-1.478A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.946 0-3.77-.503-5.352-1.384l-.383-.22-3.99 1.097 1.098-3.988-.22-.383A9.953 9.953 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
  </svg>
);

const slides = [
  {
    image: "/REFORMAS/refor1.jpg",
    badge: "📍 La Serena · Coquimbo",
    title: "Calidad y confianza",
    titleHighlight: "en cada detalle",
    subtitle:
      "Expertos en reformas y construcciones. Transformamos tus espacios con profesionalismo y los mejores materiales.",
  },
  {
    image: "/REFORMAS/refor3.jpg",
    badge: "🏗️ Obra Nueva",
    title: "Construimos tus",
    titleHighlight: "sueños desde cero",
    subtitle:
      "Estructuras sólidas, plazos cumplidos y transparencia total en cada etapa de tu proyecto.",
  },
  {
    image: "/REFORMAS/refor13.jpg",
    badge: "🏠 Remodelación",
    title: "Transformamos",
    titleHighlight: "tus espacios",
    subtitle:
      "Remodelaciones integrales con los mejores materiales y acabados de primera calidad.",
  },
];

const AUTOPLAY_MS = 4500;

export default function HeroSection() {
  const [cur, setCur] = useState(0);
  const touchStartX = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const waUrl = buildWhatsAppUrl(
    businessConfig.contact.whatsapp,
    "Hola, me gustaria cotizar un proyecto."
  );

  const goSlide = (n: number) => {
    setCur(((n % slides.length) + slides.length) % slides.length);
  };

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setCur((c) => (c + 1) % slides.length), AUTOPLAY_MS);
  };

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) {
      goSlide(dx < 0 ? cur + 1 : cur - 1);
      resetTimer();
    }
  };

  return (
    <section
      id="inicio"
      style={{
        position: "relative",
        height: "min(72vw, 560px)",
        overflow: "hidden",
        background: "#000",
      }}
      className="md:!h-[min(60vw,680px)]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      <div
        style={{
          display: "flex",
          height: "100%",
          transform: `translateX(-${cur * 100}%)`,
          transition: "transform .6s cubic-bezier(.4,0,.2,1)",
        }}
      >
        {slides.map((slide, i) => (
          <div key={i} style={{ minWidth: "100%", position: "relative" }}>
            <Image
              src={slide.image}
              alt={slide.titleHighlight}
              fill
              priority={i === 0}
              sizes="100vw"
              style={{ objectFit: "cover", opacity: 0.68 }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(160deg,transparent 20%,rgba(0,0,0,.6) 60%,rgba(0,0,0,.9) 100%)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "24px 20px 28px",
              }}
              className="md:!justify-center md:!p-[48px_60px] md:!bg-[linear-gradient(100deg,rgba(0,0,0,.82)_45%,transparent_80%)] md:!max-w-[660px]"
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  background: "var(--yellow)",
                  color: "#111",
                  fontFamily: "var(--font-poppins)",
                  fontWeight: 700,
                  fontSize: "0.65rem",
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  padding: "4px 10px",
                  borderRadius: 4,
                  width: "fit-content",
                  marginBottom: 12,
                }}
              >
                {slide.badge}
              </div>

              <h1
                style={{
                  fontFamily: "var(--font-poppins)",
                  fontSize: "clamp(1.6rem,5vw,2.8rem)",
                  fontWeight: 800,
                  lineHeight: 1.15,
                  color: "#fff",
                  marginBottom: 16,
                }}
              >
                {slide.title}
                <br />
                <span style={{ color: "var(--yellow)" }}>{slide.titleHighlight}</span>
              </h1>

              <p
                className="hidden md:block"
                style={{
                  color: "rgba(255,255,255,.75)",
                  fontSize: "1rem",
                  marginBottom: 20,
                  maxWidth: 420,
                  lineHeight: 1.6,
                }}
              >
                {slide.subtitle}
              </p>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "var(--green)",
                  color: "#fff",
                  borderRadius: "var(--radius)",
                  padding: "14px 22px",
                  fontFamily: "var(--font-poppins)",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  width: "fit-content",
                  boxShadow: "0 8px 24px rgba(37,211,102,.35)",
                  textDecoration: "none",
                }}
              >
                {WA_ICON}
                <div>
                  <div>Cotiza por WhatsApp</div>
                  <span
                    style={{
                      fontWeight: 400,
                      fontSize: "0.72rem",
                      opacity: 0.85,
                      display: "block",
                    }}
                  >
                    Respuesta en minutos
                  </span>
                </div>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div
        style={{
          position: "absolute",
          bottom: 14,
          right: 18,
          display: "flex",
          gap: 5,
        }}
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => { goSlide(i); resetTimer(); }}
            aria-label={`Ir a slide ${i + 1}`}
            style={{
              width: cur === i ? 20 : 7,
              height: 7,
              borderRadius: cur === i ? 4 : "50%",
              border: "none",
              cursor: "pointer",
              padding: 0,
              background: cur === i ? "var(--yellow)" : "rgba(255,255,255,.35)",
              transition: "all .3s",
            }}
          />
        ))}
      </div>

      {/* Prev/Next */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          padding: "0 12px",
          pointerEvents: "none",
        }}
      >
        {(["‹", "›"] as const).map((arrow, idx) => (
          <button
            key={arrow}
            onClick={() => { goSlide(idx === 0 ? cur - 1 : cur + 1); resetTimer(); }}
            aria-label={idx === 0 ? "Anterior" : "Siguiente"}
            style={{
              pointerEvents: "all",
              background: "rgba(0,0,0,.4)",
              border: "1px solid rgba(255,255,255,.2)",
              color: "#fff",
              width: 36,
              height: 36,
              borderRadius: "50%",
              fontSize: "1.1rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {arrow}
          </button>
        ))}
      </div>
    </section>
  );
}
