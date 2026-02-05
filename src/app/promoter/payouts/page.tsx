"use client"

import {
  CheckCircle,
  Clock,
  DollarSign,
  Calendar,
  Wallet,
  CreditCard,
} from "lucide-react"

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
    <div className="min-h-full text-white">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(235,92,106,0.06),transparent)]" />
      </div>

      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-bricolage text-2xl font-semibold text-white">Payouts</h1>
          <p className="text-sm text-white/50 mt-1">Your earnings and payment history</p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* Pending Payout */}
          <div className="relative rounded-2xl overflow-hidden border border-coral/20 bg-gradient-to-br from-coral/20 via-pink-500/10 to-transparent">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(235,92,106,0.15)_0%,transparent_60%)]" />
            <div className="relative p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex size-9 items-center justify-center rounded-xl bg-coral/20 backdrop-blur-sm">
                  <Clock className="size-4 text-coral" />
                </div>
                <span className="text-sm text-white/60">Next Payout</span>
              </div>
              <p className="font-bricolage text-3xl sm:text-4xl font-bold text-white mb-2">{pendingPayout.amount}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/50">{pendingPayout.orders} orders</span>
                <span className="inline-flex items-center rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-white ring-1 ring-inset ring-white/20">
                  {pendingPayout.date}
                </span>
              </div>
            </div>
          </div>

          {/* Total Paid */}
          <div className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6 hover:bg-white/[0.04] transition-all duration-300 border-gradient overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/60 to-teal-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg">
                  <DollarSign className="size-4 text-white" />
                </div>
                <span className="text-sm text-white/60">Total Received</span>
              </div>
              <p className="font-bricolage text-2xl sm:text-3xl font-semibold text-emerald-400">
                ${totalPaid.toFixed(2)}
              </p>
              <p className="text-sm text-white/40 mt-2">{payouts.length} payouts all time</p>
            </div>
          </div>

          {/* Payment Method */}
          <div className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6 hover:bg-white/[0.04] transition-all duration-300 border-gradient overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/60 to-purple-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 shadow-lg">
                  <CreditCard className="size-4 text-white" />
                </div>
                <span className="text-sm text-white/60">Payment Method</span>
              </div>
              <p className="font-bricolage text-lg font-semibold text-white">PayPal</p>
              <p className="text-sm text-white/40 mt-1 truncate">ashton@fitness.com</p>
              <button className="mt-3 text-sm text-coral hover:text-coral/80 transition-colors">
                Update payment method
              </button>
            </div>
          </div>
        </div>

        {/* Payout History */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden border-gradient">
          <div className="p-5 border-b border-white/[0.06]">
            <h3 className="font-bricolage text-lg font-semibold text-white">Payment History</h3>
          </div>
          <div className="overflow-x-auto">
            {payouts.length === 0 ? (
              <div className="p-12 text-center">
                <Wallet className="size-12 mx-auto text-white/20 mb-3" />
                <p className="text-white/50">No payouts yet</p>
                <p className="text-sm text-white/30">
                  Payouts will appear here once you've earned commissions
                </p>
              </div>
            ) : (
              <table className="w-full min-w-[500px]">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-white/40">Date</th>
                    <th className="px-5 py-3 text-right text-[11px] font-medium uppercase tracking-wider text-white/40">Amount</th>
                    <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-white/40">Method</th>
                    <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-white/40">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payouts.map((payout) => (
                    <tr key={payout.id} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-4 text-sm text-white/70">{payout.date}</td>
                      <td className="px-5 py-4 text-right">
                        <span className="font-mono font-semibold text-white">{payout.amount}</span>
                      </td>
                      <td className="px-5 py-4 text-sm text-white/50">{payout.method}</td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5 text-emerald-400 text-sm font-medium">
                          <CheckCircle className="size-4" />
                          Paid
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
