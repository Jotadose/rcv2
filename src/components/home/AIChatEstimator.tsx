"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import { Send, User, X } from "lucide-react";
import businessConfig from "@/config/business";
import { buildWhatsAppUrl } from "@/lib/contact";

type ChatMessage = {
  options?: string[];
  sender: "assistant" | "bot" | "user";
  text: string;
  timestamp?: Date;
};

type ConversationStep =
  | "welcome"
  | "area"
  | "quality"
  | "budget"
  | "name"
  | "phone";

type QuoteData = {
  area: number | null;
  budget: string | null;
  name: string | null;
  phone: string | null;
  projectType: string | null;
  quality: string | null;
};

type ConversationFlowEntry = {
  message: string;
  next: ConversationStep | "final";
  options?: string[];
  validator?: (input: string) => number | string | null;
};

const { name, pricing } = businessConfig;

const PROJECT_TYPES = [
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
];

const QUALITY_LEVELS = [
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
];

const BUDGET_RANGES = [
  { key: "bajo", label: "Hasta $3M" },
  { key: "medio", label: "$3M - $8M" },
  { key: "alto", label: "$8M - $15M" },
  { key: "premium", label: "Mas de $15M" },
];

const CONVERSATION_FLOW: Record<ConversationStep, ConversationFlowEntry> = {
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

function getProjectMultiplier(type: string | null) {
  const project = PROJECT_TYPES.find((item) => item.key === type);
  return project?.multiplier || 1;
}

function getQualityMultiplier(quality: string | null) {
  const qualityMatch = QUALITY_LEVELS.find((item) => item.key === quality);
  return qualityMatch?.multiplier || 1;
}

function getProjectLabel(type: string | null) {
  const project = PROJECT_TYPES.find((item) => item.key === type);
  return project?.label || type || "Proyecto";
}

function getQualityLabel(quality: string | null) {
  const qualityMatch = QUALITY_LEVELS.find((item) => item.key === quality);
  return qualityMatch?.label || quality || "Estandar";
}

function calculateEstimate(data: QuoteData) {
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

function buildQuoteWhatsAppMessage(data: QuoteData, estimate: ReturnType<typeof calculateEstimate>) {
  return `Hola ${businessConfig.name}. Soy ${data.name}. Use el chatbot y obtuve esta estimacion:\n- Proyecto: ${getProjectLabel(
    data.projectType
  )}\n- Area: ${data.area} m2\n- Calidad: ${getQualityLabel(
    data.quality
  )}\n- Estimacion: $${estimate.min.toLocaleString("es-CL")} - $${estimate.max.toLocaleString(
    "es-CL"
  )} CLP\n- Telefono: ${data.phone}\n\nPodrian contactarme para coordinar una visita tecnica?`;
}

export default function AIChatEstimator({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState("");
  const [currentStep, setCurrentStep] = useState<ConversationStep>("welcome");
  const [isTyping, setIsTyping] = useState(true);
  const [quoteData, setQuoteData] = useState<QuoteData>({
    area: null,
    budget: null,
    name: null,
    phone: null,
    projectType: null,
    quality: null,
  });

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const welcome = CONVERSATION_FLOW.welcome;
      setMessages([
        {
          sender: "bot",
          text: welcome.message,
          timestamp: new Date(),
          options: welcome.options,
        },
      ]);
      setIsTyping(false);
    }, 700);

    return () => window.clearTimeout(timer);
  }, []);

  const proceedToNextStep = (nextStep: ConversationStep, data: QuoteData) => {
    const nextFlow = CONVERSATION_FLOW[nextStep];
    const nextMessage = data.name
      ? nextFlow.message.replace("{name}", data.name)
      : nextFlow.message;

    setMessages((current) => [
      ...current,
      {
        sender: "bot",
        text: nextMessage,
        timestamp: new Date(),
        options: nextFlow.options,
      },
    ]);
    setCurrentStep(nextStep);
    setIsTyping(false);
  };

  const sendSummary = async (
    data: QuoteData,
    estimate: ReturnType<typeof calculateEstimate>
  ) => {
    const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT?.trim();

    try {
      if (!formspreeEndpoint) {
        throw new Error("Formspree no configurado");
      }

      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _subject: "Nueva consulta desde Chatbot AI - RC Reformas",
          area_m2: String(data.area || 0),
          estimacion_total: `$${estimate.min.toLocaleString(
            "es-CL"
          )} - $${estimate.max.toLocaleString("es-CL")} CLP`,
          fecha_consulta: new Date().toISOString(),
          nivel_calidad: getQualityLabel(data.quality),
          nombre_cliente: data.name,
          origen: "Chatbot IA",
          presupuesto_declarado: data.budget || "No especificado",
          telefono_cliente: data.phone,
          tiempo_estimado: estimate.duration,
          tipo_proyecto: getProjectLabel(data.projectType),
        }),
      });

      if (!response.ok) {
        throw new Error("Formspree rechazo la solicitud");
      }

      setMessages((current) => [
        ...current,
        {
          sender: "assistant",
          text: "Perfecto. Ya envie tu resumen al equipo y te contactaremos pronto por WhatsApp o telefono.",
          timestamp: new Date(),
        },
      ]);
    } catch {
      const whatsappUrl = buildWhatsAppUrl(
        businessConfig.contact.whatsapp,
        buildQuoteWhatsAppMessage(data, estimate)
      );

      window.setTimeout(() => {
        window.open(whatsappUrl, "_blank");
      }, 1200);

      setMessages((current) => [
        ...current,
        {
          sender: "assistant",
          text: "No pude enviar el resumen por formulario. Te redirigire a WhatsApp con los datos del presupuesto.",
          timestamp: new Date(),
        },
      ]);
    }
  };

  const handleFinalStep = (data: QuoteData) => {
    const estimate = calculateEstimate(data);
    const finalMessage = `Listo, ${data.name}.\n\nResumen del proyecto:\n- Tipo: ${getProjectLabel(
      data.projectType
    )}\n- Area: ${data.area} m2\n- Calidad: ${getQualityLabel(
      data.quality
    )}\n\nEstimacion:\n$${estimate.min.toLocaleString("es-CL")} - $${estimate.max.toLocaleString(
      "es-CL"
    )} CLP\n\nTiempo estimado: ${estimate.duration}`;

    setMessages((current) => [
      ...current,
      {
        sender: "bot",
        text: finalMessage,
        timestamp: new Date(),
      },
    ]);
    setIsTyping(false);

    void sendSummary(data, estimate);
  };

  const processInput = (input: string) => {
    setMessages((current) => [
      ...current,
      {
        sender: "user",
        text: input,
        timestamp: new Date(),
      },
    ]);
    setIsTyping(true);

    const currentFlow = CONVERSATION_FLOW[currentStep];
    const processedValue = currentFlow.validator
      ? currentFlow.validator(input)
      : input;

    if (processedValue === null) {
      window.setTimeout(() => {
        setMessages((current) => [
          ...current,
          {
            sender: "bot",
            text: "No pude entender la respuesta. Intenta de nuevo, por favor.",
            timestamp: new Date(),
          },
        ]);
        setIsTyping(false);
      }, 700);
      return;
    }

    const nextData = { ...quoteData };

    if (currentStep === "welcome") {
      const selectedProject = PROJECT_TYPES.find(
        (item) =>
          item.label.toLowerCase().includes(input.toLowerCase()) ||
          input.toLowerCase().includes(item.key)
      );
      nextData.projectType = selectedProject?.key || input.toLowerCase();
    }

    if (currentStep === "area" && typeof processedValue === "number") {
      nextData.area = processedValue;
    }

    if (currentStep === "quality") {
      const selectedQuality = QUALITY_LEVELS.find(
        (item) =>
          item.label.toLowerCase().includes(input.toLowerCase()) ||
          input.toLowerCase().includes(item.key)
      );
      nextData.quality = selectedQuality?.key || input.toLowerCase();
    }

    if (currentStep === "budget") {
      const selectedBudget = BUDGET_RANGES.find((item) =>
        item.label.toLowerCase().includes(input.toLowerCase())
      );
      nextData.budget = selectedBudget?.key || input.toLowerCase();
    }

    if (currentStep === "name" && typeof processedValue === "string") {
      nextData.name = processedValue;
    }

    if (currentStep === "phone" && typeof processedValue === "string") {
      nextData.phone = processedValue;
    }

    setQuoteData(nextData);

    window.setTimeout(() => {
      if (currentFlow.next === "final") {
        handleFinalStep(nextData);
        return;
      }

      proceedToNextStep(currentFlow.next, nextData);
    }, 900);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!userInput.trim() || isTyping) {
      return;
    }

    processInput(userInput.trim());
    setUserInput("");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-4 border-b bg-slate-50 rounded-t-xl">
          <div className="flex items-center space-x-3">
            <Image
              src="/REFORMAS/reformaslogohor.jpg"
              alt={businessConfig.name}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Asistente de cotizacion
              </h2>
              <p className="text-sm text-gray-500">{name}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={`${message.sender}-${index}`}
                className={`flex items-end gap-2 ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.sender === "bot" && (
                  <Image
                    src="/REFORMAS/reformasnegro.jpg"
                    alt="Avatar del bot"
                    width={24}
                    height={24}
                    className="w-6 h-6 rounded-full object-cover self-start flex-shrink-0 border border-gray-300"
                  />
                )}

                <div className="max-w-xs">
                  <div
                    className={`p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-orange-500 text-white"
                        : "bg-white text-gray-800 shadow-sm"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                  </div>

                  {message.sender === "bot" && message.options && (
                    <div className="mt-2 space-y-1">
                      {message.options.map((option) => (
                        <button
                          key={option}
                          onClick={() => processInput(option)}
                          className="block w-full text-left px-3 py-2 text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 rounded border border-blue-200 transition-colors"
                          disabled={isTyping}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {message.sender === "user" && (
                  <User className="w-6 h-6 text-gray-400 self-start flex-shrink-0" />
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-end gap-2 justify-start">
                <Image
                  src="/REFORMAS/reformasnegro.jpg"
                  alt="Avatar del bot"
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded-full object-cover self-start flex-shrink-0 border border-gray-300"
                />
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 border-t bg-white rounded-b-xl">
          <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <input
              type="text"
              value={userInput}
              onChange={(event) => setUserInput(event.target.value)}
              placeholder={isTyping ? "Escribiendo..." : "Escribe tu respuesta aqui"}
              className="w-full p-3 border border-gray-300 rounded-full focus:border-orange-500 focus:outline-none px-5"
              disabled={isTyping}
            />
            <button
              type="submit"
              className="bg-orange-500 text-white p-3 rounded-full hover:bg-orange-600 disabled:bg-gray-300 transition-colors"
              disabled={isTyping || !userInput.trim()}
            >
              <Send className="w-6 h-6" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
