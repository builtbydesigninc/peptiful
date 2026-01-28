import Link from "next/link"
import {
  LayoutDashboard,
  Package,
  Plug,
  TrendingUp,
  Megaphone,
  ArrowUpRight,
} from "lucide-react"
import { Logo } from "@/components/logo"

const interfaces = [
  {
    title: "Admin Dashboard",
    description: "Manage partners, orders, and commissions",
    href: "/dashboard",
    icon: LayoutDashboard,
    tag: "Internal",
    accent: false,
  },
  {
    title: "Fulfillment",
    description: "Warehouse order processing queue",
    href: "/fulfillment",
    icon: Package,
    tag: "Operations",
    accent: false,
  },
  {
    title: "Partner Plugin",
    description: "WordPress & WooCommerce integration",
    href: "/wordpress",
    icon: Plug,
    tag: "Integration",
    accent: false,
  },
  {
    title: "Affiliate Portal",
    description: "Partner earnings and insights",
    href: "/affiliate",
    icon: TrendingUp,
    tag: "External",
    accent: false,
  },
  {
    title: "Promoter Portal",
    description: "Influencer earnings & codes",
    href: "/promoter",
    icon: Megaphone,
    tag: "Influencer",
    accent: true,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 sm:py-24">
        {/* Logo + Badge */}
        <div className="flex items-center gap-3 mb-8">
          <Logo size="lg" variant="dark" />
          <div className="h-8 w-px bg-border" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
            Platform
          </span>
        </div>

        {/* Headlines */}
        <h1 className="text-4xl sm:text-5xl font-bold text-dark-navy text-center mb-3 tracking-tight">
          Peptiful
        </h1>
        <p className="text-muted-foreground text-center mb-12 sm:mb-16 max-w-md">
          B2B dropshipping infrastructure for peptide brands
        </p>

        {/* Cards Grid */}
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-4xl">
          {interfaces.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative rounded-xl p-5 sm:p-6 transition-all ${
                item.accent
                  ? "bg-coral text-white hover:shadow-lg hover:shadow-coral/20"
                  : "bg-white border border-border/60 hover:border-navy/30 hover:shadow-lg hover:shadow-navy/5"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                {/* Icon */}
                <div className={`flex items-center justify-center size-10 rounded-lg ${
                  item.accent ? "bg-white/20 text-white" : "bg-lavender text-navy"
                }`}>
                  <item.icon className="size-5" />
                </div>
                {/* Tag */}
                <span className={`text-[10px] font-medium uppercase tracking-wider px-2 py-1 rounded ${
                  item.accent ? "bg-white/20 text-white" : "text-muted-foreground bg-lavender"
                }`}>
                  {item.tag}
                </span>
              </div>

              {/* Content */}
              <h2 className={`text-lg font-semibold mb-1 transition-colors ${
                item.accent ? "text-white" : "text-dark-navy group-hover:text-navy"
              }`}>
                {item.title}
              </h2>
              <p className={`text-sm mb-4 ${
                item.accent ? "text-white/80" : "text-muted-foreground"
              }`}>
                {item.description}
              </p>

              {/* Link */}
              <div className={`flex items-center gap-1 text-sm font-medium transition-opacity ${
                item.accent 
                  ? "text-white opacity-80 group-hover:opacity-100" 
                  : "text-navy opacity-0 group-hover:opacity-100"
              }`}>
                <span>Open</span>
                <ArrowUpRight className="size-4" />
              </div>
            </Link>
          ))}
        </div>

        {/* Version */}
        <div className="mt-12 flex items-center gap-2 text-xs text-muted-foreground">
          <span className="size-2 rounded-full bg-green-500" />
          <span>All systems operational</span>
          <span className="text-border">•</span>
          <span>v1.0.0</span>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-border/50">
        <p className="text-xs text-muted-foreground text-center">
          Peptiful Dropshipping System — UI Preview
        </p>
      </footer>
    </div>
  )
}
