import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Nadia Luna — Product Owner | Retail & Digital Transformation",
  description: "Product Owner with 10+ years of leadership in luxury retail — I design product & experience that scale revenue and loyalty.",
  keywords: "Product Owner, Luxury Retail, Digital Transformation, Product Strategy, UX Design",
  authors: [{ name: "Nadia Luna" }],
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
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
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
