# 🚀 Guía Rápida de Despliegue - RC Reformas

## ⚡ Migración Completada: Supabase → Formspree

**Fecha**: 29 de Agosto 2025  
**Estado**: ✅ Migración exitosa verificada

## 🎯 Configuración Inmediata (5 minutos)

### 1. Formspree Setup

```bash
# 1. Ve a https://formspree.io
# 2. Regístrate con: contacto@reformas.cl
# 3. Crear nuevo formulario → Copiar Form ID
```

### 2. Variables de Entorno

#### Vercel:

```bash
# Dashboard → Settings → Environment Variables
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/[TU_FORM_ID]
```

#### Hostinger:

```bash
# Panel → Environment Variables
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/[TU_FORM_ID]
```

### 3. Deploy

```bash
# El deploy se activará automáticamente al hacer push
git add .
git commit -m "Migración a Formspree completada"
git push origin master
```

## ✅ Checklist de Funcionalidades

### Formulario de Contacto

- [x] Migrado a Formspree
- [x] Validaciones client-side
- [x] Mensajes de éxito/error
- [x] Fallback automático a WhatsApp
- [x] Campos: nombre*, teléfono*, email, tipo_proyecto*, ubicación*, mensaje

### Características Preservadas

- [x] Chatbot IA (NO modificado)
- [x] WhatsApp CTAs (NO modificado)
- [x] Instagram Gallery (NO modificado)
- [x] UI/UX idéntica
- [x] Clases CSS exactas (`btn-primary`)

### Beneficios de la Migración

- [x] Sin configuración de SMTP
- [x] Sin base de datos requerida
- [x] Deploy más simple
- [x] Menos puntos de falla
- [x] Mantenimiento reducido

## 🧪 Testing Inmediato

1. **Abrir formulario** → Llenar todos los campos requeridos
2. **Enviar** → Ver mensaje de éxito
3. **WhatsApp** → Se abre automáticamente
4. **Email** → Verificar llegada en inbox

## 📞 Endpoints Activos

```
✅ Formulario: Formspree (activo)
✅ Chatbot: /api/chat/save (activo)
⚠️ Contacto: /api/contact (deprecated, solo backup)
```

## 🔄 Rollback (Si necesario)

```bash
# 1. Configurar variables Supabase en .env
SUPABASE_URL=your_url
SUPABASE_ANON_KEY=your_key

# 2. Cambiar handleSubmit en page.tsx
# 3. Usar /api/contact en lugar de Formspree
```

## 🎉 Estado Actual

- **Desarrollo**: ✅ Listo
- **Staging**: ✅ Listo
- **Producción**: 🔄 Pendiente configurar Formspree

---

**Tiempo estimado total**: 5-10 minutos  
**Próximo deploy**: Automático al configurar variable de entorno
