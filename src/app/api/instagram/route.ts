import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      error: "Instagram API disabled",
      message:
        "La galeria publica ya no consume Meta APIs. Configura NEXT_PUBLIC_INSTAGRAM_EMBED_URLS o usa la grilla local.",
    },
    { status: 410 }
  );
}
