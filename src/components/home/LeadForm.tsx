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

const INITIAL: LeadFormData = {
  email: "",
  location: "",
  message: "",
  name: "",
  phone: "",
  projectType: "",
};

const PROJECT_OPTIONS = [
  "Remodelación",
  "Obra Nueva",
  "Mantención",
  "Diseño Interior",
  "Otro",
];

function isValidChilePhone(raw: string) {
  const d = raw.replace(/\D/g, "");
  return /^9\d{8}$/.test(d) || /^569\d{8}$/.test(d) || /^09\d{8}$/.test(d);
}

function buildLeadMessage(data: LeadFormData) {
  const detail = data.message ? ` ${data.message}` : "";
  return `Hola ${businessConfig.name}, soy ${data.name}. Me interesa cotizar un proyecto de ${data.projectType} en ${data.location}.${detail}`;
}

const inputStyle: React.CSSProperties = {
  background: "var(--surface2)",
  border: "1px solid var(--border2)",
  borderRadius: "var(--radius-sm)",
  padding: "12px 14px",
  color: "var(--text)",
  fontSize: "0.9rem",
  outline: "none",
  transition: "border-color .2s",
  width: "100%",
  fontFamily: "inherit",
};

const labelStyle: React.CSSProperties = {
  fontSize: "0.72rem",
  fontWeight: 600,
  color: "var(--muted)",
  letterSpacing: 0.5,
  textTransform: "uppercase",
  display: "block",
  marginBottom: 5,
  fontFamily: "var(--font-poppins)",
};

export default function LeadForm({ onSuccess, variant = "inline" }: LeadFormProps) {
  const [formData, setFormData] = useState(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openWhatsApp = (data: LeadFormData) => {
    window.open(buildWhatsAppUrl(businessConfig.contact.whatsapp, buildLeadMessage(data)), "_blank");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.projectType || !formData.location.trim()) {
      setError("Completa todos los campos requeridos.");
      return;
    }
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Ingresa un email válido.");
      return;
    }
    if (!isValidChilePhone(formData.phone)) {
      setError("Ingresa un teléfono válido (ej: +56 9 1234 5678).");
      return;
    }

    setSubmitting(true);
    setError("");
    const current = { ...formData };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: current.name,
          telefono: current.phone,
          email: current.email,
          tipo_proyecto: current.projectType,
          ubicacion: current.location,
          mensaje: current.message,
        }),
      });
      if (!res.ok) throw new Error("rejected");
      setSubmitted(true);
      setFormData(INITIAL);
      window.setTimeout(() => openWhatsApp(current), 1500);
      if (onSuccess) window.setTimeout(onSuccess, 2000);
    } catch {
      setError("No se pudo enviar. Abriremos WhatsApp para continuar.");
      window.setTimeout(() => openWhatsApp(current), 1500);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {submitted && (
        <div
          style={{
            background: "rgba(37,211,102,.12)",
            border: "1px solid rgba(37,211,102,.4)",
            color: "var(--green)",
            padding: "12px 16px",
            borderRadius: "var(--radius-sm)",
            marginBottom: 16,
            fontSize: "0.88rem",
          }}
        >
          <strong>¡Gracias!</strong> Recibimos tu mensaje y abriremos WhatsApp para el seguimiento.
        </div>
      )}
      {error && (
        <div
          style={{
            background: "rgba(255,80,80,.1)",
            border: "1px solid rgba(255,80,80,.35)",
            color: "#ff8080",
            padding: "12px 16px",
            borderRadius: "var(--radius-sm)",
            marginBottom: 16,
            fontSize: "0.88rem",
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div>
          <label htmlFor={`${variant}-name`} style={labelStyle}>Nombre</label>
          <input
            id={`${variant}-name`}
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Tu nombre completo"
            style={inputStyle}
            required
            disabled={submitting}
          />
        </div>

        <div>
          <label htmlFor={`${variant}-phone`} style={labelStyle}>Teléfono</label>
          <input
            id={`${variant}-phone`}
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+56 9 XXXX XXXX"
            style={inputStyle}
            required
            disabled={submitting}
          />
        </div>

        <div>
          <label htmlFor={`${variant}-projectType`} style={labelStyle}>Tipo de proyecto</label>
          <select
            id={`${variant}-projectType`}
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            style={inputStyle}
            required
            disabled={submitting}
          >
            <option value="" disabled>Selecciona...</option>
            {PROJECT_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={`${variant}-location`} style={labelStyle}>Ciudad / Comuna</label>
          <input
            id={`${variant}-location`}
            name="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
            placeholder="Ej: La Serena"
            style={inputStyle}
            required
            disabled={submitting}
          />
        </div>

        <div>
          <label htmlFor={`${variant}-message`} style={labelStyle}>Descripción (opcional)</label>
          <textarea
            id={`${variant}-message`}
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={variant === "popup" ? 3 : 4}
            placeholder="Cuéntanos qué necesitas..."
            style={{ ...inputStyle, resize: "none", height: variant === "popup" ? 72 : 90 }}
            disabled={submitting}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          style={{
            background: "var(--yellow)",
            color: "#111",
            border: "none",
            borderRadius: "var(--radius)",
            padding: 15,
            width: "100%",
            fontFamily: "var(--font-poppins)",
            fontWeight: 700,
            fontSize: "0.95rem",
            cursor: submitting ? "not-allowed" : "pointer",
            marginTop: 4,
            opacity: submitting ? 0.6 : 1,
            transition: "opacity .2s",
          }}
        >
          {submitting ? "Enviando..." : "Enviar solicitud"}
        </button>

        <p style={{ fontSize: "0.72rem", color: "var(--muted)", textAlign: "center" }}>
          También abriremos WhatsApp para una respuesta más rápida.
        </p>
      </form>
    </>
  );
}
