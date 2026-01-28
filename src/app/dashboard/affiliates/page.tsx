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
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
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
import { PageHeader } from "@/components/ui/page-header"
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

function getStatusBadge(status: string) {
  switch (status) {
    case "active":
      return <Badge variant="active">Active</Badge>
    case "pending":
      return <Badge variant="pending">Pending</Badge>
    case "suspended":
      return <Badge variant="failed">Suspended</Badge>
    default:
      return <Badge variant="muted">{status}</Badge>
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
        <Button variant="accent">
          <Plus className="size-4" />
          Add Affiliate
        </Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Add New Affiliate</ModalTitle>
          <ModalDescription>
            Create a new affiliate account for brand partnerships.
          </ModalDescription>
        </ModalHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="aff-name">Business Name</Label>
            <Input
              id="aff-name"
              placeholder="e.g., Health Pro Shop"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="aff-email">Contact Email</Label>
            <Input
              id="aff-email"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="commission">Commission Rate (%)</Label>
            <Input
              id="commission"
              type="number"
              min="0"
              max="100"
              value={commissionRate}
              onChange={(e) => setCommissionRate(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Default commission rate for all brands under this affiliate.
            </p>
          </div>
        </div>

        <ModalFooter>
          <Button variant="outline" onClick={handleReset}>
            Cancel
          </Button>
          <Button variant="accent" disabled={!name || !email}>
            Create Affiliate
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default function AffiliatesPage() {
  return (
    <div className="p-8 space-y-6">
      <PageHeader
        title="Affiliates"
        description="Manage affiliate partnerships and commissions"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Affiliates" },
        ]}
        actions={<AddAffiliateModal />}
      />

      {/* Affiliates Table */}
      <Card className="bg-white">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="font-semibold">Affiliate</TableHead>
                <TableHead className="font-semibold text-center">Brands</TableHead>
                <TableHead className="font-semibold text-center">Orders</TableHead>
                <TableHead className="font-semibold text-right">Revenue</TableHead>
                <TableHead className="font-semibold text-right">Commission</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Joined</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {affiliates.map((affiliate) => (
                <TableRow key={affiliate.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-9">
                        <AvatarFallback className="bg-lavender text-navy text-sm font-semibold">
                          {affiliate.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{affiliate.name}</p>
                        <p className="text-xs text-muted-foreground">{affiliate.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Building2 className="size-4 text-muted-foreground" />
                      <span className="font-medium">{affiliate.brands}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center font-medium">
                    {affiliate.orders.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {affiliate.revenue}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="font-semibold text-navy">{affiliate.commission}</span>
                  </TableCell>
                  <TableCell>{getStatusBadge(affiliate.status)}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {affiliate.joinedAt}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-xs">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <ExternalLink className="mr-2 size-4" />
                          View details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 size-4" />
                          Edit affiliate
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="mr-2 size-4" />
                          Send email
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-coral">
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
        </CardContent>
      </Card>
    </div>
  )
}
