'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { storefrontApi } from '@/lib/api-client';
import { Badge } from '@/components/ui/badge-new';
import { Button } from '@/components/ui/button-new';
import {
    RiArrowLeftLine,
    RiTruckLine,
    RiFilePdfLine,
    RiShieldCheckLine,
    RiTimeLine,
    RiArrowRightSLine
} from '@remixicon/react';
import Link from 'next/link';

export default function OrderDetailsPage() {
    const { slug, id } = useParams();
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const data = await storefrontApi.getOrder(slug as string, id as string);
                setOrder(data);
            } catch (error) {
                console.error('Failed to fetch order details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [slug, id]);

    if (loading) return null;
    if (!order) return <div className="p-20 text-center font-bold">Order not found</div>;

    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'confirmed': return 'success';
            case 'pending_payment': return 'warning';
            case 'shipped': return 'information';
            case 'cancelled': return 'error';
            default: return 'gray';
        }
    };

    return (
        <div className="space-y-12 pb-20">
            {/* Header */}
            <div>
                <Link
                    href={`/${slug}/account/orders`}
                    className="flex items-center text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors mb-8"
                >
                    <RiArrowLeftLine className="size-4 mr-2" />
                    Back to History
                </Link>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center space-x-3 mb-2">
                            <h1 className="text-4xl font-black tracking-tight text-gray-900 uppercase">#{order.orderNumber?.slice(-8).toUpperCase()}</h1>
                            <Badge variant="light" color={getStatusColor(order.status)} className="px-4 py-1.5 text-xs font-black uppercase tracking-widest">
                                {order.status?.replace('_', ' ')}
                            </Badge>
                        </div>
                        <p className="text-sm font-medium text-gray-400">
                            Validated on {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </p>
                    </div>

                    <div className="flex items-center space-x-3">
                        <Button variant="secondary" className="rounded-2xl h-12 shadow-sm">
                            <RiFilePdfLine className="size-5 mr-3 text-red-500" />
                            Download Invoice
                        </Button>
                        <Button className="rounded-2xl h-12 shadow-md">
                            <RiShieldCheckLine className="size-5 mr-3" />
                            View COA Findings
                        </Button>
                    </div>
                </div>
            </div>

            {/* Tracking / Status Section */}
            {order.status === 'SHIPPED' && (
                <div className="bg-primary-alpha-8 rounded-[2rem] border border-primary-alpha-16 p-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-start space-x-4">
                            <div className="size-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                                <RiTruckLine className="size-6 text-primary-base" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">In Transit</h3>
                                <p className="text-sm text-gray-500 mt-1">Carrier: FedEx Priority Research Logistics</p>
                                <p className="text-sm font-black text-primary-base mt-2 underline cursor-pointer">Track: {order.trackingNumber || 'RTX-9944-88A'}</p>
                            </div>
                        </div>
                        <RiArrowRightSLine className="size-8 text-primary-alpha-24" />
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left: Items */}
                <div className="lg:col-span-12 space-y-6">
                    <h2 className="text-xl font-extrabold text-gray-900 border-b border-gray-100 pb-4">Order Composition</h2>
                    <div className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden">
                        <div className="divide-y divide-gray-50">
                            {order.items?.map((item: any) => (
                                <div key={item.id} className="p-6 flex items-center justify-between group hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center space-x-6">
                                        <div className="size-20 bg-gray-50 rounded-2xl flex items-center justify-center p-2">
                                            {item.product?.images?.[0] ? (
                                                <img src={item.product?.images?.[0]} className="h-full w-full object-contain" />
                                            ) : (
                                                <RiTimeLine className="size-8 text-gray-300" />
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="text-base font-extrabold text-gray-900 leading-tight">
                                                {item.brandProduct?.customName || item.product?.name}
                                            </h4>
                                            <p className="text-xs font-black text-gray-400 mt-1 flex items-center">
                                                <RiShieldCheckLine className="size-3 mr-1 text-emerald-500" />
                                                BATCH #BV-2024-001X
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black text-gray-900">${parseFloat(item.retailPrice).toFixed(2)}</p>
                                        <p className="text-xs font-bold text-gray-400">Qty: {item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-gray-50 p-8 space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="font-bold text-gray-400">Subtotal</span>
                                <span className="font-black text-gray-900">${parseFloat(order.subtotal).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="font-bold text-gray-400">Shipping</span>
                                <span className="font-bold text-emerald-600">Free</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="font-bold text-gray-400">Taxes ({order.items?.[0]?.taxRate || '8.25'}%)</span>
                                <span className="font-black text-gray-900">${parseFloat(order.taxAmount).toFixed(2)}</span>
                            </div>
                            <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                                <span className="text-xl font-black text-gray-900">Order Total</span>
                                <span className="text-3xl font-black text-gray-900">${parseFloat(order.total).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
