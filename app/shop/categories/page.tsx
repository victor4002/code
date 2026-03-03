"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, FileText, Layers, ArrowRight, Package } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types";

const categories = [
  {
    id: "1",
    slug: "ebooks",
    name: "eBooks",
    description: "Digital guides and educational resources to help you learn new skills and grow your business",
    icon: BookOpen,
    productCount: 24,
    gradient: "from-[#f59e0b] to-[#ef4444]",
    featuredImage: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=800&q=80",
  },
  {
    id: "2",
    slug: "templates",
    name: "Templates",
    description: "Ready-to-use Notion, Figma, and productivity templates to save you hours of work",
    icon: FileText,
    productCount: 36,
    gradient: "from-[#6366f1] to-[#06b6d4]",
    featuredImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
  },
  {
    id: "3",
    slug: "bundles",
    name: "Bundles",
    description: "Curated collections of products at special bundle prices — get more for less",
    icon: Layers,
    productCount: 12,
    gradient: "from-[#10b981] to-[#06b6d4]",
    featuredImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  },
];

const featuredProducts: Record<string, Product[]> = {
  ebooks: [
    {
      id: "4",
      slug: "freelance-masterclass",
      name: "Freelance Masterclass",
      description: "Build a 6-figure freelance career",
      short_description: "Build a 6-figure freelance career",
      price: 149,
      category_id: "1",
      tags: ["freelance", "business"],
      product_type: "ebook",
      preview_images: ["https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=400&q=80"],
      featured: true,
      status: "published",
      sales_count: 312,
      created_at: "2024-02-15",
    },
    {
      id: "5",
      slug: "marketing-playbook",
      name: "Marketing Playbook",
      description: "Proven marketing strategies",
      short_description: "Grow your digital business",
      price: 99,
      category_id: "1",
      tags: ["marketing", "growth"],
      product_type: "ebook",
      preview_images: ["https://images.unsplash.com/photo-1553484771-371a605b060b?w=400&q=80"],
      featured: false,
      status: "published",
      sales_count: 178,
      created_at: "2024-02-20",
    },
  ],
  templates: [
    {
      id: "1",
      slug: "ultimate-notion-template",
      name: "Ultimate Notion Template",
      description: "All-in-one workspace",
      short_description: "All-in-one workspace for productivity",
      price: 49,
      compare_at_price: 79,
      category_id: "2",
      tags: ["notion", "productivity"],
      product_type: "template",
      preview_images: ["https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&q=80"],
      featured: true,
      status: "published",
      sales_count: 128,
      created_at: "2024-01-01",
    },
    {
      id: "3",
      slug: "design-system-pro",
      name: "Design System Pro",
      description: "Complete Figma design system",
      short_description: "Professional Figma components",
      price: 79,
      compare_at_price: 129,
      category_id: "2",
      tags: ["figma", "design"],
      product_type: "template",
      preview_images: ["https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80"],
      featured: true,
      status: "published",
      sales_count: 256,
      created_at: "2024-02-01",
    },
  ],
  bundles: [
    {
      id: "2",
      slug: "saas-starter-kit",
      name: "SaaS Starter Kit",
      description: "Launch your SaaS business",
      short_description: "Launch your SaaS in days",
      price: 199,
      category_id: "3",
      tags: ["saas", "startup"],
      product_type: "bundle",
      preview_images: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80"],
      featured: true,
      status: "published",
      sales_count: 85,
      created_at: "2024-01-15",
    },
  ],
};

export default function CategoriesPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a1a1a] border border-white/[0.06] mb-4">
            <Package className="w-4 h-4 text-[#6366f1]" />
            <span className="text-[#a3a3a3] text-sm">Browse by Category</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#f5f5f5] mb-3">
            Find What You Need
          </h1>
          <p className="text-[#a3a3a3] max-w-xl mx-auto">
            Explore our curated collection of digital products across three categories
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/shop/products?category=${category.slug}`}>
                  <GlassCard className="group h-full overflow-hidden hover:border-white/[0.1] transition-all duration-300">
                    {/* Image */}
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={category.featuredImage}
                        alt={category.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
                      
                      {/* Icon Badge */}
                      <div className={`absolute top-4 left-4 w-12 h-12 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <h2 className="text-xl font-bold text-[#f5f5f5] group-hover:text-[#6366f1] transition-colors">
                          {category.name}
                        </h2>
                        <Badge variant="default" className="text-xs">{category.productCount} items</Badge>
                      </div>
                      <p className="text-[#a3a3a3] text-sm mb-4">{category.description}</p>
                      
                      <div className="flex items-center text-[#6366f1] text-sm font-medium group-hover:text-[#06b6d4] transition-colors">
                        Browse {category.name}
                        <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Featured Products by Category */}
        {categories.map((category, catIndex) => {
          const products = featuredProducts[category.slug] || [];
          if (products.length === 0) return null;
          
          return (
            <motion.section
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.1 }}
              className="mb-12"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#f5f5f5]">Popular in {category.name}</h2>
                <Link href={`/shop/products?category=${category.slug}`}>
                  <span className="text-[#6366f1] hover:text-[#06b6d4] text-sm font-medium transition-colors">
                    View all →
                  </span>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                  <Link key={product.id} href={`/shop/products/${product.slug}`}>
                    <GlassCard className="group overflow-hidden hover:border-white/[0.08]">
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={product.preview_images[0]}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                        {product.compare_at_price && (
                          <div className="absolute top-2 left-2">
                            <Badge variant="success" className="text-xs">
                              Save {Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)}%
                            </Badge>
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <h3 className="text-[#f5f5f5] font-medium text-sm line-clamp-1 group-hover:text-[#6366f1] transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-[#737373] text-xs line-clamp-1 mt-1">
                          {product.short_description}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[#f5f5f5] font-semibold">${product.price}</span>
                          {product.compare_at_price && (
                            <span className="text-[#737373] line-through text-xs">
                              ${product.compare_at_price}
                            </span>
                          )}
                        </div>
                      </div>
                    </GlassCard>
                  </Link>
                ))}
              </div>
            </motion.section>
          );
        })}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <GlassCard className="p-6 sm:p-8 text-center">
            <h2 className="text-2xl font-bold text-[#f5f5f5] mb-2">
              Not Sure What You Need?
            </h2>
            <p className="text-[#a3a3a3] mb-6 max-w-lg mx-auto">
              Browse our complete collection and discover tools that can help you work smarter
            </p>
            <Link href="/shop/products">
              <GradientButton>
                View All Products
                <ArrowRight className="w-4 h-4" />
              </GradientButton>
            </Link>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
