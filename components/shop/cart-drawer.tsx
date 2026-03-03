"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2, ArrowRight, Package, Minus, Plus } from "lucide-react";
import { useCartStore } from "@/lib/stores/cart-store";
import { useUIStore } from "@/lib/stores/ui-store";
import { useCurrencyStore } from "@/lib/stores/currency-store";
import { useRipple } from "@/hooks/use-ripple";

export function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    getSubtotal,
    getTotal,
    discountAmount,
  } = useCartStore();
  const { isCartOpen, setCartOpen } = useUIStore();
  const { formatPrice } = useCurrencyStore();
  const { createRipple } = useRipple();

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCartOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [setCartOpen]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-[var(--color-bg-primary)]/80 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[var(--color-bg-secondary)] border-l border-[var(--color-border)] z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[var(--color-accent-primary)] rounded-xl flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-[var(--color-bg-primary)]" />
                </div>
                <div>
                  <h2 className="text-[var(--color-text-primary)] font-bold text-xl">
                    Your Cart
                  </h2>
                  <p className="text-[var(--color-text-tertiary)] text-sm">
                    {itemCount} {itemCount === 1 ? "item" : "items"}
                  </p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  createRipple(e);
                  setCartOpen(false);
                }}
                className="w-10 h-10 flex items-center justify-center rounded-xl text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)] transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="h-full flex flex-col items-center justify-center text-center"
                >
                  <div className="w-24 h-24 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-2xl flex items-center justify-center mb-6">
                    <Package className="w-12 h-12 text-[var(--color-text-muted)]" />
                  </div>
                  <h3 className="text-[var(--color-text-primary)] font-bold text-xl mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-[var(--color-text-tertiary)] mb-8 max-w-xs">
                    Discover amazing digital products and add them to your cart.
                  </p>
                  <button
                    onClick={(e) => {
                      createRipple(e);
                      setCartOpen(false);
                    }}
                    className="px-8 py-3 bg-[var(--color-accent-primary)] text-[var(--color-bg-primary)] font-semibold rounded-xl hover:bg-[var(--color-accent-hover)] transition-all"
                  >
                    Start Shopping
                  </button>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                      <motion.div
                        key={item.product.id}
                        layout
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="luxury-card p-4"
                      >
                        <div className="flex gap-4">
                          {/* Image */}
                          <Link
                            href={`/products/${item.product.slug}`}
                            onClick={() => setCartOpen(false)}
                            className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0"
                          >
                            <Image
                              src={item.product.image_url || "/images/placeholder.svg"}
                              alt={item.product.name}
                              fill
                              className="object-cover"
                            />
                          </Link>

                          {/* Details */}
                          <div className="flex-1 min-w-0">
                            <Link
                              href={`/products/${item.product.slug}`}
                              onClick={() => setCartOpen(false)}
                              className="text-[var(--color-text-primary)] font-medium hover:text-[var(--color-accent-primary)] transition-colors line-clamp-1"
                            >
                              {item.product.name}
                            </Link>
                            <p className="text-[var(--color-accent-primary)] font-bold mt-1">
                              {formatPrice(item.product.price)}
                            </p>

                            {/* Quantity Controls */}
                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={(e) => {
                                    createRipple(e);
                                    updateQuantity(item.product.id, item.quantity - 1);
                                  }}
                                  className="w-8 h-8 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-all"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="w-8 text-center text-[var(--color-text-primary)] font-medium">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={(e) => {
                                    createRipple(e);
                                    updateQuantity(item.product.id, item.quantity + 1);
                                  }}
                                  className="w-8 h-8 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-all"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <button
                                onClick={(e) => {
                                  createRipple(e);
                                  removeItem(item.product.id);
                                }}
                                className="p-2 text-[var(--color-text-tertiary)] hover:text-[var(--color-error)] hover:bg-[var(--color-error)]/10 rounded-lg transition-all"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
                {/* Summary */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[var(--color-text-tertiary)]">Subtotal</span>
                    <span className="text-[var(--color-text-primary)]">
                      {formatPrice(getSubtotal())}
                    </span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[var(--color-text-tertiary)]">Discount</span>
                      <span className="text-[var(--color-success)]">
                        -{formatPrice(getSubtotal() - getTotal())}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-3 border-t border-[var(--color-border)]">
                    <span className="text-[var(--color-text-primary)] font-semibold">Total</span>
                    <span className="text-2xl font-bold text-[var(--color-accent-primary)]">
                      {formatPrice(getTotal())}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link href="/checkout" onClick={() => setCartOpen(false)}>
                  <button
                    onClick={(e) => createRipple(e)}
                    className="w-full py-4 bg-[var(--color-accent-primary)] text-[var(--color-bg-primary)] font-semibold rounded-xl hover:bg-[var(--color-accent-hover)] transition-all flex items-center justify-center gap-2"
                  >
                    Checkout
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>

                <button
                  onClick={(e) => {
                    createRipple(e);
                    setCartOpen(false);
                  }}
                  className="w-full mt-3 text-center text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] text-sm transition-colors py-2"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
