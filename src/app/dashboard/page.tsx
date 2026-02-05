"use client"

import {
  Users,
  Building2,
  ShoppingCart,
  Clock,
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  ExternalLink,
  MoreHorizontal,
  ArrowUpRight,
  Activity,
  Zap,
} from "lucide-react"
import Link from "next/link"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const stats = [
  {
    label: "Active Affiliates",
    value: "24",
    icon: Users,
    trend: { value: 12, positive: true },
    accent: false,
  },
  {
    label: "Active Brands",
    value: "8",
    icon: Building2,
    trend: { value: 2, positive: true },
    accent: false,
  },
  {
    label: "Orders Today",
    value: "47",
    icon: ShoppingCart,
    trend: { value: 8, positive: true },
    accent: false,
  },
  {
    label: "Pending Fulfillment",
    value: "12",
    icon: Clock,
    trend: { value: 3, positive: false },
    accent: true,
  },
  {
    label: "Revenue This Week",
    value: "$24,892",
    icon: DollarSign,
    trend: { value: 18, positive: true },
    accent: false,
  },
]

const recentOrders = [
  {
    id: "HOA-709",
    brand: "Peptide Sciences",
    customer: "John Smith",
    items: 3,
    total: "$289.97",
    status: "processing",
    date: "2 min ago",
  },
  {
    id: "HOA-708",
    brand: "Core Peptides",
    customer: "Sarah Johnson",
    items: 1,
    total: "$149.99",
    status: "completed",
    date: "15 min ago",
  },
  {
    id: "HOA-707",
    brand: "Peptide Sciences",
    customer: "Mike Williams",
    items: 5,
    total: "$459.95",
    status: "completed",
    date: "32 min ago",
  },
  {
    id: "HOA-706",
    brand: "Amino Asylum",
    customer: "Emily Brown",
    items: 2,
    total: "$199.98",
    status: "failed",
    date: "1 hour ago",
  },
  {
    id: "HOA-705",
    brand: "Core Peptides",
    customer: "David Lee",
    items: 4,
    total: "$379.96",
    status: "completed",
    date: "2 hours ago",
  },
]

