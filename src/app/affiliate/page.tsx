"use client"

import {
  DollarSign,
  TrendingUp,
  ShoppingBag,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Building,
} from "lucide-react"
import Link from "next/link"
import { useAffiliate } from "./context"

// Mock data for different views
const affiliateStats = {
  totalEarnings: "$142,847.50",
  unpaidBalance: "$3,247.80",
  totalOrders: "1,847",
  nextPayout: "Feb 1",
  earningsChange: "+12.5%",
  ordersChange: "+8.2%",
}

const brandStats: Record<string, typeof affiliateStats> = {
  hoa: {
    totalEarnings: "$45,231.00",
    unpaidBalance: "$1,523.40",
    totalOrders: "523",
    nextPayout: "Feb 1",
    earningsChange: "+15.2%",
    ordersChange: "+10.1%",
  },
  tpm: {
    totalEarnings: "$28,450.00",
    unpaidBalance: "$845.20",
    totalOrders: "312",
    nextPayout: "Feb 1",
    earningsChange: "+8.7%",
    ordersChange: "+5.3%",
  },
  ps: {
    totalEarnings: "$0.00",
    unpaidBalance: "$0.00",
    totalOrders: "0",
    nextPayout: "—",
    earningsChange: "0%",
    ordersChange: "0%",
  },
}

const brandEarningsAll = [
  { id: "hoa", name: "House of Aminos", earnings: "$45,231.00", orders: 523, percentage: 52 },
  { id: "tpm", name: "TPM", earnings: "$28,450.00", orders: 312, percentage: 33 },
  { id: "ps", name: "Peptide Sciences", earnings: "$0.00", orders: 0, percentage: 0, status: "disconnected" },
]

const recentOrdersAll = [
  { id: "HOA-4521", brand: "hoa", brandName: "House of Aminos", customer: "John Smith", amount: "$289.97", commission: "$28.99", status: "completed", date: "2 hours ago" },
  { id: "TPM-1234", brand: "tpm", brandName: "TPM", customer: "Sarah Johnson", amount: "$149.99", commission: "$15.00", status: "completed", date: "4 hours ago" },
  { id: "HOA-4520", brand: "hoa", brandName: "House of Aminos", customer: "Mike Williams", amount: "$459.95", commission: "$45.99", status: "processing", date: "6 hours ago" },
  { id: "TPM-0892", brand: "tpm", brandName: "TPM", customer: "Emily Brown", amount: "$199.98", commission: "$20.00", status: "completed", date: "8 hours ago" },
  { id: "HOA-4519", brand: "hoa", brandName: "House of Aminos", customer: "David Lee", amount: "$324.50", commission: "$32.45", status: "completed", date: "12 hours ago" },
]

// Mini chart data
const chartData = [30, 45, 35, 50, 40, 60, 55, 70, 65, 80, 75, 90]

