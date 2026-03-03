"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Github,
  Chrome,
  User,
  CheckCircle,
  Sparkles,
  Gift,
  Clock,
} from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { Badge } from "@/components/ui/badge";
import { useUIStore } from "@/lib/stores/ui-store";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const { addToast } = useUIStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreedToTerms) {
      addToast({
        title: "Terms Required",
        description: "Please agree to the terms and conditions",
        type: "warning",
      });
      return;
    }

    setIsLoading(true);

    // Simulate registration
    await new Promise((resolve) => setTimeout(resolve, 1500));

    addToast({
      title: "Account Created!",
      description: "Welcome to ShopBot! Check your email to verify your account.",
      type: "success",
    });

    setIsLoading(false);
    window.location.href = "/";
  };

  const handleSocialSignup = (provider: string) => {
    addToast({
      title: `${provider} Sign Up`,
      description: `Redirecting to ${provider}...`,
      type: "info",
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-20 flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -right-32 w-96 h-96 bg-[#6366f1]/30 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 -left-32 w-96 h-96 bg-[#06b6d4]/30 rounded-full blur-[120px]"
        />
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Features */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:block order-1"
          >
            <div className="space-y-8">
              <div>
                <Badge variant="gradient" className="mb-4">New Member Benefits</Badge>
                <h2 className="text-4xl font-bold text-[#f5f5f5] mb-4">
                  Join ShopBot{" "}
                  <span className="gradient-text">Today</span>
                </h2>
                <p className="text-[#a3a3a3] text-lg">
                  Create an account to unlock exclusive benefits and start your digital journey.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: Gift,
                    title: "Welcome Discount",
                    description: "Get 20% off your first purchase when you sign up",
                    color: "from-[#f59e0b] to-[#ef4444]",
                  },
                  {
                    icon: Clock,
                    title: "Early Access",
                    description: "Be the first to know about new products and sales",
                    color: "from-[#10b981] to-[#06b6d4]",
                  },
                  {
                    icon: Sparkles,
                    title: "AI-Powered Search",
                    description: "Find exactly what you need with intelligent recommendations",
                    color: "from-[#6366f1] to-[#8b5cf6]",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-[#f5f5f5] font-semibold text-lg mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-[#737373]">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Testimonial */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="p-6 bg-[#1a1a1a]/50 rounded-2xl border border-white/[0.06]"
              >
                <p className="text-[#a3a3a3] italic mb-4">
                  &ldquo;ShopBot has completely transformed how I find digital products. 
                  The AI recommendations are spot on!&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6366f1] to-[#06b6d4] flex items-center justify-center text-white font-semibold">
                    JD
                  </div>
                  <div>
                    <p className="text-[#f5f5f5] font-medium">John Doe</p>
                    <p className="text-[#737373] text-sm">Verified Buyer</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="order-2"
          >
            <GlassCard className="p-8 sm:p-10">
              {/* Header */}
              <div className="text-center mb-8">
                <Link href="/" className="inline-flex items-center gap-2 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#06b6d4] flex items-center justify-center">
                    <Image
                      src="/logo.svg"
                      alt="ShopBot"
                      width={32}
                      height={32}
                      className="w-8 h-8"
                    />
                  </div>
                  <span className="text-[#f5f5f5] font-bold text-2xl">
                    Shop<span className="gradient-text">Bot</span>
                  </span>
                </Link>
                <h1 className="text-2xl font-bold text-[#f5f5f5] mb-2">
                  Create Your Account
                </h1>
                <p className="text-[#a3a3a3]">
                  Join thousands of happy customers
                </p>
              </div>

              {/* Social Signup */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  onClick={() => handleSocialSignup("Google")}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-[#1a1a1a] border border-white/[0.06] rounded-xl text-[#f5f5f5] hover:border-white/[0.12] transition-colors"
                >
                  <Chrome className="w-5 h-5 text-[#ea4335]" />
                  <span className="text-sm">Google</span>
                </button>
                <button
                  onClick={() => handleSocialSignup("GitHub")}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-[#1a1a1a] border border-white/[0.06] rounded-xl text-[#f5f5f5] hover:border-white/[0.12] transition-colors"
                >
                  <Github className="w-5 h-5" />
                  <span className="text-sm">GitHub</span>
                </button>
              </div>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/[0.06]" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-[#1a1a1a] text-[#737373]">
                    Or sign up with email
                  </span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-[#a3a3a3] text-sm mb-2 block">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#737373]" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full pl-12 pr-4 py-3 bg-[#0a0a0a] border border-white/[0.06] rounded-xl text-[#f5f5f5] placeholder-[#737373] focus:outline-none focus:border-[#6366f1] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[#a3a3a3] text-sm mb-2 block">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#737373]" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-12 pr-4 py-3 bg-[#0a0a0a] border border-white/[0.06] rounded-xl text-[#f5f5f5] placeholder-[#737373] focus:outline-none focus:border-[#6366f1] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[#a3a3a3] text-sm mb-2 block">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#737373]" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-12 py-3 bg-[#0a0a0a] border border-white/[0.06] rounded-xl text-[#f5f5f5] placeholder-[#737373] focus:outline-none focus:border-[#6366f1] transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#737373] hover:text-[#a3a3a3] transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  
                  {/* Password Strength */}
                  {password && (
                    <div className="mt-2">
                      <div className="flex gap-1 mb-1">
                        {[1, 2, 3, 4].map((level) => (
                          <div
                            key={level}
                            className={`h-1 flex-1 rounded-full transition-colors ${
                              password.length >= level * 2
                                ? level <= 2
                                  ? "bg-[#ef4444]"
                                  : level === 3
                                  ? "bg-[#f59e0b]"
                                  : "bg-[#10b981]"
                                : "bg-[#1a1a1a]"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-[#737373]">
                        Password should be at least 8 characters
                      </p>
                    </div>
                  )}
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="w-5 h-5 mt-0.5 rounded border-white/[0.06] bg-[#0a0a0a] text-[#6366f1] focus:ring-[#6366f1] focus:ring-offset-0"
                  />
                  <span className="text-[#a3a3a3] text-sm">
                    I agree to the{" "}
                    <Link href="/terms" className="text-[#6366f1] hover:text-[#06b6d4]">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-[#6366f1] hover:text-[#06b6d4]">
                      Privacy Policy
                    </Link>
                  </span>
                </label>

                <GradientButton
                  type="submit"
                  className="w-full"
                  size="lg"
                  loading={isLoading}
                >
                  Create Account
                  <ArrowRight className="w-5 h-5" />
                </GradientButton>
              </form>

              {/* Footer */}
              <p className="text-center text-[#a3a3a3] text-sm mt-6">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-[#6366f1] hover:text-[#06b6d4] font-medium transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
