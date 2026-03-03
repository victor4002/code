import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/products",
        destination: "/shop/products",
      },
      {
        source: "/products/:slug",
        destination: "/shop/products/:slug",
      },
      {
        source: "/categories",
        destination: "/shop/categories",
      },
      {
        source: "/cart",
        destination: "/shop/cart",
      },
      {
        source: "/checkout",
        destination: "/shop/checkout",
      },
      {
        source: "/success",
        destination: "/shop/success",
      },
      {
        source: "/login",
        destination: "/auth/login",
      },
      {
        source: "/register",
        destination: "/auth/register",
      },
    ];
  },
};

export default nextConfig;
