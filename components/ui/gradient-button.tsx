"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface GradientButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "outline";
}

export function GradientButton({
  children,
  className,
  onClick,
  type = "button",
  disabled = false,
  loading = false,
  size = "md",
  variant = "primary",
}: GradientButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-[#6366f1] to-[#06b6d4] text-white shadow-lg shadow-indigo-500/25",
    secondary:
      "bg-[#1a1a1a] border border-white/[0.06] text-[#f5f5f5] hover:border-white/[0.12]",
    outline:
      "bg-transparent border border-[#6366f1] text-[#6366f1] hover:bg-[#6366f1]/10",
  };

  return (
    <motion.button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={cn(
        "relative font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2",
        sizeClasses[size],
        variantClasses[variant],
        (disabled || loading) && "opacity-50 cursor-not-allowed",
        className
      )}
      whileHover={!(disabled || loading) ? { scale: 1.02 } : undefined}
      whileTap={!(disabled || loading) ? { scale: 0.98 } : undefined}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </motion.button>
  );
}
