"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, Search, Home, User } from "lucide-react";
import { useCartStore } from "@/lib/stores/cart-store";
import { useUIStore } from "@/lib/stores/ui-store";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { CurrencySelector } from "@/components/ui/currency-selector";
import { useRipple } from "@/hooks/use-ripple";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/products", label: "Products" },
  { href: "/categories", label: "Categories" },
];

export function LuxuryHeader() {
  const { getItemCount } = useCartStore();
  const { setCartOpen, setSearchOpen } = useUIStore();
  const { createRipple } = useRipple();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const itemCount = getItemCount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[var(--color-bg-primary)]/85 backdrop-blur-xl border-b border-[var(--color-border)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo - Enhanced */}
            <Link 
              href="/" 
              className="flex items-center gap-2.5 group"
              onClick={(e) => createRipple(e as any)}
            >
              <div className="w-9 h-9 lg:w-10 lg:h-10 bg-[var(--color-accent-primary)] rounded-xl flex items-center justify-center transition-transform group-hover:scale-105">
                <span className="text-[var(--color-bg-primary)] font-bold text-lg lg:text-xl">S</span>
              </div>
              <span className="text-lg lg:text-xl font-semibold text-[var(--color-text-primary)] tracking-tight">
                ShopBot
              </span>
            </Link>

            {/* Desktop Navigation - Enhanced with better spacing */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => createRipple(e as any)}
                  className="relative px-4 py-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors text-sm font-medium group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[var(--color-accent-primary)] group-hover:w-5 transition-all duration-300 rounded-full" />
                </Link>
              ))}
            </nav>

            {/* Actions - Better organized */}
            <div className="flex items-center gap-1.5 lg:gap-2">
              {/* Currency Selector - Desktop only */}
              <div className="hidden lg:block">
                <CurrencySelector />
              </div>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Search - Desktop */}
              <button
                onClick={(e) => {
                  createRipple(e);
                  setSearchOpen(true);
                }}
                className="hidden sm:flex w-10 h-10 items-center justify-center rounded-xl text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)] transition-all"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Cart */}
              <button
                onClick={(e) => {
                  createRipple(e);
                  setCartOpen(true);
                }}
                className="relative w-10 h-10 flex items-center justify-center rounded-xl text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)] transition-all"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[var(--color-accent-primary)] text-[var(--color-bg-primary)] text-[10px] font-bold rounded-full flex items-center justify-center">
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle - Enhanced */}
              <button
                onClick={(e) => {
                  createRipple(e);
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                }}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)] transition-all"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu - Enhanced full-screen experience */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-[var(--color-bg-primary)]/80 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full max-w-sm z-50 lg:hidden bg-[var(--color-bg-primary)] border-l border-[var(--color-border)]"
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between h-16 px-4 border-b border-[var(--color-border)]">
                <span className="text-lg font-semibold text-[var(--color-text-primary)]">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)] transition-all"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col p-4 gap-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)] transition-all text-base font-medium"
                    >
                      {link.icon && <link.icon className="w-5 h-5" />}
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Divider */}
                <div className="my-3 border-t border-[var(--color-border)]" />

                {/* Mobile Search */}
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setSearchOpen(true);
                  }}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)] transition-all text-base font-medium text-left"
                >
                  <Search className="w-5 h-5" />
                  Search
                </motion.button>

                {/* Account Link */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  <Link
                    href="/auth/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)] transition-all text-base font-medium"
                  >
                    <User className="w-5 h-5" />
                    Account
                  </Link>
                </motion.div>
                
                {/* Currency Selector */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25, duration: 0.3 }}
                  className="mt-3 pt-4 border-t border-[var(--color-border)] px-4"
                >
                  <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-3">
                    Currency
                  </p>
                  <CurrencySelector />
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
