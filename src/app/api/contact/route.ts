/**
 * @deprecated ENDPOINT DEPRECATED - SOLO PARA RESPALDO
 *
 * Este endpoint se mantiene como respaldo pero ya NO se usa activamente.
 * El formulario de contacto ahora usa Formspree para simplificar el despliegue.
 *
 * Migración realizada el 29/08/2025 - Cambio de Supabase/Nodemailer a Formspree
 *
 * Para reactivar este endpoint:
 * 1. Configurar variables de entorno SUPABASE_URL y SUPABASE_ANON_KEY
 * 2. Modificar handleSubmit en page.tsx para usar /api/contact
 * 3. Remover configuración de Formspree
 */

import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export async function POST(request: Request) {
  console.log(
    "⚠️ [API Contact - DEPRECATED] Received POST request - This endpoint is deprecated"
  );

  // Mensaje de advertencia para logs
  console.warn(
    "🚨 ENDPOINT DEPRECATED: /api/contact ya no se usa. Formulario migrado a Formspree."
  );

  try {
    // Verificar configuración de Supabase
    if (!isSupabaseConfigured() || !supabase) {
      console.error("❌ [API Contact] Supabase not configured");
      return NextResponse.json(
        {
          error: "Base de datos no configurada",
          debug: {
            configured: isSupabaseConfigured(),
            clientExists: Boolean(supabase),
          },
        },
        { status: 500 }
      );
    }

    const data = await request.json();
    console.log("📝 [API Contact] Request data:", data);

    // Validaciones
    const requiredFields = ["name", "phone", "project_type", "location"];
    const missingFields = requiredFields.filter(
      (field) => !data[field]?.trim()
    );

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Campos requeridos faltantes: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // Formatear datos
    const contactData = {
      name: data.name.trim(),
      phone: data.phone.trim(),
      email: data.email?.trim() || null,
      project_type: data.project_type,
      location: data.location.trim(),
      message: data.message?.trim() || "",
      budget_range: data.budgetRange || null,
    };

    // Insertar en Supabase
    const { data: dbData, error } = await supabase
      .from("contact_submissions")
      .insert([contactData])
      .select()
      .single();

    if (error) {
      console.error("❌ [API Contact] Supabase error:", error);
      return NextResponse.json(
        {
          error: "Error al guardar en la base de datos",
          details: error.message,
          code: error.code,
        },
        { status: 500 }
      );
    }

    console.log("✅ [API Contact] Successfully saved to DB:", dbData);

    // Respuesta limpia (sin WhatsApp ni email)
    return NextResponse.json({
      success: true,
      id: dbData.id,
      message: "Solicitud guardada correctamente",
      data: dbData,
    });
  } catch (error) {
    console.error("💥 [API Contact] Unexpected error:", error);
    return NextResponse.json(
      {
        error: "Error interno del servidor",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
