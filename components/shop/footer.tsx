"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Twitter, Github, Mail, Instagram, Hexagon, Heart } from "lucide-react";
import { ScrollReveal } from "@/components/effects/scroll-reveal";

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

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-[#050508]">
      {/* Glow effect at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#00f5ff]/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-12">
          {/* Brand */}
          <ScrollReveal direction="up" className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <motion.div 
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00f5ff] to-[#b829dd] flex items-center justify-center overflow-hidden"
              >
                <Hexagon className="w-7 h-7 text-black fill-black" />
              </motion.div>
              <span className="text-white font-bold text-2xl">
                Shop<span className="gradient-text">Bot</span>
              </span>
            </Link>
            <p className="text-[#606070] text-sm max-w-xs mb-8 leading-relaxed">
              Premium digital products marketplace. Discover eBooks, templates, and tools to elevate your creative workflow.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl bg-[#111118] border border-white/[0.06] flex items-center justify-center text-[#606070] hover:text-[#00f5ff] hover:border-[#00f5ff]/30 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </ScrollReveal>

          {/* Links */}
          <ScrollReveal direction="up" delay={0.1}>
            <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00f5ff]" />
              Shop
            </h3>
            <ul className="space-y-4">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#606070] hover:text-[#00f5ff] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ff00ff]" />
              Support
            </h3>
            <ul className="space-y-4">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#606070] hover:text-[#ff00ff] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3}>
            <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#b829dd]" />
              Company
            </h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#606070] hover:text-[#b829dd] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>

        {/* Newsletter */}
        <ScrollReveal delay={0.4}>
          <div className="mt-16 p-8 glass-card">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-white font-semibold text-lg mb-2">
                  Stay in the loop
                </h4>
                <p className="text-[#606070] text-sm">
                  Get notified about new products and exclusive deals.
                </p>
              </div>
              <div className="flex w-full lg:w-auto gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 lg:w-64 px-5 py-3 rounded-xl bg-[#050508] border border-white/10 text-white placeholder-[#606070] focus:border-[#00f5ff]/50 focus:outline-none transition-colors"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00f5ff] to-[#b829dd] text-black font-semibold hover:shadow-[0_0_30px_rgba(0,245,255,0.3)] transition-shadow whitespace-nowrap"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#606070] text-sm flex items-center gap-1">
            © {new Date().getFullYear()} ShopBot. Made with 
            <Heart className="w-3 h-3 text-[#ff00ff] fill-[#ff00ff]" />
            for creators
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-[#606070] hover:text-[#a0a0b0] text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-[#606070] hover:text-[#a0a0b0] text-sm transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
