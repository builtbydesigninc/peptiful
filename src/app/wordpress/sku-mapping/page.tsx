"use client"

import { useState } from "react"
import Image from "next/image"
import {
  RefreshCw,
  Plus,
  Search,
  MoreHorizontal,
  CheckCircle,
  AlertCircle,
  Link2,
  Unlink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { Label } from "@/components/ui/label"
import { SearchSelect } from "@/components/ui/search-select"

const products = [
  {
    id: 1,
    name: "BPC-157 10mg",
    image: "/placeholder-product.jpg",
    localSku: "PS-BPC157-10",
    hubSku: "HUB-BPC157-10MG",
    mapped: true,
    stock: 125,
    lastSynced: "2 min ago",
  },
  {
    id: 2,
    name: "TB-500 5mg",
    image: "/placeholder-product.jpg",
    localSku: "PS-TB500-5",
    hubSku: "HUB-TB500-5MG",
    mapped: true,
    stock: 89,
    lastSynced: "2 min ago",
  },
  {
    id: 3,
    name: "Ipamorelin 5mg",
    image: "/placeholder-product.jpg",
    localSku: "PS-IPAM-5",
    hubSku: null,
    mapped: false,
    stock: 0,
    lastSynced: "Never",
  },
  {
    id: 4,
    name: "CJC-1295 2mg",
    image: "/placeholder-product.jpg",
    localSku: "PS-CJC1295-2",
    hubSku: "HUB-CJC1295-2MG",
    mapped: true,
    stock: 45,
    lastSynced: "5 min ago",
  },
  {
    id: 5,
    name: "GHRP-6 5mg",
    image: "/placeholder-product.jpg",
    localSku: "PS-GHRP6-5",
    hubSku: null,
    mapped: false,
    stock: 0,
    lastSynced: "Never",
  },
  {
    id: 6,
    name: "Semaglutide 5mg",
    image: "/placeholder-product.jpg",
    localSku: "PS-SEMA-5",
    hubSku: "HUB-SEMA-5MG",
    mapped: true,
    stock: 32,
    lastSynced: "8 min ago",
  },
]

const hubSkuOptions = [
  { value: "HUB-BPC157-10MG", label: "HUB-BPC157-10MG", description: "BPC-157 10mg" },
  { value: "HUB-TB500-5MG", label: "HUB-TB500-5MG", description: "TB-500 5mg" },
  { value: "HUB-IPAM-5MG", label: "HUB-IPAM-5MG", description: "Ipamorelin 5mg" },
  { value: "HUB-CJC1295-2MG", label: "HUB-CJC1295-2MG", description: "CJC-1295 2mg" },
  { value: "HUB-GHRP6-5MG", label: "HUB-GHRP6-5MG", description: "GHRP-6 5mg" },
  { value: "HUB-SEMA-5MG", label: "HUB-SEMA-5MG", description: "Semaglutide 5mg" },
]

const mappedCount = products.filter((p) => p.mapped).length
const unmappedCount = products.filter((p) => !p.mapped).length

export default function SkuMappingPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = searchQuery
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.localSku.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Link2 className="size-5 text-navy" />
            <span className="text-lg font-semibold text-[#1d2327]">
              {mappedCount} mapped
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Unlink className="size-5 text-coral" />
            <span className="text-lg font-semibold text-coral">
              {unmappedCount} unmapped
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Modal>
            <ModalTrigger asChild>
              <Button variant="outline">
                <Plus className="size-4" />
                Add Mapping
              </Button>
            </ModalTrigger>
            <ModalContent>
              <ModalHeader>
                <ModalTitle>Add SKU Mapping</ModalTitle>
                <ModalDescription>
                  Map a local product SKU to a Hub SKU
                </ModalDescription>
              </ModalHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Local Product</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                    <SelectContent>
                      {products
                        .filter((p) => !p.mapped)
                        .map((p) => (
                          <SelectItem key={p.id} value={p.localSku}>
                            {p.name} ({p.localSku})
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Hub SKU</Label>
                  <SearchSelect
                    options={hubSkuOptions}
                    placeholder="Search Hub SKUs..."
                    searchPlaceholder="Type to search..."
                  />
                </div>
              </div>
              <ModalFooter>
                <Button variant="outline">Cancel</Button>
                <Button variant="accent">Save Mapping</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Button className="bg-navy hover:bg-navy/90">
            <RefreshCw className="size-4" />
            Sync All
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#646970]" />
        <Input
          placeholder="Search products or SKUs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 border-[#8c8f94]"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded border border-[#c3c4c7] shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[#f6f7f7] border-b border-[#c3c4c7]">
              <th className="px-4 py-3 text-left text-sm font-semibold text-[#1d2327]">
                Product
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-[#1d2327]">
                Local SKU
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-[#1d2327]">
                Hub SKU
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-[#1d2327]">
                Stock
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-[#1d2327]">
                Last Synced
              </th>
              <th className="px-4 py-3 w-[50px]"></th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr
                key={product.id}
                className="border-b border-[#c3c4c7] last:border-0 hover:bg-[#f6f7f7]"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="size-10 bg-[#f0f0f1] rounded flex items-center justify-center text-[#646970]">
                      <span className="text-xs font-medium">IMG</span>
                    </div>
                    <div>
                      <p className="font-medium text-[#1d2327]">{product.name}</p>
                      {product.mapped ? (
                        <span className="flex items-center gap-1 text-xs text-navy">
                          <CheckCircle className="size-3" />
                          Mapped
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs text-coral">
                          <AlertCircle className="size-3" />
                          Unmapped
                        </span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <code className="text-sm font-mono bg-[#f0f0f1] px-2 py-0.5 rounded">
                    {product.localSku}
                  </code>
                </td>
                <td className="px-4 py-3">
                  {product.hubSku ? (
                    <code className="text-sm font-mono text-navy bg-lavender px-2 py-0.5 rounded">
                      {product.hubSku}
                    </code>
                  ) : (
                    <Select>
                      <SelectTrigger className="w-48 h-8 text-sm border-coral text-coral">
                        <SelectValue placeholder="Select Hub SKU" />
                      </SelectTrigger>
                      <SelectContent>
                        {hubSkuOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`font-semibold ${
                      product.stock === 0 ? "text-coral" : "text-[#1d2327]"
                    }`}
                  >
                    {product.stock}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-[#646970]">
                  {product.lastSynced}
                </td>
                <td className="px-4 py-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon-xs">
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Sync Now</DropdownMenuItem>
                      <DropdownMenuItem>Edit Mapping</DropdownMenuItem>
                      <DropdownMenuItem className="text-coral">
                        Remove Mapping
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
