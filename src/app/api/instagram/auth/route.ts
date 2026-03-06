import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      error: "Instagram auth disabled",
      message:
        "Este proyecto ya no inicia flujos OAuth de Instagram. Usa publicaciones configuradas por URL.",
    },
    { status: 410 }
  );
}
