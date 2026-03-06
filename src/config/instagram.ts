import businessConfig from "@/config/business";

export type InstagramShowcaseItem = {
  caption: string;
  display?: "contain" | "cover";
  href: string;
  imageSrc: string;
  kicker?: string;
  title: string;
};

export type InstagramEmbedItem = {
  embedUrl: string;
  href: string;
};

export type InstagramConfigState = {
  configuredUrls: string[];
  invalidUrls: string[];
  primaryConfiguredUrl: string | null;
  validEmbeds: InstagramEmbedItem[];
};

const FALLBACK_ITEMS: InstagramShowcaseItem[] = [
  {
    display: "cover",
    href: `${businessConfig.social.instagram.url}/`,
    imageSrc: "/REFORMAS/refor13.jpg",
    kicker: "Obra terminada",
    title: "Terminaciones y fachada final",
    caption: "Avances reales, detalles de iluminacion y entregas en terreno.",
  },
  {
    display: "contain",
    href: `${businessConfig.social.instagram.url}/`,
    imageSrc: "/REFORMAS/reformaslogohor.jpg",
    kicker: "Coordinacion",
    title: "Seguimiento directo con el cliente",
    caption: "Agenda, respuestas rapidas y coordinacion por WhatsApp.",
  },
  {
    display: "contain",
    href: `${businessConfig.social.instagram.url}/`,
    imageSrc: "/REFORMAS/reformaslogoblanco.jpg",
    kicker: "Confianza",
    title: "Garantia y materiales con respaldo",
    caption: "Obras ordenadas, materiales confiables y terminaciones prolijas.",
  },
  {
    display: "contain",
    href: `${businessConfig.social.instagram.url}/`,
    imageSrc: "/REFORMAS/reformasnegro.jpg",
    kicker: "Perfil activo",
    title: "Nuevos trabajos y visitas tecnicas",
    caption: "Publicamos avances, novedades y registros de cada proyecto.",
  },
];

function getConfiguredInstagramUrls() {
  return process.env.NEXT_PUBLIC_INSTAGRAM_EMBED_URLS?.split(",")
    .map((url) => url.trim())
    .filter(Boolean) ?? [];
}

function getInstagramEmbedUrl(url: string) {
  try {
    const parsed = new URL(url);
    const segments = parsed.pathname.split("/").filter(Boolean);
    const [type, code] = segments;

    if (!code) {
      return null;
    }

    if (type === "p" || type === "reel" || type === "tv") {
      return `https://www.instagram.com/${type}/${code}/embed/captioned/`;
    }

    return null;
  } catch {
    return null;
  }
}

export function getInstagramConfigState(limit = 4): InstagramConfigState {
  const configuredUrls = getConfiguredInstagramUrls().slice(0, limit);

  const validEmbeds: InstagramEmbedItem[] = [];
  const invalidUrls: string[] = [];

  configuredUrls.forEach((href) => {
    const embedUrl = getInstagramEmbedUrl(href);

    if (!embedUrl) {
      invalidUrls.push(href);
      return;
    }

    validEmbeds.push({
      embedUrl,
      href,
    });
  });

  return {
    configuredUrls,
    invalidUrls,
    primaryConfiguredUrl: configuredUrls[0] ?? null,
    validEmbeds,
  };
}

export function getInstagramEmbeds(limit = 4): InstagramEmbedItem[] {
  return getInstagramConfigState(limit).validEmbeds;
}

export function getInstagramShowcaseItems(limit = 4) {
  const { configuredUrls } = getInstagramConfigState(limit);

  if (configuredUrls.length === 0) {
    return FALLBACK_ITEMS.slice(0, limit);
  }

  return FALLBACK_ITEMS.slice(0, limit).map((fallback, index) => ({
    ...fallback,
    href: configuredUrls[index % configuredUrls.length],
  }));
}
