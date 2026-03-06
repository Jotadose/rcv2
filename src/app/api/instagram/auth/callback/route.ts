import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      error: "Instagram callback disabled",
      message:
        "El callback OAuth de Instagram ya no forma parte del flujo soportado por este sitio.",
    },
    { status: 410 }
  );
}
