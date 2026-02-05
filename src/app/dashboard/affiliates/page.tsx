"use client"

import { useState } from "react"
import {
  Plus,
  MoreHorizontal,
  Mail,
  Building2,
  DollarSign,
  Edit,
  Trash2,
  ExternalLink,
  Users,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  ModalTrigger,
} from "@/components/ui/modal"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const affiliates = [
  {
    id: 1,
    name: "Health Pro Shop",
    email: "admin@healthproshop.com",
    brands: 3,
    orders: 1481,
    revenue: "$142,847.00",
    commission: "$14,284.70",
    status: "active",
    joinedAt: "Jan 15, 2025",
  },
  {
    id: 2,
    name: "Wellness Direct",
    email: "support@wellnessdirect.com",
    brands: 2,
    orders: 1070,
    revenue: "$98,432.00",
    commission: "$9,843.20",
    status: "active",
    joinedAt: "Feb 3, 2025",
  },
  {
    id: 3,
    name: "BioFit Store",
    email: "hello@biofitstore.com",
    brands: 2,
    orders: 634,
    revenue: "$67,234.00",
    commission: "$6,723.40",
    status: "active",
    joinedAt: "Mar 12, 2025",
  },
  {
    id: 4,
    name: "Supplement Hub",
    email: "contact@supplementhub.io",
    brands: 1,
    orders: 245,
    revenue: "$28,945.00",
    commission: "$2,894.50",
    status: "pending",
    joinedAt: "Jan 22, 2026",
  },
]

const stats = [
  { label: "Total Affiliates", value: "24", icon: Users, trend: "+3 this month" },
  { label: "Total Revenue", value: "$337,458", icon: DollarSign, trend: "+12.5%" },
  { label: "Commissions Paid", value: "$33,745", icon: TrendingUp, trend: "This month" },
]

function getStatusBadge(status: string) {
  switch (status) {
    case "active":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Active
        </span>
      )
    case "pending":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-400 ring-1 ring-inset ring-amber-500/20">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
          Pending
        </span>
      )
    case "suspended":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 px-2.5 py-1 text-xs font-medium text-rose-400 ring-1 ring-inset ring-rose-500/20">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
          Suspended
        </span>
      )
    default:
      return (
        <span className="inline-flex items-center rounded-full bg-white/5 px-2.5 py-1 text-xs font-medium text-white/50 ring-1 ring-inset ring-white/10">
          {status}
        </span>
      )
  }
}

