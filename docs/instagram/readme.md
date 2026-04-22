# 📸 Integración de Instagram - RC Reformas

## Estado Actual: Embeds Directos (sin API, sin tokens)

El sitio ahora muestra las 6 publicaciones de Instagram usando el script oficial de embeds (`instagram.com/embed.js`) únicamente con las URLs públicas. No necesitas configurar App de Meta ni tokens.

La antigua estrategia de API (Basic Display / oEmbed + tokens) queda como opción futura y está documentada abajo (Sección "Modo Avanzado / Legacy").

## 🚀 Uso Rápido (Modo Simple - Recomendado)

1. Define las URLs de las publicaciones (hasta 6) en `.env.local` (opcional) usando la variable `NEXT_PUBLIC_INSTAGRAM_EMBED_URLS` separadas por comas, o pásalas como prop al componente `InstagramEmbedGrid`.
2. Deploy. Listo.

```env
NEXT_PUBLIC_INSTAGRAM_EMBED_URLS=https://www.instagram.com/p/ABC123/,https://www.instagram.com/p/DEF456/,...
```

Si no defines variable, la página principal las trae hardcodeadas (editable en `src/app/page.tsx`).

### ¿Dónde está el componente?

`src/components/InstagramEmbedGrid.tsx`

Características:
- Normaliza URLs (agrega `/` final, limpia parámetros irrelevantes)
- Evita duplicados
- Carga `embed.js` solo una vez
- Re-procesa si cambian las URLs

### SEO / Performance
- Cada embed es un iframe que Instagram controla; para máxima performance podrías lazy-load con `loading="lazy"` o implementar un blur hash placeholder (pendiente / opcional).
- Si buscas Core Web Vitals óptimos, una alternativa es descargar imágenes y servir estáticas (ver "Modo Local" en backlog).

---

## 🧪 Modo Avanzado / Legacy (API con Tokens)

Si más adelante quieres datos estructurados (captions, timestamps) o controlar caché sin iframes, puedes reactivar el endpoint `/api/instagram` (actualmente conservado en el repositorio pero no listado en el sitemap). Este modo requiere configurar la App en Facebook Developers.

Resumen rápido:
- Crear app Facebook (Instagram Basic Display / oEmbed)
- Obtener `APP_ID` y `APP_SECRET`
- Proveer URLs de posts vía variables `INSTAGRAM_POST_1..6`
- Endpoint hace fetch concurrente a oEmbed, agrega fallback mock si falla

Instrucciones detalladas a continuación (documentación original preservada):

---

## (Legacy) Configuración API Completa

Esta sección es la documentación original para usar tokens y la API. Si solo necesitas mostrar las publicaciones, puedes ignorarla.

### 1. Crear aplicación en Facebook Developers

```bash
# 1. Ve a: https://developers.facebook.com/
# 2. Crea nueva aplicación
# 3. Agrega "Instagram Basic Display"
```

### 2. Configurar variables de entorno

```bash
# Copia el archivo de ejemplo
cp .env.local.example .env.local

# Edita .env.local con tus credenciales
INSTAGRAM_CLIENT_ID=tu_client_id
INSTAGRAM_CLIENT_SECRET=tu_client_secret
INSTAGRAM_ACCESS_TOKEN=tu_token
```

### 3. Obtener token de acceso

```bash
# Ejecuta el script de gestión de tokens
node scripts/instagram-token.js
```

## 📋 Proceso Detallado (Legacy)

### Paso 1: Facebook Developers App

1. **Crear aplicación**

   - Ir a [Facebook Developers](https://developers.facebook.com/)
   - "Crear aplicación" → "Consumer"
   - Nombre: "RC Reformas Website"

2. **Configurar Instagram Basic Display**
   - Agregar producto "Instagram Basic Display"
   - OAuth Redirect URIs: `https://tu-dominio.com/auth/callback`
   - Valid OAuth Redirect URIs: `https://localhost:3001/auth/callback`

### Paso 2: Permisos y Usuarios de Prueba

1. **Agregar Instagram Tester**
   - Roles → Instagram Testers
   - Agregar: `@rcconstruccionesymantenimiento`
   - La cuenta debe aceptar la invitación

### Paso 3: Generar Tokens

1. **Autorización inicial**

   ```bash
   # Ejecutar script
   node scripts/instagram-token.js
   # Seleccionar opción 1
   ```

2. **Obtener código de autorización**

   - Abrir URL generada
   - Autorizar aplicación
   - Copiar código de la URL de redirección

3. **Intercambiar por token**
   ```bash
   # Ejecutar script nuevamente
   node scripts/instagram-token.js
   # Seleccionar opción 2
   # Pegar código obtenido
   ```

### Paso 4: Configurar Producción

Para uso en producción necesitas:

1. **Verificar dominio**
2. **Solicitar Instagram Business API**
3. **Pasar revisión de Facebook**

## 🛠️ Scripts Disponibles

### Gestión de tokens

```bash
# Script interactivo para gestionar tokens
node scripts/instagram-token.js
```

### Verificar configuración actual

```bash
# Verificar si la API está funcionando
curl http://localhost:3001/api/instagram
```

## 📊 Estados de la API (Legacy)

### ✅ Mock Data (Actual)

- **Estado**: Funcionando
- **Fuente**: Datos simulados
- **Ventajas**: No requiere configuración
- **Limitaciones**: Imágenes genéricas

### 🔧 Instagram API (Configuración)

- **Estado**: Pendiente configuración
- **Fuente**: Instagram Real
- **Ventajas**: Contenido real y actualizado
- **Limitaciones**: Requiere setup y tokens

## 🔍 Troubleshooting

### Error: "Token inválido"

```bash
# Verificar token
node scripts/instagram-token.js
# Opción 3: Verificar token actual
```

### Error: "No posts found"

- Verificar que la cuenta tenga publicaciones públicas
- Confirmar que es una cuenta personal (no business sin permisos)

### Error: "Rate limit exceeded"

- Instagram permite 200 requests/hora
- El caché está configurado para 1 hora

## 📝 Notas Importantes

### Limitaciones de desarrollo

- Tokens de prueba: 60 días
- Solo cuentas de prueba
- Límite: 200 requests/hora

### Para producción

- Requiere verificación de Facebook
- Proceso de revisión (1-2 semanas)
- Tokens permanentes disponibles

### Fallback automático

El código está diseñado para:

1. Intentar usar Instagram API real
2. En caso de error, usar datos mock
3. Nunca romper el sitio

## 🎯 Próximos Pasos Recomendados

1. (Opcional) Lazy-load de iframes para mejorar performance.
2. (Opcional) Placeholder estático con click para cargar embed (reducción de peso inicial).
3. (Opcional) Migrar a imágenes estáticas generadas (screenshot server / cron) si necesitas mayor control SEO.

## 📞 Soporte

Si necesitas ayuda con la configuración:

- Revisa la documentación: [Instagram Basic Display API](https://developers.facebook.com/docs/instagram-basic-display-api)
- El archivo `INSTAGRAM_SETUP.md` tiene instrucciones detalladas
