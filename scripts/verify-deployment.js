#!/usr/bin/env node

const fs = require("fs");

console.log("Verificacion de despliegue - RC Reformas\n");

function exists(filePath) {
  return fs.existsSync(filePath);
}

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function report(label, passed) {
  console.log(`  ${passed ? "OK " : "ERR"} ${label}`);
  return passed;
}

let passed = true;

console.log("1) Archivos principales");
[
  "src/app/page.tsx",
  "src/components/InstagramEmbedGrid.tsx",
  "src/components/home/LeadForm.tsx",
  "src/components/home/AIChatEstimator.tsx",
  "src/config/site.ts",
  ".env.example",
].forEach((filePath) => {
  passed = report(filePath, exists(filePath)) && passed;
});

console.log("\n2) Dominio y metadata");
try {
  const layout = read("src/app/layout.tsx");
  const business = read("src/config/business.ts");
  passed =
    report("Layout usa SITE_URL", layout.includes("SITE_URL")) && passed;
  passed =
    report(
      "Dominio canonico alineado",
      business.includes('website: "https://rcreformas.cl"')
    ) && passed;
} catch (error) {
  passed = report(`Error leyendo metadata: ${error.message}`, false) && passed;
}

console.log("\n3) Instagram sin API");
try {
  const instagramGrid = read("src/components/InstagramEmbedGrid.tsx");
  const instagramRoute = read("src/app/api/instagram/route.ts");
  passed =
    report(
      "La home no hace fetch a /api/instagram",
      !instagramGrid.includes('fetch("/api/instagram")')
    ) && passed;
  passed =
    report(
      "Ruta /api/instagram deshabilitada",
      instagramRoute.includes("Instagram API disabled")
    ) && passed;
} catch (error) {
  passed = report(`Error leyendo Instagram: ${error.message}`, false) && passed;
}

console.log("\n4) Formulario");
try {
  const leadForm = read("src/components/home/LeadForm.tsx");
  passed =
    report(
      "LeadForm usa Formspree",
      leadForm.includes("NEXT_PUBLIC_FORMSPREE_ENDPOINT")
    ) && passed;
  passed =
    report(
      "LeadForm mantiene fallback a WhatsApp",
      leadForm.includes("buildWhatsAppUrl")
    ) && passed;
} catch (error) {
  passed = report(`Error leyendo formulario: ${error.message}`, false) && passed;
}

console.log("\n5) Variables requeridas");
console.log("  - NEXT_PUBLIC_FORMSPREE_ENDPOINT");
console.log("  - NEXT_PUBLIC_SITE_URL");
console.log("  - NEXT_PUBLIC_INSTAGRAM_EMBED_URLS (opcional)");

console.log("\nResumen");
if (!passed) {
  console.log("Resultado: FALLA");
  process.exit(1);
}

console.log("Resultado: OK");
