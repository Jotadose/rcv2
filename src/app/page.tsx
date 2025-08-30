"use client";

import { useState, useEffect } from "react";
import {
  Menu,
  X,
  MessageCircle,
  Bot,
  User,
  Send,
  CheckCircle,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import InstagramEmbedGrid from "@/components/InstagramEmbedGrid";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import businessConfig from "@/config/business";

// Componente WhatsApp Float separado
const WhatsAppFloat = () => {
  const { contact, name } = businessConfig;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href={`https://wa.me/${contact.whatsapp.replace(
          /\D/g,
          ""
        )}?text=Hola%20${name.replace(
          " ",
          "%20"
        )},%20me%20interesa%20cotizar%20un%20proyecto.%20¿Podrían%20ayudarme?`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center bg-green-500 text-white px-4 py-3 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-105"
      >
        <MessageCircle className="w-6 h-6 mr-2" />
        <span className="hidden sm:block">¿Necesitas ayuda?</span>
      </a>
    </div>
  );
};

// Componente del Asistente de Cotización IA Mejorado
const AIChatEstimator = ({ onClose }: { onClose: () => void }) => {
  const { name, pricing } = businessConfig;
  const [messages, setMessages] = useState<
    Array<{
      sender: string;
      text: string;
      timestamp?: Date;
      options?: string[];
    }>
  >([]);
  const [userInput, setUserInput] = useState("");
  const [currentStep, setCurrentStep] = useState("welcome");
  const [isTyping, setIsTyping] = useState(true);
  const [sessionId] = useState(
    () => `chat_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
  );
  const [quoteData, setQuoteData] = useState({
    projectType: null as string | null,
    area: null as number | null,
    quality: null as string | null,
    name: null as string | null,
    phone: null as string | null,
    budget: null as string | null,
    urgency: null as string | null,
  });

  // Opciones predefinidas para reducir errores usando configuración centralizada
  const projectTypes = [
    {
      key: "remodelacion",
      label: "Remodelación",
      multiplier: pricing.projectMultipliers.remodelacion,
    },
    {
      key: "construccion",
      label: "Construcción nueva",
      multiplier: pricing.projectMultipliers.construccion,
    },
    {
      key: "ampliacion",
      label: "Ampliación",
      multiplier: pricing.projectMultipliers.ampliacion,
    },
    {
      key: "mantencion",
      label: "Mantención",
      multiplier: pricing.projectMultipliers.mantencion,
    },
    {
      key: "bano",
      label: "Baño completo",
      multiplier: pricing.projectMultipliers.bano,
    },
    {
      key: "cocina",
      label: "Cocina completa",
      multiplier: pricing.projectMultipliers.cocina,
    },
  ];

  const qualityLevels = [
    {
      key: "economico",
      label: "Económico",
      multiplier: pricing.qualityMultipliers.economico,
    },
    {
      key: "estandar",
      label: "Estándar",
      multiplier: pricing.qualityMultipliers.estandar,
    },
    {
      key: "premium",
      label: "Premium",
      multiplier: pricing.qualityMultipliers.premium,
    },
    { key: "lujo", label: "Lujo", multiplier: pricing.qualityMultipliers.lujo },
  ];

  const budgetRanges = [
    { key: "bajo", label: "Hasta $3M", max: 3000000 }, // Actualizado a precios 2024-2025
    { key: "medio", label: "$3M - $8M", max: 8000000 },
    { key: "alto", label: "$8M - $15M", max: 15000000 },
    { key: "premium", label: "Más de $15M", max: 30000000 },
  ];

  // Flujo de conversación estructurado
  const conversationFlow = {
    welcome: {
      message: `¡Hola! 👋 Soy tu Asistente de Cotización de ${name}. Te ayudo a obtener una estimación personalizada en minutos. ¿Qué tipo de proyecto tienes en mente?`,
      options: projectTypes.map((p) => p.label),
      next: "area",
    },
    area: {
      message:
        "Perfecto. Ahora necesito saber el tamaño del proyecto. ¿Cuántos metros cuadrados aproximadamente? (Escribe solo el número, ej: 50)",
      validator: (input: string) => {
        const num = parseInt(input.replace(/\D/g, ""));
        return num >= 1 && num <= 1000 ? num : null;
      },
      next: "quality",
    },
    quality: {
      message: "Excelente. ¿Qué nivel de terminaciones prefieres?",
      options: qualityLevels.map((q) => q.label),
      next: "budget",
    },
    budget: {
      message:
        "Para darte una estimación más precisa, ¿cuál es tu rango de presupuesto aproximado?",
      options: budgetRanges.map((b) => b.label),
      next: "name",
    },
    name: {
      message:
        "¡Perfecto! Ya tengo la información técnica. Para personalizar tu cotización, ¿cuál es tu nombre?",
      validator: (input: string) =>
        input.trim().length >= 2 ? input.trim() : null,
      next: "phone",
    },
    phone: {
      message:
        "Gracias {name}! Por último, déjame tu número de WhatsApp para enviarte la cotización detallada y coordinar una visita técnica gratuita.",
      validator: (input: string) => {
        const phone = input.replace(/\D/g, "");
        return phone.length >= 8 ? phone : null;
      },
      next: "final",
    },
  };

  useEffect(() => {
    setTimeout(() => {
      const welcome = conversationFlow.welcome;
      setMessages([
        {
          sender: "bot",
          text: welcome.message,
          timestamp: new Date(),
          options: welcome.options,
        },
      ]);
      setIsTyping(false);
    }, 1000);
  }, []);

  const handleUserInput = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isTyping) return;
    processInput(userInput.trim());
    setUserInput("");
  };

  const handleOptionClick = (option: string) => {
    if (isTyping) return;
    processInput(option);
  };

  const processInput = (input: string) => {
    const newMessages = [
      ...messages,
      {
        sender: "user",
        text: input,
        timestamp: new Date(),
      },
    ];
    setMessages(newMessages);
    setIsTyping(true);

    // Procesar respuesta según el paso actual
    const currentFlow =
      conversationFlow[currentStep as keyof typeof conversationFlow];
    let processedValue: any = input;
    let isValid = true;

    // Validar input si hay validador
    if ("validator" in currentFlow && currentFlow.validator) {
      processedValue = currentFlow.validator(input);
      isValid = processedValue !== null;
    }

    if (!isValid) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "No pude entender tu respuesta. ¿Podrías intentar de nuevo? 🤔",
            timestamp: new Date(),
          },
        ]);
        setIsTyping(false);
      }, 1000);
      return;
    }

    // Actualizar datos según el paso
    const updatedData = { ...quoteData };
    switch (currentStep) {
      case "welcome": {
        const selectedProject = projectTypes.find(
          (p) =>
            p.label.toLowerCase().includes(input.toLowerCase()) ||
            input.toLowerCase().includes(p.key)
        );
        updatedData.projectType = selectedProject?.key || input;
        break;
      }
      case "area":
        updatedData.area = processedValue;
        break;
      case "quality": {
        const selectedQuality = qualityLevels.find(
          (q) =>
            q.label.toLowerCase().includes(input.toLowerCase()) ||
            input.toLowerCase().includes(q.key)
        );
        updatedData.quality = selectedQuality?.key || input.toLowerCase();
        break;
      }
      case "budget": {
        const selectedBudget = budgetRanges.find((b) =>
          b.label.toLowerCase().includes(input.toLowerCase())
        );
        updatedData.budget = selectedBudget?.key || input;
        break;
      }
      case "name":
        updatedData.name = processedValue;
        break;
      case "phone":
        updatedData.phone = processedValue;
        break;
    }
    setQuoteData(updatedData);

    // Continuar al siguiente paso
    setTimeout(() => {
      const nextStep = currentFlow.next;

      if (nextStep === "final") {
        handleFinalStep(updatedData, newMessages);
      } else {
        proceedToNextStep(nextStep, updatedData);
      }
    }, 1500);
  };

  const proceedToNextStep = (nextStep: string, data: typeof quoteData) => {
    const nextFlow =
      conversationFlow[nextStep as keyof typeof conversationFlow];
    let message = nextFlow.message;

    // Personalizar mensaje con datos previos
    if (data.name && message.includes("{name}")) {
      message = message.replace("{name}", data.name);
    }

    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text: message,
        timestamp: new Date(),
        options: "options" in nextFlow ? nextFlow.options : undefined,
      },
    ]);

    setCurrentStep(nextStep);
    setIsTyping(false);
  };

  const handleFinalStep = async (
    data: typeof quoteData,
    allMessages: any[]
  ) => {
    const estimate = calculateImprovedEstimate(data);

    const finalMessage = `🎉 ¡Listo, ${data.name}!

📋 **Resumen de tu proyecto:**
• Tipo: ${getProjectLabel(data.projectType)}
• Área: ${data.area} m²
• Calidad: ${getQualityLabel(data.quality)}

💰 **Estimación:**
$${estimate.min.toLocaleString("es-CL")} - $${estimate.max.toLocaleString(
      "es-CL"
    )} CLP

⏰ **Tiempo estimado:** ${estimate.duration}

✅ **Próximos pasos:**
1. Un especialista te contactará en menos de 2 horas
2. Visitaremos tu proyecto sin costo
3. Recibirás cotización detallada en 24hrs

¡Gracias por confiar en ${name}! 🏗️`;

    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text: finalMessage,
        timestamp: new Date(),
      },
    ]);

    // NUEVO: Enviar a Formspree automáticamente después de mostrar el resumen
    setTimeout(() => {
      enviarDatosFormspree({
        tipo: getProjectLabel(data.projectType),
        area: data.area?.toString() || "0",
        calidad: getQualityLabel(data.quality),
        presupuesto: data.budget || "No especificado",
        nombre: data.name || "No proporcionado",
        telefono: data.phone || "No proporcionado",
        email: "No proporcionado", // El chatbot actual no pide email
        total: `$${estimate.min.toLocaleString(
          "es-CL"
        )} - $${estimate.max.toLocaleString("es-CL")} CLP`,
        desglose: JSON.stringify({
          estimacionMinima: estimate.min,
          estimacionMaxima: estimate.max,
          tiempoEstimado: estimate.duration,
          projectType: data.projectType,
          quality: data.quality,
          budget: data.budget,
        }),
        fecha: new Date().toLocaleString("es-CL"),
      });
    }, 2000); // Espera 2 segundos para que el usuario vea el resumen

    // Guardar sesión en BD
    try {
      await fetch("/api/chat/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionData: {
            sessionId,
            ...data,
            estimatedMin: estimate.min,
            estimatedMax: estimate.max,
            messages: [...allMessages, { sender: "bot", text: finalMessage }],
          },
        }),
      });
    } catch (error) {
      console.error("Error guardando chat:", error);
    }

    setIsTyping(false);
  };

  const calculateImprovedEstimate = (data: typeof quoteData) => {
    const basePrice = pricing.basePricePerM2;
    const area = data.area || 50;

    // Multiplicadores más precisos
    const projectMultiplier = getProjectMultiplier(data.projectType);
    const qualityMultiplier = getQualityMultiplier(data.quality);

    const baseTotal = area * basePrice * projectMultiplier * qualityMultiplier;

    // Ajuste por presupuesto declarado más realista
    let budgetAdjustment = 1.0;
    if (data.budget === "bajo")
      budgetAdjustment = 0.75; // Reducción más significativa
    else if (data.budget === "premium") budgetAdjustment = 1.35; // Aumento más realista

    const adjustedTotal = baseTotal * budgetAdjustment;

    let duration = "2-6 semanas";
    if (area > 100) {
      duration = "6-12 semanas";
    } else if (area > 50) {
      duration = "4-8 semanas";
    }

    return {
      min: Math.round(adjustedTotal * 0.85),
      max: Math.round(adjustedTotal * 1.15),
      duration,
    };
  };

  const getProjectMultiplier = (type: string | null) => {
    const project = projectTypes.find((p) => p.key === type);
    return project?.multiplier || 1.0;
  };

  const getQualityMultiplier = (quality: string | null) => {
    const qual = qualityLevels.find((q) => q.key === quality);
    return qual?.multiplier || 1.0;
  };

  const getProjectLabel = (type: string | null) => {
    const project = projectTypes.find((p) => p.key === type);
    return project?.label || type || "Proyecto";
  };

  const getQualityLabel = (quality: string | null) => {
    const qual = qualityLevels.find((q) => q.key === quality);
    return qual?.label || quality || "Estándar";
  };

  // Función para enviar datos a Formspree automáticamente (MÉTODO CON FETCH - SIN RECARGAR PÁGINA)
  const enviarDatosFormspree = async (datos: {
    tipo: string;
    area: string;
    calidad: string;
    presupuesto: string;
    nombre: string;
    telefono: string;
    email: string;
    total: string;
    desglose: string;
    fecha: string;
  }) => {
    const formspreeEndpoint =
      process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ||
      "https://formspree.io/f/TU_CODIGO";

    try {
      console.log("🚀 [Chatbot] Enviando datos a Formspree:", datos);

      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: "Nueva consulta desde Chatbot AI - RC Reformas",
          tipo_proyecto: datos.tipo,
          area_m2: datos.area,
          nivel_calidad: datos.calidad,
          presupuesto_declarado: datos.presupuesto,
          nombre_cliente: datos.nombre,
          telefono_cliente: datos.telefono,
          email_cliente: datos.email,
          estimacion_total: datos.total,
          desglose_tecnico: datos.desglose,
          fecha_consulta: datos.fecha,
          origen: "Chatbot IA",
        }),
      });

      if (response.ok) {
        console.log("✅ [Chatbot] Datos enviados exitosamente a Formspree");

        // Mostrar mensaje de confirmación en el chat
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              sender: "assistant",
              text: "✅ ¡Perfecto! He enviado tu información a nuestro equipo. Te contactaremos pronto por WhatsApp o teléfono.",
              timestamp: new Date(),
            },
          ]);
        }, 1000);
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error("💥 [Chatbot] Error enviando a Formspree:", error);

      // Fallback: abrir WhatsApp con los datos del presupuesto
      const whatsappMessage = `Hola ${businessConfig.name}! Soy ${datos.nombre}. 

Acabo de usar el chatbot y obtuve esta estimación:
• Proyecto: ${datos.tipo}
• Área: ${datos.area} m²
• Calidad: ${datos.calidad}
• Presupuesto estimado: ${datos.total}

Mi teléfono: ${datos.telefono}

¿Podrían contactarme para coordinar una visita técnica?`;

      setTimeout(() => {
        window.open(
          `https://wa.me/${businessConfig.contact.whatsapp.replace(
            /\D/g,
            ""
          )}?text=${encodeURIComponent(whatsappMessage)}`,
          "_blank"
        );

        // Mostrar mensaje de fallback en el chat
        setMessages((prev) => [
          ...prev,
          {
            sender: "assistant",
            text: "📲 Te he redirigido a WhatsApp con tu presupuesto. Nuestro equipo te responderá inmediatamente.",
            timestamp: new Date(),
          },
        ]);
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-4 border-b bg-slate-50 rounded-t-xl">
          <div className="flex items-center space-x-3">
            <img
              src="/REFORMAS/reformaslogohor.jpg"
              alt={businessConfig.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                Asistente IA de Cotización
              </h3>
              <p className="text-sm text-gray-500">{name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div
                key={`message-${index}-${msg.sender}`}
                className={`flex items-end gap-2 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "bot" && (
                  <img
                    src="/REFORMAS/ingeniero-avatar.jpg"
                    alt="Avatar Bot"
                    className="w-6 h-6 rounded-full object-cover self-start flex-shrink-0 border border-gray-300"
                  />
                )}
                <div className="max-w-xs">
                  <div
                    className={`p-3 rounded-lg ${
                      msg.sender === "user"
                        ? "bg-orange-500 text-white"
                        : "bg-white text-gray-800 shadow-sm"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{msg.text}</p>
                  </div>

                  {/* Botones de opciones */}
                  {msg.sender === "bot" && msg.options && (
                    <div className="mt-2 space-y-1">
                      {msg.options.map((option, idx) => (
                        <button
                          key={`${option}-${idx}`}
                          onClick={() => handleOptionClick(option)}
                          className="block w-full text-left px-3 py-2 text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 rounded border border-blue-200 transition-colors"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {msg.sender === "user" && (
                  <User className="w-6 h-6 text-gray-400 self-start flex-shrink-0" />
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-end gap-2 justify-start">
                <img
                  src="/REFORMAS/ingeniero-avatar.jpg"
                  alt="Avatar Bot"
                  className="w-6 h-6 rounded-full object-cover self-start flex-shrink-0 border border-gray-300"
                />
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 border-t bg-white rounded-b-xl">
          <form
            onSubmit={handleUserInput}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={
                isTyping ? "Escribiendo..." : "Escribe tu respuesta aquí..."
              }
              className="w-full p-3 border border-gray-300 rounded-full focus:border-orange-500 focus:outline-none px-5"
              disabled={isTyping || currentStep === "final"}
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
};

export default function ReformasOptimized() {
  const [showPopup, setShowPopup] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    projectType: "",
    location: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!showAIChat) {
        setShowPopup(true);
      }
    }, 30000);
    return () => clearTimeout(timer);
  }, [showAIChat]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🚀 [Frontend] Form submitted with data:", formData);

    // Validaciones básicas del lado del cliente
    if (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.projectType ||
      !formData.location.trim()
    ) {
      setSubmitError("Por favor, completa todos los campos requeridos.");
      return;
    }

    // Validación de email (si se proporciona)
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      setSubmitError("Por favor, ingresa un email válido.");
      return;
    }

    // Validación de teléfono español
    const phoneRegex = /^(\+34|0034|34)?[6789]\d{8}$|^[6789]\d{8}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
      setSubmitError(
        "Por favor, ingresa un teléfono válido (formato español)."
      );
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Preparar datos para Formspree
      const formspreeData = new FormData();
      formspreeData.append("nombre", formData.name);
      formspreeData.append("teléfono", formData.phone);
      formspreeData.append("email", formData.email || "");
      formspreeData.append("tipo_proyecto", formData.projectType);
      formspreeData.append("ubicación", formData.location);
      formspreeData.append("mensaje", formData.message || "");

      // Campos ocultos de Formspree
      formspreeData.append("_subject", "Nueva consulta desde RC Reformas");
      formspreeData.append(
        "_replyto",
        formData.email || "noreply@rcreformas.com"
      );

      const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

      if (!formspreeEndpoint) {
        throw new Error("Endpoint de Formspree no configurado");
      }

      console.log("📤 [Frontend] Sending to Formspree:", formspreeEndpoint);

      // Enviar a Formspree
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        body: formspreeData,
        headers: {
          Accept: "application/json",
        },
      });

      console.log("📥 [Frontend] Formspree response status:", response.status);

      if (response.ok) {
        console.log("✅ [Frontend] Form submission successful via Formspree");
        setFormSubmitted(true);

        // Limpiar formulario
        setFormData({
          name: "",
          phone: "",
          email: "",
          projectType: "",
          location: "",
          message: "",
        });

        // También abrir WhatsApp como respaldo/confirmación adicional
        const whatsappMessage = `Hola ${businessConfig.name}, soy ${formData.name}. Me interesa cotizar un proyecto de ${formData.projectType} en ${formData.location}. ${formData.message}`;
        setTimeout(() => {
          window.open(
            `https://wa.me/${businessConfig.contact.whatsapp.replace(
              /\D/g,
              ""
            )}?text=${encodeURIComponent(whatsappMessage)}`,
            "_blank"
          );
        }, 2000);
      } else {
        console.log("⚠️ [Frontend] Formspree failed, using WhatsApp fallback");
        throw new Error("Error al enviar el formulario");
      }
    } catch (error) {
      console.error("💥 [Frontend] Error al enviar mensaje:", error);
      setSubmitError(
        "Hubo un problema al enviar el formulario. Serás redirigido a WhatsApp."
      );

      // Fallback: usar WhatsApp directamente
      setTimeout(() => {
        const whatsappMessage = `Hola ${businessConfig.name}, soy ${formData.name}. Me interesa cotizar un proyecto de ${formData.projectType} en ${formData.location}. ${formData.message}`;
        window.open(
          `https://wa.me/${businessConfig.contact.whatsapp.replace(
            /\D/g,
            ""
          )}?text=${encodeURIComponent(whatsappMessage)}`,
          "_blank"
        );
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }

    setShowPopup(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-slate-800 text-white sticky top-0 z-40 shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <img
                src="/REFORMAS/reformaslogoblanco.jpg"
                alt={`${businessConfig.name} Logo`}
                className="h-12 w-auto rounded-md object-contain"
              />
              <div>
                <div className="text-xl font-bold text-orange-400">
                  {businessConfig.shortName}
                </div>
                <p className="text-xs text-gray-300">
                  {businessConfig.tagline}
                </p>
              </div>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex space-x-8">
              <a
                href="#inicio"
                className="hover:text-orange-400 transition-colors"
              >
                Inicio
              </a>
              <a
                href="#servicios"
                className="hover:text-orange-400 transition-colors"
              >
                Servicios
              </a>
              <a
                href="#proceso"
                className="hover:text-orange-400 transition-colors"
              >
                Proceso
              </a>
              <a
                href="#testimonios"
                className="hover:text-orange-400 transition-colors"
              >
                Testimonios
              </a>
              <a
                href="#contacto"
                className="hover:text-orange-400 transition-colors"
              >
                Contacto
              </a>
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex space-x-4">
              <a
                href={`tel:${businessConfig.contact.phone}`}
                className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                Llamar
              </a>
              <a
                href={`https://wa.me/${businessConfig.contact.whatsapp.replace(
                  /\D/g,
                  ""
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                WhatsApp
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenu && (
            <div className="lg:hidden mt-4 pb-4 border-t border-slate-700">
              <nav className="flex flex-col space-y-2 mt-4">
                <a
                  href="#inicio"
                  className="hover:text-orange-400 transition-colors"
                >
                  Inicio
                </a>
                <a
                  href="#servicios"
                  className="hover:text-orange-400 transition-colors"
                >
                  Servicios
                </a>
                <a
                  href="#proceso"
                  className="hover:text-orange-400 transition-colors"
                >
                  Proceso
                </a>
                <a
                  href="#testimonios"
                  className="hover:text-orange-400 transition-colors"
                >
                  Testimonios
                </a>
                <a
                  href="#contacto"
                  className="hover:text-orange-400 transition-colors"
                >
                  Contacto
                </a>
              </nav>
              <div className="flex space-x-4 mt-4">
                <a
                  href={`tel:${businessConfig.contact.phone}`}
                  className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                  Llamar
                </a>
                <a
                  href={`https://wa.me/${businessConfig.contact.whatsapp.replace(
                    /\D/g,
                    ""
                  )}`}
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

      {/* Hero Section */}
      <HeroSection onOpenAIChat={() => setShowAIChat(true)} />

      {/* Services Section */}
      <ServicesSection />

      {/* Why Choose Us */}
      <section className="py-20 bg-slate-800 text-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              ¿Por Qué Elegir {businessConfig.name}?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              La diferencia que nos convierte en líderes de la región
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "15+ Años de Experiencia",
                description:
                  "Más de una década perfeccionando cada detalle de nuestro trabajo.",
              },
              {
                title: "Garantía Extendida",
                description:
                  "12 meses de garantía en mano de obra con respaldo total.",
              },
              {
                title: "Materiales Premium",
                description:
                  "Solo trabajamos con proveedores certificados y materiales de primera.",
              },
              {
                title: "Plazos Cumplidos",
                description:
                  "Cronogramas realistas y cumplimiento puntual en cada proyecto.",
              },
              {
                title: "Presupuestos Transparentes",
                description:
                  "Sin sorpresas ni costos ocultos. Todo claro desde el inicio.",
              },
              {
                title: "Atención Personalizada",
                description: "Un proyecto manager dedicado para tu proyecto.",
              },
            ].map((item, index) => (
              <div
                key={`feature-${index + 1}`}
                className="flex items-start space-x-4"
              >
                <CheckCircle className="w-8 h-8 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Feed dinámico desde API Graph */}
      <InstagramEmbedGrid limit={8} />

      {/* Contact Section */}
      <section id="contacto" className="py-20 bg-slate-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Comencemos tu Proyecto Hoy
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Contáctanos para una cotización gratuita y sin compromiso
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-xl p-8 text-slate-800">
              <h3 className="text-2xl font-bold mb-6">
                Solicita tu Cotización
              </h3>

              {/* Mensaje de éxito */}
              {formSubmitted && (
                <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6">
                  <strong>¡Gracias por contactarnos!</strong>
                  <p>
                    Hemos recibido tu mensaje y te responderemos en menos de 24
                    horas.
                  </p>
                  <p className="text-sm mt-1">
                    En breve se abrirá WhatsApp para confirmación inmediata.
                  </p>
                </div>
              )}

              {/* Mensaje de error */}
              {submitError && (
                <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
                  <strong>Error:</strong>
                  <p>{submitError}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold mb-2"
                  >
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold mb-2"
                    >
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Ej: +34 123 456 789"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold mb-2"
                    >
                      Email (opcional)
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="tu@email.com"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="projectType"
                    className="block text-sm font-semibold mb-2"
                  >
                    Tipo de Proyecto *
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                    required
                    disabled={isSubmitting}
                  >
                    <option value="">Selecciona un tipo</option>
                    <option value="Reforma integral">Reforma integral</option>
                    <option value="Reforma parcial">Reforma parcial</option>
                    <option value="Construcción nueva">
                      Construcción nueva
                    </option>
                    <option value="Mantenimiento">Mantenimiento</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-semibold mb-2"
                  >
                    Ubicación *
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Ciudad, comuna"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold mb-2"
                  >
                    Descripción del Proyecto
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none resize-none"
                    placeholder="Cuéntanos sobre tu proyecto..."
                    disabled={isSubmitting}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-colors"
                >
                  {isSubmitting ? "Enviando..." : "Enviar Solicitud"}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  Al enviar este formulario, también se abrirá WhatsApp para una
                  respuesta más rápida.
                </p>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">
                  Información de Contacto
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Phone className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-lg font-semibold mb-1">Teléfono</h4>
                      <p className="text-gray-300">
                        {businessConfig.contact.phone}
                      </p>
                      <p className="text-sm text-gray-400">
                        {businessConfig.businessHours.weekdays}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Mail className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-lg font-semibold mb-1">Email</h4>
                      <p className="text-gray-300">
                        {businessConfig.contact.email}
                      </p>
                      <p className="text-sm text-gray-400">
                        Respuesta en menos de 24h
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MessageCircle className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-lg font-semibold mb-1">WhatsApp</h4>
                      <p className="text-gray-300">
                        {businessConfig.contact.whatsapp}
                      </p>
                      <p className="text-sm text-gray-400">
                        Respuesta inmediata
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-lg font-semibold mb-1">Oficina</h4>
                      <p className="text-gray-300">
                        {businessConfig.location.address},{" "}
                        {businessConfig.location.city}
                      </p>
                      <p className="text-sm text-gray-400">
                        {businessConfig.location.region},{" "}
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

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="mb-4">
                <img
                  src="/REFORMAS/reformaslogohor.jpg"
                  alt="Reformas Construcciones & Mantenimiento Logo"
                  className="h-12 w-auto object-contain"
                  style={{
                    background: "white",
                    borderRadius: "8px",
                    padding: "4px",
                  }}
                />
              </div>
              <p className="text-gray-400 text-sm">
                Más de {businessConfig.stats.yearsExperience} años construyendo
                sueños en {businessConfig.location.region}.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Servicios</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#servicios" className="hover:text-orange-400">
                    Construcción
                  </a>
                </li>
                <li>
                  <a href="#servicios" className="hover:text-orange-400">
                    Reformas
                  </a>
                </li>
                <li>
                  <a href="#servicios" className="hover:text-orange-400">
                    Mantenciones
                  </a>
                </li>
                <li>
                  <a href="#servicios" className="hover:text-orange-400">
                    Ampliaciones
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#inicio" className="hover:text-orange-400">
                    Nosotros
                  </a>
                </li>
                <li>
                  <a href="#proceso" className="hover:text-orange-400">
                    Proceso
                  </a>
                </li>
                <li>
                  <a href="#testimonios" className="hover:text-orange-400">
                    Testimonios
                  </a>
                </li>
                <li>
                  <a href="#contacto" className="hover:text-orange-400">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contacto</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>{businessConfig.contact.phone}</p>
                <p>{businessConfig.contact.email}</p>
                <p>
                  {businessConfig.location.address},{" "}
                  {businessConfig.location.city}
                </p>
                <div className="flex space-x-4 mt-4">
                  <a
                    href={`https://wa.me/${businessConfig.contact.whatsapp.replace(
                      /\D/g,
                      ""
                    )}`}
                    className="text-gray-300 hover:text-orange-400"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </a>
                  <a
                    href={businessConfig.social.instagram.url}
                    className="text-gray-300 hover:text-orange-400"
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
            <p>
              &copy; 2025 {businessConfig.name}. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Float Button */}
      <WhatsAppFloat />

      {/* AI Chat Estimator Modal */}
      {showAIChat && <AIChatEstimator onClose={() => setShowAIChat(false)} />}

      {/* Formulario oculto Formspree (añadido después del chatbot) */}
      <form
        id="chatbot-formspree"
        action={
          process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ||
          "https://formspree.io/f/TU_CODIGO"
        }
        method="POST"
        style={{ display: "none" }}
      >
        <input
          type="hidden"
          name="_subject"
          value="Nueva consulta desde Chatbot AI - RC Reformas"
        />
        <input type="hidden" name="tipo_proyecto" id="fs-tipo" />
        <input type="hidden" name="area_m2" id="fs-area" />
        <input type="hidden" name="nivel_calidad" id="fs-calidad" />
        <input type="hidden" name="presupuesto_estimado" id="fs-presupuesto" />
        <input type="hidden" name="nombre_cliente" id="fs-nombre" />
        <input type="hidden" name="telefono_cliente" id="fs-telefono" />
        <input type="hidden" name="email_cliente" id="fs-email" />
        <input type="hidden" name="estimacion_total" id="fs-total" />
        <input type="hidden" name="desglose" id="fs-desglose" />
        <input type="hidden" name="fecha_consulta" id="fs-fecha" />
      </form>

      {/* Popup Modal (Fallback) */}
      {showPopup && (
        <div className="fixed inset-0 bg-black-20 bg-opacity-30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-slate-800">
                ¡Obtén tu Cotización Gratuita!
              </h3>
              <button
                onClick={() => setShowPopup(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mensaje de éxito en popup */}
            {formSubmitted && (
              <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6">
                <strong>¡Gracias por contactarnos!</strong>
                <p>
                  Hemos recibido tu mensaje y te responderemos en menos de 24
                  horas.
                </p>
              </div>
            )}

            {/* Mensaje de error en popup */}
            {submitError && (
              <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
                <strong>Error:</strong>
                <p>{submitError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Tu nombre"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-slate-700 placeholder:text-gray-500"
                required
                disabled={isSubmitting}
              />
              <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Teléfono"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-slate-700 placeholder:text-gray-500"
                  required
                  disabled={isSubmitting}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email (opcional)"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-slate-700 placeholder:text-gray-500"
                  disabled={isSubmitting}
                />
              </div>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-slate-700"
                required
                disabled={isSubmitting}
              >
                <option value="" className="text-gray-500">
                  Tipo de proyecto
                </option>
                <option value="Reforma integral" className="text-slate-700">
                  Reforma integral
                </option>
                <option value="Reforma parcial" className="text-slate-700">
                  Reforma parcial
                </option>
                <option value="Construcción nueva" className="text-slate-700">
                  Construcción nueva
                </option>
                <option value="Mantenimiento" className="text-slate-700">
                  Mantenimiento
                </option>
                <option value="Otro" className="text-slate-700">
                  Otro
                </option>
              </select>
              <input
                type="text"
                name="location"
                placeholder="Ubicación"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-slate-700 placeholder:text-gray-500"
                required
                disabled={isSubmitting}
              />
              <textarea
                name="message"
                placeholder="Describe tu proyecto"
                value={formData.message}
                onChange={handleInputChange}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none resize-none text-slate-700 placeholder:text-gray-500"
                disabled={isSubmitting}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-colors"
              >
                {isSubmitting ? "Enviando..." : "Enviar Solicitud"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
