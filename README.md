# RC Reformas — Sitio corporativo con estimador de cotización

Sitio web en producción para **RC Reformas**, empresa de remodelación y reformas, con un estimador de presupuestos interactivo y captura de leads multicanal.

🔗 **En vivo:** https://rcreformas.com
🧩 **Stack:** Next.js 15 · React 19 · TypeScript · Tailwind CSS 4

<!-- Reemplaza esta línea por una captura real del sitio:
![RC Reformas](docs/screenshot-home.png) -->

---

## Qué resuelve

RC Reformas necesitaba un sitio que no solo presentara la empresa, sino que **calificara y capturara clientes** de forma autónoma. El sitio convierte visitas en leads cualificados sin intervención manual:

- **Estimador de cotización propio:** calcula un presupuesto estimado según tipo de proyecto, nivel de calidad y superficie (m²), usando un modelo de multiplicadores configurable por el negocio.
- **Captura de leads con fallback:** los formularios envían el lead a Formspree y, si el envío falla, redirigen automáticamente a WhatsApp con el resumen pre-cargado — el cliente nunca pierde un contacto.
- **Galería de trabajos:** sección de proyectos y comparativas "antes / después" para mostrar el trabajo realizado.

## Decisiones técnicas destacadas

- **Integración con Instagram iterada:** la primera versión usaba la Basic Display API con tokens, OAuth y webhooks. Al volverse demasiado pesada de mantener para el caso de uso, la migré a un enfoque más liviano basado en embeds públicos configurables, dejando los endpoints antiguos respondiendo `410 Gone`. Menos superficie de mantenimiento, mismo resultado para el cliente.
- **Configuración separada del código:** datos del negocio, sitio e integraciones viven en `src/config/`, de modo que el cliente puede ajustar precios, textos y enlaces sin tocar la lógica.
- **Listo para producción:** `sitemap.ts`, páginas de privacidad y eliminación de datos, scripts de verificación pre-deploy y despliegue continuo en Vercel.

## Arquitectura

```
src/
├── app/
│   ├── api/            # API routes (contacto, estimador, health)
│   ├── page.tsx        # Landing principal
│   ├── sitemap.ts      # SEO
│   └── privacy/        # Páginas legales
├── components/         # Secciones de UI (Hero, Servicios, Portfolio, FAQ...)
├── config/             # Configuración de negocio, sitio e Instagram
└── lib/
    └── chat-estimator/ # Lógica del estimador: cálculo, flujo y tipos
```

## Tecnologías

| Capa | Herramientas |
|------|--------------|
| Framework | Next.js 15 (App Router), React 19 |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS 4 |
| Formularios / leads | Formspree + fallback a WhatsApp |
| Deploy | Vercel |

## Correr localmente

```bash
git clone https://github.com/Jotadose/rcv2.git
cd rcv2
npm install
npm run dev          # http://localhost:3000
```

### Variables de entorno

Crea un archivo `.env.local`:

```env
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/TU_FORM_ID
NEXT_PUBLIC_SITE_URL=https://rcreformas.com
# Opcional: posts públicos para la galería de Instagram
NEXT_PUBLIC_INSTAGRAM_EMBED_URLS=https://www.instagram.com/p/POST_1/,https://www.instagram.com/p/POST_2/
```

### Scripts útiles

```bash
npm run build                       # build de producción
npm run lint                        # linting
node scripts/pre-deploy-check.js    # verificación previa al despliegue
```

---

## Autor

**Juan Emilio Elgueda Lillo** — Desarrollador Full Stack
[Portafolio](https://jemiliodev.vercel.app) · [LinkedIn](https://linkedin.com/in/juan-emilio-elgueda-lillo) · [GitHub](https://github.com/Jotadose)
