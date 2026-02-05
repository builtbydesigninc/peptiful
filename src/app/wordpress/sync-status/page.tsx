"use client"

import {
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Download,
  Trash2,
} from "lucide-react"

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

function getStatusBadge(status: string) {
  if (status === "success") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20 capitalize">
        {status}
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-coral/10 px-2.5 py-1 text-xs font-medium text-coral ring-1 ring-inset ring-coral/20 capitalize">
      {status}
    </span>
  )
}

export default function SyncStatusPage() {
  return (
    <div className="space-y-6">
      {/* Last Sync Status */}
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden border-gradient">
        <div className="p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-white/50 mb-1">Last Successful Sync</p>
              <p className="font-bricolage text-3xl font-bold text-white">
                Jan 27, 2026 at 14:45:00
              </p>
              <p className="text-sm text-white/50 mt-1">
                24 products synced • 1.2 seconds
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-white/50">Next sync in</p>
                <p className="font-bricolage text-xl font-semibold text-violet-400">12:34</p>
              </div>
              <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 hover:shadow-xl hover:shadow-violet-500/30 transition-all">
                <RefreshCw className="size-4" />
                Sync Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Sync History */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden border-gradient">
          <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
            <h2 className="font-semibold text-white">Sync History</h2>
            <button className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-white/50 hover:text-white hover:bg-white/5 transition-all">
              <Download className="size-4" />
              Export
            </button>
          </div>
          <div className="divide-y divide-white/[0.06]">
            {syncHistory.map((sync) => (
              <div key={sync.id} className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-3">
                  {sync.status === "success" ? (
                    <div className="flex items-center justify-center size-9 rounded-lg bg-emerald-500/10">
                      <CheckCircle className="size-5 text-emerald-400" />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center size-9 rounded-lg bg-coral/10">
                      <XCircle className="size-5 text-coral" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-white capitalize">
                      {sync.type} sync
                      <span className="text-white/50 font-normal ml-1">
                        ({sync.items} items)
                      </span>
                    </p>
                    <p className="text-sm text-white/40">{sync.timestamp}</p>
                  </div>
                </div>
                <div className="text-right">
                  {getStatusBadge(sync.status)}
                  <p className="text-xs text-white/40 mt-1">{sync.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Error Log */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden border-gradient">
          <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
            <h2 className="font-semibold text-white flex items-center gap-2">
              <AlertTriangle className="size-4 text-coral" />
              Error Log
            </h2>
            <span className="inline-flex items-center rounded-full bg-coral/10 px-2.5 py-1 text-xs font-medium text-coral ring-1 ring-inset ring-coral/20">
              {errorLog.length} errors
            </span>
          </div>
          <div className="divide-y divide-white/[0.06]">
            {errorLog.map((error) => (
              <div key={error.id} className="p-4 bg-coral/[0.03]">
                <div className="flex items-start justify-between mb-1">
                  <span className="text-sm font-semibold text-coral">
                    {error.type}
                  </span>
                  <span className="text-xs text-white/40">{error.timestamp}</span>
                </div>
                <p className="text-sm text-white/70">{error.message}</p>
                {error.order && (
                  <p className="text-xs text-white/40 mt-1">
                    Related order: <code className="font-mono text-violet-400">{error.order}</code>
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-white/[0.06]">
            <button className="w-full flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-all">
              <Trash2 className="size-4" />
              Clear Error Log
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
