"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export type UserRole = "affiliate" | "brand"

export interface Brand {
  id: string
  name: string
  storeUrl: string
  status: "connected" | "disconnected"
  ordersToday: number
  revenue: string
  commission: string
}

export interface AffiliateUser {
  id: string
  name: string
  email: string
  role: UserRole
  // For affiliates: all brands they own
  // For brands: just their single brand
  brands: Brand[]
  // Currently selected brand (null = all brands for affiliates)
  selectedBrandId: string | null
}

// Mock data
const mockBrands: Brand[] = [
  {
    id: "hoa",
    name: "House of Aminos",
    storeUrl: "houseofaminos.com",
    status: "connected",
    ordersToday: 12,
    revenue: "$45,231",
    commission: "$4,523",
  },
  {
    id: "tpm",
    name: "TPM",
    storeUrl: "tpm-peptides.com",
    status: "connected",
    ordersToday: 8,
    revenue: "$28,450",
    commission: "$2,845",
  },
  {
    id: "ps",
    name: "Peptide Sciences",
    storeUrl: "peptidesciences.com",
    status: "disconnected",
    ordersToday: 0,
    revenue: "$0",
    commission: "$0",
  },
]

const mockUsers: Record<string, AffiliateUser> = {
  "affiliate@builtbydesign.com": {
    id: "aff-1",
    name: "Built by Design",
    email: "affiliate@builtbydesign.com",
    role: "affiliate",
    brands: mockBrands,
    selectedBrandId: null,
  },
  "brand@houseofaminos.com": {
    id: "brand-hoa",
    name: "House of Aminos",
    email: "brand@houseofaminos.com",
    role: "brand",
    brands: [mockBrands[0]],
    selectedBrandId: "hoa",
  },
  "brand@tpm.com": {
    id: "brand-tpm",
    name: "TPM",
    email: "brand@tpm.com",
    role: "brand",
    brands: [mockBrands[1]],
    selectedBrandId: "tpm",
  },
}

interface AffiliateContextType {
  user: AffiliateUser | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  selectBrand: (brandId: string | null) => void
  getSelectedBrand: () => Brand | null
  getVisibleBrands: () => Brand[]
}

const AffiliateContext = createContext<AffiliateContextType | null>(null)

export function AffiliateProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AffiliateUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored session
    const stored = localStorage.getItem("affiliate_user")
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch {
        localStorage.removeItem("affiliate_user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((r) => setTimeout(r, 800))
    
    const mockUser = mockUsers[email.toLowerCase()]
    if (mockUser && password.length >= 4) {
      setUser(mockUser)
      localStorage.setItem("affiliate_user", JSON.stringify(mockUser))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("affiliate_user")
  }

  const selectBrand = (brandId: string | null) => {
    if (!user || user.role === "brand") return // Brands can't switch
    
    const updated = { ...user, selectedBrandId: brandId }
    setUser(updated)
    localStorage.setItem("affiliate_user", JSON.stringify(updated))
  }

  const getSelectedBrand = (): Brand | null => {
    if (!user) return null
    if (user.role === "brand") return user.brands[0]
    if (!user.selectedBrandId) return null
    return user.brands.find((b) => b.id === user.selectedBrandId) || null
  }

  const getVisibleBrands = (): Brand[] => {
    if (!user) return []
    return user.brands
  }

  return (
    <AffiliateContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        selectBrand,
        getSelectedBrand,
        getVisibleBrands,
      }}
    >
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
