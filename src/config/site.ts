import businessConfig from "@/config/business";

const FALLBACK_SITE_URL = businessConfig.contact.website || "https://rcreformas.cl";

export function getSiteUrl() {
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  return (configuredSiteUrl || FALLBACK_SITE_URL).replace(/\/+$/, "");
}

export const SITE_URL = getSiteUrl();
