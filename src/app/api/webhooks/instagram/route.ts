import { NextResponse } from "next/server";

function disabledResponse() {
  return NextResponse.json(
    {
      error: "Instagram webhooks disabled",
      message:
        "El proyecto ya no usa Instagram Graph webhooks. La seccion publica funciona con enlaces y assets estaticos.",
    },
    { status: 410 }
  );
}

export async function GET() {
  return disabledResponse();
}

export async function POST() {
  return disabledResponse();
}
