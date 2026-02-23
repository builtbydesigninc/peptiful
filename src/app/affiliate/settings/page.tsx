'use client';

import { PageHeader } from '@/components/ui/page-header-new';
import { Button } from '@/components/ui/button-new';

export default function AffiliateSettingsPage() {
  return (
    <div className='space-y-6'>
      <PageHeader title='Settings' description='Manage your affiliate profile' />
      <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-6 shadow-regular-xs'>
        <div className='max-w-lg space-y-5'>
          <h3 className='text-label-lg text-text-strong-950'>Profile</h3>
          {[
            { label: 'Full Name', value: 'Jessica Parker' },
            { label: 'Email', value: 'jessica@fitness.com' },
            { label: 'Phone', value: '+1 (555) 890-1234' },
            { label: 'Social Profile', value: 'https://instagram.com/jessicafitness' },
          ].map((f) => (
            <div key={f.label} className='space-y-1.5'>
              <label className='text-label-sm text-text-strong-950'>{f.label}</label>
              <input defaultValue={f.value} className='h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16' />
            </div>
          ))}
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}
