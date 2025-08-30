"use client";

import React from "react";
import { motion } from "framer-motion";
import businessConfig from "@/config/business";

interface HeroSectionProps {
  onOpenAIChat: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onOpenAIChat }) => {
  const { name, tagline, contact, location, stats } = businessConfig;

  const heroVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, delay: 0.4 },
    },
  };

  return (
    <section
      id="inicio"
      className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 text-white py-16 lg:py-24 overflow-hidden min-h-[90vh] flex items-center"
      style={{
        backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.85), rgba(30, 41, 59, 0.85)), url('/REFORMAS/refor13.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-bl from-orange-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main heading */}
          <motion.div
            variants={heroVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="block text-white">Construcción y Reformas</span>
              <span className="block text-orange-400">
                en {location.region}
              </span>
              <span className="block text-lg md:text-xl lg:text-2xl font-normal text-gray-300 mt-4">
                {tagline}
              </span>
            </h1>
          </motion.div>

          {/* Value proposition */}
          <motion.div
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            className="mb-10"
          >
            <p className="text-lg md:text-xl lg:text-2xl mb-6 text-gray-200 leading-relaxed max-w-4xl mx-auto">
              Más de <strong>{stats.yearsExperience} años</strong> transformando
              hogares y negocios en {location.region}. Diseñamos, construimos y
              remodelamos con materiales premium y{" "}
              <strong>plazos garantizados</strong>.
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-full text-green-300 border border-green-500/30">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium">
                Tu proyecto, entregado sin sorpresas
              </span>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={statsVariants}
            initial="hidden"
            animate="visible"
            className="mb-12"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {[
                {
                  value: `${stats.projectsCompleted}+`,
                  label: "Proyectos Exitosos",
                  icon: "🏆",
                },
                {
                  value: `${stats.yearsExperience}+`,
                  label: "Años de Experiencia",
                  icon: "📅",
                },
                {
                  value: `${stats.clientSatisfaction}%`,
                  label: "Clientes Satisfechos",
                  icon: "😊",
                },
                {
                  value: `${stats.teammembers}+`,
                  label: "Profesionales",
                  icon: "👥",
                },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <div className="text-2xl md:text-3xl font-bold text-orange-400 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs md:text-sm text-gray-300">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              onClick={onOpenAIChat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center justify-center gap-2">
                <span>🚀</span>
                ¡Cotiza con IA Ahora!
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>

            <motion.a
              href={`https://wa.me/${contact.whatsapp.replace(
                /\D/g,
                ""
              )}?text=Hola%20${name.replace(
                " ",
                "%20"
              )},%20me%20interesa%20obtener%20más%20información`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-slate-800 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>💬</span>
              WhatsApp Directo
            </motion.a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-gray-400"
          >
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Garantía 12 meses</span>
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
