"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag, Trash2, Tag, ArrowRight, Package, ImageOff } from "lucide-react";
import { useCartStore } from "@/lib/stores/cart-store";
import { useUIStore } from "@/lib/stores/ui-store";
import { useCurrencyStore } from "@/lib/stores/currency-store";

// Helper to get product image
function getProductImage(product: any): string {
  if (product.image_url && product.image_url.trim() !== '') {
    return product.image_url;
  }
  
  if (product.preview_images && product.preview_images.length > 0) {
    return product.preview_images[0];
  }
  
  const type = product.product_type || 'ebook';
  return `/images/placeholders/${type}.svg`;
}

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    getSubtotal,
    getTotal,
    clearCart,
    discountAmount,
  } = useCartStore();
  const { addToast } = useUIStore();
  const { formatPrice } = useCurrencyStore();

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-[var(--color-bg-primary)]">
        <div className="container-luxury">
          <div className="text-center max-w-md mx-auto">
            <div className="w-24 h-24 rounded-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] flex items-center justify-center mx-auto mb-6">
              <Package className="w-12 h-12 text-[var(--color-accent-primary)]" />
            </div>
            <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-3">
              Your cart is empty
            </h1>
            <p className="text-[var(--color-text-secondary)] mb-8">
              Looks like you haven&apos;t added anything to your cart yet. 
              Browse our products and find something you like!
            </p>
            <Link href="/products">
              <button className="px-8 py-4 bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] text-white font-semibold rounded-2xl hover:opacity-90 transition-all flex items-center gap-2 mx-auto">
                <ArrowLeft className="w-5 h-5" />
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-[var(--color-bg-primary)] min-h-screen">
      <div className="container-luxury">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">Shopping Cart</h1>
          <p className="text-[var(--color-text-secondary)]">
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
                className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] flex items-center gap-2 transition-colors"
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
                className="text-[var(--color-error)] hover:text-[var(--color-error)]/80 text-sm flex items-center gap-1 transition-colors"
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
                <div className="p-4 sm:p-6 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-2xl">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Image */}
                    <div className="relative w-full sm:w-32 h-32 rounded-xl overflow-hidden flex-shrink-0 bg-[var(--color-bg-tertiary)]">
                      <Image
                        src={getProductImage(item.product)}
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
                            className="text-[var(--color-text-primary)] font-semibold text-lg hover:text-[var(--color-accent-primary)] transition-colors line-clamp-1"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-[var(--color-text-muted)] text-sm mt-1 capitalize">
                            {item.product.product_type}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-[var(--color-text-primary)] font-bold text-lg">
                            {formatPrice(item.product.price * item.quantity)}
                          </p>
                          <p className="text-[var(--color-text-muted)] text-sm">
                            {formatPrice(item.product.price)} each
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-[var(--color-border)]">
                        {/* Quantity Selector */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                            className="w-8 h-8 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                          >
                            -
                          </button>
                          <span className="text-[var(--color-text-primary)] font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => {
                            removeItem(item.product.id);
                            addToast({
                              title: "Item removed",
                              description: `${item.product.name} has been removed from your cart.`,
                              type: "info",
                            });
                          }}
                          className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-error)] hover:bg-[var(--color-error)]/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="p-6 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-2xl sticky top-24">
              <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-6">Order Summary</h2>

              {/* Discount Code Input */}
              <div className="mb-6">
                <label className="text-[var(--color-text-secondary)] text-sm mb-2 block">Discount Code</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="w-full pl-10 pr-4 py-2.5 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent-primary)] transition-colors text-sm"
                    />
                  </div>
                  <button className="px-4 py-2.5 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] text-[var(--color-text-secondary)] rounded-xl hover:border-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary)] transition-all text-sm font-medium">
                    Apply
                  </button>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--color-text-secondary)]">Subtotal</span>
                  <span className="text-[var(--color-text-primary)]">{formatPrice(getSubtotal())}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[var(--color-text-secondary)]">Discount</span>
                    <span className="text-[var(--color-success)]">
                      -{formatPrice(discountAmount)}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--color-text-secondary)]">Tax</span>
                  <span className="text-[var(--color-text-muted)]">Calculated at checkout</span>
                </div>
                <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-between">
                  <span className="text-[var(--color-text-primary)] font-semibold">Total</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] font-bold text-2xl">
                    {formatPrice(getTotal())}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link href="/shop/checkout">
                <button className="w-full py-4 bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] text-white font-semibold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-2">
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>

              <p className="text-center text-[var(--color-text-muted)] text-xs mt-4">
                Secure checkout powered by Stripe
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
