"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import businessConfig from "@/config/business";
import { buildWhatsAppUrl } from "@/lib/contact";

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#garantias", label: "Garantias" },
  { href: "#instagram", label: "Instagram" },
  { href: "#contacto", label: "Contacto" },
];

export default function SiteHeader() {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <header className="bg-slate-800 text-white sticky top-0 z-40 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <a href="#inicio" className="flex items-center space-x-3">
            <Image
              src="/REFORMAS/reformaslogoblanco.jpg"
              alt={`${businessConfig.name} logo`}
              width={96}
              height={48}
              className="h-12 w-auto rounded-md object-contain"
            />
            <div>
              <div className="text-xl font-bold text-orange-400">
                {businessConfig.shortName}
              </div>
              <p className="text-xs text-gray-300">{businessConfig.tagline}</p>
            </div>
          </a>

          <nav className="hidden lg:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-orange-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex space-x-4">
            <a
              href={`tel:${businessConfig.contact.phone}`}
              className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              Llamar
            </a>
            <a
              href={buildWhatsAppUrl(businessConfig.contact.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              WhatsApp
            </a>
          </div>

          <button
            onClick={() => setMobileMenu((current) => !current)}
            className="lg:hidden"
            aria-expanded={mobileMenu}
            aria-label="Abrir menu"
          >
            {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenu && (
          <div className="lg:hidden mt-4 pb-4 border-t border-slate-700">
            <nav className="flex flex-col space-y-2 mt-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenu(false)}
                  className="hover:text-orange-400 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="flex space-x-4 mt-4">
              <a
                href={`tel:${businessConfig.contact.phone}`}
                className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                Llamar
              </a>
              <a
                href={buildWhatsAppUrl(businessConfig.contact.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
