"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Download,
  Search,
  Filter,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Calendar,
  ShoppingCart,
  TrendingUp,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const orders = [
  {
    id: "HOA-709",
    brand: "Peptide Sciences",
    affiliate: "Health Pro Shop",
    customer: "John Smith",
    email: "john@email.com",
    items: 3,
    total: "$289.97",
    status: "processing",
    date: "Jan 27, 2026 14:32",
  },
  {
    id: "HOA-708",
    brand: "Core Peptides",
    affiliate: "Wellness Direct",
    customer: "Sarah Johnson",
    email: "sarah.j@email.com",
    items: 1,
    total: "$149.99",
    status: "completed",
    date: "Jan 27, 2026 14:15",
  },
  {
    id: "HOA-707",
    brand: "Peptide Sciences",
    affiliate: "Health Pro Shop",
    customer: "Mike Williams",
    email: "mike.w@email.com",
    items: 5,
    total: "$459.95",
    status: "completed",
    date: "Jan 27, 2026 13:58",
  },
  {
    id: "HOA-706",
    brand: "Amino Asylum",
    affiliate: "BioFit Store",
    customer: "Emily Brown",
    email: "emily.b@email.com",
    items: 2,
    total: "$199.98",
    status: "failed",
    date: "Jan 27, 2026 13:22",
  },
  {
    id: "HOA-705",
    brand: "Core Peptides",
    affiliate: "Wellness Direct",
    customer: "David Lee",
    email: "david.lee@email.com",
    items: 4,
    total: "$379.96",
    status: "completed",
    date: "Jan 27, 2026 12:45",
  },
  {
    id: "HOA-704",
    brand: "Peptide Sciences",
    affiliate: "Health Pro Shop",
    customer: "Lisa Chen",
    email: "lisa.c@email.com",
    items: 2,
    total: "$219.98",
    status: "completed",
    date: "Jan 27, 2026 11:30",
  },
  {
    id: "HOA-703",
    brand: "Core Peptides",
    affiliate: "BioFit Store",
    customer: "James Wilson",
    email: "james.w@email.com",
    items: 1,
    total: "$89.99",
    status: "processing",
    date: "Jan 27, 2026 10:15",
  },
  {
    id: "HOA-702",
    brand: "Amino Asylum",
    affiliate: "Wellness Direct",
    customer: "Anna Martinez",
    email: "anna.m@email.com",
    items: 3,
    total: "$329.97",
    status: "completed",
    date: "Jan 27, 2026 09:48",
  },
]

const stats = [
  { label: "Total Orders", value: "247", icon: ShoppingCart, trend: "+12 today" },
  { label: "Revenue Today", value: "$4,892", icon: TrendingUp, trend: "+18.5%" },
  { label: "Pending", value: "12", icon: Clock, trend: "Processing" },
]

