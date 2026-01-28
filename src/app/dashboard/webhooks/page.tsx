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
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
import { PageHeader } from "@/components/ui/page-header"

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

function getStatusBadge(status: string) {
  switch (status) {
    case "active":
      return <Badge variant="active">Active</Badge>
    case "error":
      return <Badge variant="failed">Error</Badge>
    case "paused":
      return <Badge variant="muted">Paused</Badge>
    default:
      return <Badge variant="muted">{status}</Badge>
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
        <Button variant="accent">
          <Plus className="size-4" />
          Create Webhook
        </Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Create Webhook</ModalTitle>
          <ModalDescription>
            Set up a new webhook endpoint to receive events.
          </ModalDescription>
        </ModalHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="wh-name">Webhook Name</Label>
            <Input
              id="wh-name"
              placeholder="e.g., Peptide Sciences - Orders"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="wh-url">Endpoint URL</Label>
            <Input
              id="wh-url"
              type="url"
              placeholder="https://example.com/webhook"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="wh-brand">Brand</Label>
            <Select value={brand} onValueChange={setBrand}>
              <SelectTrigger id="wh-brand">
                <SelectValue placeholder="Select a brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="peptide-sciences">Peptide Sciences</SelectItem>
                <SelectItem value="core-peptides">Core Peptides</SelectItem>
                <SelectItem value="amino-asylum">Amino Asylum</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="wh-event">Event Type</Label>
            <Select value={event} onValueChange={setEvent}>
              <SelectTrigger id="wh-event">
                <SelectValue placeholder="Select an event" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="order.created">order.created</SelectItem>
                <SelectItem value="order.updated">order.updated</SelectItem>
                <SelectItem value="fulfillment.updated">fulfillment.updated</SelectItem>
                <SelectItem value="tracking.added">tracking.added</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <ModalFooter>
          <Button variant="outline" onClick={handleReset}>
            Cancel
          </Button>
          <Button
            variant="accent"
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
    <div className="p-8 space-y-6">
      <PageHeader
        title="Webhooks"
        description="Manage webhook endpoints and monitor delivery status"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Webhooks" },
        ]}
        actions={<CreateWebhookModal />}
      />

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-white">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Webhooks</p>
                <p className="text-2xl font-bold text-dark-navy">4</p>
              </div>
              <div className="flex size-10 items-center justify-center rounded-lg bg-lavender text-navy">
                <Activity className="size-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-navy">3</p>
              </div>
              <div className="flex size-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
                <CheckCircle className="size-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Errors</p>
                <p className="text-2xl font-bold text-coral">1</p>
              </div>
              <div className="flex size-10 items-center justify-center rounded-lg bg-coral/10 text-coral">
                <XCircle className="size-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Response</p>
                <p className="text-2xl font-bold text-dark-navy">117ms</p>
              </div>
              <div className="flex size-10 items-center justify-center rounded-lg bg-lavender text-navy">
                <Clock className="size-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Webhooks Table */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-lg">Webhook Endpoints</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Brand</TableHead>
                <TableHead className="font-semibold">Event</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Success Rate</TableHead>
                <TableHead className="font-semibold">Last Triggered</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {webhooks.map((webhook) => (
                <TableRow key={webhook.id}>
                  <TableCell>
                    <div>
                      <p className="font-semibold">{webhook.name}</p>
                      <p className="text-xs text-muted-foreground font-mono truncate max-w-[200px]">
                        {webhook.url}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {webhook.brand}
                  </TableCell>
                  <TableCell>
                    <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                      {webhook.event}
                    </code>
                  </TableCell>
                  <TableCell>{getStatusBadge(webhook.status)}</TableCell>
                  <TableCell>
                    <span
                      className={`font-medium ${
                        webhook.successRate >= 99
                          ? "text-green-600"
                          : webhook.successRate >= 95
                          ? "text-yellow-600"
                          : "text-coral"
                      }`}
                    >
                      {webhook.successRate}%
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {webhook.lastTriggered}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-xs">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <ExternalLink className="mr-2 size-4" />
                          View logs
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 size-4" />
                          Edit webhook
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <RefreshCw className="mr-2 size-4" />
                          Test webhook
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-coral">
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
        </CardContent>
      </Card>

      {/* Recent Logs */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-lg">Recent Delivery Logs</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="font-semibold">Webhook</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Duration</TableHead>
                <TableHead className="font-semibold">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.webhook}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {log.status === "success" ? (
                        <CheckCircle className="size-4 text-green-600" />
                      ) : (
                        <XCircle className="size-4 text-coral" />
                      )}
                      <span
                        className={`text-sm font-medium capitalize ${
                          log.status === "success" ? "text-green-600" : "text-coral"
                        }`}
                      >
                        {log.status}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">
                    {log.duration}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {log.timestamp}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
