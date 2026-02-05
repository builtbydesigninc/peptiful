"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Wallet, 
  LogOut, 
  ShoppingBag, 
  Tag, 
  Menu,
  X,
  Settings,
  Bell,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/promoter", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/promoter/orders", icon: ShoppingBag, label: "Orders" },
  { href: "/promoter/codes", icon: Tag, label: "My Codes" },
  { href: "/promoter/payouts", icon: Wallet, label: "Payouts" },
]

const promoterInfo = {
  name: "Ashton Hall",
  brand: "House of Aminos",
  avatar: "AH",
}

export default function PromoterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-[#050510]">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 flex flex-col",
          "bg-gradient-to-b from-[#0d1025] via-[#0a0a18] to-[#080812] border-r border-white/[0.06]",
          "transform transition-transform duration-200 ease-in-out lg:transform-none lg:static lg:shrink-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Subtle glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-40 bg-[radial-gradient(ellipse_at_center,rgba(235,92,106,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-[radial-gradient(ellipse_at_bottom,rgba(235,92,106,0.05)_0%,transparent_70%)] pointer-events-none" />

        {/* Header */}
        <div className="relative p-5 border-b border-white/[0.06]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-coral/20 rounded-xl blur-xl scale-150" />
                <div className="relative flex items-center justify-center size-10 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10">
                  <img 
                    src="/logos/Logomark white.svg" 
                    alt="Peptiful" 
                    className="h-6 w-6"
                  />
                </div>
              </div>
              <div>
                <span className="font-bricolage text-lg font-semibold text-white">Peptiful</span>
                <p className="text-[11px] text-white/40 uppercase tracking-wider">Promoter Portal</p>
              </div>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        {/* Promoter Info */}
        <div className="relative p-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-coral/10 to-pink-500/5 border border-coral/20">
            <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-coral to-pink-500 text-white font-semibold text-sm shadow-lg shadow-coral/20">
              {promoterInfo.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-white truncate">{promoterInfo.name}</p>
              <p className="text-xs text-white/40 truncate">{promoterInfo.brand}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="relative flex-1 p-4 space-y-1 overflow-y-auto scrollbar-dark">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-coral/30 to-pink-500/20 text-white shadow-lg shadow-coral/10 ring-1 ring-coral/20"
                    : "text-white/60 hover:bg-white/[0.06] hover:text-white"
                )}
              >
                <item.icon className={cn(
                  "size-[18px] transition-colors",
                  isActive ? "text-coral" : "text-white/40 group-hover:text-white/70"
                )} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Bottom Section */}
        <div className="relative p-4 border-t border-white/[0.06] space-y-2">
          <button className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/50 hover:bg-white/[0.06] hover:text-white transition-all">
            <Settings className="size-[18px]" />
            Settings
          </button>
          <button className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/50 hover:bg-coral/10 hover:text-coral transition-all">
            <LogOut className="size-[18px]" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="shrink-0 bg-[#0a0a14]/80 backdrop-blur-xl border-b border-white/[0.06]">
          <div className="flex items-center justify-between px-4 sm:px-6 h-16">
            {/* Left: Mobile Menu + Page Title */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-all"
              >
                <Menu className="size-5" />
              </button>
              <div className="hidden sm:block">
                <p className="text-sm text-white/40">Welcome back,</p>
                <p className="font-bricolage font-semibold text-white">{promoterInfo.name}</p>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-all">
                <Bell className="size-5" />
                <span className="absolute top-1 right-1 size-2 rounded-full bg-coral" />
              </button>
              <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-white/10">
                <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-coral to-pink-500 text-white font-semibold text-xs">
                  {promoterInfo.avatar}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto scrollbar-dark">
          {children}
        </main>
      </div>
    </div>
  )
}
