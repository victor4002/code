"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, Search, User, Grid3X3 } from "lucide-react";
import { useCartStore } from "@/lib/stores/cart-store";
import { useUIStore } from "@/lib/stores/ui-store";
import { motion } from "framer-motion";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/products", label: "Shop", icon: Grid3X3 },
  { href: "#", label: "Search", icon: Search, isAction: true },
  { href: "/shop/cart", label: "Cart", icon: ShoppingBag, showBadge: true },
  { href: "/auth/login", label: "Account", icon: User },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const { getItemCount } = useCartStore();
  const { setSearchOpen, setCartOpen } = useUIStore();
  
  const itemCount = getItemCount();

  const handleClick = (e: React.MouseEvent, item: typeof navItems[0]) => {
    if (item.label === "Search") {
      e.preventDefault();
      setSearchOpen(true);
    } else if (item.label === "Cart") {
      e.preventDefault();
      setCartOpen(true);
    }
  };

  return (
    <nav className="mobile-bottom-nav lg:hidden">
      {navItems.map((item) => {
        const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
        const Icon = item.icon;

        return (
          <Link
            key={item.label}
            href={item.href}
            onClick={(e) => handleClick(e, item)}
            className={`mobile-bottom-nav-item ${isActive ? "active" : ""}`}
          >
            <div className="relative">
              <Icon className={`transition-colors ${isActive ? "text-[var(--color-accent-primary)]" : ""}`} />
              
              {/* Active indicator dot */}
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-indicator"
                  className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[var(--color-accent-primary)] rounded-full"
                />
              )}
              
              {/* Cart badge */}
              {item.showBadge && itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 px-1 bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </div>
            <span className={isActive ? "text-[var(--color-accent-primary)]" : ""}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
