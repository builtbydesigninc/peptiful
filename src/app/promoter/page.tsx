"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Copy,
  Check,
  DollarSign,
  Hash,
  TrendingUp,
  Calendar,
  Share2,
  Twitter,
  Instagram,
  MessageCircle,
  ChevronRight,
  ShoppingBag,
  Tag,
  Sparkles,
} from "lucide-react"

const promoterData = {
  name: "Ashton",
  codes: [
    { code: "ASHTON20", discount: "20% off", status: "active" },
    { code: "ASHTONVIP", discount: "25% off", status: "active" },
  ],
  primaryCode: "ASHTON20",
  primaryDiscount: "20% off",
  totalUses: 145,
  currentEarnings: "$487.50",
  lifetimeEarnings: "$2,847.50",
  nextPayout: "Feb 1, 2026",
}

const recentOrders = [
  { id: "HOA-4521", customer: "John", amount: "$289.97", commission: "$14.50", status: "completed", time: "2 hours ago" },
  { id: "HOA-4519", customer: "Customer", amount: "$459.95", commission: "$23.00", status: "completed", time: "6 hours ago" },
  { id: "HOA-4515", customer: "Sarah", amount: "$149.99", commission: "$7.50", status: "processing", time: "Yesterday" },
  { id: "HOA-4512", customer: "Mike", amount: "$379.96", commission: "$19.00", status: "completed", time: "2 days ago" },
  { id: "HOA-4508", customer: "Customer", amount: "$89.99", commission: "$4.50", status: "refunded", time: "3 days ago" },
]

const recentActivity = [
  { id: 1, message: "Your code was used", amount: "$24.50", time: "2 hours ago" },
  { id: 2, message: "Your code was used", amount: "$18.75", time: "5 hours ago" },
  { id: 3, message: "Payout completed", amount: "$350.00", time: "Jan 20" },
]

const earningsData = [35, 42, 28, 55, 48, 62, 71, 58, 82, 76, 94, 87]

function MiniChart() {
  const max = Math.max(...earningsData)
  const min = Math.min(...earningsData)
  const range = max - min

  return (
    <div className="h-32 flex items-end gap-1.5">
      {earningsData.map((value, i) => {
        const height = ((value - min) / range) * 100
        const isLast = i === earningsData.length - 1
        return (
          <div
            key={i}
            className={`flex-1 rounded-t transition-all ${
              isLast ? "bg-gradient-to-t from-coral to-pink-500" : "bg-white/10 hover:bg-white/20"
            }`}
            style={{ height: `${Math.max(height, 10)}%` }}
          />
        )
      })}
    </div>
  )
}

function getStatusBadge(status: string) {
  switch (status) {
    case "completed":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
          <span className="h-1 w-1 rounded-full bg-emerald-400" />
          Done
        </span>
      )
    case "processing":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-400 ring-1 ring-inset ring-amber-500/20">
          <span className="h-1 w-1 rounded-full bg-amber-400 animate-pulse" />
          Pending
        </span>
      )
    case "refunded":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-medium text-white/50 ring-1 ring-inset ring-white/10">
          Refunded
        </span>
      )
    default:
      return (
        <span className="inline-flex items-center rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-medium text-white/50 ring-1 ring-inset ring-white/10">
          {status}
        </span>
      )
  }
}

