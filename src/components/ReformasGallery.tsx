"use client";
import React, { useState } from "react";
import Image from "next/image";

interface Item {
  src: string;
  alt: string;
  group: string;
}

const projectIds = [
  1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23,
];
const manifest: Item[] = [
  ...projectIds.map((n) => ({
    src: `/REFORMAS/refor${n}.jpg`,
    alt: `Reforma ${n}`,
    group: "Proyectos",
  })),
  { src: "/REFORMAS/refro22.jpg", alt: "Reforma 22 alt", group: "Proyectos" },
  { src: "/REFORMAS/reformasafiche.jpg", alt: "Afiche", group: "Branding" },
  {
    src: "/REFORMAS/reformasafiche12.jpg",
    alt: "Afiche 12",
    group: "Branding",
  },
  {
    src: "/REFORMAS/reformaslogoblanco.jpg",
    alt: "Logo blanco",
    group: "Branding",
  },
  {
    src: "/REFORMAS/reformaslogohor.jpg",
    alt: "Logo horizontal",
    group: "Branding",
  },
  { src: "/REFORMAS/reformasnegro.jpg", alt: "Logo negro", group: "Branding" },
  {
    src: "/REFORMAS/reformasservices.jpg",
    alt: "Servicios",
    group: "Branding",
  },
];

const groups = Array.from(new Set(manifest.map((m) => m.group)));
const INITIAL_COUNT = 12;
const LOAD_STEP = 12;

export default function ReformasGallery() {
  const [visible, setVisible] = useState(INITIAL_COUNT);
  return (
    <section className="py-20 bg-white" id="galeria">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            Galería de Reformas
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Muestrario de proyectos realizados y material de marca. (Carga
            diferida)
          </p>
        </div>
        {groups.map((group) => {
          const items = manifest.filter((m) => m.group === group);
          const slice = items.slice(0, visible);
          const hasMore = items.length > slice.length;
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
                {slice.map((it) => (
                  <figure
                    key={it.src}
                    className="relative group rounded-lg overflow-hidden bg-slate-100 aspect-square shadow-sm hover:shadow-lg transition"
                  >
                    <Image
                      src={it.src}
                      alt={it.alt}
                      fill
                      sizes="(max-width:768px) 50vw, (max-width:1024px) 25vw, 250px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.currentTarget as any).style.opacity = "0.3";
                      }}
                    />
                    <figcaption className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition bg-gradient-to-t from-black/60 to-transparent p-2 text-[11px] text-white">
                      {it.alt}
                    </figcaption>
                  </figure>
                ))}
              </div>
              {hasMore && (
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={() => setVisible((v) => v + LOAD_STEP)}
                    className="px-5 py-2 rounded bg-slate-800 text-white text-sm hover:bg-slate-700 shadow"
                  >
                    Cargar más
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
