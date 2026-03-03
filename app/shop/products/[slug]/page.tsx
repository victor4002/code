"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Star,
  Download,
  FileText,
  Calendar,
  Tag,
  Sparkles,
} from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { Badge } from "@/components/ui/badge";
import { ProductGrid } from "@/components/shop/product-grid";
import { useCartStore } from "@/lib/stores/cart-store";
import { useUIStore } from "@/lib/stores/ui-store";
import { useProduct, useProducts } from "@/hooks/use-api";
import { formatPrice } from "@/lib/utils";

function formatFileSize(bytes?: number): string {
  if (!bytes) return "Digital";
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + " " + sizes[i];
}

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { product, loading, error } = useProduct(slug);
  const { products: relatedProducts } = useProducts({ limit: 4 });
  
  const { addItem, isInCart } = useCartStore();
  const { addToast } = useUIStore();
  const [selectedImage, setSelectedImage] = useState(0);

  if (loading) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#f5f5f5] mb-4">Product Not Found</h1>
          <p className="text-[#a3a3a3] mb-6">The product you're looking for doesn't exist.</p>
          <Link href="/products" className="text-[#6366f1] hover:text-[#06b6d4]">
            Browse all products →
          </Link>
        </div>
      </div>
    );
  }

  const inCart = isInCart(product.id);

  const handleAddToCart = () => {
    addItem(product);
    addToast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      type: "success",
    });
  };

  const handleBuyNow = () => {
    if (!inCart) {
      addItem(product);
    }
    window.location.href = "/shop/checkout";
  };

  const hasDiscount = product.compare_at_price && Number(product.compare_at_price) > Number(product.price);
  const discountPercent = hasDiscount
    ? Math.round(((Number(product.compare_at_price) - Number(product.price)) / Number(product.compare_at_price)) * 100)
    : 0;

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm mb-8"
        >
          <Link href="/" className="text-[#737373] hover:text-[#a3a3a3]">Home</Link>
          <span className="text-[#737373]">/</span>
          <Link href="/shop/products" className="text-[#737373] hover:text-[#a3a3a3]">Products</Link>
          <span className="text-[#737373]">/</span>
          <span className="text-[#a3a3a3] truncate">{product.name}</span>
        </motion.nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <GlassCard className="aspect-[4/3] relative mb-4 overflow-hidden">
              <Image
                src={product.preview_images?.[selectedImage] || "/placeholder.jpg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {hasDiscount && (
                <div className="absolute top-4 left-4">
                  <Badge variant="success">-{discountPercent}% OFF</Badge>
                </div>
              )}
            </GlassCard>

            {product.preview_images && product.preview_images.length > 1 && (
              <div className="flex gap-3">
                {product.preview_images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                      selectedImage === idx
                        ? "border-[#6366f1]"
                        : "border-transparent hover:border-white/[0.12]"
                    }`}
                  >
                    <Image src={img} alt={`${product.name} - ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link
              href={`/shop/products?category=${product.category?.slug}`}
              className="text-[#6366f1] font-medium text-sm uppercase tracking-wider hover:text-[#06b6d4] transition-colors"
            >
              {product.category?.name || product.product_type}
            </Link>

            <h1 className="text-3xl sm:text-4xl font-bold text-[#f5f5f5] mt-2 mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < 4 ? "text-[#f59e0b] fill-[#f59e0b]" : "text-[#737373]"
                    }`}
                  />
                ))}
              </div>
              <span className="text-[#a3a3a3] text-sm">({product.sales_count || 0} reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-[#f5f5f5]">
                {formatPrice(Number(product.price))}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-xl text-[#737373] line-through">
                    {formatPrice(Number(product.compare_at_price))}
                  </span>
                  <Badge variant="success">Save {formatPrice(Number(product.compare_at_price) - Number(product.price))}</Badge>
                </>
              )}
            </div>

            <p className="text-[#a3a3a3] text-lg mb-8">{product.short_description}</p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <GradientButton
                onClick={handleAddToCart}
                className="flex-1"
                size="lg"
                variant={inCart ? "secondary" : "primary"}
              >
                <ShoppingCart className="w-5 h-5" />
                {inCart ? "Add More to Cart" : "Add to Cart"}
              </GradientButton>
              <GradientButton
                onClick={handleBuyNow}
                className="flex-1"
                size="lg"
                variant="outline"
              >
                Buy Now
              </GradientButton>
            </div>

            <GlassCard className="p-6 mb-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#6366f1]/10 flex items-center justify-center">
                    <Download className="w-5 h-5 text-[#6366f1]" />
                  </div>
                  <div>
                    <p className="text-[#f5f5f5] font-medium">Instant Download</p>
                    <p className="text-[#737373] text-sm">After purchase</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#10b981]/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-[#10b981]" />
                  </div>
                  <div>
                    <p className="text-[#f5f5f5] font-medium">{product.file_format || "Digital"}</p>
                    <p className="text-[#737373] text-sm">{formatFileSize(product.file_size)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#f59e0b]/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-[#f59e0b]" />
                  </div>
                  <div>
                    <p className="text-[#f5f5f5] font-medium">Last Updated</p>
                    <p className="text-[#737373] text-sm">
                      {new Date(product.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#06b6d4]/10 flex items-center justify-center">
                    <Tag className="w-5 h-5 text-[#06b6d4]" />
                  </div>
                  <div>
                    <p className="text-[#f5f5f5] font-medium">{product.sales_count || 0} Sales</p>
                    <p className="text-[#737373] text-sm">Happy customers</p>
                  </div>
                </div>
              </div>
            </GlassCard>

            <div className="flex flex-wrap gap-2">
              {(product.tags || []).map((tag) => (
                <Link key={tag} href={`/shop/products?search=${tag}`}>
                  <Badge variant="default" className="hover:bg-[#6366f1]/20 cursor-pointer">
                    #{tag}
                  </Badge>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <GlassCard className="p-8">
            <h2 className="text-2xl font-bold text-[#f5f5f5] mb-6">About this Product</h2>
            <div className="text-[#a3a3a3] whitespace-pre-wrap">
              {product.description}
            </div>
          </GlassCard>
        </motion.div>

        {/* AI Recommendations */}
        <div className="mt-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#06b6d4] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#f5f5f5]">You Might Also Like</h2>
              <p className="text-[#737373]">Similar products you might be interested in</p>
            </div>
          </div>
          <ProductGrid products={relatedProducts.filter(p => p.id !== product.id).slice(0, 4)} />
        </div>
      </div>
    </div>
  );
}
