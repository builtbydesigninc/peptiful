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
  User,
} from "lucide-react"
import { Switch } from "@/components/ui/switch"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAffiliate } from "../context"

// Mock promoters data grouped by brand
const promotersByBrand = {
  hoa: [
    { id: "p1", name: "Ashton Hall", email: "ashton@fitness.com" },
    { id: "p2", name: "Jane Fitness", email: "jane@fitlife.com" },
    { id: "p3", name: "Mike Health", email: "mike@healthpro.com" },
  ],
  tpm: [
    { id: "p4", name: "Other Influencer", email: "other@influencer.com" },
    { id: "p5", name: "Fitness Pro", email: "pro@fitness.com" },
  ],
  ps: [],
}

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
    assignedTo: null,
    assignedToName: null,
  },
  {
    id: 2,
    code: "ASHTON20",
    discount: "20%",
    discountType: "percentage",
    status: "active",
    uses: 145,
    limit: 500,
    revenue: "$4,892.50",
    expires: "Mar 31, 2026",
    brandIds: ["hoa"],
    brands: ["House of Aminos"],
    assignedTo: "p1",
    assignedToName: "Ashton Hall",
  },
  {
    id: 3,
    code: "JANE15",
    discount: "15%",
    discountType: "percentage",
    status: "active",
    uses: 89,
    limit: 300,
    revenue: "$2,913.60",
    expires: "Apr 30, 2026",
    brandIds: ["hoa"],
    brands: ["House of Aminos"],
    assignedTo: "p2",
    assignedToName: "Jane Fitness",
  },
  {
    id: 4,
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
    assignedTo: null,
    assignedToName: null,
  },
  {
    id: 5,
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
    assignedTo: null,
    assignedToName: null,
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
    assignedTo: "p4",
    assignedToName: "Other Influencer",
  },
  {
    id: 7,
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
    assignedTo: null,
    assignedToName: null,
  },
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
    case "inactive":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-xs font-medium text-white/50 ring-1 ring-inset ring-white/10">
          <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
          Inactive
        </span>
      )
    case "expired":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-400 ring-1 ring-inset ring-amber-500/20">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          Expired
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

