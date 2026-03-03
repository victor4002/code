"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Search,
  User,
  Menu,
  X,
  Package,
  LogOut,
  Hexagon,
} from "lucide-react";
import { useCartStore } from "@/lib/stores/cart-store";
import { useAuthStore } from "@/lib/stores/auth-store";
import { useUIStore } from "@/lib/stores/ui-store";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/categories", label: "Categories" },
];

export function Header() {
  const { getItemCount } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const { toggleCart, setSearchOpen } = useUIStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const itemCount = getItemCount();

  // Track scroll for header appearance
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setScrolled(window.scrollY > 50);
    });
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Background with blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolled ? 1 : 0.8 }}
        className={cn(
          "absolute inset-0 backdrop-blur-xl border-b transition-colors duration-300",
          scrolled 
            ? "bg-[#050508]/90 border-white/[0.08]" 
            : "bg-transparent border-transparent"
        )}
      />

      {/* Glow line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00f5ff]/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div 
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00f5ff] to-[#b829dd] flex items-center justify-center overflow-hidden"
            >
              <Hexagon className="w-6 h-6 text-black fill-black" />
            </motion.div>
            <span className="text-white font-bold text-xl">
              Shop<span className="gradient-text">Bot</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-[#a0a0b0] hover:text-white transition-colors text-sm font-medium group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#00f5ff] to-[#ff00ff] group-hover:w-8 transition-all duration-300 rounded-full" />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSearchOpen(true)}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-[#a0a0b0] hover:text-white hover:bg-white/[0.05] border border-transparent hover:border-white/10 transition-all"
              aria-label="Search products"
            >
              <Search className="w-5 h-5" />
            </motion.button>

            {/* Cart */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleCart}
              className="relative w-10 h-10 rounded-xl flex items-center justify-center text-[#a0a0b0] hover:text-white hover:bg-white/[0.05] border border-transparent hover:border-white/10 transition-all"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-[#00f5ff] to-[#b829dd] text-black text-xs font-bold flex items-center justify-center"
                >
                  {itemCount}
                </motion.span>
              )}
            </motion.button>

            {/* Auth */}
            {isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  href="/downloads"
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-[#a0a0b0] hover:text-white hover:bg-white/[0.05] border border-transparent hover:border-white/10 transition-all"
                  title="My Downloads"
                >
                  <Package className="w-5 h-5" />
                </Link>
                <button
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-[#a0a0b0] hover:text-white hover:bg-white/[0.05] border border-transparent hover:border-white/10 transition-all"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link href="/login" className="hidden sm:block">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#00f5ff] to-[#b829dd] text-black font-semibold text-sm hover:shadow-[0_0_20px_rgba(0,245,255,0.4)] transition-shadow"
                >
                  Sign In
                </motion.button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center text-[#a0a0b0] hover:text-white hover:bg-white/[0.05] border border-transparent hover:border-white/10 transition-all"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/[0.06] bg-[#050508]/98 backdrop-blur-xl"
          >
            <nav className="flex flex-col p-4 gap-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#a0a0b0] hover:text-white hover:bg-white/[0.05] transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#00f5ff] to-[#ff00ff]" />
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              {!isAuthenticated && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-2"
                >
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00f5ff] to-[#b829dd] text-black font-semibold">
                      Sign In
                    </button>
                  </Link>
                </motion.div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
