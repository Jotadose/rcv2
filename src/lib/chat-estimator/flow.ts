import businessConfig from "@/config/business";
import type { ConversationFlowEntry, ConversationStep } from "./types";

const { name, pricing } = businessConfig;

export const PROJECT_TYPES = [
  {
    key: "remodelacion",
    label: "Remodelacion",
    multiplier: pricing.projectMultipliers.remodelacion,
  },
  {
    key: "construccion",
    label: "Construccion nueva",
    multiplier: pricing.projectMultipliers.construccion,
  },
  {
    key: "ampliacion",
    label: "Ampliacion",
    multiplier: pricing.projectMultipliers.ampliacion,
  },
  {
    key: "mantencion",
    label: "Mantencion",
    multiplier: pricing.projectMultipliers.mantencion,
  },
  {
    key: "bano",
    label: "Bano completo",
    multiplier: pricing.projectMultipliers.bano,
  },
  {
    key: "cocina",
    label: "Cocina completa",
    multiplier: pricing.projectMultipliers.cocina,
  },
] as const;

export const QUALITY_LEVELS = [
  {
    key: "economico",
    label: "Economico",
    multiplier: pricing.qualityMultipliers.economico,
  },
  {
    key: "estandar",
    label: "Estandar",
    multiplier: pricing.qualityMultipliers.estandar,
  },
  {
    key: "premium",
    label: "Premium",
    multiplier: pricing.qualityMultipliers.premium,
  },
  {
    key: "lujo",
    label: "Lujo",
    multiplier: pricing.qualityMultipliers.lujo,
  },
] as const;

export const BUDGET_RANGES = [
  { key: "bajo", label: "Hasta $3M" },
  { key: "medio", label: "$3M - $8M" },
  { key: "alto", label: "$8M - $15M" },
  { key: "premium", label: "Mas de $15M" },
] as const;

export const CONVERSATION_FLOW: Record<ConversationStep, ConversationFlowEntry> = {
  welcome: {
    message: `Hola. Soy tu asistente de cotizacion de ${name}. Que tipo de proyecto tienes en mente?`,
    next: "area",
    options: PROJECT_TYPES.map((item) => item.label),
  },
  area: {
    message:
      "Perfecto. Cuantos metros cuadrados tiene el proyecto aproximadamente? Escribe solo el numero.",
    next: "quality",
    validator: (input) => {
      const value = Number.parseInt(input.replace(/\D/g, ""), 10);
      return value >= 1 && value <= 1000 ? value : null;
    },
  },
  quality: {
    message: "Que nivel de terminaciones prefieres?",
    next: "budget",
    options: QUALITY_LEVELS.map((item) => item.label),
  },
  budget: {
    message: "Cual es tu rango de presupuesto aproximado?",
    next: "name",
    options: BUDGET_RANGES.map((item) => item.label),
  },
  name: {
    message: "Perfecto. Como te llamas?",
    next: "phone",
    validator: (input) => (input.trim().length >= 2 ? input.trim() : null),
  },
  phone: {
    message:
      "Gracias {name}. Dejame tu numero de WhatsApp para enviarte el resumen y coordinar una visita tecnica.",
    next: "final",
    validator: (input) => {
      const phone = input.replace(/\D/g, "");
      return phone.length >= 8 ? phone : null;
    },
  },
};
