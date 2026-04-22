# 🗄️ Configuración de Base de Datos - RC Reformas

## 🚀 Configuración Rápida (5 minutos)

### Paso 1: Crear Proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com)
2. Crea una cuenta / Inicia sesión
3. Clic en "New Project"
4. Elige un nombre: `rc-reformas-db`
5. Selecciona región: `South America (São Paulo)`
6. Elige contraseña fuerte para la base de datos
7. Espera 2-3 minutos a que se cree el proyecto

### Paso 2: Obtener Credenciales

1. En tu proyecto, ve a `Settings` → `API`
2. Copia estos valores:
   - **Project URL**: `https://tu-proyecto.supabase.co`
   - **Anon public key**: `eyJ...` (clave larga)

### Paso 3: Configurar Variables de Entorno

1. Copia `.env.local.example` a `.env.local`
2. Llena los valores de Supabase:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ_tu_clave_anonima_aqui
```

### Paso 4: Configurar Base de Datos

1. En Supabase, ve a `SQL Editor`
2. Copia y pega TODO el contenido de `supabase-setup.sql`
3. Clic en "RUN"
4. ✅ Verás mensaje de éxito

### Paso 5: Configurar Email (Gmail)

1. Ve a tu [cuenta de Google](https://myaccount.google.com)
2. `Seguridad` → `Verificación en 2 pasos` (debe estar habilitada)
3. `Contraseñas de aplicaciones` → `Seleccionar aplicación: Correo`
4. Copia la contraseña generada (16 caracteres)
5. Agrega a `.env.local`:

```bash
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_contraseña_de_aplicacion_16_caracteres
CONTACT_EMAIL_TO=contacto@rcreformas.cl
```

## ✅ Verificación

### Probar Conexión Automática:

```bash
cd scripts
node setup-supabase.js
```

### Verificar Manualmente:

1. Abre Supabase → `Table Editor`
2. Deberías ver:
   - ✅ `contact_submissions`
   - ✅ `chat_sessions`
3. Prueba el chatbot en tu web
4. Revisa que aparezcan datos en las tablas

## 📊 Dashboard de Estadísticas

En Supabase SQL Editor, ejecuta:

```sql
-- Ver estadísticas de contactos
SELECT * FROM get_contact_stats();

-- Ver estadísticas de chat
SELECT * FROM get_chat_stats();
```
