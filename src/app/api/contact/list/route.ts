import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

function checkAuth(req: Request) {
  const key = process.env.ADMIN_API_KEY;
  if (!key) return false;
  const provided = req.headers.get("x-admin-key");
  return provided !== null && provided === key;
}

export async function GET(req: Request) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isSupabaseConfigured() || !supabase) {
    return NextResponse.json(
      { error: "Supabase no configurado" },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(req.url);
  const limit = Math.min(parseInt(searchParams.get("limit") || "50", 10), 200);

  const { data, error } = await supabase
    .from("contact_submissions")
    .select(
      "id,name,email,phone,project_type,location,message,budget_range,created_at"
    )
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ items: data, count: data?.length || 0 });
}
