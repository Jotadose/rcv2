#!/usr/bin/env node

const { createClient } = require("@supabase/supabase-js");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function setupSupabase() {
  console.log("🚀 Configurador de Supabase para RC Reformas\n");

  const supabaseUrl = await askQuestion("Ingresa tu URL de Supabase: ");
  const supabaseKey = await askQuestion("Ingresa tu Anon Key de Supabase: ");

  const supabase = createClient(supabaseUrl, supabaseKey);

  console.log("\n📊 Creando tablas...\n");

  // Crear tabla contact_submissions
  const { error: contactError } = await supabase.rpc("exec_sql", {
    sql: `
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        project_type VARCHAR(100),
        location VARCHAR(255),
        message TEXT,
        budget_range VARCHAR(50),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `,
  });

  if (contactError) {
    console.log(
      "⚠️  Nota: Puede que las tablas ya existan o necesites ejecutar SQL manualmente"
    );
  } else {
    console.log("✅ Tabla contact_submissions creada");
  }

  // Crear tabla chat_sessions
  const { error: chatError } = await supabase.rpc("exec_sql", {
    sql: `
      CREATE TABLE IF NOT EXISTS chat_sessions (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        session_id VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255),
        email VARCHAR(255),
        phone VARCHAR(50),
        project_type VARCHAR(100),
        area DECIMAL(10,2),
        quality VARCHAR(50),
        budget VARCHAR(50),
        estimated_min DECIMAL(12,2),
        estimated_max DECIMAL(12,2),
        estimated_duration VARCHAR(50),
        status VARCHAR(50) DEFAULT 'incomplete',
        messages JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `,
  });

  if (chatError) {
    console.log(
      "⚠️  Nota: Puede que las tablas ya existan o necesites ejecutar SQL manualmente"
    );
  } else {
    console.log("✅ Tabla chat_sessions creada");
  }

  // Probar conexión insertando datos de prueba
  console.log("\n🧪 Probando conexión...");

  const { error } = await supabase
    .from("contact_submissions")
    .insert([
      {
        name: "Prueba",
        email: "test@example.com",
        phone: "+56951234567",
        project_type: "Prueba de configuración",
        message: "Este es un mensaje de prueba para verificar la configuración",
      },
    ])
    .select();

  if (error) {
    console.log("❌ Error al insertar datos de prueba:", error.message);
    console.log(
      "\n📝 Necesitas ejecutar manualmente el SQL del archivo DATABASE_SETUP.md"
    );
  } else {
    console.log("✅ Conexión exitosa! Datos de prueba insertados");

    // Limpiar datos de prueba
    await supabase
      .from("contact_submissions")
      .delete()
      .eq("email", "test@example.com");

    console.log("🧹 Datos de prueba eliminados");
  }

  console.log("\n📁 Actualiza tu archivo .env.local con:");
  console.log(`NEXT_PUBLIC_SUPABASE_URL=${supabaseUrl}`);
  console.log(`NEXT_PUBLIC_SUPABASE_ANON_KEY=${supabaseKey}`);

  rl.close();
}

setupSupabase().catch(console.error);
