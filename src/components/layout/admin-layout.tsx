"use client"

import { AdminSidebar } from "./admin-sidebar"

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#050510]">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto scrollbar-dark">
        {children}
      </main>
    </div>
  )
}
