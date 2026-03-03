"use client";

import React, { useCallback } from "react";

interface RippleOptions {
  color?: string;
  duration?: number;
  size?: number;
}

export function useRipple(options: RippleOptions = {}) {
  const { 
    color = "var(--color-accent-primary)", 
    duration = 600,
    size = 100 
  } = options;

  const createRipple = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const target = event.currentTarget;
    
    // Check if element has disabled ripple
    if (target.hasAttribute("data-no-ripple")) return;
    
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background-color: ${color};
      opacity: 0.3;
      pointer-events: none;
      transform: scale(0);
      animation: ripple-animation ${duration}ms cubic-bezier(0.4, 0, 0.2, 1);
      left: ${x - size / 2}px;
      top: ${y - size / 2}px;
      width: ${size}px;
      height: ${size}px;
    `;
    
    // Ensure target has relative positioning
    const computedStyle = window.getComputedStyle(target);
    if (computedStyle.position === "static") {
      target.style.position = "relative";
    }
    target.style.overflow = "hidden";
    
    target.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, duration);
  }, [color, duration, size]);

  return { createRipple };
}

// Ripple Button Component
export function RippleButton({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  className?: string;
}) {
  const { createRipple } = useRipple();

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    createRipple(e);
    onClick?.(e);
  };

  return (
    <button onClick={handleClick} className={`relative overflow-hidden ${className}`}>
      {children}
    </button>
  );
}

// Hook for touch devices
export function useTouchRipple(options: RippleOptions = {}) {
  const { createRipple } = useRipple(options);
  
  const handleTouchStart = useCallback((event: React.TouchEvent<HTMLElement>) => {
    const touch = event.touches[0];
    const target = event.currentTarget;
    
    if (target.hasAttribute("data-no-ripple")) return;
    
    const rect = target.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    const size = 80;
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background-color: ${options.color || "var(--color-accent-primary)"};
      opacity: 0.2;
      pointer-events: none;
      transform: scale(0);
      animation: ripple-animation 400ms cubic-bezier(0.4, 0, 0.2, 1);
      left: ${x - size / 2}px;
      top: ${y - size / 2}px;
      width: ${size}px;
      height: ${size}px;
    `;
    
    const computedStyle = window.getComputedStyle(target);
    if (computedStyle.position === "static") {
      target.style.position = "relative";
    }
    target.style.overflow = "hidden";
    
    target.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 400);
  }, [options.color]);

  return { handleTouchStart };
}
