"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
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
  Tag,
  ChevronDown,
  Check,
  LogOut,
  Building,
  Loader2,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AffiliateProvider, useAffiliate } from "./context"

const navItems = [
  { href: "/affiliate", icon: LayoutDashboard, label: "Earnings" },
  { href: "/affiliate/brands", icon: Building2, label: "My Brands", affiliateOnly: true },
  { href: "/affiliate/orders", icon: ShoppingBag, label: "Order History" },
  { href: "/affiliate/customers", icon: Users, label: "Customer Insights" },
  { href: "/affiliate/discounts", icon: Tag, label: "Discounts" },
  { href: "/affiliate/payouts", icon: Wallet, label: "Payouts" },
]

function AffiliateLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, isLoading, logout, selectBrand, getSelectedBrand, getVisibleBrands } = useAffiliate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const isLoginPage = pathname === "/affiliate/login"

  // Redirect to login if not authenticated (except on login page)
  useEffect(() => {
    if (!isLoading && !user && !isLoginPage) {
      router.push("/affiliate/login")
    }
  }, [isLoading, user, isLoginPage, router])

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050510] flex items-center justify-center">
        <Loader2 className="size-8 animate-spin text-white/50" />
      </div>
    )
  }

  // Login page doesn't need the layout
  if (isLoginPage) {
    return <>{children}</>
  }

  // Not logged in - will redirect
  if (!user) {
    return (
      <div className="min-h-screen bg-[#050510] flex items-center justify-center">
        <Loader2 className="size-8 animate-spin text-white/50" />
      </div>
    )
  }

  const selectedBrand = getSelectedBrand()
  const visibleBrands = getVisibleBrands()
  const isAffiliate = user.role === "affiliate"
  const initials = user.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()

  // Filter nav items based on role
  const filteredNavItems = navItems.filter(item => {
    if (item.affiliateOnly && !isAffiliate) return false
    return true
  })

  const handleLogout = () => {
    logout()
    router.push("/affiliate/login")
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#050510]">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 flex flex-col transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0",
          "bg-gradient-to-b from-[#0d1025] via-[#0a0a18] to-[#080812] border-r border-white/[0.06]",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Subtle glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-40 bg-[radial-gradient(ellipse_at_center,rgba(10,69,145,0.2)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-[radial-gradient(ellipse_at_bottom,rgba(10,69,145,0.1)_0%,transparent_70%)] pointer-events-none" />

        {/* Logo */}
        <div className="relative h-16 flex items-center justify-between gap-3 px-5 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/20 rounded-xl blur-xl scale-150" />
              <div className="relative flex items-center justify-center size-10 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10">
                <img 
                  src="/logos/Logomark white.svg" 
                  alt="Peptiful" 
                  className="h-6 w-6"
                />
              </div>
            </div>
            <div className="min-w-0">
              <span className="font-bricolage text-lg font-semibold text-white block truncate">Peptiful</span>
              <span className="text-[10px] uppercase tracking-[0.15em] text-emerald-400/70 block truncate">
                {isAffiliate ? "Affiliate Portal" : "Brand Portal"}
              </span>
            </div>
          </div>
          <button
            className="lg:hidden flex items-center justify-center size-8 rounded-lg text-white/50 hover:bg-white/10 transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Brand Switcher (Affiliates only) */}
        {isAffiliate && (
          <div className="px-4 py-3 border-b border-white/[0.06]">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-full flex items-center justify-between gap-2 p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] transition-colors text-left">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-navy to-sky-600 text-white">
                      <Building className="size-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {selectedBrand ? selectedBrand.name : "All Brands"}
                      </p>
                      <p className="text-[10px] text-white/40">
                        {selectedBrand ? "Filtered view" : `${visibleBrands.length} brands`}
                      </p>
                    </div>
                  </div>
                  <ChevronDown className="size-4 text-white/40 shrink-0" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 bg-[#0a0a14] border-white/10">
                <DropdownMenuItem
                  onClick={() => selectBrand(null)}
                  className="flex items-center justify-between text-white/70 hover:text-white hover:bg-white/5"
                >
                  <span>All Brands</span>
                  {!selectedBrand && <Check className="size-4 text-emerald-400" />}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                {visibleBrands.map((brand) => (
                  <DropdownMenuItem
                    key={brand.id}
                    onClick={() => selectBrand(brand.id)}
                    className="flex items-center justify-between text-white/70 hover:text-white hover:bg-white/5"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "size-2 rounded-full",
                          brand.status === "connected" ? "bg-emerald-400" : "bg-white/30"
                        )}
                      />
                      <span>{brand.name}</span>
                    </div>
                    {selectedBrand?.id === brand.id && <Check className="size-4 text-emerald-400" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {/* Brand Header (Brand users only) */}
        {!isAffiliate && (
          <div className="px-4 py-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-gradient-to-r from-coral/10 to-transparent border border-coral/20">
              <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-coral to-rose-500 text-white">
                <Building className="size-4" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-white truncate">{user.name}</p>
                <p className="text-[10px] text-white/40 truncate">
                  {visibleBrands[0]?.storeUrl || "Brand account"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-dark">
          <div className="mb-2 px-3">
            <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/30">
              Main
            </span>
          </div>
          {filteredNavItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-navy/80 to-navy/50 text-white shadow-lg shadow-navy/20 ring-1 ring-navy/30"
                    : "text-white/60 hover:bg-white/[0.06] hover:text-white"
                )}
              >
                <item.icon className={cn(
                  "size-[18px] transition-colors",
                  isActive ? "text-sky-300" : "text-white/40 group-hover:text-white/70"
                )} />
                <span className="truncate">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Quick Actions */}
        <div className="px-3 py-2 border-t border-white/[0.06]">
          <Link
            href="/affiliate/settings"
            onClick={() => setSidebarOpen(false)}
            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/60 hover:bg-white/[0.06] hover:text-white transition-all"
          >
            <Settings className="size-[18px] text-white/40 group-hover:text-white/70" />
            <span className="truncate">Settings</span>
          </Link>
          <Link
            href="#"
            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/60 hover:bg-white/[0.06] hover:text-white transition-all"
          >
            <HelpCircle className="size-[18px] text-white/40 group-hover:text-white/70" />
            <span className="truncate">Help & Support</span>
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top Bar */}
        <header className="h-16 shrink-0 border-b border-white/[0.06] bg-[#0a0a14]/80 backdrop-blur-xl px-4 sm:px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              className="lg:hidden flex items-center justify-center size-9 rounded-lg text-white/50 hover:bg-white/10 transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="size-5" />
            </button>
            <div className="min-w-0">
              <p className="text-xs text-white/40 truncate">
                {isAffiliate ? "Affiliate Account" : "Brand Account"}
              </p>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-semibold text-white truncate">{user.name}</h1>
                <span className={cn(
                  "hidden sm:inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ring-inset",
                  isAffiliate 
                    ? "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20"
                    : "bg-amber-500/10 text-amber-400 ring-amber-500/20"
                )}>
                  {isAffiliate ? `${visibleBrands.length} Brands` : "Single Brand"}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button className="relative flex items-center justify-center size-9 rounded-lg text-white/50 hover:bg-white/10 transition-colors">
              <Bell className="size-5" />
              <span className="absolute top-1.5 right-1.5 size-2 bg-coral rounded-full" />
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <Avatar className="size-9 ring-2 ring-navy/50 ring-offset-2 ring-offset-[#0a0a14]">
                    <AvatarFallback className={cn(
                      "text-xs font-semibold",
                      isAffiliate 
                        ? "bg-gradient-to-br from-navy to-sky-600 text-white" 
                        : "bg-gradient-to-br from-coral to-rose-500 text-white"
                    )}>
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-[#0a0a14] border-white/10">
                <div className="p-3">
                  <p className="font-medium text-white">{user.name}</p>
                  <p className="text-xs text-white/40">{user.email}</p>
                </div>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem className="text-white/70 hover:text-white hover:bg-white/5">
                  <Settings className="size-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-coral hover:text-coral hover:bg-coral/10">
                  <LogOut className="size-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-dark">
          {children}
        </main>
      </div>
    </div>
  )
}

export default function AffiliateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AffiliateProvider>
      <AffiliateLayoutInner>{children}</AffiliateLayoutInner>
    </AffiliateProvider>
  )
}
