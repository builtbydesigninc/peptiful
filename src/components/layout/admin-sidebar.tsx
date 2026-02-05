"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Building2,
  ShoppingCart,
  Webhook,
  DollarSign,
  Settings,
  LogOut,
  ChevronDown,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/dashboard/affiliates", icon: Users, label: "Affiliates" },
  { href: "/dashboard/brands", icon: Building2, label: "Brands" },
  { href: "/dashboard/orders", icon: ShoppingCart, label: "Orders", badge: 12 },
  { href: "/dashboard/webhooks", icon: Webhook, label: "Webhooks" },
  { href: "/dashboard/commissions", icon: DollarSign, label: "Commissions" },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-full w-72 shrink-0 flex-col bg-gradient-to-b from-[#0d1025] via-[#0a0a18] to-[#080812] border-r border-white/[0.06] relative overflow-hidden">
      {/* Subtle glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-40 bg-[radial-gradient(ellipse_at_center,rgba(10,69,145,0.2)_0%,transparent_70%)] pointer-events-none" />
      {/* Bottom glow */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-[radial-gradient(ellipse_at_bottom,rgba(10,69,145,0.1)_0%,transparent_70%)] pointer-events-none" />
      {/* Header */}
      <div className="relative flex h-16 shrink-0 items-center gap-3 border-b border-white/[0.06] px-5">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-sky-500/20 rounded-xl blur-xl scale-150" />
            <div className="relative flex items-center justify-center size-10 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10">
              <img 
                src="/logos/Logomark white.svg" 
                alt="Peptiful" 
                className="h-6 w-6"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bricolage text-lg font-semibold text-white tracking-tight">
              Peptiful
            </span>
            <span className="text-[10px] uppercase tracking-[0.15em] text-sky-400/60">
              Admin Hub
            </span>
          </div>
        </div>
      </div>

      {/* Live Status */}
      <div className="px-4 py-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-500/10 to-transparent border border-emerald-500/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-medium text-emerald-400/90">All systems operational</span>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="mb-2 px-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/30">
            Main
          </span>
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => {
            // For /dashboard, only exact match. For sub-routes, match exact or children
            const isActive = item.href === "/dashboard" 
              ? pathname === "/dashboard"
              : pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
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
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className={cn(
                    "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                    isActive 
                      ? "bg-coral text-white"
                      : "bg-coral/20 text-coral"
                  )}>
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Quick Actions */}
        <div className="mt-6 mb-2 px-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/30">
            Quick Actions
          </span>
        </div>
        <div className="space-y-1">
          <button className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/60 hover:bg-amber-500/10 hover:text-amber-300 transition-all duration-200 border border-transparent hover:border-amber-500/20">
            <div className="flex size-6 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-orange-500">
              <Zap className="size-3.5 text-white" />
            </div>
            <span>Process Fulfillment</span>
          </button>
        </div>
      </ScrollArea>

      {/* User Menu */}
      <div className="shrink-0 border-t border-white/[0.06] p-3 bg-gradient-to-t from-black/20 to-transparent">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex w-full items-center gap-3 rounded-xl p-2.5 text-left transition-all hover:bg-white/[0.06] group">
            <Avatar className="size-9 ring-2 ring-navy/50 ring-offset-2 ring-offset-[#0a0a14]">
              <AvatarImage src="/avatar.jpg" />
              <AvatarFallback className="bg-gradient-to-br from-navy to-sky-600 text-white text-xs font-semibold">
                AD
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 truncate">
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-[11px] text-sky-400/50">admin@peptiful.com</p>
            </div>
            <ChevronDown className="size-4 text-white/30 group-hover:text-white/60 transition-colors" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-[#0d0d18] border-white/10">
            <DropdownMenuItem className="text-white/70 hover:text-white hover:bg-white/5">
              <Settings className="mr-2 size-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem className="text-coral hover:text-coral hover:bg-coral/10">
              <LogOut className="mr-2 size-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  )
}
