"use client"

import { useState } from "react"
import {
  ExternalLink,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  MoreHorizontal,
  Plus,
  X,
  Globe,
  Link2,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
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

const brands = [
  {
    id: 1,
    name: "Peptide Sciences",
    url: "peptidesciences.com",
    status: "connected",
    earnings: "$89,234.50",
    orders: 892,
    conversionRate: "3.2%",
    lastSync: "2 min ago",
  },
  {
    id: 2,
    name: "Core Peptides",
    url: "corepeptides.com",
    status: "connected",
    earnings: "$38,456.20",
    orders: 456,
    conversionRate: "2.8%",
    lastSync: "5 min ago",
  },
  {
    id: 3,
    name: "Research Peptides",
    url: "researchpeptides.co",
    status: "connected",
    earnings: "$15,156.80",
    orders: 178,
    conversionRate: "2.1%",
    lastSync: "12 min ago",
  },
  {
    id: 4,
    name: "Premium Peptides Co",
    url: "premiumpeptides.com",
    status: "pending",
    earnings: "$0.00",
    orders: 0,
    conversionRate: "—",
    lastSync: "Never",
  },
]

function StatusDot({ status }: { status: string }) {
  return (
    <span className="flex items-center gap-2">
      <span
        className={`size-2 rounded-full ${
          status === "connected" ? "bg-green-500" : "bg-yellow-500"
        }`}
      />
      <span className="text-sm capitalize">{status}</span>
    </span>
  )
}

function AddBrandModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1)
  const [connecting, setConnecting] = useState(false)
  const [connected, setConnected] = useState(false)

  const handleConnect = () => {
    setConnecting(true)
    setTimeout(() => {
      setConnecting(false)
      setConnected(true)
      setTimeout(() => {
        setStep(2)
      }, 1000)
    }, 2000)
  }

  const handleClose = () => {
    setStep(1)
    setConnecting(false)
    setConnected(false)
    onClose()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-dark-navy/50 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-border/50">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-dark-navy">
              {step === 1 ? "Connect a Brand" : "Brand Connected!"}
            </h2>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="size-5" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {step === 1 
              ? "Connect your WooCommerce store to start earning" 
              : "Configure your brand settings"
            }
          </p>
        </div>

        {step === 1 ? (
          <div className="p-6 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="brandName">Brand Name</Label>
              <Input id="brandName" placeholder="House of Aminos" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="storeUrl">Store URL</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input id="storeUrl" placeholder="https://yourstore.com" className="pl-9" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input id="apiKey" placeholder="ck_xxxxxxxxxxxxxxxx" className="font-mono text-sm" />
              <p className="text-xs text-muted-foreground">
                Found in WooCommerce → Settings → Advanced → REST API
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="apiSecret">API Secret</Label>
              <Input id="apiSecret" type="password" placeholder="cs_xxxxxxxxxxxxxxxx" className="font-mono text-sm" />
            </div>

            {connected ? (
              <div className="flex items-center gap-2 p-3 bg-green-50 text-green-700 rounded-lg">
                <CheckCircle className="size-5" />
                <span className="font-medium">Connection successful!</span>
              </div>
            ) : (
              <Button 
                className="w-full" 
                onClick={handleConnect}
                disabled={connecting}
              >
                {connecting ? (
                  <>
                    <span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Testing Connection...
                  </>
                ) : (
                  <>
                    <Link2 className="size-4" />
                    Test Connection
                  </>
                )}
              </Button>
            )}
          </div>
        ) : (
          <div className="p-6 space-y-5">
            <div className="p-4 bg-lavender rounded-lg text-center">
              <CheckCircle className="size-12 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold text-dark-navy">House of Aminos</h3>
              <p className="text-sm text-muted-foreground">Successfully connected</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="commission">Your Commission Rate</Label>
              <div className="relative">
                <Input id="commission" type="number" defaultValue="10" className="pr-8" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Commission earned on each order from this brand
              </p>
            </div>

            <div className="flex items-center justify-between p-3 bg-lavender/50 rounded-lg">
              <div>
                <p className="font-medium text-dark-navy">Auto-sync Inventory</p>
                <p className="text-xs text-muted-foreground">Keep stock levels updated</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between p-3 bg-lavender/50 rounded-lg">
              <div>
                <p className="font-medium text-dark-navy">Order Notifications</p>
                <p className="text-xs text-muted-foreground">Get notified on new orders</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        )}

        <div className="p-6 border-t border-border/50 flex gap-3">
          <Button variant="outline" className="flex-1" onClick={handleClose}>
            {step === 1 ? "Cancel" : "Close"}
          </Button>
          {step === 2 && (
            <Button variant="accent" className="flex-1" onClick={handleClose}>
              View Brand
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function AffiliateBrandsPage() {
  const [showAddModal, setShowAddModal] = useState(false)

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-dark-navy">My Brands</h2>
          <p className="text-sm sm:text-base text-muted-foreground">Manage your connected brand stores</p>
        </div>
        <Button variant="accent" className="w-full sm:w-auto" onClick={() => setShowAddModal(true)}>
          <Plus className="size-4" />
          Add Brand
        </Button>
      </div>

      {/* Brand Cards */}
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        {brands.map((brand) => (
          <Card key={brand.id} className="bg-white border-border/50 overflow-hidden">
            <CardContent className="p-0">
              {/* Header */}
              <div className="p-4 sm:p-5 border-b border-border/50">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-dark-navy truncate">{brand.name}</h3>
                    <a
                      href={`https://${brand.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm text-navy hover:underline flex items-center gap-1 mt-1"
                    >
                      <span className="truncate">{brand.url}</span>
                      <ExternalLink className="size-3 shrink-0" />
                    </a>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                    <StatusDot status={brand.status} />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Analytics</DropdownMenuItem>
                        <DropdownMenuItem>Edit Settings</DropdownMenuItem>
                        <DropdownMenuItem className="text-coral">Disconnect</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 divide-x divide-border/50">
                <div className="p-2 sm:p-4 text-center">
                  <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                    <DollarSign className="size-3 sm:size-4" />
                    <span className="text-[10px] sm:text-xs">Earnings</span>
                  </div>
                  <p className="text-sm sm:text-lg font-bold text-dark-navy truncate px-1">{brand.earnings}</p>
                </div>
                <div className="p-2 sm:p-4 text-center">
                  <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                    <ShoppingBag className="size-3 sm:size-4" />
                    <span className="text-[10px] sm:text-xs">Orders</span>
                  </div>
                  <p className="text-sm sm:text-lg font-bold text-dark-navy">{brand.orders}</p>
                </div>
                <div className="p-2 sm:p-4 text-center">
                  <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                    <TrendingUp className="size-3 sm:size-4" />
                    <span className="text-[10px] sm:text-xs">Conv.</span>
                  </div>
                  <p className="text-sm sm:text-lg font-bold text-dark-navy">{brand.conversionRate}</p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-3 sm:p-4 bg-lavender/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <span className="text-xs text-muted-foreground">
                  Last synced: {brand.lastSync}
                </span>
                <Button variant="secondary" size="sm" className="w-full sm:w-auto" asChild>
                  <Link href={`/affiliate/brands/${brand.id}`}>View Details</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AddBrandModal open={showAddModal} onClose={() => setShowAddModal(false)} />
    </div>
  )
}
