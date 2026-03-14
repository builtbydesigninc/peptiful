'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { storefrontApi } from '@/lib/api-client';
import Link from 'next/link';
import { RiLockPasswordLine, RiMailLine, RiArrowLeftLine } from '@remixicon/react';
import { Button } from '@/components/ui/button-new';
import { Input } from '@/components/ui/input';

export default function CustomerLoginPage() {
    const { slug } = useParams();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await storefrontApi.login(slug as string, { email, password });
            router.push(`/${slug}/account`);
        } catch (err: any) {
            setError(err.message || 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-[80vh] items-center justify-center px-4 py-20 bg-gray-50/30">
            <div className="w-full max-w-md">
                <Link href={`/${slug}`} className="mb-8 flex items-center text-sm font-bold text-gray-500 hover:text-gray-950 transition-colors">
                    <RiArrowLeftLine className="size-4 mr-2" />
                    Back to Store
                </Link>

                <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 p-10 border border-gray-100">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-extrabold text-gray-900">Welcome Back</h1>
                        <p className="mt-4 text-gray-500 font-medium">Sign in to manage your research orders.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-sm font-bold">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                            <div className="relative">
                                <RiMailLine className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                                <Input
                                    type="email"
                                    required
                                    className="h-14 pl-12 rounded-2xl border-gray-100 bg-gray-50/50"
                                    placeholder="researcher@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between ml-1">
                                <label className="text-xs font-black uppercase tracking-widest text-gray-400">Password</label>
                                <Link href={`/${slug}/forgot-password`} className="text-[11px] font-bold text-gray-500 hover:text-gray-950">Forgot?</Link>
                            </div>
                            <div className="relative">
                                <RiLockPasswordLine className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                                <Input
                                    type="password"
                                    required
                                    className="h-14 pl-12 rounded-2xl border-gray-100 bg-gray-50/50"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            loading={loading}
                            className="h-14 w-full rounded-2xl text-base font-bold shadow-lg shadow-gray-200"
                        >
                            Sign In
                        </Button>
                    </form>

                    <div className="mt-10 text-center">
                        <p className="text-sm text-gray-500 font-medium">
                            First time here?
                            <Link href={`/${slug}/register`} className="ml-2 font-bold text-gray-900 border-b-2 border-gray-900">Create account</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
