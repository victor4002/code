"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CurrencyCode = "USD" | "EUR" | "GBP" | "JPY" | "CAD" | "NGN";

interface Currency {
  code: CurrencyCode;
  symbol: string;
  name: string;
  flag: string;
}

export const currencies: Currency[] = [
  { code: "USD", symbol: "$", name: "US Dollar", flag: "🇺🇸" },
  { code: "EUR", symbol: "€", name: "Euro", flag: "🇪🇺" },
  { code: "GBP", symbol: "£", name: "British Pound", flag: "🇬🇧" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen", flag: "🇯🇵" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar", flag: "🇨🇦" },
  { code: "NGN", symbol: "₦", name: "Nigerian Naira", flag: "🇳🇬" },
];

// Exchange rates (in production, fetch from API)
const exchangeRates: Record<CurrencyCode, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 150.25,
  CAD: 1.35,
  NGN: 1550.0,
};

interface CurrencyStore {
  selectedCurrency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  convertPrice: (priceInUSD: number) => number;
  formatPrice: (priceInUSD: number) => string;
  getCurrencySymbol: () => string;
}

export const useCurrencyStore = create<CurrencyStore>()(
  persist(
    (set, get) => ({
      selectedCurrency: "USD",

      setCurrency: (currency) => set({ selectedCurrency: currency }),

      convertPrice: (priceInUSD: number) => {
        const { selectedCurrency } = get();
        const rate = exchangeRates[selectedCurrency];
        return priceInUSD * rate;
      },

      formatPrice: (priceInUSD: number) => {
        const { selectedCurrency, convertPrice } = get();
        const currency = currencies.find((c) => c.code === selectedCurrency);
        const converted = convertPrice(priceInUSD);
        
        // Format based on currency
        if (selectedCurrency === "JPY" || selectedCurrency === "NGN") {
          return `${currency?.symbol}${Math.round(converted).toLocaleString()}`;
        }
        
        return `${currency?.symbol}${converted.toFixed(2)}`;
      },

      getCurrencySymbol: () => {
        const { selectedCurrency } = get();
        return currencies.find((c) => c.code === selectedCurrency)?.symbol || "$";
      },
    }),
    {
      name: "shopbot-currency",
    }
  )
);
