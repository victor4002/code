"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play, Star, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { useCurrencyStore } from "@/lib/stores/currency-store";
import { useProducts } from "@/hooks/use-api";

export function LuxuryHero() {
  const { formatPrice } = useCurrencyStore();
  const { products, loading: isLoading } = useProducts({ featured: true, limit: 3 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Auto-rotate featured products
  useEffect(() => {
    if (products.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
      setImageLoaded(false);
    }, 6000);
    
    return () => clearInterval(timer);
  }, [products.length]);

  const featuredProduct = products[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
    setImageLoaded(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
    setImageLoaded(false);
  };

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
      {/* Background Pattern - Subtle grid */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-text-primary) 1px, transparent 0)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* Accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-accent-primary)]/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content - Enhanced typography hierarchy */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            {/* Badge - Premium styling */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-accent-subtle)] border border-[var(--color-border-accent)] rounded-full mb-6 lg:mb-8"
            >
              <Star className="w-3.5 h-3.5 text-[var(--color-accent-primary)] fill-[var(--color-accent-primary)]" />
              <span className="text-sm font-medium text-[var(--color-accent-primary)] tracking-wide">
                Premium Digital Marketplace
              </span>
            </motion.div>

            {/* Headline - Improved hierarchy with optimal line length */}
            <h1 className="display-large text-[var(--color-text-primary)] mb-6 lg:mb-8 mx-auto lg:mx-0">
              Crafted
              <span className="block text-[var(--color-accent-primary)] mt-1">
                Excellence
              </span>
            </h1>

            {/* Description - Optimal line length for readability */}
            <p className="text-lg text-[var(--color-text-secondary)] max-w-md mx-auto lg:mx-0 mb-8 lg:mb-10 leading-relaxed">
              Discover meticulously curated digital products designed for 
              creators who demand perfection. Premium templates, eBooks, and tools.
            </p>

            {/* CTAs - Better spacing and visual hierarchy */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center lg:justify-start mb-12 lg:mb-16">
              <Link href="/products">
                <LuxuryButton size="lg" className="w-full sm:w-auto min-w-[200px]">
                  Explore Collection
                  <ArrowRight className="w-4 h-4 ml-1" />
                </LuxuryButton>
              </Link>
              
              <Link href="#featured">
                <LuxuryButton variant="secondary" size="lg" className="w-full sm:w-auto">
                  <Play className="w-4 h-4 mr-1" />
                  Watch Preview
                </LuxuryButton>
              </Link>
            </div>

            {/* Stats - Enhanced with better spacing */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex items-center justify-center lg:justify-start gap-8 lg:gap-12 pt-6 lg:pt-8 border-t border-[var(--color-border)]"
            >
              {[
                { value: "50K+", label: "Downloads" },
                { value: "4.9", label: "Rating" },
                { value: "100+", label: "Products" },
              ].map((stat, index) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-2xl lg:text-3xl font-bold text-[var(--color-text-primary)] tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs lg:text-sm text-[var(--color-text-tertiary)] mt-1 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Featured Product Image - Enhanced presentation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative aspect-square max-w-lg mx-auto lg:max-w-none">
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-[var(--color-accent-primary)]/5 blur-[100px] rounded-full scale-75" />
              
              {/* Main image container */}
              <div className="relative luxury-card overflow-hidden group cursor-pointer bg-[var(--color-bg-secondary)]">
                {isLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-[var(--color-accent-primary)] animate-spin" />
                  </div>
                ) : (
                  <>
                    {/* Skeleton loader */}
                    {!imageLoaded && (
                      <div className="absolute inset-0 skeleton" />
                    )}
                    
                    <Image
                      src={featuredProduct?.image_url || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80"}
                      alt={featuredProduct?.name || "Featured Product"}
                      fill
                      className={`object-cover transition-all duration-700 group-hover:scale-105 ${
                        imageLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                      onLoad={() => setImageLoaded(true)}
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-transparent to-transparent opacity-40" />
                    
                    {/* Navigation arrows - For product carousel */}
                    {products.length > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handlePrev();
                          }}
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--color-bg-secondary)]/80 backdrop-blur-sm border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-accent-primary)] transition-all opacity-0 group-hover:opacity-100"
                          aria-label="Previous product"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleNext();
                          }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--color-bg-secondary)]/80 backdrop-blur-sm border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-accent-primary)] transition-all opacity-0 group-hover:opacity-100"
                          aria-label="Next product"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}
                    
                    {/* Product info overlay - Enhanced card design */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-[var(--color-bg-secondary)]/95 backdrop-blur-xl border border-[var(--color-border)] rounded-2xl p-5 shadow-xl"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold text-[var(--color-accent-primary)] uppercase tracking-wider mb-1">
                              Featured Product
                            </p>
                            <h3 className="text-base lg:text-lg font-semibold text-[var(--color-text-primary)] truncate">
                              {featuredProduct?.name || "Ultimate Design System"}
                            </h3>
                            <p className="text-sm text-[var(--color-text-tertiary)] truncate">
                              {featuredProduct?.short_description || "Premium templates & components"}
                            </p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-xl lg:text-2xl font-bold text-[var(--color-accent-primary)]">
                              {featuredProduct ? formatPrice(featuredProduct.price) : "$49"}
                            </p>
                            <div className="flex items-center gap-0.5 mt-1 justify-end">
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
                  </>
                )}
              </div>
              
              {/* Carousel indicators */}
              {products.length > 1 && (
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                  {products.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentIndex(index);
                        setImageLoaded(false);
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        currentIndex === index
                          ? "w-8 bg-[var(--color-accent-primary)]"
                          : "w-1.5 bg-[var(--color-border)] hover:bg-[var(--color-text-muted)]"
                      }`}
                      aria-label={`Go to product ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
