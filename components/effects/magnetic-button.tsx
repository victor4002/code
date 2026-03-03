"use client";

import { useRef, useState, ReactNode } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  href?: string;
}

export function MagneticButton({
  children,
  className = "",
  variant = "primary",
  onClick,
  href,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    setPosition({
      x: distanceX * 0.3,
      y: distanceY * 0.3,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const Component = href ? motion.a : motion.button;
  const props = href ? { href } : { onClick };

  return (
    <Component
      ref={ref as any}
      {...props}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`
        relative inline-flex items-center justify-center px-8 py-4 
        font-semibold text-base rounded-xl overflow-hidden
        transition-all duration-300 cursor-pointer
        ${variant === "primary" 
          ? "bg-gradient-to-r from-[#00f5ff] to-[#b829dd] text-black hover:shadow-[0_0_30px_rgba(0,245,255,0.4)]" 
          : "bg-transparent border border-[#00f5ff]/30 text-[#00f5ff] hover:bg-[#00f5ff]/10 hover:border-[#00f5ff]/50"
        }
        ${className}
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Hover glow effect */}
      <span className="absolute inset-0 bg-gradient-to-r from-[#ff00ff]/0 via-[#ff00ff]/20 to-[#ff00ff]/0 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700" />
      <span className="relative z-10">{children}</span>
    </Component>
  );
}
