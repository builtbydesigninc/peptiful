import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        // Default - Navy
        default: "bg-navy/10 text-navy",
        // Active - Navy filled
        active: "bg-navy text-white",
        // Pending - Coral outline
        pending: "bg-coral/10 text-coral border border-coral/20",
        // Failed - Coral filled
        failed: "bg-coral text-white",
        // Success - Navy filled
        success: "bg-navy text-white",
        // Warning - Coral
        warning: "bg-coral/10 text-coral",
        // Info - Navy light
        info: "bg-navy/10 text-navy",
        // Muted
        muted: "bg-muted text-muted-foreground",
        // Outline
        outline: "border border-border text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
