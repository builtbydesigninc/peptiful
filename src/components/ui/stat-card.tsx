"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown } from "lucide-react"

interface StatCardProps {
  label: string
  value: string | number
  icon?: React.ReactNode
  trend?: {
    value: number
    label?: string
  }
  className?: string
}

function StatCard({ label, value, icon, trend, className }: StatCardProps) {
  const isPositive = trend && trend.value >= 0

  return (
    <div
      className={cn(
        "bg-card rounded-xl p-6 shadow-sm border border-border/50",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="text-3xl font-bold tracking-tight text-foreground">
            {value}
          </p>
          {trend && (
            <div className="flex items-center gap-1.5">
              {isPositive ? (
                <TrendingUp className="size-4 text-navy" />
              ) : (
                <TrendingDown className="size-4 text-coral" />
              )}
              <span
                className={cn(
                  "text-sm font-medium",
                  isPositive ? "text-navy" : "text-coral"
                )}
              >
                {isPositive ? "+" : ""}
                {trend.value}%
              </span>
              {trend.label && (
                <span className="text-sm text-muted-foreground">
                  {trend.label}
                </span>
              )}
            </div>
          )}
        </div>
        {icon && (
          <div className="flex size-12 items-center justify-center rounded-lg bg-lavender text-navy">
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}

export { StatCard }
