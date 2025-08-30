# 🏗️ RC Reformas - Sitio Web Corporativo

Sitio web moderno para RC Reformas y Construcciones, empresa líder en servicios de construcción en la Región de Coquimbo, Chile.

## 🚀 Características Principales

- **📱 Responsive Design**: Optimizado para todos los dispositivos
- **🤖 Chatbot IA**: Asistente inteligente para cotizaciones automáticas
- **📝 Formularios Inteligentes**: Integración con Formspree para manejo de contactos
- **📸 Galería Instagram**: Integración automática con Instagram Business API
- **💬 WhatsApp Integration**: Conectividad directa con WhatsApp Business
- **⚡ Alto Rendimiento**: Desarrollado con Next.js 14 y optimizaciones avanzadas

## 🛠️ Stack Tecnológico

- **Frontend**: Next.js 14, React 18, TypeScript
- **Estilos**: Tailwind CSS
- **Formularios**: Formspree (sin backend requerido)
- **Base de Datos**: Supabase (opcional, para funciones avanzadas)
- **Deploy**: Vercel / Hostinger App Hosting
- **Iconos**: Lucide React

## 📋 Configuración Rápida

### 1. Instalación

```bash
git clone https://github.com/Jotadose/rcv2.git
cd rcv2
npm install
```

### 2. Variables de Entorno

Copia `.env.example` a `.env.local` y configura:

```env
# REQUERIDO - Formspree para formularios
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID

# OPCIONAL - Solo si necesitas funciones avanzadas
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
INSTAGRAM_ACCESS_TOKEN=your_instagram_token
```

### 3. Desarrollo

```bash
npm run dev
```

El sitio estará disponible en [http://localhost:3000](http://localhost:3000)

## 📝 Configuración de Formspree

**IMPORTANTE**: El formulario de contacto usa Formspree. Sigue estas instrucciones:

1. **Crea una cuenta en [Formspree.io](https://formspree.io)**
2. **Crea un nuevo formulario** con email de destino: `contacto@reformas.cl`
3. **Copia el Form ID** y configúralo en las variables de entorno
4. **Redeploy** la aplicación

📖 **Guía completa**: Ver [FORMSPREE_SETUP.md](./FORMSPREE_SETUP.md)

## 🚀 Despliegue

### Vercel (Recomendado)

1. Conecta el repositorio con Vercel
2. Configura las variables de entorno en Vercel Dashboard
3. Deploy automático en cada push

### Hostinger App Hosting

1. Conecta el repositorio
2. Configura las variables de entorno en el panel
3. Build y deploy

## 📂 Estructura del Proyecto

```
rcv2/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Página principal
│   │   ├── api/
│   │   │   ├── contact/          # API de contacto (deprecated)
│   │   │   └── chat/             # API del chatbot IA
│   │   └── components/
│   │       ├── HeroSection.tsx
│   │       ├── ServicesSection.tsx
│   │       └── InstagramEmbedGrid.tsx
│   ├── config/
│   │   └── business.ts           # Configuración del negocio
│   └── lib/
│       └── supabase.ts           # Cliente Supabase (opcional)
├── public/
│   └── REFORMAS/                 # Assets de la empresa
├── FORMSPREE_SETUP.md           # Guía de configuración
└── README.md                    # Este archivo
```

## 🔧 Funcionalidades

### Formulario de Contacto

- ✅ Validación client-side y server-side
- ✅ Integración con Formspree (sin backend)
- ✅ Fallback automático a WhatsApp
- ✅ Mensajes de éxito/error
- ✅ Campos: nombre, teléfono, email, tipo de proyecto, ubicación, mensaje

### Chatbot IA de Cotización

- ✅ Conversación guiada para generar cotizaciones
- ✅ Cálculo automático de precios basado en área y calidad
- ✅ Guardado de sesiones en Supabase
- ✅ Integración con WhatsApp para seguimiento

### Galería Instagram

- ✅ Integración con Instagram Business API
- ✅ Carga automática de posts recientes
- ✅ Fallback a imágenes estáticas

## 🛠️ Personalización

### Configuración del Negocio

Edita `src/config/business.ts` para personalizar:

- Información de contacto
- Servicios ofrecidos
- Precios base para cotizaciones
- Redes sociales
- Horarios de atención

### Estilos

- El proyecto usa Tailwind CSS
- Clase principal de botón: `btn-primary`
- Colores principales: orange-500, slate-800
- Responsive design incluido

## 📞 Soporte y Contacto

- **Email**: contacto@reformas.cl
- **WhatsApp**: +56 9 8759 3649
- **Repositorio**: [GitHub](https://github.com/Jotadose/rcv2)

## 🔄 Migración de Formularios

**Fecha**: 29/08/2025
**Cambio**: Migración de Supabase/Nodemailer a Formspree

- ✅ Formulario simplificado sin necesidad de backend
- ✅ Endpoint `/api/contact` mantenido como respaldo
- ✅ WhatsApp como fallback automático
- ✅ Misma UI y experiencia de usuario

## 📝 Licencia

Proyecto privado para RC Reformas y Construcciones.

---

**Desarrollado con ❤️ para RC Reformas** - Transformando espacios, construyendo sueños.
