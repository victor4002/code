"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "dark" | "light" | "system";

interface ThemeStore {
  theme: Theme;
  resolvedTheme: "dark" | "light";
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  initTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: "system",
      resolvedTheme: "dark",

      setTheme: (theme) => {
        set({ theme });
        get().initTheme();
      },

      toggleTheme: () => {
        const currentTheme = get().theme;
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        set({ theme: newTheme });
        get().initTheme();
      },

      initTheme: () => {
        const { theme } = get();
        const root = document.documentElement;
        
        let resolvedTheme: "dark" | "light";
        
        if (theme === "system") {
          resolvedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
        } else {
          resolvedTheme = theme;
        }
        
        set({ resolvedTheme });
        
        if (resolvedTheme === "dark") {
          root.removeAttribute("data-theme");
        } else {
          root.setAttribute("data-theme", "light");
        }
      },
    }),
    {
      name: "shopbot-theme",
    }
  )
);
