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
  title: "Stream Lab",
  description: "Stream Lab es un estudio de alta calidad diseñado para creadores de contenido que buscan un resultado excepcional en sus proyectos audiovisuales. Combinamos experiencia e innovación para brindar no solo excelencia técnica, sino también una atención cercana y personalizada.",
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
