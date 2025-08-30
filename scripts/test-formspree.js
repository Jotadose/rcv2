#!/usr/bin/env node

/**
 * Script de verificación para Formspree - RC Reformas
 * Verifica la configuración y proporciona instrucciones de prueba
 */

const fs = require("fs");
const path = require("path");

console.log("🧪 VERIFICACIÓN DE FORMSPREE - RC REFORMAS\n");

// Verificar archivo .env.local
const envPath = path.join(__dirname, "..", ".env.local");
let endpoint = null;

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  const match = envContent.match(/NEXT_PUBLIC_FORMSPREE_ENDPOINT=(.+)/);
  if (match) {
    endpoint = match[1].trim();
  }
}

console.log("📋 Configuración actual:");
console.log(
  "Archivo .env.local:",
  fs.existsSync(envPath) ? "✅ Existe" : "❌ No encontrado"
);
console.log("Endpoint:", endpoint || "❌ No configurado");

if (!endpoint) {
  console.log("\n❌ CONFIGURACIÓN FALTANTE");
  console.log("Añade esta línea a .env.local:");
  console.log("NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/mwpnlbek");
  process.exit(1);
}

if (endpoint.includes("mwpnlbek")) {
  console.log("✅ Form ID correcto: mwpnlbek detectado");
} else {
  console.log("⚠️ Form ID no coincide. Esperado: mwpnlbek");
}

console.log("\n🎯 ESTADO DE LA CONFIGURACIÓN: ✅ LISTO PARA PRUEBAS");

console.log("\n📝 INSTRUCCIONES PARA PRUEBA MANUAL:");
console.log("1. 🌐 Abre http://localhost:3000 en tu navegador");
console.log('2. 📄 Navega a la sección "Contacto" (scroll hacia abajo)');
console.log("3. 📝 Llena el formulario con datos de prueba:");
console.log("   - Nombre: Juan Pérez PRUEBA");
console.log("   - Teléfono: +56 9 8759 3649");
console.log("   - Email: test@rcreformas.cl");
console.log("   - Tipo: Reforma integral");
console.log("   - Ubicación: La Serena, Coquimbo");
console.log("   - Mensaje: Esta es una prueba del formulario");
console.log('4. 🚀 Hacer clic en "Enviar Solicitud"');
console.log("5. ✅ Verificar mensaje de éxito verde");
console.log("6. 💬 WhatsApp debería abrirse automáticamente en 2 segundos");
console.log("7. 📧 Revisar email en la dirección configurada en Formspree");

console.log("\n🔍 QUÉ VERIFICAR EN LA PRUEBA:");
console.log('✓ Mensaje "¡Gracias por contactarnos!" aparece');
console.log("✓ Formulario se resetea (campos vacíos)");
console.log("✓ WhatsApp se abre con mensaje pre-lleno");
console.log("✓ No hay errores en la consola del navegador (F12)");
console.log("✓ Email llega a la dirección configurada en Formspree");

console.log("\n📊 MONITOREO:");
console.log("🔗 Dashboard Formspree: https://formspree.io/forms/mwpnlbek");
console.log("🔧 Consola navegador: F12 → Console para ver logs");

console.log("\n� SI HAY PROBLEMAS:");
console.log(
  '❌ Error "Endpoint not configured" → Reiniciar servidor (Ctrl+C, npm run dev)'
);
console.log("❌ No llega email → Verificar spam y configuración en Formspree");
console.log("❌ Validación falla → Revisar formato teléfono (+56 9 XXXXXXXX)");

console.log("\n🎉 ¡Todo configurado! Procede con la prueba manual.");

module.exports = { endpoint };
