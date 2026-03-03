"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useThemeStore } from "@/lib/stores/theme-store";
import { useRipple, useTouchRipple } from "@/hooks/use-ripple";

export function ThemeToggle() {
  const { theme, resolvedTheme, toggleTheme, initTheme } = useThemeStore();
  const { createRipple } = useRipple({ duration: 500 });
  const { handleTouchStart } = useTouchRipple({ duration: 400 });

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    createRipple(e);
    toggleTheme();
  };

  return (
    <button
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      className="relative w-14 h-7 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-full cursor-pointer transition-all duration-300 hover:border-[var(--color-accent-primary)] overflow-hidden"
      aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
    >
      {/* Background icons */}
      <div className="absolute inset-0 flex items-center justify-between px-1.5">
        <Sun className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
        <Moon className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
      </div>
      
      {/* Animated thumb */}
      <motion.div
        initial={false}
        animate={{
          x: resolvedTheme === "dark" ? 2 : 30,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
        className="absolute top-0.5 w-6 h-6 bg-[var(--color-accent-primary)] rounded-full flex items-center justify-center shadow-lg"
      >
        {resolvedTheme === "dark" ? (
          <Moon className="w-3 h-3 text-[var(--color-bg-primary)]" />
        ) : (
          <Sun className="w-3 h-3 text-[var(--color-bg-primary)]" />
        )}
      </motion.div>
    </button>
  );
}
