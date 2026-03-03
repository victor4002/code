"use client";

import { create } from "zustand";

export type ToastType = "success" | "error" | "warning" | "info" | "cart" | "remove" | "discount";

interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface Toast {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
  action?: ToastAction;
}

interface UIStore {
  // Cart drawer
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  toggleCart: () => void;
  
  // Mobile menu
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  
  // Search modal
  isSearchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  
  // Quick view modal
  quickViewProductId: string | null;
  setQuickViewProduct: (productId: string | null) => void;
  
  // Toast notifications
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}

export const useUIStore = create<UIStore>()((set) => ({
  isCartOpen: false,
  setCartOpen: (open: boolean) => set({ isCartOpen: open }),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  
  isMobileMenuOpen: false,
  setMobileMenuOpen: (open: boolean) => set({ isMobileMenuOpen: open }),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  
  isSearchOpen: false,
  setSearchOpen: (open: boolean) => set({ isSearchOpen: open }),
  
  quickViewProductId: null,
  setQuickViewProduct: (productId: string | null) => set({ quickViewProductId: productId }),
  
  toasts: [],
  addToast: (toast) => {
    const id = Math.random().toString(36).substring(7);
    set((state) => ({
      toasts: [...state.toasts.slice(-2), { ...toast, id }], // Keep max 3 toasts
    }));
    
    // Auto-remove toast after 4 seconds (unless it has an action)
    if (!toast.action) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }));
      }, 4000);
    }
  },
  removeToast: (id: string) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
