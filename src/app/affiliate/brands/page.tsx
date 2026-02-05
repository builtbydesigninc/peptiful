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
  ArrowUpRight,
} from "lucide-react"
import Link from "next/link"
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
          status === "connected" ? "bg-emerald-400" : "bg-amber-400 animate-pulse"
        }`}
      />
      <span className="text-sm text-white/70 capitalize">{status}</span>
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
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative bg-[#0a0a14] border border-white/10 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-white/[0.06]">
          <div className="flex items-center justify-between">
            <h2 className="font-bricolage text-xl font-semibold text-white">
              {step === 1 ? "Connect a Brand" : "Brand Connected!"}
            </h2>
            <button onClick={handleClose} className="flex items-center justify-center size-8 rounded-lg text-white/50 hover:bg-white/10 transition-colors">
              <X className="size-5" />
            </button>
          </div>
          <p className="text-sm text-white/50 mt-1">
            {step === 1 
              ? "Connect your WooCommerce store to start earning" 
              : "Configure your brand settings"
            }
          </p>
        </div>

        {step === 1 ? (
          <div className="p-6 space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Brand Name</label>
              <input 
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-navy/50 focus:border-navy/50 transition-all"
                placeholder="House of Aminos" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Store URL</label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/40" />
                <input 
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-navy/50 focus:border-navy/50 transition-all"
                  placeholder="https://yourstore.com" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">API Key</label>
              <input 
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-navy/50 focus:border-navy/50 transition-all"
                placeholder="ck_xxxxxxxxxxxxxxxx" 
              />
              <p className="text-xs text-white/30">
                Found in WooCommerce → Settings → Advanced → REST API
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">API Secret</label>
              <input 
                type="password"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-navy/50 focus:border-navy/50 transition-all"
                placeholder="cs_xxxxxxxxxxxxxxxx" 
              />
            </div>

            {connected ? (
              <div className="flex items-center gap-2 p-4 bg-emerald-500/10 text-emerald-400 rounded-xl ring-1 ring-inset ring-emerald-500/20">
                <CheckCircle className="size-5" />
                <span className="font-medium">Connection successful!</span>
              </div>
            ) : (
              <button 
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-navy to-sky-600 px-4 py-3 text-sm font-medium text-white hover:opacity-90 transition-all disabled:opacity-50"
                onClick={handleConnect}
                disabled={connecting}
              >
                {connecting ? (
                  <>
                    <span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Testing Connection...
                  </>
                ) : (
                  <>
                    <Link2 className="size-4" />
                    Test Connection
                  </>
                )}
              </button>
            )}
          </div>
        ) : (
          <div className="p-6 space-y-5">
            <div className="p-5 bg-white/[0.03] border border-white/[0.06] rounded-xl text-center">
              <CheckCircle className="size-12 text-emerald-400 mx-auto mb-3" />
              <h3 className="font-semibold text-white">House of Aminos</h3>
              <p className="text-sm text-white/50">Successfully connected</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Your Commission Rate</label>
              <div className="relative">
                <input 
                  type="number" 
                  defaultValue="10" 
                  className="w-full px-4 py-2.5 pr-8 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-navy/50 focus:border-navy/50 transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40">%</span>
              </div>
              <p className="text-xs text-white/30">
                Commission earned on each order from this brand
              </p>
            </div>

            <div className="flex items-center justify-between p-4 bg-white/[0.03] border border-white/[0.06] rounded-xl">
              <div>
                <p className="font-medium text-white">Auto-sync Inventory</p>
                <p className="text-xs text-white/40">Keep stock levels updated</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between p-4 bg-white/[0.03] border border-white/[0.06] rounded-xl">
              <div>
                <p className="font-medium text-white">Order Notifications</p>
                <p className="text-xs text-white/40">Get notified on new orders</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        )}

        <div className="p-6 border-t border-white/[0.06] flex gap-3">
          <button onClick={handleClose} className="flex-1 rounded-xl border border-white/10 bg-transparent px-4 py-2.5 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all">
            {step === 1 ? "Cancel" : "Close"}
          </button>
          {step === 2 && (
            <button onClick={handleClose} className="flex-1 rounded-xl bg-coral px-4 py-2.5 text-sm font-medium text-white hover:bg-coral/90 transition-all">
              View Brand
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function AffiliateBrandsPage() {
  const [showAddModal, setShowAddModal] = useState(false)

  return (
    <div className="min-h-full bg-[#050510] text-white">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(10,69,145,0.08),transparent)]" />
      </div>

      <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-bricolage text-xl sm:text-2xl font-semibold text-white">My Brands</h2>
            <p className="text-sm text-white/50 mt-1">Manage your connected brand stores</p>
          </div>
          <button 
            className="flex items-center justify-center gap-2 rounded-xl bg-coral px-4 py-2.5 text-sm font-medium text-white hover:bg-coral/90 transition-all w-full sm:w-auto"
            onClick={() => setShowAddModal(true)}
          >
            <Plus className="size-4" />
            Add Brand
          </button>
        </div>

        {/* Brand Cards */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          {brands.map((brand) => (
            <div key={brand.id} className="group rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden border-gradient hover:bg-white/[0.04] transition-all duration-300">
              {/* Header */}
              <div className="p-5 border-b border-white/[0.06]">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bricolage text-lg font-semibold text-white truncate">{brand.name}</h3>
                    <a
                      href={`https://${brand.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-sky-400 hover:underline flex items-center gap-1 mt-1"
                    >
                      <span className="truncate">{brand.url}</span>
                      <ExternalLink className="size-3 shrink-0" />
                    </a>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <StatusDot status={brand.status} />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="flex items-center justify-center size-8 rounded-lg text-white/50 hover:bg-white/10 transition-colors">
                          <MoreHorizontal className="size-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-[#0a0a14] border-white/10">
                        <DropdownMenuItem className="text-white/70 hover:text-white hover:bg-white/5">View Analytics</DropdownMenuItem>
                        <DropdownMenuItem className="text-white/70 hover:text-white hover:bg-white/5">Edit Settings</DropdownMenuItem>
                        <DropdownMenuItem className="text-coral hover:text-coral hover:bg-coral/10">Disconnect</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 divide-x divide-white/[0.06]">
                <div className="p-4 text-center">
                  <div className="flex items-center justify-center gap-1 text-white/40 mb-1">
                    <DollarSign className="size-3.5" />
                    <span className="text-[10px] uppercase tracking-wider">Earnings</span>
                  </div>
                  <p className="font-mono text-sm font-semibold text-emerald-400 truncate px-1">{brand.earnings}</p>
                </div>
                <div className="p-4 text-center">
                  <div className="flex items-center justify-center gap-1 text-white/40 mb-1">
                    <ShoppingBag className="size-3.5" />
                    <span className="text-[10px] uppercase tracking-wider">Orders</span>
                  </div>
                  <p className="font-mono text-sm font-semibold text-white">{brand.orders}</p>
                </div>
                <div className="p-4 text-center">
                  <div className="flex items-center justify-center gap-1 text-white/40 mb-1">
                    <TrendingUp className="size-3.5" />
                    <span className="text-[10px] uppercase tracking-wider">Conv.</span>
                  </div>
                  <p className="font-mono text-sm font-semibold text-white">{brand.conversionRate}</p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 bg-white/[0.02] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-t border-white/[0.06]">
                <span className="text-xs text-white/40">
                  Last synced: {brand.lastSync}
                </span>
                <Link 
                  href={`/affiliate/brands/${brand.id}`}
                  className="group/link flex items-center gap-1 text-xs font-medium text-white/50 hover:text-white transition-colors w-full sm:w-auto justify-center sm:justify-start"
                >
                  View Details
                  <ArrowUpRight className="size-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <AddBrandModal open={showAddModal} onClose={() => setShowAddModal(false)} />
      </div>
    </div>
  )
}
