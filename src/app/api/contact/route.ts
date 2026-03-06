import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      error: "Endpoint disabled",
      message:
        "El formulario de contacto ya no usa este endpoint. Envia los leads directo a Formspree.",
    },
    { status: 410 }
  );
}
