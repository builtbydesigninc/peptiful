"use client"

import { useState } from "react"
import {
  DollarSign,
  ChevronDown,
  ChevronRight,
  Download,
  CreditCard,
  CheckCircle,
  Clock,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  ModalTrigger,
} from "@/components/ui/modal"
import { cn } from "@/lib/utils"

const unpaidCommissions = [
  {
    id: 1,
    affiliate: "Health Pro Shop",
    totalAmount: "$2,847.50",
    orders: 47,
    brands: [
      { name: "Peptide Sciences", orders: 28, amount: "$1,892.30" },
      { name: "Core Peptides", orders: 12, amount: "$678.20" },
      { name: "Research Peptides", orders: 7, amount: "$277.00" },
    ],
  },
  {
    id: 2,
    affiliate: "Wellness Direct",
    totalAmount: "$1,923.80",
    orders: 32,
    brands: [
      { name: "Core Peptides", orders: 18, amount: "$1,124.50" },
      { name: "Premium Peptides Co", orders: 14, amount: "$799.30" },
    ],
  },
  {
    id: 3,
    affiliate: "BioFit Store",
    totalAmount: "$892.40",
    orders: 15,
    brands: [
      { name: "Amino Asylum", orders: 15, amount: "$892.40" },
    ],
  },
]

const paidHistory = [
  {
    id: 1,
    affiliate: "Health Pro Shop",
    amount: "$3,247.80",
    orders: 54,
    paidAt: "Jan 20, 2026",
    method: "Bank Transfer",
    reference: "PAY-2026-0120-001",
  },
  {
    id: 2,
    affiliate: "Wellness Direct",
    amount: "$2,156.30",
    orders: 38,
    paidAt: "Jan 20, 2026",
    method: "Bank Transfer",
    reference: "PAY-2026-0120-002",
  },
  {
    id: 3,
    affiliate: "BioFit Store",
    amount: "$1,087.90",
    orders: 21,
    paidAt: "Jan 20, 2026",
    method: "Bank Transfer",
    reference: "PAY-2026-0120-003",
  },
  {
    id: 4,
    affiliate: "Health Pro Shop",
    amount: "$2,891.50",
    orders: 48,
    paidAt: "Jan 13, 2026",
    method: "Bank Transfer",
    reference: "PAY-2026-0113-001",
  },
  {
    id: 5,
    affiliate: "Wellness Direct",
    amount: "$1,845.20",
    orders: 31,
    paidAt: "Jan 13, 2026",
    method: "Bank Transfer",
    reference: "PAY-2026-0113-002",
  },
]

const stats = [
  { label: "Unpaid Commissions", value: "$5,663.70", icon: Clock, accent: true },
  { label: "Pending Orders", value: "94", icon: DollarSign },
  { label: "Paid This Month", value: "$11,228.70", icon: CheckCircle },
]

