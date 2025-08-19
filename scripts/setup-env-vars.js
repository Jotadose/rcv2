#!/usr/bin/env node

/**
 * 🔧 CONFIGURADOR DE VARIABLES DE ENTORNO - REFORMAS
 *
 * Este script te ayuda a configurar las variables de entorno en Vercel
 * de forma paso a paso.
 */

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function main() {
  console.log("\n🔧 CONFIGURADOR DE VARIABLES DE ENTORNO - REFORMAS");
  console.log("=====================================================\n");

  console.log("📸 CONFIGURACIÓN DE INSTAGRAM");
  console.log(
    "Basado en tus capturas, ya tienes configurado Meta Developer.\n"
  );

  // Instagram Configuration
  const instagramToken = await ask(
    "1. Pega tu INSTAGRAM_ACCESS_TOKEN de Meta Developer: "
  );
  const instagramUserId =
    (await ask("2. Confirma tu INSTAGRAM_ACCOUNT_ID (17841438252089801): ")) ||
    "17841438252089801";

  console.log("\n🌐 CONFIGURACIÓN DEL SITIO");
  const siteUrl = await ask(
    "3. URL de tu sitio en Vercel (ej: https://reformas.vercel.app): "
  );

  console.log("\n📧 CONFIGURACIÓN DE EMAIL (OPCIONAL)");
  const emailUser = await ask(
    "4. Tu email Gmail (opcional, presiona Enter para omitir): "
  );
  let emailPass = "";
  if (emailUser) {
    emailPass = await ask("5. Tu App Password de Gmail (16 caracteres): ");
  }

  console.log("\n🗄️ CONFIGURACIÓN DE SUPABASE (OPCIONAL)");
  const supabaseUrl = await ask(
    "6. URL de Supabase (opcional, presiona Enter para omitir): "
  );
  let supabaseAnonKey = "";
  let supabaseServiceKey = "";
  if (supabaseUrl) {
    supabaseAnonKey = await ask("7. Supabase Anon Key: ");
    supabaseServiceKey = await ask("8. Supabase Service Role Key: ");
  }

  // Generate configuration
  console.log("\n✅ CONFIGURACIÓN GENERADA");
  console.log("========================\n");

  console.log("📋 COPIA ESTAS VARIABLES EN VERCEL:");
  console.log("(Settings → Environment Variables)\n");

  console.log("# Variables REQUERIDAS");
  console.log(`INSTAGRAM_ACCESS_TOKEN=${instagramToken}`);
  console.log(`INSTAGRAM_ACCOUNT_ID=${instagramUserId}`);
  console.log(`NEXT_PUBLIC_SITE_URL=${siteUrl}`);

  if (emailUser) {
    console.log("\n# Variables de EMAIL");
    console.log(`EMAIL_USER=${emailUser}`);
    console.log(`EMAIL_PASS=${emailPass}`);
    console.log("EMAIL_TO=contacto@reformas.cl");
  }

  if (supabaseUrl) {
    console.log("\n# Variables de SUPABASE");
    console.log(`NEXT_PUBLIC_SUPABASE_URL=${supabaseUrl}`);
    console.log(`NEXT_PUBLIC_SUPABASE_ANON_KEY=${supabaseAnonKey}`);
    console.log(`SUPABASE_SERVICE_ROLE_KEY=${supabaseServiceKey}`);
  }

  console.log("\n🚀 PRÓXIMOS PASOS:");
  console.log(
    "1. Ve a vercel.com → tu proyecto → Settings → Environment Variables"
  );
  console.log("2. Agrega cada variable con su valor correspondiente");
  console.log("3. Vercel hará redeploy automático");
  console.log("4. Verifica que el Instagram feed funcione en tu sitio");

  console.log("\n🧪 PROBAR CONFIGURACIÓN:");
  console.log(`curl "${siteUrl}/api/instagram"`);

  console.log("\n✨ ¡Tu sitio estará listo con Instagram real!");

  rl.close();
}

// Handle errors
main().catch((error) => {
  console.error("\n❌ Error:", error.message);
  rl.close();
  process.exit(1);
});

// Handle Ctrl+C gracefully
rl.on("SIGINT", () => {
  console.log("\n\n👋 Configuración cancelada");
  rl.close();
  process.exit(0);
});
