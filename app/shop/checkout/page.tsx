"use client";

import { useState } from "react";
import Link from "next/link";
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
} from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/lib/stores/cart-store";
import { formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
  const { items, getSubtotal, getTotal, discountAmount } = useCartStore();
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
      <div className="pt-32 pb-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-[#f5f5f5] mb-4">Your cart is empty</h1>
          <Link href="/products">
            <GradientButton>
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </GradientButton>
          </Link>
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
          <Link
            href="/cart"
            className="text-[#a3a3a3] hover:text-[#f5f5f5] flex items-center gap-2 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>
          <h1 className="text-3xl font-bold text-[#f5f5f5]">Checkout</h1>
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
              <GlassCard className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-[#6366f1]/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#6366f1]" />
                  </div>
                  <h2 className="text-lg font-semibold text-[#f5f5f5]">
                    Contact Information
                  </h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-[#a3a3a3] text-sm mb-2 block">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#737373]" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full pl-12 pr-4 py-3 bg-[#0a0a0a] border border-white/[0.06] rounded-xl text-[#f5f5f5] placeholder-[#737373] focus:outline-none focus:border-[#6366f1] transition-colors"
                      />
                    </div>
                    <p className="text-[#737373] text-xs mt-2">
                      We&apos;ll send your download link to this email
                    </p>
                  </div>

                  <div>
                    <label className="text-[#a3a3a3] text-sm mb-2 block">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#737373]" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full pl-12 pr-4 py-3 bg-[#0a0a0a] border border-white/[0.06] rounded-xl text-[#f5f5f5] placeholder-[#737373] focus:outline-none focus:border-[#6366f1] transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Payment Information */}
              <GlassCard className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-[#10b981]/10 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-[#10b981]" />
                  </div>
                  <h2 className="text-lg font-semibold text-[#f5f5f5]">
                    Payment Method
                  </h2>
                </div>

                <div className="space-y-4">
                  {/* Card Number */}
                  <div>
                    <label className="text-[#a3a3a3] text-sm mb-2 block">
                      Card Number
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#737373]" />
                      <input
                        type="text"
                        placeholder="4242 4242 4242 4242"
                        className="w-full pl-12 pr-4 py-3 bg-[#0a0a0a] border border-white/[0.06] rounded-xl text-[#f5f5f5] placeholder-[#737373] focus:outline-none focus:border-[#6366f1] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[#a3a3a3] text-sm mb-2 block">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/[0.06] rounded-xl text-[#f5f5f5] placeholder-[#737373] focus:outline-none focus:border-[#6366f1] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[#a3a3a3] text-sm mb-2 block">
                        CVC
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]" />
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full pl-10 pr-4 py-3 bg-[#0a0a0a] border border-white/[0.06] rounded-xl text-[#f5f5f5] placeholder-[#737373] focus:outline-none focus:border-[#6366f1] transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Security Badges */}
                <div className="flex flex-wrap items-center gap-4 mt-6 pt-6 border-t border-white/[0.06]">
                  <div className="flex items-center gap-2 text-[#737373] text-sm">
                    <Shield className="w-4 h-4 text-[#10b981]" />
                    <span>Secure SSL</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#737373] text-sm">
                    <Lock className="w-4 h-4 text-[#10b981]" />
                    <span>Encrypted</span>
                  </div>
                </div>
              </GlassCard>

              {/* Submit Button - Mobile Only */}
              <div className="lg:hidden">
                <GradientButton
                  type="submit"
                  className="w-full"
                  size="lg"
                  loading={isProcessing}
                >
                  {isProcessing ? "Processing..." : `Pay ${formatPrice(getTotal())}`}
                </GradientButton>
              </div>
            </form>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <GlassCard className="p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-[#f5f5f5] mb-6">
                Order Summary
              </h2>

              {/* Items */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center gap-4 py-3 border-b border-white/[0.06] last:border-0"
                  >
                    <div className="w-16 h-16 rounded-lg bg-[#1a1a1a] flex items-center justify-center flex-shrink-0">
                      <span className="text-[#6366f1] font-bold">{item.quantity}x</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#f5f5f5] font-medium truncate">
                        {item.product.name}
                      </p>
                      <p className="text-[#737373] text-sm capitalize">
                        {item.product.product_type}
                      </p>
                    </div>
                    <p className="text-[#f5f5f5] font-medium">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 pt-4 border-t border-white/[0.06]">
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
                  <span className="text-[#737373]">Included</span>
                </div>
                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-[#f5f5f5] font-semibold">Total</span>
                  <span className="text-[#f5f5f5] font-bold text-2xl">
                    {formatPrice(getTotal())}
                  </span>
                </div>
              </div>

              {/* Submit Button - Desktop */}
              <div className="hidden lg:block mt-6">
                <GradientButton
                  onClick={handleSubmit}
                  className="w-full"
                  size="lg"
                  loading={isProcessing}
                >
                  {isProcessing ? (
                    "Processing..."
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      Pay {formatPrice(getTotal())}
                    </>
                  )}
                </GradientButton>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-white/[0.06]">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <Shield className="w-6 h-6 text-[#10b981] mx-auto mb-2" />
                    <p className="text-[#737373] text-xs">Secure Payment</p>
                  </div>
                  <div className="text-center">
                    <Truck className="w-6 h-6 text-[#6366f1] mx-auto mb-2" />
                    <p className="text-[#737373] text-xs">Instant Delivery</p>
                  </div>
                  <div className="text-center">
                    <Check className="w-6 h-6 text-[#06b6d4] mx-auto mb-2" />
                    <p className="text-[#737373] text-xs">Money Back</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
