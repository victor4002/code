"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag, Trash2, Tag, ArrowRight, Package } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { QuantitySelector } from "@/components/ui/quantity-selector";
import { useCartStore } from "@/lib/stores/cart-store";
import { useUIStore } from "@/lib/stores/ui-store";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    getSubtotal,
    getTotal,
    clearCart,
    discountCode,
    discountAmount,
  } = useCartStore();
  const { addToast } = useUIStore();

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-md mx-auto">
            <div className="w-24 h-24 rounded-full bg-[#1a1a1a] border border-white/[0.06] flex items-center justify-center mx-auto mb-6">
              <Package className="w-12 h-12 text-[#737373]" />
            </div>
            <h1 className="text-2xl font-bold text-[#f5f5f5] mb-3">
              Your cart is empty
            </h1>
            <p className="text-[#a3a3a3] mb-8">
              Looks like you haven&apos;t added anything to your cart yet. 
              Browse our products and find something you like!
            </p>
            <Link href="/products">
              <GradientButton size="lg">
                <ArrowLeft className="w-5 h-5" />
                Continue Shopping
              </GradientButton>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-[#f5f5f5] mb-2">Shopping Cart</h1>
          <p className="text-[#a3a3a3]">
            You have {items.length} {items.length === 1 ? "item" : "items"} in your cart
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-between"
            >
              <Link
                href="/products"
                className="text-[#a3a3a3] hover:text-[#f5f5f5] flex items-center gap-2 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Continue Shopping
              </Link>
              <button
                onClick={() => {
                  clearCart();
                  addToast({
                    title: "Cart cleared",
                    description: "All items have been removed from your cart.",
                    type: "info",
                  });
                }}
                className="text-[#ef4444] hover:text-[#ef4444]/80 text-sm flex items-center gap-1 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Clear Cart
              </button>
            </motion.div>

            {items.map((item, index) => (
              <motion.div
                key={item.product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Image */}
                    <div className="relative w-full sm:w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        src={item.product.preview_images[0] || "/placeholder-product.jpg"}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div>
                          <Link
                            href={`/products/${item.product.slug}`}
                            className="text-[#f5f5f5] font-semibold text-lg hover:text-[#6366f1] transition-colors line-clamp-1"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-[#737373] text-sm mt-1 capitalize">
                            {item.product.product_type}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-[#f5f5f5] font-bold text-lg">
                            {formatPrice(item.product.price * item.quantity)}
                          </p>
                          <p className="text-[#737373] text-sm">
                            {formatPrice(item.product.price)} each
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/[0.06]">
                        <QuantitySelector
                          value={item.quantity}
                          onChange={(qty) => updateQuantity(item.product.id, qty)}
                        />
                        <button
                          onClick={() => {
                            removeItem(item.product.id);
                            addToast({
                              title: "Item removed",
                              description: `${item.product.name} has been removed from your cart.`,
                              type: "info",
                            });
                          }}
                          className="p-2 text-[#737373] hover:text-[#ef4444] hover:bg-[#ef4444]/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GlassCard className="p-6 sticky top-24">
              <h2 className="text-xl font-bold text-[#f5f5f5] mb-6">Order Summary</h2>

              {/* Discount Code Input */}
              <div className="mb-6">
                <label className="text-[#a3a3a3] text-sm mb-2 block">Discount Code</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]" />
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="w-full pl-10 pr-4 py-2.5 bg-[#0a0a0a] border border-white/[0.06] rounded-xl text-[#f5f5f5] placeholder-[#737373] focus:outline-none focus:border-[#6366f1] transition-colors text-sm"
                    />
                  </div>
                  <GradientButton size="sm" variant="secondary">
                    Apply
                  </GradientButton>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#a3a3a3]">Subtotal</span>
                  <span className="text-[#f5f5f5]">{formatPrice(getSubtotal())}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#a3a3a3]">Discount</span>
                    <span className="text-[#10b981]">
                      -{formatPrice(getSubtotal() - getTotal())}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#a3a3a3]">Tax</span>
                  <span className="text-[#737373]">Calculated at checkout</span>
                </div>
                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-[#f5f5f5] font-semibold">Total</span>
                  <span className="text-[#f5f5f5] font-bold text-2xl">
                    {formatPrice(getTotal())}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link href="/checkout">
                <GradientButton className="w-full" size="lg">
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5" />
                </GradientButton>
              </Link>

              <p className="text-center text-[#737373] text-xs mt-4">
                Secure checkout powered by Stripe
              </p>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
