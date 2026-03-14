'use client';

import React, { useEffect, useState } from 'react';
import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/utils/cn';
import { storefrontApi, logout as apiLogout } from '@/lib/api-client';
import {
    RiUser3Line,
    RiShoppingBag3Line,
    RiMapPin2Line,
    RiLogoutBoxLine,
    RiArrowRightSLine
} from '@remixicon/react';

export default function AccountLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { slug } = useParams();
    const pathname = usePathname();
    const [name, setName] = useState('Partner');

    useEffect(() => {
        storefrontApi.getAccount(slug as string)
            .then(data => setName(data.name || 'Partner'))
            .catch(() => { });
    }, [slug]);

    const getInitials = (n: string) => {
        return n.split(' ').map(p => p[0]).join('').toUpperCase().slice(0, 2);
    };

    const navItems = [
        { name: 'Overview', href: `/${slug}/account`, icon: RiUser3Line },
        { name: 'Orders', href: `/${slug}/account/orders`, icon: RiShoppingBag3Line },
        { name: 'Addresses', href: `/${slug}/account/addresses`, icon: RiMapPin2Line },
    ];

    const logout = async () => {
        try {
            await storefrontApi.logout(slug as string);
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            apiLogout();
            window.location.href = `/${slug}/login`;
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen pt-8 pb-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row lg:gap-12">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-64 shrink-0 space-y-1 mb-8 lg:mb-0">
                        <div className="px-4 py-8 mb-4 bg-white rounded-3xl border border-gray-100 shadow-sm shadow-gray-200/50">
                            <div className="flex items-center space-x-3">
                                <div className="size-10 rounded-full bg-primary-base flex items-center justify-center text-white text-xs font-black">
                                    {getInitials(name)}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900 leading-none truncate max-w-[120px]">{name}</p>
                                    <p className="text-[10px] font-bold text-emerald-500 mt-1 uppercase tracking-widest">Verified Partner</p>
                                </div>
                            </div>
                        </div>

                        <nav className="space-y-1">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "group flex items-center justify-between px-4 py-3 text-sm font-bold rounded-2xl transition-all duration-200",
                                            isActive
                                                ? "bg-gray-900 text-white shadow-lg shadow-gray-200"
                                                : "text-gray-500 hover:bg-white hover:text-gray-900 hover:shadow-sm"
                                        )}
                                    >
                                        <div className="flex items-center">
                                            <item.icon className={cn("size-5 mr-3", isActive ? "text-white" : "text-gray-400 group-hover:text-gray-900")} />
                                            {item.name}
                                        </div>
                                        <RiArrowRightSLine className={cn("size-4", isActive ? "text-white/50" : "text-gray-300")} />
                                    </Link>
                                );
                            })}

                            <button
                                onClick={logout}
                                className="w-full flex items-center px-4 py-3 text-sm font-bold text-red-500 rounded-2xl hover:bg-red-50 transition-colors mt-8"
                            >
                                <RiLogoutBoxLine className="size-5 mr-3" />
                                Sign Out
                            </button>
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/40 p-6 sm:p-10 min-h-[600px]">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
