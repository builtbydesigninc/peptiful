'use client';

import * as React from 'react';
import { cn } from '@/utils/cn';
import { PageHeader } from '@/components/ui/page-header-new';
import { Button } from '@/components/ui/button-new';
import { Badge } from '@/components/ui/badge-new';

function Toggle({ defaultChecked }: { defaultChecked?: boolean }) {
  const [checked, setChecked] = React.useState(defaultChecked ?? false);
  return (
    <button onClick={() => setChecked(!checked)} className={cn('relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors cursor-pointer', checked ? 'bg-primary-base' : 'bg-bg-soft-200')}>
      <span className={cn('inline-block size-4 rounded-full bg-white shadow-switch-thumb transition-transform', checked ? 'translate-x-[18px]' : 'translate-x-0.5')} />
    </button>
  );
}

export default function AdminSettingsPage() {
  return (
    <div className='space-y-6'>
      <PageHeader title='Platform Settings' description='Global configuration for the Peptiful platform' />

      <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-6 shadow-regular-xs'>
        <div className='max-w-lg space-y-6'>
          <h3 className='text-label-lg text-text-strong-950'>General</h3>
          <div className='space-y-1.5'>
            <label className='text-label-sm text-text-strong-950'>Platform Name</label>
            <input defaultValue='Peptiful' className='h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16' />
          </div>
          <div className='space-y-1.5'>
            <label className='text-label-sm text-text-strong-950'>Support Email</label>
            <input defaultValue='support@peptiful.com' className='h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16' />
          </div>
          <div className='space-y-1.5'>
            <label className='text-label-sm text-text-strong-950'>Default Partner Commission Rate</label>
            <div className='flex items-center gap-2'>
              <input defaultValue='10' type='number' className='h-10 w-24 rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16' />
              <span className='text-label-sm text-text-sub-600'>%</span>
            </div>
          </div>
          <Button>Save Changes</Button>
        </div>
      </div>

      <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-6 shadow-regular-xs'>
        <h3 className='mb-4 text-label-lg text-text-strong-950'>Feature Flags</h3>
        <div className='max-w-lg space-y-4'>
          {[
            { label: 'Brand Self-Registration', desc: 'Allow brands to sign up without partner referral', on: true },
            { label: 'Two-Tier Affiliates', desc: 'Enable L1/L2 affiliate hierarchy', on: true },
            { label: 'Custom Domains', desc: 'Allow brands to connect custom domains (Phase 2)', on: false },
            { label: 'Multi-Currency', desc: 'Support international currencies (Phase 3)', on: false },
            { label: 'API Access', desc: 'Public API for advanced partners', on: false },
          ].map((f) => (
            <div key={f.label} className='flex items-center justify-between border-b border-stroke-soft-200 py-3 last:border-0'>
              <div>
                <div className='flex items-center gap-2'>
                  <p className='text-label-sm text-text-strong-950'>{f.label}</p>
                  {!f.on && <Badge variant='stroke' color='gray' size='sm'>Coming Soon</Badge>}
                </div>
                <p className='text-paragraph-xs text-text-sub-600'>{f.desc}</p>
              </div>
              <Toggle defaultChecked={f.on} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
