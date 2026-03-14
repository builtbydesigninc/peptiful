'use client';

import * as React from 'react';
import { PageHeader } from '@/components/ui/page-header-new';
import { Button } from '@/components/ui/button-new';
import { RiLoader4Line, RiCheckLine, RiErrorWarningLine } from '@remixicon/react';
import { adminApi } from '@/lib/api-client';
import { useAdmin } from '../context';

export default function AdminProfilePage() {
    const { user: contextUser, refreshProfile } = useAdmin();
    const [formData, setFormData] = React.useState({
        fullName: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = React.useState(true);
    const [saving, setSaving] = React.useState(false);
    const [feedback, setFeedback] = React.useState<{ type: 'success' | 'error', message: string } | null>(null);

    React.useEffect(() => {
        if (contextUser) {
            setFormData({
                fullName: contextUser.name || '',
                email: contextUser.email || '',
                password: '',
            });
            setLoading(false);
        }
    }, [contextUser]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setFeedback(null);
        try {
            const payload: any = {
                fullName: formData.fullName,
                email: formData.email,
            };
            if (formData.password) {
                payload.password = formData.password;
            }

            await adminApi.updateMe(payload);
            await refreshProfile();
            setFeedback({ type: 'success', message: 'Profile updated successfully!' });
            setFormData(prev => ({ ...prev, password: '' })); // Clear password
            setTimeout(() => setFeedback(null), 3000);
        } catch (error) {
            console.error('Failed to update profile:', error);
            setFeedback({ type: 'error', message: 'Failed to update profile. Email might be in use.' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className='flex h-64 items-center justify-center text-text-soft-400'>
                <RiLoader4Line className='size-8 animate-spin' />
            </div>
        );
    }

    return (
        <div className='space-y-6'>
            <PageHeader title='My Profile' description='Manage your personal administrator account details' />

            <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-8 shadow-regular-xs'>
                <div className='max-w-xl'>
                    <h3 className='text-label-lg text-text-strong-950 font-semibold mb-6'>Administrator Details</h3>

                    <form onSubmit={handleSave} className='space-y-5'>
                        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
                            <div className='space-y-1.5'>
                                <label className='text-label-sm text-text-strong-950 font-medium'>Full Name</label>
                                <input
                                    name='fullName'
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder='Your full name'
                                    className='h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16 transition-all'
                                />
                            </div>
                            <div className='space-y-1.5'>
                                <label className='text-label-sm text-text-strong-950 font-medium'>Email Address</label>
                                <input
                                    name='email'
                                    type='email'
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder='admin@peptiful.com'
                                    className='h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16 transition-all'
                                />
                            </div>
                            <div className='space-y-1.5'>
                                <label className='text-label-sm text-text-strong-950 font-medium'>New Password</label>
                                <input
                                    name='password'
                                    type='password'
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder='Leave blank to keep current'
                                    className='h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16 transition-all'
                                />
                            </div>
                            <div className='space-y-1.5'>
                                <label className='text-label-sm text-text-strong-950 font-medium'>Account Role</label>
                                <div className='h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-weak-50 px-3 flex items-center text-paragraph-sm text-text-sub-600'>
                                    {contextUser?.role}
                                </div>
                            </div>
                        </div>

                        <div className='pt-2 flex items-center gap-4'>
                            <Button type='submit' disabled={saving}>
                                {saving && <RiLoader4Line className='size-4 animate-spin' />}
                                {saving ? 'Saving...' : 'Save Changes'}
                            </Button>

                            {feedback && (
                                <div className={`flex items-center gap-1.5 text-label-xs ${feedback.type === 'success' ? 'text-success-base' : 'text-error-base'} animate-in fade-in slide-in-from-left-2`}>
                                    {feedback.type === 'success' ? <RiCheckLine className='size-4' /> : <RiErrorWarningLine className='size-4' />}
                                    {feedback.message}
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
