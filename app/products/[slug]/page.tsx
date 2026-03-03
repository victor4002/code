"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Check,
  Download,
  Shield,
  Zap,
  ArrowLeft,
  ImageOff,
  Loader2,
} from "lucide-react";
import { useProduct } from "@/hooks/use-api";
import { useCartStore } from "@/lib/stores/cart-store";
import { useCurrencyStore } from "@/lib/stores/currency-store";
import { useUIStore } from "@/lib/stores/ui-store";
import { useRipple, RippleButton } from "@/hooks/use-ripple";
import { LuxuryProductCard, LuxuryProductCardSkeleton } from "@/components/shop/luxury-product-card";
import { useProducts } from "@/hooks/use-api";

// Get product image with fallback
function getProductImage(product: any): string {
  if (!product) return "/images/placeholder.svg";
  
  if (product.image_url && product.image_url.trim() !== '') {
    return product.image_url;
  }
  
  if (product.preview_images && product.preview_images.length > 0) {
    return product.preview_images[0];
  }
  
  const type = product.product_type || 'ebook';
  return `/images/placeholders/${type}.svg`;
}

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const { product, loading, error } = useProduct(slug);
  const { products: allProducts } = useProducts({});
  
  const { addItem } = useCartStore();
  const { formatPrice } = useCurrencyStore();
  const { addToast } = useUIStore();
  const { createRipple } = useRipple();

  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Related products - from API
  const relatedProducts = allProducts
    .filter((p) => p.category?.name === product?.category?.name && p.id !== product?.id)
    .slice(0, 4);

  useEffect(() => {
    if (error) {
      router.push("/");
    }
  }, [error, router]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-[var(--color-accent-primary)] animate-spin" />
      </main>
    );
  }

  if (!product) return null;

  const mainImage = getProductImage(product);
  const previewImages = product.preview_images?.length 
    ? product.preview_images 
    : [mainImage];

  const handleAddToCart = (e: React.MouseEvent<HTMLElement>) => {
    createRipple(e);
    addItem(product);
    addToast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      type: "success",
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast({
        title: "Link copied",
        description: "Product link copied to clipboard.",
        type: "success",
      });
    }
  };

  return (
    <main className="min-h-screen">
      {/* Breadcrumbs */}
      <div className="border-b border-[var(--color-border)]">
        <div className="container-luxury py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link
              href="/"
              className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-[var(--color-text-muted)]" />
            <Link
              href={`/products?category=${encodeURIComponent(product.category?.name || "")}`}
              className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              {product.category?.name || "Products"}
            </Link>
            <ChevronRight className="w-4 h-4 text-[var(--color-text-muted)]" />
            <span className="text-[var(--color-text-primary)] truncate max-w-[200px]">
              {product.name}
            </span>
          </div>
        </div>
      </div>

      {/* Product Section */}
      <section className="container-luxury py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Images */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative aspect-square rounded-3xl overflow-hidden bg-[var(--color-bg-secondary)] border border-[var(--color-border)]"
            >
              {!imageLoaded && !imageError && (
                <div className="absolute inset-0 skeleton flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-[var(--color-accent-primary)] animate-spin" />
                </div>
              )}
              
              {imageError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-[var(--color-text-muted)]">
                  <ImageOff className="w-16 h-16 mb-4 opacity-50" />
                  <span>No image available</span>
                </div>
              )}
              
              <Image
                src={previewImages[selectedImage] || mainImage}
                alt={product.name}
                fill
                className={`object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                priority
                onLoad={() => setImageLoaded(true)}
                onError={() => {
                  setImageError(true);
                  setImageLoaded(true);
                }}
              />
            </motion.div>
            
            {/* Thumbnail Gallery */}
            {previewImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {previewImages.map((img: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedImage(index);
                      setImageLoaded(false);
                      setImageError(false);
                    }}
                    className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-[var(--color-accent-primary)]"
                        : "border-transparent hover:border-[var(--color-border)]"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col"
          >
            {/* Badges */}
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              {product.tags?.includes("bestseller") && (
                <span className="px-3 py-1 bg-[var(--color-success)]/10 text-[var(--color-success)] text-xs font-bold uppercase tracking-wider rounded-full">
                  Bestseller
                </span>
              )}
              {product.compare_at_price && (
                <span className="px-3 py-1 bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] text-white text-xs font-bold uppercase tracking-wider rounded-full">
                  Sale
                </span>
              )}
              <span className="px-3 py-1 bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] text-xs font-medium rounded-full capitalize">
                {product.product_type || "Digital"}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl lg:text-5xl font-bold text-[var(--color-text-primary)] mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating || 0)
                        ? "fill-[var(--color-accent-primary)] text-[var(--color-accent-primary)]"
                        : "text-[var(--color-border)]"
                    }`}
                  />
                ))}
              </div>
              <span className="text-[var(--color-text-secondary)]">
                {product.rating || 5} ({product.review_count || 0} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)]">
                {formatPrice(product.price)}
              </span>
              {product.compare_at_price && (
                <span className="text-xl text-[var(--color-text-muted)] line-through">
                  {formatPrice(product.compare_at_price)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed mb-8">
              {product.description || product.short_description || "Premium digital product crafted with excellence."}
            </p>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                { icon: Download, text: "Instant Download" },
                { icon: Shield, text: "Lifetime Access" },
                { icon: Zap, text: "Free Updates" },
                { icon: Check, text: "Premium Quality" },
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-[var(--color-accent-primary)]" />
                  </div>
                  <span className="text-[var(--color-text-secondary)] text-sm">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-4 mt-auto">
              <RippleButton
                onClick={handleAddToCart}
                className="flex-1 py-4 bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] text-white font-semibold rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-3"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </RippleButton>
              <button
                onClick={(e) => {
                  createRipple(e);
                  setIsWishlisted(!isWishlisted);
                }}
                className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center transition-all ${
                  isWishlisted
                    ? "bg-[var(--color-error)]/10 border-[var(--color-error)] text-[var(--color-error)]"
                    : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-error)] hover:border-[var(--color-error)]"
                }`}
              >
                <Heart
                  className={`w-6 h-6 ${isWishlisted ? "fill-current" : ""}`}
                />
              </button>
              <button
                onClick={(e) => {
                  createRipple(e);
                  handleShare();
                }}
                className="w-14 h-14 rounded-2xl border-2 border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-text-muted)] flex items-center justify-center transition-all"
              >
                <Share2 className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Details Tabs */}
      <section className="border-t border-[var(--color-border)]">
        <div className="container-luxury py-16">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">
              Product Details
            </h2>
            <div className="space-y-4 text-[var(--color-text-secondary)]">
              <p>
                Experience the pinnacle of digital craftsmanship with this premium
                product. Every detail has been meticulously designed to deliver
                exceptional quality and unparalleled value.
              </p>
              <ul className="space-y-2 list-disc list-inside">
                <li>High-resolution files for crystal-clear quality</li>
                <li>Compatible with all major platforms and software</li>
                <li>Instant download after purchase</li>
                <li>Lifetime access with free updates</li>
                <li>24/7 customer support</li>
              </ul>
              
              {/* Additional product info */}
              {product.file_format && (
                <div className="mt-6 pt-6 border-t border-[var(--color-border)]">
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3">
                    Technical Specifications
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    {product.file_format && (
                      <div className="flex justify-between">
                        <span className="text-[var(--color-text-muted)]">Format:</span>
                        <span className="text-[var(--color-text-primary)] uppercase">{product.file_format}</span>
                      </div>
                    )}
                    {product.file_size && (
                      <div className="flex justify-between">
                        <span className="text-[var(--color-text-muted)]">Size:</span>
                        <span className="text-[var(--color-text-primary)]">
                          {(product.file_size / 1024 / 1024).toFixed(2)} MB
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-[var(--color-border)]">
          <div className="container-luxury py-16">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold text-[var(--color-text-primary)]">
                You May Also Like
              </h2>
              <Link
                href={`/products?category=${encodeURIComponent(product.category?.name || "")}`}
                className="text-[var(--color-accent-primary)] hover:text-[var(--color-accent-hover)] transition-colors flex items-center gap-2"
              >
                View All
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
            <div className="grid-responsive">
              {relatedProducts.map((p, index) => (
                <LuxuryProductCard key={p.id} product={p} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
