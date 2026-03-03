"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, Grid3X3, LayoutList, X, Sparkles } from "lucide-react";
import { ProductCard } from "@/components/shop/product-card";
import { GlassCard } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { Badge } from "@/components/ui/badge";
import { Product, Category } from "@/types";

// Mock data
const mockCategories: Category[] = [
  { id: "1", slug: "ebooks", name: "eBooks", sort_order: 1 },
  { id: "2", slug: "templates", name: "Templates", sort_order: 2 },
  { id: "3", slug: "bundles", name: "Bundles", sort_order: 3 },
];

const mockProducts: Product[] = [
  {
    id: "1",
    slug: "ultimate-notion-template",
    name: "Ultimate Notion Template",
    description: "A comprehensive Notion template for managing your entire life.",
    short_description: "All-in-one workspace for productivity",
    price: 49,
    compare_at_price: 79,
    category_id: "2",
    category: mockCategories[1],
    tags: ["notion", "productivity"],
    product_type: "template",
    preview_images: ["https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80"],
    featured: true,
    status: "published",
    sales_count: 128,
    created_at: "2024-01-01",
  },
  {
    id: "2",
    slug: "saas-starter-kit",
    name: "SaaS Starter Kit",
    description: "Everything you need to launch your SaaS business.",
    short_description: "Launch your SaaS in days",
    price: 199,
    category_id: "3",
    category: mockCategories[2],
    tags: ["saas", "startup"],
    product_type: "bundle",
    preview_images: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"],
    featured: true,
    status: "published",
    sales_count: 85,
    created_at: "2024-01-15",
  },
  {
    id: "3",
    slug: "design-system-pro",
    name: "Design System Pro",
    description: "Complete Figma design system with 500+ components.",
    short_description: "Professional Figma components",
    price: 79,
    compare_at_price: 129,
    category_id: "2",
    category: mockCategories[1],
    tags: ["figma", "design"],
    product_type: "template",
    preview_images: ["https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80"],
    featured: true,
    status: "published",
    sales_count: 256,
    created_at: "2024-02-01",
  },
  {
    id: "4",
    slug: "freelance-masterclass",
    name: "Freelance Masterclass",
    description: "Learn how to build a successful freelance business.",
    short_description: "Build a 6-figure freelance career",
    price: 149,
    category_id: "1",
    category: mockCategories[0],
    tags: ["freelance", "business"],
    product_type: "ebook",
    preview_images: ["https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=800&q=80"],
    featured: false,
    status: "published",
    sales_count: 312,
    created_at: "2024-02-15",
  },
  {
    id: "5",
    slug: "marketing-playbook",
    name: "Marketing Playbook",
    description: "Proven marketing strategies for digital products.",
    short_description: "Grow your digital business",
    price: 99,
    category_id: "1",
    category: mockCategories[0],
    tags: ["marketing", "growth"],
    product_type: "ebook",
    preview_images: ["https://images.unsplash.com/photo-1553484771-371a605b060b?w=800&q=80"],
    featured: false,
    status: "published",
    sales_count: 178,
    created_at: "2024-02-20",
  },
  {
    id: "6",
    slug: "ui-kit-premium",
    name: "UI Kit Premium",
    description: "1500+ UI components for modern web apps.",
    short_description: "Modern UI components library",
    price: 129,
    compare_at_price: 199,
    category_id: "2",
    category: mockCategories[1],
    tags: ["ui", "components"],
    product_type: "template",
    preview_images: ["https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&q=80"],
    featured: false,
    status: "published",
    sales_count: 423,
    created_at: "2024-03-01",
  },
  {
    id: "7",
    slug: "devops-handbook",
    name: "DevOps Handbook",
    description: "Complete guide to DevOps practices.",
    short_description: "Master DevOps fundamentals",
    price: 89,
    category_id: "1",
    category: mockCategories[0],
    tags: ["devops", "tech"],
    product_type: "ebook",
    preview_images: ["https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80"],
    featured: false,
    status: "published",
    sales_count: 156,
    created_at: "2024-03-10",
  },
  {
    id: "8",
    slug: "startup-bundle",
    name: "Startup Bundle",
    description: "Everything you need to start a business.",
    short_description: "Complete startup resource pack",
    price: 299,
    compare_at_price: 499,
    category_id: "3",
    category: mockCategories[2],
    tags: ["startup", "bundle"],
    product_type: "bundle",
    preview_images: ["https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80"],
    featured: true,
    status: "published",
    sales_count: 67,
    created_at: "2024-03-15",
  },
];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "popular", label: "Most Popular" },
];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...mockProducts];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.tags.some((t) => t.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (selectedCategory) {
      result = result.filter((p) => p.category_id === selectedCategory);
    }

    // Type filter
    if (selectedType) {
      result = result.filter((p) => p.product_type === selectedType);
    }

    // Sort
    switch (sortBy) {
      case "newest":
        result.sort((a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        break;
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        result.sort((a, b) => b.sales_count - a.sales_count);
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, selectedType, sortBy]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setSelectedType(null);
    setSortBy("featured");
  };

  const activeFiltersCount =
    (selectedCategory ? 1 : 0) + (selectedType ? 1 : 0) + (searchQuery ? 1 : 0);

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6366f1] to-[#06b6d4] flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#f5f5f5]">
                All Products
              </h1>
              <p className="text-[#a3a3a3]">
                Discover {mockProducts.length}+ premium digital products
              </p>
            </div>
          </div>
        </motion.div>

        {/* Search & Sort Bar */}
        <GlassCard className="p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#737373]" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-[#0a0a0a] border border-white/[0.06] rounded-xl text-[#f5f5f5] placeholder-[#737373] focus:outline-none focus:border-[#6366f1] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#737373] hover:text-[#f5f5f5]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex gap-2">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-[#0a0a0a] border border-white/[0.06] rounded-xl text-[#f5f5f5] focus:outline-none focus:border-[#6366f1] cursor-pointer"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-colors ${
                  showFilters || activeFiltersCount > 0
                    ? "bg-[#6366f1]/10 border-[#6366f1]/30 text-[#6366f1]"
                    : "bg-[#0a0a0a] border-white/[0.06] text-[#a3a3a3] hover:text-[#f5f5f5]"
                }`}
              >
                <SlidersHorizontal className="w-5 h-5" />
                <span className="hidden sm:inline">Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#6366f1] text-white text-xs flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              {/* View Mode Toggle */}
              <div className="hidden sm:flex items-center bg-[#0a0a0a] border border-white/[0.06] rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid"
                      ? "bg-[#6366f1] text-white"
                      : "text-[#737373] hover:text-[#f5f5f5]"
                  }`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "list"
                      ? "bg-[#6366f1] text-white"
                      : "text-[#737373] hover:text-[#f5f5f5]"
                  }`}
                >
                  <LayoutList className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="pt-4 mt-4 border-t border-white/[0.06] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Categories */}
                  <div>
                    <label className="text-[#737373] text-sm mb-2 block">
                      Category
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {mockCategories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() =>
                            setSelectedCategory(
                              selectedCategory === cat.id ? null : cat.id
                            )
                          }
                          className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                            selectedCategory === cat.id
                              ? "bg-[#6366f1] text-white"
                              : "bg-[#0a0a0a] text-[#a3a3a3] hover:text-[#f5f5f5] border border-white/[0.06]"
                          }`}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Product Type */}
                  <div>
                    <label className="text-[#737373] text-sm mb-2 block">
                      Product Type
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {["ebook", "template", "bundle"].map((type) => (
                        <button
                          key={type}
                          onClick={() =>
                            setSelectedType(selectedType === type ? null : type)
                          }
                          className={`px-3 py-1.5 rounded-lg text-sm capitalize transition-colors ${
                            selectedType === type
                              ? "bg-[#6366f1] text-white"
                              : "bg-[#0a0a0a] text-[#a3a3a3] hover:text-[#f5f5f5] border border-white/[0.06]"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Clear Filters */}
                  {activeFiltersCount > 0 && (
                    <div className="flex items-end">
                      <button
                        onClick={clearFilters}
                        className="text-[#ef4444] hover:text-[#ef4444]/80 text-sm flex items-center gap-1"
                      >
                        <X className="w-4 h-4" />
                        Clear all filters
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassCard>

        {/* Active Filters */}
        {activeFiltersCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center gap-2 mb-6"
          >
            <span className="text-[#737373] text-sm">Active:</span>
            {searchQuery && (
              <Badge variant="default">
                &ldquo;{searchQuery}&rdquo;
                <button
                  onClick={() => setSearchQuery("")}
                  className="ml-1 hover:text-[#ef4444]"
                >
                  <X className="w-3 h-3 inline" />
                </button>
              </Badge>
            )}
            {selectedCategory && (
              <Badge variant="default">
                {mockCategories.find((c) => c.id === selectedCategory)?.name}
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="ml-1 hover:text-[#ef4444]"
                >
                  <X className="w-3 h-3 inline" />
                </button>
              </Badge>
            )}
            {selectedType && (
              <Badge variant="default" className="capitalize">
                {selectedType}
                <button
                  onClick={() => setSelectedType(null)}
                  className="ml-1 hover:text-[#ef4444]"
                >
                  <X className="w-3 h-3 inline" />
                </button>
              </Badge>
            )}
          </motion.div>
        )}

        {/* Results Count */}
        <p className="text-[#737373] text-sm mb-6">
          Showing {filteredProducts.length} of {mockProducts.length} products
        </p>

        {/* Products Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <GlassCard hover className="p-4">
                  <div className="flex gap-4">
                    <div
                      className="w-24 h-24 rounded-lg bg-cover bg-center flex-shrink-0"
                      style={{
                        backgroundImage: `url(${product.preview_images[0]})`,
                      }}
                    />
                    <div className="flex-1">
                      <h3 className="text-[#f5f5f5] font-semibold">
                        {product.name}
                      </h3>
                      <p className="text-[#a3a3a3] text-sm mt-1">
                        {product.short_description}
                      </p>
                      <div className="flex items-center gap-4 mt-3">
                        <span className="text-[#f5f5f5] font-bold">
                          ${product.price}
                        </span>
                        <Badge variant="default" className="capitalize">
                          {product.product_type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        )}

        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 rounded-full bg-[#1a1a1a] border border-white/[0.06] flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-[#737373]" />
            </div>
            <h3 className="text-[#f5f5f5] font-semibold text-lg mb-2">
              No products found
            </h3>
            <p className="text-[#a3a3a3] mb-6">
              Try adjusting your filters or search terms
            </p>
            <GradientButton onClick={clearFilters}>
              Clear All Filters
            </GradientButton>
          </motion.div>
        )}
      </div>
    </div>
  );
}
