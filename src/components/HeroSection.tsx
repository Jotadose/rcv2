"use client";

import businessConfig from "@/config/business";
import { buildWhatsAppUrl } from "@/lib/contact";

interface HeroSectionProps {
  onOpenAIChat: () => void;
}

const stats = [
  {
    icon: "🏆",
    key: "projects",
    label: "Proyectos exitosos",
    value: `${businessConfig.stats.projectsCompleted}+`,
  },
  {
    icon: "📅",
    key: "experience",
    label: "Anos de experiencia",
    value: `${businessConfig.stats.yearsExperience}+`,
  },
  {
    icon: "😊",
    key: "satisfaction",
    label: "Clientes satisfechos",
    value: `${businessConfig.stats.clientSatisfaction}%`,
  },
  {
    icon: "👥",
    key: "team",
    label: "Profesionales",
    value: `${businessConfig.stats.teammembers}+`,
  },
];

export default function HeroSection({ onOpenAIChat }: HeroSectionProps) {
  const { name, tagline, contact, location } = businessConfig;

  return (
    <section
      id="inicio"
      className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 text-white py-16 lg:py-24 overflow-hidden min-h-[90vh] flex items-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(15, 23, 42, 0.85), rgba(30, 41, 59, 0.85)), url('/REFORMAS/refor13.jpg')",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-bl from-orange-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="block text-white">Construccion y reformas</span>
              <span className="block text-orange-400">en {location.region}</span>
              <span className="block text-lg md:text-xl lg:text-2xl font-normal text-gray-300 mt-4">
                {tagline}
              </span>
            </h1>
          </div>

          <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            <p className="text-lg md:text-xl lg:text-2xl mb-6 text-gray-200 leading-relaxed max-w-4xl mx-auto">
              Mas de <strong>{businessConfig.stats.yearsExperience} anos</strong>{" "}
              transformando hogares y negocios en {location.region}. Disenamos,
              construimos y remodelamos con materiales premium y{" "}
              <strong>plazos garantizados</strong>.
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-full text-green-300 border border-green-500/30">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium">
                Tu proyecto, entregado sin sorpresas
              </span>
            </div>
          </div>

          <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat) => (
                <div key={stat.key} className="text-center">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <div className="text-2xl md:text-3xl font-bold text-orange-400 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs md:text-sm text-gray-300">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <button
              onClick={onOpenAIChat}
              className="group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]"
            >
              <span className="flex items-center justify-center gap-2">
                <span>🚀</span>
                Cotiza con IA ahora
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </button>

            <a
              href={buildWhatsAppUrl(
                contact.whatsapp,
                `Hola ${name}, me interesa obtener mas informacion`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-slate-800 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02]"
            >
              <span>💬</span>
              WhatsApp directo
            </a>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-gray-400 animate-in fade-in duration-700 delay-500">
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Garantia de 12 meses</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Materiales premium</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Plazos cumplidos</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Presupuesto sin sorpresas</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