export default function PromoterDashboardPage() {
  const [copied, setCopied] = useState(false)
  const [copiedShare, setCopiedShare] = useState(false)

  const copyCode = () => {
    navigator.clipboard.writeText(promoterData.primaryCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareText = `Use my code ${promoterData.primaryCode} for ${promoterData.primaryDiscount} on House of Aminos! 💪`
  
  const copyShareText = () => {
    navigator.clipboard.writeText(shareText)
    setCopiedShare(true)
    setTimeout(() => setCopiedShare(false), 2000)
  }

  const activeCodes = promoterData.codes.filter(c => c.status === "active")

  const stats = [
    { label: "Total Uses", value: promoterData.totalUses.toString(), icon: Hash, gradient: "from-navy/60 to-sky-500/40", iconBg: "bg-gradient-to-br from-navy to-sky-600" },
    { label: "This Period", value: promoterData.currentEarnings, icon: DollarSign, gradient: "from-emerald-500/60 to-teal-500/40", iconBg: "bg-gradient-to-br from-emerald-500 to-teal-500", valueClass: "text-emerald-400" },
    { label: "Lifetime Earnings", value: promoterData.lifetimeEarnings, icon: TrendingUp, gradient: "from-violet-500/60 to-purple-500/40", iconBg: "bg-gradient-to-br from-violet-500 to-purple-500" },
    { label: "Next Payout", value: promoterData.nextPayout, icon: Calendar, gradient: "from-amber-500/60 to-orange-500/40", iconBg: "bg-gradient-to-br from-amber-500 to-orange-500" },
  ]

  return (
    <div className="min-h-full text-white">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(235,92,106,0.06),transparent)]" />
      </div>

      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Big Code Card */}
        <div className="relative rounded-2xl overflow-hidden border border-coral/20 bg-gradient-to-br from-coral/20 via-pink-500/10 to-transparent">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(235,92,106,0.2)_0%,transparent_60%)]" />
          <div className="relative p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="size-4 text-coral" />
                  <p className="text-sm text-white/60">Your Promo Code</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bricolage text-4xl sm:text-5xl font-bold tracking-wider text-white">
                    {promoterData.primaryCode}
                  </span>
                  <button
                    onClick={copyCode}
                    className="flex size-12 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-all"
                  >
                    {copied ? <Check className="size-6 text-emerald-400" /> : <Copy className="size-6 text-white/70" />}
                  </button>
                </div>
                <p className="text-white/50 mt-2">{promoterData.primaryDiscount} for your followers</p>
              </div>
              {/* Multiple Codes Notice */}
              {activeCodes.length > 1 && (
                <Link 
                  href="/promoter/codes"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-all group"
                >
                  <Tag className="size-4 text-coral" />
                  <span className="text-sm font-medium text-white">
                    {activeCodes.length} active codes
                  </span>
                  <ChevronRight className="size-4 text-white/50 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 hover:bg-white/[0.04] transition-all duration-300 border-gradient overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className="relative z-10">
                <div className="flex items-center gap-3">
                  <div className={`flex size-10 items-center justify-center rounded-xl ${stat.iconBg} shadow-lg shrink-0`}>
                    <stat.icon className="size-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-white/40 uppercase tracking-wider truncate">{stat.label}</p>
                    <p className={`font-bricolage text-xl font-semibold ${stat.valueClass || 'text-white'}`}>{stat.value}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Orders */}
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden border-gradient">
              <div className="p-5 border-b border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="size-5 text-coral" />
                  <h3 className="font-bricolage text-lg font-semibold text-white">Recent Orders</h3>
                </div>
                <Link 
                  href="/promoter/orders"
                  className="flex items-center gap-1 text-sm text-white/50 hover:text-white transition-colors"
                >
                  View All <ChevronRight className="size-4" />
                </Link>
              </div>
              <div className="divide-y divide-white/[0.04]">
                {recentOrders.slice(0, 5).map((order) => (
                  <div key={order.id} className="px-5 py-3.5 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-medium text-white">{order.id}</span>
                          {getStatusBadge(order.status)}
                        </div>
                        <p className="text-xs text-white/40 truncate">
                          {order.customer} • {order.time}
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className={`text-sm font-bold ${order.status === "refunded" ? "text-white/30 line-through" : "text-coral"}`}>
                        +{order.commission}
                      </p>
                      <p className="text-xs text-white/40">{order.amount}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Earnings Chart */}
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden border-gradient">
              <div className="p-5 border-b border-white/[0.06]">
                <h3 className="font-bricolage text-lg font-semibold text-white">Earnings Trend</h3>
                <p className="text-xs text-white/40">Last 12 weeks</p>
              </div>
              <div className="p-5">
                <MiniChart />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Share Section */}
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden border-gradient">
              <div className="p-5 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <Share2 className="size-5 text-coral" />
                  <h3 className="font-bricolage text-lg font-semibold text-white">Share Your Code</h3>
                </div>
              </div>
              <div className="p-5 space-y-4">
                <div className="p-4 bg-white/[0.03] border border-white/[0.06] rounded-xl">
                  <p className="text-sm text-white/80">{shareText}</p>
                </div>
                <button
                  onClick={copyShareText}
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-all"
                >
                  {copiedShare ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
                  {copiedShare ? "Copied!" : "Copy Text"}
                </button>
                <div className="flex justify-center gap-3 pt-2">
                  <button className="flex size-10 items-center justify-center rounded-xl bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2]/20 transition-all">
                    <Twitter className="size-5" />
                  </button>
                  <button className="flex size-10 items-center justify-center rounded-xl bg-[#E4405F]/10 text-[#E4405F] hover:bg-[#E4405F]/20 transition-all">
                    <Instagram className="size-5" />
                  </button>
                  <button className="flex size-10 items-center justify-center rounded-xl bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-all">
                    <MessageCircle className="size-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden border-gradient">
              <div className="p-5 border-b border-white/[0.06]">
                <h3 className="font-bricolage text-lg font-semibold text-white">Recent Activity</h3>
              </div>
              <div className="divide-y divide-white/[0.04]">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="px-5 py-3.5 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                    <div>
                      <p className="text-sm font-medium text-white">{activity.message}</p>
                      <p className="text-xs text-white/40">{activity.time}</p>
                    </div>
                    <span className={`text-sm font-semibold ${
                      activity.message.includes("Payout") ? "text-sky-400" : "text-emerald-400"
                    }`}>
                      +{activity.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
