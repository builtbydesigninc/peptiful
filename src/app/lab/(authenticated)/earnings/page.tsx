'use client';

import React, { useEffect, useState } from 'react';
import {
    RiBarChartLine,
    RiWallet3Line,
    RiArrowRightUpLine,
    RiDownloadLine,
    RiCheckboxCircleLine,
    RiTimeLine
} from '@remixicon/react';
import { labApi } from '@/lib/api-client';
import { Button } from '@/components/ui/button-new';
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';

export default function LabEarnings() {
    const [stats, setStats] = useState<any>(null);
    const [monthlyData, setMonthlyData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEarnings = async () => {
            try {
                const [statsData, monthly] = await Promise.all([
                    labApi.getEarningsStats(),
                    labApi.getMonthlyEarnings()
                ]);
                setStats(statsData);
                setMonthlyData(monthly || []);
            } catch (error) {
                console.error('Failed to fetch earnings data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchEarnings();
    }, []);

    if (loading) return null;

    const topStats = [
        { label: 'Total Earned', value: `$${(stats?.totalEarned ?? 0).toLocaleString()}`, icon: RiBarChartLine, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { label: 'This Month', value: `$${(stats?.thisMonth ?? 0).toLocaleString()}`, icon: RiArrowRightUpLine, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Pending Payout', value: `$${(stats?.pendingPayout ?? 0).toLocaleString()}`, icon: RiWallet3Line, color: 'text-amber-600', bg: 'bg-amber-50' },
        { label: 'POs This Month', value: monthlyData.length > 0 ? monthlyData[0]?.poCount ?? 0 : 0, icon: RiTimeLine, color: 'text-blue-600', bg: 'bg-blue-50' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-text-strong-950">Earnings Management</h1>
                    <p className="text-paragraph-sm text-text-sub-600">Monitor production revenue and settlement history.</p>
                </div>
                <Button variant="secondary" className="rounded-xl" onClick={() => window.open(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/lab/earnings/export`, '_blank')}>
                    <RiDownloadLine className="size-4 mr-2" />
                    Export CSV
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {topStats.map((stat) => (
                    <div key={stat.label} className="rounded-2xl border border-stroke-soft-200 bg-bg-white-0 p-6 shadow-sm shadow-gray-200/50">
                        <div className={`size-10 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color} mb-4`}>
                            <stat.icon className="size-5" />
                        </div>
                        <p className="text-paragraph-xs font-black uppercase tracking-[0.2em] text-text-sub-600">{stat.label}</p>
                        <h3 className="mt-1 text-2xl font-bold text-text-strong-950">{stat.value}</h3>
                    </div>
                ))}
            </div>

            <div className="rounded-[2.5rem] border border-stroke-soft-200 bg-bg-white-0 p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-lg font-bold text-text-strong-950">Revenue Performance</h2>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5 mr-4">
                            <div className="size-2 rounded-full bg-primary-base" />
                            <span className="text-paragraph-xs font-bold text-text-sub-600 uppercase tracking-widest">Gross Revenue</span>
                        </div>
                    </div>
                </div>

                {monthlyData.length > 0 ? (
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={monthlyData}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 700 }}
                                    dy={10}
                                    tickFormatter={(value: string) => {
                                        const d = new Date(value);
                                        return d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
                                    }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 700 }}
                                    tickFormatter={(value: number) => `$${value / 1000}k`}
                                />
                                <Tooltip
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    itemStyle={{ fontSize: '12px', fontWeight: 700 }}
                                    formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Revenue']}
                                    labelFormatter={(label: any) => {
                                        const d = new Date(String(label));
                                        return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="total"
                                    stroke="#4F46E5"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorRevenue)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <div className="h-[200px] flex items-center justify-center text-text-disabled-300">
                        <p className="text-label-sm">No revenue data available yet. Earnings will appear here once purchase orders are fulfilled.</p>
                    </div>
                )}
            </div>

            {/* Monthly Breakdown Table */}
            {monthlyData.length > 0 && (
                <div className="rounded-[2rem] border border-stroke-soft-200 bg-bg-white-0 overflow-hidden shadow-sm">
                    <div className="px-8 py-6 border-b border-stroke-soft-200">
                        <h2 className="text-lg font-bold text-text-strong-950">Monthly Breakdown</h2>
                    </div>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-bg-weak-50 border-b border-stroke-soft-200">
                                <th className="px-8 py-4 text-paragraph-xs font-black text-text-sub-600 uppercase tracking-[0.2em]">Month</th>
                                <th className="px-8 py-4 text-paragraph-xs font-black text-text-sub-600 uppercase tracking-[0.2em]">POs Fulfilled</th>
                                <th className="px-8 py-4 text-paragraph-xs font-black text-text-sub-600 uppercase tracking-[0.2em] text-right">Revenue</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stroke-soft-200">
                            {monthlyData.map((row, idx) => (
                                <tr key={idx} className="hover:bg-bg-weak-50 transition-colors">
                                    <td className="px-8 py-5 text-label-sm font-bold text-text-strong-950">
                                        {new Date(row.month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                    </td>
                                    <td className="px-8 py-5 text-label-sm text-text-sub-600">
                                        {row.poCount} orders
                                    </td>
                                    <td className="px-8 py-5 text-label-sm font-black text-text-strong-950 text-right">
                                        ${row.total.toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
