"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarContextType {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

const SidebarContext = React.createContext<SidebarContextType>({
  collapsed: false,
  setCollapsed: () => {},
})

export function useSidebar() {
  return React.useContext(SidebarContext)
}

interface SidebarProviderProps {
  children: React.ReactNode
  defaultCollapsed?: boolean
}

function SidebarProvider({ children, defaultCollapsed = false }: SidebarProviderProps) {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed)

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </SidebarContext.Provider>
  )
}

interface SidebarProps {
  children: React.ReactNode
  className?: string
}

function Sidebar({ children, className }: SidebarProps) {
  const { collapsed } = useSidebar()

  return (
    <aside
      className={cn(
        "flex h-screen flex-col bg-navy text-white transition-all duration-300",
        collapsed ? "w-[72px]" : "w-64",
        className
      )}
    >
      {children}
    </aside>
  )
}

interface SidebarHeaderProps {
  children: React.ReactNode
  className?: string
}

function SidebarHeader({ children, className }: SidebarHeaderProps) {
  const { collapsed } = useSidebar()

  return (
    <div
      className={cn(
        "flex h-16 items-center border-b border-white/10 px-4",
        collapsed && "justify-center px-2",
        className
      )}
    >
      {children}
    </div>
  )
}

interface SidebarContentProps {
  children: React.ReactNode
  className?: string
}

function SidebarContent({ children, className }: SidebarContentProps) {
  return (
    <ScrollArea className={cn("flex-1 py-4", className)}>
      {children}
    </ScrollArea>
  )
}

interface SidebarFooterProps {
  children: React.ReactNode
  className?: string
}

function SidebarFooter({ children, className }: SidebarFooterProps) {
  return (
    <div className={cn("border-t border-white/10 p-4", className)}>
      {children}
    </div>
  )
}

interface SidebarGroupProps {
  children: React.ReactNode
  label?: string
  className?: string
}

function SidebarGroup({ children, label, className }: SidebarGroupProps) {
  const { collapsed } = useSidebar()

  return (
    <div className={cn("px-3 py-2", className)}>
      {label && !collapsed && (
        <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-white/50">
          {label}
        </p>
      )}
      <nav className="space-y-1">{children}</nav>
    </div>
  )
}

interface SidebarItemProps {
  href: string
  icon: React.ReactNode
  label: string
  badge?: string | number
  className?: string
}

function SidebarItem({ href, icon, label, badge, className }: SidebarItemProps) {
  const pathname = usePathname()
  const { collapsed } = useSidebar()
  const isActive = pathname === href || pathname.startsWith(`${href}/`)

  const content = (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        isActive
          ? "bg-white/15 text-white"
          : "text-white/70 hover:bg-white/10 hover:text-white",
        collapsed && "justify-center px-2",
        className
      )}
    >
      <span className="size-5 shrink-0">{icon}</span>
      {!collapsed && (
        <>
          <span className="flex-1 truncate">{label}</span>
          {badge !== undefined && (
            <span className="rounded-full bg-coral px-2 py-0.5 text-xs font-semibold text-white">
              {badge}
            </span>
          )}
        </>
      )}
    </Link>
  )

  if (collapsed) {
    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent side="right" className="flex items-center gap-2">
            {label}
            {badge !== undefined && (
              <span className="rounded-full bg-coral px-2 py-0.5 text-xs font-semibold text-white">
                {badge}
              </span>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return content
}

function SidebarToggle({ className }: { className?: string }) {
  const { collapsed, setCollapsed } = useSidebar()

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={() => setCollapsed(!collapsed)}
      className={cn(
        "text-white/70 hover:bg-white/10 hover:text-white",
        className
      )}
    >
      {collapsed ? (
        <ChevronRight className="size-4" />
      ) : (
        <ChevronLeft className="size-4" />
      )}
    </Button>
  )
}

export {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarItem,
  SidebarToggle,
}
