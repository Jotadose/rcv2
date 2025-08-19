"use client";

import React from "react";
import { motion } from "framer-motion";
import businessConfig from "@/config/business";

interface StatCardProps {
  value: string | number;
  label: string;
  icon: string;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  icon,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <div className="text-3xl mb-2">{icon}</div>
        <div className="text-3xl lg:text-4xl font-bold text-orange-400 mb-1">
          {typeof value === "number" && value > 100 ? `${value}+` : value}
          {typeof value === "number" && label.includes("Satisfechos") && "%"}
        </div>
        <div className="text-sm lg:text-base text-gray-300">{label}</div>
      </div>
    </motion.div>
  );
};

const StatsSection: React.FC = () => {
  const stats = [
    {
      value: businessConfig.stats.projectsCompleted,
      label: "Proyectos Exitosos",
      icon: "🏆",
    },
    {
      value: businessConfig.stats.yearsExperience,
      label: "Años de Experiencia",
      icon: "📅",
    },
    {
      value: businessConfig.stats.clientSatisfaction,
      label: "Clientes Satisfechos",
      icon: "😊",
    },
    {
      value: businessConfig.stats.teammembers,
      label: "Profesionales",
      icon: "👥",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
      {stats.map((stat, index) => (
        <StatCard
          key={stat.label}
          value={stat.value}
          label={stat.label}
          icon={stat.icon}
          delay={index * 0.1}
        />
      ))}
    </div>
  );
};

export default StatsSection;
