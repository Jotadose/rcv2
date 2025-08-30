// Test rápido de conectividad Supabase
const { createClient } = require("@supabase/supabase-js");

// Variables hardcodeadas para test rápido
const supabaseUrl = "https://pprevpivmsqwhfewuxun.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwcmV2cGl2bXNxd2hmZXd1eHVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1NjQxODYsImV4cCI6MjA3MTE0MDE4Nn0.CCO5kSPhqt6-OiS4TY_3r-aQwp5vTprq4jUKtLuYOk4";

console.log("🔍 Testing Supabase connection...");
console.log("URL:", supabaseUrl ? "Set" : "Missing");
console.log("Key:", supabaseKey ? "Set" : "Missing");

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing Supabase environment variables");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    console.log("💾 Testing table access...");

    // Test 1: Count existing records
    const { count, error: countError } = await supabase
      .from("contact_submissions")
      .select("id", { count: "exact", head: true });

    if (countError) {
      console.error("❌ Count error:", countError);
      return;
    }

    console.log("✅ Current record count:", count);

    // Test 2: Try to insert test record
    const testData = {
      name: "Test User",
      email: "test@example.com",
      phone: "123456789",
      project_type: "construccion",
      location: "Test City",
      message: "Test message",
    };

    console.log("💾 Inserting test record...");
    const { data, error } = await supabase
      .from("contact_submissions")
      .insert([testData])
      .select()
      .single();

    if (error) {
      console.error("❌ Insert error:", error);
      return;
    }

    console.log("✅ Test record inserted:", data);

    // Cleanup: Delete test record
    await supabase.from("contact_submissions").delete().eq("id", data.id);

    console.log("🧹 Test record cleaned up");
  } catch (err) {
    console.error("💥 Unexpected error:", err);
  }
}

testConnection();
