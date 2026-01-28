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
  Tag,
  Check,
  Percent,
  Calendar,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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

// Unassigned codes available for this brand
const unassignedCodes = [
  { id: "uc1", code: "SUMMER25", discount: "25%", uses: 12, status: "active" },
  { id: "uc2", code: "NEWCUSTOMER", discount: "$15 off", uses: 0, status: "active" },
  { id: "uc3", code: "FLASH30", discount: "30%", uses: 45, status: "active" },
]

// Promoters with multiple codes support
const promoters = [
  {
    id: 1,
    name: "Ashton Hall",
    email: "ashton@fitness.com",
    commissionRate: "5%",
    codes: [
      { code: "ASHTON20", discount: "20%", uses: 145, limit: 500, revenue: "$4,892.50", earnings: "$244.63", status: "active", expires: "Mar 31, 2026" },
      { code: "ASHTONVIP", discount: "25%", uses: 12, limit: null, revenue: "$1,245.00", earnings: "$62.25", status: "active", expires: null },
    ],
    totalUses: 157,
    totalEarnings: "$306.88",
    status: "active",
    joinedAt: "Jan 15, 2026",
  },
  {
    id: 2,
    name: "Jane Fitness",
    email: "jane@fitlife.com",
    commissionRate: "5%",
    codes: [
      { code: "JANE15", discount: "15%", uses: 89, limit: 300, revenue: "$2,913.60", earnings: "$145.68", status: "active", expires: "Apr 30, 2026" },
    ],
    totalUses: 89,
    totalEarnings: "$145.68",
    status: "active",
    joinedAt: "Jan 10, 2026",
  },
  {
    id: 3,
    name: "Mike Health",
    email: "mike@healthpro.com",
    commissionRate: "7%",
    codes: [
      { code: "MIKE10", discount: "10%", uses: 234, limit: 500, revenue: "$7,784.80", earnings: "$544.94", status: "active", expires: null },
    ],
    totalUses: 234,
    totalEarnings: "$544.94",
    status: "active",
    joinedAt: "Dec 20, 2025",
  },
  {
    id: 4,
    name: "Sarah Strong",
    email: "sarah@strong.fit",
    commissionRate: "5%",
    codes: [],
    totalUses: 0,
    totalEarnings: "$0.00",
    status: "active",
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="commission">Commission Rate</Label>
              <div className="relative">
                <Input id="commission" type="number" placeholder="5" className="pr-8" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Assign Code</Label>
              <Select defaultValue="later">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="later">Assign Later</SelectItem>
                  <SelectItem value="create">Create New Code</SelectItem>
                </SelectContent>
              </Select>
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
              Promoter will receive an email with their login credentials.
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

function AssignCodeModal({ 
  open, 
  onClose, 
  promoter 
}: { 
  open: boolean
  onClose: () => void
  promoter: typeof promoters[0] | null
}) {
  const [mode, setMode] = useState<"create" | "existing">("create")
  const [autoCode, setAutoCode] = useState(false)
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">("percentage")
  const [hasLimit, setHasLimit] = useState(true)
  const [hasExpiry, setHasExpiry] = useState(false)
  const [selectedCode, setSelectedCode] = useState("")
  
  if (!open || !promoter) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-dark-navy/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-6 border-b border-border/50 z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-dark-navy">Assign Code to {promoter.name}</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="size-5" />
            </Button>
          </div>
        </div>

        {/* Mode Tabs */}
        <div className="flex border-b border-border/50">
          <button
            onClick={() => setMode("create")}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              mode === "create"
                ? "text-navy border-b-2 border-navy bg-lavender/30"
                : "text-muted-foreground hover:text-dark-navy"
            }`}
          >
            Create New Code
          </button>
          <button
            onClick={() => setMode("existing")}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              mode === "existing"
                ? "text-navy border-b-2 border-navy bg-lavender/30"
                : "text-muted-foreground hover:text-dark-navy"
            }`}
          >
            Assign Existing
          </button>
        </div>

        <div className="p-6 space-y-5">
          {mode === "create" ? (
            <>
              {/* Code Name */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="code">Code Name</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Auto-generate</span>
                    <Switch checked={autoCode} onCheckedChange={setAutoCode} />
                  </div>
                </div>
                <Input
                  id="code"
                  placeholder={autoCode ? "Will be auto-generated" : "e.g., ASHTON30"}
                  disabled={autoCode}
                  className="font-mono uppercase"
                />
              </div>

              {/* Discount Type */}
              <div className="space-y-3">
                <Label>Discount Type</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDiscountType("percentage")}
                    className={`p-3 rounded-lg border-2 text-left transition-all ${
                      discountType === "percentage"
                        ? "border-navy bg-lavender"
                        : "border-border hover:border-navy/30"
                    }`}
                  >
                    <Percent className={`size-4 mb-1 ${discountType === "percentage" ? "text-navy" : "text-muted-foreground"}`} />
                    <p className="font-semibold text-dark-navy text-sm">Percentage</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDiscountType("fixed")}
                    className={`p-3 rounded-lg border-2 text-left transition-all ${
                      discountType === "fixed"
                        ? "border-navy bg-lavender"
                        : "border-border hover:border-navy/30"
                    }`}
                  >
                    <DollarSign className={`size-4 mb-1 ${discountType === "fixed" ? "text-navy" : "text-muted-foreground"}`} />
                    <p className="font-semibold text-dark-navy text-sm">Fixed Amount</p>
                  </button>
                </div>
              </div>

              {/* Discount Value */}
              <div className="space-y-2">
                <Label htmlFor="value">Discount Value</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {discountType === "percentage" ? "%" : "$"}
                  </span>
                  <Input
                    id="value"
                    type="number"
                    placeholder={discountType === "percentage" ? "20" : "10"}
                    className="pl-8"
                  />
                </div>
              </div>

              {/* Usage Limit */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Usage Limit</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Limited</span>
                    <Switch checked={hasLimit} onCheckedChange={setHasLimit} />
                  </div>
                </div>
                {hasLimit && <Input type="number" placeholder="500" />}
              </div>

              {/* Expiry */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Expiry Date</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Set expiry</span>
                    <Switch checked={hasExpiry} onCheckedChange={setHasExpiry} />
                  </div>
                </div>
                {hasExpiry && <Input type="date" />}
              </div>

              {/* Commission */}
              <div className="space-y-2">
                <Label>Commission Rate for this Code</Label>
                <div className="relative">
                  <Input type="number" placeholder="5" defaultValue="5" className="pr-8" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                </div>
                <p className="text-xs text-muted-foreground">Defaults to promoter's rate ({promoter.commissionRate})</p>
              </div>
            </>
          ) : (
            <>
              {/* Existing Codes */}
              <div className="space-y-3">
                <Label>Select an Unassigned Code</Label>
                {unassignedCodes.length === 0 ? (
                  <div className="p-4 bg-lavender/50 rounded-lg text-center">
                    <Tag className="size-8 mx-auto text-muted-foreground/50 mb-2" />
                    <p className="text-sm text-muted-foreground">No unassigned codes available</p>
                    <Button variant="ghost" size="sm" className="mt-2" onClick={() => setMode("create")}>
                      Create a new code instead
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {unassignedCodes.map((code) => (
                      <button
                        key={code.id}
                        onClick={() => setSelectedCode(code.id)}
                        className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                          selectedCode === code.id
                            ? "border-navy bg-lavender"
                            : "border-border hover:border-navy/30"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <code className="px-2 py-1 bg-white rounded text-sm font-mono font-bold text-navy">
                              {code.code}
                            </code>
                            <span className="text-sm text-dark-navy">{code.discount}</span>
                          </div>
                          {selectedCode === code.id && <Check className="size-4 text-navy" />}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{code.uses} uses so far</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {selectedCode && (
                <div className="p-3 bg-lavender/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    This will link all future sales using this code to {promoter.name}. Historical sales will not be attributed.
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        <div className="sticky bottom-0 bg-white p-6 border-t border-border/50">
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              variant="accent" 
              className="flex-1" 
              onClick={onClose}
              disabled={mode === "existing" && !selectedCode}
            >
              {mode === "create" ? "Create & Assign" : "Assign Code"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function PromoterDetailModal({
  open,
  onClose,
  promoter,
}: {
  open: boolean
  onClose: () => void
  promoter: typeof promoters[0] | null
}) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  if (!open || !promoter) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-dark-navy/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-6 border-b border-border/50 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-dark-navy">{promoter.name}</h2>
              <p className="text-sm text-muted-foreground">{promoter.email}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="size-5" />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Performance Stats */}
          <div>
            <h3 className="text-sm font-semibold text-dark-navy mb-3">Performance</h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-lavender/50 rounded-lg text-center">
                <p className="text-xs text-muted-foreground">Total Uses</p>
                <p className="text-xl font-bold text-dark-navy">{promoter.totalUses}</p>
              </div>
              <div className="p-3 bg-lavender/50 rounded-lg text-center">
                <p className="text-xs text-muted-foreground">Total Earnings</p>
                <p className="text-xl font-bold text-green-600">{promoter.totalEarnings}</p>
              </div>
              <div className="p-3 bg-lavender/50 rounded-lg text-center">
                <p className="text-xs text-muted-foreground">Commission Rate</p>
                <p className="text-xl font-bold text-dark-navy">{promoter.commissionRate}</p>
              </div>
            </div>
          </div>

          {/* Assigned Codes */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-dark-navy">Assigned Codes ({promoter.codes.length})</h3>
            </div>
            {promoter.codes.length === 0 ? (
              <div className="p-4 bg-lavender/30 rounded-lg text-center">
                <Tag className="size-8 mx-auto text-muted-foreground/50 mb-2" />
                <p className="text-sm text-muted-foreground">No codes assigned yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {promoter.codes.map((code, idx) => (
                  <div key={idx} className="p-4 border border-border/50 rounded-lg">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <code className="px-2 py-1 bg-lavender rounded text-sm font-mono font-bold text-navy">
                          {code.code}
                        </code>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-7"
                          onClick={() => copyCode(code.code)}
                        >
                          {copiedCode === code.code ? (
                            <Check className="size-3 text-green-600" />
                          ) : (
                            <Copy className="size-3" />
                          )}
                        </Button>
                        <span className="text-sm font-medium text-dark-navy">{code.discount}</span>
                      </div>
                      <Badge variant={code.status === "active" ? "active" : "muted"}>
                        {code.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div>
                        <p className="text-muted-foreground">Uses</p>
                        <p className="font-semibold text-dark-navy">
                          {code.uses}{code.limit ? ` / ${code.limit}` : " (unlimited)"}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Revenue</p>
                        <p className="font-semibold text-dark-navy">{code.revenue}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Earnings</p>
                        <p className="font-semibold text-green-600">{code.earnings}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Expires</p>
                        <p className="font-semibold text-dark-navy">{code.expires || "No expiry"}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-3 bg-lavender/30 rounded-lg">
            <p className="text-xs text-muted-foreground">
              <Calendar className="size-3 inline mr-1" />
              Joined {promoter.joinedAt}
            </p>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white p-6 border-t border-border/50">
          <Button variant="outline" className="w-full" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function BrandDetailPage() {
  const params = useParams()
  const [showAddModal, setShowAddModal] = useState(false)
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedPromoter, setSelectedPromoter] = useState<typeof promoters[0] | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedPromoter, setExpandedPromoter] = useState<number | null>(null)

  const handleAssignCode = (promoter: typeof promoters[0]) => {
    setSelectedPromoter(promoter)
    setShowAssignModal(true)
  }

  const handleViewDetails = (promoter: typeof promoters[0]) => {
    setSelectedPromoter(promoter)
    setShowDetailModal(true)
  }

  const filteredPromoters = promoters.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
            <p className="text-sm text-muted-foreground">Manage influencers and their discount codes</p>
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
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-border/50 bg-lavender/30">
                <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-dark-navy">Promoter</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-dark-navy">Codes</th>
                <th className="px-4 sm:px-6 py-3 text-center text-xs sm:text-sm font-semibold text-dark-navy">Total Uses</th>
                <th className="px-4 sm:px-6 py-3 text-right text-xs sm:text-sm font-semibold text-dark-navy">Earnings</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-dark-navy">Status</th>
                <th className="px-4 sm:px-6 py-3 text-right text-xs sm:text-sm font-semibold text-dark-navy">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPromoters.map((promoter) => (
                <>
                  <tr key={promoter.id} className="border-b border-border/50 last:border-0 hover:bg-lavender/20">
                    <td className="px-4 sm:px-6 py-4">
                      <div>
                        <p className="font-semibold text-dark-navy">{promoter.name}</p>
                        <p className="text-xs text-muted-foreground">{promoter.email}</p>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      {promoter.codes.length === 0 ? (
                        <span className="text-sm text-muted-foreground">No codes</span>
                      ) : (
                        <button
                          onClick={() => setExpandedPromoter(expandedPromoter === promoter.id ? null : promoter.id)}
                          className="flex items-center gap-1.5 text-sm text-navy hover:underline"
                        >
                          <Tag className="size-3.5" />
                          {promoter.codes.length} code{promoter.codes.length !== 1 ? "s" : ""}
                          {expandedPromoter === promoter.id ? (
                            <ChevronDown className="size-3.5" />
                          ) : (
                            <ChevronRight className="size-3.5" />
                          )}
                        </button>
                      )}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-center">
                      <span className="font-semibold text-dark-navy">{promoter.totalUses}</span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-right">
                      <span className="font-semibold text-green-600">{promoter.totalEarnings}</span>
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
                          <DropdownMenuItem onClick={() => handleViewDetails(promoter)}>
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAssignCode(promoter)}>
                            <Tag className="size-4 mr-2" />
                            Assign Code
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-coral">
                            {promoter.status === "active" ? "Deactivate" : "Activate"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                  {/* Expanded codes row */}
                  {expandedPromoter === promoter.id && promoter.codes.length > 0 && (
                    <tr className="bg-lavender/10">
                      <td colSpan={6} className="px-4 sm:px-6 py-3">
                        <div className="pl-4 space-y-2">
                          {promoter.codes.map((code, idx) => (
                            <div key={idx} className="flex items-center justify-between p-2 bg-white rounded-lg border border-border/50">
                              <div className="flex items-center gap-3">
                                <code className="px-2 py-1 bg-lavender rounded text-xs font-mono font-bold text-navy">
                                  {code.code}
                                </code>
                                <span className="text-xs text-dark-navy">{code.discount}</span>
                                <span className="text-xs text-muted-foreground">
                                  {code.uses}{code.limit ? `/${code.limit}` : ""} uses
                                </span>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-xs text-green-600 font-medium">{code.earnings}</span>
                                <Badge variant={code.status === "active" ? "active" : "muted"} className="text-[10px]">
                                  {code.status}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <AddPromoterModal open={showAddModal} onClose={() => setShowAddModal(false)} />
      <AssignCodeModal 
        open={showAssignModal} 
        onClose={() => setShowAssignModal(false)} 
        promoter={selectedPromoter}
      />
      <PromoterDetailModal
        open={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        promoter={selectedPromoter}
      />
    </div>
  )
}
