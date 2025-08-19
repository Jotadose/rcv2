import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import nodemailer from "nodemailer";

// Configurar nodemailer (usa Gmail como ejemplo)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // App password, no la contraseña normal
  },
});

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validaciones mejoradas
    const requiredFields = ["name", "phone", "projectType", "location"];
    const missingFields = requiredFields.filter(
      (field) => !data[field]?.trim()
    );

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Campos requeridos faltantes: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // Limpiar y formatear datos
    const contactData = {
      name: data.name.trim(),
      phone: data.phone.trim(),
      email: data.email?.trim() || null,
      project_type: data.projectType,
      location: data.location.trim(),
      message: data.message?.trim() || "",
      budget_range: data.budgetRange || null,
      preferred_contact: data.preferredContact || "whatsapp",
      status: "new" as const,
    };

    // Guardar en Supabase
    const { data: savedData, error: dbError } = await supabase
      .from("contact_submissions")
      .insert([contactData])
      .select()
      .single();

    if (dbError) {
      console.error("Error guardando en BD:", dbError);
      return NextResponse.json(
        { error: "Error al guardar la solicitud" },
        { status: 500 }
      );
    }

    // Enviar email de notificación
    try {
      const emailSubject = `Nueva Solicitud de Cotización - ${contactData.project_type}`;
      const emailBody = `
        <h2>Nueva Solicitud de Cotización</h2>
        <p><strong>Nombre:</strong> ${contactData.name}</p>
        <p><strong>Teléfono:</strong> ${contactData.phone}</p>
        <p><strong>Email:</strong> ${
          contactData.email || "No proporcionado"
        }</p>
        <p><strong>Tipo de Proyecto:</strong> ${contactData.project_type}</p>
        <p><strong>Ubicación:</strong> ${contactData.location}</p>
        <p><strong>Presupuesto:</strong> ${
          contactData.budget_range || "No especificado"
        }</p>
        <p><strong>Contacto Preferido:</strong> ${
          contactData.preferred_contact
        }</p>
        <p><strong>Mensaje:</strong></p>
        <p>${contactData.message}</p>
        
        <hr>
        <p><strong>ID de Solicitud:</strong> ${savedData.id}</p>
        <p><strong>Fecha:</strong> ${new Date().toLocaleDateString("es-CL")}</p>
        
        <p>
          <a href="https://wa.me/${contactData.phone.replace(/\D/g, "")}" 
             style="background: #25D366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
            Contactar por WhatsApp
          </a>
        </p>
      `;

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to:
          process.env.CONTACT_EMAIL_TO ||
          "rcconstruccionesymantenimiento@gmail.com",
        subject: emailSubject,
        html: emailBody,
      });
    } catch (emailError) {
      console.error("Error enviando email:", emailError);
      // No fallar la request si el email falla
    }

    // 3. Enviar notificación por WhatsApp al administrador
    try {
      const adminWhatsappMessage = `🔔 NUEVO CONTACTO RC REFORMAS

📋 Datos del Cliente:
• Nombre: ${contactData.name}
• Email: ${contactData.email}
• Teléfono: ${contactData.phone || "No proporcionado"}
• Proyecto: ${contactData.project_type || "No especificado"}
• Ubicación: ${contactData.location || "No especificada"}

💬 Mensaje:
${contactData.message || "Sin mensaje adicional"}

⏰ ${new Date().toLocaleString("es-CL")}

💡 Responde rápido para mayor conversión!`;

      // En un entorno real, aquí integrarías WhatsApp Business API
      console.log("📱 WhatsApp notification for admin:", adminWhatsappMessage);
    } catch (whatsappError) {
      console.log(
        "⚠️ WhatsApp notification failed (not critical):",
        whatsappError
      );
    }

    // Preparar mensaje de WhatsApp para el cliente
    const messageDetails = contactData.message
      ? `Detalles: ${contactData.message}`
      : "";
    const whatsappMessage = encodeURIComponent(
      `Hola RC Reformas! Soy ${contactData.name}. Me interesa cotizar un proyecto de ${contactData.project_type} en ${contactData.location}. ${messageDetails}`
    );

    return NextResponse.json({
      success: true,
      id: savedData.id,
      whatsappUrl: `https://wa.me/56987593649?text=${whatsappMessage}`,
      message: "Solicitud enviada correctamente",
    });
  } catch (error) {
    console.error("Error en formulario:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
