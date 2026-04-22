# Configuración de Instagram API para RC Reformas - GUÍA DETALLADA

## 🚨 PASO A PASO DETALLADO - Meta/Facebook Developers

### Paso 1: Acceso a Facebook Developers (MUY IMPORTANTE)

1. **Abrir navegador en modo incógnito** (recomendado)

   - Ir a: **https://developers.facebook.com/**
   - ⚠️ USAR LA MISMA CUENTA DE FACEBOOK que administra @rcconstruccionesymantenimiento

2. **Iniciar sesión**
   - Clic en "Iniciar sesión" (esquina superior derecha)
   - Usar email/password de la cuenta que maneja Instagram de RC Reformas

### Paso 2: Crear Nueva Aplicación (INTERFACE NUEVA 2024-2025)

1. **En el dashboard principal de Facebook Developers:**

   - Buscar botón verde "**Crear aplicación**" o "**Create App**"
   - Si no lo ves, busca "+ Crear" en la esquina superior

2. **Seleccionar tipo de aplicación** (PANTALLA 1):

   ```
   ¿Qué quieres hacer con tu aplicación?

   📱 Consumer (SELECCIONAR ESTA)
   🏢 Business
   🎮 Gaming
   🤖 None
   ```

   - **SELECCIONAR: "Consumer"**
   - Clic "Siguiente" o "Next"

3. **Detalles de la aplicación** (PANTALLA 2):

   ```
   Nombre de la aplicación: RC Reformas Website
   Email de contacto: [tu email]

   ✅ He leído y acepto las Condiciones del desarrollador de Meta
   ```

   - **Nombre:** RC Reformas Website
   - **Email:** Tu email personal (donde recibirás notificaciones)
   - ✅ Marcar la casilla de términos
   - Clic "**Crear aplicación**"

### Paso 3: Verificación de Seguridad

- Meta puede pedirte verificar tu identidad
- Completar captcha o verificación por SMS si aparece

### Paso 4: Dashboard de la Aplicación (AQUÍ ES DONDE SE COMPLICA)

Una vez creada la app, verás el **Dashboard**. Busca:

1. **Panel izquierdo - Menú lateral:**

   ```
   📊 Panel de control
   ⚙️  Configuración básica
   📱 Productos (+)  ← ESTE ES EL IMPORTANTE
   👥 Funciones de la aplicación
   🔒 Configuración avanzada
   ```

2. **Agregar Instagram Basic Display:**

   - Clic en "**Productos**" en el menú izquierdo
   - O buscar botón "+ Agregar producto" en el centro de la pantalla
   - Verás una lista de productos disponibles

3. **Encontrar Instagram Basic Display:**

   ```
   🔍 BUSCAR EN LA LISTA:

   📘 Facebook Login
   📸 Instagram Basic Display  ← ESTE ES EL QUE NECESITAS
   📊 Instagram Graph API
   💬 Messenger
   🎯 Marketing API
   ```

   - **SELECCIONAR: "Instagram Basic Display"**
   - Clic "**Configurar**" o "**Set up**"

### Paso 5: Configurar Instagram Basic Display

Después de seleccionar Instagram Basic Display:

1. **Pantalla de configuración inicial:**

   - Te llevará a una nueva página
   - Busca "**Create New App**" o botón similar
   - O puede aparecer directamente el formulario

2. **Configuración básica (FORMULARIO):**

   ```
   Display Name: RC Reformas Website

   Valid OAuth Redirect URIs:
   https://rcreformas.vercel.app/auth/instagram/callback

   Deauthorize Callback URL:
   https://rcreformas.vercel.app/auth/instagram/deauthorize

   Data Deletion Request URL:
   https://rcreformas.vercel.app/auth/instagram/delete
   ```

3. **Guardar configuración:**
   - Clic "**Save Changes**" o "**Guardar cambios**"

### Paso 6: Obtener Credenciales (CLIENT ID y SECRET)

1. **En el panel de Instagram Basic Display:**

   - Buscar sección "**App Review**" o "**Configuración básica**"
   - O en el menú: Productos > Instagram Basic Display > Configuración básica

2. **Copiar credenciales:**
   ```
   Instagram App ID: [COPIARLO] ← Este es tu CLIENT_ID
   Instagram App Secret: [MOSTRAR] → [COPIARLO] ← Este es tu CLIENT_SECRET
   ```

### Paso 7: Agregar Usuario de Prueba (CRÍTICO)

1. **Ir a Funciones de la aplicación > Roles:**

   - En el menú izquierdo: "Funciones de la aplicación" > "Roles"

