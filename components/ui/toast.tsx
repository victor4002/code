"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle, ShoppingBag, Trash2, Tag } from "lucide-react";
import { useUIStore, ToastType } from "@/lib/stores/ui-store";
import { cn } from "@/lib/utils";

const toastIcons: Record<ToastType, React.ElementType> = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
  cart: ShoppingBag,
  remove: Trash2,
  discount: Tag,
};

const toastStyles: Record<ToastType, string> = {
  success: "from-[#10b981]/20 to-[#00f5ff]/10 border-[#10b981]/40 text-[#10b981]",
  error: "from-[#ef4444]/20 to-[#ff00ff]/10 border-[#ef4444]/40 text-[#ef4444]",
  warning: "from-[#f59e0b]/20 to-[#ff00ff]/10 border-[#f59e0b]/40 text-[#f59e0b]",
  info: "from-[#00f5ff]/20 to-[#b829dd]/10 border-[#00f5ff]/40 text-[#00f5ff]",
  cart: "from-[#00f5ff]/20 to-[#b829dd]/10 border-[#00f5ff]/40 text-[#00f5ff]",
  remove: "from-[#ff00ff]/20 to-[#ef4444]/10 border-[#ff00ff]/40 text-[#ff00ff]",
  discount: "from-[#b829dd]/20 to-[#00f5ff]/10 border-[#b829dd]/40 text-[#b829dd]",
};

export function ToastContainer() {
  const { toasts, removeToast } = useUIStore();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => {
          const Icon = toastIcons[toast.type];
          return (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.9 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className={cn(
                "pointer-events-auto flex items-start gap-3 px-5 py-4 rounded-xl border bg-gradient-to-r backdrop-blur-xl min-w-[320px] max-w-[420px] shadow-2xl",
                toastStyles[toast.type]
              )}
            >
              {/* Icon with glow */}
              <div className="relative">
                <Icon className="w-5 h-5 mt-0.5 flex-shrink-0 relative z-10" />
                <div className={cn(
                  "absolute inset-0 blur-lg opacity-50",
                  toast.type === "success" && "bg-[#10b981]",
                  toast.type === "error" && "bg-[#ef4444]",
                  toast.type === "warning" && "bg-[#f59e0b]",
                  toast.type === "info" && "bg-[#00f5ff]",
                  toast.type === "cart" && "bg-[#00f5ff]",
                  toast.type === "remove" && "bg-[#ff00ff]",
                  toast.type === "discount" && "bg-[#b829dd]",
                )} />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-white">{toast.title}</p>
                {toast.description && (
                  <p className="text-sm text-[#a0a0b0] mt-1">{toast.description}</p>
                )}
                {toast.action && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={toast.action.onClick}
                    className="mt-3 px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors"
                  >
                    {toast.action.label}
                  </motion.button>
                )}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => removeToast(toast.id)}
                className="text-[#606070] hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
