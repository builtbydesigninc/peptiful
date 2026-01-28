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
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
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
      <div className="min-h-screen bg-lavender flex items-center justify-center">
        <Loader2 className="size-8 animate-spin text-navy" />
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
      <div className="min-h-screen bg-lavender flex items-center justify-center">
        <Loader2 className="size-8 animate-spin text-navy" />
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
              <span className="text-xs text-muted-foreground block truncate">
                {isAffiliate ? "Affiliate Portal" : "Brand Portal"}
              </span>
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

        {/* Brand Switcher (Affiliates only) */}
        {isAffiliate && (
          <div className="p-3 border-b border-border/50">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-full flex items-center justify-between gap-2 p-2.5 rounded-lg bg-lavender hover:bg-lavender/80 transition-colors text-left">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-navy text-white">
                      <Building className="size-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-dark-navy truncate">
                        {selectedBrand ? selectedBrand.name : "All Brands"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {selectedBrand ? "Filtered view" : `${visibleBrands.length} brands`}
                      </p>
                    </div>
                  </div>
                  <ChevronDown className="size-4 text-muted-foreground shrink-0" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem
                  onClick={() => selectBrand(null)}
                  className="flex items-center justify-between"
                >
                  <span>All Brands</span>
                  {!selectedBrand && <Check className="size-4 text-navy" />}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {visibleBrands.map((brand) => (
                  <DropdownMenuItem
                    key={brand.id}
                    onClick={() => selectBrand(brand.id)}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "size-2 rounded-full",
                          brand.status === "connected" ? "bg-green-500" : "bg-gray-300"
                        )}
                      />
                      <span>{brand.name}</span>
                    </div>
                    {selectedBrand?.id === brand.id && <Check className="size-4 text-navy" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {/* Brand Header (Brand users only) */}
        {!isAffiliate && (
          <div className="p-3 border-b border-border/50">
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-lavender">
              <div className="flex size-8 items-center justify-center rounded-lg bg-coral text-white">
                <Building className="size-4" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-dark-navy truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {visibleBrands[0]?.storeUrl || "Brand account"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {filteredNavItems.map((item) => {
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
              <p className="text-sm text-muted-foreground truncate">
                {isAffiliate ? "Affiliate Account" : "Brand Account"}
              </p>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-semibold text-dark-navy truncate">{user.name}</h1>
                <Badge variant={isAffiliate ? "active" : "pending"} className="hidden sm:inline-flex">
                  {isAffiliate ? `${visibleBrands.length} Brands` : "Single Brand"}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="size-5 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 size-2 bg-coral rounded-full" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <Avatar className="size-9">
                    <AvatarFallback className={cn(
                      "text-sm font-semibold",
                      isAffiliate ? "bg-lavender text-navy" : "bg-coral/20 text-coral"
                    )}>
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="p-2">
                  <p className="font-medium text-dark-navy">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="size-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-coral">
                  <LogOut className="size-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
