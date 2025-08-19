# 📸 **GUÍA CONFIGURACIÓN INSTAGRAM API**

## **Paso 1: Crear App en Facebook Developers**

### 1.1 Ir a Facebook Developers

- Visita: https://developers.facebook.com/
- Hacer clic en "Mis Apps" → "Crear App"

### 1.2 Configurar App

- **Tipo de App:** "Consumidor"
- **Nombre:** "REFORMAS Website"
- **Email de contacto:** tu email
- **Propósito:** "Yo mismo o mi empresa"

### 1.3 Agregar Producto Instagram

- En el dashboard de tu app, buscar "Instagram Basic Display"
- Hacer clic en "Configurar"

## **Paso 2: Configurar Instagram Basic Display**

### 2.1 URLs de Redirect

```
OAuth Redirect URI: https://tu-dominio.vercel.app/api/instagram/auth/callback
Deauthorize Callback URL: https://tu-dominio.vercel.app/api/instagram/auth
Data Deletion Request URL: https://tu-dominio.vercel.app/data-deletion
```

### 2.2 Obtener Client ID y Secret

- En "Instagram Basic Display" → "Configuración básica"
- Copiar:
  - **Instagram App ID**
  - **Instagram App Secret**

## **Paso 3: Obtener Access Token**

### 3.1 Usar nuestro script automático

```bash
node scripts/instagram-token.js
```

### 3.2 O manual:

1. Ir a: `https://api.instagram.com/oauth/authorize?client_id={APP_ID}&redirect_uri=https://tu-dominio.vercel.app/api/instagram/auth/callback&scope=user_profile,user_media&response_type=code`

2. Autorizar y copiar el código de la URL

3. Intercambiar por token:

```bash
curl -X POST "https://api.instagram.com/oauth/access_token" \
  -F client_id={APP_ID} \
  -F client_secret={APP_SECRET} \
  -F grant_type=authorization_code \
  -F redirect_uri=https://tu-dominio.vercel.app/api/instagram/auth/callback \
  -F code={CODIGO_OBTENIDO}
```

## **Variables para Vercel:**

```
INSTAGRAM_ACCESS_TOKEN=tu_token_aqui
INSTAGRAM_ACCOUNT_ID=tu_user_id
```

---

# 🗄️ **GUÍA CONFIGURACIÓN SUPABASE**

## **Paso 1: Crear Proyecto Supabase**

### 1.1 Crear Cuenta

- Ir a: https://supabase.com
- Crear cuenta con GitHub/Google
- Hacer clic en "New Project"

### 1.2 Configurar Proyecto

- **Nombre:** "reformas-website"
- **Database Password:** (genera una segura)
- **Región:** "South America (São Paulo)" - la más cercana
- **Plan:** Free (suficiente para empezar)

## **Paso 2: Configurar Base de Datos**

### 2.1 Ejecutar SQL

- Ir a "SQL Editor" en Supabase
- Copiar y ejecutar este SQL:

```sql
-- Tabla para contactos de formularios
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  project_type TEXT NOT NULL,
  location TEXT NOT NULL,
  message TEXT,
  budget_range TEXT,
  preferred_contact TEXT DEFAULT 'whatsapp',
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla para sesiones de chat del cotizador IA
CREATE TABLE chat_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL UNIQUE,
  name TEXT,
  phone TEXT,
  project_type TEXT,
  area INTEGER,
  quality TEXT,
  estimated_min INTEGER,
  estimated_max INTEGER,
  messages JSONB,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para mejor performance
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at);
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX idx_chat_sessions_created_at ON chat_sessions(created_at);
CREATE INDEX idx_chat_sessions_session_id ON chat_sessions(session_id);

-- Habilitar RLS (Row Level Security)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserts (para el sitio web)
CREATE POLICY "Enable insert for everyone" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert for everyone" ON chat_sessions FOR INSERT WITH CHECK (true);

-- Política para leer solo con autenticación (para admin)
CREATE POLICY "Enable read for authenticated users only" ON contact_submissions FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Enable read for authenticated users only" ON chat_sessions FOR SELECT USING (auth.role() = 'authenticated');
```

### 2.2 Obtener Keys

- Ir a "Settings" → "API"
- Copiar:
  - **Project URL**
  - **Project API Key (anon public)**
  - **Project API Key (service_role)** - ¡Mantener secreta!

## **Variables para Vercel:**

```
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
```

---

# 📧 **CONFIGURACIÓN EMAIL (Gmail)**

## **Paso 1: Preparar Gmail**

### 1.1 Habilitar 2FA

- Ir a: https://myaccount.google.com/security
- Activar "Verificación en 2 pasos"

### 1.2 Generar App Password

- En la misma página de seguridad
- "Contraseñas de aplicaciones"
- Seleccionar "Correo" y "Otro dispositivo"
- Generar y copiar la contraseña

## **Variables para Vercel:**

```
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=la_app_password_generada
EMAIL_TO=contacto@reformas.cl
```

---

# ⚙️ **CONFIGURAR EN VERCEL**

## **Paso 1: Ir al Dashboard de Vercel**

- https://vercel.com/dashboard
- Seleccionar tu proyecto

## **Paso 2: Agregar Variables**

- Ir a "Settings" → "Environment Variables"
- Agregar una por una:

### Variables Básicas:

```
NEXT_PUBLIC_SITE_URL=https://tu-dominio.vercel.app
NODE_ENV=production
```

### Variables Instagram (opcional):

```
INSTAGRAM_ACCESS_TOKEN=tu_token
INSTAGRAM_ACCOUNT_ID=tu_user_id
```

### Variables Supabase (recomendado):

```
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
```

### Variables Email (opcional):

```
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_app_password
EMAIL_TO=contacto@reformas.cl
```

## **Paso 3: Redeploy**

- Después de agregar variables, hacer clic en "Redeploy"
- O hacer un nuevo commit para trigger automático

---

# 🎯 **PRIORIDADES DE CONFIGURACIÓN**

## **🔥 CRÍTICO (Configurar primero):**

1. **Supabase** - Para guardar leads y cotizaciones
2. **EMAIL_TO** - Para recibir notificaciones

## **📈 IMPORTANTE (Configurar después):**

3. **Gmail** - Para notificaciones automáticas
4. **Instagram API** - Para feed dinámico real

## **✨ OPCIONAL:**

5. Dominio personalizado
6. Analytics avanzadas

---

# 📞 **SOPORTE**

Si necesitas ayuda con algún paso:

1. **Instagram:** Error común es la URL de callback incorrecta
2. **Supabase:** Asegurar región South America para mejor latencia
3. **Gmail:** App Password es diferente a la contraseña normal
4. **Vercel:** Variables deben agregarse exactamente como se muestran

**¡El sitio funcionará perfectamente una vez configuradas estas variables!** 🚀
