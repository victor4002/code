"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Heart, Star, ArrowUpRight, Loader2 } from "lucide-react";
import { Product } from "@/types";
import { useCartStore } from "@/lib/stores/cart-store";
import { useCurrencyStore } from "@/lib/stores/currency-store";
import { useUIStore } from "@/lib/stores/ui-store";
import { useRipple, useTouchRipple } from "@/hooks/use-ripple";

interface LuxuryProductCardProps {
  product: Product;
  index?: number;
}

export function LuxuryProductCard({ product, index = 0 }: LuxuryProductCardProps) {
  const { addItem, isInCart } = useCartStore();
  const { formatPrice } = useCurrencyStore();
  const { addToast } = useUIStore();
  const { createRipple } = useRipple();
  const { handleTouchStart } = useTouchRipple();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const inCart = isInCart(product.id);
  const discount = product.compare_at_price
    ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
    : null;

  const handleAddToCart = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    createRipple(e);
    
    if (inCart) {
      addToast({
        type: "info",
        title: "Already in cart",
        description: `${product.name} is already in your cart.`,
      });
      return;
    }

    setIsAddingToCart(true);
    
    // Simulate network delay for better UX
    await new Promise(resolve => setTimeout(resolve, 400));
    
    addItem(product);
    setIsAddingToCart(false);
    
    addToast({
      type: "success",
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      action: {
        label: "View Cart",
        onClick: () => useUIStore.getState().setCartOpen(true),
      },
    });
  };

  const handleLike = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    createRipple(e);
    setIsLiked(!isLiked);
    
    addToast({
      type: isLiked ? "info" : "success",
      title: isLiked ? "Removed from favorites" : "Added to favorites",
      description: `${product.name} has been ${isLiked ? "removed from" : "added to"} your favorites.`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        delay: index * 0.08, 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1] 
      }}
    >
      <Link href={`/products/${product.slug}`}>
        <article className="group luxury-card cursor-pointer h-full flex flex-col">
          {/* Image Container */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl bg-[var(--color-bg-tertiary)]">
            {/* Skeleton loader */}
            {!imageLoaded && (
              <div className="absolute inset-0 skeleton" />
            )}
            
            <Image
              src={product.image_url || "/images/placeholder.svg"}
              alt={product.name}
              fill
              className={`object-cover transition-transform duration-700 group-hover:scale-105 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            
            {/* Subtle gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Discount badge - Enhanced visibility */}
            {discount && (
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-[var(--color-accent-primary)] text-[var(--color-bg-primary)] text-xs font-bold rounded-lg shadow-md">
                -{discount}%
              </div>
            )}
            
            {/* Category badge */}
            <div className="absolute top-4 right-4 px-3 py-1.5 bg-[var(--color-bg-secondary)]/90 backdrop-blur-sm border border-[var(--color-border)] text-[var(--color-text-secondary)] text-xs font-medium rounded-lg">
              {product.category?.name || "Digital"}
            </div>

            {/* Quick actions - Enhanced hover experience */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
              {/* Like button */}
              <button
                onClick={handleLike}
                onTouchStart={handleTouchStart}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg ${
                  isLiked 
                    ? "bg-red-500 text-white border-red-500" 
                    : "bg-[var(--color-bg-secondary)]/90 backdrop-blur-sm border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-red-500 hover:border-red-500"
                }`}
                aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
              </button>
              
              {/* Add to cart button */}
              <button
                onClick={handleAddToCart}
                onTouchStart={handleTouchStart}
                disabled={isAddingToCart}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg disabled:cursor-not-allowed ${
                  inCart
                    ? "bg-[var(--color-success)] text-white"
                    : "bg-[var(--color-accent-primary)] text-[var(--color-bg-primary)] hover:bg-[var(--color-accent-hover)] hover:scale-105"
                }`}
                aria-label={inCart ? "In cart" : "Add to cart"}
              >
                {isAddingToCart ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <ShoppingBag className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Content - Improved spacing and hierarchy */}
          <div className="p-5 flex flex-col flex-grow">
            {/* Rating - Enhanced with better spacing */}
            <div className="flex items-center gap-1.5 mb-3">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(product.rating || 5)
                        ? "text-[var(--color-accent-primary)] fill-[var(--color-accent-primary)]"
                        : "text-[var(--color-border)]"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-[var(--color-text-muted)]">
                ({product.review_count || 0} reviews)
              </span>
            </div>

            {/* Title - Enhanced typography */}
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-accent-primary)] transition-colors duration-300 line-clamp-1">
              {product.name}
            </h3>

            {/* Description */}
            <p className="text-sm text-[var(--color-text-tertiary)] line-clamp-2 mb-4 flex-grow">
              {product.short_description}
            </p>

            {/* Price & CTA - Better visual hierarchy */}
            <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)] mt-auto">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-[var(--color-text-primary)]">
                  {formatPrice(product.price)}
                </span>
                {product.compare_at_price && (
                  <span className="text-sm text-[var(--color-text-muted)] line-through">
                    {formatPrice(product.compare_at_price)}
                  </span>
                )}
              </div>
              
              {/* View link - Enhanced hover state */}
              <div className="flex items-center gap-1 text-[var(--color-accent-primary)] text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                View
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

/* ============================================
   SKELETON PRODUCT CARD - Loading state
   ============================================ */

export function LuxuryProductCardSkeleton({ index = 0 }: { index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="luxury-card overflow-hidden"
    >
      {/* Image skeleton */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
        <div className="absolute inset-0 skeleton" />
      </div>

      {/* Content skeleton */}
      <div className="p-5 space-y-3">
        {/* Rating skeleton */}
        <div className="flex items-center gap-2">
          <div className="w-20 h-3 skeleton" />
          <div className="w-16 h-3 skeleton" />
        </div>

        {/* Title skeleton */}
        <div className="w-3/4 h-5 skeleton" />

        {/* Description skeleton */}
        <div className="space-y-2">
          <div className="w-full h-3 skeleton" />
          <div className="w-2/3 h-3 skeleton" />
        </div>

        {/* Price skeleton */}
        <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
          <div className="w-20 h-6 skeleton" />
          <div className="w-16 h-4 skeleton" />
        </div>
      </div>
    </motion.div>
  );
}
