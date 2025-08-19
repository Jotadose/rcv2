// Script para probar la API de Instagram
async function testInstagramAPI() {
  try {
    console.log("Testing Instagram API...");
    const response = await fetch("http://localhost:3000/api/instagram");
    const data = await response.json();
    console.log("API Response:", JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error:", error);
  }
}

testInstagramAPI();
