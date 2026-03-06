#!/usr/bin/env node

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function main() {
  console.log("Configurador de variables de entorno - RC Reformas\n");

  const formspreeEndpoint = await ask(
    "1. Endpoint de Formspree (ej: https://formspree.io/f/abcd1234): "
  );
  const siteUrl =
    (await ask("2. URL canonica del sitio (enter para usar https://rcreformas.cl): ")) ||
    "https://rcreformas.cl";
  const instagramUrls = await ask(
    "3. URLs publicas de Instagram separadas por coma (opcional): "
  );

  console.log("\nCopia estas variables:\n");
  console.log(`NEXT_PUBLIC_FORMSPREE_ENDPOINT=${formspreeEndpoint.trim()}`);
  console.log(`NEXT_PUBLIC_SITE_URL=${siteUrl.trim()}`);
  if (instagramUrls.trim()) {
    console.log(`NEXT_PUBLIC_INSTAGRAM_EMBED_URLS=${instagramUrls.trim()}`);
  }

  console.log("\nSugerencia: guarda la configuracion en .env.local y replica en Vercel.");
  rl.close();
}

main().catch((error) => {
  console.error("No se pudo generar la configuracion:", error.message);
  rl.close();
  process.exit(1);
});
