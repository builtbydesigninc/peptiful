"use client"

import { useState } from "react"
import {
  Plus,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  Trash2,
  Edit,
  ExternalLink,
  Activity,
  Webhook,
  Zap,
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

const webhooks = [
  {
    id: 1,
    name: "Peptide Sciences - Orders",
    url: "https://peptiful.com/webhooks/ps-orders",
    brand: "Peptide Sciences",
    event: "order.created",
    status: "active",
    lastTriggered: "2 min ago",
    successRate: 99.8,
  },
  {
    id: 2,
    name: "Core Peptides - Orders",
    url: "https://peptiful.com/webhooks/cp-orders",
    brand: "Core Peptides",
    event: "order.created",
    status: "active",
    lastTriggered: "5 min ago",
    successRate: 100,
  },
  {
    id: 3,
    name: "Amino Asylum - Orders",
    url: "https://peptiful.com/webhooks/aa-orders",
    brand: "Amino Asylum",
    event: "order.created",
    status: "error",
    lastTriggered: "1 hour ago",
    successRate: 87.5,
  },
  {
    id: 4,
    name: "PS - Fulfillment Updates",
    url: "https://peptiful.com/webhooks/ps-fulfillment",
    brand: "Peptide Sciences",
    event: "fulfillment.updated",
    status: "active",
    lastTriggered: "15 min ago",
    successRate: 98.2,
  },
]

const recentLogs = [
  { id: 1, webhook: "Peptide Sciences - Orders", status: "success", timestamp: "2 min ago", duration: "124ms" },
  { id: 2, webhook: "Core Peptides - Orders", status: "success", timestamp: "5 min ago", duration: "89ms" },
  { id: 3, webhook: "Amino Asylum - Orders", status: "failed", timestamp: "1 hour ago", duration: "5012ms" },
  { id: 4, webhook: "PS - Fulfillment Updates", status: "success", timestamp: "15 min ago", duration: "156ms" },
  { id: 5, webhook: "Peptide Sciences - Orders", status: "success", timestamp: "18 min ago", duration: "98ms" },
]

const stats = [
  { label: "Total Webhooks", value: "4", icon: Webhook },
  { label: "Active", value: "3", icon: CheckCircle, color: "emerald" },
  { label: "Errors", value: "1", icon: XCircle, color: "rose" },
  { label: "Avg Response", value: "117ms", icon: Zap },
]

function getStatusBadge(status: string) {
  switch (status) {
    case "active":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Active
        </span>
      )
    case "error":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 px-2.5 py-1 text-xs font-medium text-rose-400 ring-1 ring-inset ring-rose-500/20">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
          Error
        </span>
      )
    case "paused":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-xs font-medium text-white/50 ring-1 ring-inset ring-white/10">
          <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
          Paused
        </span>
      )
    default:
      return (
        <span className="inline-flex items-center rounded-full bg-white/5 px-2.5 py-1 text-xs font-medium text-white/50 ring-1 ring-inset ring-white/10">
          {status}
        </span>
      )
  }
}

