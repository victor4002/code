"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  variant?: "pulse" | "shimmer" | "glow";
}

export function Skeleton({ className, variant = "shimmer" }: SkeletonProps) {
  const variants = {
    pulse: "animate-pulse bg-white/[0.05]",
    shimmer: "skeleton-shimmer bg-gradient-to-r from-white/[0.05] via-white/[0.1] to-white/[0.05]",
    glow: "animate-pulse bg-gradient-to-r from-[#00f5ff]/10 via-[#b829dd]/10 to-[#ff00ff]/10",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn(
        "rounded-lg",
        variants[variant],
        className
      )}
    />
  );
}

// Product Card Skeleton
export function ProductCardSkeleton() {
  return (
    <div className="glass-card overflow-hidden">
      {/* Image skeleton */}
      <Skeleton className="aspect-[4/3] rounded-none" />
      
      {/* Content */}
      <div className="p-5 space-y-4">
        <Skeleton className="h-4 w-20" variant="pulse" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-3/4" />
        
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="w-3.5 h-3.5 rounded-full" variant="pulse" />
          ))}
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-9 w-24" />
        </div>
      </div>
    </div>
  );
}

// Product Grid Skeleton
export function ProductGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <ProductCardSkeleton />
        </motion.div>
      ))}
    </div>
  );
}

// Hero Skeleton
export function HeroSkeleton() {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left content */}
          <div className="space-y-6">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-3/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-2/3" />
            
            <div className="flex gap-4 pt-4">
              <Skeleton className="h-14 w-40" />
              <Skeleton className="h-14 w-40" />
            </div>
            
            <div className="flex gap-8 pt-8">
              <Skeleton className="h-12 w-24" />
              <Skeleton className="h-12 w-24" />
              <Skeleton className="h-12 w-24" />
            </div>
          </div>
          
          {/* Right content */}
          <Skeleton className="aspect-square rounded-2xl hidden lg:block" />
        </div>
      </div>
    </section>
  );
}

// Category Card Skeleton
export function CategoryCardSkeleton() {
  return (
    <div className="glass-card p-8">
      <Skeleton className="w-16 h-16 rounded-2xl mb-6" />
      <Skeleton className="h-6 w-32 mb-2" />
      <Skeleton className="h-4 w-full" />
    </div>
  );
}

// Category Grid Skeleton
export function CategoryGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <CategoryCardSkeleton />
        </motion.div>
      ))}
    </div>
  );
}

// Text Skeleton
export function TextSkeleton({ 
  lines = 3, 
  className 
}: { 
  lines?: number; 
  className?: string;
}) {
  return (
    <div className={cn("space-y-3", className)}>
      {[...Array(lines)].map((_, i) => (
        <Skeleton 
          key={i} 
          className={cn(
            "h-4",
            i === lines - 1 ? "w-2/3" : "w-full"
          )} 
          variant="pulse"
        />
      ))}
    </div>
  );
}

// Image Skeleton
export function ImageSkeleton({ 
  className,
  aspectRatio = "aspect-video"
}: { 
  className?: string;
  aspectRatio?: string;
}) {
  return (
    <div className={cn(aspectRatio, "relative overflow-hidden rounded-xl", className)}>
      <Skeleton className="absolute inset-0" variant="shimmer" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-white/10 border-t-[#00f5ff] animate-spin" />
      </div>
    </div>
  );
}

// Stats Skeleton
export function StatsSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="flex items-center gap-8">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="text-center">
          <Skeleton className="h-8 w-16 mb-1" />
          <Skeleton className="h-3 w-20" variant="pulse" />
        </div>
      ))}
    </div>
  );
}
