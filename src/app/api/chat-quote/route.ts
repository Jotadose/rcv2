import { NextResponse } from "next/server";

type QuotePayload = {
  nombre_cliente?: string;
  telefono_cliente?: string;
  tipo_proyecto?: string;
  area_m2?: string;
  nivel_calidad?: string;
  presupuesto_declarado?: string;
  estimacion_total?: string;
  tiempo_estimado?: string;
};

function isNonEmpty(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(request: Request) {
  const endpoint = process.env.FORMSPREE_ENDPOINT?.trim();
  if (!endpoint) {
    return NextResponse.json(
      { error: "Formspree endpoint not configured on server" },
      { status: 503 }
    );
  }

  let payload: QuotePayload;
  try {
    payload = (await request.json()) as QuotePayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (
    !isNonEmpty(payload.nombre_cliente) ||
    !isNonEmpty(payload.telefono_cliente) ||
    !isNonEmpty(payload.tipo_proyecto)
  ) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const upstream = await fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _subject: "Nueva consulta desde Chatbot AI - RC Reformas",
      origen: "Chatbot IA",
      fecha_consulta: new Date().toISOString(),
      ...payload,
    }),
  });

  if (!upstream.ok) {
    return NextResponse.json(
      { error: "Upstream rejected the request" },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
