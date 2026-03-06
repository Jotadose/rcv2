import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import businessConfig from "@/config/business";
import LeadForm from "@/components/home/LeadForm";

export default function ContactSection() {
  return (
    <section id="contacto" className="py-20 bg-slate-800 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">Comencemos tu proyecto hoy</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Contactanos para una cotizacion gratuita y sin compromiso.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-xl p-8 text-slate-800">
            <h3 className="text-2xl font-bold mb-6">Solicita tu cotizacion</h3>
            <LeadForm variant="inline" />
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Informacion de contacto</h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Telefono</h4>
                    <p className="text-gray-300">{businessConfig.contact.phone}</p>
                    <p className="text-sm text-gray-400">
                      {businessConfig.businessHours.weekdays}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Email</h4>
                    <p className="text-gray-300">{businessConfig.contact.email}</p>
                    <p className="text-sm text-gray-400">Respuesta en menos de 24h</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MessageCircle className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold mb-1">WhatsApp</h4>
                    <p className="text-gray-300">{businessConfig.contact.whatsapp}</p>
                    <p className="text-sm text-gray-400">Respuesta inmediata</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Cobertura</h4>
                    <p className="text-gray-300">{businessConfig.location.address}</p>
                    <p className="text-sm text-gray-400">
                      {businessConfig.location.city}, {businessConfig.location.region},{" "}
                      {businessConfig.location.country}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
