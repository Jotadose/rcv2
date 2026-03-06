import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import businessConfig from "@/config/business";
import { getInstagramEmbeds, getInstagramShowcaseItems } from "@/config/instagram";

export interface InstagramEmbedGridProps {
  readonly limit?: number;
}

export default function InstagramEmbedGrid({
  limit = 4,
}: InstagramEmbedGridProps) {
  const embeds = getInstagramEmbeds(limit);
  const items = getInstagramShowcaseItems(limit);
  const [featuredItem, ...secondaryItems] = items;
  const showEmbeds = embeds.length > 0;

  return (
    <section
      id="instagram"
      className="py-24 bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.12),_transparent_28%),linear-gradient(180deg,#f8fafc_0%,#fff7ed_100%)]"
    >
      <div className="container mx-auto px-4">
        <div className="grid xl:grid-cols-[0.92fr_1.45fr] gap-8 items-stretch">
          <div className="rounded-[32px] bg-slate-900 text-white p-8 md:p-10 shadow-[0_24px_80px_rgba(15,23,42,0.22)] border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-orange-300">
                Instagram activo
              </div>
              <h2 className="mt-6 text-4xl md:text-5xl font-bold leading-[1.05]">
                Avances reales,
                <span className="block text-orange-400">no maquetas.</span>
              </h2>
              <p className="mt-6 text-lg text-slate-300 max-w-md leading-relaxed">
                {showEmbeds
                  ? "Estas son publicaciones reales tomadas directo desde Instagram."
                  : "Compartimos visitas tecnicas, terminaciones y seguimiento de obra tal como salen en terreno en la Region de Coquimbo."}
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                <div className="text-xs uppercase tracking-[0.22em] text-slate-400">
                  Proyectos
                </div>
                <div className="mt-2 text-2xl font-semibold text-white">
                  {businessConfig.stats.projectsCompleted}+
                </div>
              </div>
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                <div className="text-xs uppercase tracking-[0.22em] text-slate-400">
                  Cobertura
                </div>
                <div className="mt-2 text-2xl font-semibold text-white">IV</div>
              </div>
            </div>

            <div className="mt-10">
              <a
                href={businessConfig.social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-orange-600 hover:translate-x-1"
              >
                Ver perfil completo
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <p className="mt-4 text-sm text-slate-400">
                {businessConfig.social.instagram.handle}
              </p>
            </div>
          </div>

          {showEmbeds ? (
            <div className="grid md:grid-cols-2 gap-5 auto-rows-[420px]">
              {embeds.map((item, index) => (
                <div
                  key={`${item.href}-${index}`}
                  className="rounded-[28px] overflow-hidden border border-white/60 shadow-[0_18px_55px_rgba(15,23,42,0.10)] bg-white"
                >
                  <iframe
                    src={item.embedUrl}
                    title={`Instagram embed ${index + 1}`}
                    className="h-full w-full"
                    loading="lazy"
                    allow="clipboard-write; encrypted-media; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-5 auto-rows-[220px]">
              {featuredItem && (
                <a
                  href={featuredItem.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative md:col-span-2 min-h-[460px] rounded-[32px] overflow-hidden border border-white/60 shadow-[0_20px_70px_rgba(15,23,42,0.12)]"
                >
                  <Image
                    src={featuredItem.imageSrc}
                    alt={featuredItem.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 66vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/15 to-transparent" />
                  <div className="absolute left-6 top-6 inline-flex items-center rounded-full bg-white/14 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                    {featuredItem.kicker || "Instagram"}
                  </div>
                  <div className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/12 text-white backdrop-blur-sm transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 text-white">
                    <h3 className="text-2xl md:text-3xl font-semibold max-w-xl">
                      {featuredItem.title}
                    </h3>
                    <p className="mt-3 max-w-lg text-white/80 text-base leading-relaxed">
                      {featuredItem.caption}
                    </p>
                  </div>
                </a>
              )}

              {secondaryItems.map((item, index) => (
                <a
                  key={`${item.href}-${index}`}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative rounded-[28px] overflow-hidden border border-white/60 shadow-[0_18px_55px_rgba(15,23,42,0.10)] bg-white"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.14),_transparent_38%),linear-gradient(180deg,#fffdf8_0%,#f8fafc_100%)]" />
                  <div className="relative h-full flex flex-col justify-between">
                    <div className="p-6 flex items-start justify-between">
                      <div className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
                        {item.kicker || "Instagram"}
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-800 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                    </div>

                    <div className="relative h-[112px] mx-6 mb-4">
                      <Image
                        src={item.imageSrc}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className={`${
                          item.display === "contain"
                            ? "object-contain p-2"
                            : "object-cover"
                        } drop-shadow-[0_18px_26px_rgba(15,23,42,0.16)] transition-transform duration-500 group-hover:scale-[1.03]`}
                      />
                    </div>

                    <div className="rounded-t-[24px] bg-slate-950 px-6 py-5 text-white">
                      <h3 className="text-xl font-semibold leading-tight">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm text-white/72 leading-relaxed">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
