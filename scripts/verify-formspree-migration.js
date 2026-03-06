#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

console.log("Verificacion de formularios y contacto\n");

const checks = [
  {
    file: "src/components/home/LeadForm.tsx",
    label: "LeadForm",
    patterns: [
      "NEXT_PUBLIC_FORMSPREE_ENDPOINT",
      "buildWhatsAppUrl",
      "onSuccess",
    ],
  },
  {
    file: "src/app/api/contact/route.ts",
    label: "API legacy de contacto",
    patterns: ["Endpoint disabled", "410"],
  },
  {
    file: ".env.example",
    label: "Variables de entorno",
    patterns: ["NEXT_PUBLIC_FORMSPREE_ENDPOINT", "NEXT_PUBLIC_SITE_URL"],
  },
];

let allChecksPass = true;

for (const check of checks) {
  const fullPath = path.join(process.cwd(), check.file);
  console.log(`Revisando ${check.label}`);

  if (!fs.existsSync(fullPath)) {
    console.log(`  ERR ${check.file} no existe`);
    allChecksPass = false;
    continue;
  }

  const content = fs.readFileSync(fullPath, "utf8");
  for (const pattern of check.patterns) {
    if (content.includes(pattern)) {
      console.log(`  OK  ${pattern}`);
    } else {
      console.log(`  ERR ${pattern}`);
      allChecksPass = false;
    }
  }
}

console.log("\nResumen");
if (!allChecksPass) {
  console.log("Resultado: FALLA");
  process.exit(1);
}

console.log("Resultado: OK");
