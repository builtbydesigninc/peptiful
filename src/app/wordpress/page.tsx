"use client"

import { useState } from "react"
import {
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
      <div className="bg-white rounded border border-[#c3c4c7] shadow-sm">
        <div className="px-4 py-3 border-b border-[#c3c4c7] bg-[#f6f7f7]">
          <h2 className="font-semibold text-[#1d2327]">Hub Connection</h2>
        </div>
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="hub-url" className="text-[#1d2327]">
              Hub URL
            </Label>
            <Input
              id="hub-url"
              defaultValue="https://hub.peptiful.com"
              className="border-[#8c8f94] focus:border-navy focus:ring-navy"
            />
            <p className="text-xs text-[#646970]">
              The URL of your Peptiful Hub instance
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="api-key" className="text-[#1d2327]">
              API Key
            </Label>
            <Input
              id="api-key"
              defaultValue="pk_live_a1b2c3d4e5f6g7h8i9j0"
              className="font-mono text-sm border-[#8c8f94] focus:border-navy focus:ring-navy"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="api-secret" className="text-[#1d2327]">
              API Secret
            </Label>
            <div className="relative">
              <Input
                id="api-secret"
                type={showSecret ? "text" : "password"}
                defaultValue="sk_live_xyz123abc456def789"
                className="font-mono text-sm pr-10 border-[#8c8f94] focus:border-navy focus:ring-navy"
              />
              <button
                type="button"
                onClick={() => setShowSecret(!showSecret)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#646970] hover:text-[#1d2327]"
              >
                {showSecret ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Button
              onClick={handleTestConnection}
              disabled={testingConnection}
              className="bg-navy hover:bg-navy/90"
            >
              {testingConnection && <Loader2 className="size-4 animate-spin" />}
              Test Connection
            </Button>

            {connectionResult === "success" && (
              <span className="flex items-center gap-1.5 text-sm font-medium text-navy">
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
      <div className="bg-white rounded border border-[#c3c4c7] shadow-sm">
        <div className="px-4 py-3 border-b border-[#c3c4c7] bg-[#f6f7f7]">
          <h2 className="font-semibold text-[#1d2327]">Sync Settings</h2>
        </div>
        <div className="p-4 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-[#1d2327] font-medium">Auto-send Orders</Label>
              <p className="text-sm text-[#646970]">
                Automatically send new orders to Peptiful Hub
              </p>
            </div>
            <Switch
              checked={autoSendOrders}
              onCheckedChange={setAutoSendOrders}
            />
          </div>

          <div className="border-t border-[#c3c4c7] pt-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-[#1d2327] font-medium">Auto-sync Inventory</Label>
                <p className="text-sm text-[#646970]">
                  Keep inventory levels in sync with the Hub
                </p>
              </div>
              <Switch
                checked={autoSyncInventory}
                onCheckedChange={setAutoSyncInventory}
              />
            </div>
          </div>

          <div className="border-t border-[#c3c4c7] pt-4 space-y-2">
            <Label htmlFor="sync-frequency" className="text-[#1d2327]">
              Sync Frequency
            </Label>
            <Select defaultValue="15">
              <SelectTrigger id="sync-frequency" className="w-48 border-[#8c8f94]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">Every 5 minutes</SelectItem>
                <SelectItem value="15">Every 15 minutes</SelectItem>
                <SelectItem value="30">Every 30 minutes</SelectItem>
                <SelectItem value="60">Every hour</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Brand Settings */}
      <div className="bg-white rounded border border-[#c3c4c7] shadow-sm">
        <div className="px-4 py-3 border-b border-[#c3c4c7] bg-[#f6f7f7]">
          <h2 className="font-semibold text-[#1d2327]">Brand Settings</h2>
        </div>
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="brand-prefix" className="text-[#1d2327]">
              Brand Prefix
            </Label>
            <Input
              id="brand-prefix"
              defaultValue="PS"
              placeholder="e.g., PS"
              className="w-32 border-[#8c8f94] focus:border-navy focus:ring-navy"
            />
            <p className="text-xs text-[#646970]">
              Prefix added to order IDs (e.g., PS-12345)
            </p>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button variant="accent" size="lg">
          Save Settings
        </Button>
      </div>
    </div>
  )
}
