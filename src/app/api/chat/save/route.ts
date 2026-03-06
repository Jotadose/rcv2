import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      error: "Chat persistence disabled",
      message:
        "El chatbot ya no almacena sesiones en el servidor. El resumen se envia directamente por Formspree o WhatsApp.",
    },
    { status: 410 }
  );
}
