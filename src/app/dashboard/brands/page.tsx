"use client"

import { useState } from "react"
import {
  Plus,
  Copy,
  MoreHorizontal,
  Eye,
  EyeOff,
  RefreshCw,
  Trash2,
  CheckCircle,
  Building2,
  Key,
  Activity,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  ModalTrigger,
} from "@/components/ui/modal"

const brands = [
  {
    id: 1,
    name: "Peptide Sciences",
    affiliate: "Health Pro Shop",
    apiKey: "pk_live_a1b2c3d4e5f6g7h8i9j0",
    status: "active",
    lastConnected: "2 min ago",
    orders: 1247,
  },
  {
    id: 2,
    name: "Core Peptides",
    affiliate: "Wellness Direct",
    apiKey: "pk_live_k1l2m3n4o5p6q7r8s9t0",
    status: "active",
    lastConnected: "5 min ago",
    orders: 892,
  },
  {
    id: 3,
    name: "Amino Asylum",
    affiliate: "BioFit Store",
    apiKey: "pk_live_u1v2w3x4y5z6a7b8c9d0",
    status: "inactive",
    lastConnected: "3 days ago",
    orders: 456,
  },
  {
    id: 4,
    name: "Research Peptides",
    affiliate: "Health Pro Shop",
    apiKey: "pk_live_e1f2g3h4i5j6k7l8m9n0",
    status: "active",
    lastConnected: "12 min ago",
    orders: 234,
  },
  {
    id: 5,
    name: "Premium Peptides Co",
    affiliate: "Wellness Direct",
    apiKey: "pk_live_o1p2q3r4s5t6u7v8w9x0",
    status: "active",
    lastConnected: "1 hour ago",
    orders: 178,
  },
]

const affiliates = [
  { id: 1, name: "Health Pro Shop" },
  { id: 2, name: "Wellness Direct" },
  { id: 3, name: "BioFit Store" },
  { id: 4, name: "Supplement Hub" },
]

const stats = [
  { label: "Total Brands", value: "8", icon: Building2 },
  { label: "Active Connections", value: "7", icon: Activity },
  { label: "API Keys Issued", value: "12", icon: Key },
]

function MaskedApiKey({ apiKey }: { apiKey: string }) {
  const [visible, setVisible] = useState(false)
  const masked = `${apiKey.slice(0, 8)}${"•".repeat(16)}${apiKey.slice(-4)}`

  return (
    <div className="flex items-center gap-2">
      <code className="font-mono text-xs text-white/50">
        {visible ? apiKey : masked}
      </code>
      <button
        onClick={() => setVisible(!visible)}
        className="text-white/40 hover:text-white/70 transition-colors"
      >
        {visible ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
      </button>
      <button
        onClick={() => navigator.clipboard.writeText(apiKey)}
        className="text-white/40 hover:text-white/70 transition-colors"
      >
        <Copy className="size-3.5" />
      </button>
    </div>
  )
}

function StatusDot({ status }: { status: string }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`size-2 rounded-full ${
          status === "active" ? "bg-emerald-400" : "bg-rose-400"
        }`}
      />
      <span className="text-sm text-white/70 capitalize">{status}</span>
    </div>
  )
}

