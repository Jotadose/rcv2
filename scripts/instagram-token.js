#!/usr/bin/env node

console.log("Instagram token manager deprecated.\n");
console.log(
  "Este proyecto ya no usa tokens ni webhooks de Instagram para renderizar la galeria publica."
);
console.log(
  "Configura NEXT_PUBLIC_INSTAGRAM_EMBED_URLS con URLs publicas separadas por comas."
);
console.log("");
console.log("Ejemplo:");
console.log(
  "NEXT_PUBLIC_INSTAGRAM_EMBED_URLS=https://www.instagram.com/p/POST_1/,https://www.instagram.com/p/POST_2/"
);
console.log("");
console.log("Si necesitas una integracion Graph API real, debes crear un flujo nuevo.");
