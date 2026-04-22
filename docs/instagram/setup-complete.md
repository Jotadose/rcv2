# 📸 **CONFIGURACIÓN COMPLETA DE INSTAGRAM API**

## ✅ **ESTADO ACTUAL: Configuración en Meta completada**

Basado en las capturas que proporcionaste, ya tienes:

- ✅ App en Meta Developer configurada
- ✅ Instagram Basic Display habilitado
- ✅ Access Token generado
- ✅ Cuenta @lyon_car_detail conectada

---

## 🔑 **PASO 1: Obtener tu Access Token**

### **Desde tu interfaz de Meta:**

1. **Copia el Access Token** que aparece en tu pantalla
2. **Guarda también el User ID** (el número largo que aparece)

**🔍 Tu información visible:**

- **User ID:** `17841438252089801` (visible en tu captura)
- **Access Token:** [El que aparece en el campo "Access Token"]

---

## 🌐 **PASO 2: Configurar Variables en Vercel**

### **2.1 Ir a tu proyecto en Vercel:**

1. Ve a [vercel.com](https://vercel.com)
2. Selecciona tu proyecto `rcv2`
3. Ve a **Settings** → **Environment Variables**

### **2.2 Agregar las variables de Instagram:**

```bash
# Variables de Instagram (REQUERIDAS)
INSTAGRAM_ACCESS_TOKEN=tu_access_token_aqui
INSTAGRAM_ACCOUNT_ID=17841438252089801

# Variables opcionales (recomendadas)
NEXT_PUBLIC_SITE_URL=https://tu-sitio.vercel.app
```

**📝 Cómo llenar:**

- **INSTAGRAM_ACCESS_TOKEN:** Copia exactamente el token de Meta Developer
- **INSTAGRAM_ACCOUNT_ID:** Usa `17841438252089801` (tu User ID)

---

## 🧪 **PASO 3: Probar la Configuración**

### **3.1 Usar el script de prueba:**

```bash
# En tu terminal local
node scripts/instagram-token.js
```

### **3.2 Verificar en el sitio web:**

Una vez desplegado, ve a: `https://tu-sitio.vercel.app`

- Las fotos de Instagram deberían aparecer automáticamente
- Si no aparecen, revisa la consola del navegador

---

## 🔧 **PASO 4: Configuración de Webhooks (OPCIONAL)**

### **En Meta Developer:**

1. **URL de devolución de llamada:** `https://tu-sitio.vercel.app/api/webhooks/instagram`
2. **Token de verificación:** Cualquier string que quieras (ej: `mi_token_secreto`)

### **Variable adicional en Vercel:**

```bash
INSTAGRAM_WEBHOOK_TOKEN=mi_token_secreto
```

---

## 🗄️ **PASO 5: Configurar Base de Datos (OPCIONAL)**

### **5.1 Crear cuenta en Supabase:**

1. Ve a [supabase.com](https://supabase.com)
2. Crea nuevo proyecto
3. Elige región más cercana (South America)

### **5.2 Ejecutar SQL para crear tablas:**

```sql
-- Copiar y pegar en Supabase SQL Editor
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
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

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
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);
```

### **5.3 Obtener variables de Supabase:**

En tu proyecto Supabase → Settings → API:

- **Project URL**
- **Public anon key**
- **Service role key** (secret)

### **5.4 Agregar a Vercel:**

```bash
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_public_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_key
```

---

## 📧 **PASO 6: Configurar Notificaciones Email (OPCIONAL)**

### **6.1 Configurar Gmail:**

1. Habilitar 2FA en tu cuenta Gmail
2. Generar App Password:
   - Google Account Settings → Security
   - 2-Step Verification → App passwords
   - Generate new → Mail → Other device
   - Copiar la contraseña de 16 caracteres

### **6.2 Agregar a Vercel:**

```bash
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_app_password_16_caracteres
EMAIL_TO=contacto@reformas.cl
```

---

## 🚀 **PASO 7: Deploy y Verificación**

### **7.1 Hacer redeploy:**

Después de agregar las variables, Vercel hará redeploy automático.

### **7.2 Verificar funcionalidades:**

#### **✅ Siempre funcionarán:**

- Sitio web completo
- WhatsApp integration (+56 9 8759 3649)
- Cotizador IA
- Formularios con respaldo WhatsApp

#### **🔧 Con configuración:**

- **Instagram feed real** (requiere INSTAGRAM_ACCESS_TOKEN)
- **Emails automáticos** (requiere EMAIL_USER/EMAIL_PASS)
- **Base de datos** (requiere Supabase)

---

## 🎯 **PRÓXIMOS PASOS INMEDIATOS:**

### **1. Configurar Instagram (MÁS IMPORTANTE):**

```bash
INSTAGRAM_ACCESS_TOKEN=[tu_token_de_meta]
INSTAGRAM_ACCOUNT_ID=17841438252089801
```

### **2. Configurar URL del sitio:**

```bash
NEXT_PUBLIC_SITE_URL=https://tu-proyecto.vercel.app
```

### **3. Probar el sitio:**

Una vez configurado, el feed de Instagram mostrará las fotos reales de @lyon_car_detail

---

## 📞 **¿NECESITAS AYUDA?**

Si tienes problemas:

1. **Revisa logs en Vercel** → Functions → View Function Logs
2. **Prueba la API** → `https://tu-sitio.vercel.app/api/instagram`
3. **Verifica variables** → Vercel Settings → Environment Variables

---

## 🎉 **¡CONFIGURACIÓN COMPLETADA!**

Con Instagram configurado, tu sitio web de REFORMAS tendrá:

- ✅ Feed real de Instagram con tus proyectos
- ✅ Actualización automática de contenido
- ✅ Mejor engagement y conversión
- ✅ Presencia profesional completa

**🚀 ¡Tu sitio estará listo para generar más leads!**
