"use client"

import {
  ExternalLink,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  MoreHorizontal,
  Plus,
} from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const brands = [
  {
    id: 1,
    name: "Peptide Sciences",
    url: "peptidesciences.com",
    status: "connected",
    earnings: "$89,234.50",
    orders: 892,
    conversionRate: "3.2%",
    lastSync: "2 min ago",
  },
  {
    id: 2,
    name: "Core Peptides",
    url: "corepeptides.com",
    status: "connected",
    earnings: "$38,456.20",
    orders: 456,
    conversionRate: "2.8%",
    lastSync: "5 min ago",
  },
  {
    id: 3,
    name: "Research Peptides",
    url: "researchpeptides.co",
    status: "connected",
    earnings: "$15,156.80",
    orders: 178,
    conversionRate: "2.1%",
    lastSync: "12 min ago",
  },
  {
    id: 4,
    name: "Premium Peptides Co",
    url: "premiumpeptides.com",
    status: "pending",
    earnings: "$0.00",
    orders: 0,
    conversionRate: "—",
    lastSync: "Never",
  },
]

function StatusDot({ status }: { status: string }) {
  return (
    <span className="flex items-center gap-2">
      <span
        className={`size-2 rounded-full ${
          status === "connected" ? "bg-green-500" : "bg-yellow-500"
        }`}
      />
      <span className="text-sm capitalize">{status}</span>
    </span>
  )
}

export default function AffiliateBrandsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-dark-navy">My Brands</h2>
          <p className="text-sm sm:text-base text-muted-foreground">Manage your connected brand stores</p>
        </div>
        <Button variant="accent" className="w-full sm:w-auto">
          <Plus className="size-4" />
          Add Brand
        </Button>
      </div>

      {/* Brand Cards */}
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        {brands.map((brand) => (
          <Card key={brand.id} className="bg-white border-border/50 overflow-hidden">
            <CardContent className="p-0">
              {/* Header */}
              <div className="p-4 sm:p-5 border-b border-border/50">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-dark-navy truncate">{brand.name}</h3>
                    <a
                      href={`https://${brand.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm text-navy hover:underline flex items-center gap-1 mt-1"
                    >
                      <span className="truncate">{brand.url}</span>
                      <ExternalLink className="size-3 shrink-0" />
                    </a>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                    <StatusDot status={brand.status} />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Analytics</DropdownMenuItem>
                        <DropdownMenuItem>Edit Settings</DropdownMenuItem>
                        <DropdownMenuItem className="text-coral">Disconnect</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 divide-x divide-border/50">
                <div className="p-2 sm:p-4 text-center">
                  <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                    <DollarSign className="size-3 sm:size-4" />
                    <span className="text-[10px] sm:text-xs">Earnings</span>
                  </div>
                  <p className="text-sm sm:text-lg font-bold text-dark-navy truncate px-1">{brand.earnings}</p>
                </div>
                <div className="p-2 sm:p-4 text-center">
                  <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                    <ShoppingBag className="size-3 sm:size-4" />
                    <span className="text-[10px] sm:text-xs">Orders</span>
                  </div>
                  <p className="text-sm sm:text-lg font-bold text-dark-navy">{brand.orders}</p>
                </div>
                <div className="p-2 sm:p-4 text-center">
                  <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                    <TrendingUp className="size-3 sm:size-4" />
                    <span className="text-[10px] sm:text-xs">Conv.</span>
                  </div>
                  <p className="text-sm sm:text-lg font-bold text-dark-navy">{brand.conversionRate}</p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-3 sm:p-4 bg-lavender/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <span className="text-xs text-muted-foreground">
                  Last synced: {brand.lastSync}
                </span>
                <Button variant="secondary" size="sm" className="w-full sm:w-auto">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
