"use client";

import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "gradient" | "success" | "warning" | "error";
}

export function Badge({
  children,
  className,
  variant = "default",
}: BadgeProps) {
  const variantClasses = {
    default: "bg-[#1a1a1a] text-[#a3a3a3] border border-white/[0.06]",
    gradient:
      "bg-gradient-to-r from-[#6366f1]/20 to-[#06b6d4]/20 text-[#f5f5f5] border border-[#6366f1]/30",
    success: "bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20",
    warning: "bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/20",
    error: "bg-[#ef4444]/10 text-[#ef4444] border border-[#ef4444]/20",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
