"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  ArrowLeft,
  Package,
  SlidersHorizontal,
} from "lucide-react";
import { allProducts, categories } from "@/lib/products";
import { ProductCard } from "@/components/shop/product-card";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);

  // Filter products
  const results = useMemo(() => {
    let filtered = allProducts;

    // Text search
    if (query) {
      const searchLower = query.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower) ||
          p.category?.name.toLowerCase().includes(searchLower)
      );
    }

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category?.name === selectedCategory);
    }

    // Price filter
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    return filtered;
  }, [query, selectedCategory, priceRange]);

  return (
    <>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <Link
            href="/"
            className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors flex items-center gap-2 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)]">
            Search Results
          </h1>
          {query && (
            <p className="text-[var(--color-text-secondary)] mt-2">
              Showing results for{" "}
              <span className="text-[var(--color-accent-primary)] font-medium">
                &quot;{query}&quot;
              </span>
            </p>
          )}
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-all"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {(selectedCategory !== "All" ||
            priceRange[0] > 0 ||
            priceRange[1] < 1000) && (
            <span className="w-2 h-2 bg-[var(--color-accent-primary)] rounded-full" />
          )}
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-8 p-6 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-2xl"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[var(--color-text-primary)]">
              Filters
            </h3>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setPriceRange([0, 1000]);
              }}
              className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              Reset all
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Category Filter */}
            <div>
              <label className="text-sm font-medium text-[var(--color-text-secondary)] mb-3 block">
                Category
              </label>
              <div className="flex flex-wrap gap-2">
                {["All", ...categories].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                      selectedCategory === cat
                        ? "bg-[var(--color-accent-primary)] text-[var(--color-bg-primary)]"
                        : "bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <label className="text-sm font-medium text-[var(--color-text-secondary)] mb-3 block">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-[var(--color-text-secondary)]">
          <span className="font-medium text-[var(--color-text-primary)]">
            {results.length}
          </span>{" "}
          {results.length === 1 ? "product" : "products"} found
        </p>
      </div>

      {/* Results Grid */}
      {results.length > 0 ? (
        <div className="grid-responsive">
          {results.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] flex items-center justify-center">
            <Search className="w-10 h-10 text-[var(--color-text-muted)]" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
            No products found
          </h2>
          <p className="text-[var(--color-text-secondary)] mb-6">
            Try adjusting your search or filters to find what you&apos;re looking for
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent-primary)] text-[var(--color-bg-primary)] font-semibold rounded-xl hover:bg-[var(--color-accent-hover)] transition-all"
          >
            <Package className="w-5 h-5" />
            Browse All Products
          </Link>
        </div>
      )}
    </>
  );
}

export default function SearchPage() {
  return (
    <main className="min-h-screen pt-32">
      <div className="container-luxury">
        <Suspense fallback={
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin w-8 h-8 border-2 border-[var(--color-accent-primary)] border-t-transparent rounded-full" />
          </div>
        }>
          <SearchResults />
        </Suspense>
      </div>
    </main>
  );
}
