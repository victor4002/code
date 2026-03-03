"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Sparkles, Zap, Shield, Download } from "lucide-react";
import { MagneticButton } from "@/components/effects/magnetic-button";
import { TiltCard } from "@/components/effects/tilt-card";
import { TextScramble } from "@/components/effects/text-scramble";
import Image from "next/image";

const stats = [
  { value: "10K+", label: "Downloads", icon: Download },
  { value: "99.9%", label: "Uptime", icon: Shield },
  { value: "4.9", label: "Rating", icon: Sparkles },
];

const features = [
  { icon: Zap, text: "Instant Delivery" },
  { icon: Shield, text: "Secure Payment" },
  { icon: Download, text: "Lifetime Access" },
];

export function HeroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Parallax Background Elements */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Floating geometric shapes */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-[10%] w-20 h-20 border border-[#00f5ff]/20 rounded-lg"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/3 right-[15%] w-16 h-16 border border-[#ff00ff]/20 rounded-full"
        />
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, 10, 0],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-[25%] w-12 h-12 border border-[#b829dd]/20 rotate-45"
        />
      </motion.div>

      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Glitch Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111118]/80 border border-[#00f5ff]/20 mb-6 glitch"
              data-text="NEXT GEN MARKETPLACE"
            >
              <Sparkles className="w-4 h-4 text-[#00f5ff]" />
              <span className="text-[#00f5ff] text-sm font-medium tracking-wider uppercase">
                <TextScramble text="NEXT GEN MARKETPLACE" duration={1000} />
              </span>
            </motion.div>

            {/* Main Headline with gradient animation */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]"
            >
              <span className="text-white">Digital</span>
              <br />
              <span className="gradient-text">Excellence</span>
              <br />
              <span className="text-white/80">Delivered</span>
            </motion.h1>

            {/* Animated subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg sm:text-xl text-[#a0a0b0] max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              Premium eBooks, templates & tools. 
              <span className="text-[#00f5ff]"> Instant download.</span> 
              <span className="text-[#ff00ff]"> Lifetime access.</span>
            </motion.p>

            {/* Feature pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-10"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#111118]/60 border border-white/5"
                >
                  <feature.icon className="w-4 h-4 text-[#00f5ff]" />
                  <span className="text-sm text-[#a0a0b0]">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <MagneticButton href="/products" variant="primary">
                <span className="flex items-center gap-2">
                  Explore Products
                  <ArrowRight className="w-5 h-5" />
                </span>
              </MagneticButton>
              <MagneticButton href="/categories" variant="secondary">
                View Categories
              </MagneticButton>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center justify-center lg:justify-start gap-8 mt-12 pt-8 border-t border-white/5"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-[#606070] uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - 3D Product Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative perspective-1000">
              {/* Main featured card with 3D tilt */}
              <TiltCard className="relative z-10" tiltAmount={8}>
                <div className="glass-card p-6">
                  {/* Holographic effect overlay */}
                  <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-br from-[#00f5ff]/5 via-transparent to-[#ff00ff]/5 pointer-events-none" />
                  
                  {/* Product image */}
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-6">
                    <Image
                      src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80"
                      alt="Featured Digital Product"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent" />
                    
                    {/* Floating badge */}
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-[#00f5ff] to-[#b829dd] text-black text-xs font-bold"
                    >
                      BESTSELLER
                    </motion.div>
                  </div>

                  {/* Product info */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-[#00f5ff] text-sm font-medium mb-1 uppercase tracking-wider">
                        Premium Template
                      </p>
                      <h3 className="text-white text-xl font-bold">
                        Ultimate Design System
                      </h3>
                      <p className="text-[#606070] text-sm mt-1">
                        500+ components, dark mode, fully responsive
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold gradient-text">$49</span>
                        <span className="text-[#606070] line-through">$99</span>
                        <span className="text-[#ff00ff] text-sm">-50%</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <motion.svg
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8 + i * 0.1 }}
                            className="w-4 h-4 text-[#00f5ff]"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </motion.svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>

              {/* Floating secondary cards */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 2, 0],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-8 -right-8 w-32 h-32 glass-card p-4 z-20"
              >
                <div className="text-3xl font-bold gradient-text">500+</div>
                <div className="text-xs text-[#606070]">Components</div>
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, -2, 0],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-4 w-36 glass-card p-4 z-20"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#00f5ff] animate-pulse" />
                  <span className="text-xs text-[#00f5ff]">Live Preview</span>
                </div>
                <div className="text-xs text-[#606070] mt-1">Try before you buy</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-[#606070] uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#00f5ff] to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
