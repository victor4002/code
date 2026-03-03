"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

export function GlassCard({
  children,
  className,
  hover = false,
  glow = false,
  onClick,
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "bg-[#1a1a1a]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl overflow-hidden",
        hover && "hover:border-white/[0.12] transition-colors duration-300",
        glow && "hover:shadow-lg hover:shadow-indigo-500/10 transition-shadow duration-300",
        onClick && "cursor-pointer",
        className
      )}
      whileHover={
        hover
          ? {
              y: -4,
              transition: { duration: 0.2 },
            }
          : undefined
      }
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
