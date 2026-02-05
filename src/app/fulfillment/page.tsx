"use client"

import { useState } from "react"
import {
  Package,
  Truck,
  AlertTriangle,
  CheckSquare,
  Square,
  X,
  ChevronRight,
  MapPin,
  Box,
  Search,
  RefreshCw,
  LogOut,
  Check,
} from "lucide-react"
import { cn } from "@/lib/utils"

type TabType = "ready" | "shipped" | "issues"

interface Order {
  id: string
  brand: string
  labelType: "white" | "private"
  privateLabelBrand?: string
  customer: {
    name: string
    city: string
    state: string
  }
  items: { sku: string; name: string; qty: number }[]
  status: "ready" | "shipped" | "issue"
  issueType?: string
  shippedAt?: string
  trackingNumber?: string
}

const orders: Order[] = [
  {
    id: "HOA-712",
    brand: "Peptide Sciences",
    labelType: "white",
    customer: { name: "John Smith", city: "Los Angeles", state: "CA" },
    items: [
      { sku: "BPC-157-10", name: "BPC-157 10mg", qty: 2 },
      { sku: "TB-500-5", name: "TB-500 5mg", qty: 1 },
    ],
    status: "ready",
  },
  {
    id: "HOA-711",
    brand: "Core Peptides",
    labelType: "private",
    privateLabelBrand: "Core Peptides",
    customer: { name: "Sarah Johnson", city: "Miami", state: "FL" },
    items: [{ sku: "IPAM-5", name: "Ipamorelin 5mg", qty: 3 }],
    status: "ready",
  },
  {
    id: "HOA-710",
    brand: "Peptide Sciences",
    labelType: "white",
    customer: { name: "Mike Williams", city: "Seattle", state: "WA" },
    items: [
      { sku: "CJC-1295-2", name: "CJC-1295 2mg", qty: 1 },
      { sku: "GHRP-6-5", name: "GHRP-6 5mg", qty: 2 },
    ],
    status: "ready",
  },
  {
    id: "HOA-709",
    brand: "Amino Asylum",
    labelType: "private",
    privateLabelBrand: "Amino Asylum",
    customer: { name: "Emily Brown", city: "Denver", state: "CO" },
    items: [{ sku: "MT2-10", name: "Melanotan II 10mg", qty: 1 }],
    status: "ready",
  },
  {
    id: "HOA-708",
    brand: "Peptide Sciences",
    labelType: "white",
    customer: { name: "David Lee", city: "Austin", state: "TX" },
    items: [{ sku: "BPC-157-10", name: "BPC-157 10mg", qty: 5 }],
    status: "shipped",
    shippedAt: "10:32 AM",
    trackingNumber: "1Z999AA10123456784",
  },
  {
    id: "HOA-707",
    brand: "Core Peptides",
    labelType: "white",
    customer: { name: "Lisa Chen", city: "Portland", state: "OR" },
    items: [{ sku: "TB-500-5", name: "TB-500 5mg", qty: 2 }],
    status: "shipped",
    shippedAt: "9:45 AM",
    trackingNumber: "1Z999AA10123456785",
  },
  {
    id: "HOA-705",
    brand: "Peptide Sciences",
    labelType: "white",
    customer: { name: "James Wilson", city: "Chicago", state: "IL" },
    items: [{ sku: "SEMA-5", name: "Semaglutide 5mg", qty: 1 }],
    status: "issue",
    issueType: "Out of Stock",
  },
  {
    id: "HOA-703",
    brand: "Amino Asylum",
    labelType: "private",
    privateLabelBrand: "Amino Asylum",
    customer: { name: "Anna Martinez", city: "Phoenix", state: "AZ" },
    items: [{ sku: "BPC-157-10", name: "BPC-157 10mg", qty: 1 }],
    status: "issue",
    issueType: "Address Issue",
  },
]

