"use client"

import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from "react"
import { affiliateApi } from "@/lib/api-client"
import { useRouter } from "next/navigation"

export interface Brand {
  id: string
  name: string
  slug: string
  logoUrl?: string
  commissionRate: number
  status: string
}

export interface AffiliateUser {
  id: string
  name: string
  email: string
  role: string
  affiliateType: string  // 'L1_AFFILIATE' | 'L2_AFFILIATE'
  brands: Brand[]
  selectedBrandId: string | null
}

interface AffiliateContextType {
  user: AffiliateUser | null
  isLoading: boolean
  selectedBrandId: string | null
  selectBrand: (brandId: string | null) => void
  getSelectedBrand: () => Brand | null
  getVisibleBrands: () => Brand[]
  refreshProfile: () => Promise<void>
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
}

const AffiliateContext = createContext<AffiliateContextType | null>(null)

export function AffiliateProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [state, setState] = useState<{
    user: AffiliateUser | null;
    selectedBrandId: string | null;
    isLoading: boolean;
  }>({
    user: null,
    selectedBrandId: null,
    isLoading: true,
  })

  const fetchProfile = useCallback(async () => {
    try {
      const profile = await affiliateApi.getProfile()
      const mapped: AffiliateUser = {
        id: profile.id || '',
        name: profile.fullName || profile.name || profile.email,
        email: profile.email,
        role: profile.role,
        affiliateType: profile.affiliateType || profile.role,
        brands: (profile.brands || []).map((b: any) => ({
          id: b.brandId || b.id,
          name: b.brand?.name || b.name,
          slug: b.brand?.slug || b.slug || '',
          logoUrl: b.brand?.logoUrl || b.logoUrl,
          commissionRate: b.commissionRate ?? 0,
          status: b.status || 'ACTIVE',
        })),
        selectedBrandId: profile.selectedBrandId ?? null,
      }

      // Determine initial brand
      let brandId = null
      const storedBrandId = localStorage.getItem("affiliate_brand_id")
      if (storedBrandId && mapped.brands.find(b => b.id === storedBrandId)) {
        brandId = storedBrandId
      } else if (mapped.selectedBrandId) {
        brandId = mapped.selectedBrandId
      } else if (mapped.brands.length > 0) {
        brandId = mapped.brands[0].id
      }

      setState({
        user: mapped,
        selectedBrandId: brandId,
        isLoading: false,
      })
    } catch (err) {
      // Not authenticated — context just stays empty, middleware will handle redirect
      setState(prev => ({ ...prev, user: null, isLoading: false }))
    }
  }, [])

  const handleLogin = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      await affiliateApi.login({ email, password })
      await fetchProfile()
      return true
    } catch (err) {
      console.error("Affiliate login failed:", err)
      return false
    }
  }, [fetchProfile])

  const handleLogout = useCallback(async () => {
    try {
      await affiliateApi.logout()
    } catch (err) {
      console.error("Logout failed API side:", err)
    } finally {
      const { logout: clearLocalData } = await import("@/lib/api-client")
      clearLocalData()
      setState({
        user: null,
        selectedBrandId: null,
        isLoading: false,
      })
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.pathname === '/affiliate/login') {
      setState(prev => ({ ...prev, isLoading: false }));
      return;
    }
    fetchProfile()
  }, [fetchProfile])

  const selectBrand = useCallback((brandId: string | null) => {
    setState(prev => ({ ...prev, selectedBrandId: brandId }))
    if (brandId) {
      localStorage.setItem("affiliate_brand_id", brandId)
      affiliateApi.selectBrand(brandId).catch(() => { })
    } else {
      localStorage.removeItem("affiliate_brand_id")
    }
  }, [])

  const getSelectedBrand = useCallback((): Brand | null => {
    const { user, selectedBrandId } = state
    if (!user) return null
    if (!selectedBrandId) return user.brands[0] ?? null
    return user.brands.find(b => b.id === selectedBrandId) ?? null
  }, [state.user, state.selectedBrandId])

  const getVisibleBrands = useCallback((): Brand[] => {
    return state.user?.brands || []
  }, [state.user])

  const value = useMemo(() => ({
    user: state.user,
    isLoading: state.isLoading,
    selectedBrandId: state.selectedBrandId,
    selectBrand,
    getSelectedBrand,
    getVisibleBrands,
    refreshProfile: fetchProfile,
    login: handleLogin,
    logout: handleLogout,
  }), [
    state.user,
    state.isLoading,
    state.selectedBrandId,
    selectBrand,
    getSelectedBrand,
    getVisibleBrands,
    fetchProfile,
    handleLogin,
    handleLogout
  ])

  return (
    <AffiliateContext.Provider value={value}>
      {children}
    </AffiliateContext.Provider>
  )
}

export function useAffiliate() {
  const context = useContext(AffiliateContext)
  if (!context) {
    throw new Error("useAffiliate must be used within AffiliateProvider")
  }
  return context
}

export function useOptionalAffiliate() {
  return useContext(AffiliateContext)
}
