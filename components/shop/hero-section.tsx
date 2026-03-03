"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Download, Shield, Clock, Star, ShoppingBag } from "lucide-react";
import { GradientButton } from "@/components/ui/gradient-button";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: Download,
    title: "Instant Access",
    description: "Download your products immediately after purchase",
  },
  {
    icon: Shield,
    title: "Secure Purchase",
    description: "Your payments are protected with Stripe",
  },
  {
    icon: Clock,
    title: "Lifetime Access",
    description: "Buy once, keep forever. No subscriptions",
  },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects - Simplified for mobile performance */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Static gradient orbs - no animation on mobile */}
        <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-[#6366f1]/20 rounded-full blur-[150px] hidden lg:block" />
        <div className="absolute bottom-1/4 -right-40 w-[600px] h-[600px] bg-[#06b6d4]/15 rounded-full blur-[150px] hidden lg:block" />
        
        {/* Mobile-optimized animated orb */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#6366f1]/20 rounded-full blur-[120px] lg:hidden"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Simple Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a1a1a]/80 border border-white/[0.08] mb-6"
            >
              <ShoppingBag className="w-4 h-4 text-[#6366f1]" />
              <span className="text-[#a3a3a3] text-sm">
                Premium Digital Products Marketplace
              </span>
            </motion.div>

            {/* Headline - Clear Value Proposition */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#f5f5f5] leading-[1.15] mb-6"
            >
              Buy Digital Products{" "}
              <span className="gradient-text">That Work</span>
            </motion.h1>

            {/* Clear Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-[#a3a3a3] max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              ShopBot is your one-stop shop for eBooks, templates, and toolkits. 
              Browse curated digital products, pay securely, and download instantly. 
              No subscriptions, no waiting — just quality resources that help you work smarter.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 mb-10"
            >
              <Link href="/shop/products" className="w-full sm:w-auto">
                <GradientButton size="lg" className="w-full sm:w-auto group">
                  Browse Products
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </GradientButton>
              </Link>
              <Link href="/shop/categories" className="w-full sm:w-auto">
                <GradientButton
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  View Categories
                </GradientButton>
              </Link>
            </motion.div>

            {/* Social Proof - Simplified */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-6"
            >
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#f59e0b] fill-[#f59e0b]" />
                  ))}
                </div>
                <span className="text-[#a3a3a3] text-sm">
                  <span className="text-[#f5f5f5] font-semibold">4.9/5</span> from 2,000+ reviews
                </span>
              </div>

              {/* Divider */}
              <div className="hidden sm:block w-px h-5 bg-white/[0.1]" />

              {/* Customers */}
              <div className="text-[#a3a3a3] text-sm">
                <span className="text-[#f5f5f5] font-semibold">10,000+</span> happy customers
              </div>
            </motion.div>
          </div>

          {/* Right Content - Featured Card (Desktop Only) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <GlassCard className="relative p-5 overflow-hidden border-white/[0.08]">
                {/* Featured Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <Badge variant="gradient">Bestseller</Badge>
                </div>

                {/* Product Image */}
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-5">
                  <Image
                    src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80"
                    alt="Ultimate Notion Template"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent" />
                </div>

                {/* Product Info */}
                <div className="space-y-3">
                  <div>
                    <p className="text-[#6366f1] text-sm font-medium mb-1">Template</p>
                    <h3 className="text-[#f5f5f5] text-lg font-bold">
                      Ultimate Notion Template
                    </h3>
                    <p className="text-[#737373] text-sm mt-1">
                      Organize your life and work in one place
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-[#f5f5f5]">$49</span>
                      <span className="text-[#737373] line-through text-sm">$79</span>
                      <Badge variant="success" className="text-xs">Save 38%</Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-[#f59e0b] fill-[#f59e0b]" />
                      <span className="text-[#a3a3a3] text-sm">4.9</span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          </motion.div>
        </div>

        {/* Features Grid - Simpler on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16 lg:mt-20"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
            >
              <GlassCard className="p-5 text-center lg:text-left hover:border-white/[0.1] transition-colors">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#6366f1]/20 to-[#06b6d4]/20 flex items-center justify-center mx-auto lg:mx-0 mb-3">
                  <feature.icon className="w-5 h-5 text-[#6366f1]" />
                </div>
                <h3 className="text-[#f5f5f5] font-semibold mb-1">
                  {feature.title}
                </h3>
                <p className="text-[#737373] text-sm">{feature.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
