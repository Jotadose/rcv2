import Image from "next/image";
import { MessageCircle } from "lucide-react";
import businessConfig from "@/config/business";
import { buildWhatsAppUrl } from "@/lib/contact";

const serviceLinks = [
  { href: "#servicios", label: "Construccion" },
  { href: "#servicios", label: "Reformas" },
  { href: "#servicios", label: "Mantenciones" },
  { href: "#servicios", label: "Ampliaciones" },
];

const companyLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#garantias", label: "Garantias" },
  { href: "#instagram", label: "Instagram" },
  { href: "#contacto", label: "Contacto" },
];

export default function SiteFooter() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="mb-4 inline-flex rounded-lg bg-white p-2">
              <Image
                src="/REFORMAS/reformaslogohor.jpg"
                alt={`${businessConfig.name} logo`}
                width={168}
                height={48}
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-gray-400 text-sm">
              Mas de {businessConfig.stats.yearsExperience} anos construyendo
              proyectos en {businessConfig.location.region}.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Servicios</h2>
            <ul className="space-y-2 text-sm text-gray-400">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-orange-400">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Empresa</h2>
            <ul className="space-y-2 text-sm text-gray-400">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-orange-400">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Contacto</h2>
            <div className="space-y-2 text-sm text-gray-400">
              <p>{businessConfig.contact.phone}</p>
              <p>{businessConfig.contact.email}</p>
              <p>
                {businessConfig.location.city}, {businessConfig.location.region}
              </p>
              <div className="flex space-x-4 mt-4">
                <a
                  href={buildWhatsAppUrl(businessConfig.contact.whatsapp)}
                  className="text-gray-300 hover:text-orange-400"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a
                  href={businessConfig.social.instagram.url}
                  className="text-gray-300 hover:text-orange-400"
                  aria-label="Instagram"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2026 {businessConfig.name}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
