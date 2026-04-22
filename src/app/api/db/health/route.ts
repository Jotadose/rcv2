import { NextResponse } from "next/server";
import businessConfig from "@/config/business";

function getFormspreeStatus() {
  return process.env.FORMSPREE_ENDPOINT ? "configured" : "missing";
}

function getInstagramStatus() {
  return process.env.NEXT_PUBLIC_INSTAGRAM_EMBED_URLS ? "configured" : "fallback";
}

function getWhatsAppStatus() {
  return businessConfig.contact.whatsapp ? "configured" : "missing";
}

export async function GET() {
  const services = {
    formspree: getFormspreeStatus(),
    instagram: getInstagramStatus(),
    whatsapp: getWhatsAppStatus(),
  };

  const hasCriticalIssue =
    services.formspree === "missing" || services.whatsapp === "missing";

  return NextResponse.json(
    {
      ok: !hasCriticalIssue,
      status: hasCriticalIssue ? "degraded" : "healthy",
      timestamp: new Date().toISOString(),
      services,
      message: hasCriticalIssue
        ? "Faltan configuraciones para uno o mas canales de contacto."
        : "Configuracion operativa validada.",
    },
    { status: hasCriticalIssue ? 503 : 200 }
  );
}
