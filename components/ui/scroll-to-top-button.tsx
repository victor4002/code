"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import { useRipple, useTouchRipple } from "@/hooks/use-ripple";

export function ScrollToTopButton() {
  const { isVisible, scrollToTop } = useScrollToTop(400);
  const { createRipple } = useRipple({ size: 80 });
  const { handleTouchStart } = useTouchRipple();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    createRipple(e);
    scrollToTop();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleClick}
          onTouchStart={handleTouchStart}
          className="fixed bottom-8 right-8 w-12 h-12 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-full flex items-center justify-center cursor-pointer z-50 text-[var(--color-text-secondary)] hover:border-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary)] hover:shadow-[var(--shadow-md)] transition-all duration-300"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
