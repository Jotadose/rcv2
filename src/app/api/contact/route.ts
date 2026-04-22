import { NextResponse } from "next/server";

type LeadPayload = {
  nombre?: string;
  telefono?: string;
  email?: string;
  tipo_proyecto?: string;
  ubicacion?: string;
  mensaje?: string;
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

  let payload: LeadPayload;
  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (
    !isNonEmpty(payload.nombre) ||
    !isNonEmpty(payload.telefono) ||
    !isNonEmpty(payload.tipo_proyecto) ||
    !isNonEmpty(payload.ubicacion)
  ) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const formData = new FormData();
  formData.append("nombre", payload.nombre);
  formData.append("telefono", payload.telefono);
  formData.append("tipo_proyecto", payload.tipo_proyecto);
  formData.append("ubicacion", payload.ubicacion);
  formData.append("_subject", "Nueva consulta desde RC Reformas");

  if (isNonEmpty(payload.email)) {
    formData.append("email", payload.email);
    formData.append("_replyto", payload.email);
  }
  if (isNonEmpty(payload.mensaje)) {
    formData.append("mensaje", payload.mensaje);
  }

  const upstream = await fetch(endpoint, {
    method: "POST",
    body: formData,
    headers: { Accept: "application/json" },
  });

  if (!upstream.ok) {
    return NextResponse.json(
      { error: "Upstream rejected the request" },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
