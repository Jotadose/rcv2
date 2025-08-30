// Test simple de conexión a Supabase
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://pprevpivmsqwhfewuxun.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwcmV2cGl2bXNxd2hmZXd1eHVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1NjQxODYsImV4cCI6MjA3MTE0MDE4Nn0.CCO5kSPhqt6-OiS4TY_3r-aQwp5vTprq4jUKtLuYOk4";

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log("🔗 Probando conexión a Supabase...");

  try {
    // Test 1: Verificar conexión
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("count")
      .limit(1);

    if (error) {
      console.error("❌ Error en conexión:", error);
      return;
    }

    console.log("✅ Conexión exitosa!");

    // Test 2: Insertar datos de prueba
    const testData = {
      name: "Test Frontend",
      phone: "+56987654321",
      email: "test@frontend.com",
      project_type: "Remodelación",
      location: "Santiago Centro",
      message: "Prueba desde script de test",
    };

    console.log("📝 Insertando datos de prueba...");
    const { data: insertData, error: insertError } = await supabase
      .from("contact_submissions")
      .insert([testData])
      .select()
      .single();

    if (insertError) {
      console.error("❌ Error al insertar:", insertError);
      return;
    }

    console.log("✅ Datos insertados exitosamente:", insertData);

    // Test 3: Verificar todos los registros
    const { data: allData, error: selectError } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);

    if (selectError) {
      console.error("❌ Error al leer datos:", selectError);
      return;
    }

    console.log("📋 Últimos 5 registros en la tabla:");
    allData.forEach((record, index) => {
      console.log(
        `${index + 1}. ${record.name} - ${record.phone} - ${
          record.project_type
        }`
      );
    });
  } catch (error) {
    console.error("💥 Error general:", error);
  }
}

testConnection();
