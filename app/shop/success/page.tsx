"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Download, Mail, ArrowRight, Sparkles } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { useCartStore } from "@/lib/stores/cart-store";

export default function SuccessPage() {
  const { clearCart } = useCartStore();

  // Clear cart on mount
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 rounded-full bg-gradient-to-br from-[#10b981] to-[#06b6d4] flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>

          <h1 className="text-3xl sm:text-4xl font-bold text-[#f5f5f5] mb-4">
            Order Confirmed!
          </h1>
          <p className="text-[#a3a3a3] text-lg">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <GlassCard className="p-8">
            {/* Order Details */}
            <div className="text-center mb-8 pb-8 border-b border-white/[0.06]">
              <p className="text-[#737373] text-sm mb-2">Order Number</p>
              <p className="text-2xl font-bold text-[#f5f5f5] font-mono">
                SHOP-12847
              </p>
            </div>

            {/* Next Steps */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#6366f1]/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-[#6366f1]" />
                </div>
                <div>
                  <h3 className="text-[#f5f5f5] font-semibold mb-1">
                    Check Your Email
                  </h3>
                  <p className="text-[#a3a3a3] text-sm">
                    We&apos;ve sent your order confirmation and download links to your email address.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#10b981]/10 flex items-center justify-center flex-shrink-0">
                  <Download className="w-6 h-6 text-[#10b981]" />
                </div>
                <div>
                  <h3 className="text-[#f5f5f5] font-semibold mb-1">
                    Download Your Products
                  </h3>
                  <p className="text-[#a3a3a3] text-sm">
                    Access your downloads instantly from your account dashboard or email.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#f59e0b]/10 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-[#f59e0b]" />
                </div>
                <div>
                  <h3 className="text-[#f5f5f5] font-semibold mb-1">
                    Explore More
                  </h3>
                  <p className="text-[#a3a3a3] text-sm">
                    Discover more amazing digital products in our marketplace.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-white/[0.06]">
              <Link href="/downloads" className="flex-1">
                <GradientButton className="w-full" size="lg">
                  <Download className="w-5 h-5" />
                  My Downloads
                </GradientButton>
              </Link>
              <Link href="/products" className="flex-1">
                <GradientButton className="w-full" size="lg" variant="secondary">
                  Continue Shopping
                  <ArrowRight className="w-5 h-5" />
                </GradientButton>
              </Link>
            </div>
          </GlassCard>
        </motion.div>

        {/* Support */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-[#737373] text-sm mt-8"
        >
          Need help?{" "}
          <Link href="/contact" className="text-[#6366f1] hover:text-[#06b6d4] transition-colors">
            Contact our support team
          </Link>
        </motion.p>
      </div>
    </div>
  );
}
