"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  ExternalLink,
  Plus,
  MoreHorizontal,
  Copy,
  Search,
  Users,
  DollarSign,
  ShoppingBag,
  TrendingUp,
  Mail,
  X,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock brand data
const brandData = {
  id: "1",
  name: "House of Aminos",
  url: "houseofaminos.com",
  status: "connected",
  earnings: "$89,234.50",
  orders: 892,
  conversionRate: "3.2%",
  lastSync: "2 min ago",
  commission: "10%",
}

const promoters = [
  {
    id: 1,
    name: "Ashton Hall",
    email: "ashton@fitness.com",
    code: "ASHTON20",
    uses: 145,
    limit: 500,
    earnings: "$2,847.50",
    status: "active",
    joinedAt: "Jan 15, 2026",
  },
  {
    id: 2,
    name: "Jane Fitness",
    email: "jane@fitlife.com",
    code: "JANE15",
    uses: 89,
    limit: 300,
    earnings: "$1,456.80",
    status: "active",
    joinedAt: "Jan 10, 2026",
  },
  {
    id: 3,
    name: "Mike Health",
    email: "mike@healthpro.com",
    code: "MIKE10",
    uses: 234,
    limit: 500,
    earnings: "$3,892.40",
    status: "active",
    joinedAt: "Dec 20, 2025",
  },
  {
    id: 4,
    name: "Sarah Strong",
    email: "sarah@strong.fit",
    code: "SARAH25",
    uses: 12,
    limit: 100,
    earnings: "$289.90",
    status: "inactive",
    joinedAt: "Jan 20, 2026",
  },
]

function AddPromoterModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [autoCode, setAutoCode] = useState(true)
  
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-dark-navy/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-border/50">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-dark-navy">Add Promoter</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="size-5" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Add a new promoter to House of Aminos
          </p>
        </div>

        <div className="p-6 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter promoter name" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="promoter@email.com" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="code">Promo Code</Label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Auto-generate</span>
                <Switch checked={autoCode} onCheckedChange={setAutoCode} />
              </div>
            </div>
            <Input 
              id="code" 
              placeholder={autoCode ? "Will be auto-generated" : "CUSTOM20"} 
              disabled={autoCode}
              className="font-mono uppercase"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="commission">Commission Rate</Label>
              <div className="relative">
                <Input id="commission" type="number" placeholder="5" className="pr-8" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="limit">Usage Limit</Label>
              <Input id="limit" type="number" placeholder="500" />
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-lavender rounded-lg">
            <div>
              <p className="font-medium text-dark-navy">Active Status</p>
              <p className="text-xs text-muted-foreground">Promoter can start immediately</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="p-3 bg-lavender/50 rounded-lg">
            <p className="text-xs text-muted-foreground">
              <Mail className="size-3 inline mr-1" />
              Promoter will receive an email with their login credentials and promo code.
            </p>
          </div>
        </div>

        <div className="p-6 border-t border-border/50 flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="accent" className="flex-1" onClick={onClose}>
            Add Promoter
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function BrandDetailPage() {
  const params = useParams()
  const [showAddModal, setShowAddModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Back Button */}
      <Link
        href="/affiliate/brands"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-navy transition-colors"
      >
        <ArrowLeft className="size-4" />
        Back to Brands
      </Link>

      {/* Brand Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-dark-navy">{brandData.name}</h1>
            <Badge variant="active">Connected</Badge>
          </div>
          <a
            href={`https://${brandData.url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-navy hover:underline flex items-center gap-1 mt-1"
          >
            {brandData.url}
            <ExternalLink className="size-3" />
          </a>
        </div>
        <Button variant="accent" onClick={() => setShowAddModal(true)}>
          <Plus className="size-4" />
          Add Promoter
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-lavender text-navy">
                <DollarSign className="size-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Earnings</p>
                <p className="text-xl font-bold text-dark-navy">{brandData.earnings}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-lavender text-navy">
                <ShoppingBag className="size-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Orders</p>
                <p className="text-xl font-bold text-dark-navy">{brandData.orders}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-lavender text-navy">
                <Users className="size-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Active Promoters</p>
                <p className="text-xl font-bold text-dark-navy">{promoters.filter(p => p.status === 'active').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-lavender text-navy">
                <TrendingUp className="size-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Commission Rate</p>
                <p className="text-xl font-bold text-dark-navy">{brandData.commission}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Promoters Section */}
      <Card className="bg-white border-border/50">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-lg">Promoters</CardTitle>
            <p className="text-sm text-muted-foreground">Manage influencers and their promo codes</p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search promoters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-border/50 bg-lavender/30">
                <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-dark-navy">Promoter</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-dark-navy">Code</th>
                <th className="px-4 sm:px-6 py-3 text-center text-xs sm:text-sm font-semibold text-dark-navy">Uses</th>
                <th className="px-4 sm:px-6 py-3 text-right text-xs sm:text-sm font-semibold text-dark-navy">Earnings</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-dark-navy">Status</th>
                <th className="px-4 sm:px-6 py-3 text-right text-xs sm:text-sm font-semibold text-dark-navy">Actions</th>
              </tr>
            </thead>
            <tbody>
              {promoters.map((promoter) => (
                <tr key={promoter.id} className="border-b border-border/50 last:border-0 hover:bg-lavender/20">
                  <td className="px-4 sm:px-6 py-4">
                    <div>
                      <p className="font-semibold text-dark-navy">{promoter.name}</p>
                      <p className="text-xs text-muted-foreground">{promoter.email}</p>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex items-center gap-2">
                      <code className="px-2 py-1 bg-lavender rounded text-sm font-mono font-semibold text-navy">
                        {promoter.code}
                      </code>
                      <Button variant="ghost" size="icon" className="size-7">
                        <Copy className="size-3" />
                      </Button>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-center">
                    <span className="text-sm">
                      <span className="font-semibold text-dark-navy">{promoter.uses}</span>
                      <span className="text-muted-foreground"> / {promoter.limit}</span>
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-right">
                    <span className="font-semibold text-green-600">{promoter.earnings}</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <Badge variant={promoter.status === "active" ? "active" : "muted"}>
                      {promoter.status}
                    </Badge>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>View Activity</DropdownMenuItem>
                        <DropdownMenuItem className="text-coral">
                          {promoter.status === "active" ? "Deactivate" : "Activate"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <AddPromoterModal open={showAddModal} onClose={() => setShowAddModal(false)} />
    </div>
  )
}
