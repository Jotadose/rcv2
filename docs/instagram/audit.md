# Auditoría: API de Instagram dejó de funcionar

## Qué pasó

**Meta cerró la Instagram Basic Display API el 4 de diciembre de 2024.**

- Anuncio oficial: [Update on Instagram Basic Display API](https://developers.facebook.com/blog/post/2024/09/04/update-on-instagram-basic-display-api/)
- A partir de esa fecha **todas las peticiones a la Basic Display API fallan**.
- No hay alternativa oficial para cuentas **personales**; solo para cuentas **empresa/creador** (Instagram Graph API).

## Qué usa este proyecto

| Archivo | Uso | Estado |
|--------|-----|--------|
| `scripts/instagram-token.js` | OAuth Basic Display (`api.instagram.com/oauth`, `graph.instagram.com` para tokens) | **Obsoleto** – ya no funciona |
| `src/app/api/instagram/route.ts` | `GET graph.instagram.com/me/media` con `INSTAGRAM_ACCESS_TOKEN` | **Falla** si el token se obtuvo por Basic Display |
| `InstagramEmbedGrid.tsx` | Llama a `/api/instagram` cuando no se pasan `urls` | Muestra error "No se pudo cargar Instagram" cuando la API falla |

Si el token en `INSTAGRAM_ACCESS_TOKEN` se generó con el script `instagram-token.js` (flujo Basic Display), ese token y cualquier renovación con ese flujo **ya no son válidos** para `graph.instagram.com/me/media` en el contexto Basic Display. Meta dejó de aceptar esas peticiones.

## Opciones para que el feed vuelva a funcionar

### Opción 1: URLs estáticas / embeds (recomendado si no quieres tocar Meta)

No usar API. Definir una lista fija de URLs de posts y mostrarlas (enlaces + miniaturas o embeds).

1. En Vercel (o `.env.local`) agrega:
   ```env
   NEXT_PUBLIC_INSTAGRAM_EMBED_URLS=https://www.instagram.com/p/CODIGO1/,https://www.instagram.com/p/CODIGO2/,...
   ```
2. El componente `InstagramEmbedGrid` usa esas URLs cuando están definidas y no llama a `/api/instagram`.
3. Puedes poner hasta 8 (o el `limit` que uses) URLs de posts públicos de tu perfil.

Ventaja: funciona de inmediato, sin App de Meta ni revisión.  
Desventaja: hay que actualizar las URLs a mano cuando quieras cambiar los posts mostrados.

### Opción 2: Migrar a Instagram Graph API (solo cuentas empresa/creador)

Si la cuenta de Instagram es **empresa** o **creador** (y está vinculada a una Página de Facebook o configurada como profesional):

- Migrar a [Instagram API with Facebook Login](https://developers.facebook.com/docs/instagram-platform/instagram-api-with-facebook-login/) o [Instagram API with Instagram Login](https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/).
- El token y el flujo son distintos (Facebook Login, permisos `instagram_basic`, `instagram_content_publish`, etc.).
- Se sigue usando `graph.instagram.com` pero con un token obtenido por ese flujo nuevo, no por Basic Display.

El script `instagram-token.js` actual está pensado solo para Basic Display; para Graph API haría falta otro flujo (Facebook Login o Instagram Login) y posiblemente un backend de OAuth.

### Opción 3: Cuenta personal

Si la cuenta es **personal**, Meta no ofrece ya una API pública para obtener el feed. En la práctica solo quedan:

- Usar **URLs estáticas** (Opción 1), o
- Mostrar un enlace a tu perfil y/o embeds manuales de algunos posts.

## Cambios realizados en el código

1. **Fallback a env**: Si existe `NEXT_PUBLIC_INSTAGRAM_EMBED_URLS`, el grid usa esas URLs y no llama a la API, evitando el error cuando la API está caída.
2. **Comentarios de deprecación**: En `src/app/api/instagram/route.ts` y en `scripts/instagram-token.js` se indica que la Basic Display API está deprecada y cerrada.
3. **Documentación**: Este archivo (`INSTAGRAM_AUDIT.md`) queda como referencia de por qué dejó de funcionar y qué hacer.

## Resumen

- **Causa**: Cierre de Instagram Basic Display API (4 dic 2024).
- **Solución rápida**: Configurar `NEXT_PUBLIC_INSTAGRAM_EMBED_URLS` con las URLs de los posts que quieras mostrar.
- **Solución con API**: Pasar a Instagram Graph API (solo cuentas empresa/creador) con Facebook Login o Instagram Login.
