'use client';

import React, { useEffect, useState } from 'react';
import {
    RiWallet3Line,
    RiArrowRightLine,
    RiDownloadLine,
    RiCheckboxCircleLine,
    RiTimeLine,
    RiErrorWarningLine
} from '@remixicon/react';
import { labApi } from '@/lib/api-client';
import { Button } from '@/components/ui/button-new';

export default function LabPayouts() {
    const [payouts, setPayouts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPayouts = async () => {
            try {
                const data = await labApi.getPayouts();
                setPayouts(data.data || []);
            } catch (error) {
                console.error('Failed to fetch payouts:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPayouts();
    }, []);

    if (loading) return null;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-text-strong-950">Payout History</h1>
                <p className="text-paragraph-sm text-text-sub-600">Review all settlements and generated financial receipts.</p>
            </div>

            <div className="rounded-[2.5rem] border border-stroke-soft-200 bg-bg-white-0 overflow-hidden shadow-sm shadow-gray-200/50">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-bg-weak-50 border-b border-stroke-soft-200">
                            <th className="px-8 py-5 text-paragraph-xs font-black text-text-sub-600 uppercase tracking-[0.2em]">Reference</th>
                            <th className="px-8 py-5 text-paragraph-xs font-black text-text-sub-600 uppercase tracking-[0.2em]">Amount</th>
                            <th className="px-8 py-5 text-paragraph-xs font-black text-text-sub-600 uppercase tracking-[0.2em]">Method</th>
                            <th className="px-8 py-5 text-paragraph-xs font-black text-text-sub-600 uppercase tracking-[0.2em]">Status</th>
                            <th className="px-8 py-5 text-paragraph-xs font-black text-text-sub-600 uppercase tracking-[0.2em]">Settled On</th>
                            <th className="px-8 py-5 text-paragraph-xs font-black text-text-sub-600 uppercase tracking-[0.2em] text-right">Documents</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stroke-soft-200">
                        {payouts.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-8 py-20 text-center text-text-disabled-300">
                                    No payout history found.
                                </td>
                            </tr>
                        ) : (
                            payouts.map((payout) => (
                                <tr key={payout.id} className="hover:bg-bg-weak-50 transition-colors">
                                    <td className="px-8 py-6">
                                        <p className="text-label-sm text-text-strong-950 font-bold">SET-{payout.id.slice(0, 8).toUpperCase()}</p>
                                        <p className="text-paragraph-xs text-text-sub-600 mt-1">{payout.memo || 'Weekly Settlement'}</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-label-sm font-black text-text-strong-950">${payout.amount.toLocaleString()}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            <div className="size-6 rounded bg-bg-weak-100 flex items-center justify-center">
                                                <RiWallet3Line className="size-3 text-text-soft-400" />
                                            </div>
                                            <span className="text-paragraph-xs font-bold text-text-sub-600">{payout.method || 'Bank Transfer'}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-widest inline-flex items-center ${payout.status === 'PAID' ? 'bg-emerald-100 text-emerald-700' :
                                                payout.status === 'PENDING' ? 'bg-amber-100 text-amber-700' :
                                                    'bg-red-100 text-red-700'
                                            }`}>
                                            {payout.status === 'PAID' ? <RiCheckboxCircleLine className="size-3 mr-1" /> : <RiTimeLine className="size-3 mr-1" />}
                                            {payout.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-paragraph-xs font-bold text-text-sub-600">
                                        {payout.paidAt ? new Date(payout.paidAt).toLocaleDateString() : 'Processing...'}
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <Button variant="ghost" size="sm" className="rounded-xl text-primary-base font-bold">
                                            <RiDownloadLine className="size-4 mr-1.5" />
                                            Receipt
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="rounded-[2.5rem] bg-bg-weak-50 border border-stroke-soft-200 p-8 flex items-start gap-4">
                <RiErrorWarningLine className="size-6 text-text-sub-600 shrink-0" />
                <div>
                    <h4 className="text-label-sm font-bold text-text-strong-950">Missing a payout?</h4>
                    <p className="mt-1 text-paragraph-sm text-text-sub-600 leading-relaxed">
                        Payouts take 3-5 business days to appear in your bank account after being marked as PAID. If you haven't received yours after this period, please contact support with the Reference ID.
                    </p>
                </div>
            </div>
        </div>
    );
}
