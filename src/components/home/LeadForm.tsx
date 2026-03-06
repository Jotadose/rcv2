"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import businessConfig from "@/config/business";
import { buildWhatsAppUrl } from "@/lib/contact";

type LeadFormProps = {
  onSuccess?: () => void;
  variant?: "inline" | "popup";
};

type LeadFormData = {
  email: string;
  location: string;
  message: string;
  name: string;
  phone: string;
  projectType: string;
};

const INITIAL_FORM_STATE: LeadFormData = {
  email: "",
  location: "",
  message: "",
  name: "",
  phone: "",
  projectType: "",
};

const PROJECT_OPTIONS = [
  "Reforma integral",
  "Reforma parcial",
  "Construccion nueva",
  "Mantenimiento",
  "Otro",
];

function isValidChilePhone(rawPhone: string) {
  const digits = rawPhone.replace(/\D/g, "");
  return (
    /^9\d{8}$/.test(digits) ||
    /^569\d{8}$/.test(digits) ||
    /^09\d{8}$/.test(digits)
  );
}

function buildLeadMessage(data: LeadFormData) {
  const detail = data.message ? ` ${data.message}` : "";
  return `Hola ${businessConfig.name}, soy ${data.name}. Me interesa cotizar un proyecto de ${data.projectType} en ${data.location}.${detail}`;
}

export default function LeadForm({
  onSuccess,
  variant = "inline",
}: LeadFormProps) {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const isPopup = variant === "popup";

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const openWhatsApp = (data: LeadFormData) => {
    window.open(
      buildWhatsAppUrl(
        businessConfig.contact.whatsapp,
        buildLeadMessage(data)
      ),
      "_blank"
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.projectType ||
      !formData.location.trim()
    ) {
      setSubmitError("Completa todos los campos requeridos.");
      return;
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      setSubmitError("Ingresa un email valido.");
      return;
    }

    if (!isValidChilePhone(formData.phone)) {
      setSubmitError(
        "Ingresa un telefono valido en formato chileno, por ejemplo +56 9 1234 5678."
      );
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    const currentLead = { ...formData };

    try {
      const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT?.trim();
      if (!formspreeEndpoint) {
        throw new Error("Formspree no esta configurado");
      }

      const payload = new FormData();
      payload.append("nombre", currentLead.name);
      payload.append("telefono", currentLead.phone);
      payload.append("email", currentLead.email);
      payload.append("tipo_proyecto", currentLead.projectType);
      payload.append("ubicacion", currentLead.location);
      payload.append("mensaje", currentLead.message);
      payload.append("_subject", "Nueva consulta desde RC Reformas");

      if (currentLead.email) {
        payload.append("_replyto", currentLead.email);
      }

      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        body: payload,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Formspree rechazo la solicitud");
      }

      setFormSubmitted(true);
      setFormData(INITIAL_FORM_STATE);

      window.setTimeout(() => {
        openWhatsApp(currentLead);
      }, 1500);

      if (onSuccess) {
        window.setTimeout(onSuccess, 2000);
      }
    } catch {
      setSubmitError(
        "No se pudo enviar el formulario. Abriremos WhatsApp para continuar la consulta."
      );

      window.setTimeout(() => {
        openWhatsApp(currentLead);
      }, 1500);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {formSubmitted && (
        <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6">
          <strong>Gracias por contactarnos.</strong>
          <p>
            Recibimos tu mensaje y abriremos WhatsApp para confirmar el
            seguimiento.
          </p>
        </div>
      )}

      {submitError && (
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
          <strong>Error:</strong>
          <p>{submitError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className={isPopup ? "space-y-4" : "space-y-4"}>
        <div>
          <label htmlFor={`${variant}-name`} className="block text-sm font-semibold mb-2">
            Nombre completo *
          </label>
          <input
            type="text"
            id={`${variant}-name`}
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-slate-800"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor={`${variant}-phone`} className="block text-sm font-semibold mb-2">
              Telefono *
            </label>
            <input
              type="tel"
              id={`${variant}-phone`}
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Ej: +56 9 1234 5678"
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-slate-800"
              required
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label htmlFor={`${variant}-email`} className="block text-sm font-semibold mb-2">
              Email (opcional)
            </label>
            <input
              type="email"
              id={`${variant}-email`}
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="tu@email.com"
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-slate-800"
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor={`${variant}-projectType`}
            className="block text-sm font-semibold mb-2"
          >
            Tipo de proyecto *
          </label>
          <select
            id={`${variant}-projectType`}
            name="projectType"
            value={formData.projectType}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-slate-800"
            required
            disabled={isSubmitting}
          >
            <option value="">Selecciona un tipo</option>
            {PROJECT_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor={`${variant}-location`}
            className="block text-sm font-semibold mb-2"
          >
            Ubicacion *
          </label>
          <input
            type="text"
            id={`${variant}-location`}
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Ciudad o comuna"
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-slate-800"
            required
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label
            htmlFor={`${variant}-message`}
            className="block text-sm font-semibold mb-2"
          >
            Descripcion del proyecto
          </label>
          <textarea
            id={`${variant}-message`}
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={isPopup ? 3 : 4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none resize-none text-slate-800"
            placeholder="Cuentanos sobre tu proyecto"
            disabled={isSubmitting}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-primary bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-colors"
        >
          {isSubmitting ? "Enviando..." : "Enviar solicitud"}
        </button>

        <p className="text-xs text-gray-500 text-center">
          Tambien abriremos WhatsApp para una respuesta mas rapida.
        </p>
      </form>
    </>
  );
}
