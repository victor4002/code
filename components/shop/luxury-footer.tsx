"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Twitter, Github, Mail, Instagram, ArrowUp } from "lucide-react";
import { useRipple } from "@/hooks/use-ripple";

const footerLinks = {
  shop: [
    { label: "All Products", href: "/products" },
    { label: "eBooks", href: "/products?type=ebook" },
    { label: "Templates", href: "/products?type=template" },
    { label: "Bundles", href: "/products?type=bundle" },
  ],
  support: [
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
    { label: "License", href: "/license" },
    { label: "Refund Policy", href: "/refund" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "Github" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Mail, href: "mailto:hello@shopbot.com", label: "Email" },
];

export function LuxuryFooter() {
  const { createRipple } = useRipple();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group" onClick={scrollToTop}>
              <div className="w-12 h-12 bg-[var(--color-accent-primary)] rounded-xl flex items-center justify-center">
                <span className="text-[var(--color-bg-primary)] font-bold text-xl">S</span>
              </div>
              <span className="text-2xl font-semibold text-[var(--color-text-primary)]">
                ShopBot
              </span>
            </Link>
            <p className="text-[var(--color-text-tertiary)] max-w-sm mb-8 leading-relaxed">
              Premium digital products marketplace. Discover meticulously crafted 
              eBooks, templates, and tools for creators who demand excellence.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-xl flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-accent-primary)] hover:border-[var(--color-accent-primary)] transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-[var(--color-text-primary)] font-semibold mb-6">Shop</h3>
            <ul className="space-y-4">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={(e) => createRipple(e as any)}
                    className="text-[var(--color-text-tertiary)] hover:text-[var(--color-accent-primary)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[var(--color-text-primary)] font-semibold mb-6">Support</h3>
            <ul className="space-y-4">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={(e) => createRipple(e as any)}
                    className="text-[var(--color-text-tertiary)] hover:text-[var(--color-accent-primary)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[var(--color-text-primary)] font-semibold mb-6">Company</h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={(e) => createRipple(e as any)}
                    className="text-[var(--color-text-tertiary)] hover:text-[var(--color-accent-primary)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-16 p-8 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-2xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
                Stay in the loop
              </h3>
              <p className="text-[var(--color-text-tertiary)]">
                Get notified about new products and exclusive deals.
              </p>
            </div>
            <div className="flex w-full lg:w-auto gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 lg:w-64 px-5 py-3 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:border-[var(--color-accent-primary)] focus:outline-none transition-all"
              />
              <button
                onClick={(e) => createRipple(e)}
                className="px-6 py-3 bg-[var(--color-accent-primary)] text-[var(--color-bg-primary)] font-semibold rounded-xl hover:bg-[var(--color-accent-hover)] transition-all whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[var(--color-text-muted)] text-sm">
            © {new Date().getFullYear()} ShopBot. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            {/* Home Icon - Scroll to Top */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-[var(--color-text-tertiary)] hover:text-[var(--color-accent-primary)] transition-colors"
              aria-label="Back to top"
            >
              <Home className="w-4 h-4" />
              <span className="text-sm">Home</span>
            </motion.button>
            
            <Link
              href="/privacy"
              className="text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] text-sm transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] text-sm transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
