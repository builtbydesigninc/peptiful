"use client"

import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from "react"
import { adminApi } from "@/lib/api-client"

export interface AdminUser {
    id: string
    name: string
    email: string
    role: string
}

interface AdminContextType {
    user: AdminUser | null
    isLoading: boolean
    refreshProfile: () => Promise<void>
    logout: () => Promise<void>
}

const AdminContext = createContext<AdminContextType | null>(null)

export function AdminProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<{
        user: AdminUser | null;
        isLoading: boolean;
    }>({
        user: null,
        isLoading: true,
    })

    const fetchProfile = useCallback(async () => {
        try {
            // Don't auto-fetch profile if we're on a login page to avoid loops
            // (Though admin doesn't have a separate /admin/login usually, it's just /login)
            if (typeof window !== 'undefined' && window.location.pathname === '/login') {
                setState({ user: null, isLoading: false });
                return;
            }

            const profile = await adminApi.getMe()
            setState({
                user: {
                    id: profile.id,
                    name: profile.fullName || profile.name || profile.email,
                    email: profile.email,
                    role: profile.role,
                },
                isLoading: false,
            })
        } catch (err) {
            setState({ user: null, isLoading: false })
        }
    }, [])

    const handleLogout = useCallback(async () => {
        try {
            await adminApi.logout()
        } catch (err) {
            console.error("Logout failed API side:", err)
        } finally {
            const { logout: clearLocalData } = await import("@/lib/api-client")
            clearLocalData()
            setState({
                user: null,
                isLoading: false,
            })
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
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    )
}

export function useAdmin() {
    const context = useContext(AdminContext)
    if (!context) {
        throw new Error("useAdmin must be used within AdminProvider")
    }
    return context
}

export function useOptionalAdmin() {
    return useContext(AdminContext)
}
