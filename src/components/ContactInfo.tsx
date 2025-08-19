"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import businessConfig from "@/config/business";

const ContactInfo: React.FC = () => {
  const { contact, location, businessHours, serviceAreas } = businessConfig;

  const contactItems = [
    {
      icon: Phone,
      title: "Teléfono",
      value: contact.phone,
      subtitle: businessHours.weekdays,
      action: `tel:${contact.phone}`,
      color: "blue",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: contact.whatsapp,
      subtitle: "Respuesta inmediata",
      action: `https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`,
      color: "green",
    },
    {
      icon: Mail,
      title: "Email",
      value: contact.email,
      subtitle: "Respuesta en menos de 24h",
      action: `mailto:${contact.email}`,
      color: "purple",
    },
    {
      icon: MapPin,
      title: "Oficina",
      value: `${location.address}, ${location.city}`,
      subtitle: `${location.region}, ${location.country}`,
      action: "#",
      color: "orange",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "from-blue-400 to-blue-600 text-blue-400",
      green: "from-green-400 to-green-600 text-green-400",
      purple: "from-purple-400 to-purple-600 text-purple-400",
      orange: "from-orange-400 to-orange-600 text-orange-400",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold mb-6 text-white">
          Información de Contacto
        </h3>

        <div className="space-y-6">
          {contactItems.map((item, index) => {
            const Icon = item.icon;
            const colorClasses = getColorClasses(item.color);

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <a
                  href={item.action}
                  target={item.action.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.action.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="flex items-start space-x-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${
                      colorClasses.split(" ")[0]
                    } ${colorClasses.split(" ")[1]}`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold mb-1 text-white group-hover:text-orange-300 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-gray-300 font-medium">{item.value}</p>
                    <p className="text-sm text-gray-400 mt-1">
                      {item.subtitle}
                    </p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Horarios de atención */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
      >
        <div className="flex items-center gap-3 mb-4">
          <Clock className="w-6 h-6 text-orange-400" />
          <h4 className="text-lg font-semibold text-white">
            Horarios de Atención
          </h4>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Lunes a Viernes:</span>
            <span className="text-white font-medium">8:00 - 18:00</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Sábados:</span>
            <span className="text-white font-medium">9:00 - 14:00</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Emergencias:</span>
            <span className="text-green-400 font-medium">24/7</span>
          </div>
        </div>
      </motion.div>

      {/* Áreas de servicio */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
      >
        <div className="flex items-center gap-3 mb-4">
          <MapPin className="w-6 h-6 text-orange-400" />
          <h4 className="text-lg font-semibold text-white">
            Áreas de Servicio
          </h4>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {serviceAreas.map((area) => (
            <div
              key={area}
              className="text-sm text-gray-300 bg-white/5 rounded-lg px-3 py-2"
            >
              {area}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ContactInfo;
