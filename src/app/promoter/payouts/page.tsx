"use client"

import {
  CheckCircle,
  Clock,
  DollarSign,
  Calendar,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const payouts = [
  {
    id: 1,
    date: "Jan 20, 2026",
    amount: "$350.00",
    status: "completed",
    method: "PayPal",
  },
  {
    id: 2,
    date: "Jan 5, 2026",
    amount: "$287.50",
    status: "completed",
    method: "PayPal",
  },
  {
    id: 3,
    date: "Dec 20, 2025",
    amount: "$425.00",
    status: "completed",
    method: "PayPal",
  },
  {
    id: 4,
    date: "Dec 5, 2025",
    amount: "$312.00",
    status: "completed",
    method: "PayPal",
  },
  {
    id: 5,
    date: "Nov 20, 2025",
    amount: "$198.50",
    status: "completed",
    method: "PayPal",
  },
]

const pendingPayout = {
  amount: "$487.50",
  date: "Feb 1, 2026",
  orders: 23,
}

export default function PromoterPayoutsPage() {
  const totalPaid = payouts.reduce(
    (acc, p) => acc + parseFloat(p.amount.replace("$", "")),
    0
  )

  return (
    <div className="px-4 py-6 space-y-6 max-w-lg mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-dark-navy">Payouts</h1>
        <p className="text-sm text-muted-foreground">Your earnings and payment history</p>
      </div>

      {/* Pending Payout */}
      <Card className="bg-gradient-to-br from-navy to-navy/80 text-white border-0">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="size-4 opacity-80" />
            <span className="text-sm opacity-80">Next Payout</span>
          </div>
          <p className="text-3xl font-bold mb-1">{pendingPayout.amount}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm opacity-80">{pendingPayout.orders} orders</span>
            <Badge className="bg-white/20 text-white hover:bg-white/30 text-xs">
              {pendingPayout.date}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-white border-border/50">
          <CardContent className="p-4 text-center">
            <DollarSign className="size-5 text-green-600 mx-auto mb-2" />
            <p className="text-xl font-bold text-green-600">
              ${totalPaid.toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground">Total Received</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-border/50">
          <CardContent className="p-4 text-center">
            <Calendar className="size-5 text-navy mx-auto mb-2" />
            <p className="text-xl font-bold text-dark-navy">{payouts.length}</p>
            <p className="text-xs text-muted-foreground">Payouts</p>
          </CardContent>
        </Card>
      </div>

      {/* Payout History */}
      <Card className="bg-white border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Payment History</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border/50">
            {payouts.map((payout) => (
              <div key={payout.id} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-dark-navy">{payout.amount}</p>
                  <p className="text-xs text-muted-foreground">{payout.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{payout.method}</span>
                  <span className="flex items-center gap-1 text-green-600 text-xs font-medium">
                    <CheckCircle className="size-3" />
                    Paid
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card className="bg-white border-border/50">
        <CardContent className="p-4">
          <p className="text-sm font-medium text-dark-navy mb-1">Payment Method</p>
          <p className="text-xs text-muted-foreground">PayPal • ashton@fitness.com</p>
        </CardContent>
      </Card>
    </div>
  )
}
