#!/usr/bin/env node

/**
 * Script de Verificación de Despliegue - RC REFORMAS
 * Verifica que todos los servicios necesarios estén funcionando correctamente
 * Sin dependencias de Supabase - Stack simplificado
 */

const https = require("https");
const fs = require("fs");
const path = require("path");

console.log("🔍 Verificación de Despliegue - RC REFORMAS\n");

// Verificar archivos críticos
function checkCriticalFiles() {
  console.log("📁 Verificando archivos críticos...");

  const criticalFiles = [
    "src/app/page.tsx",
    "src/app/api/instagram/route.ts",
    "src/components/InstagramSection.tsx",
    "vercel.json",
    "package.json",
  ];

  let allFilesExist = true;

  criticalFiles.forEach((file) => {
    if (fs.existsSync(file)) {
      console.log(`  ✅ ${file}`);
    } else {
      console.log(`  ❌ ${file} - FALTANTE`);
      allFilesExist = false;
    }
  });

  return allFilesExist;
}

// Verificar configuración en código
function checkCodeConfiguration() {
  console.log("\n⚙️ Verificando configuración en código...");

  try {
    // Verificar que page.tsx use Formspree
    const pageContent = fs.readFileSync("src/app/page.tsx", "utf8");
    const hasFormspree = pageContent.includes("NEXT_PUBLIC_FORMSPREE_ENDPOINT");
    const hasFormspreeLogic = pageContent.includes("formspreeEndpoint");

    console.log(
      `  ${hasFormspree ? "✅" : "❌"} Formspree endpoint configurado`
    );
    console.log(
      `  ${hasFormspreeLogic ? "✅" : "❌"} Lógica de Formspree implementada`
    );

    // Verificar que no haya referencias activas a Supabase
    const hasSupabaseImport = pageContent.includes('from "@/lib/supabase"');
    console.log(
      `  ${
        !hasSupabaseImport ? "✅" : "❌"
      } Sin dependencias de Supabase en página principal`
    );

    // Verificar Instagram API
    const instagramApiContent = fs.readFileSync(
      "src/app/api/instagram/route.ts",
      "utf8"
    );
    const hasInstagramToken = instagramApiContent.includes(
      "INSTAGRAM_ACCESS_TOKEN"
    );
    console.log(
      `  ${hasInstagramToken ? "✅" : "❌"} Instagram API configurada`
    );

    return (
      hasFormspree &&
      hasFormspreeLogic &&
      !hasSupabaseImport &&
      hasInstagramToken
    );
  } catch (error) {
    console.log(`  ❌ Error leyendo archivos: ${error.message}`);
    return false;
  }
}

// Verificar variables de entorno necesarias
function checkEnvironmentVariables() {
  console.log("\n🌍 Variables de entorno requeridas para producción:");

  const requiredVars = [
    {
      name: "NEXT_PUBLIC_FORMSPREE_ENDPOINT",
      description: "Endpoint de Formspree para formularios",
      example: "https://formspree.io/f/your-form-id",
    },
    {
      name: "INSTAGRAM_ACCESS_TOKEN",
      description: "Token de acceso de Instagram",
      example: "IGQVJ...",
    },
    {
      name: "INSTAGRAM_APP_SECRET",
      description: "Secret de la app de Instagram",
      example: "abc123...",
    },
    {
      name: "NEXT_PUBLIC_SITE_URL",
      description: "URL del sitio web",
      example: "https://rcreformas.vercel.app",
    },
  ];

  console.log(
    "\n📋 Configurar en Vercel > Project > Settings > Environment Variables:"
  );
  requiredVars.forEach((variable) => {
    console.log(`\n  🔑 ${variable.name}`);
    console.log(`     📝 ${variable.description}`);
    console.log(`     💡 Ejemplo: ${variable.example}`);
  });

  return true;
}

// Verificar package.json
function checkPackageJson() {
  console.log("\n📦 Verificando package.json...");

  try {
    const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));

    // Verificar que Supabase no esté en dependencias
    const hasSupabaseDep =
      packageJson.dependencies &&
      packageJson.dependencies["@supabase/supabase-js"];
    console.log(
      `  ${!hasSupabaseDep ? "✅" : "❌"} Supabase eliminado de dependencias`
    );

    // Verificar dependencias esenciales
    const essentialDeps = ["next", "react", "lucide-react"];
    let allEssentialPresent = true;

    essentialDeps.forEach((dep) => {
      const present = packageJson.dependencies && packageJson.dependencies[dep];
      console.log(`  ${present ? "✅" : "❌"} ${dep}`);
      if (!present) allEssentialPresent = false;
    });

    return !hasSupabaseDep && allEssentialPresent;
  } catch (error) {
    console.log(`  ❌ Error leyendo package.json: ${error.message}`);
    return false;
  }
}

// Verificar vercel.json
function checkVercelConfig() {
  console.log("\n🚀 Verificando vercel.json...");

  try {
    const vercelConfig = JSON.parse(fs.readFileSync("vercel.json", "utf8"));

    const hasHeaders = vercelConfig.headers && vercelConfig.headers.length > 0;
    const hasSecurityHeaders = JSON.stringify(vercelConfig).includes(
      "Strict-Transport-Security"
    );
    const hasRedirects =
      vercelConfig.redirects && vercelConfig.redirects.length > 0;

    console.log(
      `  ${hasHeaders ? "✅" : "❌"} Headers de seguridad configurados`
    );
    console.log(`  ${hasSecurityHeaders ? "✅" : "❌"} HSTS configurado`);
    console.log(`  ${hasRedirects ? "✅" : "❌"} Redirects configurados`);

    return hasHeaders && hasSecurityHeaders;
  } catch (error) {
    console.log(`  ❌ Error leyendo vercel.json: ${error.message}`);
    return false;
  }
}

// Función principal
async function main() {
  console.log("Iniciando verificación completa del proyecto...\n");

  const results = {
    files: checkCriticalFiles(),
    code: checkCodeConfiguration(),
    package: checkPackageJson(),
    vercel: checkVercelConfig(),
  };

  checkEnvironmentVariables();

  console.log("\n" + "=".repeat(60));
  console.log("📊 RESUMEN DE VERIFICACIÓN");
  console.log("=".repeat(60));

  Object.entries(results).forEach(([check, passed]) => {
    console.log(
      `${passed ? "✅" : "❌"} ${check.toUpperCase()}: ${
        passed ? "PASÓ" : "FALLÓ"
      }`
    );
  });

  const allPassed = Object.values(results).every((result) => result);

  console.log("\n" + "=".repeat(60));
  if (allPassed) {
    console.log(
      "🎉 ¡VERIFICACIÓN EXITOSA! El proyecto está listo para despliegue."
    );
    console.log("\n📝 Próximos pasos:");
    console.log("   1. Configurar variables de entorno en Vercel");
    console.log("   2. Hacer push al repositorio");
    console.log("   3. Verificar deployment en Vercel");
    console.log("   4. Probar formulario con Formspree");
    console.log("   5. Verificar galería de Instagram");
  } else {
    console.log(
      "⚠️  VERIFICACIÓN INCOMPLETA. Revisar elementos fallidos arriba."
    );
  }
  console.log("=".repeat(60));
}

// Ejecutar verificación
main().catch((error) => {
  console.error("💥 Error durante verificación:", error);
  process.exit(1);
});