function CreateApiKeyModal() {
  const [brandName, setBrandName] = useState("")
  const [affiliate, setAffiliate] = useState("")
  const [generatedKey, setGeneratedKey] = useState("")
  const [isGenerated, setIsGenerated] = useState(false)

  const handleGenerate = () => {
    const key = `pk_live_${Math.random().toString(36).substring(2, 22)}`
    setGeneratedKey(key)
    setIsGenerated(true)
  }

  const handleReset = () => {
    setBrandName("")
    setAffiliate("")
    setGeneratedKey("")
    setIsGenerated(false)
  }

  return (
    <Modal onOpenChange={(open) => !open && handleReset()}>
      <ModalTrigger asChild>
        <Button className="bg-coral hover:bg-coral/90 text-white border-0">
          <Plus className="size-4" />
          Create API Key
        </Button>
      </ModalTrigger>
      <ModalContent className="bg-[#0a0a14] border-white/10">
        <ModalHeader>
          <ModalTitle className="text-white">Create API Key</ModalTitle>
          <ModalDescription className="text-white/50">
            Generate a new API key for a brand to connect to Peptiful Hub.
          </ModalDescription>
        </ModalHeader>

        {!isGenerated ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="brand-name" className="text-white/70">Brand Name</Label>
              <Input
                id="brand-name"
                placeholder="e.g., Peptide Sciences"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="affiliate" className="text-white/70">Parent Affiliate</Label>
              <Select value={affiliate} onValueChange={setAffiliate}>
                <SelectTrigger id="affiliate" className="bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Select an affiliate" />
                </SelectTrigger>
                <SelectContent className="bg-[#0a0a14] border-white/10">
                  {affiliates.map((aff) => (
                    <SelectItem key={aff.id} value={aff.name} className="text-white/70 hover:text-white hover:bg-white/5">
                      {aff.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 p-3 text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
              <CheckCircle className="size-5" />
              <span className="text-sm font-medium">API key generated successfully!</span>
            </div>
            <div className="space-y-2">
              <Label className="text-white/70">Your API Key</Label>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-3">
                <code className="flex-1 font-mono text-sm text-white break-all">
                  {generatedKey}
                </code>
                <button
                  onClick={() => navigator.clipboard.writeText(generatedKey)}
                  className="text-white/40 hover:text-white transition-colors"
                >
                  <Copy className="size-4" />
                </button>
              </div>
              <p className="text-xs text-white/40">
                Make sure to copy this key now. You won&apos;t be able to see it again.
              </p>
            </div>
          </div>
        )}

        <ModalFooter>
          {!isGenerated ? (
            <>
              <button onClick={handleReset} className="rounded-xl border border-white/10 bg-transparent px-4 py-2 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all">
                Cancel
              </button>
              <Button
                className="bg-coral hover:bg-coral/90 text-white"
                onClick={handleGenerate}
                disabled={!brandName || !affiliate}
              >
                Generate Key
              </Button>
            </>
          ) : (
            <Button className="bg-white text-[#050510] hover:bg-white/90" onClick={handleReset}>
              Done
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default function BrandsPage() {
  return (
    <div className="min-h-screen bg-[#050510] text-white">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(10,69,145,0.08),transparent)]" />
      </div>

      <div className="p-6 lg:p-8 space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-white/40 mb-1">
              <a href="/dashboard" className="hover:text-white/70 transition-colors">Dashboard</a>
              <span>/</span>
              <span className="text-white/70">Brands</span>
            </div>
            <h1 className="font-bricolage text-2xl font-semibold tracking-tight text-white">Brands & API Keys</h1>
            <p className="text-sm text-white/50 mt-1">Manage brand connections and API credentials</p>
          </div>
          <CreateApiKeyModal />
        </div>

        {/* Stats Row */}
        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 border-gradient"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-xs font-medium text-white/40 uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <p className="font-bricolage text-2xl font-semibold tracking-tight text-white">
                    {stat.value}
                  </p>
                </div>
                <div className="flex size-10 items-center justify-center rounded-xl bg-white/[0.06] text-white/40">
                  <stat.icon className="size-5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Brands Table */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden border-gradient">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-white/[0.06] hover:bg-transparent">
                  <TableHead className="text-[11px] font-medium uppercase tracking-wider text-white/40">
                    Brand Name
                  </TableHead>
                  <TableHead className="text-[11px] font-medium uppercase tracking-wider text-white/40">
                    Parent Affiliate
                  </TableHead>
                  <TableHead className="text-[11px] font-medium uppercase tracking-wider text-white/40">
                    API Key
                  </TableHead>
                  <TableHead className="text-[11px] font-medium uppercase tracking-wider text-white/40">
                    Status
                  </TableHead>
                  <TableHead className="text-[11px] font-medium uppercase tracking-wider text-white/40">
                    Last Connected
                  </TableHead>
                  <TableHead className="text-[11px] font-medium uppercase tracking-wider text-white/40 text-right">
                    Orders
                  </TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {brands.map((brand) => (
                  <TableRow key={brand.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                    <TableCell className="font-medium text-white">{brand.name}</TableCell>
                    <TableCell className="text-white/50">
                      {brand.affiliate}
                    </TableCell>
                    <TableCell>
                      <MaskedApiKey apiKey={brand.apiKey} />
                    </TableCell>
                    <TableCell>
                      <StatusDot status={brand.status} />
                    </TableCell>
                    <TableCell className="text-white/40">
                      {brand.lastConnected}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="font-mono text-sm font-medium text-white">
                        {brand.orders.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="flex h-8 w-8 items-center justify-center rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors">
                            <MoreHorizontal className="size-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-[#0a0a14] border-white/10">
                          <DropdownMenuItem className="text-white/70 hover:text-white hover:bg-white/5">
                            <Eye className="mr-2 size-4" />
                            View details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-white/70 hover:text-white hover:bg-white/5">
                            <RefreshCw className="mr-2 size-4" />
                            Regenerate key
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-white/10" />
                          <DropdownMenuItem className="text-coral hover:text-coral hover:bg-coral/10">
                            <Trash2 className="mr-2 size-4" />
                            Revoke access
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}
