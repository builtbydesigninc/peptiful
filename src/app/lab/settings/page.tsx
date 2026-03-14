'use client';

import React, { useEffect, useState } from 'react';
import {
    RiSettings4Line,
    RiFlaskLine,
    RiShieldCheckLine,
    RiMailLine,
    RiMapPin2Line,
    RiBankCardLine,
    RiTruckLine
} from '@remixicon/react';
import { labApi } from '@/lib/api-client';
import { Button } from '@/components/ui/button-new';
import { Input } from '@/components/ui/input';

export default function LabSettings() {
    const [settings, setSettings] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showPayoutForm, setShowPayoutForm] = useState(false);
    const [savingPayout, setSavingPayout] = useState(false);
    const [payoutForm, setPayoutForm] = useState({ payoutMethod: 'BANK_TRANSFER', payoutAccountId: '' });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const data = await labApi.getSettings();
                setSettings(data);
            } catch (error) {
                console.error('Failed to fetch settings:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await labApi.updateSettings(settings);
        } catch (error) {
            console.error('Failed to update settings:', error);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return null;

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <div>
                <h1 className="text-2xl font-bold text-text-strong-950">Laboratory Settings</h1>
                <p className="text-paragraph-sm text-text-sub-600">Configure production capabilities and facility information.</p>
            </div>

            <form onSubmit={handleSave} className="space-y-12">
                {/* Lab Identity */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3 border-b border-stroke-soft-200 pb-3">
                        <RiFlaskLine className="size-5 text-primary-base" />
                        <h2 className="text-label-sm font-black uppercase tracking-[0.2em] text-text-strong-950">Laboratory Identity</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-text-sub-600">Facility Name</label>
                            <Input
                                value={settings?.name ?? ''}
                                onChange={e => setSettings({ ...settings, name: e.target.value })}
                                className="h-12 rounded-xl border-stroke-soft-200 text-text-strong-950 bg-bg-white-0"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-text-sub-600">Primary Contact Email</label>
                            <Input
                                type="email"
                                value={settings?.email ?? ''}
                                onChange={e => setSettings({ ...settings, email: e.target.value })}
                                className="h-12 rounded-xl border-stroke-soft-200 text-text-strong-950 bg-bg-white-0"
                            />
                        </div>
                    </div>
                </section>


                {/* Bank & Payouts */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3 border-b border-stroke-soft-200 pb-3">
                        <RiBankCardLine className="size-5 text-primary-base" />
                        <h2 className="text-label-sm font-black uppercase tracking-[0.2em] text-text-strong-950">Payout Configuration</h2>
                    </div>

                    {settings?.payoutMethod && !showPayoutForm ? (
                        <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-full bg-white flex items-center justify-center text-indigo-600 shadow-sm">
                                    <RiBankCardLine className="size-5" />
                                </div>
                                <div>
                                    <p className="text-label-sm font-bold text-indigo-950">Connected Payout Method</p>
                                    <p className="text-paragraph-xs text-indigo-700">{settings.payoutMethod} {settings.payoutAccountId ? `•••• ${settings.payoutAccountId.slice(-4)}` : ''}</p>
                                </div>
                            </div>
                            <Button type="button" variant="secondary" size="sm" className="rounded-xl border-indigo-200 text-indigo-700 bg-white hover:bg-indigo-50" onClick={() => {
                                setPayoutForm({ payoutMethod: settings.payoutMethod, payoutAccountId: settings.payoutAccountId || '' });
                                setShowPayoutForm(true);
                            }}>
                                Change
                            </Button>
                        </div>
                    ) : !showPayoutForm ? (
                        <div className="p-6 bg-bg-weak-50 rounded-2xl border border-stroke-soft-200 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-full bg-bg-white-0 flex items-center justify-center text-text-disabled-300 shadow-sm">
                                    <RiBankCardLine className="size-5" />
                                </div>
                                <div>
                                    <p className="text-label-sm font-bold text-text-strong-950">No payout method configured</p>
                                    <p className="text-paragraph-xs text-text-sub-600">Add a bank account or payment method to receive settlements.</p>
                                </div>
                            </div>
                            <Button type="button" variant="secondary" size="sm" className="rounded-xl" onClick={() => setShowPayoutForm(true)}>
                                Set Up
                            </Button>
                        </div>
                    ) : (
                        <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100 space-y-4">
                            <h3 className="text-label-sm font-bold text-indigo-900">Configure Payout Method</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-indigo-700">Payout Method</label>
                                    <select
                                        value={payoutForm.payoutMethod}
                                        onChange={e => setPayoutForm({ ...payoutForm, payoutMethod: e.target.value })}
                                        className="w-full h-11 rounded-xl bg-white border border-indigo-200 px-3 text-label-sm text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        <option value="BANK_TRANSFER">Bank Transfer (ACH)</option>
                                        <option value="PAYPAL">PayPal</option>
                                        <option value="STRIPE_CONNECT">Stripe Connect</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-indigo-700">Account ID / Email</label>
                                    <Input
                                        required
                                        placeholder="e.g. acct_xxx or email@example.com"
                                        value={payoutForm.payoutAccountId}
                                        onChange={e => setPayoutForm({ ...payoutForm, payoutAccountId: e.target.value })}
                                        className="h-11 rounded-xl border-indigo-200 bg-white text-[#0f172a]"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2 pt-2">
                                <Button
                                    type="button"
                                    loading={savingPayout}
                                    className="rounded-xl flex-1 bg-indigo-600 hover:bg-indigo-700"
                                    onClick={async () => {
                                        setSavingPayout(true);
                                        try {
                                            await labApi.updateSettings({ payoutMethod: payoutForm.payoutMethod, payoutAccountId: payoutForm.payoutAccountId });
                                            setSettings({ ...settings, payoutMethod: payoutForm.payoutMethod, payoutAccountId: payoutForm.payoutAccountId });
                                            setShowPayoutForm(false);
                                        } catch (err) {
                                            console.error('Failed to save payout method:', err);
                                        } finally {
                                            setSavingPayout(false);
                                        }
                                    }}
                                >
                                    Save Payout Method
                                </Button>
                                <Button type="button" variant="ghost" className="rounded-xl text-indigo-700 hover:bg-indigo-100" onClick={() => setShowPayoutForm(false)}>
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    )}
                </section>

                <div className="pt-8 border-t border-stroke-soft-200 flex justify-end gap-3">
                    <Button variant="ghost" className="rounded-xl px-8 h-12">Discard Changes</Button>
                    <Button type="submit" loading={saving} className="rounded-xl px-12 h-12 font-bold shadow-lg shadow-primary-alpha-20">Save Configuration</Button>
                </div>
            </form>
        </div>
    );
}
