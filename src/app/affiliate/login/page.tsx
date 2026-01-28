"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
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
    <div className="min-h-screen bg-lavender flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo & Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Logo size="lg" />
          </div>
          <h1 className="text-2xl font-bold text-dark-navy">Affiliate Portal</h1>
          <p className="text-muted-foreground mt-2">
            Sign in to manage your brands and earnings
          </p>
        </div>

        {/* Login Card */}
        <Card className="bg-white border-border/50 shadow-lg">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3 rounded-lg bg-coral/10 border border-coral/30 text-coral text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-dark-navy"
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
                  <input type="checkbox" className="rounded border-border" />
                  <span className="text-muted-foreground">Remember me</span>
                </label>
                <a href="#" className="text-navy hover:underline">
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                variant="default"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Accounts */}
        <Card className="bg-white/60 border-border/30">
          <CardContent className="p-4">
            <p className="text-xs font-semibold text-dark-navy mb-2">Demo Accounts</p>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex justify-between p-2 bg-lavender/50 rounded">
                <span className="font-mono">affiliate@builtbydesign.com</span>
                <span className="text-navy font-medium">Affiliate</span>
              </div>
              <div className="flex justify-between p-2 bg-lavender/50 rounded">
                <span className="font-mono">brand@houseofaminos.com</span>
                <span className="text-navy font-medium">Brand</span>
              </div>
              <div className="flex justify-between p-2 bg-lavender/50 rounded">
                <span className="font-mono">brand@tpm.com</span>
                <span className="text-navy font-medium">Brand</span>
              </div>
              <p className="text-center pt-1 opacity-70">Password: any 4+ characters</p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground">
          Need help? Contact{" "}
          <a href="mailto:support@peptiful.com" className="text-navy hover:underline">
            support@peptiful.com
          </a>
        </p>
      </div>
    </div>
  )
}
