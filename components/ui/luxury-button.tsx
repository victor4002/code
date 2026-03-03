"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { useRipple, useTouchRipple } from "@/hooks/use-ripple";
import { cn } from "@/lib/utils";

interface LuxuryButtonProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export const LuxuryButton = forwardRef<HTMLButtonElement, LuxuryButtonProps>(
  ({ className, variant = "primary", size = "md", children, onClick, ...props }, ref) => {
    const { createRipple } = useRipple();
    const { handleTouchStart } = useTouchRipple();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      createRipple(e);
      onClick?.(e);
    };

    const baseStyles = "relative inline-flex items-center justify-center gap-2 font-medium rounded-xl overflow-hidden transition-all duration-300 will-change-transform";
    
    const variants = {
      primary: "bg-[var(--color-accent-primary)] text-[var(--color-bg-primary)] hover:bg-[var(--color-accent-hover)] hover:shadow-[0_0_30px_rgba(212,175,55,0.25)] active:scale-[0.98]",
      secondary: "bg-transparent text-[var(--color-text-primary)] border border-[var(--color-border-hover)] hover:border-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary)] active:scale-[0.98]",
      ghost: "bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)] active:scale-[0.98]",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-[0.9375rem]",
      lg: "px-8 py-4 text-base",
    };

    return (
      <motion.button
        ref={ref}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

LuxuryButton.displayName = "LuxuryButton";
