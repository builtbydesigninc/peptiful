"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const alertBannerVariants = cva(
  "relative flex items-start gap-3 rounded-xl border p-4",
  {
    variants: {
      variant: {
        // Info - Navy
        info: "border-navy/20 bg-navy/5 text-navy",
        // Success - Navy
        success: "border-navy/20 bg-navy/5 text-navy",
        // Warning - Coral
        warning: "border-coral/20 bg-coral/5 text-coral",
        // Error - Coral
        error: "border-coral/20 bg-coral/5 text-coral",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
)

const iconMap = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
}

interface AlertBannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertBannerVariants> {
  title?: string
  description?: string
  icon?: React.ReactNode
  onDismiss?: () => void
  action?: {
    label: string
    onClick: () => void
  }
}

function AlertBanner({
  className,
  variant = "info",
  title,
  description,
  icon,
  onDismiss,
  action,
  children,
  ...props
}: AlertBannerProps) {
  const IconComponent = variant ? iconMap[variant] : Info
  const displayIcon = icon ?? <IconComponent className="size-5 shrink-0" />

  return (
    <div
      role="alert"
      className={cn(alertBannerVariants({ variant }), className)}
      {...props}
    >
      {displayIcon}
      <div className="flex-1 space-y-1">
        {title && <p className="text-sm font-semibold">{title}</p>}
        {description && (
          <p className="text-sm opacity-90">{description}</p>
        )}
        {children}
        {action && (
          <Button
            variant="ghost"
            size="sm"
            className="mt-2 -ml-2 h-auto p-2 font-semibold underline-offset-4 hover:underline"
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        )}
      </div>
      {onDismiss && (
        <Button
          variant="ghost"
          size="icon-xs"
          className="shrink-0 opacity-70 hover:opacity-100"
          onClick={onDismiss}
        >
          <X className="size-4" />
          <span className="sr-only">Dismiss</span>
        </Button>
      )}
    </div>
  )
}

export { AlertBanner, alertBannerVariants }
