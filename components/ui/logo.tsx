"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface LogoProps {
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Logo({ showText = true, size = "md", className = "" }: LogoProps) {
  const sizes = {
    sm: { container: 32, icon: 18, text: "text-lg" },
    md: { container: 40, icon: 22, text: "text-xl" },
    lg: { container: 48, icon: 26, text: "text-2xl" },
  };

  const { container, icon, text } = sizes[size];

  return (
    <Link 
      href="/" 
      className={`flex items-center gap-3 group ${className}`}
    >
      {/* Logo Icon - Digital Cube/Download concept */}
      <motion.div 
        className="relative flex items-center justify-center rounded-xl overflow-hidden"
        style={{ width: container, height: container }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)]" />
        
        {/* Animated glow effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-white/20" />
        </div>

        {/* SVG Icon - Stylized S with digital elements */}
        <svg
          width={icon}
          height={icon}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10"
        >
          {/* Outer hexagon/cube shape */}
          <path
            d="M12 2L20 7V17L12 22L4 17V7L12 2Z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-90"
          />
          
          {/* Inner S shape */}
          <path
            d="M15 9.5C15 8.67 14.33 8 13.5 8H10.5C9.67 8 9 8.67 9 9.5C9 10.33 9.67 11 10.5 11H13.5C14.33 11 15 11.67 15 12.5C15 13.33 14.33 14 13.5 14H10.5C9.67 14 9 13.33 9 12.5"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-90"
          />
          
          {/* Download arrow element */}
          <path
            d="M12 14V18M12 18L10 16M12 18L14 16"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-80"
          />
        </svg>
      </motion.div>

      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={`${text} font-bold text-[var(--color-text-primary)] tracking-tight leading-none`}>
            ShopBot
          </span>
          <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-[0.2em] hidden sm:block">
            Digital Store
          </span>
        </div>
      )}
    </Link>
  );
}

/* Simple Logo for favicon/small spaces */
export function LogoIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="24" height="24" rx="6" fill="url(#logo-gradient)" />
      <path
        d="M12 4L19 8V16L12 20L5 16V8L12 4Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
      <path
        d="M14.5 10C14.5 9.17 13.83 8.5 13 8.5H11C10.17 8.5 9.5 9.17 9.5 10C9.5 10.83 10.17 11.5 11 11.5H13C13.83 11.5 14.5 12.17 14.5 13C14.5 13.83 13.83 14.5 13 14.5H11C10.17 14.5 9.5 13.83 9.5 13"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
      <defs>
        <linearGradient id="logo-gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366f1" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
    </svg>
  );
}