function CreateCodeModal({ 
  open, 
  onClose, 
  visibleBrands,
  isAffiliate,
}: { 
  open: boolean
  onClose: () => void
  visibleBrands: { id: string; name: string }[]
  isAffiliate: boolean
}) {
  const [autoCode, setAutoCode] = useState(false)
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">("percentage")
  const [hasLimit, setHasLimit] = useState(true)
  const [perCustomerLimit, setPerCustomerLimit] = useState(true)
  const [hasExpiry, setHasExpiry] = useState(false)
  const [hasMinOrder, setHasMinOrder] = useState(false)
  const [allBrands, setAllBrands] = useState(true)
  const [selectedBrand, setSelectedBrand] = useState<string>("")
  const [assignedPromoter, setAssignedPromoter] = useState<string>("none")

  // Get promoters based on selected brand(s)
  const availablePromoters = allBrands
    ? Object.entries(promotersByBrand).flatMap(([brandId, promoters]) => 
        visibleBrands.some(vb => vb.id === brandId) 
          ? promoters.map(p => ({ ...p, brandId, brandName: visibleBrands.find(vb => vb.id === brandId)?.name || brandId }))
          : []
      )
    : selectedBrand
      ? (promotersByBrand[selectedBrand as keyof typeof promotersByBrand] || []).map(p => ({ 
          ...p, 
          brandId: selectedBrand, 
          brandName: visibleBrands.find(vb => vb.id === selectedBrand)?.name || selectedBrand 
        }))
      : []

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#0a0a14] border border-white/10 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto scrollbar-dark">
        <div className="sticky top-0 bg-[#0a0a14] p-6 border-b border-white/[0.06] z-10">
          <div className="flex items-center justify-between">
            <h2 className="font-bricolage text-xl font-semibold text-white">Create Discount Code</h2>
            <button onClick={onClose} className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all">
              <X className="size-5" />
            </button>
          </div>
          <p className="text-sm text-white/50 mt-1">
            Create a new promotional code for your customers
          </p>
        </div>

        <div className="p-6 space-y-5">
          {/* Code Name */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-white/70">Code Name</label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/40">Auto-generate</span>
                <Switch checked={autoCode} onCheckedChange={setAutoCode} />
              </div>
            </div>
            <input
              placeholder={autoCode ? "Will be auto-generated" : "e.g., SUMMER20"}
              disabled={autoCode}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-navy/50 focus:border-navy/50 transition-all font-mono uppercase disabled:opacity-50"
            />
          </div>

          {/* Discount Type */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-white/70">Discount Type</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDiscountType("percentage")}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  discountType === "percentage"
                    ? "border-navy bg-navy/20"
                    : "border-white/10 hover:border-white/20 bg-white/[0.02]"
                }`}
              >
                <Percent className={`size-5 mb-2 ${discountType === "percentage" ? "text-sky-400" : "text-white/40"}`} />
                <p className="font-medium text-white">Percentage</p>
                <p className="text-xs text-white/40">e.g., 20% off</p>
              </button>
              <button
                type="button"
                onClick={() => setDiscountType("fixed")}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  discountType === "fixed"
                    ? "border-navy bg-navy/20"
                    : "border-white/10 hover:border-white/20 bg-white/[0.02]"
                }`}
              >
                <DollarSign className={`size-5 mb-2 ${discountType === "fixed" ? "text-sky-400" : "text-white/40"}`} />
                <p className="font-medium text-white">Fixed Amount</p>
                <p className="text-xs text-white/40">e.g., $10 off</p>
              </button>
            </div>
          </div>

          {/* Discount Value */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70">Discount Value</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                {discountType === "percentage" ? "%" : "$"}
              </span>
              <input
                type="number"
                placeholder={discountType === "percentage" ? "20" : "10"}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-navy/50 focus:border-navy/50 transition-all"
              />
            </div>
          </div>

          {/* Usage Limit */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-white/70">Usage Limit</label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/40">Limited</span>
                <Switch checked={hasLimit} onCheckedChange={setHasLimit} />
              </div>
            </div>
            {hasLimit ? (
              <input
                type="number"
                placeholder="500"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-navy/50 focus:border-navy/50 transition-all"
              />
            ) : (
              <p className="text-sm text-white/40">Unlimited redemptions</p>
            )}
          </div>

          {/* Per-Customer Limit */}
          <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl">
            <div>
              <p className="font-medium text-white">One use per customer</p>
              <p className="text-xs text-white/40">Prevent multiple uses by same customer</p>
            </div>
            <Switch checked={perCustomerLimit} onCheckedChange={setPerCustomerLimit} />
          </div>

          {/* Expiry */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-white/70">Expiry Date</label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/40">Set expiry</span>
                <Switch checked={hasExpiry} onCheckedChange={setHasExpiry} />
              </div>
            </div>
            {hasExpiry ? (
              <input
                type="date"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-navy/50 focus:border-navy/50 transition-all"
              />
            ) : (
              <p className="text-sm text-white/40">No expiry - code runs forever</p>
            )}
          </div>

          {/* Minimum Order */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-white/70">Minimum Order Amount</label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/40">Required</span>
                <Switch checked={hasMinOrder} onCheckedChange={setHasMinOrder} />
              </div>
            </div>
            {hasMinOrder && (
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">$</span>
                <input
                  type="number"
                  placeholder="50"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-navy/50 focus:border-navy/50 transition-all"
                />
              </div>
            )}
          </div>

          {/* Applicable Brands */}
          {visibleBrands.length > 1 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-white/70">Applicable Brands</label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-white/40">All brands</span>
                  <Switch checked={allBrands} onCheckedChange={setAllBrands} />
                </div>
              </div>
              {!allBrands && (
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full rounded-xl bg-white/5 border border-white/10 text-white text-sm px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-navy/50"
                >
                  <option value="" className="bg-[#0a0a14]">Select brand</option>
                  {visibleBrands.map(brand => (
                    <option key={brand.id} value={brand.id} className="bg-[#0a0a14]">{brand.name}</option>
                  ))}
                </select>
              )}
            </div>
          )}

          {/* Assign to Promoter */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-white/70">Assign to Promoter (Optional)</label>
            <select
              value={assignedPromoter}
              onChange={(e) => setAssignedPromoter(e.target.value)}
              className="w-full rounded-xl bg-white/5 border border-white/10 text-white text-sm px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-navy/50"
            >
              <option value="none" className="bg-[#0a0a14]">None (Brand code)</option>
              {availablePromoters.map(promoter => (
                <option key={promoter.id} value={promoter.id} className="bg-[#0a0a14]">
                  {promoter.name} ({promoter.brandName})
                </option>
              ))}
            </select>
            <p className="text-xs text-white/40">
              If assigned, this code's sales will be attributed to the promoter
            </p>
          </div>

          {/* Active Status */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-xl">
            <div>
              <p className="font-medium text-white">Active</p>
              <p className="text-xs text-white/40">Code can be used immediately</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>

        <div className="sticky bottom-0 bg-[#0a0a14] p-6 border-t border-white/[0.06]">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 rounded-xl border border-white/10 bg-transparent px-4 py-2.5 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              className="flex-1 rounded-xl bg-gradient-to-r from-coral to-pink-500 px-4 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-all shadow-lg shadow-coral/20"
            >
              Create Code
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function EmptyState({ onCreateClick }: { onCreateClick: () => void }) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] border-gradient">
      <div className="py-16 text-center">
        <div className="flex justify-center mb-4">
          <div className="size-16 rounded-2xl bg-gradient-to-br from-navy to-sky-600 flex items-center justify-center shadow-lg shadow-navy/20">
            <TicketPercent className="size-8 text-white" />
          </div>
        </div>
        <h3 className="font-bricolage text-xl font-semibold text-white mb-2">No discount codes yet</h3>
        <p className="text-white/50 mb-6 max-w-sm mx-auto">
          Create your first promotional code to drive sales and reward your customers
        </p>
        <button
          onClick={onCreateClick}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-coral to-pink-500 px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-all shadow-lg shadow-coral/20"
        >
          <Plus className="size-4" />
          Create Your First Code
        </button>
      </div>
    </div>
  )
}

export default function AffiliateDiscountsPage() {
  const { user, getSelectedBrand, getVisibleBrands } = useAffiliate()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [statusFilter, setStatusFilter] = useState("all")
  const [assignedFilter, setAssignedFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  if (!user) return null

  const isAffiliate = user.role === "affiliate"
  const selectedBrand = getSelectedBrand()
  const visibleBrands = getVisibleBrands()

  // Get all promoters for filter dropdown
  const allPromoters = Object.entries(promotersByBrand).flatMap(([brandId, promoters]) => 
    visibleBrands.some(vb => vb.id === brandId) 
      ? promoters.map(p => ({ ...p, brandId }))
      : []
  )

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
    const matchesAssigned = 
      assignedFilter === "all" ||
      (assignedFilter === "unassigned" && !code.assignedTo) ||
      code.assignedTo === assignedFilter
    return matchesStatus && matchesSearch && matchesAssigned
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

  const statCards = [
    { label: "Total Codes", value: stats.totalCodes.toString(), icon: Tag, gradient: "from-navy/60 to-sky-500/40", iconBg: "bg-gradient-to-br from-navy to-sky-600" },
    { label: "Active Codes", value: stats.activeCodes.toString(), icon: Check, gradient: "from-emerald-500/60 to-teal-500/40", iconBg: "bg-gradient-to-br from-emerald-500 to-teal-500", valueClass: "text-emerald-400" },
    { label: "Redemptions", value: stats.totalRedemptions.toString(), icon: Hash, gradient: "from-violet-500/60 to-purple-500/40", iconBg: "bg-gradient-to-br from-violet-500 to-purple-500" },
    { label: "Revenue", value: stats.revenueFromCodes, icon: TrendingUp, gradient: "from-amber-500/60 to-orange-500/40", iconBg: "bg-gradient-to-br from-amber-500 to-orange-500", valueClass: "text-emerald-400" },
  ]

  return (
    <div className="min-h-full bg-[#050510] text-white">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(10,69,145,0.08),transparent)]" />
      </div>

      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-bricolage text-xl sm:text-2xl font-semibold text-white">
              {selectedBrand ? `${selectedBrand.name} Discounts` : "Discount Codes"}
            </h2>
            <p className="text-sm text-white/50 mt-1">
              {selectedBrand 
                ? `Promotional codes for ${selectedBrand.name}`
                : "Create and manage promotional codes"
              }
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-coral to-pink-500 px-4 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-all shadow-lg shadow-coral/20 w-full sm:w-auto"
          >
            <Plus className="size-4" />
            Create Code
          </button>
        </div>

        {showEmptyState ? (
          <EmptyState onCreateClick={() => setShowCreateModal(true)} />
        ) : (
          <>
            {/* Stats */}
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
              {statCards.map((stat) => (
                <div
                  key={stat.label}
                  className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 hover:bg-white/[0.04] transition-all duration-300 border-gradient overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3">
                      <div className={`flex size-10 items-center justify-center rounded-xl ${stat.iconBg} shadow-lg shrink-0`}>
                        <stat.icon className="size-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-white/40 uppercase tracking-wider">{stat.label}</p>
                        <p className={`font-bricolage text-xl font-semibold ${stat.valueClass || 'text-white'}`}>{stat.value}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 border-gradient">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/40" />
                  <input
                    placeholder="Search codes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-navy/50 focus:border-navy/50 text-sm transition-all"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full sm:w-[140px] rounded-xl bg-white/5 border border-white/10 text-white text-sm px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-navy/50"
                >
                  <option value="all" className="bg-[#0a0a14]">All Status</option>
                  <option value="active" className="bg-[#0a0a14]">Active</option>
                  <option value="inactive" className="bg-[#0a0a14]">Inactive</option>
                  <option value="expired" className="bg-[#0a0a14]">Expired</option>
                </select>
                <select
                  value={assignedFilter}
                  onChange={(e) => setAssignedFilter(e.target.value)}
                  className="w-full sm:w-[170px] rounded-xl bg-white/5 border border-white/10 text-white text-sm px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-navy/50"
                >
                  <option value="all" className="bg-[#0a0a14]">All Codes</option>
                  <option value="unassigned" className="bg-[#0a0a14]">Unassigned (Brand)</option>
                  {allPromoters.map(promoter => (
                    <option key={promoter.id} value={promoter.id} className="bg-[#0a0a14]">
                      {promoter.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden border-gradient">
              <div className="overflow-x-auto">
                {filteredCodes.length === 0 ? (
                  <div className="p-12 text-center">
                    <TicketPercent className="size-12 mx-auto text-white/20 mb-3" />
                    <p className="text-white/50">No codes match your filters</p>
                  </div>
                ) : (
                  <table className="w-full min-w-[900px]">
                    <thead>
                      <tr className="border-b border-white/[0.06]">
                        <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-white/40">Code</th>
                        <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-white/40">Discount</th>
                        <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-white/40">Status</th>
                        <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-white/40">Uses</th>
                        <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-white/40">Assigned To</th>
                        <th className="px-5 py-3 text-right text-[11px] font-medium uppercase tracking-wider text-white/40">Revenue</th>
                        <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-white/40">Expires</th>
                        <th className="px-5 py-3 text-right text-[11px] font-medium uppercase tracking-wider text-white/40">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCodes.map((code) => {
                        const usagePercent = code.limit ? (code.uses / code.limit) * 100 : 0
                        return (
                          <tr key={code.id} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors">
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-2">
                                <code className="px-2.5 py-1 bg-navy/30 rounded-lg text-sm font-mono font-bold text-sky-300 ring-1 ring-navy/50">
                                  {code.code}
                                </code>
                                <button
                                  onClick={() => copyCode(code.code)}
                                  className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"
                                >
                                  {copiedCode === code.code ? (
                                    <Check className="size-3.5 text-emerald-400" />
                                  ) : (
                                    <Copy className="size-3.5" />
                                  )}
                                </button>
                              </div>
                            </td>
                            <td className="px-5 py-4">
                              <span className="font-semibold text-white">{code.discount}</span>
                            </td>
                            <td className="px-5 py-4">
                              {getStatusBadge(code.status)}
                            </td>
                            <td className="px-5 py-4">
                              <div className="space-y-1.5">
                                <span className="text-sm">
                                  <span className="font-medium text-white">{code.uses}</span>
                                  <span className="text-white/40">
                                    {code.limit ? ` / ${code.limit}` : " (unlimited)"}
                                  </span>
                                </span>
                                {code.limit && (
                                  <div className="w-20 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                    <div
                                      className={`h-full rounded-full ${
                                        usagePercent >= 90 ? "bg-gradient-to-r from-coral to-pink-500" : "bg-gradient-to-r from-navy to-sky-500"
                                      }`}
                                      style={{ width: `${Math.min(usagePercent, 100)}%` }}
                                    />
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-5 py-4">
                              {code.assignedToName ? (
                                <div className="flex items-center gap-1.5">
                                  <User className="size-3.5 text-white/40" />
                                  <span className="text-sm text-white">{code.assignedToName}</span>
                                </div>
                              ) : (
                                <span className="text-sm text-white/30">—</span>
                              )}
                            </td>
                            <td className="px-5 py-4 text-right">
                              <span className="font-mono font-semibold text-emerald-400">{code.revenue}</span>
                            </td>
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-1.5 text-sm text-white/50">
                                {code.expires ? (
                                  <>
                                    <Calendar className="size-3.5" />
                                    {code.expires}
                                  </>
                                ) : (
                                  <span>No expiry</span>
                                )}
                              </div>
                            </td>
                            <td className="px-5 py-4 text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <button className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all">
                                    <MoreHorizontal className="size-4" />
                                  </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-[#0a0a14] border-white/10">
                                  <DropdownMenuItem onClick={() => copyCode(code.code)} className="text-white/70 hover:text-white focus:text-white focus:bg-white/10">
                                    Copy Code
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-white/70 hover:text-white focus:text-white focus:bg-white/10">Edit</DropdownMenuItem>
                                  <DropdownMenuItem className="text-white/70 hover:text-white focus:text-white focus:bg-white/10">View Analytics</DropdownMenuItem>
                                  {!code.assignedTo && (
                                    <DropdownMenuItem className="text-white/70 hover:text-white focus:text-white focus:bg-white/10">
                                      <User className="size-4 mr-2" />
                                      Assign to Promoter
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem className="text-coral hover:text-coral focus:text-coral focus:bg-coral/10">
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
            </div>
          </>
        )}

        <CreateCodeModal 
          open={showCreateModal} 
          onClose={() => setShowCreateModal(false)} 
          visibleBrands={visibleBrands}
          isAffiliate={isAffiliate}
        />
      </div>
    </div>
  )
}
