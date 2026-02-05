"use client"

import { useState } from "react"
import {
  Download,
  Search,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Building,
  Filter,
} from "lucide-react"
import { useAffiliate } from "../context"

const allOrders = [
  { id: "HOA-4521", brandId: "hoa", brand: "House of Aminos", customer: "John Smith", email: "john@email.com", amount: "$289.97", commission: "$28.99", status: "completed", date: "Jan 27, 2026" },
  { id: "TPM-1234", brandId: "tpm", brand: "TPM", customer: "Sarah Johnson", email: "sarah@email.com", amount: "$149.99", commission: "$15.00", status: "completed", date: "Jan 27, 2026" },
  { id: "HOA-4520", brandId: "hoa", brand: "House of Aminos", customer: "Mike Williams", email: "mike@email.com", amount: "$459.95", commission: "$45.99", status: "processing", date: "Jan 27, 2026" },
  { id: "TPM-0892", brandId: "tpm", brand: "TPM", customer: "Emily Brown", email: "emily@email.com", amount: "$199.98", commission: "$20.00", status: "completed", date: "Jan 26, 2026" },
  { id: "HOA-4519", brandId: "hoa", brand: "House of Aminos", customer: "David Lee", email: "david@email.com", amount: "$379.96", commission: "$38.00", status: "completed", date: "Jan 26, 2026" },
  { id: "TPM-1233", brandId: "tpm", brand: "TPM", customer: "Lisa Chen", email: "lisa@email.com", amount: "$219.98", commission: "$22.00", status: "completed", date: "Jan 26, 2026" },
  { id: "HOA-4518", brandId: "hoa", brand: "House of Aminos", customer: "James Wilson", email: "james@email.com", amount: "$89.99", commission: "$9.00", status: "refunded", date: "Jan 25, 2026" },
  { id: "TPM-0891", brandId: "tpm", brand: "TPM", customer: "Anna Martinez", email: "anna@email.com", amount: "$329.97", commission: "$33.00", status: "completed", date: "Jan 25, 2026" },
]

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
    case "refunded":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-xs font-medium text-white/50 ring-1 ring-inset ring-white/10">
          <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
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

