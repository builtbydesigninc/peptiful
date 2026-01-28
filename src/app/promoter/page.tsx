"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Copy,
  Check,
  DollarSign,
  Hash,
  TrendingUp,
  Calendar,
  Share2,
  Twitter,
  Instagram,
  MessageCircle,
  ChevronRight,
  ShoppingBag,
  Tag,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const promoterData = {
  name: "Ashton",
  codes: [
    { code: "ASHTON20", discount: "20% off", status: "active" },
    { code: "ASHTONVIP", discount: "25% off", status: "active" },
  ],
  primaryCode: "ASHTON20",
  primaryDiscount: "20% off",
  totalUses: 145,
  currentEarnings: "$487.50",
  lifetimeEarnings: "$2,847.50",
  nextPayout: "Feb 1, 2026",
}

const recentOrders = [
  { id: "HOA-4521", customer: "John", amount: "$289.97", commission: "$14.50", status: "completed", time: "2 hours ago" },
  { id: "HOA-4519", customer: "Customer", amount: "$459.95", commission: "$23.00", status: "completed", time: "6 hours ago" },
  { id: "HOA-4515", customer: "Sarah", amount: "$149.99", commission: "$7.50", status: "processing", time: "Yesterday" },
  { id: "HOA-4512", customer: "Mike", amount: "$379.96", commission: "$19.00", status: "completed", time: "2 days ago" },
  { id: "HOA-4508", customer: "Customer", amount: "$89.99", commission: "$4.50", status: "refunded", time: "3 days ago" },
]

const recentActivity = [
  { id: 1, message: "Your code was used", amount: "$24.50", time: "2 hours ago" },
  { id: 2, message: "Your code was used", amount: "$18.75", time: "5 hours ago" },
  { id: 3, message: "Payout completed", amount: "$350.00", time: "Jan 20" },
]

const earningsData = [35, 42, 28, 55, 48, 62, 71, 58, 82, 76, 94, 87]

function MiniChart() {
  const max = Math.max(...earningsData)
  const min = Math.min(...earningsData)
  const range = max - min

  return (
    <div className="h-24 flex items-end gap-1">
      {earningsData.map((value, i) => {
        const height = ((value - min) / range) * 100
        const isLast = i === earningsData.length - 1
        return (
          <div
            key={i}
            className={`flex-1 rounded-t transition-all ${
              isLast ? "bg-coral" : "bg-navy/30"
            }`}
            style={{ height: `${Math.max(height, 10)}%` }}
          />
        )
      })}
    </div>
  )
}

function getStatusBadge(status: string) {
  switch (status) {
    case "completed":
      return <Badge variant="active" className="text-[10px]">Done</Badge>
    case "processing":
      return <Badge variant="pending" className="text-[10px]">Pending</Badge>
    case "refunded":
      return <Badge variant="muted" className="text-[10px]">Refunded</Badge>
    default:
      return <Badge variant="muted" className="text-[10px]">{status}</Badge>
  }
}

