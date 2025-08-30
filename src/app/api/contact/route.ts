import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export async function POST(request: Request) {
  console.log("📝 [API Contact] Received POST request");

  try {
    const data = await request.json();
    console.log("📝 [API Contact] Request data:", data);

    // Validaciones básicas
    if (!data.name || !data.phone || !data.project_type || !data.location) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    // Verificar Supabase
    if (!supabase) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 500 }
      );
    }

    // Datos limpios
    const contactData = {
      name: data.name.trim(),
      phone: data.phone.trim(),
      email: data.email?.trim() || null,
      project_type: data.project_type,
      location: data.location.trim(),
      message: data.message?.trim() || "",
      budget_range: data.budgetRange || null,
    };

    console.log("💾 Saving to Supabase...");

    // Guardar en base de datos
    const { data: result, error } = await supabase
      .from("contact_submissions")
      .insert([contactData])
      .select()
      .single();

    if (error) {
      console.error("❌ Supabase error:", error);
      return NextResponse.json(
        { error: "Database error", details: error.message },
        { status: 500 }
      );
    }

    console.log("✅ Saved successfully:", result);

    return NextResponse.json({
      success: true,
      message: "Datos guardados correctamente",
      id: result.id,
    });
  } catch (error) {
    console.error("💥 Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
