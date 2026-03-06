import businessConfig from "@/config/business";

export type InstagramShowcaseItem = {
  caption: string;
  href: string;
  imageSrc: string;
  title: string;
};

const FALLBACK_ITEMS: InstagramShowcaseItem[] = [
  {
    href: `${businessConfig.social.instagram.url}/`,
    imageSrc: "/REFORMAS/refor13.jpg",
    title: "Obras recientes",
    caption: "Seguimiento de remodelaciones, terminaciones y visitas tecnicas.",
  },
  {
    href: `${businessConfig.social.instagram.url}/`,
    imageSrc: "/REFORMAS/reformaslogohor.jpg",
    title: "Equipo RC Reformas",
    caption: "Coordinacion directa por WhatsApp y visitas agendadas en terreno.",
  },
  {
    href: `${businessConfig.social.instagram.url}/`,
    imageSrc: "/REFORMAS/reformaslogoblanco.jpg",
    title: "Marca y confianza",
    caption: "Garantia, materiales de calidad y seguimiento de cada proyecto.",
  },
  {
    href: `${businessConfig.social.instagram.url}/`,
    imageSrc: "/REFORMAS/reformasnegro.jpg",
    title: "Contacto directo",
    caption: "Nuevos trabajos, avances y novedades publicadas en Instagram.",
  },
];

export function getInstagramShowcaseItems(limit = 4) {
  const configuredUrls =
    process.env.NEXT_PUBLIC_INSTAGRAM_EMBED_URLS?.split(",")
      .map((url) => url.trim())
      .filter(Boolean) ?? [];

  if (configuredUrls.length === 0) {
    return FALLBACK_ITEMS.slice(0, limit);
  }

  return configuredUrls.slice(0, limit).map((href, index) => {
    const fallback = FALLBACK_ITEMS[index % FALLBACK_ITEMS.length];
    return {
      ...fallback,
      href,
      title: `Publicacion ${index + 1}`,
    };
  });
}
