"use client";

import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  className,
}: QuantitySelectorProps) {
  const decrease = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const increase = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <div
      className={cn(
        "flex items-center gap-1 bg-[#1a1a1a] border border-white/[0.06] rounded-lg p-1",
        className
      )}
    >
      <motion.button
        onClick={decrease}
        disabled={value <= min}
        className="w-8 h-8 flex items-center justify-center rounded-md text-[#a3a3a3] hover:text-[#f5f5f5] hover:bg-white/[0.05] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        whileTap={{ scale: 0.9 }}
      >
        <Minus className="w-4 h-4" />
      </motion.button>
      
      <span className="w-10 text-center text-[#f5f5f5] font-medium">{value}</span>
      
      <motion.button
        onClick={increase}
        disabled={value >= max}
        className="w-8 h-8 flex items-center justify-center rounded-md text-[#a3a3a3] hover:text-[#f5f5f5] hover:bg-white/[0.05] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        whileTap={{ scale: 0.9 }}
      >
        <Plus className="w-4 h-4" />
      </motion.button>
    </div>
  );
}
