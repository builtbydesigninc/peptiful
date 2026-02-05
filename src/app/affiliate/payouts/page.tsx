"use client"

import {
  Download,
  CheckCircle,
  DollarSign,
  Calendar,
  CreditCard,
  FileText,
  Wallet,
} from "lucide-react"
import { useAffiliate } from "../context"

const allPayouts = [
  {
    id: "PAY-2026-0120",
    date: "Jan 20, 2026",
    amount: "$3,247.80",
    orders: 54,
    method: "Bank Transfer",
    status: "completed",
    reference: "TRF-789456123",
    brandIds: ["hoa", "tpm"],
  },
  {
    id: "PAY-2026-0105",
    date: "Jan 5, 2026",
    amount: "$2,891.50",
    orders: 48,
    method: "Bank Transfer",
    status: "completed",
    reference: "TRF-789456122",
    brandIds: ["hoa", "tpm"],
  },
  {
    id: "PAY-2025-1220",
    date: "Dec 20, 2025",
    amount: "$4,156.30",
    orders: 67,
    method: "Bank Transfer",
    status: "completed",
    reference: "TRF-789456121",
    brandIds: ["hoa"],
  },
  {
    id: "PAY-2025-1205",
    date: "Dec 5, 2025",
    amount: "$3,578.90",
    orders: 58,
    method: "Bank Transfer",
    status: "completed",
    reference: "TRF-789456120",
    brandIds: ["hoa", "tpm"],
  },
  {
    id: "PAY-2025-1120",
    date: "Nov 20, 2025",
    amount: "$2,934.20",
    orders: 49,
    method: "Bank Transfer",
    status: "completed",
    reference: "TRF-789456119",
    brandIds: ["tpm"],
  },
  {
    id: "PAY-2025-1105",
    date: "Nov 5, 2025",
    amount: "$3,245.60",
    orders: 53,
    method: "Bank Transfer",
    status: "completed",
    reference: "TRF-789456118",
    brandIds: ["hoa"],
  },
]

const nextPayoutData = {
  all: { date: "Feb 1, 2026", amount: "$3,847.50", orders: 62, daysUntil: 5 },
  hoa: { date: "Feb 1, 2026", amount: "$2,523.40", orders: 38, daysUntil: 5 },
  tpm: { date: "Feb 1, 2026", amount: "$1,324.10", orders: 24, daysUntil: 5 },
  ps: { date: "—", amount: "$0.00", orders: 0, daysUntil: 0 },
}

export default function AffiliatePayoutsPage() {
  const { user, getSelectedBrand, getVisibleBrands } = useAffiliate()

  if (!user) return null

  const isAffiliate = user.role === "affiliate"
  const selectedBrand = getSelectedBrand()
  const visibleBrands = getVisibleBrands()

  // Filter payouts based on role and selection
  let payouts = allPayouts.filter(p => 
    p.brandIds.some(bid => visibleBrands.some(vb => vb.id === bid))
  )
  if (selectedBrand) {
    payouts = payouts.filter(p => p.brandIds.includes(selectedBrand.id))
  }

  // Get next payout data
  const nextPayout = selectedBrand
    ? nextPayoutData[selectedBrand.id as keyof typeof nextPayoutData] || nextPayoutData.all
    : isAffiliate
      ? nextPayoutData.all
      : nextPayoutData[user.brands[0]?.id as keyof typeof nextPayoutData] || nextPayoutData.all

  const totalPaid = payouts.reduce(
    (acc, p) => acc + parseFloat(p.amount.replace("$", "").replace(",", "")),
    0
  )

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
            {selectedBrand ? `${selectedBrand.name} Payouts` : "Payout History"}
          </h2>
          <p className="text-sm text-white/50 mt-1">
            {selectedBrand
              ? `Payment history for ${selectedBrand.name}`
              : "Track your earnings and payment history"
            }
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* Next Payout */}
          <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-gradient-to-br from-emerald-500/20 via-emerald-500/10 to-transparent border-gradient">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.15)_0%,transparent_60%)]" />
            <div className="relative p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-500/20 backdrop-blur-sm">
                  <Calendar className="size-4 text-emerald-400" />
                </div>
                <span className="text-sm text-white/60">Next Payout</span>
              </div>
              <p className="font-bricolage text-3xl sm:text-4xl font-bold text-white mb-2">{nextPayout.amount}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/50">{nextPayout.orders} orders</span>
                {nextPayout.daysUntil > 0 && (
                  <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-2.5 py-1 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/30">
                    {nextPayout.daysUntil} days
                  </span>
                )}
              </div>
              <p className="text-sm text-white/40 mt-3">{nextPayout.date}</p>
            </div>
          </div>

          {/* Total Paid */}
          <div className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6 hover:bg-white/[0.04] transition-all duration-300 border-gradient overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-navy/60 to-sky-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-navy to-sky-600 shadow-lg">
                  <DollarSign className="size-4 text-white" />
                </div>
                <span className="text-sm text-white/60">Total Paid Out</span>
              </div>
              <p className="font-bricolage text-2xl sm:text-3xl font-semibold text-white truncate">
                ${totalPaid.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </p>
              <p className="text-sm text-white/40 mt-2">
                {payouts.length} payouts all time
              </p>
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
              <p className="font-bricolage text-lg font-semibold text-white">Bank Transfer</p>
              <p className="text-sm text-white/40 mt-1 truncate font-mono">
                ****4567 • Chase Bank
              </p>
              <button className="mt-3 text-sm text-sky-400 hover:text-sky-300 transition-colors">
                Update payment method
              </button>
            </div>
          </div>
        </div>

        {/* Payout History Table */}
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
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-white/40">Payout ID</th>
                    <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-white/40">Date</th>
                    <th className="px-5 py-3 text-right text-[11px] font-medium uppercase tracking-wider text-white/40">Amount</th>
                    <th className="px-5 py-3 text-center text-[11px] font-medium uppercase tracking-wider text-white/40 hidden sm:table-cell">Orders</th>
                    <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-white/40">Status</th>
                    <th className="px-5 py-3 text-right text-[11px] font-medium uppercase tracking-wider text-white/40">Invoice</th>
                  </tr>
                </thead>
                <tbody>
                  {payouts.map((payout) => (
                    <tr key={payout.id} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-4">
                        <span className="font-mono font-medium text-white text-sm">{payout.id}</span>
                      </td>
                      <td className="px-5 py-4 text-sm text-white/50 whitespace-nowrap">{payout.date}</td>
                      <td className="px-5 py-4 text-right">
                        <span className="font-mono font-semibold text-white text-sm">{payout.amount}</span>
                      </td>
                      <td className="px-5 py-4 text-center text-sm text-white/50 hidden sm:table-cell">{payout.orders}</td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium text-sm">
                          <CheckCircle className="size-4" />
                          <span className="hidden sm:inline">Completed</span>
                          <span className="sm:hidden">Done</span>
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-xs font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all">
                          <FileText className="size-3.5" />
                          <span className="hidden sm:inline">Download</span>
                        </button>
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
