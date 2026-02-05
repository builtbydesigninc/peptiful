"use client"

import { useState } from "react"
import {
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  Loader2,
  Globe,
  Key,
  Shield,
  Settings,
  Zap,
} from "lucide-react"

export default function WordPressSettingsPage() {
  const [showSecret, setShowSecret] = useState(false)
  const [testingConnection, setTestingConnection] = useState(false)
  const [connectionResult, setConnectionResult] = useState<"success" | "error" | null>(null)
  const [autoSendOrders, setAutoSendOrders] = useState(true)
  const [autoSyncInventory, setAutoSyncInventory] = useState(true)

  const handleTestConnection = () => {
    setTestingConnection(true)
    setConnectionResult(null)
    setTimeout(() => {
      setTestingConnection(false)
      setConnectionResult("success")
    }, 1500)
  }

  return (
    <div className="max-w-3xl space-y-6">
      {/* Connection Section */}
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden border-gradient">
        <div className="px-5 py-4 border-b border-white/[0.06] flex items-center gap-3">
          <div className="flex items-center justify-center size-9 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600">
            <Globe className="size-4 text-white" />
          </div>
          <h2 className="font-semibold text-white">Hub Connection</h2>
        </div>
        <div className="p-5 space-y-5">
          <div className="space-y-2">
            <label htmlFor="hub-url" className="block text-sm font-medium text-white/70">
              Hub URL
            </label>
            <input
              id="hub-url"
              defaultValue="https://hub.peptiful.com"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
            />
            <p className="text-xs text-white/40">
              The URL of your Peptiful Hub instance
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="api-key" className="block text-sm font-medium text-white/70">
              API Key
            </label>
            <div className="relative">
              <Key className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-white/30" />
              <input
                id="api-key"
                defaultValue="pk_live_a1b2c3d4e5f6g7h8i9j0"
                className="w-full rounded-xl border border-white/10 bg-white/5 pl-11 pr-4 py-3 font-mono text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="api-secret" className="block text-sm font-medium text-white/70">
              API Secret
            </label>
            <div className="relative">
              <Shield className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-white/30" />
              <input
                id="api-secret"
                type={showSecret ? "text" : "password"}
                defaultValue="sk_live_xyz123abc456def789"
                className="w-full rounded-xl border border-white/10 bg-white/5 pl-11 pr-12 py-3 font-mono text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowSecret(!showSecret)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
              >
                {showSecret ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleTestConnection}
              disabled={testingConnection}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet-500/20 hover:shadow-xl hover:shadow-violet-500/30 disabled:opacity-50 transition-all"
            >
              {testingConnection && <Loader2 className="size-4 animate-spin" />}
              Test Connection
            </button>

            {connectionResult === "success" && (
              <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-400">
                <CheckCircle className="size-4" />
                Connection successful!
              </span>
            )}
            {connectionResult === "error" && (
              <span className="flex items-center gap-1.5 text-sm font-medium text-coral">
                <XCircle className="size-4" />
                Connection failed. Check your credentials.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Settings Section */}
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden border-gradient">
        <div className="px-5 py-4 border-b border-white/[0.06] flex items-center gap-3">
          <div className="flex items-center justify-center size-9 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600">
            <Settings className="size-4 text-white" />
          </div>
          <h2 className="font-semibold text-white">Sync Settings</h2>
        </div>
        <div className="p-5 space-y-5">
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div>
              <p className="font-medium text-white">Auto-send Orders</p>
              <p className="text-sm text-white/50">
                Automatically send new orders to Peptiful Hub
              </p>
            </div>
            <button
              onClick={() => setAutoSendOrders(!autoSendOrders)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                autoSendOrders ? "bg-violet-500" : "bg-white/20"
              }`}
            >
              <span
                className={`inline-block size-4 transform rounded-full bg-white shadow-lg transition-transform ${
                  autoSendOrders ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div>
              <p className="font-medium text-white">Auto-sync Inventory</p>
              <p className="text-sm text-white/50">
                Keep inventory levels in sync with the Hub
              </p>
            </div>
            <button
              onClick={() => setAutoSyncInventory(!autoSyncInventory)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                autoSyncInventory ? "bg-violet-500" : "bg-white/20"
              }`}
            >
              <span
                className={`inline-block size-4 transform rounded-full bg-white shadow-lg transition-transform ${
                  autoSyncInventory ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="space-y-2">
            <label htmlFor="sync-frequency" className="block text-sm font-medium text-white/70">
              Sync Frequency
            </label>
            <select
              id="sync-frequency"
              defaultValue="15"
              className="w-48 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all cursor-pointer"
            >
              <option value="5" className="bg-[#0a0a14]">Every 5 minutes</option>
              <option value="15" className="bg-[#0a0a14]">Every 15 minutes</option>
              <option value="30" className="bg-[#0a0a14]">Every 30 minutes</option>
              <option value="60" className="bg-[#0a0a14]">Every hour</option>
            </select>
          </div>
        </div>
      </div>

      {/* Brand Settings */}
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden border-gradient">
        <div className="px-5 py-4 border-b border-white/[0.06] flex items-center gap-3">
          <div className="flex items-center justify-center size-9 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600">
            <Zap className="size-4 text-white" />
          </div>
          <h2 className="font-semibold text-white">Brand Settings</h2>
        </div>
        <div className="p-5 space-y-2">
          <label htmlFor="brand-prefix" className="block text-sm font-medium text-white/70">
            Brand Prefix
          </label>
          <input
            id="brand-prefix"
            defaultValue="PS"
            placeholder="e.g., PS"
            className="w-32 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
          />
          <p className="text-xs text-white/40">
            Prefix added to order IDs (e.g., PS-12345)
          </p>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-coral to-pink-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-coral/20 hover:shadow-xl hover:shadow-coral/30 transition-all">
          Save Settings
        </button>
      </div>
    </div>
  )
}
