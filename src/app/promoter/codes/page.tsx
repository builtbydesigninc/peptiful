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
    <div className={`relative rounded-2xl border overflow-hidden ${
      isExpired 
        ? "border-white/[0.05] bg-white/[0.01] opacity-70" 
        : "border-white/[0.08] bg-white/[0.02] border-gradient"
    }`}>
      <div className="p-5 sm:p-6">
        {/* Code Header */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <button
            onClick={copyCode}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-mono text-xl sm:text-2xl font-bold transition-all ${
              isExpired 
                ? "bg-white/5 text-white/40"
                : "bg-gradient-to-r from-coral to-pink-500 text-white shadow-lg shadow-coral/20 hover:shadow-xl hover:shadow-coral/30"
            }`}
          >
            {copied ? (
              <>
                <Check className="size-5" />
                Copied!
              </>
            ) : (
              <>
                {code.code}
                <Copy className="size-5 opacity-70" />
              </>
            )}
          </button>
          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ring-1 ring-inset ${
            code.status === "active" 
              ? "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20" 
              : "bg-white/5 text-white/40 ring-white/10"
          }`}>
            <span className={`h-1.5 w-1.5 rounded-full ${code.status === "active" ? "bg-emerald-400" : "bg-white/40"}`} />
            {code.status === "active" ? "Active" : "Expired"}
          </span>
        </div>

        {/* Discount & Expiry */}
        <div className="flex flex-wrap items-center gap-3 text-sm mb-5">
          <span className={`font-semibold ${isExpired ? "text-white/40" : "text-white"}`}>{code.discount}</span>
          <span className="text-white/20">•</span>
          {code.expires ? (
            <span className="flex items-center gap-1.5 text-white/40">
              <Calendar className="size-3.5" />
              {isExpired ? `Expired ${code.expires}` : `Expires ${code.expires}`}
            </span>
          ) : (
            <span className="text-white/40">No expiry</span>
          )}
        </div>

        {/* Usage Progress */}
        <div className="mb-5">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-white/40">Usage</span>
            <span className={`font-medium ${isExpired ? "text-white/40" : "text-white"}`}>
              {code.uses}{code.limit ? ` / ${code.limit}` : ""} uses
            </span>
          </div>
          {code.limit && (
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  usagePercent >= 90 
                    ? "bg-coral" 
                    : isExpired 
                      ? "bg-white/20" 
                      : "bg-gradient-to-r from-sky-500 to-navy"
                }`}
                style={{ width: `${Math.min(usagePercent, 100)}%` }}
              />
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className={`p-4 rounded-xl ${isExpired ? "bg-white/[0.02]" : "bg-white/[0.04]"}`}>
            <p className="text-xs text-white/40 mb-1">Revenue Generated</p>
            <p className={`font-bricolage text-lg sm:text-xl font-semibold ${isExpired ? "text-white/50" : "text-white"}`}>{code.revenue}</p>
          </div>
          <div className={`p-4 rounded-xl ${isExpired ? "bg-white/[0.02]" : "bg-coral/10 border border-coral/10"}`}>
            <p className="text-xs text-white/40 mb-1">My Earnings</p>
            <p className={`font-bricolage text-lg sm:text-xl font-semibold ${isExpired ? "text-white/50" : "text-coral"}`}>{code.earnings}</p>
          </div>
        </div>

        {/* Share Section (only for active codes) */}
        {!isExpired && code.shareText && (
          <div className="pt-5 border-t border-white/[0.06]">
            <p className="text-xs font-semibold text-white/70 mb-3 flex items-center gap-2">
              <Share2 className="size-3.5" />
              Share Your Code
            </p>
            <div className="p-4 bg-white/[0.03] border border-white/[0.06] rounded-xl mb-4">
              <p className="text-sm text-white/70">{code.shareText}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={copyShareText}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-all"
              >
                {copiedText ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
                Copy Text
              </button>
              <button
                onClick={copyLink}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-all"
              >
                {copiedLink ? <Check className="size-4 text-emerald-400" /> : <LinkIcon className="size-4" />}
                Copy Link
              </button>
              <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-all">
                <Share2 className="size-4" />
                Share
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] border-gradient">
      <div className="py-16 text-center">
        <div className="flex justify-center mb-4">
          <div className="size-16 rounded-2xl bg-gradient-to-br from-coral/20 to-pink-500/10 flex items-center justify-center">
            <Tag className="size-8 text-coral" />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">No codes assigned yet</h3>
        <p className="text-sm text-white/40 max-w-xs mx-auto">
          Contact your brand manager to get your promotional code set up.
        </p>
      </div>
    </div>
  )
}

export default function PromoterCodesPage() {
  const activeCodes = promoterCodes.filter(c => c.status === "active")
  const expiredCodes = promoterCodes.filter(c => c.status !== "active")

  if (promoterCodes.length === 0) {
    return (
      <div className="min-h-full text-white">
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(235,92,106,0.06),transparent)]" />
        </div>
        <div className="p-4 sm:p-6 lg:p-8 space-y-6">
          <div>
            <h1 className="font-bricolage text-2xl font-semibold text-white">My Codes</h1>
            <p className="text-sm text-white/50 mt-1">Your promotional discount codes</p>
          </div>
          <EmptyState />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-full text-white">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(235,92,106,0.06),transparent)]" />
      </div>

      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-bricolage text-2xl font-semibold text-white">My Codes</h1>
          <p className="text-sm text-white/50 mt-1">
            {activeCodes.length} active code{activeCodes.length !== 1 ? "s" : ""}
            {expiredCodes.length > 0 && ` • ${expiredCodes.length} expired`}
          </p>
        </div>

        {/* Active Codes */}
        {activeCodes.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <span className="flex size-5 items-center justify-center rounded-full bg-emerald-500/20">
                <span className="size-2 rounded-full bg-emerald-400" />
              </span>
              Active Codes
            </h2>
            <div className="grid gap-4 lg:grid-cols-2">
              {activeCodes.map((code) => (
                <CodeCard key={code.id} code={code} />
              ))}
            </div>
          </section>
        )}

        {/* Expired/Inactive Codes */}
        {expiredCodes.length > 0 && (
          <section className="pt-4">
            <h2 className="text-sm font-semibold text-white/50 mb-4 flex items-center gap-2">
              <span className="flex size-5 items-center justify-center rounded-full bg-white/10">
                <span className="size-2 rounded-full bg-white/40" />
              </span>
              Expired Codes
            </h2>
            <div className="grid gap-4 lg:grid-cols-2">
              {expiredCodes.map((code) => (
                <CodeCard key={code.id} code={code} isExpired />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
