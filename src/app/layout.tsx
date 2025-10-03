import type { Metadata } from "next";
import { Inter, Playfair_Display, Cormorant_Garamond, Bodoni_Moda } from "next/font/google";
import "./globals.css";
import { TextContentProvider } from "@/lib/TextContentContext";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-bodoni',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Nadia Luna — Product Owner | Retail & Digital Transformation",
  description: "Product Owner with 10+ years of leadership in luxury retail — I design product & experience that scale revenue and loyalty.",
  keywords: "Product Owner, Luxury Retail, Digital Transformation, Product Strategy, UX Design",
  authors: [{ name: "Nadia Luna" }],
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌶️</text></svg>",
        type: "image/svg+xml",
      },
    ],
  },
  openGraph: {
    title: "Nadia Luna — Product Owner | Retail & Digital Transformation",
    description: "Product Owner with 10+ years of leadership in luxury retail — I design product & experience that scale revenue and loyalty.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nadia Luna — Product Owner",
    description: "Product Owner with 10+ years of leadership in luxury retail",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${cormorant.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans bg-brand-cream text-brand-deep antialiased">
        <TextContentProvider>
          {children}
        </TextContentProvider>
      </body>
    </html>
  );
}
