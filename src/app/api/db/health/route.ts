import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Health check simplificado - ya no usa Supabase
    return NextResponse.json({
      ok: true,
      status: "healthy",
      timestamp: new Date().toISOString(),
      services: {
        formspree: "active",
        instagram: "active",
        whatsapp: "active",
      },
      message: "API funcionando correctamente sin base de datos",
    });
  } catch (error) {
    console.error("Health check error:", error);
    return NextResponse.json(
      {
        ok: false,
        status: "error",
        error: "Error en health check",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
