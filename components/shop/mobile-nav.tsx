"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, Search, Grid3X3, User } from "lucide-react";
import { useCartStore } from "@/lib/stores/cart-store";
import { useUIStore } from "@/lib/stores/ui-store";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/products", icon: ShoppingBag, label: "Shop" },
  { href: "/categories", icon: Grid3X3, label: "Categories" },
  { href: "/account", icon: User, label: "Account" },
];

export function MobileNav() {
  const pathname = usePathname();
  const { getItemCount } = useCartStore();
  const { setSearchOpen } = useUIStore();
  const itemCount = getItemCount();

  // Don't show on certain pages
  if (pathname?.startsWith("/checkout")) return null;

  return (
    <>
      {/* Floating Search Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setSearchOpen(true)}
        className="fixed right-4 bottom-24 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-[#00f5ff] to-[#b829dd] text-black shadow-lg shadow-[#00f5ff]/25 flex items-center justify-center lg:hidden"
      >
        <Search className="w-6 h-6" />
      </motion.button>

      {/* Bottom Navigation */}
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
      >
        {/* Background blur */}
        <div className="absolute inset-0 bg-[#050508]/90 backdrop-blur-xl border-t border-white/[0.06]" />
        
        {/* Glow line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-[#00f5ff]/50 to-transparent" />

        <div className="relative flex items-center justify-around px-2 py-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            const Icon = item.icon;

            return (
              <Link key={item.href} href={item.href} className="relative">
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className={cn(
                    "flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors",
                    isActive 
                      ? "text-[#00f5ff]" 
                      : "text-[#606070] hover:text-[#a0a0b0]"
                  )}
                >
                  <div className="relative">
                    <Icon className="w-6 h-6" />
                    
                    {/* Cart badge */}
                    {item.href === "/products" && itemCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-gradient-to-r from-[#ff00ff] to-[#b829dd] text-white text-[10px] font-bold flex items-center justify-center"
                      >
                        {itemCount > 9 ? "9+" : itemCount}
                      </motion.span>
                    )}
                    
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="mobileNavIndicator"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#00f5ff]"
                      />
                    )}
                  </div>
                  <span className="text-[10px] font-medium">{item.label}</span>
                </motion.div>
              </Link>
            );
          })}
        </div>

        {/* Safe area padding for iOS */}
        <div className="h-safe-area-inset-bottom bg-[#050508]" />
      </motion.nav>

      {/* Spacer for content */}
      <div className="h-20 lg:hidden" />
    </>
  );
}
