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
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#0a0a14] border border-white/10 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto scrollbar-dark">
        <div className="p-6 border-b border-white/[0.06]">
          <div className="flex items-center justify-between">
            <h2 className="font-bricolage text-xl font-semibold text-white">Add Promoter</h2>
            <button onClick={onClose} className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all">
              <X className="size-5" />
            </button>
          </div>
          <p className="text-sm text-white/50 mt-1">
            Add a new promoter to House of Aminos
          </p>
        </div>

        <div className="p-6 space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70">Name</label>
            <input
              placeholder="Enter promoter name"
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-navy/50 focus:border-navy/50 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70">Email</label>
            <input
              type="email"
              placeholder="promoter@email.com"
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-navy/50 focus:border-navy/50 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Commission Rate</label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="5"
                  className="w-full px-4 py-2.5 pr-8 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-navy/50 focus:border-navy/50 transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40">%</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Assign Code</label>
              <select className="w-full rounded-xl bg-white/5 border border-white/10 text-white text-sm px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-navy/50">
                <option value="later" className="bg-[#0a0a14]">Assign Later</option>
                <option value="create" className="bg-[#0a0a14]">Create New Code</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl">
            <div>
              <p className="font-medium text-white">Active Status</p>
              <p className="text-xs text-white/40">Promoter can start immediately</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="p-3 bg-white/[0.02] border border-white/[0.06] rounded-xl">
            <p className="text-xs text-white/50">
              <Mail className="size-3 inline mr-1" />
              Promoter will receive an email with their login credentials.
            </p>
          </div>
        </div>

        <div className="p-6 border-t border-white/[0.06] flex gap-3">
          <button onClick={onClose} className="flex-1 rounded-xl border border-white/10 bg-transparent px-4 py-2.5 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all">
            Cancel
          </button>
          <button onClick={onClose} className="flex-1 rounded-xl bg-gradient-to-r from-coral to-pink-500 px-4 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-all shadow-lg shadow-coral/20">
            Add Promoter
          </button>
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
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#0a0a14] border border-white/10 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto scrollbar-dark">
        <div className="sticky top-0 bg-[#0a0a14] p-6 border-b border-white/[0.06] z-10">
          <div className="flex items-center justify-between">
            <h2 className="font-bricolage text-xl font-semibold text-white">Assign Code to {promoter.name}</h2>
            <button onClick={onClose} className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all">
              <X className="size-5" />
            </button>
          </div>
        </div>

        {/* Mode Tabs */}
        <div className="flex border-b border-white/[0.06]">
          <button
            onClick={() => setMode("create")}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              mode === "create"
                ? "text-white border-b-2 border-sky-400 bg-sky-500/10"
                : "text-white/50 hover:text-white"
            }`}
          >
            Create New Code
          </button>
          <button
            onClick={() => setMode("existing")}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              mode === "existing"
                ? "text-white border-b-2 border-sky-400 bg-sky-500/10"
                : "text-white/50 hover:text-white"
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
                  <label className="text-sm font-medium text-white/70">Code Name</label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-white/40">Auto-generate</span>
                    <Switch checked={autoCode} onCheckedChange={setAutoCode} />
                  </div>
                </div>
                <input
                  placeholder={autoCode ? "Will be auto-generated" : "e.g., ASHTON30"}
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
                    className={`p-3 rounded-xl border-2 text-left transition-all ${
                      discountType === "percentage"
                        ? "border-navy bg-navy/20"
                        : "border-white/10 hover:border-white/20 bg-white/[0.02]"
                    }`}
                  >
                    <Percent className={`size-4 mb-1 ${discountType === "percentage" ? "text-sky-400" : "text-white/40"}`} />
                    <p className="font-medium text-white text-sm">Percentage</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDiscountType("fixed")}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${
                      discountType === "fixed"
                        ? "border-navy bg-navy/20"
                        : "border-white/10 hover:border-white/20 bg-white/[0.02]"
                    }`}
                  >
                    <DollarSign className={`size-4 mb-1 ${discountType === "fixed" ? "text-sky-400" : "text-white/40"}`} />
                    <p className="font-medium text-white text-sm">Fixed Amount</p>
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
                {hasLimit && (
                  <input
                    type="number"
                    placeholder="500"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-navy/50 focus:border-navy/50 transition-all"
                  />
                )}
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
                {hasExpiry && (
                  <input
                    type="date"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-navy/50 focus:border-navy/50 transition-all"
                  />
                )}
              </div>

              {/* Commission */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Commission Rate for this Code</label>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="5"
                    defaultValue="5"
                    className="w-full px-4 py-2.5 pr-8 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-navy/50 focus:border-navy/50 transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40">%</span>
                </div>
                <p className="text-xs text-white/40">Defaults to promoter's rate ({promoter.commissionRate})</p>
              </div>
            </>
          ) : (
            <>
              {/* Existing Codes */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-white/70">Select an Unassigned Code</label>
                {unassignedCodes.length === 0 ? (
                  <div className="p-6 bg-white/[0.02] border border-white/[0.06] rounded-xl text-center">
                    <Tag className="size-8 mx-auto text-white/20 mb-2" />
                    <p className="text-sm text-white/50">No unassigned codes available</p>
                    <button onClick={() => setMode("create")} className="mt-3 text-sm text-sky-400 hover:text-sky-300 transition-colors">
                      Create a new code instead
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {unassignedCodes.map((code) => (
                      <button
                        key={code.id}
                        onClick={() => setSelectedCode(code.id)}
                        className={`w-full p-3 rounded-xl border-2 text-left transition-all ${
                          selectedCode === code.id
                            ? "border-navy bg-navy/20"
                            : "border-white/10 hover:border-white/20 bg-white/[0.02]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <code className="px-2.5 py-1 bg-navy/30 rounded-lg text-sm font-mono font-bold text-sky-300 ring-1 ring-navy/50">
                              {code.code}
                            </code>
                            <span className="text-sm text-white">{code.discount}</span>
                          </div>
                          {selectedCode === code.id && <Check className="size-4 text-sky-400" />}
                        </div>
                        <p className="text-xs text-white/40 mt-1">{code.uses} uses so far</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {selectedCode && (
                <div className="p-3 bg-white/[0.02] border border-white/[0.06] rounded-xl">
                  <p className="text-xs text-white/50">
                    This will link all future sales using this code to {promoter.name}. Historical sales will not be attributed.
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        <div className="sticky bottom-0 bg-[#0a0a14] p-6 border-t border-white/[0.06]">
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 rounded-xl border border-white/10 bg-transparent px-4 py-2.5 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all">
              Cancel
            </button>
            <button
              onClick={onClose}
              disabled={mode === "existing" && !selectedCode}
              className="flex-1 rounded-xl bg-gradient-to-r from-coral to-pink-500 px-4 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-all shadow-lg shadow-coral/20 disabled:opacity-50"
            >
              {mode === "create" ? "Create & Assign" : "Assign Code"}
            </button>
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
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#0a0a14] border border-white/10 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-dark">
        <div className="sticky top-0 bg-[#0a0a14] p-6 border-b border-white/[0.06] z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bricolage text-xl font-semibold text-white">{promoter.name}</h2>
              <p className="text-sm text-white/50">{promoter.email}</p>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all">
              <X className="size-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Performance Stats */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Performance</h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl text-center">
                <p className="text-xs text-white/40 uppercase tracking-wider">Total Uses</p>
                <p className="font-bricolage text-xl font-semibold text-white mt-1">{promoter.totalUses}</p>
              </div>
              <div className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl text-center">
                <p className="text-xs text-white/40 uppercase tracking-wider">Total Earnings</p>
                <p className="font-bricolage text-xl font-semibold text-emerald-400 mt-1">{promoter.totalEarnings}</p>
              </div>
              <div className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl text-center">
                <p className="text-xs text-white/40 uppercase tracking-wider">Commission Rate</p>
                <p className="font-bricolage text-xl font-semibold text-white mt-1">{promoter.commissionRate}</p>
              </div>
            </div>
          </div>

          {/* Assigned Codes */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-white">Assigned Codes ({promoter.codes.length})</h3>
            </div>
            {promoter.codes.length === 0 ? (
              <div className="p-6 bg-white/[0.02] border border-white/[0.06] rounded-xl text-center">
                <Tag className="size-8 mx-auto text-white/20 mb-2" />
                <p className="text-sm text-white/50">No codes assigned yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {promoter.codes.map((code, idx) => (
                  <div key={idx} className="p-4 border border-white/[0.06] rounded-xl bg-white/[0.02]">
                    <div className="flex items-start justify-between gap-3 mb-3">
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
                        <span className="text-sm font-medium text-white">{code.discount}</span>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                        code.status === "active"
                          ? "bg-emerald-500/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/20"
                          : "bg-white/5 text-white/50 ring-1 ring-inset ring-white/10"
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${code.status === "active" ? "bg-emerald-400" : "bg-white/50"}`} />
                        {code.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div>
                        <p className="text-white/40">Uses</p>
                        <p className="font-medium text-white">
                          {code.uses}{code.limit ? ` / ${code.limit}` : " (unlimited)"}
                        </p>
                      </div>
                      <div>
                        <p className="text-white/40">Revenue</p>
                        <p className="font-medium text-white">{code.revenue}</p>
                      </div>
                      <div>
                        <p className="text-white/40">Earnings</p>
                        <p className="font-medium text-emerald-400">{code.earnings}</p>
                      </div>
                      <div>
                        <p className="text-white/40">Expires</p>
                        <p className="font-medium text-white">{code.expires || "No expiry"}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-3 bg-white/[0.02] border border-white/[0.06] rounded-xl">
            <p className="text-xs text-white/40">
              <Calendar className="size-3 inline mr-1" />
              Joined {promoter.joinedAt}
            </p>
          </div>
        </div>

        <div className="sticky bottom-0 bg-[#0a0a14] p-6 border-t border-white/[0.06]">
          <button onClick={onClose} className="w-full rounded-xl border border-white/10 bg-transparent px-4 py-2.5 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all">
            Close
          </button>
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

  const statCards = [
    { label: "Total Earnings", value: brandData.earnings, icon: DollarSign, gradient: "from-emerald-500/60 to-teal-500/40", iconBg: "bg-gradient-to-br from-emerald-500 to-teal-500", valueClass: "text-emerald-400" },
    { label: "Total Orders", value: brandData.orders.toString(), icon: ShoppingBag, gradient: "from-navy/60 to-sky-500/40", iconBg: "bg-gradient-to-br from-navy to-sky-600" },
    { label: "Active Promoters", value: promoters.filter(p => p.status === 'active').length.toString(), icon: Users, gradient: "from-violet-500/60 to-purple-500/40", iconBg: "bg-gradient-to-br from-violet-500 to-purple-500" },
    { label: "Commission Rate", value: brandData.commission, icon: TrendingUp, gradient: "from-amber-500/60 to-orange-500/40", iconBg: "bg-gradient-to-br from-amber-500 to-orange-500" },
  ]

  return (
    <div className="min-h-full bg-[#050510] text-white">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(10,69,145,0.08),transparent)]" />
      </div>

      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Back Button */}
        <Link
          href="/affiliate/brands"
          className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to Brands
        </Link>

        {/* Brand Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-bricolage text-2xl sm:text-3xl font-bold text-white">{brandData.name}</h1>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Connected
              </span>
            </div>
            <a
              href={`https://${brandData.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-sky-400 hover:text-sky-300 flex items-center gap-1 mt-1 transition-colors"
            >
              {brandData.url}
              <ExternalLink className="size-3" />
            </a>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-coral to-pink-500 px-4 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-all shadow-lg shadow-coral/20 w-full sm:w-auto"
          >
            <Plus className="size-4" />
            Add Promoter
          </button>
        </div>

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

        {/* Promoters Section */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden border-gradient">
          <div className="p-5 border-b border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bricolage text-lg font-semibold text-white">Promoters</h3>
              <p className="text-sm text-white/50">Manage influencers and their discount codes</p>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/40" />
              <input
                placeholder="Search promoters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-navy/50 focus:border-navy/50 text-sm transition-all"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-white/40">Promoter</th>
                  <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-white/40">Codes</th>
                  <th className="px-5 py-3 text-center text-[11px] font-medium uppercase tracking-wider text-white/40">Total Uses</th>
                  <th className="px-5 py-3 text-right text-[11px] font-medium uppercase tracking-wider text-white/40">Earnings</th>
                  <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-white/40">Status</th>
                  <th className="px-5 py-3 text-right text-[11px] font-medium uppercase tracking-wider text-white/40">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPromoters.map((promoter) => (
                  <>
                    <tr key={promoter.id} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-4">
                        <div>
                          <p className="font-medium text-white">{promoter.name}</p>
                          <p className="text-xs text-white/40">{promoter.email}</p>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        {promoter.codes.length === 0 ? (
                          <span className="text-sm text-white/40">No codes</span>
                        ) : (
                          <button
                            onClick={() => setExpandedPromoter(expandedPromoter === promoter.id ? null : promoter.id)}
                            className="flex items-center gap-1.5 text-sm text-sky-400 hover:text-sky-300 transition-colors"
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
                      <td className="px-5 py-4 text-center">
                        <span className="font-medium text-white">{promoter.totalUses}</span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <span className="font-mono font-semibold text-emerald-400">{promoter.totalEarnings}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                          promoter.status === "active"
                            ? "bg-emerald-500/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/20"
                            : "bg-white/5 text-white/50 ring-1 ring-inset ring-white/10"
                        }`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${promoter.status === "active" ? "bg-emerald-400" : "bg-white/50"}`} />
                          {promoter.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all">
                              <MoreHorizontal className="size-4" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-[#0a0a14] border-white/10">
                            <DropdownMenuItem onClick={() => handleViewDetails(promoter)} className="text-white/70 hover:text-white focus:text-white focus:bg-white/10">
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-white/70 hover:text-white focus:text-white focus:bg-white/10">Edit</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAssignCode(promoter)} className="text-white/70 hover:text-white focus:text-white focus:bg-white/10">
                              <Tag className="size-4 mr-2" />
                              Assign Code
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-coral hover:text-coral focus:text-coral focus:bg-coral/10">
                              {promoter.status === "active" ? "Deactivate" : "Activate"}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                    {/* Expanded codes row */}
                    {expandedPromoter === promoter.id && promoter.codes.length > 0 && (
                      <tr className="bg-white/[0.01]">
                        <td colSpan={6} className="px-5 py-3">
                          <div className="pl-4 space-y-2">
                            {promoter.codes.map((code, idx) => (
                              <div key={idx} className="flex items-center justify-between p-3 bg-white/[0.02] rounded-xl border border-white/[0.06]">
                                <div className="flex items-center gap-3">
                                  <code className="px-2.5 py-1 bg-navy/30 rounded-lg text-xs font-mono font-bold text-sky-300 ring-1 ring-navy/50">
                                    {code.code}
                                  </code>
                                  <span className="text-xs text-white">{code.discount}</span>
                                  <span className="text-xs text-white/40">
                                    {code.uses}{code.limit ? `/${code.limit}` : ""} uses
                                  </span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="text-xs text-emerald-400 font-medium">{code.earnings}</span>
                                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${
                                    code.status === "active"
                                      ? "bg-emerald-500/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/20"
                                      : "bg-white/5 text-white/50 ring-1 ring-inset ring-white/10"
                                  }`}>
                                    {code.status}
                                  </span>
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
          </div>
        </div>

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
    </div>
  )
}
