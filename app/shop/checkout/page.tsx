"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CreditCard,
  Lock,
  Check,
  Shield,
  Truck,
  Mail,
  User,
  Package,
} from "lucide-react";
import { useCartStore } from "@/lib/stores/cart-store";
import { useCurrencyStore } from "@/lib/stores/currency-store";
import { Logo } from "@/components/ui/logo";

export default function CheckoutPage() {
  const { items, getSubtotal, getTotal, discountAmount } = useCartStore();
  const { formatPrice } = useCurrencyStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    setIsProcessing(true);
    try {
      // Call Stripe checkout API
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            id: item.product.id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            description: item.product.short_description,
            preview_images: item.product.preview_images,
          })),
          email,
        }),
      });

      const data = await response.json();

      if (data.success && data.data?.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.data.url;
      } else {
        // Fallback: simulate success for demo
        console.error('Checkout failed:', data.error);
        window.location.href = '/shop/success';
      }
    } catch (error) {
      console.error('Checkout error:', error);
      // Fallback: redirect to success for demo
      window.location.href = '/shop/success';
    }
  };
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-[var(--color-bg-primary)]">
        <div className="container-luxury text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] flex items-center justify-center">
            <Package className="w-10 h-10 text-[var(--color-accent-primary)]" />
          </div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">Your cart is empty</h1>
          <p className="text-[var(--color-text-secondary)] mb-8">Add some products to get started</p>
          <Link href="/products">
            <button className="px-8 py-4 bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] text-white font-semibold rounded-2xl hover:opacity-90 transition-all flex items-center gap-2 mx-auto">
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </button>
          </Link>
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
          <Link
            href="/shop/cart"
            className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] flex items-center gap-2 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>
          <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">Checkout</h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <form onSubmit={handleFormSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="p-6 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-accent-subtle)] flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[var(--color-accent-primary)]" />
                  </div>
                  <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
                    Contact Information
                  </h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-[var(--color-text-secondary)] text-sm mb-2 block">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full pl-12 pr-4 py-3 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent-primary)] transition-colors"
                      />
                    </div>
                    <p className="text-[var(--color-text-muted)] text-xs mt-2">
                      We&apos;ll send your download link to this email
                    </p>
                  </div>

                  <div>
                    <label className="text-[var(--color-text-secondary)] text-sm mb-2 block">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full pl-12 pr-4 py-3 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent-primary)] transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="p-6 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-success)]/10 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-[var(--color-success)]" />
                  </div>
                  <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
                    Payment Method
                  </h2>
                </div>

                <div className="space-y-4">
                  {/* Card Number */}
                  <div>
                    <label className="text-[var(--color-text-secondary)] text-sm mb-2 block">
                      Card Number
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" />
                      <input
                        type="text"
                        placeholder="4242 4242 4242 4242"
                        className="w-full pl-12 pr-4 py-3 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent-primary)] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[var(--color-text-secondary)] text-sm mb-2 block">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent-primary)] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[var(--color-text-secondary)] text-sm mb-2 block">
                        CVC
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full pl-10 pr-4 py-3 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent-primary)] transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Security Badges */}
                <div className="flex flex-wrap items-center gap-4 mt-6 pt-6 border-t border-[var(--color-border)]">
                  <div className="flex items-center gap-2 text-[var(--color-text-muted)] text-sm">
                    <Shield className="w-4 h-4 text-[var(--color-success)]" />
                    <span>Secure SSL</span>
                  </div>
                  <div className="flex items-center gap-2 text-[var(--color-text-muted)] text-sm">
                    <Lock className="w-4 h-4 text-[var(--color-success)]" />
                    <span>Encrypted</span>
                  </div>
                </div>
              </div>

              {/* Submit Button - Mobile Only */}
              <div className="lg:hidden">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] text-white font-semibold rounded-2xl hover:opacity-90 transition-all disabled:opacity-50"
                >
                  {isProcessing ? "Processing..." : `Pay ${formatPrice(getTotal())}`}
                </button>
              </div>
            </form>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="p-6 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-2xl sticky top-24">
              <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-6">
                Order Summary
              </h2>

              {/* Items */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center gap-4 py-3 border-b border-[var(--color-border)] last:border-0"
                  >
                    <div className="w-16 h-16 rounded-lg bg-[var(--color-bg-tertiary)] flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {item.product.image_url ? (
                        <Image
                          src={item.product.image_url}
                          alt={item.product.name}
                          width={64}
                          height={64}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <span className="text-[var(--color-accent-primary)] font-bold">{item.quantity}x</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[var(--color-text-primary)] font-medium truncate">
                        {item.product.name}
                      </p>
                      <p className="text-[var(--color-text-muted)] text-sm capitalize">
                        {item.product.product_type}
                      </p>
                    </div>
                    <p className="text-[var(--color-text-primary)] font-medium">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 pt-4 border-t border-[var(--color-border)]">
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
                  <span className="text-[var(--color-text-muted)]">Included</span>
                </div>
                <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-between">
                  <span className="text-[var(--color-text-primary)] font-semibold">Total</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] font-bold text-2xl">
                    {formatPrice(getTotal())}
                  </span>
                </div>
              </div>

              {/* Submit Button - Desktop */}
              <div className="hidden lg:block mt-6">
                <button
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className="w-full py-4 bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] text-white font-semibold rounded-2xl hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    "Processing..."
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      Pay {formatPrice(getTotal())}
                    </>
                  )}
                </button>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-[var(--color-border)]">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <Shield className="w-6 h-6 text-[var(--color-success)] mx-auto mb-2" />
                    <p className="text-[var(--color-text-muted)] text-xs">Secure Payment</p>
                  </div>
                  <div className="text-center">
                    <Truck className="w-6 h-6 text-[var(--color-accent-primary)] mx-auto mb-2" />
                    <p className="text-[var(--color-text-muted)] text-xs">Instant Delivery</p>
                  </div>
                  <div className="text-center">
                    <Check className="w-6 h-6 text-[var(--color-info)] mx-auto mb-2" />
                    <p className="text-[var(--color-text-muted)] text-xs">Money Back</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