const alerts = [
  {
    id: 1,
    type: "error",
    message: "Webhook failed for Peptide Sciences - Order HOA-706",
    time: "1 hour ago",
  },
  {
    id: 2,
    type: "warning",
    message: "API rate limit approaching for Core Peptides (85%)",
    time: "3 hours ago",
  },
  {
    id: 3,
    type: "error",
    message: "SKU mapping missing: PS-BPC157-10 → Hub SKU",
    time: "5 hours ago",
  },
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

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#050510] text-white">
      {/* Page Background Pattern */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(235,92,106,0.08),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_80%_50%,rgba(10,69,145,0.08),transparent)]" />
      </div>

      <div className="p-6 lg:p-8 space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <h1 className="font-bricolage text-2xl font-semibold tracking-tight text-white">
              Dashboard
            </h1>
            <span className="flex items-center gap-1 rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-medium text-white/50 ring-1 ring-inset ring-white/10">
              <Activity className="h-3 w-3" />
              Live
            </span>
          </div>
          <p className="text-sm text-white/50">
            Welcome back. Here&apos;s what&apos;s happening today.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 stagger-children">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`group relative rounded-2xl border border-white/[0.08] p-5 transition-all duration-300 hover:border-white/[0.15] ${
                stat.accent 
                  ? "bg-gradient-to-br from-coral/20 to-coral/5" 
                  : "bg-white/[0.03]"
              } border-gradient glass-card-hover`}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <p className="text-xs font-medium text-white/40 uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <p className="font-bricolage text-3xl font-semibold tracking-tight text-white">
                    {stat.value}
                  </p>
                  <div className="flex items-center gap-1.5">
                    {stat.trend.positive ? (
                      <TrendingUp className="size-3.5 text-emerald-400" />
                    ) : (
                      <TrendingDown className="size-3.5 text-rose-400" />
                    )}
                    <span
                      className={`text-xs font-medium ${
                        stat.trend.positive ? "text-emerald-400" : "text-rose-400"
                      }`}
                    >
                      {stat.trend.positive ? "+" : "-"}{stat.trend.value}%
                    </span>
                    <span className="text-xs text-white/30">vs last week</span>
                  </div>
                </div>
                <div className={`flex size-10 items-center justify-center rounded-xl ${
                  stat.accent 
                    ? "bg-coral/20 text-coral" 
                    : "bg-white/[0.06] text-white/40 group-hover:text-white/70"
                } transition-colors`}>
                  <stat.icon className="size-5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Orders */}
          <div className="lg:col-span-2 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 border-gradient">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <h2 className="font-bricolage text-lg font-semibold text-white">
                  Recent Orders
                </h2>
                <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                  <Zap className="h-2.5 w-2.5" />
                  Live
                </span>
              </div>
              <Link
                href="/dashboard/orders"
                className="group flex items-center gap-1 text-xs font-medium text-white/50 hover:text-white transition-colors"
              >
                View all
                <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-white/[0.06] hover:bg-transparent">
                    <TableHead className="text-[11px] font-medium uppercase tracking-wider text-white/40">
                      Order
                    </TableHead>
                    <TableHead className="text-[11px] font-medium uppercase tracking-wider text-white/40">
                      Brand
                    </TableHead>
                    <TableHead className="text-[11px] font-medium uppercase tracking-wider text-white/40">
                      Customer
                    </TableHead>
                    <TableHead className="text-[11px] font-medium uppercase tracking-wider text-white/40 text-right">
                      Total
                    </TableHead>
                    <TableHead className="text-[11px] font-medium uppercase tracking-wider text-white/40">
                      Status
                    </TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow 
                      key={order.id} 
                      className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                    >
                      <TableCell>
                        <Link
                          href={`/dashboard/orders/${order.id}`}
                          className="font-mono text-sm font-medium text-white hover:text-coral transition-colors"
                        >
                          {order.id}
                        </Link>
                      </TableCell>
                      <TableCell className="text-sm text-white/50">
                        {order.brand}
                      </TableCell>
                      <TableCell className="text-sm text-white/70">
                        {order.customer}
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="font-mono text-sm font-medium text-white">
                          {order.total}
                        </span>
                      </TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
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
                            <DropdownMenuItem className="text-white/70 hover:text-white hover:bg-white/5">
                              Resend notification
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

          {/* Alerts Panel */}
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 border-gradient">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-coral/10">
                <AlertTriangle className="size-4 text-coral" />
              </div>
              <h2 className="font-bricolage text-lg font-semibold text-white">
                Alerts
              </h2>
              <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-coral/20 text-[10px] font-semibold text-coral">
                {alerts.length}
              </span>
            </div>
            
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="group rounded-xl border border-coral/10 bg-coral/[0.03] p-4 hover:border-coral/20 hover:bg-coral/[0.05] transition-all cursor-pointer"
                >
                  <p className="text-sm font-medium text-white/80 leading-relaxed">
                    {alert.message}
                  </p>
                  <p className="mt-2 text-xs text-white/40">{alert.time}</p>
                </div>
              ))}
            </div>
            
            <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] py-2.5 text-sm font-medium text-white/50 hover:text-white hover:bg-white/[0.05] transition-all">
              View all alerts
              <ArrowUpRight className="size-3.5" />
            </button>
          </div>
        </div>

        {/* Activity Graph Placeholder */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 border-gradient">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-bricolage text-lg font-semibold text-white">
                Order Volume
              </h2>
              <p className="text-xs text-white/40 mt-1">Last 7 days</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="rounded-lg bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 hover:bg-white/10 transition-colors">
                7D
              </button>
              <button className="rounded-lg px-3 py-1.5 text-xs font-medium text-white/40 hover:text-white/70 hover:bg-white/5 transition-colors">
                30D
              </button>
              <button className="rounded-lg px-3 py-1.5 text-xs font-medium text-white/40 hover:text-white/70 hover:bg-white/5 transition-colors">
                90D
              </button>
            </div>
          </div>
          
          {/* Simplified chart visualization */}
          <div className="flex items-end gap-2 h-48 pt-4">
            {[65, 45, 78, 55, 89, 72, 95].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className="w-full rounded-t-lg bg-gradient-to-t from-coral/50 to-coral/10 transition-all hover:from-coral/70 hover:to-coral/20"
                  style={{ height: `${height}%` }}
                />
                <span className="text-[10px] text-white/30">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
