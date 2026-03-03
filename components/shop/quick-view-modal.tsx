"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Star, 
  Download,
  Check,
  ArrowRight
} from "lucide-react";
import { useUIStore } from "@/lib/stores/ui-store";
import { useCartStore } from "@/lib/stores/cart-store";
import { useProducts } from "@/hooks/use-api";
import { MagneticButton } from "@/components/effects/magnetic-button";
import { TiltCard } from "@/components/effects/tilt-card";
import { formatPrice } from "@/lib/utils";

export function QuickViewModal() {
  const { quickViewProductId, setQuickViewProduct } = useUIStore();
  const { addItem } = useCartStore();
  const { products } = useProducts({ limit: 100 });

  const product = products.find(p => p.id === quickViewProductId);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setQuickViewProduct(null);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [setQuickViewProduct]);

  // Prevent body scroll when open
  useEffect(() => {
    if (quickViewProductId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [quickViewProductId]);

  if (!product) return null;

  const discount = product.compare_at_price
    ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
    : null;

  const handleAddToCart = () => {
    addItem(product);
    setQuickViewProduct(null);
  };

  return (
    <AnimatePresence>
      {quickViewProductId && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setQuickViewProduct(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl md:max-h-[90vh] z-50 overflow-hidden"
          >
            <div className="glass-card h-full overflow-hidden flex flex-col md:flex-row">
              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-xl bg-[#050508]/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-[#606070] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>

              {/* Image Section */}
              <div className="relative w-full md:w-1/2 aspect-square md:aspect-auto">
                <Image
                  src={product.image_url || "/images/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent md:bg-gradient-to-r" />
                
                {/* Discount badge */}
                {discount && (
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#ff00ff] to-[#b829dd] text-black font-bold text-sm">
                    -{discount}%
                  </div>
                )}

                {/* Category badge */}
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1.5 rounded-lg bg-[#050508]/80 backdrop-blur-sm border border-white/10 text-[#00f5ff] text-sm font-medium">
                    {product.category?.name}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="flex-1 p-6 md:p-8 overflow-y-auto">
                {/* Header */}
                <div className="mb-6">
                  <motion.h2 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl md:text-3xl font-bold text-white mb-3"
                  >
                    {product.name}
                  </motion.h2>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating || 0)
                              ? "text-[#00f5ff] fill-[#00f5ff]"
                              : "text-[#606070]"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[#606070] text-sm">
                      ({product.review_count || 0} reviews)
                    </span>
                    <span className="text-[#606070]">•</span>
                    <span className="text-[#00f5ff] text-sm">
                      {product.sales_count || 0}+ sold
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-3xl md:text-4xl font-bold gradient-text">
                    {formatPrice(product.price)}
                  </span>
                  {product.compare_at_price && (
                    <span className="text-xl text-[#606070] line-through">
                      {formatPrice(product.compare_at_price)}
                    </span>
                  )}
                  {discount && (
                    <span className="px-2 py-1 rounded bg-[#ff00ff]/10 text-[#ff00ff] text-sm font-medium">
                      Save {formatPrice(product.compare_at_price! - product.price)}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-[#a0a0b0] leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {[
                    "Instant digital download",
                    "Lifetime access",
                    "Free updates included",
                    "24/7 customer support",
                  ].map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#00f5ff]/20 to-[#b829dd]/20 flex items-center justify-center">
                        <Check className="w-3 h-3 text-[#00f5ff]" />
                      </div>
                      <span className="text-[#a0a0b0] text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <MagneticButton 
                    onClick={handleAddToCart}
                    className="flex-1 justify-center"
                  >
                    <span className="flex items-center gap-2">
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </span>
                  </MagneticButton>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-4 rounded-xl bg-white/[0.05] border border-white/10 text-white font-semibold hover:bg-white/10 hover:border-[#ff00ff]/30 transition-all flex items-center justify-center gap-2"
                  >
                    <Heart className="w-5 h-5" />
                    Wishlist
                  </motion.button>
                </div>

                {/* View full details */}
                <Link 
                  href={`/products/${product.slug}`}
                  onClick={() => setQuickViewProduct(null)}
                >
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-center gap-2 text-[#00f5ff] hover:text-[#ff00ff] transition-colors"
                  >
                    <span className="font-medium">View full details</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </Link>

                {/* Tags */}
                {product.tags && product.tags.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-white/[0.06]">
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full bg-white/[0.05] text-[#606070] text-xs hover:text-[#00f5ff] hover:bg-[#00f5ff]/10 transition-colors cursor-pointer"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
