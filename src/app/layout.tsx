import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "RC Reformas y Construcciones - Líderes en Coquimbo",
  description:
    "Más de 15 años transformando hogares y negocios en la Región de Coquimbo. Construcción, reformas y mantenciones con garantía. Cotización gratuita.",
  keywords:
    "construcción Coquimbo, reformas La Serena, mantenciones, remodelaciones, construcción Chile, reformas Ovalle",
  authors: [{ name: "RC Reformas" }],
  openGraph: {
    title: "RC Reformas y Construcciones - Líderes en Coquimbo",
    description:
      "Más de 15 años transformando hogares y negocios en la Región de Coquimbo",
    url: "https://rcreformas.cl",
    siteName: "RC Reformas",
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RC Reformas y Construcciones",
    description: "Construcción y reformas profesionales en Coquimbo",
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
        <link rel="canonical" href="https://rcreformas.cl" />
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