function ExpandableRow({ commission }: { commission: typeof unpaidCommissions[0] }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <TableRow
        className="cursor-pointer border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <TableCell>
          <div className="flex items-center gap-2">
            <button className="text-white/40 hover:text-white/70">
              {expanded ? (
                <ChevronDown className="size-4" />
              ) : (
                <ChevronRight className="size-4" />
              )}
            </button>
            <span className="font-medium text-white">{commission.affiliate}</span>
          </div>
        </TableCell>
        <TableCell className="text-center text-white/70">
          {commission.orders}
        </TableCell>
        <TableCell className="text-right">
          <span className="font-mono text-sm font-medium text-emerald-400">{commission.totalAmount}</span>
        </TableCell>
        <TableCell>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-400 ring-1 ring-inset ring-amber-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            Unpaid
          </span>
        </TableCell>
      </TableRow>
      {expanded && (
        <>
          {commission.brands.map((brand, index) => (
            <TableRow
              key={index}
              className="bg-white/[0.01] border-b border-white/[0.02]"
            >
              <TableCell className="pl-12 text-white/50">
                {brand.name}
              </TableCell>
              <TableCell className="text-center text-white/40">
                {brand.orders}
              </TableCell>
              <TableCell className="text-right text-white/40 font-mono text-sm">
                {brand.amount}
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </>
      )}
    </>
  )
}

function GeneratePayoutModal() {
  const [step, setStep] = useState(1)
  const totalAmount = "$5,663.70"
  const selectedAffiliates = unpaidCommissions.length

  const handleGenerate = () => {
    setStep(2)
  }

  const handleReset = () => {
    setStep(1)
  }

  return (
    <Modal onOpenChange={(open) => !open && handleReset()}>
      <ModalTrigger asChild>
        <Button className="bg-coral hover:bg-coral/90 text-white border-0">
          <CreditCard className="size-4" />
          Generate Payout
        </Button>
      </ModalTrigger>
      <ModalContent className="bg-[#0a0a14] border-white/10">
        <ModalHeader>
          <ModalTitle className="text-white">
            {step === 1 ? "Generate Payout" : "Payout Generated"}
          </ModalTitle>
          <ModalDescription className="text-white/50">
            {step === 1
              ? "Review and confirm commission payouts for all affiliates."
              : "The payout has been successfully processed."}
          </ModalDescription>
        </ModalHeader>

        {step === 1 ? (
          <div className="space-y-4">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-white/50">Total Payout</span>
                <span className="text-2xl font-bold text-white">{totalAmount}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/40">Affiliates</span>
                <span className="font-medium text-white/70">{selectedAffiliates}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/40">Total Orders</span>
                <span className="font-medium text-white/70">
                  {unpaidCommissions.reduce((acc, c) => acc + c.orders, 0)}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-white/70">Affiliates included:</p>
              <div className="space-y-1">
                {unpaidCommissions.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center justify-between text-sm py-1"
                  >
                    <span className="text-white/60">{c.affiliate}</span>
                    <span className="font-medium text-white/80">{c.totalAmount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-xl bg-emerald-500/10 p-4 text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
              <CheckCircle className="size-6" />
              <div>
                <p className="font-semibold">Payout processed successfully!</p>
                <p className="text-sm text-emerald-400/70">Reference: PAY-2026-0127-001</p>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/40">Amount</span>
                <span className="font-semibold text-white">{totalAmount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/40">Affiliates</span>
                <span className="text-white/70">{selectedAffiliates}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/40">Date</span>
                <span className="text-white/70">Jan 27, 2026</span>
              </div>
            </div>
          </div>
        )}

        <ModalFooter>
          {step === 1 ? (
            <>
              <button onClick={handleReset} className="rounded-xl border border-white/10 bg-transparent px-4 py-2 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all">
                Cancel
              </button>
              <Button className="bg-coral hover:bg-coral/90 text-white" onClick={handleGenerate}>
                Confirm Payout
              </Button>
            </>
          ) : (
            <Button className="bg-white text-[#050510] hover:bg-white/90" onClick={handleReset}>
              Done
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default function CommissionsPage() {
  const [activeTab, setActiveTab] = useState<"unpaid" | "paid">("unpaid")

  return (
    <div className="min-h-screen bg-[#050510] text-white">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(235,92,106,0.06),transparent)]" />
      </div>

      <div className="p-6 lg:p-8 space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-white/40 mb-1">
              <a href="/dashboard" className="hover:text-white/70 transition-colors">Dashboard</a>
              <span>/</span>
              <span className="text-white/70">Commissions</span>
            </div>
            <h1 className="font-bricolage text-2xl font-semibold tracking-tight text-white">Commissions</h1>
            <p className="text-sm text-white/50 mt-1">Track and manage affiliate commission payouts</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20 transition-all border border-white/10">
              <Download className="size-4" />
              Export
            </button>
            <GeneratePayoutModal />
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={cn(
                "rounded-2xl border border-white/[0.08] p-5 border-gradient",
                stat.accent ? "bg-coral/5" : "bg-white/[0.02]"
              )}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-xs font-medium text-white/40 uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <p className={cn(
                    "font-bricolage text-2xl font-semibold tracking-tight",
                    stat.accent ? "text-coral" : "text-white"
                  )}>
                    {stat.value}
                  </p>
                </div>
                <div className={cn(
                  "flex size-10 items-center justify-center rounded-xl",
                  stat.accent ? "bg-coral/10 text-coral" : "bg-white/[0.06] text-white/40"
                )}>
                  <stat.icon className="size-5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-white/[0.06]">
          <button
            onClick={() => setActiveTab("unpaid")}
            className={cn(
              "px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px",
              activeTab === "unpaid"
                ? "border-white text-white"
                : "border-transparent text-white/40 hover:text-white/70"
            )}
          >
            Unpaid
            <span className="ml-2 inline-flex items-center rounded-full bg-coral/20 px-2 py-0.5 text-[10px] font-semibold text-coral">
              {unpaidCommissions.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("paid")}
            className={cn(
              "px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px",
              activeTab === "paid"
                ? "border-white text-white"
                : "border-transparent text-white/40 hover:text-white/70"
            )}
          >
            Paid History
          </button>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden border-gradient">
          {activeTab === "unpaid" ? (
            <Table>
              <TableHeader>
                <TableRow className="border-b border-white/[0.06] hover:bg-transparent">
                  <TableHead className="text-[11px] font-medium uppercase tracking-wider text-white/40">
                    Affiliate
                  </TableHead>
                  <TableHead className="text-[11px] font-medium uppercase tracking-wider text-white/40 text-center">
                    Orders
                  </TableHead>
                  <TableHead className="text-[11px] font-medium uppercase tracking-wider text-white/40 text-right">
                    Amount
                  </TableHead>
                  <TableHead className="text-[11px] font-medium uppercase tracking-wider text-white/40">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {unpaidCommissions.map((commission) => (
                  <ExpandableRow key={commission.id} commission={commission} />
                ))}
              </TableBody>
            </Table>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-b border-white/[0.06] hover:bg-transparent">
                  <TableHead className="text-[11px] font-medium uppercase tracking-wider text-white/40">
                    Affiliate
                  </TableHead>
                  <TableHead className="text-[11px] font-medium uppercase tracking-wider text-white/40 text-center">
                    Orders
                  </TableHead>
                  <TableHead className="text-[11px] font-medium uppercase tracking-wider text-white/40 text-right">
                    Amount
                  </TableHead>
                  <TableHead className="text-[11px] font-medium uppercase tracking-wider text-white/40">
                    Paid Date
                  </TableHead>
                  <TableHead className="text-[11px] font-medium uppercase tracking-wider text-white/40">
                    Reference
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paidHistory.map((payout) => (
                  <TableRow key={payout.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                    <TableCell className="font-medium text-white">
                      {payout.affiliate}
                    </TableCell>
                    <TableCell className="text-center text-white/70">
                      {payout.orders}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="font-mono text-sm font-medium text-emerald-400">{payout.amount}</span>
                    </TableCell>
                    <TableCell className="text-white/40">
                      {payout.paidAt}
                    </TableCell>
                    <TableCell>
                      <code className="text-xs font-mono text-white/40">
                        {payout.reference}
                      </code>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  )
}
