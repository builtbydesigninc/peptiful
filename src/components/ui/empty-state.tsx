"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Package, Search, FileX, Inbox } from "lucide-react"
import { Button } from "@/components/ui/button"

type EmptyStateVariant = "default" | "search" | "error" | "no-data"

interface EmptyStateProps {
  variant?: EmptyStateVariant
  icon?: React.ReactNode
  title: string
  description?: string
  action?: {
    label: string
    onClick?: () => void
    href?: string
  }
  secondaryAction?: {
    label: string
    onClick?: () => void
    href?: string
  }
  className?: string
}

const defaultIcons: Record<EmptyStateVariant, React.ReactNode> = {
  default: <Inbox className="size-12" />,
  search: <Search className="size-12" />,
  error: <FileX className="size-12" />,
  "no-data": <Package className="size-12" />,
}

function EmptyState({
  variant = "default",
  icon,
  title,
  description,
  action,
  secondaryAction,
  className,
}: EmptyStateProps) {
  const displayIcon = icon ?? defaultIcons[variant]

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 px-6 py-16 text-center",
        className
      )}
    >
      <div className="mb-4 text-muted-foreground/50">{displayIcon}</div>
      <h3 className="mb-1 text-lg font-semibold text-foreground">{title}</h3>
      {description && (
        <p className="mb-6 max-w-sm text-sm text-muted-foreground">
          {description}
        </p>
      )}
      {(action || secondaryAction) && (
        <div className="flex flex-wrap items-center justify-center gap-3">
          {action && (
            <Button
              onClick={action.onClick}
              asChild={!!action.href}
            >
              {action.href ? (
                <a href={action.href}>{action.label}</a>
              ) : (
                action.label
              )}
            </Button>
          )}
          {secondaryAction && (
            <Button
              variant="outline"
              onClick={secondaryAction.onClick}
              asChild={!!secondaryAction.href}
            >
              {secondaryAction.href ? (
                <a href={secondaryAction.href}>{secondaryAction.label}</a>
              ) : (
                secondaryAction.label
              )}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

export { EmptyState }
