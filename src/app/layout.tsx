import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import businessConfig from "@/config/business";
import { SITE_URL } from "@/config/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "RC Reformas y Construcciones - Lideres en Coquimbo",
  description: `Mas de ${businessConfig.stats.yearsExperience} anos transformando hogares y negocios en la Region de Coquimbo. Construccion, reformas y mantenciones con garantia. Cotizacion gratuita.`,
  keywords:
    "construccion Coquimbo, reformas La Serena, mantenciones, remodelaciones, construccion Chile, reformas Ovalle",
  authors: [{ name: "RC Reformas" }],
  alternates: {
    canonical: "/",
  },
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
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f97316" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