2. **Agregar Instagram Tester:**
   - Sección "Instagram Testers"
   - Clic "+ Agregar Instagram Testers"
   - **Agregar:** @rcconstruccionesymantenimiento
   - La cuenta debe **ACEPTAR** la invitación desde Instagram

## 🚨 PROBLEMAS COMUNES Y SOLUCIONES

### ❌ "No encuentro Instagram Basic Display"

**Solución:** Ir a https://developers.facebook.com/docs/instagram-basic-display-api/getting-started y seguir el enlace directo

### ❌ "La aplicación no aparece"

**Solución:** Verificar que estás logueado con la cuenta correcta de Facebook

### ❌ "OAuth Redirect URI Error"

**Solución:** Usar exactamente: `https://rcreformas.vercel.app/auth/instagram/callback`

### ❌ "Access Token Error"

**Solución:** Asegurar que @rcconstruccionesymantenimiento aceptó ser "Instagram Tester"

## 📝 INFORMACIÓN PARA EL ARCHIVO .env.local

Después de completar los pasos anteriores:

```env
INSTAGRAM_CLIENT_ID=tu_instagram_app_id_aqui
INSTAGRAM_CLIENT_SECRET=tu_instagram_app_secret_aqui
INSTAGRAM_ACCESS_TOKEN=lo_obtienes_despues_con_el_script
```

## 🆘 ¿SIGUES TENIENDO PROBLEMAS?

### Alternativa 1: Enlace Directo

Ve directo a: https://developers.facebook.com/apps/creation/

### Alternativa 2: Video Tutorial

Meta cambia la interfaz frecuentemente. Busca "Instagram Basic Display API 2024" en YouTube

### Alternativa 3: Documentación Oficial

https://developers.facebook.com/docs/instagram-basic-display-api/getting-started

---

💡 **TIP:** Si Meta te frustra (como a todos), podemos usar una solución temporal con datos mock hasta que tengas tiempo de configurarlo. ¡El sitio ya funciona perfectamente!

## Paso 2: Configurar Instagram Basic Display

1. **Configuración básica**

   - OAuth Redirect URIs: `https://rcreformas.vercel.app/auth/instagram/callback`
   - Deauthorize Callback URL: `https://rcreformas.vercel.app/auth/instagram/deauthorize`
   - Data Deletion Request URL: `https://rcreformas.vercel.app/auth/instagram/delete`

2. **Agregar usuarios de prueba**
   - Ve a "Roles" → "Roles"
   - Agregar "Instagram Testers"
   - Agrega la cuenta @rcconstruccionesymantenimiento

## Paso 3: Obtener Access Token

### Desarrollo/Pruebas (60 días)

```bash
# 1. URL de autorización (reemplaza CLIENT_ID)
https://api.instagram.com/oauth/authorize
  ?client_id={CLIENT_ID}
  &redirect_uri=https://rcreformas.vercel.app/auth/instagram/callback
  &scope=user_profile,user_media
  &response_type=code

# 2. Intercambiar código por token
curl -X POST \
  https://api.instagram.com/oauth/access_token \
  -F client_id={CLIENT_ID} \
  -F client_secret={CLIENT_SECRET} \
  -F grant_type=authorization_code \
  -F redirect_uri=https://rcreformas.vercel.app/auth/instagram/callback \
  -F code={CODE}

# 3. Obtener Long-Lived Token (60 días)
curl -i -X GET "https://graph.instagram.com/access_token
  ?grant_type=ig_exchange_token
  &client_secret={CLIENT_SECRET}
  &access_token={SHORT_LIVED_TOKEN}"
```

### Producción (permanente)

Para tokens que no expiren, necesitas:

1. Verificación de aplicación de Facebook
2. Solicitar permisos avanzados de Instagram
3. Pasar por el proceso de revisión de Facebook

## Variables de entorno necesarias

Crea un archivo `.env.local` con:

```env
INSTAGRAM_CLIENT_ID=tu_client_id
INSTAGRAM_CLIENT_SECRET=tu_client_secret
INSTAGRAM_ACCESS_TOKEN=tu_access_token_largo
```

## Paso 4: Configuración para producción

1. **Verificar dominio en Facebook**
2. **Solicitar permisos de Instagram Business**
3. **Pasar revisión de aplicación**
4. **Configurar renovación automática de tokens**

## URLs importantes

- App Dashboard: https://developers.facebook.com/apps/
- Instagram Basic Display: https://developers.facebook.com/docs/instagram-basic-display-api
- Instagram Graph API: https://developers.facebook.com/docs/instagram-api

## Notas importantes

- Los tokens de prueba duran 60 días
- Para producción necesitas verificación de Facebook
- Límites de API: 200 requests/hora por usuario
- Solo puedes acceder a tu propio contenido o contenido autorizado
