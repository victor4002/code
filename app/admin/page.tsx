"use client";

import { motion } from "framer-motion";
import {
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
  Package,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";

const stats = [
  {
    title: "Total Revenue",
    value: "$12,450",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "from-[#10b981] to-[#06b6d4]",
  },
  {
    title: "Orders",
    value: "156",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingCart,
    color: "from-[#6366f1] to-[#8b5cf6]",
  },
  {
    title: "Customers",
    value: "1,234",
    change: "+15.3%",
    trend: "up",
    icon: Users,
    color: "from-[#f59e0b] to-[#ef4444]",
  },
  {
    title: "Products",
    value: "48",
    change: "+2",
    trend: "up",
    icon: Package,
    color: "from-[#06b6d4] to-[#3b82f6]",
  },
];

const recentOrders = [
  { id: "SHOP-12345", customer: "john@example.com", amount: 149, status: "paid", date: "2 min ago" },
  { id: "SHOP-12344", customer: "sarah@example.com", amount: 79, status: "paid", date: "15 min ago" },
  { id: "SHOP-12343", customer: "mike@example.com", amount: 199, status: "pending", date: "1 hour ago" },
  { id: "SHOP-12342", customer: "emma@example.com", amount: 49, status: "paid", date: "2 hours ago" },
  { id: "SHOP-12341", customer: "alex@example.com", amount: 299, status: "failed", date: "3 hours ago" },
];

const topProducts = [
  { name: "Ultimate Notion Template", sales: 128, revenue: 6272 },
  { name: "SaaS Starter Kit", sales: 85, revenue: 16915 },
  { name: "Design System Pro", sales: 256, revenue: 20224 },
  { name: "Freelance Masterclass", sales: 312, revenue: 46488 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-[#f5f5f5] mb-2">Dashboard</h1>
        <p className="text-[#a3a3a3]">
          Welcome back! Here&apos;s what&apos;s happening with your store.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[#a3a3a3] text-sm">{stat.title}</p>
                    <p className="text-2xl font-bold text-[#f5f5f5] mt-1">
                      {stat.value}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      {stat.trend === "up" ? (
                        <ArrowUpRight className="w-4 h-4 text-[#10b981]" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-[#ef4444]" />
                      )}
                      <span
                        className={`text-sm ${
                          stat.trend === "up" ? "text-[#10b981]" : "text-[#ef4444]"
                        }`}
                      >
                        {stat.change}
                      </span>
                      <span className="text-[#737373] text-sm">vs last month</span>
                    </div>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      {/* Charts & Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#f5f5f5]">Recent Orders</h2>
              <GradientButton size="sm" variant="secondary">
                View All
              </GradientButton>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-left py-3 px-4 text-[#737373] font-medium text-sm">
                      Order ID
                    </th>
                    <th className="text-left py-3 px-4 text-[#737373] font-medium text-sm">
                      Customer
                    </th>
                    <th className="text-left py-3 px-4 text-[#737373] font-medium text-sm">
                      Amount
                    </th>
                    <th className="text-left py-3 px-4 text-[#737373] font-medium text-sm">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-[#737373] font-medium text-sm">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-white/[0.06] last:border-0 hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="py-4 px-4 text-[#6366f1] font-medium">
                        #{order.id}
                      </td>
                      <td className="py-4 px-4 text-[#a3a3a3]">{order.customer}</td>
                      <td className="py-4 px-4 text-[#f5f5f5] font-medium">
                        ${order.amount}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            order.status === "paid"
                              ? "bg-[#10b981]/10 text-[#10b981]"
                              : order.status === "pending"
                              ? "bg-[#f59e0b]/10 text-[#f59e0b]"
                              : "bg-[#ef4444]/10 text-[#ef4444]"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-[#737373] text-sm">
                        {order.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </motion.div>

        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#f5f5f5]">Top Products</h2>
              <TrendingUp className="w-5 h-5 text-[#10b981]" />
            </div>

            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div
                  key={product.name}
                  className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366f1] to-[#06b6d4] flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#f5f5f5] font-medium truncate">
                      {product.name}
                    </p>
                    <p className="text-[#737373] text-sm">{product.sales} sales</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#f5f5f5] font-medium">
                      ${product.revenue.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
