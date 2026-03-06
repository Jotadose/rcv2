# RC Reformas

Sitio corporativo de RC Reformas construido con Next.js 15, React 19 y Tailwind CSS 4.

## Stack actual

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS 4
- Formspree para formularios
- WhatsApp como canal de seguimiento
- Galeria de Instagram basada en assets locales y URLs publicas configurables

## Variables de entorno

```env
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
NEXT_PUBLIC_SITE_URL=https://rcreformas.cl
NEXT_PUBLIC_INSTAGRAM_EMBED_URLS=https://www.instagram.com/p/POST_1/,https://www.instagram.com/p/POST_2/
```

`NEXT_PUBLIC_INSTAGRAM_EMBED_URLS` es opcional. Si no existe, la home usa una seleccion local curada.

## Scripts utiles

```bash
npm run dev
npm run build
npm run lint
node scripts/pre-deploy-check.js
node scripts/setup-env-vars.js
```

## Instagram

La galeria publica ya no usa tokens, webhooks ni Basic Display API. La estrategia actual es:

1. Mostrar tarjetas optimizadas con `next/image`.
2. Vincular cada tarjeta a una publicacion publica o al perfil.
3. Permitir reemplazar esos links desde `NEXT_PUBLIC_INSTAGRAM_EMBED_URLS`.

La documentacion operativa de esta seccion esta en `src/app/instagram-setup/page.tsx` y `INSTAGRAM_AUDIT.md`.

## Contacto

El formulario envia leads directamente a Formspree. Si el envio falla, el flujo redirige a WhatsApp con el resumen del lead.

## Notas

- El proyecto ya no persiste chats ni contactos en el servidor.
- Los endpoints legacy de Instagram quedaron en estado `410`.
- El dominio canonico esperado es `https://rcreformas.cl`.
