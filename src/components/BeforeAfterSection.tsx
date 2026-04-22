"use client";

import { useRef, useState } from "react";
import Image from "next/image";

export default function BeforeAfterSection() {
  const [pct, setPct] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const calcPct = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const p = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100));
    setPct(p);
  };

  return (
    <section style={{ padding: "56px 0", background: "var(--surface)" }}>
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
          Transformaciones
        </div>
        <div
          style={{
            fontFamily: "var(--font-poppins)",
            fontWeight: 800,
            fontSize: "clamp(1.4rem,3vw,2rem)",
            marginBottom: 6,
          }}
        >
          Antes &amp; Después
        </div>
        <div style={{ color: "var(--muted)", fontSize: "0.9rem", marginBottom: 28 }}>
          Arrastra el divisor para comparar.
        </div>

        <div
          ref={containerRef}
          style={{
            position: "relative",
            borderRadius: "var(--radius)",
            overflow: "hidden",
            aspectRatio: "16/9",
            cursor: "ew-resize",
            userSelect: "none",
            background: "#222",
            boxShadow: "0 20px 60px rgba(0,0,0,.5)",
          }}
          className="max-md:!aspect-[4/3]"
          onMouseDown={() => setDragging(true)}
          onMouseMove={(e) => dragging && calcPct(e.clientX)}
          onMouseUp={() => setDragging(false)}
          onMouseLeave={() => setDragging(false)}
          onTouchStart={() => setDragging(true)}
          onTouchMove={(e) => calcPct(e.touches[0].clientX)}
          onTouchEnd={() => setDragging(false)}
        >
          {/* After (right) */}
          <div style={{ position: "absolute", inset: 0 }}>
            <Image src="/REFORMAS/refor7.jpg" alt="Después" fill style={{ objectFit: "cover" }} />
          </div>

          {/* Before (left, clipped) */}
          <div style={{ position: "absolute", inset: 0, overflow: "hidden", width: `${pct}%` }}>
            <Image
              src="/REFORMAS/refor6.jpg"
              alt="Antes"
              fill
              style={{ objectFit: "cover", objectPosition: "left", minWidth: `${(100 / pct) * 100}%`, maxWidth: "none" }}
            />
          </div>

          {/* Divider */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              width: 2,
              background: "#fff",
              left: `${pct}%`,
              transform: "translateX(-50%)",
              pointerEvents: "none",
            }}
          />

          {/* Handle */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: `${pct}%`,
              transform: "translate(-50%,-50%)",
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 16px rgba(0,0,0,.4)",
              pointerEvents: "none",
            }}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#111" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>

          {/* Labels */}
          {(["Antes", "Después"] as const).map((label, i) => (
            <div
              key={label}
              style={{
                position: "absolute",
                top: 14,
                [i === 0 ? "left" : "right"]: 14,
                background: "rgba(0,0,0,.55)",
                color: "#fff",
                fontFamily: "var(--font-poppins)",
                fontWeight: 700,
                fontSize: "0.68rem",
                letterSpacing: 1,
                textTransform: "uppercase",
                padding: "4px 10px",
                borderRadius: 4,
                pointerEvents: "none",
              }}
            >
              {label}
            </div>
          ))}
        </div>

        <p style={{ textAlign: "center", marginTop: 12, fontSize: "0.78rem", color: "var(--muted)" }}>
          ← Arrastra el divisor para comparar →
        </p>
      </div>
    </section>
  );
}