function OrderCard({
  order,
  onProcess,
  showProcessButton = true,
  isSelected = false,
  onToggleSelect,
  showCheckbox = false,
}: {
  order: Order
  onProcess?: () => void
  showProcessButton?: boolean
  isSelected?: boolean
  onToggleSelect?: () => void
  showCheckbox?: boolean
}) {
  return (
    <div className="group rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 border-gradient overflow-hidden">
      {/* Selection Header - only show for ready orders */}
      {showCheckbox && (
        <div className="flex items-center gap-3 px-5 pt-4 pb-2">
          <button
            onClick={onToggleSelect}
            className={cn(
              "size-6 rounded-lg border-2 flex items-center justify-center transition-all shrink-0",
              isSelected
                ? "bg-sky-500 border-sky-500 text-white"
                : "bg-white/5 border-white/20 hover:border-white/40"
            )}
          >
            {isSelected && <Check className="size-4" />}
          </button>
          <span className="text-sm text-white/40">Select for bulk processing</span>
        </div>
      )}

      <div className={cn("p-5", showCheckbox && "pt-2")}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-bricolage text-2xl font-bold text-white font-mono">{order.id}</h3>
            <p className="text-lg text-white/50">{order.brand}</p>
          </div>
          <span className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium",
            order.labelType === "white"
              ? "bg-navy/20 text-sky-300 ring-1 ring-inset ring-navy/30"
              : "bg-coral/20 text-coral ring-1 ring-inset ring-coral/30"
          )}>
            {order.labelType === "white"
              ? "White Label"
              : `Private: ${order.privateLabelBrand}`}
          </span>
        </div>

        {/* Ship To */}
        <div className="flex items-start gap-3 mb-4 p-4 bg-white/[0.03] border border-white/[0.06] rounded-xl">
          <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-navy to-sky-600 shadow-lg shrink-0">
            <MapPin className="size-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-lg text-white">{order.customer.name}</p>
            <p className="text-white/50">
              {order.customer.city}, {order.customer.state}
            </p>
          </div>
        </div>

        {/* Items */}
        <div className="space-y-2 mb-4">
          <p className="text-[11px] font-medium text-white/40 uppercase tracking-wider">
            Items ({order.items.reduce((acc, item) => acc + item.qty, 0)})
          </p>
          {order.items.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between py-3 border-b border-white/[0.06] last:border-0"
            >
              <div className="flex items-center gap-3">
                <Box className="size-5 text-white/40" />
                <div>
                  <p className="font-medium text-white">{item.name}</p>
                  <p className="text-sm text-white/40 font-mono">{item.sku}</p>
                </div>
              </div>
              <span className="text-xl font-bold text-sky-400">×{item.qty}</span>
            </div>
          ))}
        </div>

        {/* Shipped Info or Issue */}
        {order.status === "shipped" && (
          <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 mb-4">
            <Truck className="size-5" />
            <div>
              <p className="font-medium">Shipped at {order.shippedAt}</p>
              <p className="text-sm font-mono text-emerald-400/70">{order.trackingNumber}</p>
            </div>
          </div>
        )}

        {order.status === "issue" && (
          <div className="flex items-center gap-3 p-4 bg-coral/10 border border-coral/20 rounded-xl text-coral mb-4">
            <AlertTriangle className="size-5" />
            <p className="font-medium">{order.issueType}</p>
          </div>
        )}

        {/* Action */}
        {showProcessButton && order.status === "ready" && (
          <button
            onClick={onProcess}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-coral to-pink-500 px-4 py-4 text-lg font-medium text-white hover:opacity-90 transition-all shadow-lg shadow-coral/20"
          >
            Process Order
            <ChevronRight className="size-5" />
          </button>
        )}

        {order.status === "issue" && (
          <button className="w-full flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-transparent px-4 py-4 text-lg font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all">
            Resolve Issue
          </button>
        )}
      </div>
    </div>
  )
}

