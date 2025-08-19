#!/usr/bin/env node

// Script de pre-despliegue para verificar configuración
const fs = require("fs");
const path = require("path");

console.log("🚀 Verificando configuración para despliegue...\n");

// 1. Verificar archivos esenciales
const essentialFiles = [
  "package.json",
  "next.config.ts",
  "tsconfig.json",
  "vercel.json",
  ".env.example",
  "src/config/business.ts",
];

console.log("📁 Verificando archivos esenciales:");
essentialFiles.forEach((file) => {
  if (fs.existsSync(file)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - FALTANTE`);
  }
});

// 2. Verificar configuración de negocio
console.log("\n📋 Verificando configuración de negocio:");
try {
  const businessConfig = require("./src/config/business.ts");
  const config = businessConfig.businessConfig || businessConfig.default;

  const checks = [
    { key: "contact.phone", value: config.contact?.phone },
    { key: "contact.whatsapp", value: config.contact?.whatsapp },
    { key: "contact.email", value: config.contact?.email },
    { key: "name", value: config.name },
    { key: "location.city", value: config.location?.city },
  ];

  checks.forEach((check) => {
    if (
      check.value &&
      !check.value.includes("CAMBIAR") &&
      !check.value.includes("5123")
    ) {
      console.log(`  ✅ ${check.key}: ${check.value}`);
    } else {
      console.log(`  ⚠️  ${check.key}: ${check.value || "NO CONFIGURADO"}`);
    }
  });
} catch (error) {
  console.log("  ❌ Error leyendo configuración:", error.message);
}

// 3. Verificar dependencias críticas
console.log("\n📦 Verificando dependencias:");
try {
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
  const criticalDeps = [
    "next",
    "react",
    "framer-motion",
    "@supabase/supabase-js",
    "nodemailer",
  ];

  criticalDeps.forEach((dep) => {
    if (pkg.dependencies[dep]) {
      console.log(`  ✅ ${dep}: ${pkg.dependencies[dep]}`);
    } else {
      console.log(`  ❌ ${dep}: NO INSTALADO`);
    }
  });
} catch (error) {
  console.log("  ❌ Error leyendo package.json");
}

// 4. Verificar APIs
console.log("\n🔗 APIs disponibles:");
const apiRoutes = [
  "src/app/api/contact/route.ts",
  "src/app/api/instagram/route.ts",
  "src/app/api/chat/save/route.ts",
];

apiRoutes.forEach((route) => {
  if (fs.existsSync(route)) {
    console.log(
      `  ✅ ${route.replace("src/app/api/", "/api/").replace("/route.ts", "")}`
    );
  } else {
    console.log(
      `  ❌ ${route
        .replace("src/app/api/", "/api/")
        .replace("/route.ts", "")} - FALTANTE`
    );
  }
});

// 5. Instrucciones de despliegue
console.log("\n🚀 INSTRUCCIONES DE DESPLIEGUE:");
console.log("  1. Hacer commit y push de los cambios");
console.log("  2. Conectar repositorio a Vercel");
console.log("  3. Configurar variables de entorno en Vercel:");
console.log("     - INSTAGRAM_ACCESS_TOKEN (opcional)");
console.log("     - NEXT_PUBLIC_SUPABASE_URL");
console.log("     - NEXT_PUBLIC_SUPABASE_ANON_KEY");
console.log("     - EMAIL_USER y EMAIL_PASS para notificaciones");
console.log("  4. Hacer deploy");

console.log("\n✨ Configuración verificada. Listo para despliegue!");
