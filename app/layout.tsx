import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LuxuryHeader } from "@/components/shop/luxury-header";
import { LuxuryFooter } from "@/components/shop/luxury-footer";
import { CartDrawer } from "@/components/shop/cart-drawer";
import { SearchModal } from "@/components/shop/search-modal";
import { ScrollToTopButton } from "@/components/ui/scroll-to-top-button";
import { ToastContainer } from "@/components/ui/toast";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

export const metadata: Metadata = {
  title: "ShopBot | Premium Digital Products Marketplace",
  description:
    "Discover meticulously curated digital products. Premium eBooks, templates, and tools for creators who demand excellence.",
  keywords: [
    "digital products",
    "ebooks",
    "templates",
    "premium",
    "marketplace",
    "downloads",
    "design resources",
  ],
  authors: [{ name: "ShopBot" }],
  creator: "ShopBot",
  openGraph: {
    title: "ShopBot | Premium Digital Products",
    description: "Discover meticulously curated digital products for creators who demand excellence.",
    type: "website",
    locale: "en_US",
    siteName: "ShopBot",
  },
  twitter: {
    card: "summary_large_image",
    title: "ShopBot | Premium Digital Products",
    description: "Discover meticulously curated digital products for creators who demand excellence.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0b" },
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col">
        <LuxuryHeader />
        <main className="flex-grow">
          {children}
        </main>
        <LuxuryFooter />
        <CartDrawer />
        <SearchModal />
        <ScrollToTopButton />
        <ToastContainer />
      </body>
    </html>
  );
}
