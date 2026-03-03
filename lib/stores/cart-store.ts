"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product, CartItem } from "@/types";

interface CartStore {
  items: CartItem[];
  discountCode: string | null;
  discountAmount: number;
  discountType: "percentage" | "fixed" | null;
  
  // Actions
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  applyDiscount: (code: string, amount: number, type: "percentage" | "fixed") => void;
  removeDiscount: () => void;
  
  // Getters
  getSubtotal: () => number;
  getTotal: () => number;
  getItemCount: () => number;
  isInCart: (productId: string) => boolean;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      discountCode: null,
      discountAmount: 0,
      discountType: null,

      addItem: (product: Product) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          return { items: [...state.items, { product, quantity: 1 }] };
        });
      },

      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [], discountCode: null, discountAmount: 0, discountType: null });
      },

      applyDiscount: (code: string, amount: number, type: "percentage" | "fixed") => {
        set({ discountCode: code, discountAmount: amount, discountType: type });
      },

      removeDiscount: () => {
        set({ discountCode: null, discountAmount: 0, discountType: null });
      },

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const { discountAmount, discountType } = get();

        if (!discountType || discountAmount === 0) return subtotal;

        if (discountType === "percentage") {
          return Math.max(0, subtotal - (subtotal * discountAmount) / 100);
        }

        return Math.max(0, subtotal - discountAmount);
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },

      isInCart: (productId: string) => {
        return get().items.some((item) => item.product.id === productId);
      },
    }),
    {
      name: "shopbot-cart",
    }
  )
);
