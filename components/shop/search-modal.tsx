"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, TrendingUp, Clock, Sparkles, ArrowRight, ShoppingBag } from "lucide-react";
import { useUIStore } from "@/lib/stores/ui-store";
import { useCurrencyStore } from "@/lib/stores/currency-store";
import { useRipple } from "@/hooks/use-ripple";
import { allProducts, Product } from "@/lib/products";

const trendingSearches = [
  { term: "Premium templates", count: "2.4k" },
  { term: "Ebooks", count: "1.8k" },
  { term: "Design tools", count: "1.2k" },
  { term: "Courses", count: "956" },
];

const recentSearchesKey = "shopbot_recent_searches";

export function SearchModal() {
  const { isSearchOpen, setSearchOpen, addToast } = useUIStore();
  const { formatPrice } = useCurrencyStore();
  const { createRipple } = useRipple();
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Load recent searches
  useEffect(() => {
    const saved = localStorage.getItem(recentSearchesKey);
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch {}
    }
  }, []);

  // Save recent searches
  const saveRecentSearch = useCallback((term: string) => {
    setRecentSearches((prev) => {
      const updated = [term, ...prev.filter((s) => s !== term)].slice(0, 5);
      localStorage.setItem(recentSearchesKey, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Filter products
  const results = useMemo(() => {
    if (!query.trim()) return [];
    const searchTerm = query.toLowerCase();
    return allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm) ||
        p.category?.name.toLowerCase().includes(searchTerm)
    );
  }, [query]);

  const allSuggestions = useMemo(() => {
    if (query.trim()) return results.map((r) => r.name);
    return [];
  }, [query, results]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(!isSearchOpen);
      }
      if (!isSearchOpen) return;
      if (e.key === "Escape") setSearchOpen(false);
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          Math.min(prev + 1, allSuggestions.length - 1)
        );
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, -1));
      }
      if (e.key === "Enter" && selectedIndex >= 0) {
        e.preventDefault();
        const selected = results[selectedIndex];
        if (selected) {
          saveRecentSearch(query);
          setSearchOpen(false);
          setQuery("");
          router.push(`/products/${selected.slug}`);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, setSearchOpen, selectedIndex, results, query, router, saveRecentSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      saveRecentSearch(query);
      setSearchOpen(false);
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setQuery("");
    }
  };

  const handleProductClick = (product: Product) => {
    saveRecentSearch(product.name);
    setSearchOpen(false);
    setQuery("");
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem(recentSearchesKey);
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-32 px-4"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[var(--color-bg-primary)]/90 backdrop-blur-xl"
            onClick={() => setSearchOpen(false)}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="relative w-full max-w-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Search Input */}
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-[var(--color-text-muted)]" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(-1);
                }}
                placeholder="Search products..."
                className="w-full pl-14 pr-20 py-6 bg-transparent text-[var(--color-text-primary)] text-lg placeholder:text-[var(--color-text-muted)] focus:outline-none"
                autoFocus
              />
              <div className="absolute inset-y-0 right-6 flex items-center gap-3">
                {query && (
                  <button
                    type="button"
                    onClick={(e) => {
                      createRipple(e);
                      setQuery("");
                    }}
                    className="p-1 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <kbd className="hidden sm:flex px-2 py-1 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg text-xs text-[var(--color-text-muted)]">
                  ESC
                </kbd>
              </div>
            </form>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto">
              {/* Products */}
              {results.length > 0 && (
                <div className="border-t border-[var(--color-border)]">
                  <div className="px-6 py-3 bg-[var(--color-bg-primary)]/50">
                    <p className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
                      Products
                    </p>
                  </div>
                  <div className="p-3">
                    {results.map((product, index) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.slug}`}
                        onClick={() => handleProductClick(product)}
                        className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                          selectedIndex === index
                            ? "bg-[var(--color-accent-primary)]/10 border border-[var(--color-accent-primary)]/30"
                            : "hover:bg-[var(--color-bg-tertiary)]"
                        }`}
                      >
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-[var(--color-bg-tertiary)]">
                          <Image
                            src={product.image_url || "/images/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[var(--color-text-primary)] font-medium truncate">
                            {product.name}
                          </p>
                          <p className="text-[var(--color-text-muted)] text-sm truncate">
                            {product.category?.name}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-[var(--color-accent-primary)] font-bold">
                            {formatPrice(product.price)}
                          </p>
                          {product.compare_at_price && (
                            <p className="text-[var(--color-text-muted)] text-sm line-through">
                              {formatPrice(product.compare_at_price)}
                            </p>
                          )}
                        </div>
                        <ArrowRight className="w-5 h-5 text-[var(--color-text-muted)]" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* No Results */}
              {query.trim() && results.length === 0 && (
                <div className="border-t border-[var(--color-border)] p-12 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] flex items-center justify-center">
                    <Search className="w-8 h-8 text-[var(--color-text-muted)]" />
                  </div>
                  <p className="text-[var(--color-text-primary)] font-medium mb-1">
                    No results found
                  </p>
                  <p className="text-[var(--color-text-tertiary)] text-sm">
                    Try different keywords or browse categories
                  </p>
                </div>
              )}

              {/* Suggestions */}
              {!query.trim() && (
                <div className="border-t border-[var(--color-border)]">
                  {/* Recent Searches */}
                  {recentSearches.length > 0 && (
                    <div className="px-6 py-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[var(--color-text-muted)]" />
                          <p className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
                            Recent
                          </p>
                        </div>
                        <button
                          onClick={clearRecentSearches}
                          className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                        >
                          Clear
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((term) => (
                          <button
                            key={term}
                            onClick={(e) => {
                              createRipple(e);
                              setQuery(term);
                            }}
                            className="px-4 py-2 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-xl text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-text-muted)] transition-all"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Trending */}
                  <div className="px-6 py-4 border-t border-[var(--color-border)]">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="w-4 h-4 text-[var(--color-accent-primary)]" />
                      <p className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
                        Trending
                      </p>
                    </div>
                    <div className="space-y-1">
                      {trendingSearches.map((item) => (
                        <button
                          key={item.term}
                          onClick={(e) => {
                            createRipple(e);
                            setQuery(item.term);
                          }}
                          className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-left hover:bg-[var(--color-bg-tertiary)] transition-all"
                        >
                          <span className="text-[var(--color-text-secondary)]">
                            {item.term}
                          </span>
                          <span className="text-xs text-[var(--color-text-muted)]">
                            {item.count} searches
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quick Links */}
                  <div className="px-6 py-4 border-t border-[var(--color-border)] bg-[var(--color-bg-primary)]/50">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-4 h-4 text-[var(--color-success)]" />
                      <p className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
                        Quick Links
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href="/products"
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-text-muted)] transition-all"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        All Products
                      </Link>
                      <Link
                        href="/?category=Templates"
                        onClick={() => setSearchOpen(false)}
                        className="px-4 py-2 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-text-muted)] transition-all"
                      >
                        Templates
                      </Link>
                      <Link
                        href="/?category=Ebooks"
                        onClick={() => setSearchOpen(false)}
                        className="px-4 py-2 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-text-muted)] transition-all"
                      >
                        Ebooks
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