function getStatusBadge(status: string) {
  switch (status) {
    case "processing":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-400 ring-1 ring-inset ring-amber-500/20">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
          Processing
        </span>
      )
    case "completed":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Completed
        </span>
      )
    case "failed":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 px-2.5 py-1 text-xs font-medium text-rose-400 ring-1 ring-inset ring-rose-500/20">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
          Failed
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

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")

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
              <span className="text-white/70">Orders</span>
            </div>
            <h1 className="font-bricolage text-2xl font-semibold tracking-tight text-white">Orders</h1>
            <p className="text-sm text-white/50 mt-1">Manage and track all orders across your brands</p>
          </div>
          <button className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20 transition-all border border-white/10">
            <Download className="size-4" />
            Export
          </button>
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

        {/* Filters */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 border-gradient">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/40" />
              <Input
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-white/30"
              />
            </div>
            <Select>
              <SelectTrigger className="w-[180px] bg-white/5 border-white/10 text-white">
                <SelectValue placeholder="All Brands" />
              </SelectTrigger>
              <SelectContent className="bg-[#0a0a14] border-white/10">
                <SelectItem value="all" className="text-white/70 hover:text-white hover:bg-white/5">All Brands</SelectItem>
                <SelectItem value="peptide-sciences" className="text-white/70 hover:text-white hover:bg-white/5">Peptide Sciences</SelectItem>
                <SelectItem value="core-peptides" className="text-white/70 hover:text-white hover:bg-white/5">Core Peptides</SelectItem>
                <SelectItem value="amino-asylum" className="text-white/70 hover:text-white hover:bg-white/5">Amino Asylum</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[150px] bg-white/5 border-white/10 text-white">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent className="bg-[#0a0a14] border-white/10">
                <SelectItem value="all" className="text-white/70 hover:text-white hover:bg-white/5">All Status</SelectItem>
                <SelectItem value="processing" className="text-white/70 hover:text-white hover:bg-white/5">Processing</SelectItem>
                <SelectItem value="completed" className="text-white/70 hover:text-white hover:bg-white/5">Completed</SelectItem>
                <SelectItem value="failed" className="text-white/70 hover:text-white hover:bg-white/5">Failed</SelectItem>
              </SelectContent>
            </Select>
            <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all">
              <Calendar className="size-4" />
              Date Range
            </button>
            <Button variant="ghost" className="ml-auto text-white/50 hover:text-white hover:bg-white/5">
              <Filter className="size-4" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden border-gradient">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-white/[0.06] hover:bg-transparent">
                  <TableHead className="text-[11px] font-medium uppercase tracking-wider text-white/40">
                    Order ID
                  </TableHead>
                  <TableHead className="text-[11px] font-medium uppercase tracking-wider text-white/40">
                    Brand
                  </TableHead>
                  <TableHead className="text-[11px] font-medium uppercase tracking-wider text-white/40">
                    Customer
                  </TableHead>
                  <TableHead className="text-[11px] font-medium uppercase tracking-wider text-white/40 text-center">
                    Items
                  </TableHead>
                  <TableHead className="text-[11px] font-medium uppercase tracking-wider text-white/40 text-right">
                    Total
                  </TableHead>
                  <TableHead className="text-[11px] font-medium uppercase tracking-wider text-white/40">
                    Status
                  </TableHead>
                  <TableHead className="text-[11px] font-medium uppercase tracking-wider text-white/40">
                    Date
                  </TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                    <TableCell>
                      <Link
                        href={`/dashboard/orders/${order.id}`}
                        className="font-mono text-sm font-medium text-white hover:text-coral transition-colors"
                      >
                        {order.id}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-white/90">{order.brand}</p>
                        <p className="text-xs text-white/40">{order.affiliate}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-white/90">{order.customer}</p>
                        <p className="text-xs text-white/40">{order.email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-center text-white/70">{order.items}</TableCell>
                    <TableCell className="text-right">
                      <span className="font-mono text-sm font-medium text-white">
                        {order.total}
                      </span>
                    </TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell className="text-sm text-white/40">
                      {order.date}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="flex h-8 w-8 items-center justify-center rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors">
                            <MoreHorizontal className="size-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-[#0a0a14] border-white/10">
                          <DropdownMenuItem asChild className="text-white/70 hover:text-white hover:bg-white/5">
                            <Link href={`/dashboard/orders/${order.id}`}>
                              View details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-white/70 hover:text-white hover:bg-white/5">Resend notification</DropdownMenuItem>
                          <DropdownMenuItem className="text-white/70 hover:text-white hover:bg-white/5">Add tracking</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-white/[0.06] px-4 py-3">
            <p className="text-sm text-white/40">
              Showing <span className="font-medium text-white/70">1-8</span> of{" "}
              <span className="font-medium text-white/70">247</span> orders
            </p>
            <div className="flex items-center gap-1">
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/40 hover:bg-white/5 disabled:opacity-50" disabled>
                <ChevronsLeft className="size-4" />
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/40 hover:bg-white/5 disabled:opacity-50" disabled>
                <ChevronLeft className="size-4" />
              </button>
              <button className="flex h-8 min-w-[32px] items-center justify-center rounded-lg bg-white text-[#050510] text-sm font-medium">
                1
              </button>
              <button className="flex h-8 min-w-[32px] items-center justify-center rounded-lg border border-white/10 text-white/70 text-sm font-medium hover:bg-white/5">
                2
              </button>
              <button className="flex h-8 min-w-[32px] items-center justify-center rounded-lg border border-white/10 text-white/70 text-sm font-medium hover:bg-white/5">
                3
              </button>
              <span className="px-2 text-white/40">...</span>
              <button className="flex h-8 min-w-[32px] items-center justify-center rounded-lg border border-white/10 text-white/70 text-sm font-medium hover:bg-white/5">
                31
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/70 hover:bg-white/5">
                <ChevronRight className="size-4" />
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/70 hover:bg-white/5">
                <ChevronsRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
