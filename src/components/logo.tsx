"use client"

import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
  variant?: "light" | "dark"
}

export function Logo({ className, size = "md", variant = "light" }: LogoProps) {
  const sizes = {
    sm: "size-6",
    md: "size-8",
    lg: "size-10",
  }

  const colors = {
    light: {
      primary: "#FFFFFF",
      secondary: "rgba(255,255,255,0.7)",
      tertiary: "rgba(255,255,255,0.4)",
    },
    dark: {
      primary: "#0A4591",
      secondary: "#EB5C6A",
      tertiary: "#E9ECEF",
    },
  }

  const c = colors[variant]

  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={cn(sizes[size], className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Three interlocking shapes forming a stylized P */}
      <path
        d="M8 8h12c6.627 0 12 5.373 12 12s-5.373 12-12 12H8V8z"
        fill={c.primary}
        opacity={0.9}
      />
      <path
        d="M12 14h8c3.314 0 6 2.686 6 6s-2.686 6-6 6h-8V14z"
        fill={c.secondary}
      />
      <circle cx="20" cy="20" r="4" fill={c.tertiary} />
    </svg>
  )
}
