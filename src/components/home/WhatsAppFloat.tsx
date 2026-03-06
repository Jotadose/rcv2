import { MessageCircle } from "lucide-react";
import businessConfig from "@/config/business";
import { buildWhatsAppUrl } from "@/lib/contact";

export default function WhatsAppFloat() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href={buildWhatsAppUrl(
          businessConfig.contact.whatsapp,
          `Hola ${businessConfig.name}, me interesa cotizar un proyecto.`
        )}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center bg-green-500 text-white px-4 py-3 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-105"
      >
        <MessageCircle className="w-6 h-6 mr-2" />
        <span className="hidden sm:block">Necesitas ayuda?</span>
      </a>
    </div>
  );
}
