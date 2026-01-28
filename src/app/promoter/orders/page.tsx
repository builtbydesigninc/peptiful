"use client"

import { useState } from "react"
import {
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
      return <Badge variant="active">Completed</Badge>
    case "processing":
      return <Badge variant="pending">Processing</Badge>
    case "refunded":
      return <Badge variant="muted">Refunded</Badge>
    default:
      return <Badge variant="muted">{status}</Badge>
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

  return (
    <div className="p-4 space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-dark-navy">Orders</h1>
        <p className="text-sm text-muted-foreground">{stats.totalOrders} orders using your codes</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="bg-white border-border/50">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2">
              <div className="flex size-8 sm:size-10 items-center justify-center rounded-lg bg-lavender text-navy shrink-0">
                <ShoppingBag className="size-4 sm:size-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs text-muted-foreground">Total Orders</p>
                <p className="text-base sm:text-xl font-bold text-dark-navy">{stats.totalOrders}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-border/50">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2">
              <div className="flex size-8 sm:size-10 items-center justify-center rounded-lg bg-lavender text-navy shrink-0">
                <DollarSign className="size-4 sm:size-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs text-muted-foreground">Revenue</p>
                <p className="text-base sm:text-xl font-bold text-dark-navy truncate">{stats.totalRevenue}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-border/50">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2">
              <div className="flex size-8 sm:size-10 items-center justify-center rounded-lg bg-coral/10 text-coral shrink-0">
                <TrendingUp className="size-4 sm:size-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs text-muted-foreground">My Earnings</p>
                <p className="text-base sm:text-xl font-bold text-coral truncate">{stats.totalCommission}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-white border-border/50">
        <CardContent className="p-3 sm:p-4">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Calendar className="size-3.5" />
              <span className="text-xs sm:text-sm">Date Range</span>
            </Button>
            <Select value={codeFilter} onValueChange={setCodeFilter}>
              <SelectTrigger className="w-[130px] sm:w-[150px] h-9">
                <SelectValue placeholder="All Codes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Codes</SelectItem>
                {uniqueCodes.map(code => (
                  <SelectItem key={code} value={code}>{code}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[110px] sm:w-[130px] h-9">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="bg-white border-border/50 overflow-hidden">
        <CardContent className="p-0 overflow-x-auto">
          {filteredOrders.length === 0 ? (
            <div className="p-8 text-center">
              <ShoppingBag className="size-12 mx-auto text-muted-foreground/30 mb-3" />
              <p className="text-muted-foreground">No orders found</p>
              <p className="text-sm text-muted-foreground/70">Try adjusting your filters</p>
            </div>
          ) : (
            <table className="w-full min-w-[550px]">
              <thead>
                <tr className="border-b border-border/50 bg-lavender/30">
                  <th className="px-3 sm:px-4 py-2.5 text-left text-xs font-semibold text-dark-navy">Order</th>
                  <th className="px-3 sm:px-4 py-2.5 text-left text-xs font-semibold text-dark-navy">Date</th>
                  <th className="px-3 sm:px-4 py-2.5 text-left text-xs font-semibold text-dark-navy">Customer</th>
                  <th className="px-3 sm:px-4 py-2.5 text-left text-xs font-semibold text-dark-navy">Code</th>
                  <th className="px-3 sm:px-4 py-2.5 text-right text-xs font-semibold text-dark-navy">Total</th>
                  <th className="px-3 sm:px-4 py-2.5 text-right text-xs font-semibold text-coral">Earned</th>
                  <th className="px-3 sm:px-4 py-2.5 text-left text-xs font-semibold text-dark-navy">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-border/50 last:border-0 hover:bg-lavender/20">
                    <td className="px-3 sm:px-4 py-3">
                      <span className="font-mono font-semibold text-navy text-xs">{order.id}</span>
                    </td>
                    <td className="px-3 sm:px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">{order.date}</td>
                    <td className="px-3 sm:px-4 py-3 text-xs">{order.customer}</td>
                    <td className="px-3 sm:px-4 py-3">
                      <code className="px-1.5 py-0.5 bg-lavender rounded text-[10px] font-mono font-medium text-navy">
                        {order.codeUsed}
                      </code>
                    </td>
                    <td className="px-3 sm:px-4 py-3 text-right text-xs font-medium">{order.orderTotal}</td>
                    <td className="px-3 sm:px-4 py-3 text-right">
                      <span className={`font-bold text-xs ${order.status === "refunded" ? "text-muted-foreground line-through" : "text-coral"}`}>
                        {order.commission}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-3">{getStatusBadge(order.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          
          {/* Pagination */}
          {filteredOrders.length > 0 && (
            <div className="flex items-center justify-between border-t border-border/50 px-3 sm:px-4 py-3">
              <p className="text-xs text-muted-foreground">
                Showing <span className="font-medium">1-{filteredOrders.length}</span> of <span className="font-medium">{stats.totalOrders}</span>
              </p>
              <div className="flex items-center gap-1.5">
                <Button variant="outline" size="sm" disabled className="h-8 px-2">
                  <ChevronLeft className="size-3.5" />
                </Button>
                <Button variant="outline" size="sm" className="h-8 px-2">
                  <ChevronRight className="size-3.5" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
