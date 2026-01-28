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
  User,
  MapPin,
  Box,
  Search,
  RefreshCw,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Logo } from "@/components/logo"

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
}: {
  order: Order
  onProcess?: () => void
  showProcessButton?: boolean
}) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-border/50">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-2xl font-bold text-dark-navy font-mono">{order.id}</h3>
          <p className="text-lg text-muted-foreground">{order.brand}</p>
        </div>
        <Badge
          variant={order.labelType === "white" ? "active" : "pending"}
          className="text-sm px-3 py-1"
        >
          {order.labelType === "white"
            ? "White Label"
            : `Private: ${order.privateLabelBrand}`}
        </Badge>
      </div>

      {/* Ship To */}
      <div className="flex items-start gap-2 mb-4 p-3 bg-lavender/50 rounded-xl">
        <MapPin className="size-5 text-navy mt-0.5 shrink-0" />
        <div>
          <p className="font-semibold text-lg">{order.customer.name}</p>
          <p className="text-muted-foreground">
            {order.customer.city}, {order.customer.state}
          </p>
        </div>
      </div>

      {/* Items */}
      <div className="space-y-2 mb-4">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Items ({order.items.reduce((acc, item) => acc + item.qty, 0)})
        </p>
        {order.items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
          >
            <div className="flex items-center gap-3">
              <Box className="size-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground font-mono">{item.sku}</p>
              </div>
            </div>
            <span className="text-xl font-bold text-navy">×{item.qty}</span>
          </div>
        ))}
      </div>

      {/* Shipped Info or Issue */}
      {order.status === "shipped" && (
        <div className="flex items-center gap-2 p-3 bg-green-50 rounded-xl text-green-700 mb-4">
          <Truck className="size-5" />
          <div>
            <p className="font-medium">Shipped at {order.shippedAt}</p>
            <p className="text-sm font-mono">{order.trackingNumber}</p>
          </div>
        </div>
      )}

      {order.status === "issue" && (
        <div className="flex items-center gap-2 p-3 bg-coral/10 rounded-xl text-coral mb-4">
          <AlertTriangle className="size-5" />
          <p className="font-medium">{order.issueType}</p>
        </div>
      )}

      {/* Action */}
      {showProcessButton && order.status === "ready" && (
        <Button
          variant="accent"
          size="lg"
          className="w-full text-lg h-14"
          onClick={onProcess}
        >
          Process Order
          <ChevronRight className="size-5" />
        </Button>
      )}

      {order.status === "issue" && (
        <Button variant="outline" size="lg" className="w-full text-lg h-14">
          Resolve Issue
        </Button>
      )}
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
        className="absolute inset-0 bg-dark-navy/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative ml-auto h-full w-full max-w-lg bg-white shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-2xl font-bold text-dark-navy font-mono">
              {order.id}
            </h2>
            <p className="text-muted-foreground">{order.brand}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="size-6" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Ship To */}
          <div className="p-4 bg-lavender/50 rounded-xl">
            <p className="text-sm font-medium text-muted-foreground mb-1">
              SHIP TO
            </p>
            <p className="text-xl font-semibold">{order.customer.name}</p>
            <p className="text-muted-foreground">
              {order.customer.city}, {order.customer.state}
            </p>
          </div>

          {/* Checklist */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <CheckSquare className="size-5 text-navy" />
              Pick List
            </h3>
            <div className="space-y-3">
              {order.items.map((item) => (
                <label
                  key={item.sku}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors",
                    checkedItems[item.sku]
                      ? "border-navy bg-navy/5"
                      : "border-border hover:border-navy/30"
                  )}
                >
                  <Checkbox
                    checked={checkedItems[item.sku] || false}
                    onCheckedChange={(checked) =>
                      setCheckedItems((prev) => ({
                        ...prev,
                        [item.sku]: !!checked,
                      }))
                    }
                    className="size-6"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-lg">{item.name}</p>
                    <p className="text-muted-foreground font-mono">{item.sku}</p>
                  </div>
                  <span className="text-2xl font-bold text-navy">×{item.qty}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Tracking */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Shipping Details</h3>
            <div className="space-y-2">
              <Label htmlFor="carrier" className="text-base">
                Carrier
              </Label>
              <Select value={carrier} onValueChange={setCarrier}>
                <SelectTrigger id="carrier" className="h-14 text-lg">
                  <SelectValue placeholder="Select carrier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ups">UPS</SelectItem>
                  <SelectItem value="fedex">FedEx</SelectItem>
                  <SelectItem value="usps">USPS</SelectItem>
                  <SelectItem value="dhl">DHL</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tracking" className="text-base">
                Tracking Number
              </Label>
              <Input
                id="tracking"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Scan or enter tracking number"
                className="h-14 text-lg font-mono"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border space-y-3">
          <Button
            variant="accent"
            size="xl"
            className="w-full text-xl h-16"
            disabled={!canComplete}
            onClick={onComplete}
          >
            <Truck className="size-6" />
            Mark Shipped
          </Button>
          <button className="w-full text-center text-coral font-medium py-2 hover:underline">
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
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-dark-navy text-white px-6 py-4 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo size="md" variant="light" />
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-3">
                Fulfillment
                <Badge variant="failed" className="text-base px-3 py-1">
                  {readyOrders.length} pending
                </Badge>
              </h1>
              <p className="text-white/60">Peptiful Hub • Warehouse</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="text-white/70 hover:text-white hover:bg-white/10"
            >
              <RefreshCw className="size-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white/70 hover:text-white hover:bg-white/10"
            >
              <LogOut className="size-4 mr-2" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-border px-6 shrink-0">
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab("ready")}
            className={cn(
              "px-6 py-4 text-lg font-medium transition-colors border-b-3 -mb-px",
              activeTab === "ready"
                ? "border-navy text-navy"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            Ready to Ship
            <Badge
              variant={activeTab === "ready" ? "active" : "muted"}
              className="ml-2"
            >
              {readyOrders.length}
            </Badge>
          </button>
          <button
            onClick={() => setActiveTab("shipped")}
            className={cn(
              "px-6 py-4 text-lg font-medium transition-colors border-b-3 -mb-px",
              activeTab === "shipped"
                ? "border-navy text-navy"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            Shipped Today
            <Badge
              variant={activeTab === "shipped" ? "active" : "muted"}
              className="ml-2"
            >
              {shippedOrders.length}
            </Badge>
          </button>
          <button
            onClick={() => setActiveTab("issues")}
            className={cn(
              "px-6 py-4 text-lg font-medium transition-colors border-b-3 -mb-px",
              activeTab === "issues"
                ? "border-coral text-coral"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            <AlertTriangle className="size-5 inline mr-2" />
            Issues
            {issueOrders.length > 0 && (
              <Badge variant="failed" className="ml-2">
                {issueOrders.length}
              </Badge>
            )}
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white px-6 py-3 border-b border-border flex items-center gap-4 shrink-0">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
          <Input
            placeholder="Search order ID or customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 text-lg"
          />
        </div>

        {activeTab === "ready" && (
          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={selectAll}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              {selectedOrders.size === filteredOrders.length &&
              filteredOrders.length > 0 ? (
                <CheckSquare className="size-5 text-navy" />
              ) : (
                <Square className="size-5" />
              )}
              <span className="font-medium">Select All</span>
            </button>
            {selectedOrders.size > 0 && (
              <Button variant="outline" size="lg">
                Bulk Process ({selectedOrders.size})
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredOrders.map((order) => (
            <div key={order.id} className="relative">
              {activeTab === "ready" && (
                <button
                  onClick={() => toggleSelectOrder(order.id)}
                  className={cn(
                    "absolute top-4 left-4 z-10 size-7 rounded-lg border-2 flex items-center justify-center transition-colors",
                    selectedOrders.has(order.id)
                      ? "bg-navy border-navy text-white"
                      : "bg-white border-border hover:border-navy"
                  )}
                >
                  {selectedOrders.has(order.id) && (
                    <CheckSquare className="size-4" />
                  )}
                </button>
              )}
              <OrderCard
                order={order}
                onProcess={() => setProcessingOrder(order)}
                showProcessButton={activeTab === "ready"}
              />
            </div>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-16">
            <Package className="size-16 mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-xl text-muted-foreground">
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
