'use client';

import * as React from 'react';
import { cn } from '@/utils/cn';
import { PageHeader } from '@/components/ui/page-header-new';
import { Button } from '@/components/ui/button-new';

function Field({ label, value, hint }: { label: string; value?: string; hint?: string }) {
  return (
    <div className='space-y-1.5'>
      <label className='text-label-sm text-text-strong-950'>{label}</label>
      <input defaultValue={value} className='h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 placeholder:text-text-disabled-300 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16' />
      {hint && <p className='text-paragraph-xs text-text-soft-400'>{hint}</p>}
    </div>
  );
}

export default function PartnerSettingsPage() {
  return (
    <div className='space-y-6'>
      <PageHeader title='Settings' description='Manage your partner account' />
      <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-6 shadow-regular-xs'>
        <div className='max-w-lg space-y-6'>
          <h3 className='text-label-lg text-text-strong-950'>Profile</h3>
          <Field label='Full Name' value='Marcus Rivera' />
          <Field label='Email' value='marcus@wellness-partners.co' />
          <Field label='Company Name' value='Wellness Partners Co.' />
          <Field label='Phone' value='+1 (555) 234-5678' />
          <Field label='Website' value='https://wellness-partners.co' hint='Your company website (shown on referral landing page)' />
          <div className='space-y-1.5'>
            <label className='text-label-sm text-text-strong-950'>Bio</label>
            <textarea defaultValue='Helping supplement brands scale with white-label dropshipping since 2020.' rows={3} className='w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 py-2.5 text-paragraph-sm text-text-strong-950 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16 resize-none' />
            <p className='text-paragraph-xs text-text-soft-400'>Shown on your referral landing page</p>
          </div>
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}
