"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Twitter, Github, Mail, Instagram, ArrowUp } from "lucide-react";
import { Logo } from "@/components/ui/logo";
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
      {/* Add padding at bottom for mobile nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 pb-24 lg:pb-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2">
            <Logo size="lg" className="mb-6" />
            <p className="text-[var(--color-text-tertiary)] max-w-xs mb-6 leading-relaxed text-sm">
              Premium digital products marketplace. Discover meticulously crafted 
              eBooks, templates, and tools for creators who demand excellence.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2, scale: 1.05 }}
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
            <h3 className="text-[var(--color-text-primary)] font-semibold mb-4 text-sm uppercase tracking-wider">Shop</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={(e) => createRipple(e as any)}
                    className="text-[var(--color-text-tertiary)] hover:text-[var(--color-accent-primary)] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[var(--color-text-primary)] font-semibold mb-4 text-sm uppercase tracking-wider">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={(e) => createRipple(e as any)}
                    className="text-[var(--color-text-tertiary)] hover:text-[var(--color-accent-primary)] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[var(--color-text-primary)] font-semibold mb-4 text-sm uppercase tracking-wider">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={(e) => createRipple(e as any)}
                    className="text-[var(--color-text-tertiary)] hover:text-[var(--color-accent-primary)] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 p-6 lg:p-8 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-2xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-1">
                Stay in the loop
              </h3>
              <p className="text-[var(--color-text-tertiary)] text-sm">
                Get notified about new products and exclusive deals.
              </p>
            </div>
            <div className="flex w-full lg:w-auto gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 lg:w-64 px-4 py-3 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:border-[var(--color-accent-primary)] focus:outline-none transition-all text-sm"
              />
              <button
                onClick={(e) => createRipple(e)}
                className="px-6 py-3 bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] text-white font-semibold rounded-xl hover:opacity-90 transition-all whitespace-nowrap text-sm"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[var(--color-text-muted)] text-sm">
            © {new Date().getFullYear()} ShopBot. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            {/* Scroll to top link */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-[var(--color-text-tertiary)] hover:text-[var(--color-accent-primary)] transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
              <span className="text-sm">Back to top</span>
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
