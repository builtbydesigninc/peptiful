'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { storefrontApi } from '@/lib/api-client';
import { Button } from '@/components/ui/button-new';
import { Badge } from '@/components/ui/badge-new';
import { RiMapPin2Line, RiAddLine, RiEdit2Line, RiDeleteBinLine, RiLoader4Line } from '@remixicon/react';
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalFooter, ConfirmModal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function AddressesPage() {
    const { slug } = useParams();
    const [addresses, setAddresses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState<any>(null);
    const [formData, setFormData] = useState({
        label: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zip: '',
        country: 'US',
        isDefault: false
    });

    const fetchAddresses = async () => {
        setLoading(true);
        try {
            const data = await storefrontApi.getAddresses(slug as string);
            setAddresses(data || []);
        } catch (error) {
            console.error('Failed to fetch addresses:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, [slug]);

    const handleOpenForm = (addr?: any) => {
        if (addr) {
            setSelectedAddress(addr);
            setFormData({
                label: addr.label || '',
                addressLine1: addr.addressLine1 || '',
                addressLine2: addr.addressLine2 || '',
                city: addr.city || '',
                state: addr.state || '',
                zip: addr.zip || '',
                country: addr.country || 'US',
                isDefault: addr.isDefault || false
            });
        } else {
            setSelectedAddress(null);
            setFormData({
                label: '',
                addressLine1: '',
                addressLine2: '',
                city: '',
                state: '',
                zip: '',
                country: 'US',
                isDefault: false
            });
        }
        setIsFormOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setActionLoading(true);
        try {
            if (selectedAddress) {
                await storefrontApi.updateAddress(slug as string, selectedAddress.id, formData);
                toast.success('Address updated successfully');
            } else {
                await storefrontApi.addAddress(slug as string, formData);
                toast.success('Address added successfully');
            }
            await fetchAddresses();
            setIsFormOpen(false);
        } catch (error) {
            console.error('Failed to save address:', error);
        } finally {
            setActionLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!selectedAddress) return;
        setActionLoading(true);
        try {
            await storefrontApi.deleteAddress(slug as string, selectedAddress.id);
            toast.success('Address deleted successfully');
            await fetchAddresses();
            setIsDeleteOpen(false);
        } catch (error) {
            console.error('Failed to delete address:', error);
        } finally {
            setActionLoading(false);
        }
    };

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
                <Button className="rounded-2xl" onClick={() => handleOpenForm()}>
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
                    <Button variant="secondary" className="mt-8 rounded-xl px-6" onClick={() => handleOpenForm()}>
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
                                    <button
                                        className="size-8 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-white hover:shadow-sm transition-all"
                                        onClick={() => handleOpenForm(addr)}
                                    >
                                        <RiEdit2Line className="size-4" />
                                    </button>
                                    <button
                                        className="size-8 rounded-xl bg-gray-50 flex items-center justify-center text-red-300 hover:text-red-500 hover:bg-red-50 transition-all"
                                        onClick={() => {
                                            setSelectedAddress(addr);
                                            setIsDeleteOpen(true);
                                        }}
                                    >
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

            <Modal open={isFormOpen} onOpenChange={setIsFormOpen}>
                <ModalContent>
                    <ModalHeader>
                        <ModalTitle>{selectedAddress ? 'Edit Gateway' : 'New Lab Gateway'}</ModalTitle>
                    </ModalHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2 space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Label</label>
                                <Input
                                    placeholder="e.g. Primary Lab"
                                    value={formData.label}
                                    onChange={e => setFormData({ ...formData, label: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="col-span-2 space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Address Line 1</label>
                                <Input
                                    placeholder="St. Anne's Bio-Research Park"
                                    value={formData.addressLine1}
                                    onChange={e => setFormData({ ...formData, addressLine1: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="col-span-2 space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Address Line 2</label>
                                <Input
                                    placeholder="Building 4, Suite 201"
                                    value={formData.addressLine2}
                                    onChange={e => setFormData({ ...formData, addressLine2: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">City</label>
                                <Input
                                    placeholder="Boston"
                                    value={formData.city}
                                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">State</label>
                                <Input
                                    placeholder="MA"
                                    value={formData.state}
                                    onChange={e => setFormData({ ...formData, state: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">ZIP</label>
                                <Input
                                    placeholder="02108"
                                    value={formData.zip}
                                    onChange={e => setFormData({ ...formData, zip: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Country</label>
                                <Input
                                    placeholder="US"
                                    value={formData.country}
                                    onChange={e => setFormData({ ...formData, country: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="col-span-2 flex items-center gap-2 mt-2">
                                <input
                                    type="checkbox"
                                    id="isDefault"
                                    checked={formData.isDefault}
                                    onChange={e => setFormData({ ...formData, isDefault: e.target.checked })}
                                    className="size-4 rounded border-gray-300 text-primary-base focus:ring-primary-base accent-primary-base cursor-pointer"
                                />
                                <label htmlFor="isDefault" className="text-sm font-medium text-gray-700 cursor-pointer">
                                    Set as default shipping destination
                                </label>
                            </div>
                        </div>
                        <ModalFooter className="mt-8">
                            <Button type="button" variant="ghost" onClick={() => setIsFormOpen(false)} disabled={actionLoading}>Cancel</Button>
                            <Button type="submit" disabled={actionLoading}>
                                {actionLoading ? <RiLoader4Line className="size-4 animate-spin mr-2" /> : null}
                                {selectedAddress ? 'Update Gateway' : 'Add Gateway'}
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>

            <ConfirmModal
                open={isDeleteOpen}
                onOpenChange={setIsDeleteOpen}
                title="Decommission Gateway?"
                description="This will permanently disconnect this laboratory gateway from your account. This action cannot be undone."
                confirmText="Decommission"
                variant="destructive"
                onConfirm={handleDelete}
            />
        </div>
    );
}
