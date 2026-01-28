"use client"

import {
  DollarSign,
  TrendingUp,
  ShoppingBag,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const stats = [
  {
    label: "Total Earnings",
    value: "$142,847.50",
    change: "+12.5%",
    positive: true,
    icon: DollarSign,
    description: "Lifetime earnings",
  },
  {
    label: "Unpaid Balance",
    value: "$3,247.80",
    change: null,
    positive: true,
    icon: TrendingUp,
    description: "Next payout: Feb 1",
  },
  {
    label: "Total Orders",
    value: "1,847",
    change: "+8.2%",
    positive: true,
    icon: ShoppingBag,
    description: "All time",
  },
  {
    label: "Next Payout",
    value: "Feb 1",
    change: null,
    positive: true,
    icon: Calendar,
    description: "In 5 days",
  },
]

const brandEarnings = [
  { name: "Peptide Sciences", earnings: "$89,234.50", orders: 892, percentage: 62 },
  { name: "Core Peptides", earnings: "$38,456.20", orders: 456, percentage: 27 },
  { name: "Research Peptides", earnings: "$15,156.80", orders: 178, percentage: 11 },
]

const recentOrders = [
  { id: "PS-4521", customer: "John Smith", amount: "$289.97", commission: "$28.99", status: "completed", date: "2 hours ago" },
  { id: "CP-1234", customer: "Sarah Johnson", amount: "$149.99", commission: "$15.00", status: "completed", date: "4 hours ago" },
  { id: "PS-4520", customer: "Mike Williams", amount: "$459.95", commission: "$45.99", status: "processing", date: "6 hours ago" },
  { id: "RP-0892", customer: "Emily Brown", amount: "$199.98", commission: "$20.00", status: "completed", date: "8 hours ago" },
]

// Mini chart data (simplified representation)
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
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-dark-navy">Earnings Overview</h2>
        <p className="text-sm sm:text-base text-muted-foreground">Track your performance and earnings</p>
      </div>

      {/* Stats */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-white border-border/50 overflow-hidden">
            <CardContent className="p-3 sm:p-5">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">{stat.label}</p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-dark-navy mt-1 truncate">{stat.value}</p>
                  <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-1 sm:mt-2">
                    {stat.change && (
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
        <Card className="lg:col-span-2 bg-white border-border/50 overflow-hidden">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 sm:p-6">
            <div>
              <CardTitle className="text-base sm:text-lg">Earnings Trend</CardTitle>
              <p className="text-xs sm:text-sm text-muted-foreground">Last 12 months</p>
            </div>
            <div className="sm:text-right">
              <p className="text-xl sm:text-2xl font-bold text-dark-navy">$12,847</p>
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

        {/* Earnings by Brand */}
        <Card className="bg-white border-border/50 overflow-hidden">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">Earnings by Brand</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-4 sm:p-6 pt-0 sm:pt-0">
            {brandEarnings.map((brand) => (
              <div key={brand.name} className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium text-dark-navy text-sm sm:text-base truncate">{brand.name}</span>
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
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-border/50">
                <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-muted-foreground">Order</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-muted-foreground">Customer</th>
                <th className="px-4 sm:px-6 py-3 text-right text-xs sm:text-sm font-semibold text-muted-foreground">Amount</th>
                <th className="px-4 sm:px-6 py-3 text-right text-xs sm:text-sm font-semibold text-muted-foreground">Commission</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-muted-foreground">Status</th>
                <th className="px-4 sm:px-6 py-3 text-right text-xs sm:text-sm font-semibold text-muted-foreground">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-border/50 last:border-0 hover:bg-lavender/30">
                  <td className="px-4 sm:px-6 py-3 sm:py-4">
                    <span className="font-mono font-semibold text-navy text-xs sm:text-sm">{order.id}</span>
                  </td>
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
        </CardContent>
      </Card>
    </div>
  )
}
