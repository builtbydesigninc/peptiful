"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Settings,
  Link2,
  RefreshCw,
  Package,
  Zap,
  ChevronRight,
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
    <div className="min-h-screen bg-[#050510]">
      {/* Top Bar */}
      <div className="h-12 bg-gradient-to-r from-[#0d1025] via-[#0a0a18] to-[#080812] border-b border-white/[0.06] flex items-center justify-between px-6">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-white/40">WordPress Admin</span>
          <ChevronRight className="size-3 text-white/20" />
          <span className="text-white font-medium">Peptiful Connect</span>
        </div>
        <Link href="/" className="text-xs text-white/40 hover:text-white/70 transition-colors">
          Exit to Platform
        </Link>
      </div>

      {/* Plugin Header */}
      <div className="bg-gradient-to-b from-[#0a0a18] to-[#050510] border-b border-white/[0.06] px-6 py-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="absolute inset-0 bg-violet-500/30 rounded-xl blur-xl scale-150" />
              <div className="relative flex items-center justify-center size-14 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/20">
                <Zap className="size-7 text-white" />
              </div>
            </div>
            <div>
              <h1 className="font-bricolage text-2xl font-bold text-white">Peptiful Connect</h1>
              <p className="text-sm text-white/50">WooCommerce Integration for Peptiful Hub</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-sm font-medium text-emerald-400">Connected</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex gap-1 mt-6 max-w-7xl mx-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-5 py-3 text-sm font-medium rounded-t-xl transition-all",
                  isActive
                    ? "bg-[#050510] text-white border-t border-l border-r border-white/[0.08]"
                    : "text-white/50 hover:text-white hover:bg-white/[0.03]"
                )}
              >
                <item.icon className={cn("size-4", isActive ? "text-violet-400" : "")} />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Content */}
      <div className="p-6 max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  )
}
