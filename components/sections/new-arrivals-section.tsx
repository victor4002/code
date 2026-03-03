"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import { Product } from "@/types";
import { ProductCardEnhanced } from "@/components/shop/product-card-enhanced";
import { ScrollReveal } from "@/components/effects/scroll-reveal";

interface NewArrivalsSectionProps {
  products: Product[];
}

export function NewArrivalsSection({ products }: NewArrivalsSectionProps) {
  return (
    <section className="relative py-24 lg:py-32 border-t border-white/[0.03]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 mb-3"
              >
                <Zap className="w-5 h-5 text-[#ff00ff]" />
                <span className="text-[#ff00ff] text-sm font-medium uppercase tracking-wider">
                  Just Landed
                </span>
              </motion.div>
              <h2 className="text-4xl sm:text-5xl font-bold">
                <span className="text-white">New</span>{" "}
                <span className="gradient-text">Arrivals</span>
              </h2>
              <p className="text-[#606070] mt-3 max-w-lg">
                Fresh digital products added this week. Be the first to discover them.
              </p>
            </div>
            
            <Link
              href="/products?sort=newest"
              className="group flex items-center gap-2 text-[#ff00ff] hover:text-[#00f5ff] transition-colors"
            >
              <span className="font-medium">See Latest</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCardEnhanced key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* Newsletter CTA */}
        <ScrollReveal delay={0.3}>
          <div className="mt-20 glass-card p-8 lg:p-12 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#00f5ff]/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#ff00ff]/10 to-transparent rounded-full blur-3xl" />
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                  Never Miss a <span className="gradient-text">Drop</span>
                </h3>
                <p className="text-[#606070]">
                  Get notified when new products are added. No spam, ever.
                </p>
              </div>
              
              <div className="flex w-full lg:w-auto gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 lg:w-72 px-5 py-3 rounded-xl bg-[#050508] border border-white/10 text-white placeholder-[#606070] focus:border-[#00f5ff]/50 focus:outline-none transition-colors"
                />
                <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00f5ff] to-[#b829dd] text-black font-semibold hover:shadow-[0_0_30px_rgba(0,245,255,0.3)] transition-shadow whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
