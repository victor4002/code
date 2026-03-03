"use client";

import { motion } from "framer-motion";
import { Package } from "lucide-react";
import { Product } from "@/types";
import { ProductCard } from "./product-card";
import { GradientButton } from "@/components/ui/gradient-button";
import Link from "next/link";

interface ProductGridProps {
  products: Product[];
  title?: string;
  description?: string;
  showViewAll?: boolean;
  viewAllHref?: string;
  emptyMessage?: string;
}

export function ProductGrid({
  products,
  title,
  description,
  showViewAll = false,
  viewAllHref = "/products",
  emptyMessage = "No products found",
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 rounded-full bg-[#1a1a1a] flex items-center justify-center mx-auto mb-4">
          <Package className="w-8 h-8 text-[#737373]" />
        </div>
        <h3 className="text-[#f5f5f5] font-semibold text-lg mb-2">
          {emptyMessage}
        </h3>
        <p className="text-[#a3a3a3] mb-6">
          Check back later for new arrivals
        </p>
        <Link href="/products">
          <GradientButton>Browse All Products</GradientButton>
        </Link>
      </div>
    );
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {(title || description) && (
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              {title && (
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-2xl sm:text-3xl font-bold text-[#f5f5f5] mb-2"
                >
                  {title}
                </motion.h2>
              )}
              {description && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-[#a3a3a3] max-w-xl"
                >
                  {description}
                </motion.p>
              )}
            </div>
            {showViewAll && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Link
                  href={viewAllHref}
                  className="text-[#6366f1] hover:text-[#06b6d4] font-medium transition-colors inline-flex items-center gap-1"
                >
                  View All
                  <span className="text-lg">→</span>
                </Link>
              </motion.div>
            )}
          </div>
        )}

        {/* Grid - Optimized for mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
