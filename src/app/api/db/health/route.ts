import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export async function GET() {
  if (!isSupabaseConfigured() || !supabase) {
    return NextResponse.json(
      {
        ok: false,
        configured: false,
        message:
          "Supabase no configurado (revisa variables NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY)",
      },
      { status: 200 }
    );
  }

  try {
    // Conteos rápidos (HEAD + count) para no descargar datos
    const { count: contactCount, error: contactErr } = await supabase
      .from("contact_submissions")
      .select("id", { count: "exact", head: true });

    const { count: chatCount, error: chatErr } = await supabase
      .from("chat_sessions")
      .select("id", { count: "exact", head: true });

    return NextResponse.json({
      ok: true,
      configured: true,
      contact_submissions: contactErr ? null : contactCount,
      chat_sessions: chatErr ? null : chatCount,
      errors: {
        contact: contactErr?.message || null,
        chat: chatErr?.message || null,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (e: any) {
    return NextResponse.json(
      {
        ok: false,
        configured: true,
        error: e?.message || String(e),
      },
      { status: 500 }
    );
  }
}
