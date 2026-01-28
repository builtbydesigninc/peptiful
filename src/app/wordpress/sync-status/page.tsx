"use client"

import {
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Download,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const syncHistory = [
  {
    id: 1,
    type: "inventory",
    status: "success",
    items: 24,
    timestamp: "Jan 27, 2026 14:45:00",
    duration: "1.2s",
  },
  {
    id: 2,
    type: "orders",
    status: "success",
    items: 3,
    timestamp: "Jan 27, 2026 14:30:00",
    duration: "0.8s",
  },
  {
    id: 3,
    type: "inventory",
    status: "success",
    items: 24,
    timestamp: "Jan 27, 2026 14:15:00",
    duration: "1.1s",
  },
  {
    id: 4,
    type: "orders",
    status: "failed",
    items: 1,
    timestamp: "Jan 27, 2026 14:00:00",
    duration: "5.0s",
    error: "Connection timeout - Hub unreachable",
  },
  {
    id: 5,
    type: "inventory",
    status: "success",
    items: 24,
    timestamp: "Jan 27, 2026 13:45:00",
    duration: "1.3s",
  },
]

const errorLog = [
  {
    id: 1,
    timestamp: "Jan 27, 2026 14:00:15",
    type: "Connection Error",
    message: "Failed to connect to Hub API: Connection timeout after 5000ms",
    order: null,
  },
  {
    id: 2,
    timestamp: "Jan 27, 2026 12:32:45",
    type: "SKU Mapping Error",
    message: "Product 'PS-TEST-123' has no Hub SKU mapping",
    order: "WC-1234",
  },
  {
    id: 3,
    timestamp: "Jan 27, 2026 10:15:22",
    type: "Inventory Sync Error",
    message: "Hub returned invalid stock value for HUB-BPC157-10MG",
    order: null,
  },
]

export default function SyncStatusPage() {
  return (
    <div className="space-y-6">
      {/* Last Sync Status */}
      <div className="bg-white rounded border border-[#c3c4c7] shadow-sm">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#646970] mb-1">Last Successful Sync</p>
              <p className="text-3xl font-bold text-[#1d2327]">
                Jan 27, 2026 at 14:45:00
              </p>
              <p className="text-sm text-[#646970] mt-1">
                24 products synced • 1.2 seconds
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-[#646970]">Next sync in</p>
                <p className="text-xl font-semibold text-navy">12:34</p>
              </div>
              <Button className="bg-navy hover:bg-navy/90" size="lg">
                <RefreshCw className="size-4" />
                Sync Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Sync History */}
        <div className="bg-white rounded border border-[#c3c4c7] shadow-sm">
          <div className="px-4 py-3 border-b border-[#c3c4c7] bg-[#f6f7f7] flex items-center justify-between">
            <h2 className="font-semibold text-[#1d2327]">Sync History</h2>
            <Button variant="ghost" size="sm" className="text-[#646970]">
              <Download className="size-4" />
              Export
            </Button>
          </div>
          <div className="divide-y divide-[#c3c4c7]">
            {syncHistory.map((sync) => (
              <div key={sync.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {sync.status === "success" ? (
                    <CheckCircle className="size-5 text-green-600" />
                  ) : (
                    <XCircle className="size-5 text-coral" />
                  )}
                  <div>
                    <p className="font-medium text-[#1d2327] capitalize">
                      {sync.type} sync
                      <span className="text-[#646970] font-normal ml-1">
                        ({sync.items} items)
                      </span>
                    </p>
                    <p className="text-sm text-[#646970]">{sync.timestamp}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    variant={sync.status === "success" ? "active" : "failed"}
                    className="capitalize"
                  >
                    {sync.status}
                  </Badge>
                  <p className="text-xs text-[#646970] mt-1">{sync.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Error Log */}
        <div className="bg-white rounded border border-[#c3c4c7] shadow-sm">
          <div className="px-4 py-3 border-b border-[#c3c4c7] bg-[#f6f7f7] flex items-center justify-between">
            <h2 className="font-semibold text-[#1d2327] flex items-center gap-2">
              <AlertTriangle className="size-4 text-coral" />
              Error Log
            </h2>
            <Badge variant="failed">{errorLog.length} errors</Badge>
          </div>
          <div className="divide-y divide-[#c3c4c7]">
            {errorLog.map((error) => (
              <div key={error.id} className="p-4 bg-coral/5">
                <div className="flex items-start justify-between mb-1">
                  <span className="text-sm font-semibold text-coral">
                    {error.type}
                  </span>
                  <span className="text-xs text-[#646970]">{error.timestamp}</span>
                </div>
                <p className="text-sm text-[#1d2327]">{error.message}</p>
                {error.order && (
                  <p className="text-xs text-[#646970] mt-1">
                    Related order: <code className="font-mono">{error.order}</code>
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-[#c3c4c7]">
            <Button variant="outline" size="sm" className="w-full">
              Clear Error Log
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
