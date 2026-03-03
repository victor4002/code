"use client";

import { motion } from "framer-motion";
import { 
  ArrowUpRight, 
  BookOpen, 
  Layout, 
  Wrench, 
  GraduationCap, 
  Palette, 
  Briefcase,
  LucideIcon
} from "lucide-react";
import Link from "next/link";
import { Category } from "@/types";
import { TiltCard } from "@/components/effects/tilt-card";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/effects/scroll-reveal";

interface CategoriesSectionProps {
  categories: Category[];
}

const categoryGradients: Record<string, string> = {
  "ebooks": "from-[#00f5ff]/20 to-[#0080ff]/20",
  "templates": "from-[#ff00ff]/20 to-[#b829dd]/20",
  "tools": "from-[#8b5cf6]/20 to-[#00f5ff]/20",
  "courses": "from-[#f59e0b]/20 to-[#ff00ff]/20",
  "design": "from-[#10b981]/20 to-[#00f5ff]/20",
  "business": "from-[#ef4444]/20 to-[#ff00ff]/20",
};

const iconMap: Record<string, LucideIcon> = {
  "ebooks": BookOpen,
  "templates": Layout,
  "tools": Wrench,
  "courses": GraduationCap,
  "design": Palette,
  "business": Briefcase,
};

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111118]/80 border border-white/5 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#00f5ff] animate-pulse" />
            <span className="text-[#a0a0b0] text-sm">Browse by Category</span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-white">Find Your</span>{" "}
            <span className="gradient-text">Perfect Match</span>
          </h2>
          <p className="text-[#606070] max-w-2xl mx-auto">
            Explore our curated categories. Each one packed with premium digital products.
          </p>
        </ScrollReveal>

        {/* Categories Grid */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const Icon = iconMap[category.slug] || Layout;
            const gradient = categoryGradients[category.slug] || "from-[#00f5ff]/20 to-[#b829dd]/20";
            
            return (
              <StaggerItem key={category.id}>
                <TiltCard tiltAmount={5}>
                  <Link href={`/categories/${category.slug}`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="glass-card p-8 group cursor-pointer h-full"
                    >
                      {/* Icon */}
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>

                      {/* Content */}
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00f5ff] transition-colors">
                            {category.name}
                          </h3>
                          <p className="text-[#606070] text-sm line-clamp-2">
                            {category.description}
                          </p>
                        </div>
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          whileHover={{ opacity: 1, x: 0 }}
                          className="w-10 h-10 rounded-full bg-[#00f5ff]/10 flex items-center justify-center text-[#00f5ff] opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <ArrowUpRight className="w-5 h-5" />
                        </motion.div>
                      </div>

                      {/* Bottom line animation */}
                      <div className="mt-6 h-0.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: "0%" }}
                          whileHover={{ width: "100%" }}
                          className="h-full bg-gradient-to-r from-[#00f5ff] to-[#ff00ff]"
                        />
                      </div>
                    </motion.div>
                  </Link>
                </TiltCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