export default function PromoterDashboardPage() {
  const [copied, setCopied] = useState(false)
  const [copiedShare, setCopiedShare] = useState(false)

  const copyCode = () => {
    navigator.clipboard.writeText(promoterData.primaryCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareText = `Use my code ${promoterData.primaryCode} for ${promoterData.primaryDiscount} on House of Aminos! 💪`
  
  const copyShareText = () => {
    navigator.clipboard.writeText(shareText)
    setCopiedShare(true)
    setTimeout(() => setCopiedShare(false), 2000)
  }

  const activeCodes = promoterData.codes.filter(c => c.status === "active")

  return (
    <div className="px-4 py-6 space-y-6 max-w-lg mx-auto">
      {/* Welcome Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-dark-navy">Welcome, {promoterData.name}! 👋</h1>
        <p className="text-muted-foreground text-sm mt-1">House of Aminos Promoter</p>
      </div>

      {/* Big Code Card */}
      <Card className="bg-gradient-to-br from-coral to-coral/80 text-white border-0 overflow-hidden">
        <CardContent className="p-6 text-center">
          <p className="text-sm opacity-80 mb-2">Your Promo Code</p>
          <div className="flex items-center justify-center gap-3">
            <span className="text-4xl sm:text-5xl font-bold tracking-wider">
              {promoterData.primaryCode}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 size-12"
              onClick={copyCode}
            >
              {copied ? <Check className="size-6" /> : <Copy className="size-6" />}
            </Button>
          </div>
          <p className="text-sm opacity-80 mt-3">{promoterData.primaryDiscount} for your followers</p>
        </CardContent>
      </Card>

      {/* Multiple Codes Notice */}
      {activeCodes.length > 1 && (
        <Link href="/promoter/codes">
          <Card className="bg-lavender/50 border-navy/20 hover:bg-lavender transition-colors cursor-pointer">
            <CardContent className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Tag className="size-4 text-navy" />
                <span className="text-sm font-medium text-dark-navy">
                  You have {activeCodes.length} active codes
                </span>
              </div>
              <ChevronRight className="size-4 text-navy" />
            </CardContent>
          </Card>
        </Link>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-white border-border/50">
          <CardContent className="p-4 text-center">
            <Hash className="size-5 text-navy mx-auto mb-2" />
            <p className="text-2xl font-bold text-dark-navy">{promoterData.totalUses}</p>
            <p className="text-xs text-muted-foreground">Total Uses</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-border/50">
          <CardContent className="p-4 text-center">
            <DollarSign className="size-5 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-600">{promoterData.currentEarnings}</p>
            <p className="text-xs text-muted-foreground">This Period</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-border/50">
          <CardContent className="p-4 text-center">
            <TrendingUp className="size-5 text-navy mx-auto mb-2" />
            <p className="text-2xl font-bold text-dark-navy">{promoterData.lifetimeEarnings}</p>
            <p className="text-xs text-muted-foreground">Lifetime</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-border/50">
          <CardContent className="p-4 text-center">
            <Calendar className="size-5 text-navy mx-auto mb-2" />
            <p className="text-lg font-bold text-dark-navy">{promoterData.nextPayout}</p>
            <p className="text-xs text-muted-foreground">Next Payout</p>
          </CardContent>
        </Card>
      </div>

      {/* Share Section */}
      <Card className="bg-white border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Share2 className="size-4" />
            Share Your Code
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-3 bg-lavender rounded-lg">
            <p className="text-sm text-dark-navy">{shareText}</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={copyShareText}
            >
              {copiedShare ? <Check className="size-4" /> : <Copy className="size-4" />}
              {copiedShare ? "Copied!" : "Copy Text"}
            </Button>
          </div>
          <div className="flex justify-center gap-3">
            <Button variant="ghost" size="icon" className="rounded-full bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2]/20">
              <Twitter className="size-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full bg-[#E4405F]/10 text-[#E4405F] hover:bg-[#E4405F]/20">
              <Instagram className="size-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20">
              <MessageCircle className="size-5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Orders Preview */}
      <Card className="bg-white border-border/50">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <ShoppingBag className="size-4" />
            Recent Orders
          </CardTitle>
          <Button variant="ghost" size="sm" asChild className="text-xs -mr-2">
            <Link href="/promoter/orders">
              View All <ChevronRight className="size-3.5" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border/50">
            {recentOrders.slice(0, 4).map((order) => (
              <div key={order.id} className="px-4 sm:px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-navy">{order.id}</span>
                      {getStatusBadge(order.status)}
                    </div>
                    <p className="text-[11px] text-muted-foreground truncate">
                      {order.customer} • {order.time}
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className={`text-sm font-bold ${order.status === "refunded" ? "text-muted-foreground line-through" : "text-coral"}`}>
                    +{order.commission}
                  </p>
                  <p className="text-[10px] text-muted-foreground">{order.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Earnings Chart */}
      <Card className="bg-white border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Earnings Trend</CardTitle>
          <p className="text-xs text-muted-foreground">Last 12 weeks</p>
        </CardHeader>
        <CardContent>
          <MiniChart />
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-white border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border/50">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="px-6 py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-dark-navy">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
                <span className={`text-sm font-semibold ${
                  activity.message.includes("Payout") ? "text-navy" : "text-green-600"
                }`}>
                  +{activity.amount}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
