import type { Metadata } from "next";
import Script from "next/script";
import { Poppins, Inter } from "next/font/google";
import businessConfig from "@/config/business";
import { SITE_URL } from "@/config/site";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: businessConfig.name,
  description: businessConfig.description,
  url: SITE_URL,
  telephone: businessConfig.contact.phone,
  email: businessConfig.contact.email,
  image: `${SITE_URL}/REFORMAS/reformaslogohor.jpg`,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: businessConfig.location.city,
    addressRegion: businessConfig.location.region,
    addressCountry: "CL",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: businessConfig.location.coordinates.lat,
    longitude: businessConfig.location.coordinates.lng,
  },
  areaServed: businessConfig.serviceAreas.map((area) => ({
    "@type": "City",
    name: area,
  })),
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "14:00",
    },
  ],
  sameAs: [businessConfig.social.instagram.url].filter(Boolean),
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "RC Reformas y Construcciones - Lideres en Coquimbo",
  description: `Mas de ${businessConfig.stats.yearsExperience} anos transformando hogares y negocios en la Region de Coquimbo. Construccion, reformas y mantenciones con garantia. Cotizacion gratuita.`,
  keywords:
    "construccion Coquimbo, reformas La Serena, mantenciones, remodelaciones, construccion Chile, reformas Ovalle",
  authors: [{ name: "RC Reformas" }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "RC Reformas y Construcciones - Lideres en Coquimbo",
    description: `Mas de ${businessConfig.stats.yearsExperience} anos transformando hogares y negocios en la Region de Coquimbo.`,
    url: SITE_URL,
    siteName: "RC Reformas",
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RC Reformas y Construcciones",
    description: "Construccion y reformas profesionales en Coquimbo",
  },
  robots: { index: true, follow: true },
  themeColor: "#FFD600",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${poppins.variable} ${inter.variable}`}>
        <Script
          id="ld-local-business"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
