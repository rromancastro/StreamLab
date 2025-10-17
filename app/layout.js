import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { initMercadoPago } from '@mercadopago/sdk-react';
initMercadoPago('YOUR_PUBLIC_KEY');

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
        {children}
      </body>
    </html>
  );
}
