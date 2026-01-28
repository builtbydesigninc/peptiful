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
} from "lucide-react"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
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
  },
  {
    label: "Active Brands",
    value: "8",
    icon: Building2,
    trend: { value: 2, positive: true },
  },
  {
    label: "Orders Today",
    value: "47",
    icon: ShoppingCart,
    trend: { value: 8, positive: true },
  },
  {
    label: "Pending Fulfillment",
    value: "12",
    icon: Clock,
    trend: { value: 3, positive: false },
  },
  {
    label: "Revenue This Week",
    value: "$24,892",
    icon: DollarSign,
    trend: { value: 18, positive: true },
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
      return <Badge variant="pending">Processing</Badge>
    case "completed":
      return <Badge variant="active">Completed</Badge>
    case "failed":
      return <Badge variant="failed">Failed</Badge>
    default:
      return <Badge variant="muted">{status}</Badge>
  }
}

export default function DashboardPage() {
  return (
    <div className="p-8 space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-dark-navy">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back. Here&apos;s what&apos;s happening today.</p>
      </div>

      {/* Stats Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-white">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-dark-navy">{stat.value}</p>
                  <div className="flex items-center gap-1">
                    {stat.trend.positive ? (
                      <TrendingUp className="size-4 text-navy" />
                    ) : (
                      <TrendingDown className="size-4 text-coral" />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        stat.trend.positive ? "text-navy" : "text-coral"
                      }`}
                    >
                      {stat.trend.positive ? "+" : "-"}{stat.trend.value}%
                    </span>
                  </div>
                </div>
                <div className="flex size-10 items-center justify-center rounded-lg bg-lavender text-navy">
                  <stat.icon className="size-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Orders */}
        <Card className="bg-white lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Orders</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/orders">
                View all
                <ExternalLink className="ml-1 size-3" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="font-semibold">Order ID</TableHead>
                  <TableHead className="font-semibold">Brand</TableHead>
                  <TableHead className="font-semibold">Customer</TableHead>
                  <TableHead className="font-semibold text-right">Total</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <Link
                        href={`/dashboard/orders/${order.id}`}
                        className="font-mono text-sm font-medium text-navy hover:underline"
                      >
                        {order.id}
                      </Link>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {order.brand}
                    </TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell className="text-right font-medium">
                      {order.total}
                    </TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon-xs">
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/orders/${order.id}`}>
                              View details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>Resend notification</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Alerts Panel */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertTriangle className="size-5 text-coral" />
              Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="rounded-lg border border-coral/20 bg-coral/5 p-3"
              >
                <p className="text-sm font-medium text-coral">{alert.message}</p>
                <p className="mt-1 text-xs text-muted-foreground">{alert.time}</p>
              </div>
            ))}
            <Button variant="ghost" size="sm" className="w-full">
              View all alerts
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
