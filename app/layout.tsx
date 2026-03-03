import type { Metadata } from "next";
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
  ],
  openGraph: {
    title: "ShopBot | Premium Digital Products",
    description: "Discover meticulously curated digital products for creators who demand excellence.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="antialiased">
        <LuxuryHeader />
        <CartDrawer />
        <SearchModal />
        <ScrollToTopButton />
        <ToastContainer />
        {children}
        <LuxuryFooter />
      </body>
    </html>
  );
}
