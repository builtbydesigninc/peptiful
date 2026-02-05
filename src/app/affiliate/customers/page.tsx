"use client"

import {
  Users,
  ShoppingBag,
  DollarSign,
  Mail,
  TrendingUp,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAffiliate } from "../context"

const allTopCustomers = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@email.com",
    orders: 24,
    totalSpent: "$4,892.50",
    avgOrder: "$203.85",
    lastOrder: "2 days ago",
    brandIds: ["hoa", "tpm"],
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    orders: 18,
    totalSpent: "$3,456.80",
    avgOrder: "$192.04",
    lastOrder: "1 week ago",
    brandIds: ["hoa"],
  },
  {
    id: 3,
    name: "Mike Williams",
    email: "mike.w@email.com",
    orders: 15,
    totalSpent: "$2,987.40",
    avgOrder: "$199.16",
    lastOrder: "3 days ago",
    brandIds: ["tpm"],
  },
  {
    id: 4,
    name: "Emily Brown",
    email: "emily.b@email.com",
    orders: 12,
    totalSpent: "$2,345.60",
    avgOrder: "$195.47",
    lastOrder: "5 days ago",
    brandIds: ["hoa"],
  },
  {
    id: 5,
    name: "David Lee",
    email: "david.lee@email.com",
    orders: 11,
    totalSpent: "$2,156.90",
    avgOrder: "$196.08",
    lastOrder: "1 week ago",
    brandIds: ["hoa", "tpm"],
  },
]

const allTopProducts = [
  {
    id: 1,
    name: "BPC-157 10mg",
    brandId: "hoa",
    brand: "House of Aminos",
    sold: 342,
    revenue: "$30,758.58",
    commission: "$3,075.86",
  },
  {
    id: 2,
    name: "TB-500 5mg",
    brandId: "hoa",
    brand: "House of Aminos",
    sold: 256,
    revenue: "$28,153.44",
    commission: "$2,815.34",
  },
  {
    id: 3,
    name: "Ipamorelin 5mg",
    brandId: "tpm",
    brand: "TPM",
    sold: 198,
    revenue: "$15,838.02",
    commission: "$1,583.80",
  },
  {
    id: 4,
    name: "CJC-1295 2mg",
    brandId: "tpm",
    brand: "TPM",
    sold: 167,
    revenue: "$24,883.33",
    commission: "$2,488.33",
  },
  {
    id: 5,
    name: "Semaglutide 5mg",
    brandId: "hoa",
    brand: "House of Aminos",
    sold: 145,
    revenue: "$43,355.00",
    commission: "$4,335.50",
  },
]

// Stats by view type
const statsData = {
  all: { totalCustomers: 847, repeatRate: "34.2%", avgOrders: "2.18", avgOrderValue: "$168.72" },
  hoa: { totalCustomers: 523, repeatRate: "38.5%", avgOrders: "2.45", avgOrderValue: "$185.40" },
  tpm: { totalCustomers: 312, repeatRate: "29.8%", avgOrders: "1.92", avgOrderValue: "$152.30" },
  ps: { totalCustomers: 0, repeatRate: "0%", avgOrders: "0", avgOrderValue: "$0" },
}

