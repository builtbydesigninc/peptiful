'use client';

import React, { useEffect, useState } from 'react';
import {
    RiSearchLine,
    RiFilter3Line,
    RiArrowRightLine,
    RiFlaskLine,
    RiPrinterLine,
    RiTruckLine
} from '@remixicon/react';
import { labApi } from '@/lib/api-client';
import { Button } from '@/components/ui/button-new';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { cn } from '@/utils/cn';

export default function LabPurchaseOrders() {
    const [purchaseOrders, setPurchaseOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('all');
    const [search, setSearch] = useState('');

    const fetchPOs = async () => {
        setLoading(true);
        try {
            const data = await labApi.getPurchaseOrders({ status, search });
            setPurchaseOrders(data.data || []);
        } catch (error) {
            console.error('Failed to fetch POs:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPOs();
    }, [status]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchPOs();
    };

    const statusFilters = [
        { id: 'all', label: 'All Orders' },
        { id: 'pending', label: 'Pending' },
        { id: 'in_production', label: 'In Production' },
        { id: 'ready_to_ship', label: 'Ready to Ship' },
        { id: 'shipped', label: 'Shipped' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-text-strong-950">Purchase Orders</h1>
                    <p className="text-paragraph-sm text-text-sub-600">Review and fulfill replenishment requests from brands.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="secondary" onClick={() => fetchPOs()} className="rounded-xl">
                        Refresh
                    </Button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div className="flex flex-wrap gap-2">
                    {statusFilters.map((f) => (
                        <button
                            key={f.id}
                            onClick={() => setStatus(f.id)}
                            className={cn(
                                "px-4 py-2 rounded-xl text-label-xs font-bold transition-all",
                                status === f.id
                                    ? "bg-primary-base text-white shadow-lg shadow-primary-alpha-20"
                                    : "bg-white border border-stroke-soft-200 text-text-sub-600 hover:bg-bg-weak-50"
                            )}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                <form onSubmit={handleSearch} className="relative w-full lg:w-96">
                    <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-disabled-300" />
                    <Input
                        placeholder="Search PO # or Product..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 h-11 rounded-xl border-stroke-soft-200"
                    />
                </form>
            </div>

            <div className="rounded-[2rem] border border-stroke-soft-200 bg-bg-white-0 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-bg-weak-50 border-b border-stroke-soft-200">
                            <th className="px-8 py-5 text-paragraph-xs font-black text-text-sub-600 uppercase tracking-[0.2em]">PO Reference</th>
                            <th className="px-8 py-5 text-paragraph-xs font-black text-text-sub-600 uppercase tracking-[0.2em]">Brand</th>
                            <th className="px-8 py-5 text-paragraph-xs font-black text-text-sub-600 uppercase tracking-[0.2em]">Items</th>
                            <th className="px-8 py-5 text-paragraph-xs font-black text-text-sub-600 uppercase tracking-[0.2em]">Status</th>
                            <th className="px-8 py-5 text-paragraph-xs font-black text-text-sub-600 uppercase tracking-[0.2em] text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stroke-soft-200">
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="px-8 py-20 text-center text-text-disabled-300">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="size-6 border-2 border-primary-base border-t-transparent animate-spin rounded-full" />
                                        <span className="text-label-sm">Loading Production Data...</span>
                                    </div>
                                </td>
                            </tr>
                        ) : purchaseOrders.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-8 py-20 text-center text-text-disabled-300">
                                    No purchase orders found matching your criteria.
                                </td>
                            </tr>
                        ) : (
                            purchaseOrders.map((po) => (
                                <tr key={po.id} className="hover:bg-bg-weak-50 transition-colors group">
                                    <td className="px-8 py-5">
                                        <p className="text-label-sm text-text-strong-950 font-bold">#{po.orderNumber || po.id.slice(0, 8).toUpperCase()}</p>
                                        <p className="text-paragraph-xs text-text-sub-600 mt-1">{new Date(po.createdAt).toLocaleDateString()}</p>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="size-8 rounded-lg bg-bg-weak-100 flex items-center justify-center text-text-soft-400">
                                                {po.brand?.logoUrl ? <img src={po.brand.logoUrl} className="size-5 object-contain" /> : <RiFlaskLine className="size-4" />}
                                            </div>
                                            <span className="text-label-sm font-bold text-text-strong-950">{po.brand?.name || 'Unknown Brand'}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className="text-label-sm text-text-strong-950 font-bold">{po.items?.length || 0} Products</span>
                                        <p className="text-paragraph-xs text-text-sub-600 mt-0.5 truncate max-w-[200px]">
                                            {po.items?.map((i: any) => i.product?.name).join(', ')}
                                        </p>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className={cn(
                                            "rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-widest inline-flex items-center",
                                            po.status === 'PENDING' ? 'bg-amber-100 text-amber-700' :
                                                po.status === 'IN_PRODUCTION' ? 'bg-blue-100 text-blue-700' :
                                                    po.status === 'READY_TO_SHIP' ? 'bg-indigo-100 text-indigo-700' :
                                                        po.status === 'SHIPPED' ? 'bg-emerald-100 text-emerald-700' :
                                                            'bg-gray-100 text-gray-700'
                                        )}>
                                            {po.status === 'READY_TO_SHIP' && <RiTruckLine className="size-3 mr-1" />}
                                            {po.status.replace(/_/g, ' ')}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <Link href={`/lab/purchase-orders/${po.id}`}>
                                            <Button variant="ghost" className="rounded-xl px-4 text-primary-base font-bold group-hover:bg-primary-alpha-10 transition-all">
                                                Process Order <RiArrowRightLine className="size-4 ml-1.5" />
                                            </Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
