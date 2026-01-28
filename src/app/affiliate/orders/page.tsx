"use client"

import { useState } from "react"
import {
  Download,
  Search,
  Filter,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const orders = [
  { id: "PS-4521", brand: "Peptide Sciences", customer: "John Smith", email: "john@email.com", amount: "$289.97", commission: "$28.99", status: "completed", date: "Jan 27, 2026" },
  { id: "CP-1234", brand: "Core Peptides", customer: "Sarah Johnson", email: "sarah@email.com", amount: "$149.99", commission: "$15.00", status: "completed", date: "Jan 27, 2026" },
  { id: "PS-4520", brand: "Peptide Sciences", customer: "Mike Williams", email: "mike@email.com", amount: "$459.95", commission: "$45.99", status: "processing", date: "Jan 27, 2026" },
  { id: "RP-0892", brand: "Research Peptides", customer: "Emily Brown", email: "emily@email.com", amount: "$199.98", commission: "$20.00", status: "completed", date: "Jan 26, 2026" },
  { id: "PS-4519", brand: "Peptide Sciences", customer: "David Lee", email: "david@email.com", amount: "$379.96", commission: "$38.00", status: "completed", date: "Jan 26, 2026" },
  { id: "CP-1233", brand: "Core Peptides", customer: "Lisa Chen", email: "lisa@email.com", amount: "$219.98", commission: "$22.00", status: "completed", date: "Jan 26, 2026" },
  { id: "PS-4518", brand: "Peptide Sciences", customer: "James Wilson", email: "james@email.com", amount: "$89.99", commission: "$9.00", status: "refunded", date: "Jan 25, 2026" },
  { id: "RP-0891", brand: "Research Peptides", customer: "Anna Martinez", email: "anna@email.com", amount: "$329.97", commission: "$33.00", status: "completed", date: "Jan 25, 2026" },
]

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

export default function AffiliateOrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const totalCommission = orders
    .filter((o) => o.status === "completed")
    .reduce((acc, o) => acc + parseFloat(o.commission.replace("$", "")), 0)

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-dark-navy">Order History</h2>
          <p className="text-sm sm:text-base text-muted-foreground">View all orders and commissions</p>
        </div>
        <Button className="bg-navy hover:bg-navy/90 w-full sm:w-auto">
          <Download className="size-4" />
          Export CSV
        </Button>
      </div>

      {/* Summary */}
      <div className="grid gap-3 sm:gap-4 grid-cols-3">
        <Card className="bg-white border-border/50 overflow-hidden">
          <CardContent className="p-3 sm:p-4">
            <p className="text-xs sm:text-sm text-muted-foreground truncate">Total Orders</p>
            <p className="text-lg sm:text-2xl font-bold text-dark-navy">{orders.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-border/50 overflow-hidden">
          <CardContent className="p-3 sm:p-4">
            <p className="text-xs sm:text-sm text-muted-foreground truncate">Total Commission</p>
            <p className="text-lg sm:text-2xl font-bold text-green-600">${totalCommission.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-border/50 overflow-hidden">
          <CardContent className="p-3 sm:p-4">
            <p className="text-xs sm:text-sm text-muted-foreground truncate">Avg Commission</p>
            <p className="text-lg sm:text-2xl font-bold text-dark-navy">
              ${(totalCommission / orders.filter((o) => o.status === "completed").length).toFixed(2)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-white border-border/50 overflow-hidden">
        <CardContent className="p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2 sm:gap-3">
            <div className="relative flex-1 min-w-0 sm:min-w-[200px] sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2 sm:gap-3">
              <Select defaultValue="all">
                <SelectTrigger className="flex-1 sm:w-[140px]">
                  <SelectValue placeholder="All Brands" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Brands</SelectItem>
                  <SelectItem value="ps">Peptide Sciences</SelectItem>
                  <SelectItem value="cp">Core Peptides</SelectItem>
                  <SelectItem value="rp">Research Peptides</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="flex-1 sm:w-[120px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" className="w-full sm:w-auto">
              <Calendar className="size-4" />
              <span className="sm:inline">Date Range</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="bg-white border-border/50 overflow-hidden">
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-border/50 bg-lavender/30">
                <th className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-dark-navy">Order ID</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-dark-navy">Brand</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-dark-navy">Customer</th>
                <th className="px-3 sm:px-6 py-3 text-right text-xs sm:text-sm font-semibold text-dark-navy">Amount</th>
                <th className="px-3 sm:px-6 py-3 text-right text-xs sm:text-sm font-semibold text-dark-navy">
                  <span className="text-green-600">Commission</span>
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-dark-navy">Status</th>
                <th className="px-3 sm:px-6 py-3 text-right text-xs sm:text-sm font-semibold text-dark-navy">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-border/50 last:border-0 hover:bg-lavender/20">
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <span className="font-mono font-semibold text-navy text-xs sm:text-sm">{order.id}</span>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-muted-foreground">{order.brand}</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <div>
                      <p className="font-medium text-xs sm:text-sm">{order.customer}</p>
                      <p className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block">{order.email}</p>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-right font-medium text-xs sm:text-sm">{order.amount}</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-right">
                    <span className={`font-bold text-xs sm:text-sm ${order.status === "refunded" ? "text-muted-foreground line-through" : "text-green-600"}`}>
                      {order.commission}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">{getStatusBadge(order.status)}</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm text-muted-foreground whitespace-nowrap">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border/50 px-3 sm:px-6 py-3 sm:py-4">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Showing <span className="font-medium">1-8</span> of <span className="font-medium">1,847</span> orders
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled className="text-xs sm:text-sm">
                <ChevronLeft className="size-3 sm:size-4" />
                <span className="hidden sm:inline">Previous</span>
              </Button>
              <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="size-3 sm:size-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
