import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import MouseFollower from "@/components/MouseFollower";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Nadia Luna — Product Owner | Retail & Digital Transformation",
  description: "Product Owner with 10+ years of leadership in luxury retail — I design product & experience that scale revenue and loyalty.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans bg-brand-cream text-brand-deep antialiased cursor-none">
        <Nav />
        {children}
        <Footer />
        <MouseFollower />
      </body>
    </html>
  );
}