function AddAffiliateModal() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [commissionRate, setCommissionRate] = useState("10")

  const handleReset = () => {
    setName("")
    setEmail("")
    setCommissionRate("10")
  }

  return (
    <Modal onOpenChange={(open) => !open && handleReset()}>
      <ModalTrigger asChild>
        <Button className="bg-coral hover:bg-coral/90 text-white border-0">
          <Plus className="size-4" />
          Add Affiliate
        </Button>
      </ModalTrigger>
      <ModalContent className="bg-[#0a0a14] border-white/10">
        <ModalHeader>
          <ModalTitle className="text-white">Add New Affiliate</ModalTitle>
          <ModalDescription className="text-white/50">
            Create a new affiliate account for brand partnerships.
          </ModalDescription>
        </ModalHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="aff-name" className="text-white/70">Business Name</Label>
            <Input
              id="aff-name"
              placeholder="e.g., Health Pro Shop"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="aff-email" className="text-white/70">Contact Email</Label>
            <Input
              id="aff-email"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="commission" className="text-white/70">Commission Rate (%)</Label>
            <Input
              id="commission"
              type="number"
              min="0"
              max="100"
              value={commissionRate}
              onChange={(e) => setCommissionRate(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
            />
            <p className="text-xs text-white/40">
              Default commission rate for all brands under this affiliate.
            </p>
          </div>
        </div>

        <ModalFooter>
          <button onClick={handleReset} className="rounded-xl border border-white/10 bg-transparent px-4 py-2 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all">
            Cancel
          </button>
          <Button className="bg-coral hover:bg-coral/90 text-white" disabled={!name || !email}>
            Create Affiliate
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default function AffiliatesPage() {
  return (
    <div className="min-h-screen bg-[#050510] text-white">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(10,69,145,0.08),transparent)]" />
      </div>

      <div className="p-6 lg:p-8 space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-white/40 mb-1">
              <a href="/dashboard" className="hover:text-white/70 transition-colors">Dashboard</a>
              <span>/</span>
              <span className="text-white/70">Affiliates</span>
            </div>
            <h1 className="font-bricolage text-2xl font-semibold tracking-tight text-white">Affiliates</h1>
            <p className="text-sm text-white/50 mt-1">Manage affiliate partnerships and commissions</p>
          </div>
          <AddAffiliateModal />
        </div>

        {/* Stats Row */}
        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 border-gradient"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-xs font-medium text-white/40 uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <p className="font-bricolage text-2xl font-semibold tracking-tight text-white">
                    {stat.value}
                  </p>
                  <p className="text-xs text-white/40">{stat.trend}</p>
                </div>
                <div className="flex size-10 items-center justify-center rounded-xl bg-white/[0.06] text-white/40">
                  <stat.icon className="size-5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Affiliates Table */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden border-gradient">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-white/[0.06] hover:bg-transparent">
                  <TableHead className="text-[11px] font-medium uppercase tracking-wider text-white/40">
                    Affiliate
                  </TableHead>
                  <TableHead className="text-[11px] font-medium uppercase tracking-wider text-white/40 text-center">
                    Brands
                  </TableHead>
                  <TableHead className="text-[11px] font-medium uppercase tracking-wider text-white/40 text-center">
                    Orders
                  </TableHead>
                  <TableHead className="text-[11px] font-medium uppercase tracking-wider text-white/40 text-right">
                    Revenue
                  </TableHead>
                  <TableHead className="text-[11px] font-medium uppercase tracking-wider text-white/40 text-right">
                    Commission
                  </TableHead>
                  <TableHead className="text-[11px] font-medium uppercase tracking-wider text-white/40">
                    Status
                  </TableHead>
                  <TableHead className="text-[11px] font-medium uppercase tracking-wider text-white/40">
                    Joined
                  </TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {affiliates.map((affiliate) => (
                  <TableRow key={affiliate.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="size-9 border border-white/10">
                          <AvatarFallback className="bg-gradient-to-br from-navy to-navy/70 text-white text-xs font-semibold">
                            {affiliate.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-white">{affiliate.name}</p>
                          <p className="text-xs text-white/40">{affiliate.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <Building2 className="size-3.5 text-white/40" />
                        <span className="font-medium text-white/70">{affiliate.brands}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-medium text-white/70">
                      {affiliate.orders.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="font-mono text-sm font-medium text-white">{affiliate.revenue}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="font-mono text-sm font-medium text-emerald-400">{affiliate.commission}</span>
                    </TableCell>
                    <TableCell>{getStatusBadge(affiliate.status)}</TableCell>
                    <TableCell className="text-sm text-white/40">
                      {affiliate.joinedAt}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="flex h-8 w-8 items-center justify-center rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors">
                            <MoreHorizontal className="size-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-[#0a0a14] border-white/10">
                          <DropdownMenuItem className="text-white/70 hover:text-white hover:bg-white/5">
                            <ExternalLink className="mr-2 size-4" />
                            View details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-white/70 hover:text-white hover:bg-white/5">
                            <Edit className="mr-2 size-4" />
                            Edit affiliate
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-white/70 hover:text-white hover:bg-white/5">
                            <Mail className="mr-2 size-4" />
                            Send email
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-white/10" />
                          <DropdownMenuItem className="text-coral hover:text-coral hover:bg-coral/10">
                            <Trash2 className="mr-2 size-4" />
                            Suspend affiliate
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}
