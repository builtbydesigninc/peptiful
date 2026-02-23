"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { PeptifulLogomark } from "@/components/logo"
import { useAffiliate } from "../context"

export default function AffiliateLoginPage() {
  const router = useRouter()
  const { login } = useAffiliate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const success = await login(email, password)
    
    if (success) {
      router.push("/affiliate")
    } else {
      setError("Invalid email or password")
    }
    
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#050510] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(10,69,145,0.15),transparent)]" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(10,69,145,0.1),transparent)]" />
      </div>

      <div className="w-full max-w-md space-y-8">
        {/* Logo & Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <PeptifulLogomark variant="white" className="size-12" />
          </div>
          <h1 className="font-bricolage text-3xl font-bold text-white">Affiliate Portal</h1>
          <p className="text-white/50 mt-2">
            Sign in to manage your brands and earnings
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl shadow-2xl border-gradient overflow-hidden">
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3 rounded-xl bg-coral/10 border border-coral/30 text-coral text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-white/70">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-navy/50 focus:border-navy/50 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-white/70">Password</label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    className="w-full px-4 py-3 pr-12 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-navy/50 focus:border-navy/50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-white/20 bg-white/5 text-navy focus:ring-navy" />
                  <span className="text-white/50">Remember me</span>
                </label>
                <a href="#" className="text-sky-400 hover:text-sky-300 transition-colors">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-navy to-sky-600 px-4 py-3 text-sm font-medium text-white hover:opacity-90 transition-all disabled:opacity-50 shadow-lg shadow-navy/20"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Demo Accounts */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden">
          <div className="p-4">
            <p className="text-xs font-semibold text-white/70 mb-3">Demo Accounts</p>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center p-3 bg-white/[0.03] border border-white/[0.06] rounded-xl">
                <span className="font-mono text-white/60">affiliate@builtbydesign.com</span>
                <span className="text-sky-400 font-medium text-[10px] uppercase tracking-wider">Affiliate</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/[0.03] border border-white/[0.06] rounded-xl">
                <span className="font-mono text-white/60">brand@houseofaminos.com</span>
                <span className="text-sky-400 font-medium text-[10px] uppercase tracking-wider">Brand</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/[0.03] border border-white/[0.06] rounded-xl">
                <span className="font-mono text-white/60">brand@tpm.com</span>
                <span className="text-sky-400 font-medium text-[10px] uppercase tracking-wider">Brand</span>
              </div>
              <p className="text-center pt-2 text-white/30">Password: any 4+ characters</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-white/30">
          Need help? Contact{" "}
          <a href="mailto:support@peptiful.com" className="text-sky-400 hover:text-sky-300 transition-colors">
            support@peptiful.com
          </a>
        </p>
      </div>
    </div>
  )
}
