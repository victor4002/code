"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Category } from "@/types";
import { cn } from "@/lib/utils";
import { 
  BookOpen, 
  FileText, 
  Layers, 
  Grid3X3,
  LucideIcon 
}
 from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  ebook: BookOpen,
  template: FileText,
  bundle: Layers,
  default: Grid3X3,
};

interface CategoryNavProps {
  categories: Category[];
}

export function CategoryNav({ categories }: CategoryNavProps) {
  const pathname = usePathname();

  return (
    <section className="py-12 border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-bold text-[#f5f5f5] mb-8 text-center"
        >
          Browse by Category
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category, index) => {
            const Icon = iconMap[category.icon || "default"] || iconMap.default;
            const isActive = pathname === `/categories/${category.slug}`;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/shop/products?category=${category.slug}`}
                  className={cn(
                    "group flex flex-col items-center gap-3 p-6 rounded-2xl border transition-all duration-300 min-w-[140px]",
                    isActive
                      ? "bg-gradient-to-br from-[#6366f1]/20 to-[#06b6d4]/20 border-[#6366f1]/30"
                      : "bg-[#1a1a1a]/50 border-white/[0.06] hover:border-white/[0.12] hover:bg-[#1a1a1a]"
                  )}
                >
                  <div
                    className={cn(
                      "w-14 h-14 rounded-xl flex items-center justify-center transition-colors",
                      isActive
                        ? "bg-gradient-to-br from-[#6366f1] to-[#06b6d4]"
                        : "bg-[#0a0a0a] group-hover:bg-[#6366f1]/10"
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-6 h-6 transition-colors",
                        isActive
                          ? "text-white"
                          : "text-[#6366f1]"
                      )}
                    />
                  </div>
                  <div className="text-center">
                    <h3
                      className={cn(
                        "font-medium transition-colors",
                        isActive
                          ? "text-[#f5f5f5]"
                          : "text-[#a3a3a3] group-hover:text-[#f5f5f5]"
                      )}
                    >
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="text-[#737373] text-xs mt-1">
                        {category.description}
                      </p>
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
