"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Building2,
  ShoppingBag,
  Users,
  Wallet,
  Settings,
  Bell,
  HelpCircle,
  Menu,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const navItems = [
  { href: "/affiliate", icon: LayoutDashboard, label: "Earnings" },
  { href: "/affiliate/brands", icon: Building2, label: "My Brands" },
  { href: "/affiliate/orders", icon: ShoppingBag, label: "Order History" },
  { href: "/affiliate/customers", icon: Users, label: "Customer Insights" },
  { href: "/affiliate/payouts", icon: Wallet, label: "Payouts" },
]

export default function AffiliateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-lavender">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 border-r border-border/50 bg-white flex flex-col transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between gap-3 px-5 border-b border-border/50">
          <div className="flex items-center gap-3">
            <Logo size="md" variant="dark" />
            <div className="min-w-0">
              <span className="font-bold text-dark-navy block truncate">Peptiful</span>
              <span className="text-xs text-muted-foreground block truncate">Affiliate Portal</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="size-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                  isActive
                    ? "bg-navy text-white"
                    : "text-muted-foreground hover:bg-lavender hover:text-navy"
                )}
              >
                <item.icon className="size-5 shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-border/50 space-y-1">
          <Link
            href="/affiliate/settings"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-lavender hover:text-navy transition-all"
          >
            <Settings className="size-5 shrink-0" />
            <span className="truncate">Settings</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-lavender hover:text-navy transition-all"
          >
            <HelpCircle className="size-5 shrink-0" />
            <span className="truncate">Help & Support</span>
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top Bar */}
        <header className="h-16 shrink-0 border-b border-border/50 bg-white px-4 sm:px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden shrink-0"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="size-5" />
            </Button>
            <div className="min-w-0">
              <p className="text-sm text-muted-foreground truncate">Good morning</p>
              <h1 className="text-lg font-semibold text-dark-navy truncate">Health Pro Shop</h1>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="size-5 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 size-2 bg-coral rounded-full" />
            </Button>
            <Avatar className="size-9">
              <AvatarImage src="/avatar.jpg" />
              <AvatarFallback className="bg-lavender text-navy text-sm font-semibold">HP</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}
