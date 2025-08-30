/**
 * @deprecated ENDPOINT DEPRECATED - YA NO SE USA
 *
 * Este endpoint se mantiene solo para compatibilidad pero está completamente inactivo.
 * El formulario de contacto ahora usa Formspree directamente desde el cliente.
 *
 * Migración realizada el 29/08/2025 - Cambio de Supabase a Formspree
 * Supabase eliminado del proyecto para simplificar el stack.
 */

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  console.warn(
    "🚨 ENDPOINT DEPRECATED: /api/contact ya no se usa. Formulario migrado a Formspree."
  );

  try {
    const data = await request.json();
    console.log("📝 [API Contact - DEPRECATED] Request received:", {
      name: data.name,
      projectType: data.project_type,
      timestamp: new Date().toISOString(),
    });

    // Respuesta que redirige a usar Formspree
    return NextResponse.json(
      {
        success: false,
        deprecated: true,
        message:
          "Este endpoint está desactivado. El formulario usa Formspree ahora.",
        redirect:
          "Use el formulario en la página principal que envía a Formspree.",
      },
      { status: 410 }
    ); // 410 Gone
  } catch (error) {
    console.error("💥 [API Contact - DEPRECATED] Error:", error);
    return NextResponse.json(
      {
        error: "Endpoint desactivado",
        deprecated: true,
        message: "Use Formspree en su lugar",
      },
      { status: 410 }
    );
  }
}
