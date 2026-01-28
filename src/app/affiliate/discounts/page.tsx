"use client"

import { useState } from "react"
import {
  Tag,
  Plus,
  Search,
  Copy,
  Check,
  MoreHorizontal,
  Calendar,
  Percent,
  DollarSign,
  X,
  TicketPercent,
  TrendingUp,
  Hash,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
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
import { useAffiliate } from "../context"

const allDiscountCodes = [
  {
    id: 1,
    code: "HOA20",
    discount: "20%",
    discountType: "percentage",
    status: "active",
    uses: 145,
    limit: 500,
    revenue: "$12,847.50",
    expires: "Feb 28, 2026",
    brandIds: ["hoa"],
    brands: ["House of Aminos"],
  },
  {
    id: 2,
    code: "SUMMER15",
    discount: "15%",
    discountType: "percentage",
    status: "active",
    uses: 89,
    limit: 200,
    revenue: "$6,234.20",
    expires: "Mar 31, 2026",
    brandIds: ["hoa", "tpm", "ps"],
    brands: ["All Brands"],
  },
  {
    id: 3,
    code: "WELCOME10",
    discount: "$10 off",
    discountType: "fixed",
    status: "active",
    uses: 234,
    limit: null,
    revenue: "$18,456.80",
    expires: null,
    brandIds: ["hoa", "tpm", "ps"],
    brands: ["All Brands"],
  },
  {
    id: 4,
    code: "FLASH25",
    discount: "25%",
    discountType: "percentage",
    status: "expired",
    uses: 100,
    limit: 100,
    revenue: "$8,920.00",
    expires: "Jan 15, 2026",
    brandIds: ["hoa", "tpm"],
    brands: ["House of Aminos", "TPM"],
  },
  {
    id: 5,
    code: "VIP30",
    discount: "30%",
    discountType: "percentage",
    status: "inactive",
    uses: 12,
    limit: 50,
    revenue: "$1,234.50",
    expires: "Dec 31, 2026",
    brandIds: ["hoa"],
    brands: ["House of Aminos"],
  },
  {
    id: 6,
    code: "TPM10",
    discount: "10%",
    discountType: "percentage",
    status: "active",
    uses: 67,
    limit: 200,
    revenue: "$3,456.00",
    expires: "Apr 30, 2026",
    brandIds: ["tpm"],
    brands: ["TPM"],
  },
]

function getStatusBadge(status: string) {
  switch (status) {
    case "active":
      return <Badge variant="active">Active</Badge>
    case "inactive":
      return <Badge variant="muted">Inactive</Badge>
    case "expired":
      return <Badge variant="pending">Expired</Badge>
    default:
      return <Badge variant="muted">{status}</Badge>
  }
}

function CreateCodeModal({ 
  open, 
  onClose, 
  visibleBrands 
}: { 
  open: boolean
  onClose: () => void
  visibleBrands: { id: string; name: string }[]
}) {
  const [autoCode, setAutoCode] = useState(false)
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">("percentage")
  const [hasLimit, setHasLimit] = useState(true)
  const [perCustomerLimit, setPerCustomerLimit] = useState(true)
  const [hasExpiry, setHasExpiry] = useState(false)
  const [hasMinOrder, setHasMinOrder] = useState(false)
  const [allBrands, setAllBrands] = useState(true)

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-dark-navy/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-6 border-b border-border/50 z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-dark-navy">Create Discount Code</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="size-5" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Create a new promotional code for your customers
          </p>
        </div>

        <div className="p-6 space-y-5">
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
              placeholder={autoCode ? "Will be auto-generated" : "e.g., SUMMER20"}
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
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  discountType === "percentage"
                    ? "border-navy bg-lavender"
                    : "border-border hover:border-navy/30"
                }`}
              >
                <Percent className={`size-5 mb-2 ${discountType === "percentage" ? "text-navy" : "text-muted-foreground"}`} />
                <p className="font-semibold text-dark-navy">Percentage</p>
                <p className="text-xs text-muted-foreground">e.g., 20% off</p>
              </button>
              <button
                type="button"
                onClick={() => setDiscountType("fixed")}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  discountType === "fixed"
                    ? "border-navy bg-lavender"
                    : "border-border hover:border-navy/30"
                }`}
              >
                <DollarSign className={`size-5 mb-2 ${discountType === "fixed" ? "text-navy" : "text-muted-foreground"}`} />
                <p className="font-semibold text-dark-navy">Fixed Amount</p>
                <p className="text-xs text-muted-foreground">e.g., $10 off</p>
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
            {hasLimit && (
              <Input type="number" placeholder="500" />
            )}
            {!hasLimit && (
              <p className="text-sm text-muted-foreground">Unlimited redemptions</p>
            )}
          </div>

          {/* Per-Customer Limit */}
          <div className="flex items-center justify-between p-3 bg-lavender/50 rounded-lg">
            <div>
              <p className="font-medium text-dark-navy">One use per customer</p>
              <p className="text-xs text-muted-foreground">Prevent multiple uses by same customer</p>
            </div>
            <Switch checked={perCustomerLimit} onCheckedChange={setPerCustomerLimit} />
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
            {hasExpiry ? (
              <Input type="date" />
            ) : (
              <p className="text-sm text-muted-foreground">No expiry - code runs forever</p>
            )}
          </div>

          {/* Minimum Order */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Minimum Order Amount</Label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Required</span>
                <Switch checked={hasMinOrder} onCheckedChange={setHasMinOrder} />
              </div>
            </div>
            {hasMinOrder && (
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input type="number" placeholder="50" className="pl-8" />
              </div>
            )}
          </div>

          {/* Applicable Brands */}
          {visibleBrands.length > 1 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Applicable Brands</Label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">All brands</span>
                  <Switch checked={allBrands} onCheckedChange={setAllBrands} />
                </div>
              </div>
              {!allBrands && (
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select brands" />
                  </SelectTrigger>
                  <SelectContent>
                    {visibleBrands.map(brand => (
                      <SelectItem key={brand.id} value={brand.id}>{brand.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          )}

          {/* Active Status */}
          <div className="flex items-center justify-between p-3 bg-lavender rounded-lg">
            <div>
              <p className="font-medium text-dark-navy">Active</p>
              <p className="text-xs text-muted-foreground">Code can be used immediately</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>

        <div className="sticky bottom-0 bg-white p-6 border-t border-border/50">
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="accent" className="flex-1" onClick={onClose}>
              Create Code
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function EmptyState({ onCreateClick }: { onCreateClick: () => void }) {
  return (
    <Card className="bg-white border-border/50">
      <div className="py-16 text-center">
        <div className="flex justify-center mb-4">
          <div className="size-16 rounded-full bg-lavender flex items-center justify-center">
            <TicketPercent className="size-8 text-navy" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-dark-navy mb-2">No discount codes yet</h3>
        <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
          Create your first promotional code to drive sales and reward your customers
        </p>
        <Button variant="accent" onClick={onCreateClick}>
          <Plus className="size-4" />
          Create Your First Code
        </Button>
      </div>
    </Card>
  )
}

export default function AffiliateDiscountsPage() {
  const { user, getSelectedBrand, getVisibleBrands } = useAffiliate()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  if (!user) return null

  const isAffiliate = user.role === "affiliate"
  const selectedBrand = getSelectedBrand()
  const visibleBrands = getVisibleBrands()

  // Filter codes based on role and selection
  let discountCodes = allDiscountCodes.filter(code => 
    code.brandIds.some(bid => visibleBrands.some(vb => vb.id === bid))
  )

  if (selectedBrand) {
    discountCodes = discountCodes.filter(code => code.brandIds.includes(selectedBrand.id))
  }

  // Apply filters
  const filteredCodes = discountCodes.filter((code) => {
    const matchesStatus = statusFilter === "all" || code.status === statusFilter
    const matchesSearch = code.code.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  // Calculate stats based on filtered codes
  const stats = {
    totalCodes: discountCodes.length,
    activeCodes: discountCodes.filter(c => c.status === "active").length,
    totalRedemptions: discountCodes.reduce((acc, c) => acc + c.uses, 0),
    revenueFromCodes: "$" + discountCodes
      .reduce((acc, c) => acc + parseFloat(c.revenue.replace("$", "").replace(",", "")), 0)
      .toLocaleString("en-US", { minimumFractionDigits: 2 }),
  }

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const showEmptyState = discountCodes.length === 0

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-dark-navy">
            {selectedBrand ? `${selectedBrand.name} Discounts` : "Discount Codes"}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            {selectedBrand 
              ? `Promotional codes for ${selectedBrand.name}`
              : "Create and manage promotional codes"
            }
          </p>
        </div>
        <Button variant="accent" className="w-full sm:w-auto" onClick={() => setShowCreateModal(true)}>
          <Plus className="size-4" />
          Create Code
        </Button>
      </div>

      {showEmptyState ? (
        <EmptyState onCreateClick={() => setShowCreateModal(true)} />
      ) : (
        <>
          {/* Stats */}
          <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
            <Card className="bg-white border-border/50">
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-lavender text-navy">
                    <Tag className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total Codes</p>
                    <p className="text-xl font-bold text-dark-navy">{stats.totalCodes}</p>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white border-border/50">
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-lavender text-navy">
                    <Check className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Active Codes</p>
                    <p className="text-xl font-bold text-green-600">{stats.activeCodes}</p>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white border-border/50">
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-lavender text-navy">
                    <Hash className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Redemptions</p>
                    <p className="text-xl font-bold text-dark-navy">{stats.totalRedemptions}</p>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white border-border/50">
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-lavender text-navy">
                    <TrendingUp className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Revenue</p>
                    <p className="text-xl font-bold text-green-600">{stats.revenueFromCodes}</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Filters */}
          <Card className="bg-white border-border/50">
            <div className="p-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    placeholder="Search codes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Table */}
          <Card className="bg-white border-border/50 overflow-hidden">
            <div className="p-0 overflow-x-auto">
              {filteredCodes.length === 0 ? (
                <div className="p-8 text-center">
                  <TicketPercent className="size-12 mx-auto text-muted-foreground/30 mb-3" />
                  <p className="text-muted-foreground">No codes match your filters</p>
                </div>
              ) : (
                <table className="w-full min-w-[800px]">
                  <thead>
                    <tr className="border-b border-border/50 bg-lavender/30">
                      <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-dark-navy">Code</th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-dark-navy">Discount</th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-dark-navy">Status</th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-dark-navy">Uses</th>
                      {isAffiliate && !selectedBrand && (
                        <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-dark-navy">Brands</th>
                      )}
                      <th className="px-4 sm:px-6 py-3 text-right text-xs sm:text-sm font-semibold text-dark-navy">Revenue</th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-dark-navy">Expires</th>
                      <th className="px-4 sm:px-6 py-3 text-right text-xs sm:text-sm font-semibold text-dark-navy">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCodes.map((code) => {
                      const usagePercent = code.limit ? (code.uses / code.limit) * 100 : 0
                      return (
                        <tr key={code.id} className="border-b border-border/50 last:border-0 hover:bg-lavender/20">
                          <td className="px-4 sm:px-6 py-4">
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
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <span className="font-semibold text-dark-navy">{code.discount}</span>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            {getStatusBadge(code.status)}
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <div className="space-y-1">
                              <span className="text-sm">
                                <span className="font-semibold text-dark-navy">{code.uses}</span>
                                <span className="text-muted-foreground">
                                  {code.limit ? ` / ${code.limit}` : " (unlimited)"}
                                </span>
                              </span>
                              {code.limit && (
                                <div className="w-20 h-1.5 bg-lavender rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full ${
                                      usagePercent >= 90 ? "bg-coral" : "bg-navy"
                                    }`}
                                    style={{ width: `${Math.min(usagePercent, 100)}%` }}
                                  />
                                </div>
                              )}
                            </div>
                          </td>
                          {isAffiliate && !selectedBrand && (
                            <td className="px-4 sm:px-6 py-4">
                              <span className="text-sm text-muted-foreground">
                                {code.brands.join(", ")}
                              </span>
                            </td>
                          )}
                          <td className="px-4 sm:px-6 py-4 text-right">
                            <span className="font-semibold text-green-600">{code.revenue}</span>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                              {code.expires ? (
                                <>
                                  <Calendar className="size-3" />
                                  {code.expires}
                                </>
                              ) : (
                                <span>No expiry</span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="size-8">
                                  <MoreHorizontal className="size-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => copyCode(code.code)}>
                                  Copy Code
                                </DropdownMenuItem>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>View Analytics</DropdownMenuItem>
                                <DropdownMenuItem className="text-coral">
                                  {code.status === "active" ? "Deactivate" : "Activate"}
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </Card>
        </>
      )}

      <CreateCodeModal 
        open={showCreateModal} 
        onClose={() => setShowCreateModal(false)} 
        visibleBrands={visibleBrands}
      />
    </div>
  )
}
