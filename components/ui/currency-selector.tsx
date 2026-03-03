"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { 
  useCurrencyStore, 
  currencies, 
  type CurrencyCode 
} from "@/lib/stores/currency-store";
import { useRipple, useTouchRipple } from "@/hooks/use-ripple";

export function CurrencySelector() {
  const { selectedCurrency, setCurrency } = useCurrencyStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { createRipple } = useRipple({ size: 60 });
  const { handleTouchStart } = useTouchRipple();

  const currentCurrency = currencies.find((c) => c.code === selectedCurrency);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (e: React.MouseEvent<HTMLElement>, code: CurrencyCode) => {
    createRipple(e);
    setCurrency(code);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={(e) => {
          createRipple(e);
          setIsOpen(!isOpen);
        }}
        onTouchStart={handleTouchStart}
        className={`flex items-center gap-2 px-3 py-2 bg-[var(--color-bg-tertiary)] border rounded-lg transition-all duration-250 text-sm font-medium ${
          isOpen 
            ? "border-[var(--color-accent-primary)] shadow-[0_0_20px_rgba(212,175,55,0.15)]" 
            : "border-[var(--color-border)] hover:border-[var(--color-accent-primary)]"
        }`}
      >
        <span className="text-lg">{currentCurrency?.flag}</span>
        <span className="text-[var(--color-text-secondary)]">
          {currentCurrency?.code}
        </span>
        <span className="text-[var(--color-text-muted)]">
          {currentCurrency?.symbol}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-[var(--color-text-muted)]" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full right-0 mt-2 min-w-[200px] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl p-2 shadow-[var(--shadow-xl)] z-50"
          >
            <div className="text-xs font-medium text-[var(--color-text-muted)] px-3 py-2 uppercase tracking-wider">
              Select Currency
            </div>
            {currencies.map((currency) => (
              <button
                key={currency.code}
                onClick={(e) => handleSelect(e, currency.code)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-150 text-sm ${
                  selectedCurrency === currency.code
                    ? "bg-[var(--color-accent-subtle)] text-[var(--color-accent-primary)]"
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{currency.flag}</span>
                  <div className="text-left">
                    <div className="font-medium">{currency.code}</div>
                    <div className="text-xs text-[var(--color-text-muted)]">
                      {currency.name}
                    </div>
                  </div>
                </div>
                {selectedCurrency === currency.code && (
                  <Check className="w-4 h-4" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
