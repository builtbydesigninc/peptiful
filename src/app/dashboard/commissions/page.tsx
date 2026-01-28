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
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
import { PageHeader } from "@/components/ui/page-header"
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

function ExpandableRow({ commission }: { commission: typeof unpaidCommissions[0] }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <TableRow
        className="cursor-pointer hover:bg-muted/50"
        onClick={() => setExpanded(!expanded)}
      >
        <TableCell>
          <Button variant="ghost" size="icon-xs" className="mr-2">
            {expanded ? (
              <ChevronDown className="size-4" />
            ) : (
              <ChevronRight className="size-4" />
            )}
          </Button>
          <span className="font-semibold">{commission.affiliate}</span>
        </TableCell>
        <TableCell className="text-center font-medium">
          {commission.orders}
        </TableCell>
        <TableCell className="text-right font-semibold text-navy">
          {commission.totalAmount}
        </TableCell>
        <TableCell>
          <Badge variant="pending">Unpaid</Badge>
        </TableCell>
      </TableRow>
      {expanded && (
        <>
          {commission.brands.map((brand, index) => (
            <TableRow
              key={index}
              className="bg-muted/20 hover:bg-muted/30"
            >
              <TableCell className="pl-14 text-muted-foreground">
                {brand.name}
              </TableCell>
              <TableCell className="text-center text-muted-foreground">
                {brand.orders}
              </TableCell>
              <TableCell className="text-right text-muted-foreground">
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
        <Button variant="accent">
          <CreditCard className="size-4" />
          Generate Payout
        </Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>
            {step === 1 ? "Generate Payout" : "Payout Generated"}
          </ModalTitle>
          <ModalDescription>
            {step === 1
              ? "Review and confirm commission payouts for all affiliates."
              : "The payout has been successfully processed."}
          </ModalDescription>
        </ModalHeader>

        {step === 1 ? (
          <div className="space-y-4">
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">Total Payout</span>
                <span className="text-2xl font-bold text-navy">{totalAmount}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Affiliates</span>
                <span className="font-medium">{selectedAffiliates}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total Orders</span>
                <span className="font-medium">
                  {unpaidCommissions.reduce((acc, c) => acc + c.orders, 0)}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Affiliates included:</p>
              <div className="space-y-1">
                {unpaidCommissions.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center justify-between text-sm py-1"
                  >
                    <span>{c.affiliate}</span>
                    <span className="font-medium">{c.totalAmount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-lg bg-green-50 p-4 text-green-700">
              <CheckCircle className="size-6" />
              <div>
                <p className="font-semibold">Payout processed successfully!</p>
                <p className="text-sm">Reference: PAY-2026-0127-001</p>
              </div>
            </div>

            <div className="rounded-lg border border-border p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-semibold">{totalAmount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Affiliates</span>
                <span>{selectedAffiliates}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Date</span>
                <span>Jan 27, 2026</span>
              </div>
            </div>
          </div>
        )}

        <ModalFooter>
          {step === 1 ? (
            <>
              <Button variant="outline" onClick={handleReset}>
                Cancel
              </Button>
              <Button variant="accent" onClick={handleGenerate}>
                Confirm Payout
              </Button>
            </>
          ) : (
            <Button variant="default" onClick={handleReset}>
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

  const totalUnpaid = "$5,663.70"
  const totalPending = unpaidCommissions.reduce((acc, c) => acc + c.orders, 0)

  return (
    <div className="p-8 space-y-6">
      <PageHeader
        title="Commissions"
        description="Track and manage affiliate commission payouts"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Commissions" },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="size-4" />
              Export
            </Button>
            <GeneratePayoutModal />
          </div>
        }
      />

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-white">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Unpaid Commissions</p>
                <p className="text-2xl font-bold text-coral">{totalUnpaid}</p>
              </div>
              <div className="flex size-10 items-center justify-center rounded-lg bg-coral/10 text-coral">
                <Clock className="size-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Orders</p>
                <p className="text-2xl font-bold text-dark-navy">{totalPending}</p>
              </div>
              <div className="flex size-10 items-center justify-center rounded-lg bg-lavender text-navy">
                <DollarSign className="size-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Paid This Month</p>
                <p className="text-2xl font-bold text-navy">$11,228.70</p>
              </div>
              <div className="flex size-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
                <CheckCircle className="size-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border">
        <button
          onClick={() => setActiveTab("unpaid")}
          className={cn(
            "px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px",
            activeTab === "unpaid"
              ? "border-navy text-navy"
              : "border-transparent text-muted-foreground hover:text-foreground"
          )}
        >
          Unpaid
          <Badge variant="pending" className="ml-2">
            {unpaidCommissions.length}
          </Badge>
        </button>
        <button
          onClick={() => setActiveTab("paid")}
          className={cn(
            "px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px",
            activeTab === "paid"
              ? "border-navy text-navy"
              : "border-transparent text-muted-foreground hover:text-foreground"
          )}
        >
          Paid History
        </button>
      </div>

      {/* Table */}
      <Card className="bg-white">
        <CardContent className="p-0">
          {activeTab === "unpaid" ? (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 hover:bg-muted/30">
                  <TableHead className="font-semibold">Affiliate</TableHead>
                  <TableHead className="font-semibold text-center">Orders</TableHead>
                  <TableHead className="font-semibold text-right">Amount</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
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
                <TableRow className="bg-muted/30 hover:bg-muted/30">
                  <TableHead className="font-semibold">Affiliate</TableHead>
                  <TableHead className="font-semibold text-center">Orders</TableHead>
                  <TableHead className="font-semibold text-right">Amount</TableHead>
                  <TableHead className="font-semibold">Paid Date</TableHead>
                  <TableHead className="font-semibold">Reference</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paidHistory.map((payout) => (
                  <TableRow key={payout.id}>
                    <TableCell className="font-semibold">
                      {payout.affiliate}
                    </TableCell>
                    <TableCell className="text-center">
                      {payout.orders}
                    </TableCell>
                    <TableCell className="text-right font-semibold text-navy">
                      {payout.amount}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {payout.paidAt}
                    </TableCell>
                    <TableCell>
                      <code className="text-xs font-mono text-muted-foreground">
                        {payout.reference}
                      </code>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
