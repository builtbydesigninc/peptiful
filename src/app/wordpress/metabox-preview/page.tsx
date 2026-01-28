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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SearchSelect } from "@/components/ui/search-select"

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
      <div className="bg-yellow-50 border border-yellow-200 rounded p-4 text-yellow-800">
        <p className="text-sm">
          <strong>Preview Mode:</strong> These are examples of how the Peptiful metaboxes will appear in WooCommerce.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Product Edit Metabox */}
        <div>
          <h3 className="text-lg font-semibold text-[#1d2327] mb-4">
            Product Edit Tab
          </h3>
          <div className="bg-white rounded border border-[#c3c4c7] shadow-sm">
            {/* WooCommerce-style tab header */}
            <div className="flex border-b border-[#c3c4c7]">
              <button className="px-4 py-2 text-sm text-[#646970] border-b-2 border-transparent hover:text-[#1d2327]">
                General
              </button>
              <button className="px-4 py-2 text-sm text-[#646970] border-b-2 border-transparent hover:text-[#1d2327]">
                Inventory
              </button>
              <button className="px-4 py-2 text-sm font-medium text-navy border-b-2 border-navy bg-[#f6f7f7]">
                Peptiful
              </button>
              <button className="px-4 py-2 text-sm text-[#646970] border-b-2 border-transparent hover:text-[#1d2327]">
                Shipping
              </button>
            </div>

            <div className="p-4 space-y-4">
              {/* Connection Status */}
              <div className="flex items-center justify-between p-3 bg-[#f6f7f7] rounded">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-green-500" />
                  <span className="text-sm font-medium text-[#1d2327]">
                    Connected to Hub
                  </span>
                </div>
                <span className="text-xs text-[#646970]">
                  Last sync: 2 min ago
                </span>
              </div>

              {/* Hub SKU */}
              <div className="space-y-2">
                <Label className="text-[#1d2327]">Hub SKU</Label>
                <SearchSelect
                  options={hubSkuOptions}
                  value="HUB-BPC157-10MG"
                  placeholder="Select Hub SKU"
                />
              </div>

              {/* Markup Settings */}
              <div className="space-y-3">
                <Label className="text-[#1d2327]">Markup Settings</Label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="markup"
                      value="percentage"
                      checked={markupType === "percentage"}
                      onChange={(e) => setMarkupType(e.target.value)}
                      className="accent-navy"
                    />
                    <span className="text-sm">Percentage markup</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="markup"
                      value="fixed"
                      checked={markupType === "fixed"}
                      onChange={(e) => setMarkupType(e.target.value)}
                      className="accent-navy"
                    />
                    <span className="text-sm">Fixed amount</span>
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    defaultValue={markupType === "percentage" ? "25" : "15"}
                    className="w-24 border-[#8c8f94]"
                  />
                  <span className="text-sm text-[#646970]">
                    {markupType === "percentage" ? "%" : "USD"}
                  </span>
                </div>
              </div>

              {/* Auto Sync */}
              <div className="flex items-center justify-between py-2">
                <Label className="text-[#1d2327]">Auto-sync this product</Label>
                <Switch checked={autoSync} onCheckedChange={setAutoSync} />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-[#c3c4c7]">
                <span className="text-xs text-[#646970]">
                  <Clock className="size-3 inline mr-1" />
                  Synced Jan 27, 2026 14:43:22
                </span>
                <Button variant="accent" size="sm">
                  <RefreshCw className="size-3" />
                  Sync Now
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Order Metabox */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-[#1d2327] mb-4">
              Order Metabox - Success
            </h3>
            <div className="bg-white rounded border border-[#c3c4c7] shadow-sm">
              <div className="px-4 py-2 border-b border-[#c3c4c7] bg-[#f6f7f7]">
                <h4 className="font-semibold text-sm text-[#1d2327] flex items-center gap-2">
                  <Package className="size-4 text-navy" />
                  Peptiful Hub
                </h4>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="size-4 text-green-600" />
                  <span className="text-sm font-medium text-green-700">
                    Sent to Hub
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-[#646970]">Hub Order ID</span>
                    <p className="font-mono font-medium text-navy">HOA-1234</p>
                  </div>
                  <div>
                    <span className="text-[#646970]">Status</span>
                    <p className="font-medium text-[#1d2327]">Processing</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#c3c4c7]">
                  <div className="flex items-center gap-2 text-sm">
                    <Truck className="size-4 text-[#646970]" />
                    <span className="text-[#646970]">Tracking:</span>
                    <code className="font-mono text-[#1d2327]">
                      1Z999AA10123456784
                    </code>
                    <ExternalLink className="size-3 text-[#646970]" />
                  </div>
                </div>

                <Button variant="outline" size="sm" className="w-full">
                  View in Hub
                </Button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#1d2327] mb-4">
              Order Metabox - Failed
            </h3>
            <div className="bg-white rounded border border-coral shadow-sm">
              <div className="px-4 py-2 border-b border-coral/30 bg-coral/5">
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

                <p className="text-sm text-[#1d2327] bg-coral/10 p-2 rounded">
                  SKU mapping not found for product "PS-TEST-123"
                </p>

                <div className="flex gap-2">
                  <Button variant="accent" size="sm" className="flex-1">
                    <RefreshCw className="size-3" />
                    Retry
                  </Button>
                  <Button variant="outline" size="sm">
                    View Log
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#1d2327] mb-4">
              Order Metabox - Pending
            </h3>
            <div className="bg-white rounded border border-[#c3c4c7] shadow-sm">
              <div className="px-4 py-2 border-b border-[#c3c4c7] bg-[#f6f7f7]">
                <h4 className="font-semibold text-sm text-[#1d2327] flex items-center gap-2">
                  <Package className="size-4 text-navy" />
                  Peptiful Hub
                </h4>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="size-4 text-[#646970] animate-pulse" />
                  <span className="text-sm font-medium text-[#646970]">
                    Waiting to send...
                  </span>
                </div>

                <p className="text-xs text-[#646970]">
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
