"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/logo"
import {
  Settings,
  Link2,
  RefreshCw,
  Package,
} from "lucide-react"

const navItems = [
  { href: "/wordpress", icon: Settings, label: "Settings" },
  { href: "/wordpress/sku-mapping", icon: Link2, label: "SKU Mapping" },
  { href: "/wordpress/sync-status", icon: RefreshCw, label: "Sync Status" },
  { href: "/wordpress/metabox-preview", icon: Package, label: "Metabox Preview" },
]

export default function WordPressLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-[#f0f0f1]">
      {/* WordPress Admin Bar Simulation */}
      <div className="h-8 bg-[#1d2327] text-white text-sm flex items-center px-4">
        <span className="text-[#c3c4c7]">WordPress Admin</span>
        <span className="mx-2 text-[#c3c4c7]">›</span>
        <span>Peptiful Connect</span>
      </div>

      {/* Plugin Header */}
      <div className="bg-white border-b border-[#c3c4c7] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo size="lg" variant="dark" />
            <div>
              <h1 className="text-2xl font-bold text-[#1d2327]">Peptiful Connect</h1>
              <p className="text-sm text-[#646970]">WooCommerce Integration for Peptiful Hub</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-sm font-medium bg-navy text-white">
              <span className="size-2 rounded-full bg-white animate-pulse" />
              Connected
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex gap-1 mt-4 -mb-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors",
                  isActive
                    ? "border-navy text-navy bg-[#f0f0f1]"
                    : "border-transparent text-[#646970] hover:text-[#1d2327] hover:bg-[#f6f7f7]"
                )}
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Content */}
      <div className="p-6">
        {children}
      </div>
    </div>
  )
}
