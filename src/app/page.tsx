import Link from "next/link"
import {
  LayoutDashboard,
  Package,
  Plug,
  TrendingUp,
  Megaphone,
  ArrowUpRight,
} from "lucide-react"

const interfaces = [
  {
    title: "Admin Dashboard",
    description: "Manage partners, orders, and commissions",
    href: "/dashboard",
    icon: LayoutDashboard,
    tag: "Internal",
    iconBg: "from-sky-500 to-blue-600",
    accent: "text-sky-400",
    glowColor: "rgba(56,189,248,0.15)",
  },
  {
    title: "Fulfillment",
    description: "Warehouse order processing queue",
    href: "/fulfillment",
    icon: Package,
    tag: "Operations",
    iconBg: "from-amber-500 to-orange-500",
    accent: "text-amber-400",
    glowColor: "rgba(251,191,36,0.12)",
  },
  {
    title: "Partner Plugin",
    description: "WordPress & WooCommerce integration",
    href: "/wordpress",
    icon: Plug,
    tag: "Integration",
    iconBg: "from-violet-500 to-purple-600",
    accent: "text-violet-400",
    glowColor: "rgba(139,92,246,0.15)",
  },
  {
    title: "Affiliate Portal",
    description: "Partner earnings and insights",
    href: "/affiliate",
    icon: TrendingUp,
    tag: "External",
    iconBg: "from-emerald-500 to-teal-500",
    accent: "text-emerald-400",
    glowColor: "rgba(52,211,153,0.15)",
  },
  {
    title: "Promoter Portal",
    description: "Influencer earnings & codes",
    href: "/promoter",
    icon: Megaphone,
    tag: "Influencer",
    iconBg: "from-coral to-rose-500",
    accent: "text-coral",
    glowColor: "rgba(235,92,106,0.15)",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#050510] text-white flex flex-col relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(10,69,145,0.12)_0%,transparent_70%)]" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.08)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(235,92,106,0.08)_0%,transparent_70%)]" />
        
        {/* Subtle grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 sm:py-24">
        {/* Logo + Badge */}
        <div className="flex items-center gap-5 mb-12">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/30 to-violet-500/30 rounded-2xl blur-2xl scale-150 group-hover:scale-175 transition-transform duration-500" />
            <div className="relative flex items-center justify-center size-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-sm">
              <img 
                src="/logos/Logomark white.svg" 
                alt="Peptiful" 
                className="h-9 w-9"
              />
            </div>
          </div>
          <div className="h-12 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          <div className="flex flex-col">
            <span className="font-bricolage text-2xl font-bold tracking-tight text-white">
              Peptiful
            </span>
            <span className="text-[11px] uppercase tracking-[0.25em] text-white/40 font-medium">
              Platform Hub
            </span>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-white/40 text-center mb-14 max-w-md text-base">
          Select an interface to continue
        </p>

        {/* Cards Grid */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl">
          {interfaces.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-all duration-300 hover:bg-white/[0.05] hover:border-white/[0.15] hover:shadow-2xl hover:shadow-black/20 overflow-hidden"
            >
              {/* Subtle glow on hover */}
              <div 
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ backgroundColor: item.glowColor }}
              />
              
              <div className="relative z-10">
                {/* Header row */}
                <div className="flex items-start justify-between mb-6">
                  {/* Icon */}
                  <div className="relative">
                    <div 
                      className="absolute inset-0 rounded-xl blur-xl scale-150 opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                      style={{ backgroundColor: item.glowColor }}
                    />
                    <div className={`relative flex items-center justify-center size-14 rounded-xl bg-gradient-to-br ${item.iconBg} shadow-xl`}>
                      <item.icon className="size-7 text-white" />
                    </div>
                  </div>
                  {/* Tag */}
                  <span className={`text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full bg-white/[0.06] ${item.accent} group-hover:bg-white/[0.1] transition-colors`}>
                    {item.tag}
                  </span>
                </div>

                {/* Content */}
                <h2 className="font-bricolage text-xl font-semibold text-white mb-2">
                  {item.title}
                </h2>
                <p className="text-sm text-white/40 mb-6 group-hover:text-white/60 transition-colors leading-relaxed">
                  {item.description}
                </p>

                {/* Link */}
                <div className={`flex items-center gap-2 text-sm font-medium ${item.accent} opacity-60 group-hover:opacity-100 transition-all`}>
                  <span>Enter</span>
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Status */}
        <div className="mt-16 flex items-center gap-4">
          <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium text-emerald-400">All systems operational</span>
            </div>
            <span className="text-white/10">|</span>
            <span className="text-xs text-white/30 font-mono">v1.0.0</span>
          </div>
        </div>
      </main>
    </div>
  )
}
