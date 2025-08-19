"use client";
import React from "react";

interface Item {
  src: string;
  alt: string;
  group: string;
}

// Static manifest (puede generarse automáticamente más adelante)
const manifest: Item[] = [
  // Proyectos (los archivos están directamente dentro /reformas)
  ...[
    1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
    23,
  ].map((n) => ({
    src: `/reformas/refor${n}.jpg`,
    alt: `Reforma ${n}`,
    group: "Proyectos",
  })),
  { src: "/reformas/refro22.jpg", alt: "Reforma 22 alt", group: "Proyectos" },
  // Branding / logos / afiches (también en raíz de /reformas)
  { src: "/reformas/reformasafiche.jpg", alt: "Afiche", group: "Branding" },
  {
    src: "/reformas/reformasafiche12.jpg",
    alt: "Afiche 12",
    group: "Branding",
  },
  {
    src: "/reformas/reformaslogoblanco.jpg",
    alt: "Logo blanco",
    group: "Branding",
  },
  {
    src: "/reformas/reformaslogohor.jpg",
    alt: "Logo horizontal",
    group: "Branding",
  },
  { src: "/reformas/reformasnegro.jpg", alt: "Logo negro", group: "Branding" },
  {
    src: "/reformas/reformasservices.jpg",
    alt: "Servicios",
    group: "Branding",
  },
];

const groups = Array.from(new Set(manifest.map((m) => m.group)));

export default function ReformasGallery() {
  return (
    <section className="py-20 bg-white" id="galeria">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            Galería de Reformas
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Muestrario de proyectos realizados y material de marca.
          </p>
        </div>
        {groups.map((group) => {
          const items = manifest.filter((m) => m.group === group);
          return (
            <div key={group} className="mb-16">
              <h3 className="text-2xl font-semibold text-slate-700 mb-6 flex items-center gap-3">
                <span className="h-6 w-1.5 rounded bg-gradient-to-b from-purple-500 to-pink-500" />
                {group}
                <span className="text-sm font-normal text-gray-400">
                  ({items.length})
                </span>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.map((it) => (
                  <figure
                    key={it.src}
                    className="relative group rounded-lg overflow-hidden bg-slate-100 aspect-square shadow-sm hover:shadow-lg transition"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={it.src}
                      alt={it.alt}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.opacity =
                          "0.3";
                        (e.currentTarget as HTMLImageElement).alt =
                          "Falta archivo";
                      }}
                    />
                    <figcaption className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition bg-gradient-to-t from-black/60 to-transparent p-2 text-[11px] text-white">
                      {it.alt}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
