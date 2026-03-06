import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      error: "Instagram token refresh disabled",
      message:
        "No hay tokens de Instagram administrados por la aplicacion. La galeria usa configuracion estatica.",
    },
    { status: 410 }
  );
}
