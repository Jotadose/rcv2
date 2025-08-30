#!/usr/bin/env node

/**
 * Supabase Setup Manager - REFORMAS
 * Script para configurar y verificar Supabase
 */

const readline = require("readline");

function question(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

async function main() {
  console.log("�️  Supabase Setup Manager - REFORMAS\n");

  const action = await question(
    "¿Qué quieres hacer?\n" +
      "1. Ver instrucciones de configuración\n" +
      "2. Generar SQL para crear tablas\n" +
      "3. Verificar configuración actual\n" +
      "4. Ver variables para Vercel\n" +
      "Opción: "
  );

  switch (action) {
    case "1":
      showSetupInstructions();
      break;
    case "2":
      showSQL();
      break;
    case "3":
      await verifyConfiguration();
      break;
    case "4":
      showVercelVariables();
      break;
    default:
      console.log("❌ Opción inválida");
  }
}

function showSetupInstructions() {
  console.log("\n📋 INSTRUCCIONES CONFIGURACIÓN SUPABASE:\n");

  console.log("🔗 Paso 1: Crear Proyecto");
  console.log("1. Ir a: https://supabase.com");
  console.log("2. Crear cuenta (recomendado con GitHub)");
  console.log("3. Hacer clic en 'New Project'\n");

  console.log("⚙️  Paso 2: Configurar Proyecto");
  console.log("- Nombre: 'reformas-website'");
  console.log("- Database Password: (generar una segura)");
  console.log("- Región: 'South America (São Paulo)' (la más cercana)");
  console.log("- Plan: Free (suficiente para empezar)\n");

  console.log("�️  Paso 3: Crear Tablas");
  console.log("1. Ir a 'SQL Editor' en tu proyecto Supabase");
  console.log("2. Ejecutar este script (opción 2 de este menú)");
  console.log("3. Verificar que las tablas se crearon correctamente\n");

  console.log("🔑 Paso 4: Obtener Keys");
  console.log("1. Ir a 'Settings' → 'API'");
  console.log("2. Copiar:");
  console.log("   - Project URL");
  console.log("   - Project API Key (anon public)");
  console.log("   - Project API Key (service_role) ⚠️  MANTENER SECRETA\n");

  console.log("🚀 Paso 5: Configurar en Vercel");
  console.log("Ver opción 4 para las variables exactas\n");
}

function showSQL() {
  console.log("\n📄 SQL PARA CREAR TABLAS EN SUPABASE:\n");
  console.log("-- Copiar y pegar en SQL Editor de Supabase --\n");

  const sql = `-- Tabla para contactos de formularios
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  project_type TEXT NOT NULL,
  location TEXT NOT NULL,
  message TEXT,
  budget_range TEXT,
  preferred_contact TEXT DEFAULT 'whatsapp',
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla para sesiones de chat del cotizador IA
CREATE TABLE chat_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL UNIQUE,
  name TEXT,
  phone TEXT,
  project_type TEXT,
  area INTEGER,
  quality TEXT,
  estimated_min INTEGER,
  estimated_max INTEGER,
  messages JSONB,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para mejor performance
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at);
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX idx_chat_sessions_created_at ON chat_sessions(created_at);
CREATE INDEX idx_chat_sessions_session_id ON chat_sessions(session_id);

-- Habilitar RLS (Row Level Security)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserts (para el sitio web)
CREATE POLICY "Enable insert for everyone" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert for everyone" ON chat_sessions FOR INSERT WITH CHECK (true);

-- Política para leer solo con autenticación (para admin)
CREATE POLICY "Enable read for authenticated users only" ON contact_submissions FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Enable read for authenticated users only" ON chat_sessions FOR SELECT USING (auth.role() = 'authenticated');

-- Comentarios para documentación
COMMENT ON TABLE contact_submissions IS 'Almacena formularios de contacto del sitio web';
COMMENT ON TABLE chat_sessions IS 'Almacena sesiones del cotizador IA';
COMMENT ON COLUMN contact_submissions.status IS 'Estados: new, contacted, quoted, closed';
COMMENT ON COLUMN chat_sessions.messages IS 'Array JSON con toda la conversación del chat';`;

  console.log(sql);
  console.log("\n✅ Después de ejecutar este SQL, las tablas estarán listas");
  console.log("📊 Puedes ver los datos en 'Table Editor' en Supabase\n");
}

async function verifyConfiguration() {
  console.log("\n🔍 VERIFICACIÓN DE CONFIGURACIÓN:\n");

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  console.log("🔗 Project URL:", url ? "✅ Configurado" : "❌ No configurado");
  console.log("🔑 Anon Key:", anonKey ? "✅ Configurado" : "❌ No configurado");
  console.log(
    "🔐 Service Key:",
    serviceKey ? "✅ Configurado" : "❌ No configurado"
  );

  if (!url || !anonKey) {
    console.log("\n⚠️  Variables faltantes. Configurar en:");
    console.log("- Desarrollo: archivo .env.local");
    console.log("- Producción: Vercel → Settings → Environment Variables\n");
    return;
  }

  // Test básico de conexión
  try {
    const { createClient } = require("@supabase/supabase-js");
    const supabase = createClient(url, anonKey);

    console.log("\n🧪 Probando conexión...");

    // Test simple de conexión
    const { error } = await supabase
      .from("contact_submissions")
      .select("count(*)")
      .limit(1);

    if (error && error.code === "PGRST116") {
      console.log("❌ Tablas no encontradas. Ejecutar SQL de creación.");
    } else if (error) {
      console.log("❌ Error de conexión:", error.message);
    } else {
      console.log("✅ Conexión exitosa a Supabase");
      console.log("✅ Tablas funcionando correctamente");
    }
  } catch (error) {
    console.log("❌ Error verificando:", error.message);
  }
}

function showVercelVariables() {
  console.log("\n🚀 VARIABLES PARA VERCEL:\n");

  console.log(
    "� Ir a vercel.com → tu proyecto → Settings → Environment Variables"
  );
  console.log(
    "📝 Agregar estas 3 variables (reemplazar con tus valores reales):\n"
  );

  console.log("1️⃣  NEXT_PUBLIC_SUPABASE_URL");
  console.log("   Valor: https://tu-proyecto.supabase.co");
  console.log("   Environment: Production, Preview, Development\n");

  console.log("2️⃣  NEXT_PUBLIC_SUPABASE_ANON_KEY");
  console.log("   Valor: tu_anon_key_publico");
  console.log("   Environment: Production, Preview, Development\n");

  console.log("3️⃣  SUPABASE_SERVICE_ROLE_KEY");
  console.log("   Valor: tu_service_role_key");
  console.log("   Environment: Production, Preview, Development");
  console.log("   ⚠️  IMPORTANTE: Este key es SECRETO, no compartir\n");

  console.log("💡 Después de agregar variables:");
  console.log("1. Hacer clic en 'Save'");
  console.log("2. Hacer 'Redeploy' del sitio");
  console.log("3. Verificar que funciona probando un formulario\n");

  console.log("🎯 BENEFICIOS una vez configurado:");
  console.log("✅ Formularios se guardan en base de datos");
  console.log("✅ Cotizaciones del IA se almacenan");
  console.log("✅ Panel admin para ver leads");
  console.log("✅ Respaldo de todos los contactos\n");
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  showSetupInstructions,
  showSQL,
  verifyConfiguration,
  showVercelVariables,
};
