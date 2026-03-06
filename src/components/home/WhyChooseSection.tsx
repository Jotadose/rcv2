import { CheckCircle } from "lucide-react";
import businessConfig from "@/config/business";

const features = [
  {
    description:
      "Experiencia acumulada en remodelaciones, ampliaciones y mantenciones.",
    title: "Trayectoria comprobada",
  },
  {
    description: "12 meses de garantia en mano de obra y seguimiento post entrega.",
    title: "Garantia clara",
  },
  {
    description: "Solo trabajamos con materiales y proveedores que podemos respaldar.",
    title: "Materiales confiables",
  },
  {
    description: "Definimos plazos realistas y mantenemos comunicacion durante la obra.",
    title: "Avance ordenado",
  },
  {
    description: "Presupuestos detallados para reducir sorpresas y extras evitables.",
    title: "Costos transparentes",
  },
  {
    description: "Atencion directa por WhatsApp y visitas tecnicas agendadas en terreno.",
    title: "Respuesta rapida",
  },
];

export default function WhyChooseSection() {
  return (
    <section id="garantias" className="py-20 bg-slate-800 text-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">
            Por que elegir {businessConfig.name}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Mas de {businessConfig.stats.yearsExperience} anos construyendo
            proyectos en la Region de Coquimbo con foco en calidad, plazos y
            seguimiento.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="flex items-start space-x-4">
              <CheckCircle className="w-8 h-8 text-green-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
