import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const { sessionData } = await request.json();

    // Si Supabase no está configurado, solo retornar éxito sin guardar
    if (!isSupabaseConfigured() || !supabase) {
      console.log("Supabase no configurado - datos del chat:", sessionData);
      return NextResponse.json({
        success: true,
        message: "Chat procesado correctamente",
      });
    }

    // Guardar sesión de chat completa
    // Insert solo en columnas que existen en el schema actual (supabase-setup.sql)
    // Campos disponibles: session_id, name, email, phone, project_type, area, quality, budget,
    // estimated_min, estimated_max, estimated_duration, status, messages
    const payload = {
      session_id: sessionData.sessionId,
      name: sessionData.name || null,
      phone: sessionData.phone || null,
      project_type: sessionData.projectType || null,
      area: sessionData.area || null,
      quality: sessionData.quality || null,
      estimated_min: sessionData.estimatedMin || null,
      estimated_max: sessionData.estimatedMax || null,
      messages: sessionData.messages || [],
      status: "complete",
    };

    const { data, error } = await supabase
      .from("chat_sessions")
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error("Error guardando chat:", error);
      return NextResponse.json(
        { error: "Error al guardar chat" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data.id });
  } catch (error) {
    console.error("Error en chat API:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
