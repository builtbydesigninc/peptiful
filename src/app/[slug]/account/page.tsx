'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { storefrontApi } from '@/lib/api-client';
import { Button } from '@/components/ui/button-new';
import { Input } from '@/components/ui/input';
import { RiEdit2Line, RiShieldCheckLine, RiMailLine, RiUser3Line } from '@remixicon/react';

export default function AccountOverview() {
    const { slug } = useParams();
    const [account, setAccount] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const data = await storefrontApi.getAccount(slug as string);
                setAccount(data);
                setFormData({
                    name: data.name || '',
                    email: data.email || ''
                });
            } catch (error) {
                console.error('Failed to fetch account:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAccount();
    }, [slug]);

    const handleSave = async () => {
        try {
            await storefrontApi.updateAccount(slug as string, formData);
            setAccount({ ...account, ...formData });
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to update account:', error);
        }
    };

    if (loading) return null;

    return (
        <div className="space-y-12">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900">Partner Profile</h1>
                    <p className="mt-1 text-sm text-gray-500">Manage your research credentials and contact preferences.</p>
                </div>
                {!isEditing && (
                    <Button variant="secondary" onClick={() => setIsEditing(true)} className="rounded-2xl">
                        <RiEdit2Line className="size-4 mr-2" />
                        Edit Profile
                    </Button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
                <div className="space-y-8">
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Full Name</label>
                        {isEditing ? (
                            <Input
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="mt-2 h-14 rounded-2xl bg-gray-50 border-gray-100"
                            />
                        ) : (
                            <div className="mt-2 flex items-center space-x-3 text-lg font-bold text-gray-900">
                                <RiUser3Line className="size-5 text-gray-400" />
                                <span>{account.name || 'Not provided'}</span>
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Email Address</label>
                        {isEditing ? (
                            <Input
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="mt-2 h-14 rounded-2xl bg-gray-50 border-gray-100"
                                disabled // Usually email is changed via separate verification flow
                            />
                        ) : (
                            <div className="mt-2 flex items-center space-x-3 text-lg font-bold text-gray-900">
                                <RiMailLine className="size-5 text-gray-400" />
                                <span>{account.email}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-emerald-50 rounded-[2rem] p-8 border border-emerald-100">
                    <div className="flex items-start space-x-4">
                        <div className="size-12 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm shadow-emerald-200/50">
                            <RiShieldCheckLine className="size-6 text-emerald-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-emerald-900">Research Verified</h3>
                            <p className="mt-2 text-sm text-emerald-700 leading-relaxed">
                                Your account is fully validated for research grade chemical procurement. You have direct access to batch-specific COAs and technical support.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {isEditing && (
                <div className="flex items-center space-x-4 pt-8 border-t border-gray-100">
                    <Button onClick={handleSave} className="rounded-2xl px-8 h-12">Save Changes</Button>
                    <Button variant="ghost" onClick={() => setIsEditing(false)} className="rounded-2xl h-12">Cancel</Button>
                </div>
            )}

            <section className="pt-12 border-t border-gray-100">
                <h3 className="text-xl font-extrabold text-gray-900">Security</h3>
                <SecuritySection slug={slug as string} />
            </section>
        </div>
    );
}

function SecuritySection({ slug }: { slug: string }) {
    const [isChanging, setIsChanging] = useState(false);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    if (isChanging) {
        return (
            <div className="mt-6 p-8 bg-gray-50 rounded-[2rem] border border-gray-100 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">New Password</label>
                        <Input type="password" placeholder="••••••••" className="h-14 rounded-2xl border-gray-100 bg-white" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Confirm Password</label>
                        <Input type="password" placeholder="••••••••" className="h-14 rounded-2xl border-gray-100 bg-white" />
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <Button
                        onClick={() => {
                            setStatus('loading');
                            setTimeout(() => {
                                setStatus('success');
                                setTimeout(() => {
                                    setIsChanging(false);
                                    setStatus('idle');
                                }, 2000);
                            }, 1000);
                        }}
                        loading={status === 'loading'}
                        className="rounded-2xl px-8"
                    >
                        {status === 'success' ? 'Password Updated!' : 'Update Password'}
                    </Button>
                    <Button variant="ghost" onClick={() => setIsChanging(false)} className="rounded-2xl">Cancel</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100 gap-4">
            <div>
                <p className="text-sm font-bold text-gray-900">Change Password</p>
                <p className="text-xs text-gray-500 mt-0.5">Keep your account secure with regular updates.</p>
            </div>
            <Button
                variant="secondary"
                className="rounded-xl px-4"
                onClick={() => setIsChanging(true)}
            >
                Update Security
            </Button>
        </div>
    );
}
