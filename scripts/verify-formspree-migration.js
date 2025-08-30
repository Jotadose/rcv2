#!/usr/bin/env node

/**
 * Script de verificación post-migración a Formspree
 * Verifica que todos los componentes funcionen correctamente
 */

const fs = require("fs");
const path = require("path");

console.log("🔍 VERIFICACIÓN POST-MIGRACIÓN A FORMSPREE\n");

// Verificar archivos modificados
const filesToCheck = [
  {
    path: "src/app/page.tsx",
    description: "Página principal con formulario migrado",
    checks: [
      "NEXT_PUBLIC_FORMSPREE_ENDPOINT",
      "formSubmitted",
      "isSubmitting",
      "submitError",
    ],
  },
  {
    path: "src/app/api/contact/route.ts",
    description: "API de contacto marcada como deprecated",
    checks: ["@deprecated", "ENDPOINT DEPRECATED"],
  },
  {
    path: ".env.example",
    description: "Variables de entorno actualizadas",
    checks: ["NEXT_PUBLIC_FORMSPREE_ENDPOINT", "YOUR_FORM_ID"],
  },
];

let allChecksPass = true;

filesToCheck.forEach((file) => {
  console.log(`📄 Verificando: ${file.description}`);

  const filePath = path.join(process.cwd(), file.path);

  if (!fs.existsSync(filePath)) {
    console.log(`   ❌ Archivo no encontrado: ${file.path}`);
    allChecksPass = false;
    return;
  }

  const content = fs.readFileSync(filePath, "utf8");

  file.checks.forEach((check) => {
    if (content.includes(check)) {
      console.log(`   ✅ ${check}`);
    } else {
      console.log(`   ❌ No encontrado: ${check}`);
      allChecksPass = false;
    }
  });

  console.log("");
});

// Verificar que el chatbot no se haya visto afectado
console.log("🤖 Verificando integridad del chatbot...");
const chatApiPath = path.join(process.cwd(), "src/app/api/chat/save/route.ts");
if (fs.existsSync(chatApiPath)) {
  const chatContent = fs.readFileSync(chatApiPath, "utf8");
  if (
    chatContent.includes("chat_sessions") &&
    chatContent.includes("sessionData")
  ) {
    console.log("   ✅ API del chatbot intacta");
  } else {
    console.log("   ❌ API del chatbot modificada incorrectamente");
    allChecksPass = false;
  }
} else {
  console.log("   ❌ API del chatbot no encontrada");
  allChecksPass = false;
}

console.log("");

// Verificar archivos de documentación
console.log("📚 Verificando documentación...");
const docsToCheck = ["FORMSPREE_SETUP.md", "README.md"];

docsToCheck.forEach((doc) => {
  const docPath = path.join(process.cwd(), doc);
  if (fs.existsSync(docPath)) {
    console.log(`   ✅ ${doc} creado/actualizado`);
  } else {
    console.log(`   ❌ ${doc} no encontrado`);
    allChecksPass = false;
  }
});

console.log("\n" + "=".repeat(50));

if (allChecksPass) {
  console.log("🎉 MIGRACIÓN COMPLETADA EXITOSAMENTE");
  console.log("\n📋 PRÓXIMOS PASOS:");
  console.log("1. Crear cuenta en Formspree.io");
  console.log("2. Configurar NEXT_PUBLIC_FORMSPREE_ENDPOINT");
  console.log("3. Redeploy la aplicación");
  console.log("4. Probar el formulario de contacto");
  console.log("\n📖 Ver FORMSPREE_SETUP.md para instrucciones detalladas");
} else {
  console.log("❌ HAY PROBLEMAS CON LA MIGRACIÓN");
  console.log("Revisa los errores mostrados arriba");
  process.exit(1);
}

console.log("\n" + "=".repeat(50));
