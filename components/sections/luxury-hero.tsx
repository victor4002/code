"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play, Star } from "lucide-react";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { useCurrencyStore } from "@/lib/stores/currency-store";
import { useProducts } from "@/hooks/use-api";

export function LuxuryHero() {
  const { formatPrice } = useCurrencyStore();
  const { products } = useProducts({ featured: true, limit: 1 });
  const featuredProduct = products[0];

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-text-primary) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-accent-subtle)] border border-[var(--color-border-accent)] rounded-full mb-8"
            >
              <Star className="w-4 h-4 text-[var(--color-accent-primary)] fill-[var(--color-accent-primary)]" />
              <span className="text-sm font-medium text-[var(--color-accent-primary)]">
                Premium Digital Marketplace
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="display-large text-[var(--color-text-primary)] mb-6 text-balance">
              Crafted Digital
              <span className="block text-[var(--color-accent-primary)]">
                Excellence
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-[var(--color-text-secondary)] max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
              Discover meticulously curated digital products designed for 
              creators who demand perfection. From premium templates to 
              exclusive tools.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link href="/products">
                <LuxuryButton size="lg">
                  Explore Collection
                  <ArrowRight className="w-5 h-5" />
                </LuxuryButton>
              </Link>
              
              <Link href="#featured">
                <LuxuryButton variant="secondary" size="lg">
                  <Play className="w-5 h-5" />
                  Watch Preview
                </LuxuryButton>
              </Link>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex items-center justify-center lg:justify-start gap-8 mt-16 pt-8 border-t border-[var(--color-border)]"
            >
              {[
                { value: "50K+", label: "Downloads" },
                { value: "4.9", label: "Rating" },
                { value: "100+", label: "Products" },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)]">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[var(--color-text-tertiary)]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Featured Product Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <Link href={featuredProduct ? `/products/${featuredProduct.slug}` : "/products"}>
              <div className="relative aspect-square max-w-lg mx-auto lg:max-w-none">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-[var(--color-accent-primary)] opacity-10 blur-[100px] rounded-full" />
                
                {/* Main image container */}
                <div className="relative luxury-card overflow-hidden group cursor-pointer">
                  <Image
                    src={featuredProduct?.image_url || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80"}
                    alt={featuredProduct?.name || "Featured Product"}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-transparent to-transparent opacity-60" />
                  
                  {/* Product info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                      className="bg-[var(--color-bg-secondary)]/90 backdrop-blur-xl border border-[var(--color-border)] rounded-2xl p-5"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-xs font-medium text-[var(--color-accent-primary)] uppercase tracking-wider mb-1">
                            Featured Product
                          </p>
                          <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                            {featuredProduct?.name || "Ultimate Design System"}
                          </h3>
                          <p className="text-sm text-[var(--color-text-tertiary)]">
                            {featuredProduct?.short_description || "Premium templates & components"}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-[var(--color-accent-primary)]">
                            {featuredProduct ? formatPrice(featuredProduct.price) : "$49"}
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className="w-3 h-3 text-[var(--color-accent-primary)] fill-[var(--color-accent-primary)]" 
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
