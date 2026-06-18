import type { Metadata } from "next";
import { Outfit, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/cookie-consent";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "VirtuaLaz Tours — Tururi Virtuale 360 Premium 8K",
  description: "Creăm gemeni digitali 360° la rezoluție 8K HDR. O experiență imersivă exclusivă, concepută pentru brandurile de lux: imobiliare, HoReCa, showroom-uri și yacht-uri.",
  keywords: ["tur virtual 360", "scanare 360", "Matterport Romania", "tur virtual imobiliare", "tur virtual horeca", "360 premium", "digital twin", "VirtuaLaz"],
  authors: [{ name: "VirtuaLaz Tours" }],
  themeColor: "#08090a",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className={`${outfit.variable} ${cormorantGaramond.variable}`}>
      <body className="bg-background text-foreground antialiased min-h-screen">
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
