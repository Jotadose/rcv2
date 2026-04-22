async function debugInstagramConfiguration() {
  try {
    console.log("Checking /api/instagram...");
    const response = await fetch("http://localhost:3000/api/instagram");
    const data = await response.json();

    console.log("Status:", response.status);
    console.log("Response:", JSON.stringify(data, null, 2));

    if (response.status === 410) {
      console.log(
        "Expected result: the API is intentionally disabled and the site uses static Instagram cards."
      );
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

debugInstagramConfiguration();
