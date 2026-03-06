#!/usr/bin/env node

const fs = require("fs");

console.log("Pre-deploy check - RC Reformas\n");

let hasErrors = false;

function check(condition, okMessage, errorMessage) {
  if (condition) {
    console.log(`  OK  ${okMessage}`);
  } else {
    console.log(`  ERR ${errorMessage}`);
    hasErrors = true;
  }
}

console.log("1) Archivos esenciales");
const essentialFiles = [
  "package.json",
  "next.config.ts",
  "tsconfig.json",
  "vercel.json",
  ".env.example",
  "src/config/business.ts",
  "src/app/page.tsx",
  "src/app/api/instagram/route.ts",
  "src/app/api/webhooks/instagram/route.ts",
];

for (const file of essentialFiles) {
  check(fs.existsSync(file), file, `${file} no existe`);
}

console.log("\n2) Configuracion de negocio");
try {
  const businessSource = fs.readFileSync("src/config/business.ts", "utf8");
  check(businessSource.includes("name:"), "Nombre del negocio configurado", "Falta name");
  check(
    businessSource.includes("contact:"),
    "Bloque de contacto configurado",
    "Falta bloque contact"
  );
  check(
    businessSource.includes("instagram"),
    "Red social Instagram configurada",
    "Falta configuracion de Instagram"
  );
} catch (error) {
  check(false, "", `No se pudo leer src/config/business.ts: ${error.message}`);
}

console.log("\n3) Dependencias");
try {
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
  const deps = pkg.dependencies || {};
  const required = ["next", "react", "framer-motion", "lucide-react"];

  for (const dep of required) {
    check(Boolean(deps[dep]), `${dep} instalado`, `${dep} no instalado`);
  }

  if (deps["@supabase/supabase-js"]) {
    console.log("  WARN Dependencia legacy detectada: @supabase/supabase-js");
  }
} catch (error) {
  check(false, "", `No se pudo leer package.json: ${error.message}`);
}

console.log("\n4) Variables de entorno requeridas (produccion)");
const requiredEnv = [
  "NEXT_PUBLIC_FORMSPREE_ENDPOINT",
  "INSTAGRAM_ACCESS_TOKEN",
  "INSTAGRAM_APP_SECRET",
  "INSTAGRAM_VERIFY_TOKEN",
  "NEXT_PUBLIC_SITE_URL",
];
for (const envName of requiredEnv) {
  console.log(`  - ${envName}`);
}

console.log("\n5) Rutas API esperadas");
const apiRoutes = [
  "src/app/api/instagram/route.ts",
  "src/app/api/webhooks/instagram/route.ts",
  "src/app/api/chat/save/route.ts",
  "src/app/api/contact/route.ts",
];
for (const route of apiRoutes) {
  check(fs.existsSync(route), route, `${route} no existe`);
}

console.log("\nResumen");
if (hasErrors) {
  console.log("Resultado: FALLA");
  process.exit(1);
}

console.log("Resultado: OK");