function MiniChart() {
  const max = Math.max(...chartData)
  const min = Math.min(...chartData)
  const range = max - min

  return (
    <div className="h-32 flex items-end gap-1">
      {chartData.map((value, i) => {
        const height = ((value - min) / range) * 100
        const isLast = i === chartData.length - 1
        return (
          <div
            key={i}
            className={`flex-1 rounded-t transition-all ${
              isLast ? "bg-gradient-to-t from-coral to-coral/50" : "bg-white/10 hover:bg-white/20"
            }`}
            style={{ height: `${height}%` }}
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
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Completed
        </span>
      )
    case "processing":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-400 ring-1 ring-inset ring-amber-500/20">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
          Processing
        </span>
      )
    default:
      return (
        <span className="inline-flex items-center rounded-full bg-white/5 px-2.5 py-1 text-xs font-medium text-white/50 ring-1 ring-inset ring-white/10">
          {status}
        </span>
      )
  }
}

export default function AffiliateEarningsPage() {
  const { user, getSelectedBrand } = useAffiliate()
  
  if (!user) return null

  const isAffiliate = user.role === "affiliate"
  const selectedBrand = getSelectedBrand()
  
  // Get stats based on role and selection
  const stats = selectedBrand 
    ? brandStats[selectedBrand.id] || affiliateStats
    : isAffiliate 
      ? affiliateStats 
      : brandStats[user.brands[0]?.id] || affiliateStats

  // Filter brand earnings (affiliates only, when not filtered)
  const brandEarnings = isAffiliate && !selectedBrand
    ? brandEarningsAll.filter(b => user.brands.some(ub => ub.id === b.id))
    : null

  // Filter orders based on selection
  const recentOrders = selectedBrand
    ? recentOrdersAll.filter(o => o.brand === selectedBrand.id)
    : isAffiliate
      ? recentOrdersAll.filter(o => user.brands.some(b => b.id === o.brand))
      : recentOrdersAll.filter(o => o.brand === user.brands[0]?.id)

  const statCards = [
    {
      label: "Total Earnings",
      value: stats.totalEarnings,
      change: stats.earningsChange,
      positive: !stats.earningsChange.startsWith("-"),
      icon: DollarSign,
      description: "Lifetime earnings",
      gradient: "from-emerald-500/60 to-teal-500/40",
      iconBg: "bg-gradient-to-br from-emerald-500 to-teal-500",
    },
    {
      label: "Unpaid Balance",
      value: stats.unpaidBalance,
      change: null,
      positive: true,
      icon: TrendingUp,
      description: `Next payout: ${stats.nextPayout}`,
      gradient: "from-amber-500/60 to-orange-500/40",
      iconBg: "bg-gradient-to-br from-amber-500 to-orange-500",
    },
    {
      label: "Total Orders",
      value: stats.totalOrders,
      change: stats.ordersChange,
      positive: !stats.ordersChange.startsWith("-"),
      icon: ShoppingBag,
      description: "All time",
      gradient: "from-navy/60 to-sky-500/40",
      iconBg: "bg-gradient-to-br from-navy to-sky-600",
    },
    {
      label: "Next Payout",
      value: stats.nextPayout,
      change: null,
      positive: true,
      icon: Calendar,
      description: stats.nextPayout !== "—" ? "In 5 days" : "No orders yet",
      gradient: "from-violet-500/60 to-purple-500/40",
      iconBg: "bg-gradient-to-br from-violet-500 to-purple-500",
    },
  ]

  return (
    <div className="min-h-full bg-[#050510] text-white">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(10,69,145,0.08),transparent)]" />
      </div>

      <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-bricolage text-xl sm:text-2xl font-semibold text-white">
              {selectedBrand ? `${selectedBrand.name} Earnings` : "Earnings Overview"}
            </h2>
            <p className="text-sm text-white/50 mt-1">
              {selectedBrand 
                ? `Performance for ${selectedBrand.name}`
                : isAffiliate 
                  ? "Combined earnings across all your brands" 
                  : "Track your performance and earnings"
              }
            </p>
          </div>
          {selectedBrand && (
            <span className={`self-start inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
              selectedBrand.status === "connected"
                ? "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20"
                : "bg-white/5 text-white/50 ring-white/10"
            }`}>
              <span className={`h-1.5 w-1.5 rounded-full ${selectedBrand.status === "connected" ? "bg-emerald-400" : "bg-white/50"}`} />
              {selectedBrand.status === "connected" ? "Connected" : "Disconnected"}
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => (
            <div
              key={stat.label}
              className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 hover:bg-white/[0.04] transition-all duration-300 border-gradient overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className="relative z-10">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-white/40 uppercase tracking-wider">{stat.label}</p>
                    <p className="font-bricolage text-2xl lg:text-3xl font-semibold text-white mt-1 truncate">{stat.value}</p>
                    <div className="flex flex-wrap items-center gap-1 mt-2">
                      {stat.change && stat.change !== "0%" && (
                        <span className={`flex items-center text-xs font-medium ${stat.positive ? "text-emerald-400" : "text-coral"}`}>
                          {stat.positive ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
                          {stat.change}
                        </span>
                      )}
                      <span className="text-xs text-white/40 truncate">{stat.description}</span>
                    </div>
                  </div>
                  <div className={`hidden sm:flex size-10 lg:size-12 items-center justify-center rounded-xl ${stat.iconBg} shadow-lg shrink-0`}>
                    <stat.icon className="size-5 lg:size-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Earnings Chart */}
          <div className={`rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden border-gradient ${brandEarnings ? "lg:col-span-2" : "lg:col-span-3"}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-5 sm:p-6 border-b border-white/[0.06]">
              <div>
                <h3 className="font-bricolage text-lg font-semibold text-white">Earnings Trend</h3>
                <p className="text-xs text-white/40">Last 12 months</p>
              </div>
              <div className="sm:text-right">
                <p className="font-bricolage text-xl sm:text-2xl font-semibold text-white">
                  {selectedBrand ? "$4,523" : "$12,847"}
                </p>
                <p className="text-xs text-emerald-400 flex items-center sm:justify-end">
                  <ArrowUpRight className="size-3.5" />
                  +18.2% this month
                </p>
              </div>
            </div>
            <div className="p-5 sm:p-6">
              <MiniChart />
              <div className="flex justify-between mt-3 text-[10px] text-white/30 overflow-x-auto">
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
                <span>Sep</span>
                <span>Oct</span>
                <span>Nov</span>
                <span>Dec</span>
                <span>Jan</span>
              </div>
            </div>
          </div>

          {/* Earnings by Brand (Affiliates only, when not filtered) */}
          {brandEarnings && (
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden border-gradient">
              <div className="p-5 sm:p-6 border-b border-white/[0.06]">
                <h3 className="font-bricolage text-lg font-semibold text-white">Earnings by Brand</h3>
              </div>
              <div className="p-5 sm:p-6 space-y-5">
                {brandEarnings.map((brand) => (
                  <div key={brand.id} className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className={`size-2 rounded-full shrink-0 ${
                            brand.status === "disconnected" ? "bg-white/30" : "bg-emerald-400"
                          }`}
                        />
                        <span className="font-medium text-white text-sm truncate">{brand.name}</span>
                      </div>
                      <span className="font-mono text-sm font-semibold text-emerald-400 shrink-0">{brand.earnings}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-navy to-sky-500 rounded-full"
                          style={{ width: `${brand.percentage}%` }}
                        />
                      </div>
                      <span className="text-xs text-white/40 w-10 text-right shrink-0">
                        {brand.percentage}%
                      </span>
                    </div>
                    <p className="text-xs text-white/30">{brand.orders} orders</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Recent Orders */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden border-gradient">
          <div className="flex items-center justify-between p-5 sm:p-6 border-b border-white/[0.06]">
            <h3 className="font-bricolage text-lg font-semibold text-white">Recent Orders</h3>
            <Link
              href="/affiliate/orders"
              className="group flex items-center gap-1 text-xs font-medium text-white/50 hover:text-white transition-colors"
            >
              View all
              <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            {recentOrders.length === 0 ? (
              <div className="p-12 text-center">
                <Building className="size-12 mx-auto text-white/20 mb-3" />
                <p className="text-white/50">No orders yet</p>
                <p className="text-sm text-white/30">Orders will appear here once your store is connected</p>
              </div>
            ) : (
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="px-5 sm:px-6 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-white/40">Order</th>
                    {isAffiliate && !selectedBrand && (
                      <th className="px-5 sm:px-6 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-white/40">Brand</th>
                    )}
                    <th className="px-5 sm:px-6 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-white/40">Customer</th>
                    <th className="px-5 sm:px-6 py-3 text-right text-[11px] font-medium uppercase tracking-wider text-white/40">Amount</th>
                    <th className="px-5 sm:px-6 py-3 text-right text-[11px] font-medium uppercase tracking-wider text-white/40">Commission</th>
                    <th className="px-5 sm:px-6 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-white/40">Status</th>
                    <th className="px-5 sm:px-6 py-3 text-right text-[11px] font-medium uppercase tracking-wider text-white/40">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.slice(0, 5).map((order) => (
                    <tr key={order.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 sm:px-6 py-4">
                        <span className="font-mono font-medium text-white text-sm">{order.id}</span>
                      </td>
                      {isAffiliate && !selectedBrand && (
                        <td className="px-5 sm:px-6 py-4">
                          <span className="text-sm text-white/50">{order.brandName}</span>
                        </td>
                      )}
                      <td className="px-5 sm:px-6 py-4 text-sm text-white/70">{order.customer}</td>
                      <td className="px-5 sm:px-6 py-4 text-right">
                        <span className="font-mono text-sm text-white">{order.amount}</span>
                      </td>
                      <td className="px-5 sm:px-6 py-4 text-right">
                        <span className="font-mono text-sm font-medium text-emerald-400">{order.commission}</span>
                      </td>
                      <td className="px-5 sm:px-6 py-4">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="px-5 sm:px-6 py-4 text-right text-sm text-white/40 whitespace-nowrap">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
