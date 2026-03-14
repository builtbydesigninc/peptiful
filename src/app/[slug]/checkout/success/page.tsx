'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { useCart } from '@/utils/cart-context';
import { storefrontApi } from '@/lib/api-client';
import Link from 'next/link';
import {
    RiCheckboxCircleFill,
    RiArrowRightLine,
    RiDownloadCloud2Line,
    RiShieldFlashLine,
    RiLockPasswordLine,
    RiVerifiedBadgeLine
} from '@remixicon/react';
import { Button } from '@/components/ui/button-new';
import { Input } from '@/components/ui/input';

export default function OrderSuccessPage() {
    const { slug } = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');
    const guestEmail = searchParams.get('email'); // Passed from checkout
    const { clearCart } = useCart();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    useEffect(() => {
        clearCart();
        const token = localStorage.getItem('storefront_token');
        if (token) setIsLoggedIn(true);
    }, []);

    const handleActivate = async () => {
        if (!password || password.length < 8) return;
        setLoading(true);
        try {
            await storefrontApi.guestToAccount(slug as string, {
                orderId: orderId,
                email: guestEmail,
                password: password
            });
            setStatus('success');
            setTimeout(() => {
                router.push(`/${slug}/account`);
            }, 2000);
        } catch (error) {
            console.error('Activation failed:', error);
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-32 text-center">
            <div className="mx-auto max-w-md">
                <div className="mx-auto size-24 rounded-[2.5rem] bg-emerald-50 flex items-center justify-center mb-8">
                    <RiCheckboxCircleFill className="size-12 text-emerald-500" />
                </div>

                <h1 className="text-4xl font-extrabold text-gray-900">Order Confirmed</h1>
                <p className="mt-4 text-lg text-gray-500 font-medium px-4">
                    Thank you for your purchase. Your research compounds are being prepared for validation.
                </p>

                <div className="mt-12 bg-gray-50 rounded-3xl p-8 border border-gray-100">
                    <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                        <span className="text-xs font-black uppercase tracking-widest text-gray-400">Order Reference</span>
                        <span className="text-sm font-black text-gray-900">#{orderId?.slice(-8).toUpperCase() || 'VALIDATION-PENDING'}</span>
                    </div>
                    <div className="mt-4 text-left">
                        <p className="text-sm text-gray-500 leading-relaxed">
                            A confirmation email has been sent to your address. Lab verification typically completes within 24 hours.
                        </p>
                    </div>
                </div>

                {/* Activation Section for Guests */}
                {!isLoggedIn && status !== 'success' && (
                    <div className="mt-8 overflow-hidden rounded-[2.5rem] border-2 border-indigo-600/10 bg-indigo-50/30 p-8 text-left relative group translate-y-0 hover:-translate-y-1 transition-all duration-300">
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                            <RiShieldFlashLine className="size-24 text-indigo-600 rotate-12" />
                        </div>

                        <div className="relative z-10">
                            <h3 className="flex items-center text-lg font-black text-indigo-900">
                                <RiVerifiedBadgeLine className="size-5 mr-2 text-indigo-600" />
                                Claim Your History
                            </h3>
                            <p className="mt-2 text-sm text-indigo-700/80 leading-relaxed font-medium">
                                Save your order, track lab validations, and access batch-specific COAs by setting a password.
                            </p>

                            <div className="mt-6 flex flex-col space-y-4">
                                <div className="relative">
                                    <RiLockPasswordLine className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-indigo-300" />
                                    <Input
                                        type="password"
                                        placeholder="Set your account password"
                                        className="h-14 pl-12 rounded-2xl border-indigo-100 bg-white ring-offset-indigo-50 focus:ring-indigo-600"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <Button
                                    className="h-14 w-full rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all shadow-lg shadow-indigo-200"
                                    onClick={handleActivate}
                                    loading={loading}
                                    disabled={password.length < 8}
                                >
                                    Activate Research Portal
                                </Button>
                                <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest text-center">
                                    Min. 8 characters required
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {status === 'success' && (
                    <div className="mt-8 p-8 bg-emerald-50 rounded-[2.5rem] border-2 border-emerald-100 flex flex-col items-center animate-in fade-in zoom-in duration-500">
                        <RiVerifiedBadgeLine className="size-12 text-emerald-500 mb-4" />
                        <h3 className="text-xl font-black text-emerald-900">Portal Activated!</h3>
                        <p className="mt-2 text-sm text-emerald-700 font-medium">Redirecting to your research dashboard...</p>
                    </div>
                )}

                <div className="mt-10 flex flex-col space-y-4">
                    <Button className="h-14 w-full rounded-2xl bg-gray-900 text-base font-bold shadow-lg shadow-gray-200" asChild>
                        <Link href={isLoggedIn ? `/${slug}/account/orders` : `/${slug}/products`}>
                            {isLoggedIn ? 'View Order Status' : 'Return to Shop'}
                        </Link>
                    </Button>
                    {!isLoggedIn && (
                        <Link href={`/${slug}/products`} className="flex items-center justify-center text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">
                            Continue Research Shopping <RiArrowRightLine className="size-4 ml-2" />
                        </Link>
                    )}
                </div>

                <div className="mt-16 flex items-center justify-center space-x-6">
                    <button className="flex items-center text-xs font-bold text-gray-400 hover:text-gray-900 transition-colors">
                        <RiDownloadCloud2Line className="size-4 mr-2" />
                        Invoice
                    </button>
                    <div className="h-4 w-px bg-gray-200" />
                    <button className="flex items-center text-xs font-bold text-gray-400 hover:text-gray-900 transition-colors">
                        Lab COA (Pending)
                    </button>
                </div>
            </div>
        </div>
    );
}
