"use client"

import {
  Download,
  CheckCircle,
  Clock,
  DollarSign,
  Calendar,
  CreditCard,
  FileText,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const payouts = [
  {
    id: "PAY-2026-0120",
    date: "Jan 20, 2026",
    amount: "$3,247.80",
    orders: 54,
    method: "Bank Transfer",
    status: "completed",
    reference: "TRF-789456123",
  },
  {
    id: "PAY-2026-0105",
    date: "Jan 5, 2026",
    amount: "$2,891.50",
    orders: 48,
    method: "Bank Transfer",
    status: "completed",
    reference: "TRF-789456122",
  },
  {
    id: "PAY-2025-1220",
    date: "Dec 20, 2025",
    amount: "$4,156.30",
    orders: 67,
    method: "Bank Transfer",
    status: "completed",
    reference: "TRF-789456121",
  },
  {
    id: "PAY-2025-1205",
    date: "Dec 5, 2025",
    amount: "$3,578.90",
    orders: 58,
    method: "Bank Transfer",
    status: "completed",
    reference: "TRF-789456120",
  },
  {
    id: "PAY-2025-1120",
    date: "Nov 20, 2025",
    amount: "$2,934.20",
    orders: 49,
    method: "Bank Transfer",
    status: "completed",
    reference: "TRF-789456119",
  },
  {
    id: "PAY-2025-1105",
    date: "Nov 5, 2025",
    amount: "$3,245.60",
    orders: 53,
    method: "Bank Transfer",
    status: "completed",
    reference: "TRF-789456118",
  },
]

const nextPayout = {
  date: "Feb 1, 2026",
  amount: "$3,847.50",
  orders: 62,
  daysUntil: 5,
}

export default function AffiliatePayoutsPage() {
  const totalPaid = payouts.reduce(
    (acc, p) => acc + parseFloat(p.amount.replace("$", "").replace(",", "")),
    0
  )

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-dark-navy">Payout History</h2>
        <p className="text-sm sm:text-base text-muted-foreground">Track your earnings and payment history</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
        {/* Next Payout */}
        <Card className="bg-gradient-to-br from-navy to-navy/80 text-white border-0 overflow-hidden">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Calendar className="size-4 sm:size-5 opacity-80" />
              <span className="text-xs sm:text-sm opacity-80">Next Payout</span>
            </div>
            <p className="text-2xl sm:text-4xl font-bold mb-2">{nextPayout.amount}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm opacity-80">{nextPayout.orders} orders</span>
              <Badge className="bg-white/20 text-white hover:bg-white/30 text-xs">
                {nextPayout.daysUntil} days
              </Badge>
            </div>
            <p className="text-xs sm:text-sm opacity-80 mt-2 sm:mt-3">{nextPayout.date}</p>
          </CardContent>
        </Card>

        {/* Total Paid */}
        <Card className="bg-white border-border/50 overflow-hidden">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <DollarSign className="size-4 sm:size-5 text-green-600" />
              <span className="text-xs sm:text-sm text-muted-foreground">Total Paid Out</span>
            </div>
            <p className="text-xl sm:text-3xl font-bold text-dark-navy truncate">
              ${totalPaid.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2">
              {payouts.length} payouts all time
            </p>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card className="bg-white border-border/50 overflow-hidden">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <CreditCard className="size-4 sm:size-5 text-navy" />
              <span className="text-xs sm:text-sm text-muted-foreground">Payment Method</span>
            </div>
            <p className="text-base sm:text-lg font-bold text-dark-navy">Bank Transfer</p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 truncate">
              ****4567 • Chase Bank
            </p>
            <Button variant="ghost" size="sm" className="mt-2 -ml-2 text-navy text-xs sm:text-sm">
              Update payment method
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Payout History Table */}
      <Card className="bg-white border-border/50 overflow-hidden">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-base sm:text-lg">Payment History</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-border/50 bg-lavender/30">
                <th className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-dark-navy">Payout ID</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-dark-navy">Date</th>
                <th className="px-3 sm:px-6 py-3 text-right text-xs sm:text-sm font-semibold text-dark-navy">Amount</th>
                <th className="px-3 sm:px-6 py-3 text-center text-xs sm:text-sm font-semibold text-dark-navy hidden sm:table-cell">Orders</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-dark-navy">Status</th>
                <th className="px-3 sm:px-6 py-3 text-right text-xs sm:text-sm font-semibold text-dark-navy">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {payouts.map((payout) => (
                <tr key={payout.id} className="border-b border-border/50 last:border-0 hover:bg-lavender/20">
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <span className="font-mono font-semibold text-navy text-xs sm:text-sm">{payout.id}</span>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-muted-foreground whitespace-nowrap">{payout.date}</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-right">
                    <span className="font-bold text-dark-navy text-xs sm:text-sm">{payout.amount}</span>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm text-muted-foreground hidden sm:table-cell">{payout.orders}</td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <span className="flex items-center gap-1 sm:gap-1.5 text-green-600 font-medium text-xs sm:text-sm">
                      <CheckCircle className="size-3 sm:size-4" />
                      <span className="hidden sm:inline">Completed</span>
                      <span className="sm:hidden">Done</span>
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-right">
                    <Button variant="ghost" size="sm" className="text-xs sm:text-sm h-8 px-2 sm:px-3">
                      <FileText className="size-3 sm:size-4" />
                      <span className="hidden sm:inline ml-1">Download</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