function CreateWebhookModal() {
  const [name, setName] = useState("")
  const [url, setUrl] = useState("")
  const [brand, setBrand] = useState("")
  const [event, setEvent] = useState("")

  const handleReset = () => {
    setName("")
    setUrl("")
    setBrand("")
    setEvent("")
  }

  return (
    <Modal onOpenChange={(open) => !open && handleReset()}>
      <ModalTrigger asChild>
        <Button className="bg-coral hover:bg-coral/90 text-white border-0">
          <Plus className="size-4" />
          Create Webhook
        </Button>
      </ModalTrigger>
      <ModalContent className="bg-[#0a0a14] border-white/10">
        <ModalHeader>
          <ModalTitle className="text-white">Create Webhook</ModalTitle>
          <ModalDescription className="text-white/50">
            Set up a new webhook endpoint to receive events.
          </ModalDescription>
        </ModalHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="wh-name" className="text-white/70">Webhook Name</Label>
            <Input
              id="wh-name"
              placeholder="e.g., Peptide Sciences - Orders"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="wh-url" className="text-white/70">Endpoint URL</Label>
            <Input
              id="wh-url"
              type="url"
              placeholder="https://example.com/webhook"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="wh-brand" className="text-white/70">Brand</Label>
            <Select value={brand} onValueChange={setBrand}>
              <SelectTrigger id="wh-brand" className="bg-white/5 border-white/10 text-white">
                <SelectValue placeholder="Select a brand" />
              </SelectTrigger>
              <SelectContent className="bg-[#0a0a14] border-white/10">
                <SelectItem value="peptide-sciences" className="text-white/70 hover:text-white hover:bg-white/5">Peptide Sciences</SelectItem>
                <SelectItem value="core-peptides" className="text-white/70 hover:text-white hover:bg-white/5">Core Peptides</SelectItem>
                <SelectItem value="amino-asylum" className="text-white/70 hover:text-white hover:bg-white/5">Amino Asylum</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="wh-event" className="text-white/70">Event Type</Label>
            <Select value={event} onValueChange={setEvent}>
              <SelectTrigger id="wh-event" className="bg-white/5 border-white/10 text-white">
                <SelectValue placeholder="Select an event" />
              </SelectTrigger>
              <SelectContent className="bg-[#0a0a14] border-white/10">
                <SelectItem value="order.created" className="text-white/70 hover:text-white hover:bg-white/5">order.created</SelectItem>
                <SelectItem value="order.updated" className="text-white/70 hover:text-white hover:bg-white/5">order.updated</SelectItem>
                <SelectItem value="fulfillment.updated" className="text-white/70 hover:text-white hover:bg-white/5">fulfillment.updated</SelectItem>
                <SelectItem value="tracking.added" className="text-white/70 hover:text-white hover:bg-white/5">tracking.added</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <ModalFooter>
          <button onClick={handleReset} className="rounded-xl border border-white/10 bg-transparent px-4 py-2 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all">
            Cancel
          </button>
          <Button
            className="bg-coral hover:bg-coral/90 text-white"
            disabled={!name || !url || !brand || !event}
          >
            Create Webhook
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default function WebhooksPage() {
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
              <span className="text-white/70">Webhooks</span>
            </div>
            <h1 className="font-bricolage text-2xl font-semibold tracking-tight text-white">Webhooks</h1>
            <p className="text-sm text-white/50 mt-1">Manage webhook endpoints and monitor delivery status</p>
          </div>
          <CreateWebhookModal />
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
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
                  <p className={`font-bricolage text-2xl font-semibold tracking-tight ${
                    stat.color === "emerald" ? "text-emerald-400" :
                    stat.color === "rose" ? "text-rose-400" : "text-white"
                  }`}>
                    {stat.value}
                  </p>
                </div>
                <div className={`flex size-10 items-center justify-center rounded-xl ${
                  stat.color === "emerald" ? "bg-emerald-500/10 text-emerald-400" :
                  stat.color === "rose" ? "bg-rose-500/10 text-rose-400" : "bg-white/[0.06] text-white/40"
                }`}>
                  <stat.icon className="size-5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Webhooks Table */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden border-gradient">
          <div className="px-6 py-4 border-b border-white/[0.06]">
            <h2 className="font-bricolage text-lg font-semibold text-white">Webhook Endpoints</h2>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-white/[0.06] hover:bg-transparent">
                  <TableHead className="text-[11px] font-medium uppercase tracking-wider text-white/40">
                    Name
                  </TableHead>
                  <TableHead className="text-[11px] font-medium uppercase tracking-wider text-white/40">
                    Brand
                  </TableHead>
                  <TableHead className="text-[11px] font-medium uppercase tracking-wider text-white/40">
                    Event
                  </TableHead>
                  <TableHead className="text-[11px] font-medium uppercase tracking-wider text-white/40">
                    Status
                  </TableHead>
                  <TableHead className="text-[11px] font-medium uppercase tracking-wider text-white/40">
                    Success Rate
                  </TableHead>
                  <TableHead className="text-[11px] font-medium uppercase tracking-wider text-white/40">
                    Last Triggered
                  </TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {webhooks.map((webhook) => (
                  <TableRow key={webhook.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                    <TableCell>
                      <div>
                        <p className="font-medium text-white">{webhook.name}</p>
                        <p className="text-xs text-white/40 font-mono truncate max-w-[200px]">
                          {webhook.url}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-white/50">
                      {webhook.brand}
                    </TableCell>
                    <TableCell>
                      <code className="text-xs bg-white/5 px-2 py-1 rounded-md text-white/60 font-mono">
                        {webhook.event}
                      </code>
                    </TableCell>
                    <TableCell>{getStatusBadge(webhook.status)}</TableCell>
                    <TableCell>
                      <span
                        className={`font-medium ${
                          webhook.successRate >= 99
                            ? "text-emerald-400"
                            : webhook.successRate >= 95
                            ? "text-amber-400"
                            : "text-rose-400"
                        }`}
                      >
                        {webhook.successRate}%
                      </span>
                    </TableCell>
                    <TableCell className="text-white/40">
                      {webhook.lastTriggered}
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
                            <ExternalLink className="mr-2 size-4" />
                            View logs
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-white/70 hover:text-white hover:bg-white/5">
                            <Edit className="mr-2 size-4" />
                            Edit webhook
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-white/70 hover:text-white hover:bg-white/5">
                            <RefreshCw className="mr-2 size-4" />
                            Test webhook
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-white/10" />
                          <DropdownMenuItem className="text-coral hover:text-coral hover:bg-coral/10">
                            <Trash2 className="mr-2 size-4" />
                            Delete
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

        {/* Recent Logs */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden border-gradient">
          <div className="px-6 py-4 border-b border-white/[0.06]">
            <h2 className="font-bricolage text-lg font-semibold text-white">Recent Delivery Logs</h2>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-white/[0.06] hover:bg-transparent">
                  <TableHead className="text-[11px] font-medium uppercase tracking-wider text-white/40">
                    Webhook
                  </TableHead>
                  <TableHead className="text-[11px] font-medium uppercase tracking-wider text-white/40">
                    Status
                  </TableHead>
                  <TableHead className="text-[11px] font-medium uppercase tracking-wider text-white/40">
                    Duration
                  </TableHead>
                  <TableHead className="text-[11px] font-medium uppercase tracking-wider text-white/40">
                    Time
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentLogs.map((log) => (
                  <TableRow key={log.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                    <TableCell className="font-medium text-white/90">{log.webhook}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {log.status === "success" ? (
                          <CheckCircle className="size-4 text-emerald-400" />
                        ) : (
                          <XCircle className="size-4 text-rose-400" />
                        )}
                        <span
                          className={`text-sm font-medium capitalize ${
                            log.status === "success" ? "text-emerald-400" : "text-rose-400"
                          }`}
                        >
                          {log.status}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm text-white/50">
                      {log.duration}
                    </TableCell>
                    <TableCell className="text-white/40">
                      {log.timestamp}
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
