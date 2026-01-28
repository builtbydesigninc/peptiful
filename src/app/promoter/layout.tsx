"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Wallet, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/promoter", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/promoter/payouts", icon: Wallet, label: "Payouts" },
]

export default function PromoterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-lavender">
      {/* Mobile Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-border/50">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-2">
            <Logo size="sm" variant="dark" />
            <span className="font-bold text-dark-navy">Peptiful</span>
          </div>
          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-navy text-white"
                      : "text-muted-foreground hover:bg-lavender"
                  )}
                >
                  <item.icon className="size-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              )
            })}
            <Button variant="ghost" size="sm" className="text-muted-foreground ml-2">
              <LogOut className="size-4" />
              <span className="hidden sm:inline ml-1.5">Logout</span>
            </Button>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="pb-8">
        {children}
      </main>
    </div>
  )
}
