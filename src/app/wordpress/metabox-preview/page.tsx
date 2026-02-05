"use client"

import { useState } from "react"
import {
  CheckCircle,
  XCircle,
  RefreshCw,
  Package,
  Clock,
  Truck,
  AlertTriangle,
  ExternalLink,
  Info,
} from "lucide-react"

const hubSkuOptions = [
  { value: "HUB-BPC157-10MG", label: "HUB-BPC157-10MG", description: "BPC-157 10mg" },
  { value: "HUB-TB500-5MG", label: "HUB-TB500-5MG", description: "TB-500 5mg" },
  { value: "HUB-IPAM-5MG", label: "HUB-IPAM-5MG", description: "Ipamorelin 5mg" },
]

export default function MetaboxPreviewPage() {
  const [autoSync, setAutoSync] = useState(true)
  const [markupType, setMarkupType] = useState("percentage")

  return (
    <div className="space-y-8">
      {/* Preview Notice */}
      <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 flex items-start gap-3">
        <Info className="size-5 text-amber-400 shrink-0 mt-0.5" />
        <p className="text-sm text-amber-200">
          <strong>Preview Mode:</strong> These are examples of how the Peptiful metaboxes will appear in WooCommerce.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Product Edit Metabox */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Product Edit Tab
          </h3>
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden border-gradient">
            {/* WooCommerce-style tab header */}
            <div className="flex border-b border-white/[0.06] overflow-x-auto">
              <button className="px-4 py-3 text-sm text-white/40 border-b-2 border-transparent hover:text-white/70 whitespace-nowrap">
                General
              </button>
              <button className="px-4 py-3 text-sm text-white/40 border-b-2 border-transparent hover:text-white/70 whitespace-nowrap">
                Inventory
              </button>
              <button className="px-4 py-3 text-sm font-medium text-violet-400 border-b-2 border-violet-400 bg-white/[0.02] whitespace-nowrap">
                Peptiful
              </button>
              <button className="px-4 py-3 text-sm text-white/40 border-b-2 border-transparent hover:text-white/70 whitespace-nowrap">
                Shipping
              </button>
            </div>

            <div className="p-5 space-y-5">
              {/* Connection Status */}
              <div className="flex items-center justify-between p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-sm font-medium text-emerald-400">
                    Connected to Hub
                  </span>
                </div>
                <span className="text-xs text-white/40">
                  Last sync: 2 min ago
                </span>
              </div>

              {/* Hub SKU */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/70">Hub SKU</label>
                <select
                  defaultValue="HUB-BPC157-10MG"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 cursor-pointer"
                >
                  <option value="" className="bg-[#0a0a14]">Select Hub SKU</option>
                  {hubSkuOptions.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-[#0a0a14]">
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Markup Settings */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-white/70">Markup Settings</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="markup"
                      value="percentage"
                      checked={markupType === "percentage"}
                      onChange={(e) => setMarkupType(e.target.value)}
                      className="accent-violet-500"
                    />
                    <span className="text-sm text-white">Percentage markup</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="markup"
                      value="fixed"
                      checked={markupType === "fixed"}
                      onChange={(e) => setMarkupType(e.target.value)}
                      className="accent-violet-500"
                    />
                    <span className="text-sm text-white">Fixed amount</span>
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    defaultValue={markupType === "percentage" ? "25" : "15"}
                    className="w-24 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
                  />
                  <span className="text-sm text-white/50">
                    {markupType === "percentage" ? "%" : "USD"}
                  </span>
                </div>
              </div>

              {/* Auto Sync */}
              <div className="flex items-center justify-between py-2">
                <label className="text-sm font-medium text-white/70">Auto-sync this product</label>
                <button
                  onClick={() => setAutoSync(!autoSync)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    autoSync ? "bg-violet-500" : "bg-white/20"
                  }`}
                >
                  <span
                    className={`inline-block size-4 transform rounded-full bg-white shadow-lg transition-transform ${
                      autoSync ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                <span className="flex items-center gap-1.5 text-xs text-white/40">
                  <Clock className="size-3" />
                  Synced Jan 27, 2026 14:43:22
                </span>
                <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-coral to-pink-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-coral/20 hover:shadow-xl hover:shadow-coral/30 transition-all">
                  <RefreshCw className="size-3" />
                  Sync Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Order Metaboxes */}
        <div className="space-y-6">
          {/* Success */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Order Metabox - Success
            </h3>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden border-gradient">
              <div className="px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                <h4 className="font-semibold text-sm text-white flex items-center gap-2">
                  <Package className="size-4 text-violet-400" />
                  Peptiful Hub
                </h4>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="size-4 text-emerald-400" />
                  <span className="text-sm font-medium text-emerald-400">
                    Sent to Hub
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-white/50">Hub Order ID</span>
                    <p className="font-mono font-medium text-violet-400">HOA-1234</p>
                  </div>
                  <div>
                    <span className="text-white/50">Status</span>
                    <p className="font-medium text-white">Processing</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/[0.06]">
                  <div className="flex items-center gap-2 text-sm">
                    <Truck className="size-4 text-white/50" />
                    <span className="text-white/50">Tracking:</span>
                    <code className="font-mono text-white">
                      1Z999AA10123456784
                    </code>
                    <ExternalLink className="size-3 text-white/30" />
                  </div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-all">
                  View in Hub
                </button>
              </div>
            </div>
          </div>

          {/* Failed */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Order Metabox - Failed
            </h3>
            <div className="rounded-2xl border border-coral/30 bg-coral/[0.03] overflow-hidden">
              <div className="px-4 py-3 border-b border-coral/20 bg-coral/10">
                <h4 className="font-semibold text-sm text-coral flex items-center gap-2">
                  <AlertTriangle className="size-4" />
                  Peptiful Hub - Error
                </h4>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <XCircle className="size-4 text-coral" />
                  <span className="text-sm font-medium text-coral">
                    Failed to send
                  </span>
                </div>

                <p className="text-sm text-white/70 bg-coral/10 border border-coral/20 p-3 rounded-xl">
                  SKU mapping not found for product "PS-TEST-123"
                </p>

                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-coral to-pink-500 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-coral/20 hover:shadow-xl hover:shadow-coral/30 transition-all">
                    <RefreshCw className="size-3" />
                    Retry
                  </button>
                  <button className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-all">
                    View Log
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Pending */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Order Metabox - Pending
            </h3>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden border-gradient">
              <div className="px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                <h4 className="font-semibold text-sm text-white flex items-center gap-2">
                  <Package className="size-4 text-violet-400" />
                  Peptiful Hub
                </h4>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="size-4 text-amber-400 animate-pulse" />
                  <span className="text-sm font-medium text-amber-400">
                    Waiting to send...
                  </span>
                </div>

                <p className="text-xs text-white/50">
                  Order will be sent to Hub when payment is confirmed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
