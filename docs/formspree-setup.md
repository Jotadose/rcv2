# 📝 Configuración de Formspree para RC Reformas

## 📋 Resumen de la Migración

El formulario de contacto ha sido migrado de Supabase/Nodemailer a **Formspree** para simplificar el despliegue inicial y eliminar la necesidad de configurar credenciales SMTP y base de datos.

## 🚀 Configuración Paso a Paso

### 1. Crear cuenta en Formspree

1. Ve a [https://formspree.io](https://formspree.io)
2. Regístrate con el email de la empresa: `contacto@reformas.cl`
3. Verifica tu email

### 2. Crear un nuevo formulario

1. En el dashboard de Formspree, haz clic en "Create Form"
2. Nombre del formulario: "RC Reformas - Contacto Principal"
3. Email de destino: `contacto@reformas.cl` (donde quieres recibir los mensajes)
4. Copia el **Form ID** que aparece (formato: `abc123xyz`)

### 3. Configurar variables de entorno

#### Para Vercel:

1. Ve a tu proyecto en Vercel Dashboard
2. Settings > Environment Variables
3. Añade esta variable:
   ```
   NEXT_PUBLIC_FORMSPREE_ENDPOINT = https://formspree.io/f/[FORM_ID]
   ```
   Reemplaza `[FORM_ID]` con el ID que copiaste de Formspree

#### Para Hostinger App Hosting:

1. Ve a tu panel de Hostinger
2. Busca la sección "Environment Variables"
3. Añade la misma variable:
   ```
   NEXT_PUBLIC_FORMSPREE_ENDPOINT = https://formspree.io/f/[FORM_ID]
   ```

#### Para desarrollo local:

1. Crea un archivo `.env.local` en la raíz del proyecto:
   ```env
   NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/[FORM_ID]
   ```

### 4. Redeploy la aplicación

Después de configurar la variable de entorno, haz un nuevo deploy de la aplicación.

## ✅ Verificación

1. Llena y envía el formulario de contacto
2. Deberías ver un mensaje de éxito
3. Se debería abrir WhatsApp automáticamente
4. Revisa tu email para confirmar que llegó el mensaje de Formspree

## 🔧 Configuración Avanzada de Formspree (Opcional)

### Personalizar email de confirmación:

1. En Formspree Dashboard > tu formulario > Settings
2. Configura "Autoresponder" con un mensaje personalizado para los clientes

### Configurar reCAPTCHA:

1. En Settings > Spam Protection
2. Habilita reCAPTCHA para evitar spam

### Configurar redirección personalizada:

1. En Settings > Submission Settings
2. Configura una página de agradecimiento personalizada

## 📊 Límites del Plan Gratuito

- **50 envíos por mes** (suficiente para empezar)
- Branding de Formspree en emails
- Soporte básico

### Planes de Pago:

- **Basic ($10/mes)**: 1,000 envíos, sin branding, soporte prioritario
- **Gold ($50/mes)**: 10,000 envíos, funciones avanzadas

## 🛠️ Troubleshooting

### Error: "Formspree endpoint not configured"

- ✅ Verifica que la variable `NEXT_PUBLIC_FORMSPREE_ENDPOINT` esté configurada
- ✅ Redeploy la aplicación después de añadir la variable
- ✅ Verifica que el formato sea correcto: `https://formspree.io/f/[FORM_ID]`

### No llegan emails:

- ✅ Verifica que el email de destino esté correctamente configurado en Formspree
- ✅ Revisa la carpeta de spam
- ✅ Verifica el estado del formulario en Formspree Dashboard

### Formulario no se envía:

- ✅ Abre la consola del navegador para ver errores
- ✅ Verifica que todos los campos requeridos estén completos
- ✅ Verifica que el endpoint de Formspree esté activo

## 🔄 Rollback a Sistema Anterior (Si es necesario)

Si necesitas volver al sistema anterior de Supabase:

1. Configura las variables de entorno de Supabase:

   ```env
   SUPABASE_URL=tu_url_supabase
   SUPABASE_ANON_KEY=tu_clave_anonima
   ```

2. Modifica el `handleSubmit` en `src/app/page.tsx` para usar `/api/contact`

3. El endpoint `/api/contact/route.ts` ya está preparado para ser reactivado

## 📞 Soporte

Para cualquier problema con esta configuración:

- 📧 Email: contacto@reformas.cl
- 💬 WhatsApp: +56 9 8759 3649

---

**Nota**: Esta migración fue realizada el 29/08/2025 para simplificar el despliegue inicial. El sistema anterior se mantiene como respaldo.
