import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { sessionData } = await request.json();

    // Log para debugging (sin guardar en BD)
    console.log("🤖 [Chat Session]", {
      sessionId: sessionData.sessionId,
      projectType: sessionData.projectType,
      area: sessionData.area,
      quality: sessionData.quality,
      estimatedRange: `$${sessionData.estimatedMin?.toLocaleString()} - $${sessionData.estimatedMax?.toLocaleString()}`,
      timestamp: new Date().toISOString(),
    });

    // Respuesta exitosa (sin persistencia en BD)
    return NextResponse.json({
      success: true,
      message: "Sesión de chat procesada correctamente",
    });
  } catch (error) {
    console.error("❌ [Chat Save] Error:", error);
    return NextResponse.json(
      { error: "Error procesando sesión de chat" },
      { status: 500 }
    );
  }
}
