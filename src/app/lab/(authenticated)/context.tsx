"use client"

import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from "react"
import { labApi } from "@/lib/api-client"

export interface LabUser {
    id: string
    name: string
    email: string
    role: string
    labId: string
}

interface LabContextType {
    user: LabUser | null
    isLoading: boolean
    refreshProfile: () => Promise<void>
    logout: () => Promise<void>
}

const LabContext = createContext<LabContextType | null>(null)

export function LabProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<{
        user: LabUser | null;
        isLoading: boolean;
    }>({
        user: null,
        isLoading: true,
    })

    const fetchProfile = useCallback(async () => {
        try {
            const profile = await labApi.getProfile()
            setState({
                user: {
                    id: profile.id,
                    name: profile.name || profile.fullName || profile.email,
                    email: profile.email,
                    role: profile.role,
                    labId: profile.labId || profile.id
                },
                isLoading: false,
            })
        } catch (err) {
            setState({ user: null, isLoading: false })
        }
    }, [])

    const handleLogout = useCallback(async () => {
        try {
            const { logout: clearLocalData } = await import("@/lib/api-client")
            clearLocalData()
            setState({
                user: null,
                isLoading: false,
            })
        } catch (err) {
            console.error("Local logout failed:", err)
        }
    }, [])

    useEffect(() => {
        fetchProfile()
    }, [fetchProfile])

    const value = useMemo(() => ({
        user: state.user,
        isLoading: state.isLoading,
        refreshProfile: fetchProfile,
        logout: handleLogout,
    }), [state.user, state.isLoading, fetchProfile, handleLogout])

    return (
        <LabContext.Provider value={value}>
            {children}
        </LabContext.Provider>
    )
}

export function useLab() {
    const context = useContext(LabContext)
    if (!context) {
        throw new Error("useLab must be used within LabProvider")
    }
    return context
}

export function useOptionalLab() {
    return useContext(LabContext)
}
