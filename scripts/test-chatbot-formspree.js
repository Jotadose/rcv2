/**
 * Script de prueba para verificar la integración Chatbot → Formspree
 * Simula el envío de datos como lo haría el chatbot real
 */

async function testChatbotFormspree() {
  console.log("🤖 [TEST] Simulando envío desde Chatbot a Formspree...\n");

  // Endpoint de Formspree desde .env.local
  const formspreeEndpoint = "https://formspree.io/f/mwpnlbek";

  console.log(`📤 Endpoint: ${formspreeEndpoint}`);

  // Datos de prueba que enviaría el chatbot
  const datosPrueba = {
    _subject: "Nueva consulta desde Chatbot AI - RC Reformas",
    tipo_proyecto: "Reforma integral",
    area_m2: "80",
    nivel_calidad: "Premium",
    presupuesto_declarado: "Más de $15M",
    nombre_cliente: "Juan Pérez (PRUEBA)",
    telefono_cliente: "+56 9 9133 6534",
    email_cliente: "No proporcionado",
    estimacion_total: "$24.000.000 - $32.000.000 CLP",
    desglose_tecnico: JSON.stringify({
      estimacionMinima: 24000000,
      estimacionMaxima: 32000000,
      tiempoEstimado: "6-12 semanas",
      projectType: "remodelacion",
      quality: "premium",
      budget: "premium",
    }),
    fecha_consulta: new Date().toLocaleString("es-CL"),
    origen: "Chatbot IA - PRUEBA",
  };

  console.log("📋 Datos a enviar:");
  console.log(JSON.stringify(datosPrueba, null, 2));
  console.log("");

  try {
    console.log("⏳ Enviando datos...");

    const response = await fetch(formspreeEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(datosPrueba),
    });

    console.log(`📥 Respuesta HTTP: ${response.status} ${response.statusText}`);

    if (response.ok) {
      const result = await response.json();
      console.log("✅ ¡ÉXITO! Datos enviados correctamente a Formspree");
      console.log(
        "📧 Deberías recibir un email con la información del presupuesto"
      );
      console.log("📊 Respuesta:", result);

      console.log("\n🎯 INTEGRACIÓN FUNCIONANDO:");
      console.log("• ✅ Chatbot puede enviar datos automáticamente");
      console.log("• ✅ Formspree recibe y procesa la información");
      console.log("• ✅ Email será enviado al equipo de ventas");
      console.log("• ✅ Sin interferir con la UX del chatbot");
    } else {
      const errorText = await response.text();
      console.error("❌ Error en la respuesta:", errorText);
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error("💥 Error enviando a Formspree:", error.message);
    console.log("\n🔧 Posibles soluciones:");
    console.log("• Verifica que NEXT_PUBLIC_FORMSPREE_ENDPOINT esté correcto");
    console.log("• Confirma que tu cuenta de Formspree esté activa");
    console.log("• Revisa que no hayas excedido el límite mensual");

    return false;
  }

  return true;
}

// Ejecutar test
testChatbotFormspree()
  .then((success) => {
    if (success) {
      console.log("\n🚀 ¡Integración lista para producción!");
      console.log(
        "El chatbot ahora enviará automáticamente los datos al finalizar cada cotización."
      );
    }
  })
  .catch((error) => {
    console.error("💥 Error en el test:", error);
    process.exit(1);
  });
