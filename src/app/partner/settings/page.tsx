'use client';

import * as React from 'react';
import { cn } from '@/utils/cn';
import { PageHeader } from '@/components/ui/page-header-new';
import { Button } from '@/components/ui/button-new';

import { partnerApi } from '@/lib/api-client';

function Field({ label, value, hint, onChange, name }: { label: string; value?: string; hint?: string; name: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div className='space-y-1.5'>
      <label className='text-label-sm text-text-strong-950'>{label}</label>
      <input
        name={name}
        value={value || ''}
        onChange={onChange}
        className='h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 placeholder:text-text-disabled-300 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16'
      />
      {hint && <p className='text-paragraph-xs text-text-soft-400'>{hint}</p>}
    </div>
  );
}

export default function PartnerSettingsPage() {
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [formData, setFormData] = React.useState({
    fullName: '',
    email: '',
    companyName: '',
    phone: '',
    website: '',
    bio: '',
  });

  const fetchData = React.useCallback(async () => {
    try {
      const profile = await partnerApi.getProfileFields();
      setFormData({
        fullName: profile.user?.fullName || '',
        email: profile.user?.email || '',
        companyName: profile.company || '',
        phone: profile.user?.phone || '',
        website: profile.website || '',
        bio: profile.bio || '',
      });
    } catch (error) {
      console.error('Failed to fetch profile settings:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await partnerApi.updateProfile(formData);
      // Optional: show success toast
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-4 border-primary-base border-t-transparent" />
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <PageHeader title='Settings' description='Manage your partner account' />
      <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-6 shadow-regular-xs transition-all hover:shadow-regular-sm'>
        <div className='max-w-lg space-y-6'>
          <h3 className='text-label-lg text-text-strong-950'>Profile</h3>
          <Field name='fullName' label='Full Name' value={formData.fullName} onChange={handleChange} />
          <Field name='email' label='Email' value={formData.email} onChange={handleChange} />
          <Field name='companyName' label='Company Name' value={formData.companyName} onChange={handleChange} />
          <Field name='phone' label='Phone' value={formData.phone} onChange={handleChange} />
          <Field name='website' label='Website' value={formData.website} onChange={handleChange} hint='Your company website (shown on referral landing page)' />

          <div className='space-y-1.5'>
            <label className='text-label-sm text-text-strong-950'>Bio</label>
            <textarea
              name='bio'
              value={formData.bio}
              onChange={handleChange}
              rows={3}
              className='w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 py-2.5 text-paragraph-sm text-text-strong-950 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16 resize-none transition-all'
            />
            <p className='text-paragraph-xs text-text-soft-400'>Shown on your referral landing page</p>
          </div>

          <Button onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  );
}
