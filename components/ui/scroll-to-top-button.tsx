"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import { useRipple, useTouchRipple } from "@/hooks/use-ripple";

export function ScrollToTopButton() {
  const { isVisible, scrollToTop } = useScrollToTop(300);
  const { createRipple } = useRipple({ size: 100 });
  const { handleTouchStart } = useTouchRipple();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    createRipple(e);
    scrollToTop();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 30, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.5 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleClick}
          onTouchStart={handleTouchStart}
          className="scroll-to-top"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" strokeWidth={2.5} />
        
          {/* Pulse animation ring */}
          <span className="absolute inset-0 rounded-full animate-ping opacity-20 bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)]" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
