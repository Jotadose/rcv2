import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import nodemailer from "nodemailer";

// Configurar nodemailer (usa Gmail como ejemplo) - solo si las variables están disponibles
const createEmailTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return null;
  }
  
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // App password, no la contraseña normal
    },
  });
};

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validaciones mejoradas
    const requiredFields = ["name", "phone", "project_type", "location"];
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
    // Datos para guardar en BD (solo columnas que existen en el schema)
    // NOTA: en la tabla contact_submissions el campo email es NOT NULL, así que usamos
    // un placeholder si no se proporcionó uno real para evitar error de inserción.
    const contactData = {
      name: data.name.trim(),
      phone: data.phone.trim(),
      email: (data.email?.trim() || "sin-email@placeholder.local"),
      project_type: data.project_type,
      location: data.location.trim(),
      message: data.message?.trim() || "",
      budget_range: data.budgetRange || null,
    };

    // Guardar en Supabase solo si está configurado
    let savedData = null;
    if (isSupabaseConfigured() && supabase) {
      const { data: dbData, error: dbError } = await supabase
        .from("contact_submissions")
        .insert([contactData])
        .select()
        .single();

      if (dbError) {
        console.error("Error guardando en BD:", dbError);
      } else {
        savedData = dbData;
      }
    } else {
      console.log("Supabase no configurado - datos del contacto:", contactData);
    }

    // Enviar email de notificación si está configurado
    const transporter = createEmailTransporter();
    if (transporter) {
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
          <p><strong>ID de Solicitud:</strong> ${savedData?.id || "N/A"}</p>
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
          to: process.env.EMAIL_TO || "contacto@reformas.cl",
          subject: emailSubject,
          html: emailBody,
        });
      } catch (emailError) {
        console.error("Error enviando email:", emailError);
        // No fallar la request si el email falla
      }
    }

    // Preparar mensaje de WhatsApp para el cliente
    const messageDetails = contactData.message
      ? `Detalles: ${contactData.message}`
      : "";
    const whatsappMessage = encodeURIComponent(
      `Hola REFORMAS! Soy ${contactData.name}. Me interesa cotizar un proyecto de ${contactData.project_type} en ${contactData.location}. ${messageDetails}`
    );

    return NextResponse.json({
      success: true,
      id: savedData?.id || null,
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
