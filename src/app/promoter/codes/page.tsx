"use client"

import { useState } from "react"
import {
  Copy,
  Check,
  Calendar,
  Link as LinkIcon,
  Share2,
  Tag,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const promoterCodes = [
  {
    id: 1,
    code: "ASHTON20",
    discount: "20% off",
    discountValue: 20,
    discountType: "percentage",
    status: "active",
    uses: 45,
    limit: 100,
    revenue: "$4,892.50",
    earnings: "$244.63",
    expires: "Mar 31, 2026",
    shareText: "Use my code ASHTON20 for 20% off your order at House of Aminos! 💪",
    shareLink: "https://houseofaminos.com?code=ASHTON20",
  },
  {
    id: 2,
    code: "ASHTONVIP",
    discount: "25% off",
    discountValue: 25,
    discountType: "percentage",
    status: "active",
    uses: 12,
    limit: null,
    revenue: "$1,245.00",
    earnings: "$62.25",
    expires: null,
    shareText: "Special VIP code! Use ASHTONVIP for 25% off at House of Aminos! 🔥",
    shareLink: "https://houseofaminos.com?code=ASHTONVIP",
  },
  {
    id: 3,
    code: "ASHTON10",
    discount: "$10 off",
    discountValue: 10,
    discountType: "fixed",
    status: "expired",
    uses: 89,
    limit: 100,
    revenue: "$6,234.00",
    earnings: "$311.70",
    expires: "Jan 15, 2026",
    shareText: "",
    shareLink: "",
  },
]

function CodeCard({ 
  code, 
  isExpired = false 
}: { 
  code: typeof promoterCodes[0]
  isExpired?: boolean 
}) {
  const [copied, setCopied] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)
  const [copiedText, setCopiedText] = useState(false)

  const copyCode = () => {
    navigator.clipboard.writeText(code.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const copyLink = () => {
    navigator.clipboard.writeText(code.shareLink)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  const copyShareText = () => {
    navigator.clipboard.writeText(code.shareText)
    setCopiedText(true)
    setTimeout(() => setCopiedText(false), 2000)
  }

  const usagePercent = code.limit ? (code.uses / code.limit) * 100 : 0

  return (
    <Card className={`bg-white border-border/50 overflow-hidden ${isExpired ? "opacity-70" : ""}`}>
      <CardContent className="p-4 sm:p-5">
        {/* Code Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={copyCode}
              className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-mono text-lg sm:text-xl font-bold transition-all ${
                isExpired 
                  ? "bg-gray-100 text-gray-500"
                  : "bg-gradient-to-r from-coral to-coral/80 text-white hover:shadow-lg hover:shadow-coral/20"
              }`}
            >
              {copied ? (
                <span className="flex items-center gap-1.5">
                  <Check className="size-4 sm:size-5" />
                  Copied!
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  {code.code}
                  <Copy className="size-3.5 sm:size-4 opacity-80" />
                </span>
              )}
            </button>
          </div>
          <Badge 
            variant={code.status === "active" ? "active" : "muted"}
            className={isExpired ? "bg-gray-200 text-gray-600" : ""}
          >
            {code.status === "active" ? "Active" : "Expired"}
          </Badge>
        </div>

        {/* Discount & Expiry */}
        <div className="flex flex-wrap items-center gap-3 text-sm mb-4">
          <span className="font-semibold text-dark-navy">{code.discount}</span>
          <span className="text-muted-foreground">•</span>
          {code.expires ? (
            <span className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="size-3.5" />
              {isExpired ? `Expired ${code.expires}` : `Expires ${code.expires}`}
            </span>
          ) : (
            <span className="text-muted-foreground">No expiry</span>
          )}
        </div>

        {/* Usage Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-1.5">
            <span className="text-muted-foreground">Usage</span>
            <span className="font-medium text-dark-navy">
              {code.uses}{code.limit ? ` / ${code.limit}` : ""} uses
            </span>
          </div>
          {code.limit && (
            <div className="w-full h-2 bg-lavender rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  usagePercent >= 90 
                    ? "bg-coral" 
                    : isExpired 
                      ? "bg-gray-400" 
                      : "bg-navy"
                }`}
                style={{ width: `${Math.min(usagePercent, 100)}%` }}
              />
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-3 bg-lavender/50 rounded-lg">
            <p className="text-xs text-muted-foreground mb-0.5">Revenue Generated</p>
            <p className="text-base sm:text-lg font-bold text-dark-navy">{code.revenue}</p>
          </div>
          <div className="p-3 bg-coral/10 rounded-lg">
            <p className="text-xs text-muted-foreground mb-0.5">My Earnings</p>
            <p className="text-base sm:text-lg font-bold text-coral">{code.earnings}</p>
          </div>
        </div>

        {/* Share Section (only for active codes) */}
        {!isExpired && code.shareText && (
          <div className="border-t border-border/50 pt-4">
            <p className="text-xs font-semibold text-dark-navy mb-2">Share Your Code</p>
            <div className="p-3 bg-lavender/30 rounded-lg mb-3">
              <p className="text-sm text-dark-navy">{code.shareText}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 text-xs"
                onClick={copyShareText}
              >
                {copiedText ? <Check className="size-3.5 text-green-600" /> : <Copy className="size-3.5" />}
                Copy Text
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 text-xs"
                onClick={copyLink}
              >
                {copiedLink ? <Check className="size-3.5 text-green-600" /> : <LinkIcon className="size-3.5" />}
                Copy Link
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 text-xs"
              >
                <Share2 className="size-3.5" />
                Share
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function EmptyState() {
  return (
    <Card className="bg-white border-border/50">
      <CardContent className="py-12 text-center">
        <div className="flex justify-center mb-4">
          <div className="size-16 rounded-full bg-lavender flex items-center justify-center">
            <Tag className="size-8 text-navy" />
          </div>
        </div>
        <h3 className="text-lg font-bold text-dark-navy mb-2">No codes assigned yet</h3>
        <p className="text-sm text-muted-foreground max-w-xs mx-auto">
          Contact your brand manager to get your promotional code set up.
        </p>
      </CardContent>
    </Card>
  )
}

export default function PromoterCodesPage() {
  const activeCodes = promoterCodes.filter(c => c.status === "active")
  const expiredCodes = promoterCodes.filter(c => c.status !== "active")

  if (promoterCodes.length === 0) {
    return (
      <div className="p-4 space-y-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-dark-navy">My Codes</h1>
          <p className="text-sm text-muted-foreground">Your promotional discount codes</p>
        </div>
        <EmptyState />
      </div>
    )
  }

  return (
    <div className="p-4 space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-dark-navy">My Codes</h1>
        <p className="text-sm text-muted-foreground">
          {activeCodes.length} active code{activeCodes.length !== 1 ? "s" : ""}
          {expiredCodes.length > 0 && ` • ${expiredCodes.length} expired`}
        </p>
      </div>

      {/* Active Codes */}
      {activeCodes.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold text-dark-navy mb-3 flex items-center gap-2">
            <span className="size-2 rounded-full bg-green-500"></span>
            Active Codes
          </h2>
          <div className="space-y-4">
            {activeCodes.map((code) => (
              <CodeCard key={code.id} code={code} />
            ))}
          </div>
        </section>
      )}

      {/* Expired/Inactive Codes */}
      {expiredCodes.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
            <span className="size-2 rounded-full bg-gray-400"></span>
            Expired Codes
          </h2>
          <div className="space-y-4">
            {expiredCodes.map((code) => (
              <CodeCard key={code.id} code={code} isExpired />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
