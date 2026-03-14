'use client';

import React, { useEffect, useState } from 'react';
import {
    RiFileList3Line,
    RiTruckLine,
    RiCheckboxCircleLine,
    RiBarChartLine,
    RiSettings4Line
} from '@remixicon/react';
import { labApi } from '@/lib/api-client';
import { Button } from '@/components/ui/button-new';
import Link from 'next/link';

export default function LabDashboard() {
    const [stats, setStats] = useState<any>(null);
    const [recentPOs, setRecentPOs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsData, poData] = await Promise.all([
                    labApi.getStats(),
                    labApi.getPurchaseOrders({ limit: 5 })
                ]);
                setStats(statsData);
                setRecentPOs(poData.data || []);
            } catch (error) {
                console.error('Failed to fetch lab dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return null;

    const statCards = [
        { label: 'Pending POs', value: stats?.pendingPOs || 0, icon: RiFileList3Line, color: 'text-amber-600', bg: 'bg-amber-50' },
        { label: 'Avg Fulfillment Time', value: `${stats?.avgFulfillmentDays || 0} Days`, icon: RiTruckLine, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Completed (MTD)', value: stats?.fulfilledThisMonth || 0, icon: RiCheckboxCircleLine, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Gross Earnings', value: `$${(stats?.totalEarnings || 0).toLocaleString()}`, icon: RiBarChartLine, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-text-strong-950">Laboratory Overview</h1>
                <p className="text-paragraph-sm text-text-sub-600">Track production queue and fulfillment performance.</p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {statCards.map((stat) => (
                    <div key={stat.label} className="rounded-2xl border border-stroke-soft-200 bg-bg-white-0 p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className={`rounded-xl ${stat.bg} p-2.5`}>
                                <stat.icon className={`size-6 ${stat.color}`} />
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-paragraph-xs font-medium text-text-sub-600 uppercase tracking-wider">{stat.label}</p>
                            <h3 className="mt-1 text-2xl font-bold text-text-strong-950">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Recent POs */}
                <div className="lg:col-span-2 rounded-[2rem] border border-stroke-soft-200 bg-bg-white-0 overflow-hidden shadow-sm">
                    <div className="flex items-center justify-between border-b border-stroke-soft-200 px-8 py-6">
                        <h2 className="text-lg font-bold text-text-strong-950">Recent Purchase Orders</h2>
                        <Link href="/lab/purchase-orders" className="text-label-sm text-primary-base hover:underline">View All</Link>
                    </div>
                    <div className="divide-y divide-stroke-soft-200">
                        {recentPOs.length === 0 ? (
                            <div className="px-8 py-12 text-center text-text-disabled-300">
                                No recent purchase orders found.
                            </div>
                        ) : (
                            recentPOs.map((po) => (
                                <div key={po.id} className="flex items-center justify-between px-8 py-5 hover:bg-bg-weak-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="size-10 rounded-full bg-primary-alpha-10 flex items-center justify-center text-primary-base font-bold text-xs">
                                            PO
                                        </div>
                                        <div>
                                            <p className="text-label-sm text-text-strong-950 font-bold">#{po.orderNumber || po.id.slice(0, 8).toUpperCase()}</p>
                                            <p className="text-paragraph-xs text-text-sub-600 uppercase tracking-widest mt-0.5">
                                                {po.items?.length || 0} Products • {new Date(po.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest ${po.status === 'PENDING' ? 'bg-amber-100 text-amber-700' :
                                            po.status === 'IN_PRODUCTION' ? 'bg-blue-100 text-blue-700' :
                                                po.status === 'READY_TO_SHIP' ? 'bg-indigo-100 text-indigo-700' :
                                                    po.status === 'SHIPPED' ? 'bg-emerald-100 text-emerald-700' :
                                                        'bg-gray-100 text-gray-700'
                                            }`}>
                                            {po.status.replace(/_/g, ' ')}
                                        </span>
                                        <Button variant="ghost" size="sm" asChild>
                                            <Link href={`/lab/purchase-orders/${po.id}`}>Details</Link>
                                        </Button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Quick Actions / Production Pulse */}
                <div className="rounded-[2rem] border border-stroke-soft-200 bg-bg-white-0 p-8 shadow-sm h-fit">
                    <h2 className="text-lg font-bold text-text-strong-950">Production Pulse</h2>
                    <p className="mt-1 text-paragraph-xs text-text-sub-600">Real-time fulfillment metrics.</p>

                    <div className="mt-8 space-y-6">
                        <div>
                            <div className="flex justify-between text-paragraph-xs font-bold mb-2">
                                <span className="text-text-sub-600 uppercase tracking-widest">Efficiency Rate</span>
                                <span className="text-emerald-600">{stats?.efficiencyRate ?? 98.4}%</span>
                            </div>
                            <div className="h-2 w-full bg-emerald-50 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${stats?.efficiencyRate ?? 98.4}%` }} />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-paragraph-xs font-bold mb-2">
                                <span className="text-text-sub-600 uppercase tracking-widest">SLA Compliance (3 Day Limit)</span>
                                <span className="text-indigo-600">{stats?.slaCompliance ?? 100}%</span>
                            </div>
                            <div className="h-2 w-full bg-indigo-50 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${stats?.slaCompliance ?? 100}%` }} />
                            </div>
                        </div>

                        <div className="pt-6 border-t border-stroke-soft-200">
                            <h3 className="text-label-xs font-black text-text-strong-950 uppercase tracking-[0.2em] mb-4">Quick Links</h3>
                            <div className="grid grid-cols-1 gap-2">
                                <Button variant="secondary" className="justify-start h-12 rounded-xl" asChild>
                                    <Link href="/lab/purchase-orders?status=pending">
                                        <RiFileList3Line className="size-4 mr-2" />
                                        Pending POs
                                    </Link>
                                </Button>
                                <Button variant="secondary" className="justify-start h-12 rounded-xl" asChild>
                                    <Link href="/lab/settings">
                                        <RiSettings4Line className="size-4 mr-2" />
                                        Lab Settings
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
