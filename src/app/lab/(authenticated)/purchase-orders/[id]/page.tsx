'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    RiArrowLeftLine,
    RiPrinterLine,
    RiTruckLine,
    RiCheckboxCircleLine,
    RiFlaskLine,
    RiTimeLine,
    RiMapPin2Line,
    RiFileList3Line,
    RiDownloadLine
} from '@remixicon/react';
import { labApi } from '@/lib/api-client';
import { Button } from '@/components/ui/button-new';
import { Input } from '@/components/ui/input';
import { cn } from '@/utils/cn';

export default function PurchaseOrderDetail() {
    const { id } = useParams();
    const router = useRouter();
    const [po, setPO] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [trackingData, setTrackingData] = useState({ courier: 'FedEx', trackingNumber: '' });
    const [showTrackingForm, setShowTrackingForm] = useState(false);

    useEffect(() => {
        const fetchPO = async () => {
            try {
                const data = await labApi.getPurchaseOrder(id as string);
                setPO(data);
                if (data.trackingNumber) {
                    setTrackingData({
                        courier: data.courier || 'FedEx',
                        trackingNumber: data.trackingNumber
                    });
                }
            } catch (error) {
                console.error('Failed to fetch PO detail:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPO();
    }, [id]);

    const handleUpdateStatus = async (newStatus: string) => {
        setUpdating(true);
        try {
            await labApi.updatePOStatus(id as string, newStatus);
            setPO({ ...po, status: newStatus.toUpperCase() });
        } catch (error) {
            console.error('Failed to update status:', error);
        } finally {
            setUpdating(false);
        }
    };

    const handleAddTracking = async (e: React.FormEvent) => {
        e.preventDefault();
        setUpdating(true);
        try {
            await labApi.addTracking(id as string, trackingData);
            setPO({ ...po, status: 'SHIPPED', ...trackingData });
            setShowTrackingForm(false);
        } catch (error) {
            console.error('Failed to add tracking:', error);
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return null;
    if (!po) return <div>PO not found.</div>;

    const steps = [
        { key: 'PENDING', label: 'Order Received', icon: RiFileList3Line },
        { key: 'IN_PRODUCTION', label: 'In Production', icon: RiFlaskLine },
        { key: 'READY_TO_SHIP', label: 'Quality Check Complete', icon: RiCheckboxCircleLine },
        { key: 'SHIPPED', label: 'Dispatched', icon: RiTruckLine },
    ];

    const currentStepIndex = steps.findIndex(s => s.key === po.status);

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div className="flex items-center justify-between">
                <button onClick={() => router.back()} className="flex items-center text-label-sm text-text-sub-600 hover:text-text-strong-950 transition-colors">
                    <RiArrowLeftLine className="size-4 mr-2" />
                    Back to Orders
                </button>
                <div className="flex gap-2">
                    <Button variant="secondary" className="rounded-xl h-10">
                        <RiPrinterLine className="size-4 mr-2" />
                        Print Work Order
                    </Button>
                    <Button variant="secondary" className="rounded-xl h-10">
                        <RiPrinterLine className="size-4 mr-2" />
                        Customs Declaration
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Status Tracker */}
                    <div className="rounded-[2rem] border border-stroke-soft-200 bg-bg-white-0 p-8 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-lg font-bold text-text-strong-950">Fulfillment Status</h2>
                            <span className="text-label-xs font-black uppercase tracking-widest text-text-sub-600 bg-bg-weak-50 px-3 py-1 rounded-full border border-stroke-soft-200">
                                {po.status.replace(/_/g, ' ')}
                            </span>
                        </div>

                        <div className="relative flex justify-between">
                            <div className="absolute top-5 left-0 w-full h-0.5 bg-bg-weak-100 -z-0" />
                            <div
                                className="absolute top-5 left-0 h-0.5 bg-primary-base transition-all duration-500 -z-0"
                                style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                            />

                            {steps.map((step, idx) => {
                                const isActive = idx <= currentStepIndex;
                                const isCurrent = idx === currentStepIndex;
                                return (
                                    <div key={step.key} className="relative z-10 flex flex-col items-center">
                                        <div className={cn(
                                            "size-10 rounded-full border-4 border-bg-white-0 flex items-center justify-center transition-all duration-300",
                                            isActive ? "bg-primary-base text-white shadow-lg shadow-primary-alpha-20" : "bg-bg-weak-100 text-text-disabled-300"
                                        )}>
                                            <step.icon className="size-5" />
                                        </div>
                                        <p className={cn(
                                            "mt-3 text-[10px] font-black uppercase tracking-widest text-center max-w-[80px]",
                                            isActive ? "text-text-strong-950" : "text-text-disabled-300"
                                        )}>
                                            {step.label}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-12 flex flex-wrap gap-3">
                            {po.status === 'PENDING' && (
                                <Button onClick={() => handleUpdateStatus('IN_PRODUCTION')} loading={updating} className="rounded-xl px-6">
                                    Start Production Workflow
                                </Button>
                            )}
                            {po.status === 'IN_PRODUCTION' && (
                                <Button onClick={() => handleUpdateStatus('READY_TO_SHIP')} loading={updating} className="rounded-xl px-6">
                                    Complete Quality Check
                                </Button>
                            )}
                            {po.status === 'READY_TO_SHIP' && !showTrackingForm && (
                                <Button onClick={() => setShowTrackingForm(true)} className="rounded-xl px-6 bg-indigo-600 hover:bg-indigo-700">
                                    Dispatch & Add Tracking
                                </Button>
                            )}
                            {po.status === 'SHIPPED' && (
                                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl w-full flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <RiTruckLine className="size-5 text-emerald-600" />
                                        <div>
                                            <p className="text-label-sm font-bold text-emerald-900">Shipment Dispatched ({po.courier})</p>
                                            <p className="text-paragraph-xs text-emerald-700 font-medium">Tracking: {po.trackingNumber}</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm" className="text-emerald-700 hover:bg-emerald-100 rounded-lg">View History</Button>
                                </div>
                            )}
                        </div>

                        {showTrackingForm && (
                            <form onSubmit={handleAddTracking} className="mt-8 p-6 bg-indigo-50 rounded-2xl border border-indigo-100 space-y-4">
                                <h3 className="text-label-sm font-bold text-indigo-900">Enter Shipping Confirmation</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-indigo-700">Courier</label>
                                        <select
                                            value={trackingData.courier}
                                            onChange={(e) => setTrackingData({ ...trackingData, courier: e.target.value })}
                                            className="w-full h-11 rounded-xl bg-white border border-indigo-200 px-3 text-label-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        >
                                            <option>FedEx</option>
                                            <option>UPS</option>
                                            <option>DHL</option>
                                            <option>USPS</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-indigo-700">Tracking #</label>
                                        <Input
                                            required
                                            placeholder="Enter Number"
                                            value={trackingData.trackingNumber}
                                            onChange={(e) => setTrackingData({ ...trackingData, trackingNumber: e.target.value })}
                                            className="h-11 rounded-xl border-indigo-200 bg-white"
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button type="submit" loading={updating} className="rounded-xl flex-1 bg-indigo-600 hover:bg-indigo-700">Confirm Dispatch</Button>
                                    <Button type="button" variant="ghost" onClick={() => setShowTrackingForm(false)} className="rounded-xl text-indigo-700 hover:bg-indigo-100">Cancel</Button>
                                </div>
                            </form>
                        )}
                    </div>

                    {/* PO Items */}
                    <div className="rounded-[2rem] border border-stroke-soft-200 bg-bg-white-0 overflow-hidden shadow-sm">
                        <div className="px-8 py-6 border-b border-stroke-soft-200">
                            <h2 className="text-lg font-bold text-text-strong-950">Replenishment List</h2>
                        </div>
                        <div className="divide-y divide-stroke-soft-200">
                            {po.items?.map((item: any) => (
                                <div key={item.id} className="px-8 py-6 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="size-16 rounded-2xl bg-bg-weak-50 flex items-center justify-center text-text-disabled-300">
                                            {item.product?.images?.[0] ? (
                                                <img src={item.product.images[0]} className="size-full object-cover rounded-2xl" />
                                            ) : (
                                                <RiFlaskLine className="size-8" />
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="text-label-sm font-bold text-text-strong-950">{item.product?.name}</h4>
                                            <p className="text-paragraph-xs text-text-sub-600 mt-0.5">Lot ID: {item.lotId || 'PENDING ASSIGNMENT'}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-black text-text-strong-950">{item.quantity}</p>
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-sub-600 mt-1">Units Required</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Brand & Shipping Sidebar */}
                <div className="space-y-6">
                    <div className="rounded-[2.5rem] border border-stroke-soft-200 bg-bg-white-0 p-8 shadow-sm">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-text-sub-600 mb-6 border-b border-stroke-soft-100 pb-3">Requesting Brand</h3>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="size-12 rounded-2xl bg-bg-weak-100 flex items-center justify-center">
                                {po.brand?.logoUrl ? <img src={po.brand.logoUrl} className="size-8 object-contain" /> : <RiFlaskLine className="size-6 text-text-soft-400" />}
                            </div>
                            <div>
                                <p className="text-label-sm font-bold text-text-strong-950 leading-tight">{po.brand?.name}</p>
                                <p className="text-paragraph-xs text-text-sub-600 mt-1 uppercase tracking-widest">{po.brand?.slug}</p>
                            </div>
                        </div>
                        <div className="space-y-4 pt-6 border-t border-stroke-soft-100">
                            <div className="flex items-center text-text-sub-600">
                                <RiTimeLine className="size-4 mr-2.5" />
                                <span className="text-paragraph-xs font-bold uppercase tracking-wider">Due in 4 Days</span>
                            </div>
                            <div className="flex items-start text-text-sub-600">
                                <RiMapPin2Line className="size-4 mr-2.5 mt-0.5 shrink-0" />
                                <div>
                                    <p className="text-paragraph-xs font-bold uppercase tracking-wider mb-1">Shipping Destination</p>
                                    <p className="text-paragraph-xs leading-relaxed">
                                        Peptiful Fulfillment Hub<br />
                                        Reference: {(id as string).slice(0, 8).toUpperCase()}<br />
                                        Salt Lake City, UT 84101
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-[2rem] bg-indigo-900 p-8 text-white shadow-lg shadow-indigo-200">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-300 mb-4">Internal Notes</h3>
                        <p className="text-paragraph-sm leading-relaxed text-indigo-50">
                            Ensure batch consistency for {po.brand?.name}. All vials must be inspected for seal integrity before dispatch.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
