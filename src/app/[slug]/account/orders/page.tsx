'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { storefrontApi } from '@/lib/api-client';
import { Badge } from '@/components/ui/badge-new';
import { Button } from '@/components/ui/button-new';
import { RiShoppingBag3Line, RiTimeLine, RiTruckLine, RiArrowRightLine } from '@remixicon/react';
import Link from 'next/link';

export default function OrdersPage() {
    const { slug } = useParams();
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await storefrontApi.getOrders(slug as string);
                setOrders(Array.isArray(res) ? res : (res?.data || []));
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [slug]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-[500px] space-y-4">
                <div className="size-10 animate-spin rounded-full border-4 border-gray-100 border-t-primary-base" />
                <p className="text-sm font-medium text-gray-400 font-mono">Retrieving order history...</p>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[500px] text-center">
                <div className="size-20 bg-gray-50 rounded-[2rem] flex items-center justify-center mb-6">
                    <RiShoppingBag3Line className="size-8 text-gray-300" />
                </div>
                <h2 className="text-2xl font-extrabold text-gray-900">No Orders Yet</h2>
                <p className="mt-2 text-gray-500 max-w-sm mx-auto">
                    You haven't placed any research orders with this brand.
                    Your future purchases will appear here for tracking and COA access.
                </p>
                <Button className="mt-8 rounded-full px-8" asChild>
                    <Link href={`/${slug}/products`}>Explore Catalog</Link>
                </Button>
            </div>
        );
    }

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'confirmed': return 'success';
            case 'pending_payment': return 'warning';
            case 'shipped': return 'information';
            case 'cancelled': return 'error';
            default: return 'gray';
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900">Order History</h1>
                    <p className="mt-1 text-sm text-gray-500">Track shipments and access laboratory documents.</p>
                </div>
            </div>

            <div className="space-y-6 mt-10">
                {orders.map((order) => (
                    <div
                        key={order.id}
                        className="group relative bg-white border border-gray-100 rounded-3xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/40 hover:-translate-y-1"
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center space-x-4">
                                <div className="size-14 rounded-2xl bg-gray-50 flex items-center justify-center">
                                    <RiTimeLine className="size-6 text-gray-400" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight">#{order.orderNumber?.slice(-8).toUpperCase() || 'UNKNOWN'}</h3>
                                    <p className="text-xs font-bold text-gray-400 mt-0.5">
                                        Ordered {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                <Badge variant="light" color={getStatusColor(order.status)} className="px-3 py-1 text-[10px] font-black uppercase tracking-widest">
                                    {order.status.replace('_', ' ')}
                                </Badge>
                                <div className="h-4 w-px bg-gray-100 hidden md:block" />
                                <div className="text-right">
                                    <p className="text-sm font-black text-gray-900">${parseFloat(order.total).toFixed(2)}</p>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{order.itemsCount} items</p>
                                </div>
                                <Button variant="secondary" size="sm" className="ml-4 rounded-xl px-4 group/btn" asChild>
                                    <Link href={`/${slug}/account/orders/${order.id}`}>
                                        Details
                                        <RiArrowRightLine className="ml-2 size-4 transition-transform group-hover/btn:translate-x-1" />
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        {order.status === 'SHIPPED' && order.trackingNumber && (
                            <div className="mt-6 pt-6 border-t border-gray-50 flex items-center text-sm text-emerald-600 font-bold">
                                <RiTruckLine className="size-5 mr-3" />
                                <span>Track Shipment: {order.trackingNumber}</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
