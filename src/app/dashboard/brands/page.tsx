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
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
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

function MaskedApiKey({ apiKey }: { apiKey: string }) {
  const [visible, setVisible] = useState(false)
  const masked = `${apiKey.slice(0, 8)}${"•".repeat(16)}${apiKey.slice(-4)}`

  return (
    <div className="flex items-center gap-2">
      <code className="font-mono text-sm text-muted-foreground">
        {visible ? apiKey : masked}
      </code>
      <Button
        variant="ghost"
        size="icon-xs"
        onClick={() => setVisible(!visible)}
        className="text-muted-foreground hover:text-foreground"
      >
        {visible ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
      </Button>
      <Button
        variant="ghost"
        size="icon-xs"
        onClick={() => navigator.clipboard.writeText(apiKey)}
        className="text-muted-foreground hover:text-foreground"
      >
        <Copy className="size-3.5" />
      </Button>
    </div>
  )
}

function StatusDot({ status }: { status: string }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`size-2 rounded-full ${
          status === "active" ? "bg-green-500" : "bg-red-500"
        }`}
      />
      <span className="text-sm capitalize">{status}</span>
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
        <Button variant="accent">
          <Plus className="size-4" />
          Create API Key
        </Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Create API Key</ModalTitle>
          <ModalDescription>
            Generate a new API key for a brand to connect to Peptiful Hub.
          </ModalDescription>
        </ModalHeader>

        {!isGenerated ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="brand-name">Brand Name</Label>
              <Input
                id="brand-name"
                placeholder="e.g., Peptide Sciences"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="affiliate">Parent Affiliate</Label>
              <Select value={affiliate} onValueChange={setAffiliate}>
                <SelectTrigger id="affiliate">
                  <SelectValue placeholder="Select an affiliate" />
                </SelectTrigger>
                <SelectContent>
                  {affiliates.map((aff) => (
                    <SelectItem key={aff.id} value={aff.name}>
                      {aff.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 rounded-lg bg-green-50 p-3 text-green-700">
              <CheckCircle className="size-5" />
              <span className="text-sm font-medium">API key generated successfully!</span>
            </div>
            <div className="space-y-2">
              <Label>Your API Key</Label>
              <div className="flex items-center gap-2 rounded-lg border bg-muted/30 p-3">
                <code className="flex-1 font-mono text-sm break-all">
                  {generatedKey}
                </code>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => navigator.clipboard.writeText(generatedKey)}
                >
                  <Copy className="size-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Make sure to copy this key now. You won&apos;t be able to see it again.
              </p>
            </div>
          </div>
        )}

        <ModalFooter>
          {!isGenerated ? (
            <>
              <Button variant="outline" onClick={handleReset}>
                Cancel
              </Button>
              <Button
                variant="accent"
                onClick={handleGenerate}
                disabled={!brandName || !affiliate}
              >
                Generate Key
              </Button>
            </>
          ) : (
            <Button variant="default" onClick={handleReset}>
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
    <div className="p-8 space-y-6">
      <PageHeader
        title="Brands & API Keys"
        description="Manage brand connections and API credentials"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Brands" },
        ]}
        actions={<CreateApiKeyModal />}
      />

      {/* Brands Table */}
      <Card className="bg-white">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="font-semibold">Brand Name</TableHead>
                <TableHead className="font-semibold">Parent Affiliate</TableHead>
                <TableHead className="font-semibold">API Key</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Last Connected</TableHead>
                <TableHead className="font-semibold text-right">Orders</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {brands.map((brand) => (
                <TableRow key={brand.id}>
                  <TableCell className="font-semibold">{brand.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {brand.affiliate}
                  </TableCell>
                  <TableCell>
                    <MaskedApiKey apiKey={brand.apiKey} />
                  </TableCell>
                  <TableCell>
                    <StatusDot status={brand.status} />
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {brand.lastConnected}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {brand.orders.toLocaleString()}
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
                          <Eye className="mr-2 size-4" />
                          View details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <RefreshCw className="mr-2 size-4" />
                          Regenerate key
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-coral">
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
        </CardContent>
      </Card>
    </div>
  )
}
