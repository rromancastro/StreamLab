import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "./context/AppContext";
import Script from "next/script"; // 👈 importá esto
import localFont from "next/font/local";

import { initMercadoPago } from '@mercadopago/sdk-react';
initMercadoPago('EST-73f12ddd-3882-4d6a-a34a-887fb09119f1');

const inter = localFont({
  src: "../public/fonts/Inter.ttf",
  variable: "--font-inter",
  display: "swap",
});

const moderniz = localFont({
  src: "../public/fonts/Moderniz.ttf",
  variable: "--font-moderniz",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Stream Lab - El laboratorio de streaming",
  description: "Stream Lab es un estudio de alta calidad diseñado para creadores de contenido que buscan un resultado excepcional en sus proyectos audiovisuales. Combinamos experiencia e innovación para brindar no solo excelencia técnica, sino también una atención cercana y personalizada.",
  openGraph: {
    title: "Stream Lab - El laboratorio de streaming",
    description: "Somos un estudio de streaming en Palermo Hollywood. Vos traé tu proyecto, nosotros nos ocupamos de lo demás!",
    url: "https://streamlab.com.ar",
    siteName: "Stream Lab - El laboratorio de streaming",
    images: [
      {
        url: "https://streamlab.com.ar/og-image.png",
        width: 1200,
        height: 630,
        alt: "Stream Lab - El laboratorio de streaming",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stream Lab - El laboratorio de streaming",
    description: "Somos un estudio de streaming en Palermo Hollywood. Vos traé tu proyecto, nosotros nos ocupamos de lo demás!",
    images: ["https://streamlab.com.ar/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <Script
          src="https://sdk.mercadopago.com/js/v2"
          strategy="beforeInteractive" // 👈 lo carga antes de que React monte
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${moderniz.variable}`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
