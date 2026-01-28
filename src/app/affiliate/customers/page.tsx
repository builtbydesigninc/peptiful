"use client"

import {
  Users,
  ShoppingBag,
  DollarSign,
  Mail,
  TrendingUp,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const topCustomers = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@email.com",
    orders: 24,
    totalSpent: "$4,892.50",
    avgOrder: "$203.85",
    lastOrder: "2 days ago",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    orders: 18,
    totalSpent: "$3,456.80",
    avgOrder: "$192.04",
    lastOrder: "1 week ago",
  },
  {
    id: 3,
    name: "Mike Williams",
    email: "mike.w@email.com",
    orders: 15,
    totalSpent: "$2,987.40",
    avgOrder: "$199.16",
    lastOrder: "3 days ago",
  },
  {
    id: 4,
    name: "Emily Brown",
    email: "emily.b@email.com",
    orders: 12,
    totalSpent: "$2,345.60",
    avgOrder: "$195.47",
    lastOrder: "5 days ago",
  },
  {
    id: 5,
    name: "David Lee",
    email: "david.lee@email.com",
    orders: 11,
    totalSpent: "$2,156.90",
    avgOrder: "$196.08",
    lastOrder: "1 week ago",
  },
]

const topProducts = [
  {
    id: 1,
    name: "BPC-157 10mg",
    brand: "Peptide Sciences",
    sold: 342,
    revenue: "$30,758.58",
    commission: "$3,075.86",
  },
  {
    id: 2,
    name: "TB-500 5mg",
    brand: "Peptide Sciences",
    sold: 256,
    revenue: "$28,153.44",
    commission: "$2,815.34",
  },
  {
    id: 3,
    name: "Ipamorelin 5mg",
    brand: "Core Peptides",
    sold: 198,
    revenue: "$15,838.02",
    commission: "$1,583.80",
  },
  {
    id: 4,
    name: "CJC-1295 2mg",
    brand: "Core Peptides",
    sold: 167,
    revenue: "$24,883.33",
    commission: "$2,488.33",
  },
  {
    id: 5,
    name: "Semaglutide 5mg",
    brand: "Research Peptides",
    sold: 145,
    revenue: "$43,355.00",
    commission: "$4,335.50",
  },
]

export default function AffiliateCustomersPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-dark-navy">Customer Insights</h2>
        <p className="text-sm sm:text-base text-muted-foreground">Understand your customer base and top products</p>
      </div>

      {/* Stats */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white border-border/50 overflow-hidden">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex size-8 sm:size-10 items-center justify-center rounded-lg bg-lavender text-navy shrink-0">
                <Users className="size-4 sm:size-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-muted-foreground truncate">Total Customers</p>
                <p className="text-lg sm:text-xl font-bold text-dark-navy">847</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-border/50 overflow-hidden">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex size-8 sm:size-10 items-center justify-center rounded-lg bg-lavender text-navy shrink-0">
                <TrendingUp className="size-4 sm:size-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-muted-foreground truncate">Repeat Rate</p>
                <p className="text-lg sm:text-xl font-bold text-dark-navy">34.2%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-border/50 overflow-hidden">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex size-8 sm:size-10 items-center justify-center rounded-lg bg-lavender text-navy shrink-0">
                <ShoppingBag className="size-4 sm:size-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-muted-foreground truncate">Avg Orders</p>
                <p className="text-lg sm:text-xl font-bold text-dark-navy">2.18</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-border/50 overflow-hidden">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex size-8 sm:size-10 items-center justify-center rounded-lg bg-lavender text-navy shrink-0">
                <DollarSign className="size-4 sm:size-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-muted-foreground truncate">Avg Order Value</p>
                <p className="text-lg sm:text-xl font-bold text-dark-navy">$168.72</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        {/* Top Customers */}
        <Card className="bg-white border-border/50 overflow-hidden">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">Top Customers</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {topCustomers.map((customer, index) => (
                <div key={customer.id} className="p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 hover:bg-lavender/20">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <span className="text-base sm:text-lg font-bold text-muted-foreground w-5 sm:w-6 shrink-0">
                      {index + 1}
                    </span>
                    <Avatar className="size-8 sm:size-10 shrink-0">
                      <AvatarFallback className="bg-lavender text-navy text-xs sm:text-sm font-semibold">
                        {customer.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="font-semibold text-dark-navy text-sm sm:text-base truncate">{customer.name}</p>
                      <p className="text-[10px] sm:text-xs text-muted-foreground truncate">{customer.orders} orders • Last: {customer.lastOrder}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 ml-7 sm:ml-0">
                    <div className="text-left sm:text-right">
                      <p className="font-bold text-navy text-sm sm:text-base">{customer.totalSpent}</p>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">Avg: {customer.avgOrder}</p>
                    </div>
                    <Button variant="accent" size="sm" className="shrink-0 text-xs sm:text-sm">
                      <Mail className="size-3" />
                      <span className="hidden sm:inline">Send Offer</span>
                      <span className="sm:hidden">Offer</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="bg-white border-border/50 overflow-hidden">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">Top Products</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {topProducts.map((product, index) => (
                <div key={product.id} className="p-3 sm:p-4 hover:bg-lavender/20">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <span className="text-base sm:text-lg font-bold text-muted-foreground w-5 sm:w-6 shrink-0">
                        {index + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="font-semibold text-dark-navy text-sm sm:text-base truncate">{product.name}</p>
                        <p className="text-[10px] sm:text-xs text-muted-foreground truncate">{product.brand}</p>
                      </div>
                    </div>
                    <Badge variant="muted" className="shrink-0 text-[10px] sm:text-xs">{product.sold} sold</Badge>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 ml-7 sm:ml-9 text-xs sm:text-sm">
                    <div>
                      <span className="text-muted-foreground">Rev: </span>
                      <span className="font-medium">{product.revenue}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Comm: </span>
                      <span className="font-bold text-green-600">{product.commission}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
