'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { storefrontApi } from '@/lib/api-client';
import { Button } from '@/components/ui/button-new';
import { Badge } from '@/components/ui/badge-new';
import { RiMapPin2Line, RiAddLine, RiEdit2Line, RiDeleteBinLine } from '@remixicon/react';

export default function AddressesPage() {
    const { slug } = useParams();
    const [addresses, setAddresses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const data = await storefrontApi.getAddresses(slug as string);
                // Based on backend service, this returns a simple array
                setAddresses(data || []);
            } catch (error) {
                console.error('Failed to fetch addresses:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAddresses();
    }, [slug]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-[500px] space-y-4">
                <div className="size-10 animate-spin rounded-full border-4 border-gray-100 border-t-primary-base" />
                <p className="text-sm font-medium text-gray-400 font-mono">syncing laboratory gateways...</p>
            </div>
        );
    }

    return (
        <div className="space-y-12">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900">Lab Gateways</h1>
                    <p className="mt-1 text-sm text-gray-500">Manage your shipping destinations and billing credentials.</p>
                </div>
                <Button className="rounded-2xl">
                    <RiAddLine className="size-4 mr-2" />
                    New Address
                </Button>
            </div>

            {addresses.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[400px] text-center bg-gray-50 rounded-[2rem] border border-dashed border-gray-200">
                    <div className="size-20 bg-white rounded-3xl flex items-center justify-center mb-6 shadow-sm">
                        <RiMapPin2Line className="size-8 text-gray-300" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">No Addresses Saved</h2>
                    <p className="mt-2 text-sm text-gray-500 max-w-xs mx-auto">
                        Save your primary research laboratory as a shipping destination for faster checkout.
                    </p>
                    <Button variant="secondary" className="mt-8 rounded-xl px-6">
                        Add Primary Address
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                    {addresses.map((addr) => (
                        <div key={addr.id} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:shadow-gray-200/40 transition-all duration-300">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-tighter">{addr.label || 'Laboratory'}</h3>
                                    {addr.isDefault && (
                                        <Badge variant="light" color="success" className="mt-2 text-[9px] font-black uppercase tracking-widest px-2 group-hover:bg-emerald-50! transition-colors">Default Destination</Badge>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <button className="size-8 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-white hover:shadow-sm transition-all">
                                        <RiEdit2Line className="size-4" />
                                    </button>
                                    <button className="size-8 rounded-xl bg-gray-50 flex items-center justify-center text-red-300 hover:text-red-500 hover:bg-red-50 transition-all">
                                        <RiDeleteBinLine className="size-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-1 text-sm font-medium text-gray-500">
                                <p className="text-gray-900 font-bold">{addr.addressLine1}</p>
                                {addr.addressLine2 && <p>{addr.addressLine2}</p>}
                                <p>{addr.city}, {addr.state} {addr.zip}</p>
                                <p className="uppercase text-[10px] font-black tracking-widest text-gray-300 mt-2">{addr.country}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
