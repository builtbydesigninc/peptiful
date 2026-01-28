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
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
import { PageHeader } from "@/components/ui/page-header"

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

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="p-8 space-y-6">
      <PageHeader
        title="Orders"
        description="Manage and track all orders across your brands"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Orders" },
        ]}
        actions={
          <Button>
            <Download className="size-4" />
            Export
          </Button>
        }
      />

      {/* Filters */}
      <Card className="bg-white">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Brands" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Brands</SelectItem>
                <SelectItem value="peptide-sciences">Peptide Sciences</SelectItem>
                <SelectItem value="core-peptides">Core Peptides</SelectItem>
                <SelectItem value="amino-asylum">Amino Asylum</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="default">
              <Calendar className="size-4" />
              Date Range
            </Button>
            <Button variant="ghost" size="sm" className="ml-auto">
              <Filter className="size-4" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="bg-white">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="font-semibold">Order ID</TableHead>
                <TableHead className="font-semibold">Brand</TableHead>
                <TableHead className="font-semibold">Customer</TableHead>
                <TableHead className="font-semibold text-center">Items</TableHead>
                <TableHead className="font-semibold text-right">Total</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Date</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <Link
                      href={`/dashboard/orders/${order.id}`}
                      className="font-mono text-sm font-semibold text-navy hover:underline"
                    >
                      {order.id}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.brand}</p>
                      <p className="text-xs text-muted-foreground">{order.affiliate}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-xs text-muted-foreground">{order.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{order.items}</TableCell>
                  <TableCell className="text-right font-semibold">
                    {order.total}
                  </TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {order.date}
                  </TableCell>
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
                        <DropdownMenuItem>Add tracking</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-border/50 px-4 py-3">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium">1-8</span> of{" "}
              <span className="font-medium">247</span> orders
            </p>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon-sm" disabled>
                <ChevronsLeft className="size-4" />
              </Button>
              <Button variant="outline" size="icon-sm" disabled>
                <ChevronLeft className="size-4" />
              </Button>
              <Button variant="default" size="sm" className="min-w-[32px]">
                1
              </Button>
              <Button variant="outline" size="sm" className="min-w-[32px]">
                2
              </Button>
              <Button variant="outline" size="sm" className="min-w-[32px]">
                3
              </Button>
              <span className="px-2 text-muted-foreground">...</span>
              <Button variant="outline" size="sm" className="min-w-[32px]">
                31
              </Button>
              <Button variant="outline" size="icon-sm">
                <ChevronRight className="size-4" />
              </Button>
              <Button variant="outline" size="icon-sm">
                <ChevronsRight className="size-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
