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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
              isLast ? "bg-coral" : "bg-navy/20 hover:bg-navy/40"
            }`}
            style={{ height: `${height}%` }}
          />
        )
      })}
    </div>
  )
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
    },
    {
      label: "Unpaid Balance",
      value: stats.unpaidBalance,
      change: null,
      positive: true,
      icon: TrendingUp,
      description: `Next payout: ${stats.nextPayout}`,
    },
    {
      label: "Total Orders",
      value: stats.totalOrders,
      change: stats.ordersChange,
      positive: !stats.ordersChange.startsWith("-"),
      icon: ShoppingBag,
      description: "All time",
    },
    {
      label: "Next Payout",
      value: stats.nextPayout,
      change: null,
      positive: true,
      icon: Calendar,
      description: stats.nextPayout !== "—" ? "In 5 days" : "No orders yet",
    },
  ]

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-dark-navy">
            {selectedBrand ? `${selectedBrand.name} Earnings` : "Earnings Overview"}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            {selectedBrand 
              ? `Performance for ${selectedBrand.name}`
              : isAffiliate 
                ? "Combined earnings across all your brands" 
                : "Track your performance and earnings"
            }
          </p>
        </div>
        {selectedBrand && (
          <Badge variant={selectedBrand.status === "connected" ? "active" : "muted"} className="self-start">
            {selectedBrand.status === "connected" ? "Connected" : "Disconnected"}
          </Badge>
        )}
      </div>

      {/* Stats */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.label} className="bg-white border-border/50 overflow-hidden">
            <CardContent className="p-3 sm:p-5">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">{stat.label}</p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-dark-navy mt-1 truncate">{stat.value}</p>
                  <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-1 sm:mt-2">
                    {stat.change && stat.change !== "0%" && (
                      <span className={`flex items-center text-xs sm:text-sm font-medium ${stat.positive ? "text-green-600" : "text-coral"}`}>
                        {stat.positive ? <ArrowUpRight className="size-3 sm:size-4" /> : <ArrowDownRight className="size-3 sm:size-4" />}
                        {stat.change}
                      </span>
                    )}
                    <span className="text-xs sm:text-sm text-muted-foreground truncate">{stat.description}</span>
                  </div>
                </div>
                <div className="hidden sm:flex size-10 lg:size-12 items-center justify-center rounded-xl bg-lavender text-navy shrink-0">
                  <stat.icon className="size-5 lg:size-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        {/* Earnings Chart */}
        <Card className={`bg-white border-border/50 overflow-hidden ${brandEarnings ? "lg:col-span-2" : "lg:col-span-3"}`}>
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 sm:p-6">
            <div>
              <CardTitle className="text-base sm:text-lg">Earnings Trend</CardTitle>
              <p className="text-xs sm:text-sm text-muted-foreground">Last 12 months</p>
            </div>
            <div className="sm:text-right">
              <p className="text-xl sm:text-2xl font-bold text-dark-navy">
                {selectedBrand ? "$4,523" : "$12,847"}
              </p>
              <p className="text-xs sm:text-sm text-green-600 flex items-center sm:justify-end">
                <ArrowUpRight className="size-3 sm:size-4" />
                +18.2% this month
              </p>
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
            <MiniChart />
            <div className="flex justify-between mt-2 text-[10px] sm:text-xs text-muted-foreground overflow-x-auto">
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
          </CardContent>
        </Card>

        {/* Earnings by Brand (Affiliates only, when not filtered) */}
        {brandEarnings && (
          <Card className="bg-white border-border/50 overflow-hidden">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg">Earnings by Brand</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-4 sm:p-6 pt-0 sm:pt-0">
              {brandEarnings.map((brand) => (
                <div key={brand.id} className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={`size-2 rounded-full shrink-0 ${
                          brand.status === "disconnected" ? "bg-gray-300" : "bg-green-500"
                        }`}
                      />
                      <span className="font-medium text-dark-navy text-sm sm:text-base truncate">{brand.name}</span>
                    </div>
                    <span className="font-semibold text-navy text-sm sm:text-base shrink-0">{brand.earnings}</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="flex-1 h-2 bg-lavender rounded-full overflow-hidden">
                      <div
                        className="h-full bg-navy rounded-full"
                        style={{ width: `${brand.percentage}%` }}
                      />
                    </div>
                    <span className="text-xs sm:text-sm text-muted-foreground w-10 sm:w-12 text-right shrink-0">
                      {brand.percentage}%
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{brand.orders} orders</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Recent Orders */}
      <Card className="bg-white border-border/50 overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between p-4 sm:p-6">
          <CardTitle className="text-base sm:text-lg">Recent Orders</CardTitle>
          <Button variant="ghost" size="sm" asChild className="text-xs sm:text-sm">
            <Link href="/affiliate/orders">
              View all <ChevronRight className="size-3 sm:size-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          {recentOrders.length === 0 ? (
            <div className="p-8 text-center">
              <Building className="size-12 mx-auto text-muted-foreground/30 mb-3" />
              <p className="text-muted-foreground">No orders yet</p>
              <p className="text-sm text-muted-foreground/70">Orders will appear here once your store is connected</p>
            </div>
          ) : (
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-muted-foreground">Order</th>
                  {isAffiliate && !selectedBrand && (
                    <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-muted-foreground">Brand</th>
                  )}
                  <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-muted-foreground">Customer</th>
                  <th className="px-4 sm:px-6 py-3 text-right text-xs sm:text-sm font-semibold text-muted-foreground">Amount</th>
                  <th className="px-4 sm:px-6 py-3 text-right text-xs sm:text-sm font-semibold text-muted-foreground">Commission</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-muted-foreground">Status</th>
                  <th className="px-4 sm:px-6 py-3 text-right text-xs sm:text-sm font-semibold text-muted-foreground">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="border-b border-border/50 last:border-0 hover:bg-lavender/30">
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      <span className="font-mono font-semibold text-navy text-xs sm:text-sm">{order.id}</span>
                    </td>
                    {isAffiliate && !selectedBrand && (
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <span className="text-xs sm:text-sm text-muted-foreground">{order.brandName}</span>
                      </td>
                    )}
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">{order.customer}</td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm">{order.amount}</td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-right">
                      <span className="font-semibold text-green-600 text-xs sm:text-sm">{order.commission}</span>
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      <Badge variant={order.status === "completed" ? "active" : "pending"} className="text-xs">
                        {order.status}
                      </Badge>
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm text-muted-foreground whitespace-nowrap">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
