import businessConfig from "@/config/business";
import { PROJECT_TYPES, QUALITY_LEVELS } from "./flow";
import type { Estimate, QuoteData } from "./types";

const { pricing } = businessConfig;

export function getProjectMultiplier(type: string | null) {
  const project = PROJECT_TYPES.find((item) => item.key === type);
  return project?.multiplier || 1;
}

export function getQualityMultiplier(quality: string | null) {
  const qualityMatch = QUALITY_LEVELS.find((item) => item.key === quality);
  return qualityMatch?.multiplier || 1;
}

export function getProjectLabel(type: string | null) {
  const project = PROJECT_TYPES.find((item) => item.key === type);
  return project?.label || type || "Proyecto";
}

export function getQualityLabel(quality: string | null) {
  const qualityMatch = QUALITY_LEVELS.find((item) => item.key === quality);
  return qualityMatch?.label || quality || "Estandar";
}

export function calculateEstimate(data: QuoteData): Estimate {
  const area = data.area || 50;
  const baseTotal =
    area *
    pricing.basePricePerM2 *
    getProjectMultiplier(data.projectType) *
    getQualityMultiplier(data.quality);

  let budgetAdjustment = 1;
  if (data.budget === "bajo") {
    budgetAdjustment = 0.75;
  } else if (data.budget === "premium") {
    budgetAdjustment = 1.35;
  }

  const adjustedTotal = baseTotal * budgetAdjustment;

  let duration = "2-6 semanas";
  if (area > 100) {
    duration = "6-12 semanas";
  } else if (area > 50) {
    duration = "4-8 semanas";
  }

  return {
    duration,
    max: Math.round(adjustedTotal * 1.15),
    min: Math.round(adjustedTotal * 0.85),
  };
}

export function buildQuoteWhatsAppMessage(data: QuoteData, estimate: Estimate) {
  return `Hola ${businessConfig.name}. Soy ${data.name}. Use el chatbot y obtuve esta estimacion:\n- Proyecto: ${getProjectLabel(
    data.projectType
  )}\n- Area: ${data.area} m2\n- Calidad: ${getQualityLabel(
    data.quality
  )}\n- Estimacion: $${estimate.min.toLocaleString("es-CL")} - $${estimate.max.toLocaleString(
    "es-CL"
  )} CLP\n- Telefono: ${data.phone}\n\nPodrian contactarme para coordinar una visita tecnica?`;
}
