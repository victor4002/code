"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Zap,
  Crown,
  Star,
  ChevronRight,
  Download,
  Shield,
  Clock,
  TrendingUp,
  Package,
  Heart,
  Eye,
  Loader2,
} from "lucide-react";
import { useProducts, useCategories } from "@/hooks/use-api";
import { useCartStore } from "@/lib/stores/cart-store";
import { useCurrencyStore } from "@/lib/stores/currency-store";
import { useUIStore } from "@/lib/stores/ui-store";
import { useRipple, RippleButton } from "@/hooks/use-ripple";
import { LuxuryProductCard, LuxuryProductCardSkeleton } from "@/components/shop/luxury-product-card";
import { Logo } from "@/components/ui/logo";

// Counter Animation Component
function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const spring = useSpring(0, { duration: 2000 });
  const display = useTransform(spring, (current) =>
    Math.floor(current).toLocaleString()
  );

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  return (
    <span ref={ref}>
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}

// Luxury Badge Component
function LuxuryBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--color-accent-subtle)] text-[var(--color-accent-primary)] text-xs font-bold uppercase tracking-wider rounded-full">
      <Crown className="w-3 h-3" />
      {children}
    </span>
  );
}

// Hero Section with API Data
function HeroSection() {
  const { products, loading } = useProducts({ featured: true, limit: 4 });
  const { formatPrice } = useCurrencyStore();
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Auto-rotate hero products
  useEffect(() => {
    if (products.length <= 1) return;
    
    const timer = setInterval(() => {
      setActiveHeroIndex((prev) => (prev + 1) % products.length);
      setImageLoaded(false);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [products.length]);

  const heroProducts = products.slice(0, 4);
  const activeProduct = heroProducts[activeHeroIndex];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--color-bg-primary)]">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(var(--color-text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-text-primary) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[var(--color-accent-primary)]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[var(--color-accent-secondary)]/5 rounded-full blur-[100px]" />
      </div>

      <div className="container-luxury relative z-10 pt-16 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <LuxuryBadge>Premium Digital Products</LuxuryBadge>

            <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text-primary)] leading-[1.1]">
              Discover
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)]">
                Excellence
              </span>
            </h1>

            <p className="mt-6 text-lg text-[var(--color-text-secondary)] max-w-lg leading-relaxed">
              Curated digital products for creators who demand the extraordinary.
              Templates, eBooks, and tools crafted with precision.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-10">
              {[
                { value: 500, suffix: "+", label: "Products" },
                { value: 50000, suffix: "+", label: "Customers" },
                { value: 99, suffix: "%", label: "Satisfaction" },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl font-bold text-[var(--color-text-primary)]">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-[var(--color-text-muted)] mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mt-10">
              <Link href="/products">
                <RippleButton className="px-8 py-4 bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] text-white font-semibold rounded-2xl hover:opacity-90 transition-all flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Explore Products
                </RippleButton>
              </Link>
              <Link href="#categories">
                <button className="px-8 py-4 border border-[var(--color-border)] text-[var(--color-text-primary)] font-semibold rounded-2xl hover:border-[var(--color-accent-primary)] hover:bg-[var(--color-accent-subtle)] transition-all flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Browse Categories
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Hero Product Gallery */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {loading ? (
                <div className="absolute inset-0 luxury-card flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-[var(--color-accent-primary)] animate-spin" />
                </div>
              ) : (
                <>
                  {/* Main Product Display */}
                  {heroProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={false}
                      animate={{
                        opacity: activeHeroIndex === index ? 1 : 0,
                        scale: activeHeroIndex === index ? 1 : 0.95,
                        zIndex: activeHeroIndex === index ? 10 : 0,
                      }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0"
                    >
                      <Link href={`/products/${product.slug}`}>
                        <div className="relative w-full h-full rounded-3xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
                          {!imageLoaded && activeHeroIndex === index && (
                            <div className="absolute inset-0 skeleton" />
                          )}
                          <Image
                            src={product.image_url || "/images/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover"
                            priority={index === 0}
                            onLoad={() => setImageLoaded(true)}
                          />
                          {/* Overlay Info */}
                          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[var(--color-bg-primary)] via-[var(--color-bg-primary)]/80 to-transparent">
                            <p className="text-[var(--color-accent-primary)] text-sm font-bold uppercase tracking-wider mb-1">
                              {product.category?.name}
                            </p>
                            <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">
                              {product.name}
                            </h3>
                            <p className="text-2xl font-bold text-[var(--color-text-primary)]">
                              {formatPrice(product.price)}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}

                  {/* Navigation Dots */}
                  {heroProducts.length > 1 && (
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
                      {heroProducts.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setActiveHeroIndex(index);
                            setImageLoaded(false);
                          }}
                          className={`h-2 rounded-full transition-all ${
                            activeHeroIndex === index
                              ? "w-8 bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)]"
                              : "w-2 bg-[var(--color-border)] hover:bg-[var(--color-text-muted)]"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-24 lg:bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-[var(--color-border)] rounded-full flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-[var(--color-accent-primary)] rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}

// Categories Section with API Data
function CategoriesSection() {
  const { categories, loading } = useCategories();
  const { products } = useProducts({});

  const getProductCount = (categoryName: string) => {
    return products.filter((p) => p.category?.name === categoryName).length;
  };

  return (
    <section id="categories" className="py-24 border-t border-[var(--color-border)]">
      <div className="container-luxury">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <LuxuryBadge>Categories</LuxuryBadge>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)]">
            Browse by Category
          </h2>
          <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
            Explore our curated collection of premium digital products
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 luxury-card skeleton" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={`/products?category=${encodeURIComponent(category.name)}`}
                  className="group block p-6 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-2xl hover:border-[var(--color-accent-primary)]/50 hover:bg-[var(--color-accent-subtle)] transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] flex items-center justify-center mb-4 group-hover:bg-gradient-to-r group-hover:from-[var(--color-accent-primary)] group-hover:to-[var(--color-accent-secondary)] group-hover:text-white transition-all">
                    <Package className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-[var(--color-text-primary)]">
                    {category.name}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)] mt-1">
                    {getProductCount(category.name)} products
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// Bestsellers Section with API Data
function BestsellersSection() {
  const { products, loading } = useProducts({});
  
  // Filter bestsellers from API data
  const bestsellers = useMemo(() => {
    return products.filter((p) => p.tags?.includes("bestseller")).slice(0, 4);
  }, [products]);

  return (
    <section className="py-24 border-t border-[var(--color-border)]">
      <div className="container-luxury">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <LuxuryBadge>Most Popular</LuxuryBadge>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-[var(--color-text-primary)]">
              Bestsellers
            </h2>
            <p className="mt-2 text-lg text-[var(--color-text-secondary)]">
              Our most loved products by customers worldwide
            </p>
          </div>
          <Link
            href="/products"
            className="text-[var(--color-accent-primary)] hover:text-[var(--color-accent-hover)] transition-colors flex items-center gap-2 font-medium"
          >
            View All Products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid-responsive">
            {[...Array(4)].map((_, i) => (
              <LuxuryProductCardSkeleton key={i} index={i} />
            ))}
          </div>
        ) : bestsellers.length > 0 ? (
          <div className="grid-responsive">
            {bestsellers.map((product, index) => (
              <LuxuryProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-[var(--color-text-muted)]">No bestsellers found</p>
          </div>
        )}
      </div>
    </section>
  );
}

// All Products Section with API Data
function AllProductsSection() {
  const { products, loading } = useProducts({});
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const { categories } = useCategories();

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") return products;
    return products.filter((p) => p.category?.name === activeCategory);
  }, [products, activeCategory]);

  const allCategories = ["All", ...categories.map((c) => c.name)];

  return (
    <section id="products" className="py-24 border-t border-[var(--color-border)]">
      <div className="container-luxury">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <LuxuryBadge>All Products</LuxuryBadge>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-[var(--color-text-primary)]">
              Browse Collection
            </h2>
            <p className="mt-2 text-lg text-[var(--color-text-secondary)]">
              Discover our complete collection of premium digital products
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {allCategories.slice(0, 6).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] text-white"
                    : "bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent-primary)]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid-responsive">
            {[...Array(8)].map((_, i) => (
              <LuxuryProductCardSkeleton key={i} index={i} />
            ))}
          </div>
        ) : (
          <>
            <motion.div layout className="grid-responsive">
              {filteredProducts.map((product, index) => (
                <LuxuryProductCard key={product.id} product={product} index={index} />
              ))}
            </motion.div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] flex items-center justify-center">
                  <Package className="w-10 h-10 text-[var(--color-text-muted)]" />
                </div>
                <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">
                  No products found
                </h3>
                <p className="text-[var(--color-text-secondary)]">
                  Try selecting a different category
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

// Features Section
function FeaturesSection() {
  const features = [
    {
      icon: Download,
      title: "Instant Access",
      description: "Download your products immediately after purchase",
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Your transactions are protected with encryption",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Our team is always here to help you",
    },
    {
      icon: TrendingUp,
      title: "Regular Updates",
      description: "Get free updates for all your purchases",
    },
  ];

  return (
    <section className="py-24 border-t border-[var(--color-border)]">
      <div className="container-luxury">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <LuxuryBadge>Why Choose Us</LuxuryBadge>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-[var(--color-text-primary)]">
            The ShopBot Difference
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-3xl hover:border-[var(--color-accent-primary)]/30 transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] flex items-center justify-center mb-6 group-hover:bg-gradient-to-r group-hover:from-[var(--color-accent-primary)] group-hover:to-[var(--color-accent-secondary)] group-hover:text-white transition-all">
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-3">
                {feature.title}
              </h3>
              <p className="text-[var(--color-text-secondary)]">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Main Home Page
export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <HeroSection />
      <CategoriesSection />
      <BestsellersSection />
      <AllProductsSection />
      <FeaturesSection />
    </main>
  );
}