export default function AffiliateOrdersPage() {
  const { user, getSelectedBrand, getVisibleBrands } = useAffiliate()
  const [searchQuery, setSearchQuery] = useState("")
  const [brandFilter, setBrandFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  if (!user) return null

  const isAffiliate = user.role === "affiliate"
  const selectedBrand = getSelectedBrand()
  const visibleBrands = getVisibleBrands()

  // Filter orders based on role and selection
  let orders = allOrders.filter(o => visibleBrands.some(b => b.id === o.brandId))
  
  if (selectedBrand) {
    orders = orders.filter(o => o.brandId === selectedBrand.id)
  } else if (brandFilter !== "all") {
    orders = orders.filter(o => o.brandId === brandFilter)
  }

  if (statusFilter !== "all") {
    orders = orders.filter(o => o.status === statusFilter)
  }

  if (searchQuery) {
    orders = orders.filter(o => 
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  const totalCommission = orders
    .filter((o) => o.status === "completed")
    .reduce((acc, o) => acc + parseFloat(o.commission.replace("$", "")), 0)

  // Show brand filter only for affiliates viewing all brands
  const showBrandFilter = isAffiliate && !selectedBrand

  return (
    <div className="min-h-full bg-[#050510] text-white">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(10,69,145,0.08),transparent)]" />
      </div>

      <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-bricolage text-xl sm:text-2xl font-semibold text-white">
              {selectedBrand ? `${selectedBrand.name} Orders` : "Order History"}
            </h2>
            <p className="text-sm text-white/50 mt-1">
              {selectedBrand 
                ? `Orders for ${selectedBrand.name}`
                : "View all orders and commissions"
              }
            </p>
          </div>
          <button className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-navy to-sky-600 px-4 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-all w-full sm:w-auto">
            <Download className="size-4" />
            Export CSV
          </button>
        </div>

        {/* Summary */}
        <div className="grid gap-4 grid-cols-3">
          {[
            { label: "Total Orders", value: orders.length.toString(), color: "from-navy/60 to-sky-500/40" },
            { label: "Total Commission", value: `$${totalCommission.toFixed(2)}`, color: "from-emerald-500/60 to-teal-500/40", valueClass: "text-emerald-400" },
            { label: "Avg Commission", value: `$${orders.filter((o) => o.status === "completed").length > 0 ? (totalCommission / orders.filter((o) => o.status === "completed").length).toFixed(2) : "0.00"}`, color: "from-violet-500/60 to-purple-500/40" }
          ].map((stat) => (
            <div key={stat.label} className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 hover:bg-white/[0.04] transition-all duration-300 border-gradient overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className="relative z-10">
                <p className="text-xs text-white/40 uppercase tracking-wider truncate">{stat.label}</p>
                <p className={`font-bricolage text-2xl font-semibold mt-1 ${stat.valueClass || 'text-white'}`}>{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 border-gradient">
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
            <div className="relative flex-1 min-w-0 sm:min-w-[200px] sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/40" />
              <input
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-navy/50 focus:border-navy/50 text-sm transition-all"
              />
            </div>
            <div className="flex gap-3">
              {showBrandFilter && (
                <select
                  value={brandFilter}
                  onChange={(e) => setBrandFilter(e.target.value)}
                  className="flex-1 sm:w-[160px] rounded-xl bg-white/5 border border-white/10 text-white text-sm px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-navy/50"
                >
                  <option value="all" className="bg-[#0a0a14]">All Brands</option>
                  {visibleBrands.map(brand => (
                    <option key={brand.id} value={brand.id} className="bg-[#0a0a14]">{brand.name}</option>
                  ))}
                </select>
              )}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="flex-1 sm:w-[140px] rounded-xl bg-white/5 border border-white/10 text-white text-sm px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-navy/50"
              >
                <option value="all" className="bg-[#0a0a14]">All Status</option>
                <option value="completed" className="bg-[#0a0a14]">Completed</option>
                <option value="processing" className="bg-[#0a0a14]">Processing</option>
                <option value="refunded" className="bg-[#0a0a14]">Refunded</option>
              </select>
            </div>
            <button className="flex items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all w-full sm:w-auto">
              <Calendar className="size-4" />
              Date Range
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden border-gradient">
          <div className="overflow-x-auto">
            {orders.length === 0 ? (
              <div className="p-12 text-center">
                <Building className="size-12 mx-auto text-white/20 mb-3" />
                <p className="text-white/50">No orders found</p>
                <p className="text-sm text-white/30">
                  {searchQuery || statusFilter !== "all" 
                    ? "Try adjusting your filters"
                    : "Orders will appear here once customers place orders"
                  }
                </p>
              </div>
            ) : (
              <>
                <table className="w-full min-w-[700px]">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-white/40">Order ID</th>
                      {showBrandFilter && (
                        <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-white/40">Brand</th>
                      )}
                      <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-white/40">Customer</th>
                      <th className="px-5 py-3 text-right text-[11px] font-medium uppercase tracking-wider text-white/40">Amount</th>
                      <th className="px-5 py-3 text-right text-[11px] font-medium uppercase tracking-wider text-emerald-400/70">Commission</th>
                      <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-white/40">Status</th>
                      <th className="px-5 py-3 text-right text-[11px] font-medium uppercase tracking-wider text-white/40">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors">
                        <td className="px-5 py-4">
                          <span className="font-mono font-medium text-white text-sm">{order.id}</span>
                        </td>
                        {showBrandFilter && (
                          <td className="px-5 py-4 text-sm text-white/50">{order.brand}</td>
                        )}
                        <td className="px-5 py-4">
                          <div>
                            <p className="font-medium text-sm text-white">{order.customer}</p>
                            <p className="text-xs text-white/40 hidden sm:block">{order.email}</p>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <span className="font-mono text-sm text-white">{order.amount}</span>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <span className={`font-mono text-sm font-medium ${order.status === "refunded" ? "text-white/30 line-through" : "text-emerald-400"}`}>
                            {order.commission}
                          </span>
                        </td>
                        <td className="px-5 py-4">{getStatusBadge(order.status)}</td>
                        <td className="px-5 py-4 text-right text-sm text-white/40 whitespace-nowrap">{order.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/[0.06] px-5 py-4">
                  <p className="text-xs text-white/40">
                    Showing <span className="font-medium text-white/70">1-{orders.length}</span> of <span className="font-medium text-white/70">{orders.length}</span> orders
                  </p>
                  <div className="flex items-center gap-2">
                    <button disabled className="flex items-center gap-1 rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-xs font-medium text-white/30 disabled:cursor-not-allowed">
                      <ChevronLeft className="size-3.5" />
                      <span className="hidden sm:inline">Previous</span>
                    </button>
                    <button disabled className="flex items-center gap-1 rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-xs font-medium text-white/30 disabled:cursor-not-allowed">
                      <span className="hidden sm:inline">Next</span>
                      <ChevronRight className="size-3.5" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
