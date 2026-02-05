"use client"

import { useState } from "react"
import {
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react"

const promoterOrders = [
  {
    id: "HOA-4521",
    date: "Jan 27, 2026",
    customer: "John",
    codeUsed: "ASHTON20",
    orderTotal: "$289.97",
    commission: "$14.50",
    status: "completed",
  },
  {
    id: "HOA-4519",
    date: "Jan 26, 2026",
    customer: "Customer",
    codeUsed: "ASHTON20",
    orderTotal: "$459.95",
    commission: "$23.00",
    status: "completed",
  },
  {
    id: "HOA-4515",
    date: "Jan 25, 2026",
    customer: "Sarah",
    codeUsed: "ASHTON20",
    orderTotal: "$149.99",
    commission: "$7.50",
    status: "processing",
  },
  {
    id: "HOA-4512",
    date: "Jan 24, 2026",
    customer: "Mike",
    codeUsed: "ASHTON20",
    orderTotal: "$379.96",
    commission: "$19.00",
    status: "completed",
  },
  {
    id: "HOA-4508",
    date: "Jan 23, 2026",
    customer: "Customer",
    codeUsed: "ASHTONVIP",
    orderTotal: "$89.99",
    commission: "$4.50",
    status: "refunded",
  },
  {
    id: "HOA-4502",
    date: "Jan 22, 2026",
    customer: "Emily",
    codeUsed: "ASHTON20",
    orderTotal: "$199.98",
    commission: "$10.00",
    status: "completed",
  },
  {
    id: "HOA-4498",
    date: "Jan 21, 2026",
    customer: "David",
    codeUsed: "ASHTON20",
    orderTotal: "$324.50",
    commission: "$16.23",
    status: "completed",
  },
  {
    id: "HOA-4491",
    date: "Jan 20, 2026",
    customer: "Customer",
    codeUsed: "ASHTONVIP",
    orderTotal: "$529.00",
    commission: "$26.45",
    status: "completed",
  },
]

const stats = {
  totalOrders: 45,
  totalRevenue: "$12,847.50",
  totalCommission: "$642.38",
}

function getStatusBadge(status: string) {
  switch (status) {
    case "completed":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Completed
        </span>
      )
    case "processing":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-400 ring-1 ring-inset ring-amber-500/20">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
          Processing
        </span>
      )
    case "refunded":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 text-xs font-medium text-white/50 ring-1 ring-inset ring-white/10">
          Refunded
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

export default function PromoterOrdersPage() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [codeFilter, setCodeFilter] = useState("all")

  // Filter orders
  let filteredOrders = promoterOrders
  if (statusFilter !== "all") {
    filteredOrders = filteredOrders.filter(o => o.status === statusFilter)
  }
  if (codeFilter !== "all") {
    filteredOrders = filteredOrders.filter(o => o.codeUsed === codeFilter)
  }

  // Get unique codes for filter
  const uniqueCodes = [...new Set(promoterOrders.map(o => o.codeUsed))]

  const statCards = [
    { label: "Total Orders", value: stats.totalOrders.toString(), icon: ShoppingBag, gradient: "from-navy/60 to-sky-500/40", iconBg: "bg-gradient-to-br from-navy to-sky-600" },
    { label: "Revenue Generated", value: stats.totalRevenue, icon: DollarSign, gradient: "from-violet-500/60 to-purple-500/40", iconBg: "bg-gradient-to-br from-violet-500 to-purple-500" },
    { label: "My Earnings", value: stats.totalCommission, icon: TrendingUp, gradient: "from-coral/60 to-pink-500/40", iconBg: "bg-gradient-to-br from-coral to-pink-500", valueClass: "text-coral" },
  ]

  return (
    <div className="min-h-full text-white">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(235,92,106,0.06),transparent)]" />
      </div>

      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-bricolage text-2xl font-semibold text-white">Orders</h1>
          <p className="text-sm text-white/50 mt-1">{stats.totalOrders} orders using your codes</p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
          {statCards.map((stat) => (
            <div
              key={stat.label}
              className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 hover:bg-white/[0.04] transition-all duration-300 border-gradient overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className="relative z-10 flex items-center gap-3">
                <div className={`flex size-11 items-center justify-center rounded-xl ${stat.iconBg} shadow-lg shrink-0`}>
                  <stat.icon className="size-5 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-white/40 uppercase tracking-wider">{stat.label}</p>
                  <p className={`font-bricolage text-xl font-semibold ${stat.valueClass || 'text-white'}`}>{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 border-gradient">
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-all">
              <Calendar className="size-4 text-white/50" />
              Date Range
            </button>
            <select
              value={codeFilter}
              onChange={(e) => setCodeFilter(e.target.value)}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-coral/50 cursor-pointer"
            >
              <option value="all" className="bg-[#0a0a14] text-white">All Codes</option>
              {uniqueCodes.map(code => (
                <option key={code} value={code} className="bg-[#0a0a14] text-white">{code}</option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-coral/50 cursor-pointer"
            >
              <option value="all" className="bg-[#0a0a14] text-white">All Status</option>
              <option value="completed" className="bg-[#0a0a14] text-white">Completed</option>
              <option value="processing" className="bg-[#0a0a14] text-white">Processing</option>
              <option value="refunded" className="bg-[#0a0a14] text-white">Refunded</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden border-gradient">
          {filteredOrders.length === 0 ? (
            <div className="p-12 text-center">
              <ShoppingBag className="size-12 mx-auto text-white/20 mb-3" />
              <p className="text-white/50">No orders found</p>
              <p className="text-sm text-white/30">Try adjusting your filters</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[650px]">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-white/40">Order</th>
                      <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-white/40">Date</th>
                      <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-white/40">Customer</th>
                      <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-white/40">Code</th>
                      <th className="px-5 py-3 text-right text-[11px] font-medium uppercase tracking-wider text-white/40">Total</th>
                      <th className="px-5 py-3 text-right text-[11px] font-medium uppercase tracking-wider text-coral/70">Earned</th>
                      <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-white/40">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors">
                        <td className="px-5 py-4">
                          <span className="font-mono font-semibold text-white">{order.id}</span>
                        </td>
                        <td className="px-5 py-4 text-sm text-white/50 whitespace-nowrap">{order.date}</td>
                        <td className="px-5 py-4 text-sm text-white/70">{order.customer}</td>
                        <td className="px-5 py-4">
                          <code className="px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-mono font-medium text-coral">
                            {order.codeUsed}
                          </code>
                        </td>
                        <td className="px-5 py-4 text-right text-sm font-medium text-white/70">{order.orderTotal}</td>
                        <td className="px-5 py-4 text-right">
                          <span className={`font-bold text-sm ${order.status === "refunded" ? "text-white/30 line-through" : "text-coral"}`}>
                            {order.commission}
                          </span>
                        </td>
                        <td className="px-5 py-4">{getStatusBadge(order.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <div className="flex items-center justify-between border-t border-white/[0.06] px-5 py-4">
                <p className="text-sm text-white/40">
                  Showing <span className="font-medium text-white/70">1-{filteredOrders.length}</span> of <span className="font-medium text-white/70">{stats.totalOrders}</span>
                </p>
                <div className="flex items-center gap-2">
                  <button 
                    disabled 
                    className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/30 cursor-not-allowed"
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                  <button className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 transition-all">
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
