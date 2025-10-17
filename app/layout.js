import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "./context/AppContext";

import { initMercadoPago } from '@mercadopago/sdk-react';
initMercadoPago('EST-73f12ddd-3882-4d6a-a34a-887fb09119f1');

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
  description: "Stream Lab",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
          <script src="https://sdk.mercadopago.com/js/v2"></script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
