"use client"

import { useState } from "react"
import {
  RefreshCw,
  Plus,
  Search,
  MoreHorizontal,
  CheckCircle,
  AlertCircle,
  Link2,
  Unlink,
  X,
} from "lucide-react"

const products = [
  {
    id: 1,
    name: "BPC-157 10mg",
    localSku: "PS-BPC157-10",
    hubSku: "HUB-BPC157-10MG",
    mapped: true,
    stock: 125,
    lastSynced: "2 min ago",
  },
  {
    id: 2,
    name: "TB-500 5mg",
    localSku: "PS-TB500-5",
    hubSku: "HUB-TB500-5MG",
    mapped: true,
    stock: 89,
    lastSynced: "2 min ago",
  },
  {
    id: 3,
    name: "Ipamorelin 5mg",
    localSku: "PS-IPAM-5",
    hubSku: null,
    mapped: false,
    stock: 0,
    lastSynced: "Never",
  },
  {
    id: 4,
    name: "CJC-1295 2mg",
    localSku: "PS-CJC1295-2",
    hubSku: "HUB-CJC1295-2MG",
    mapped: true,
    stock: 45,
    lastSynced: "5 min ago",
  },
  {
    id: 5,
    name: "GHRP-6 5mg",
    localSku: "PS-GHRP6-5",
    hubSku: null,
    mapped: false,
    stock: 0,
    lastSynced: "Never",
  },
  {
    id: 6,
    name: "Semaglutide 5mg",
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
  const [showAddModal, setShowAddModal] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)

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
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center size-8 rounded-lg bg-emerald-500/10">
              <Link2 className="size-4 text-emerald-400" />
            </div>
            <span className="text-lg font-semibold text-white">
              {mappedCount} mapped
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center size-8 rounded-lg bg-coral/10">
              <Unlink className="size-4 text-coral" />
            </div>
            <span className="text-lg font-semibold text-coral">
              {unmappedCount} unmapped
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-all"
          >
            <Plus className="size-4" />
            Add Mapping
          </button>
          <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet-500/20 hover:shadow-xl hover:shadow-violet-500/30 transition-all">
            <RefreshCw className="size-4" />
            Sync All
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-white/40" />
        <input
          placeholder="Search products or SKUs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/5 pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
        />
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden border-gradient">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-white/40">
                  Product
                </th>
                <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-white/40">
                  Local SKU
                </th>
                <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-white/40">
                  Hub SKU
                </th>
                <th className="px-5 py-3 text-center text-[11px] font-medium uppercase tracking-wider text-white/40">
                  Stock
                </th>
                <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-white/40">
                  Last Synced
                </th>
                <th className="px-5 py-3 w-[50px]"></th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 bg-white/5 rounded-lg flex items-center justify-center text-white/30 border border-white/10">
                        <span className="text-xs font-medium">IMG</span>
                      </div>
                      <div>
                        <p className="font-medium text-white">{product.name}</p>
                        {product.mapped ? (
                          <span className="flex items-center gap-1 text-xs text-emerald-400">
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
                  <td className="px-5 py-4">
                    <code className="text-sm font-mono bg-white/5 border border-white/10 px-2 py-1 rounded-lg text-white/70">
                      {product.localSku}
                    </code>
                  </td>
                  <td className="px-5 py-4">
                    {product.hubSku ? (
                      <code className="text-sm font-mono text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2 py-1 rounded-lg">
                        {product.hubSku}
                      </code>
                    ) : (
                      <select className="rounded-lg border border-coral/30 bg-coral/5 px-3 py-1.5 text-sm text-coral focus:outline-none focus:ring-2 focus:ring-coral/50 cursor-pointer">
                        <option value="" className="bg-[#0a0a14] text-white">Select Hub SKU</option>
                        {hubSkuOptions.map((opt) => (
                          <option key={opt.value} value={opt.value} className="bg-[#0a0a14] text-white">
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    )}
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span
                      className={`font-semibold ${
                        product.stock === 0 ? "text-coral" : "text-white"
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-white/50">
                    {product.lastSynced}
                  </td>
                  <td className="px-5 py-4">
                    <div className="relative">
                      <button
                        onClick={() => setOpenDropdown(openDropdown === product.id ? null : product.id)}
                        className="flex items-center justify-center size-8 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-all"
                      >
                        <MoreHorizontal className="size-4" />
                      </button>
                      {openDropdown === product.id && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setOpenDropdown(null)} />
                          <div className="absolute right-0 top-full mt-1 z-20 w-40 rounded-xl border border-white/10 bg-[#0a0a14] shadow-xl py-1">
                            <button className="w-full px-4 py-2 text-left text-sm text-white hover:bg-white/5 transition-colors">
                              Sync Now
                            </button>
                            <button className="w-full px-4 py-2 text-left text-sm text-white hover:bg-white/5 transition-colors">
                              Edit Mapping
                            </button>
                            <button className="w-full px-4 py-2 text-left text-sm text-coral hover:bg-coral/10 transition-colors">
                              Remove Mapping
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Mapping Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="relative w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#0a0a14] p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white">Add SKU Mapping</h3>
                <p className="text-sm text-white/50">Map a local product SKU to a Hub SKU</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex items-center justify-center size-8 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-all"
              >
                <X className="size-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/70">Local Product</label>
                <select className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 cursor-pointer">
                  <option value="" className="bg-[#0a0a14]">Select a product</option>
                  {products
                    .filter((p) => !p.mapped)
                    .map((p) => (
                      <option key={p.id} value={p.localSku} className="bg-[#0a0a14]">
                        {p.name} ({p.localSku})
                      </option>
                    ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/70">Hub SKU</label>
                <select className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 cursor-pointer">
                  <option value="" className="bg-[#0a0a14]">Search Hub SKUs...</option>
                  {hubSkuOptions.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-[#0a0a14]">
                      {opt.label} - {opt.description}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-white/[0.06]">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2.5 text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button className="rounded-xl bg-gradient-to-r from-coral to-pink-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-coral/20 hover:shadow-xl hover:shadow-coral/30 transition-all">
                Save Mapping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
