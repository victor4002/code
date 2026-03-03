"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Product } from "@/types";
import { ProductCardEnhanced } from "@/components/shop/product-card-enhanced";
import { ScrollReveal } from "@/components/effects/scroll-reveal";

interface FeaturedSectionProps {
  products: Product[];
}

export function FeaturedSection({ products }: FeaturedSectionProps) {
  return (
    <section className="relative py-24 lg:py-32">
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
                <Sparkles className="w-5 h-5 text-[#00f5ff]" />
                <span className="text-[#00f5ff] text-sm font-medium uppercase tracking-wider">
                  Curated Selection
                </span>
              </motion.div>
              <h2 className="text-4xl sm:text-5xl font-bold">
                <span className="text-white">Featured</span>{" "}
                <span className="gradient-text">Products</span>
              </h2>
              <p className="text-[#606070] mt-3 max-w-lg">
                Hand-picked digital products that stand out for quality, innovation, and value.
              </p>
            </div>
            
            <Link
              href="/products"
              className="group flex items-center gap-2 text-[#00f5ff] hover:text-[#ff00ff] transition-colors"
            >
              <span className="font-medium">View All</span>
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

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-px mt-16 bg-gradient-to-r from-transparent via-[#00f5ff]/30 to-transparent"
        />
      </div>
    </section>
  );
}
