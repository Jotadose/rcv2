import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const { sessionData } = await request.json();

    // Guardar sesión de chat completa
    const { data, error } = await supabase
      .from("chat_sessions")
      .insert([
        {
          session_id: sessionData.sessionId,
          name: sessionData.name,
          phone: sessionData.phone,
          project_type: sessionData.projectType,
          area: sessionData.area,
          quality: sessionData.quality,
          estimated_min: sessionData.estimatedMin,
          estimated_max: sessionData.estimatedMax,
          messages: sessionData.messages,
          completed: true,
        },
      ])
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