export default function AffiliateCustomersPage() {
  const { user, getSelectedBrand, getVisibleBrands } = useAffiliate()

  if (!user) return null

  const isAffiliate = user.role === "affiliate"
  const selectedBrand = getSelectedBrand()
  const visibleBrands = getVisibleBrands()

  // Get stats based on selection
  const stats = selectedBrand
    ? statsData[selectedBrand.id as keyof typeof statsData] || statsData.all
    : isAffiliate
      ? statsData.all
      : statsData[user.brands[0]?.id as keyof typeof statsData] || statsData.all

  // Filter customers based on role and selection
  let topCustomers = allTopCustomers.filter(c => 
    c.brandIds.some(bid => visibleBrands.some(vb => vb.id === bid))
  )
  if (selectedBrand) {
    topCustomers = topCustomers.filter(c => c.brandIds.includes(selectedBrand.id))
  }

  // Filter products based on role and selection
  let topProducts = allTopProducts.filter(p => 
    visibleBrands.some(vb => vb.id === p.brandId)
  )
  if (selectedBrand) {
    topProducts = topProducts.filter(p => p.brandId === selectedBrand.id)
  }

  // Show brand column for affiliates viewing all
  const showBrandColumn = isAffiliate && !selectedBrand

  const statCards = [
    { label: "Total Customers", value: stats.totalCustomers.toString(), icon: Users, gradient: "from-navy/60 to-sky-500/40", iconBg: "bg-gradient-to-br from-navy to-sky-600" },
    { label: "Repeat Rate", value: stats.repeatRate, icon: TrendingUp, gradient: "from-emerald-500/60 to-teal-500/40", iconBg: "bg-gradient-to-br from-emerald-500 to-teal-500" },
    { label: "Avg Orders", value: stats.avgOrders, icon: ShoppingBag, gradient: "from-violet-500/60 to-purple-500/40", iconBg: "bg-gradient-to-br from-violet-500 to-purple-500" },
    { label: "Avg Order Value", value: stats.avgOrderValue, icon: DollarSign, gradient: "from-amber-500/60 to-orange-500/40", iconBg: "bg-gradient-to-br from-amber-500 to-orange-500" },
  ]

  return (
    <div className="min-h-full bg-[#050510] text-white">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(10,69,145,0.08),transparent)]" />
      </div>

      <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
        {/* Header */}
        <div>
          <h2 className="font-bricolage text-xl sm:text-2xl font-semibold text-white">
            {selectedBrand ? `${selectedBrand.name} Customers` : "Customer Insights"}
          </h2>
          <p className="text-sm text-white/50 mt-1">
            {selectedBrand
              ? `Customer data for ${selectedBrand.name}`
              : "Understand your customer base and top products"
            }
          </p>
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
                <div className="flex items-center gap-3">
                  <div className={`flex size-10 items-center justify-center rounded-xl ${stat.iconBg} shadow-lg shrink-0`}>
                    <stat.icon className="size-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-white/40 uppercase tracking-wider truncate">{stat.label}</p>
                    <p className="font-bricolage text-xl font-semibold text-white">{stat.value}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Top Customers */}
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden border-gradient">
            <div className="p-5 border-b border-white/[0.06]">
              <h3 className="font-bricolage text-lg font-semibold text-white">Top Customers</h3>
            </div>
            {topCustomers.length === 0 ? (
              <div className="p-12 text-center">
                <Users className="size-12 mx-auto text-white/20 mb-3" />
                <p className="text-white/50">No customer data yet</p>
              </div>
            ) : (
              <div className="divide-y divide-white/[0.04]">
                {topCustomers.slice(0, 5).map((customer, index) => (
                  <div key={customer.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/[0.02] transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-lg font-semibold text-white/30 w-6 shrink-0">
                        {index + 1}
                      </span>
                      <Avatar className="size-10 shrink-0 ring-2 ring-white/10 ring-offset-2 ring-offset-[#0a0a14]">
                        <AvatarFallback className="bg-gradient-to-br from-navy to-sky-600 text-white text-xs font-semibold">
                          {customer.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="font-medium text-white text-sm truncate">{customer.name}</p>
                        <p className="text-xs text-white/40 truncate">{customer.orders} orders • Last: {customer.lastOrder}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 ml-9 sm:ml-0">
                      <div className="text-left sm:text-right">
                        <p className="font-mono font-semibold text-emerald-400 text-sm">{customer.totalSpent}</p>
                        <p className="text-xs text-white/40">Avg: {customer.avgOrder}</p>
                      </div>
                      <button className="shrink-0 flex items-center gap-1.5 rounded-lg bg-coral/10 border border-coral/20 px-3 py-2 text-xs font-medium text-coral hover:bg-coral/20 transition-all">
                        <Mail className="size-3.5" />
                        <span className="hidden sm:inline">Send Offer</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Top Products */}
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden border-gradient">
            <div className="p-5 border-b border-white/[0.06]">
              <h3 className="font-bricolage text-lg font-semibold text-white">Top Products</h3>
            </div>
            {topProducts.length === 0 ? (
              <div className="p-12 text-center">
                <ShoppingBag className="size-12 mx-auto text-white/20 mb-3" />
                <p className="text-white/50">No product data yet</p>
              </div>
            ) : (
              <div className="divide-y divide-white/[0.04]">
                {topProducts.slice(0, 5).map((product, index) => (
                  <div key={product.id} className="p-4 hover:bg-white/[0.02] transition-colors">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-lg font-semibold text-white/30 w-6 shrink-0">
                          {index + 1}
                        </span>
                        <div className="min-w-0">
                          <p className="font-medium text-white text-sm truncate">{product.name}</p>
                          {showBrandColumn && (
                            <p className="text-xs text-white/40 truncate">{product.brand}</p>
                          )}
                        </div>
                      </div>
                      <span className="inline-flex items-center rounded-full bg-white/5 px-2.5 py-1 text-xs font-medium text-white/50 ring-1 ring-inset ring-white/10 shrink-0">
                        {product.sold} sold
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 ml-9 text-sm">
                      <div>
                        <span className="text-white/40">Rev: </span>
                        <span className="font-mono font-medium text-white">{product.revenue}</span>
                      </div>
                      <div>
                        <span className="text-white/40">Comm: </span>
                        <span className="font-mono font-semibold text-emerald-400">{product.commission}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
