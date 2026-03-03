"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart, Eye, Star, Check, Zap } from "lucide-react";
import { TiltCard } from "@/components/effects/tilt-card";
import { Product } from "@/types";
import { useCartStore } from "@/lib/stores/cart-store";
import { useUIStore } from "@/lib/stores/ui-store";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";

interface ProductCardEnhancedProps {
  product: Product;
  index?: number;
}

export function ProductCardEnhanced({ product, index = 0 }: ProductCardEnhancedProps) {
  const { addItem, isInCart } = useCartStore();
  const { setQuickViewProduct, addToast, setCartOpen } = useUIStore();
  const [isAdding, setIsAdding] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const inCart = isInCart(product.id);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inCart) {
      setCartOpen(true);
      return;
    }

    setIsAdding(true);
    
    // Simulate brief delay for better UX
    await new Promise(resolve => setTimeout(resolve, 300));
    
    addItem(product);
    setIsAdding(false);
    
    addToast({
      type: "cart",
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
      action: {
        label: "View Cart",
        onClick: () => setCartOpen(true),
      },
    });
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product.id);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    
    if (!isLiked) {
      addToast({
        type: "success",
        title: "Added to wishlist",
        description: `${product.name} has been saved for later.`,
      });
    }
  };

  const discount = product.compare_at_price
    ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <TiltCard className="h-full" tiltAmount={6}>
        <div className="glass-card h-full flex flex-col group">
          {/* Image Container */}
          <Link href={`/products/${product.slug}`} className="relative aspect-[4/3] overflow-hidden rounded-t-[inherit] block">
            <Image
              src={product.image_url || "/images/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-60" />
            
            {/* Quick actions */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-2 group-hover:translate-x-0">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleLike}
                className={`w-9 h-9 rounded-xl backdrop-blur-sm border flex items-center justify-center transition-all ${
                  isLiked 
                    ? "bg-[#ff00ff]/20 border-[#ff00ff]/50 text-[#ff00ff]" 
                    : "bg-[#050508]/80 border-white/10 text-white/70 hover:text-[#ff00ff]"
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleQuickView}
                className="w-9 h-9 rounded-xl bg-[#050508]/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-[#00f5ff] hover:border-[#00f5ff]/30 transition-all"
              >
                <Eye className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Discount badge */}
            {discount && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-3 left-3 px-2 py-1 rounded-md bg-gradient-to-r from-[#ff00ff] to-[#b829dd] text-black text-xs font-bold"
              >
                -{discount}%
              </motion.div>
            )}

            {/* Category badge */}
            <div className="absolute bottom-3 left-3">
              <span className="px-2 py-1 rounded-md bg-[#050508]/80 backdrop-blur-sm text-[#00f5ff] text-xs">
                {product.category?.name}
              </span>
            </div>

            {/* Add to cart overlay on hover */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                disabled={isAdding}
                className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all ${
                  inCart
                    ? "bg-[#10b981] text-white"
                    : "bg-gradient-to-r from-[#00f5ff] to-[#b829dd] text-black"
                }`}
              >
                {isAdding ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                  />
                ) : inCart ? (
                  <>
                    <Check className="w-5 h-5" />
                    In Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Quick Add
                  </>
                )}
              </motion.button>
            </motion.div>
          </Link>

          {/* Content */}
          <div className="p-5 flex-1 flex flex-col">
            <Link href={`/products/${product.slug}`}>
              <h3 className="text-white font-semibold text-lg mb-2 line-clamp-1 group-hover:text-[#00f5ff] transition-colors">
                {product.name}
              </h3>
            </Link>
            <p className="text-[#606070] text-sm mb-4 line-clamp-2 flex-1">
              {product.short_description}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating || 0)
                      ? "text-[#00f5ff] fill-[#00f5ff]"
                      : "text-[#606070]"
                  }`}
                />
              ))}
              <span className="text-[#606070] text-xs ml-1">
                ({product.review_count || 0})
              </span>
              {product.sales_count && product.sales_count > 50 && (
                <>
                  <span className="text-[#606070] mx-1">•</span>
                  <Zap className="w-3 h-3 text-[#ff00ff]" />
                  <span className="text-[#ff00ff] text-xs">Hot</span>
                </>
              )}
            </div>

            {/* Price & CTA */}
            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-white">
                  {formatPrice(product.price)}
                </span>
                {product.compare_at_price && (
                  <span className="text-[#606070] text-sm line-through">
                    {formatPrice(product.compare_at_price)}
                  </span>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                disabled={isAdding}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  inCart
                    ? "bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30"
                    : "bg-gradient-to-r from-[#00f5ff]/20 to-[#b829dd]/20 border border-[#00f5ff]/30 text-[#00f5ff] hover:from-[#00f5ff]/30 hover:to-[#b829dd]/30"
                }`}
              >
                {isAdding ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                  />
                ) : inCart ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <ShoppingCart className="w-4 h-4" />
                )}
                {inCart ? "Added" : "Add"}
              </motion.button>
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}
