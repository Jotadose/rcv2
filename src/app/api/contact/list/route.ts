import { NextResponse } from "next/server";

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

  // Ya no usamos Supabase - endpoint deshabilitado
  return NextResponse.json(
    {
      error: "Contact list endpoint deshabilitado",
      message:
        "Ya no se almacenan contactos en base de datos - se usan Formspree",
      items: [],
      count: 0,
    },
    { status: 410 } // 410 Gone
  );
}
