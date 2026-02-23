'use client';

import * as React from 'react';
import { PageHeader } from '@/components/ui/page-header-new';
import { Button } from '@/components/ui/button-new';
import { Badge } from '@/components/ui/badge-new';
import { RiFileCopyLine, RiCheckLine, RiLink, RiMailLine, RiTwitterLine, RiLinkedinLine, RiQrCodeLine } from '@remixicon/react';

export default function ReferralToolsPage() {
  const [copied, setCopied] = React.useState<string | null>(null);
  const copy = (key: string) => { setCopied(key); setTimeout(() => setCopied(null), 2000); };

  const links = [
    { id: 'main', label: 'Main Referral Link', url: 'peptiful.com/join/partner_marcus', desc: 'General brand recruitment link' },
    { id: 'landing', label: 'Custom Landing Page', url: 'peptiful.com/partners/marcus-rivera', desc: 'Branded landing page with your bio' },
    { id: 'utm', label: 'UTM Tracked Link', url: 'peptiful.com/join/partner_marcus?utm_source=email&utm_medium=outreach', desc: 'For email campaigns' },
  ];

  return (
    <div className='space-y-6'>
      <PageHeader title='Referral Tools' description='Share your referral links and recruit new brands' />

      {/* Referral Links */}
      <div className='space-y-4'>
        {links.map((link) => (
          <div key={link.id} className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-5 shadow-regular-xs'>
            <div className='flex items-start justify-between mb-3'>
              <div>
                <p className='text-label-sm text-text-strong-950'>{link.label}</p>
                <p className='text-paragraph-xs text-text-sub-600'>{link.desc}</p>
              </div>
              <Badge variant='light' color='success' size='sm'>Active</Badge>
            </div>
            <div className='flex items-center gap-2 rounded-10 border border-stroke-soft-200 bg-bg-weak-50 px-3 py-2.5'>
              <RiLink className='size-4 shrink-0 text-text-soft-400' />
              <span className='flex-1 truncate text-paragraph-sm text-text-sub-600'>{link.url}</span>
              <Button variant='secondary' size='xs' onClick={() => copy(link.id)}>
                {copied === link.id ? <RiCheckLine className='size-3.5' /> : <RiFileCopyLine className='size-3.5' />}
                {copied === link.id ? 'Copied' : 'Copy'}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Share Options */}
      <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-6 shadow-regular-xs'>
        <h3 className='mb-4 text-label-md text-text-strong-950'>Quick Share</h3>
        <div className='grid grid-cols-2 gap-3 sm:grid-cols-4'>
          {[
            { label: 'Email', icon: RiMailLine, color: 'bg-blue-50 text-blue-600' },
            { label: 'Twitter / X', icon: RiTwitterLine, color: 'bg-gray-100 text-gray-800' },
            { label: 'LinkedIn', icon: RiLinkedinLine, color: 'bg-blue-50 text-blue-700' },
            { label: 'QR Code', icon: RiQrCodeLine, color: 'bg-gray-50 text-gray-700' },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <button key={s.label} className='flex items-center gap-3 rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-4 text-left transition-all hover:shadow-regular-xs cursor-pointer'>
                <div className={`flex size-10 items-center justify-center rounded-10 ${s.color}`}>
                  <Icon className='size-5' />
                </div>
                <span className='text-label-sm text-text-strong-950'>{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stats */}
      <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-6 shadow-regular-xs'>
        <h3 className='mb-4 text-label-md text-text-strong-950'>Link Performance</h3>
        <div className='grid grid-cols-3 gap-4'>
          <div className='rounded-10 bg-bg-weak-50 p-4 text-center'>
            <p className='text-title-h5 text-text-strong-950'>248</p>
            <p className='text-paragraph-xs text-text-sub-600'>Total Clicks</p>
          </div>
          <div className='rounded-10 bg-bg-weak-50 p-4 text-center'>
            <p className='text-title-h5 text-text-strong-950'>12</p>
            <p className='text-paragraph-xs text-text-sub-600'>Signups</p>
          </div>
          <div className='rounded-10 bg-bg-weak-50 p-4 text-center'>
            <p className='text-title-h5 text-success-base'>4.8%</p>
            <p className='text-paragraph-xs text-text-sub-600'>Conversion</p>
          </div>
        </div>
      </div>
    </div>
  );
}
