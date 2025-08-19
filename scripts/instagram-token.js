#!/usr/bin/env node

/**
 * Instagram Token Manager
 * Script para gestionar tokens de Instagram API
 */

const https = require("https");
const readline = require("readline");

class InstagramTokenManager {
  constructor() {
    this.clientId = process.env.INSTAGRAM_CLIENT_ID;
    this.clientSecret = process.env.INSTAGRAM_CLIENT_SECRET;
    this.redirectUri = "https://localhost:3001/auth/instagram/callback";
  }

  // Paso 1: Generar URL de autorización
  getAuthorizationUrl() {
    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      scope: "user_profile,user_media",
      response_type: "code",
    });

    return `https://api.instagram.com/oauth/authorize?${params.toString()}`;
  }

  // Paso 2: Intercambiar código por token de corta duración
  async exchangeCodeForToken(code) {
    const postData = new URLSearchParams({
      client_id: this.clientId,
      client_secret: this.clientSecret,
      grant_type: "authorization_code",
      redirect_uri: this.redirectUri,
      code: code,
    }).toString();

    return new Promise((resolve, reject) => {
      const options = {
        hostname: "api.instagram.com",
        path: "/oauth/access_token",
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Content-Length": Buffer.byteLength(postData),
        },
      };

      const req = https.request(options, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            const response = JSON.parse(data);
            resolve(response);
          } catch (error) {
            reject(error);
          }
        });
      });

      req.on("error", reject);
      req.write(postData);
      req.end();
    });
  }

  // Paso 3: Obtener token de larga duración (60 días)
  async getLongLivedToken(shortLivedToken) {
    const params = new URLSearchParams({
      grant_type: "ig_exchange_token",
      client_secret: this.clientSecret,
      access_token: shortLivedToken,
    });

    return new Promise((resolve, reject) => {
      const options = {
        hostname: "graph.instagram.com",
        path: `/access_token?${params.toString()}`,
        method: "GET",
      };

      const req = https.request(options, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            const response = JSON.parse(data);
            resolve(response);
          } catch (error) {
            reject(error);
          }
        });
      });

      req.on("error", reject);
      req.end();
    });
  }

  // Renovar token de larga duración
  async refreshLongLivedToken(longLivedToken) {
    const params = new URLSearchParams({
      grant_type: "ig_refresh_token",
      access_token: longLivedToken,
    });

    return new Promise((resolve, reject) => {
      const options = {
        hostname: "graph.instagram.com",
        path: `/refresh_access_token?${params.toString()}`,
        method: "GET",
      };

      const req = https.request(options, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            const response = JSON.parse(data);
            resolve(response);
          } catch (error) {
            reject(error);
          }
        });
      });

      req.on("error", reject);
      req.end();
    });
  }

  // Verificar token actual
  async checkToken(token) {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: "graph.instagram.com",
        path: `/me?fields=id,username&access_token=${token}`,
        method: "GET",
      };

      const req = https.request(options, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            const response = JSON.parse(data);
            if (res.statusCode === 200) {
              resolve(response);
            } else {
              reject(response);
            }
          } catch (error) {
            reject(error);
          }
        });
      });

      req.on("error", reject);
      req.end();
    });
  }
}

// CLI Interface
async function main() {
  const manager = new InstagramTokenManager();
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  function question(query) {
    return new Promise((resolve) => rl.question(query, resolve));
  }

  try {
    console.log("🔧 Instagram Token Manager para RC Reformas\n");

    const action = await question(
      "Selecciona una acción:\n" +
        "1. Generar URL de autorización\n" +
        "2. Intercambiar código por token\n" +
        "3. Verificar token actual\n" +
        "4. Renovar token\n" +
        "Opción: "
    );

    switch (action) {
      case "1": {
        console.log("\n📱 URL de autorización:");
        console.log(manager.getAuthorizationUrl());
        console.log("\n1. Abre esta URL en tu navegador");
        console.log("2. Autoriza la aplicación");
        console.log("3. Copia el código de la URL de redirección");
        break;
      }

      case "2": {
        const code = await question("Ingresa el código de autorización: ");
        console.log("\n🔄 Intercambiando código por token...");

        try {
          const shortToken = await manager.exchangeCodeForToken(code);
          console.log("✅ Token de corta duración obtenido");

          console.log("\n🔄 Obteniendo token de larga duración...");
          const longToken = await manager.getLongLivedToken(
            shortToken.access_token
          );

          console.log("\n🎉 ¡Token de larga duración obtenido!");
          console.log(`Token: ${longToken.access_token}`);
          console.log(
            `Expira en: ${longToken.expires_in} segundos (${Math.floor(
              longToken.expires_in / 86400
            )} días)`
          );
          console.log("\n📝 Agrega esto a tu archivo .env.local:");
          console.log(`INSTAGRAM_ACCESS_TOKEN=${longToken.access_token}`);
        } catch (error) {
          console.error("❌ Error:", error);
        }
        break;
      }

      case "3": {
        const token = await question("Ingresa el token a verificar: ");
        try {
          const userInfo = await manager.checkToken(token);
          console.log("\n✅ Token válido");
          console.log(`Usuario: ${userInfo.username}`);
          console.log(`ID: ${userInfo.id}`);
        } catch (error) {
          console.error("❌ Token inválido o expirado:", error);
        }
        break;
      }

      case "4": {
        const refreshToken = await question("Ingresa el token a renovar: ");
        try {
          const newToken = await manager.refreshLongLivedToken(refreshToken);
          console.log("\n🎉 ¡Token renovado!");
          console.log(`Nuevo token: ${newToken.access_token}`);
          console.log(
            `Expira en: ${newToken.expires_in} segundos (${Math.floor(
              newToken.expires_in / 86400
            )} días)`
          );
        } catch (error) {
          console.error("❌ Error renovando token:", error);
        }
        break;
      }

      default:
        console.log("❌ Opción inválida");
    }
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    rl.close();
  }
}

if (require.main === module) {
  main();
}

module.exports = InstagramTokenManager;
