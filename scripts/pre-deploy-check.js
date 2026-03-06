#!/usr/bin/env node

const fs = require("fs");

console.log("Pre-deploy check - RC Reformas\n");

let hasErrors = false;

function check(condition, okMessage, errorMessage) {
  if (condition) {
    console.log(`  OK  ${okMessage}`);
    return;
  }

  console.log(`  ERR ${errorMessage}`);
  hasErrors = true;
}

console.log("1) Archivos esenciales");
const essentialFiles = [
  "package.json",
  "next.config.ts",
  "tsconfig.json",
  "vercel.json",
  ".env.example",
  "src/config/business.ts",
  "src/config/site.ts",
  "src/config/instagram.ts",
  "src/app/page.tsx",
  "src/components/InstagramEmbedGrid.tsx",
  "src/components/home/AIChatEstimator.tsx",
];

for (const file of essentialFiles) {
  check(fs.existsSync(file), file, `${file} no existe`);
}

console.log("\n2) Configuracion de negocio");
try {
  const businessSource = fs.readFileSync("src/config/business.ts", "utf8");
  check(
    businessSource.includes('website: "https://rcreformas.cl"'),
    "Dominio canonico alineado",
    "Dominio canonico inconsistente"
  );
  check(
    businessSource.includes("yearsExperience: 15"),
    "Trayectoria alineada con la metadata",
    "La trayectoria sigue inconsistente"
  );
  check(
    businessSource.includes("Visitas tecnicas en terreno"),
    "Cobertura sin direccion placeholder",
    "Sigue existiendo una direccion de ejemplo"
  );
} catch (error) {
  check(false, "", `No se pudo leer src/config/business.ts: ${error.message}`);
}

console.log("\n3) Variables de entorno");
["NEXT_PUBLIC_FORMSPREE_ENDPOINT", "NEXT_PUBLIC_SITE_URL"].forEach((envName) => {
  console.log(`  - ${envName} (requerida)`);
});
console.log("  - NEXT_PUBLIC_INSTAGRAM_EMBED_URLS (opcional)");

console.log("\n4) Integracion de Instagram");
try {
  const instagramComponent = fs.readFileSync(
    "src/components/InstagramEmbedGrid.tsx",
    "utf8"
  );
  check(
    !instagramComponent.includes('fetch("/api/instagram")'),
    "La galeria no hace fetch al API legacy",
    "La galeria aun intenta consultar /api/instagram"
  );
  check(
    instagramComponent.includes("getInstagramShowcaseItems"),
    "La galeria usa configuracion estatica",
    "La galeria no esta usando la nueva configuracion estatica"
  );
} catch (error) {
  check(false, "", `No se pudo leer la galeria de Instagram: ${error.message}`);
}

console.log("\n5) Endpoints legacy");
const legacyRoutes = [
  "src/app/api/instagram/route.ts",
  "src/app/api/instagram/auth/route.ts",
  "src/app/api/instagram/auth/callback/route.ts",
  "src/app/api/instagram/refresh/route.ts",
  "src/app/api/webhooks/instagram/route.ts",
];

for (const route of legacyRoutes) {
  check(fs.existsSync(route), route, `${route} no existe`);
}

console.log("\nResumen");
if (hasErrors) {
  console.log("Resultado: FALLA");
  process.exit(1);
}

console.log("Resultado: OK");