function ProcessPanel({
  order,
  onClose,
  onComplete,
}: {
  order: Order
  onClose: () => void
  onComplete: () => void
}) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})
  const [trackingNumber, setTrackingNumber] = useState("")
  const [carrier, setCarrier] = useState("")

  const allItemsChecked =
    order.items.length > 0 &&
    order.items.every((item) => checkedItems[item.sku])

  const canComplete = allItemsChecked && trackingNumber && carrier

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative ml-auto h-full w-full max-w-lg bg-[#0a0a14] border-l border-white/10 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
          <div>
            <h2 className="font-bricolage text-2xl font-bold text-white font-mono">
              {order.id}
            </h2>
            <p className="text-white/50">{order.brand}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all">
            <X className="size-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-dark">
          {/* Ship To */}
          <div className="p-4 bg-white/[0.03] border border-white/[0.06] rounded-xl">
            <p className="text-[11px] font-medium text-white/40 uppercase tracking-wider mb-2">
              SHIP TO
            </p>
            <p className="text-xl font-semibold text-white">{order.customer.name}</p>
            <p className="text-white/50">
              {order.customer.city}, {order.customer.state}
            </p>
          </div>

          {/* Checklist */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <CheckSquare className="size-5 text-sky-400" />
              Pick List
            </h3>
            <div className="space-y-3">
              {order.items.map((item) => (
                <label
                  key={item.sku}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all",
                    checkedItems[item.sku]
                      ? "border-sky-500 bg-sky-500/10"
                      : "border-white/10 hover:border-white/20 bg-white/[0.02]"
                  )}
                >
                  <button
                    onClick={() => setCheckedItems((prev) => ({
                      ...prev,
                      [item.sku]: !prev[item.sku],
                    }))}
                    className={cn(
                      "size-6 rounded-lg border-2 flex items-center justify-center transition-all shrink-0",
                      checkedItems[item.sku]
                        ? "bg-sky-500 border-sky-500 text-white"
                        : "bg-white/5 border-white/20"
                    )}
                  >
                    {checkedItems[item.sku] && <Check className="size-4" />}
                  </button>
                  <div className="flex-1">
                    <p className="font-semibold text-lg text-white">{item.name}</p>
                    <p className="text-white/40 font-mono">{item.sku}</p>
                  </div>
                  <span className="text-2xl font-bold text-sky-400">×{item.qty}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Tracking */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Shipping Details</h3>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">
                Carrier
              </label>
              <select
                value={carrier}
                onChange={(e) => setCarrier(e.target.value)}
                className="w-full h-14 text-lg rounded-xl bg-white/5 border border-white/10 text-white px-4 focus:outline-none focus:ring-2 focus:ring-sky-500/50 cursor-pointer"
              >
                <option value="" className="bg-[#0a0a14]">Select carrier</option>
                <option value="ups" className="bg-[#0a0a14]">UPS</option>
                <option value="fedex" className="bg-[#0a0a14]">FedEx</option>
                <option value="usps" className="bg-[#0a0a14]">USPS</option>
                <option value="dhl" className="bg-[#0a0a14]">DHL</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">
                Tracking Number
              </label>
              <input
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Scan or enter tracking number"
                className="w-full h-14 text-lg font-mono rounded-xl bg-white/5 border border-white/10 text-white px-4 placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/[0.06] space-y-3">
          <button
            disabled={!canComplete}
            onClick={onComplete}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-coral to-pink-500 px-4 py-5 text-xl font-medium text-white hover:opacity-90 transition-all shadow-lg shadow-coral/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Truck className="size-6" />
            Mark Shipped
          </button>
          <button className="w-full text-center text-coral font-medium py-2 hover:text-coral/80 transition-colors">
            Flag Issue
          </button>
        </div>
      </div>
    </div>
  )
}

export default function FulfillmentPage() {
  const [activeTab, setActiveTab] = useState<TabType>("ready")
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set())
  const [processingOrder, setProcessingOrder] = useState<Order | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const readyOrders = orders.filter((o) => o.status === "ready")
  const shippedOrders = orders.filter((o) => o.status === "shipped")
  const issueOrders = orders.filter((o) => o.status === "issue")

  const currentOrders =
    activeTab === "ready"
      ? readyOrders
      : activeTab === "shipped"
      ? shippedOrders
      : issueOrders

  const filteredOrders = searchQuery
    ? currentOrders.filter(
        (o) =>
          o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          o.customer.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : currentOrders

  const toggleSelectOrder = (orderId: string) => {
    setSelectedOrders((prev) => {
      const next = new Set(prev)
      if (next.has(orderId)) {
        next.delete(orderId)
      } else {
        next.add(orderId)
      }
      return next
    })
  }

  const selectAll = () => {
    if (selectedOrders.size === filteredOrders.length) {
      setSelectedOrders(new Set())
    } else {
      setSelectedOrders(new Set(filteredOrders.map((o) => o.id)))
    }
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden text-white">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(10,69,145,0.08),transparent)]" />
      </div>

      {/* Header */}
      <header className="bg-gradient-to-r from-[#0d1025] via-[#0a0a18] to-[#080812] border-b border-white/[0.06] px-6 py-4 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            {/* Logo */}
            <div className="relative">
              <div className="absolute inset-0 bg-sky-500/20 rounded-xl blur-xl scale-150" />
              <div className="relative flex items-center justify-center size-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10">
                <img 
                  src="/logos/Logomark white.svg" 
                  alt="Peptiful" 
                  className="h-7 w-7"
                />
              </div>
            </div>
            <div>
              <h1 className="font-bricolage text-2xl font-bold flex items-center gap-3 text-white">
                Fulfillment
                <span className="inline-flex items-center gap-1.5 rounded-full bg-coral/20 px-3 py-1 text-base font-medium text-coral ring-1 ring-inset ring-coral/30">
                  {readyOrders.length} pending
                </span>
              </h1>
              <p className="text-sm text-white/50">Peptiful Hub • Warehouse Operations</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center justify-center size-10 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-all">
              <RefreshCw className="size-5" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all">
              <LogOut className="size-4" />
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-[#0a0a14]/80 backdrop-blur-xl border-b border-white/[0.06] px-6 shrink-0">
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab("ready")}
            className={cn(
              "px-6 py-4 text-lg font-medium transition-all border-b-2 -mb-px",
              activeTab === "ready"
                ? "border-sky-400 text-white"
                : "border-transparent text-white/50 hover:text-white"
            )}
          >
            Ready to Ship
            <span className={cn(
              "ml-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium",
              activeTab === "ready"
                ? "bg-navy/30 text-sky-300 ring-1 ring-inset ring-navy/50"
                : "bg-white/5 text-white/50"
            )}>
              {readyOrders.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("shipped")}
            className={cn(
              "px-6 py-4 text-lg font-medium transition-all border-b-2 -mb-px",
              activeTab === "shipped"
                ? "border-sky-400 text-white"
                : "border-transparent text-white/50 hover:text-white"
            )}
          >
            Shipped Today
            <span className={cn(
              "ml-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium",
              activeTab === "shipped"
                ? "bg-navy/30 text-sky-300 ring-1 ring-inset ring-navy/50"
                : "bg-white/5 text-white/50"
            )}>
              {shippedOrders.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("issues")}
            className={cn(
              "px-6 py-4 text-lg font-medium transition-all border-b-2 -mb-px",
              activeTab === "issues"
                ? "border-coral text-coral"
                : "border-transparent text-white/50 hover:text-white"
            )}
          >
            <AlertTriangle className="size-5 inline mr-2" />
            Issues
            {issueOrders.length > 0 && (
              <span className="ml-2 inline-flex items-center rounded-full bg-coral/20 px-2.5 py-0.5 text-sm font-medium text-coral ring-1 ring-inset ring-coral/30">
                {issueOrders.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-[#0a0a14]/50 px-6 py-3 border-b border-white/[0.06] flex items-center gap-4 shrink-0">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-white/40" />
          <input
            placeholder="Search order ID or customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 h-12 text-lg rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
          />
        </div>

        {activeTab === "ready" && (
          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={selectAll}
              className="flex items-center gap-2 text-white/50 hover:text-white transition-colors"
            >
              {selectedOrders.size === filteredOrders.length &&
              filteredOrders.length > 0 ? (
                <CheckSquare className="size-5 text-sky-400" />
              ) : (
                <Square className="size-5" />
              )}
              <span className="font-medium">Select All</span>
            </button>
            {selectedOrders.size > 0 && (
              <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-coral to-pink-500 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-coral/20 hover:opacity-90 transition-all">
                Bulk Process ({selectedOrders.size})
              </button>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 scrollbar-dark">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onProcess={() => setProcessingOrder(order)}
              showProcessButton={activeTab === "ready"}
              isSelected={selectedOrders.has(order.id)}
              onToggleSelect={() => toggleSelectOrder(order.id)}
              showCheckbox={activeTab === "ready"}
            />
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-16">
            <Package className="size-16 mx-auto text-white/20 mb-4" />
            <p className="text-xl text-white/50">
              {searchQuery
                ? "No orders found"
                : activeTab === "ready"
                ? "All orders have been processed!"
                : activeTab === "shipped"
                ? "No orders shipped today yet"
                : "No issues to resolve"}
            </p>
          </div>
        )}
      </div>

      {/* Process Panel */}
      {processingOrder && (
        <ProcessPanel
          order={processingOrder}
          onClose={() => setProcessingOrder(null)}
          onComplete={() => {
            // Handle completion
            setProcessingOrder(null)
          }}
        />
      )}
    </div>
  )
}
