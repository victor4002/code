"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Heart, Star, ArrowUpRight } from "lucide-react";
import { Product } from "@/lib/products";
import { useCartStore } from "@/lib/stores/cart-store";
import { useCurrencyStore } from "@/lib/stores/currency-store";
import { useUIStore } from "@/lib/stores/ui-store";
import { useRipple } from "@/hooks/use-ripple";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem, isInCart } = useCartStore();
  const { formatPrice } = useCurrencyStore();
  const { addToast } = useUIStore();
  const { createRipple } = useRipple();

  const inCart = isInCart(product.id);
  const discount = product.compare_at_price
    ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
    : null;

  const handleAddToCart = (e: React.MouseEvent<HTMLElement>) => {
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

    addItem(product);
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link href={`/products/${product.slug}`}>
        <div className="group luxury-card cursor-pointer overflow-hidden">
          {/* Image Container */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={product.image_url || "/images/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-transparent to-transparent opacity-40" />

            {/* Discount badge */}
            {discount && (
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-[var(--color-accent-primary)] text-[var(--color-bg-primary)] text-xs font-bold rounded-lg">
                -{discount}%
              </div>
            )}

            {/* Category badge */}
            <div className="absolute top-4 right-4 px-3 py-1.5 bg-[var(--color-bg-secondary)]/80 backdrop-blur-sm border border-[var(--color-border)] text-[var(--color-text-secondary)] text-xs font-medium rounded-lg">
              {product.category?.name || "Digital"}
            </div>

            {/* Quick actions - appear on hover */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                className="w-10 h-10 bg-[var(--color-bg-secondary)]/90 backdrop-blur-sm border border-[var(--color-border)] rounded-full flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] hover:border-[var(--color-accent-primary)] transition-all"
              >
                <Heart className="w-4 h-4" />
              </button>
              <button
                onClick={handleAddToCart}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  inCart
                    ? "bg-[var(--color-success)] text-white"
                    : "bg-[var(--color-accent-primary)] text-[var(--color-bg-primary)] hover:bg-[var(--color-accent-hover)]"
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Rating */}
            <div className="flex items-center gap-1 mb-3">
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
              <span className="text-xs text-[var(--color-text-muted)] ml-1">
                ({product.review_count || 0})
              </span>
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-accent-primary)] transition-colors line-clamp-1">
              {product.name}
            </h3>

            {/* Description */}
            <p className="text-sm text-[var(--color-text-tertiary)] line-clamp-2 mb-4">
              {product.short_description || product.description.substring(0, 80) + "..."}
            </p>

            {/* Price & CTA */}
            <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
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

              <div className="flex items-center gap-1 text-[var(--color-accent-primary)] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                View
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
