import { ArrowRight, CheckCircle } from "lucide-react";
import businessConfig from "@/config/business";
import { buildWhatsAppUrl } from "@/lib/contact";

export default function ServicesSection() {
  const { services, contact } = businessConfig;

  return (
    <section id="servicios" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            Nuestros servicios
            <span className="block text-orange-500 text-3xl lg:text-4xl">
              especializados
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Soluciones integrales para cada una de tus necesidades constructivas
            en la <strong>Region de Coquimbo</strong>.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1"
            >
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 text-white">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{service.name}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="p-8">
                <div className="space-y-3 mb-6">
                  {service.features.map((feature) => (
                    <div
                      key={`${service.id}-${feature.slice(0, 10)}`}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <a
                  href={buildWhatsAppUrl(
                    contact.whatsapp,
                    `Hola RC Reformas, me interesa el servicio de ${service.name}`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Consultar</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </a>
              </div>

              <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                Especialidad
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 lg:p-12 text-white">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              No encuentras el servicio que necesitas?
            </h3>
            <p className="text-gray-300 mb-6 text-lg">
              Trabajamos proyectos personalizados. Cuentanos tu idea y la
              haremos realidad.
            </p>
            <a
              href={buildWhatsAppUrl(
                contact.whatsapp,
                "Hola RC Reformas, necesito un proyecto personalizado"
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-slate-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300"
            >
              <span>📞</span> Consulta personalizada
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
