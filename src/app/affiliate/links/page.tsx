'use client';

import * as React from 'react';
import { PageHeader } from '@/components/ui/page-header-new';
import { Button } from '@/components/ui/button-new';
import { Badge } from '@/components/ui/badge-new';
import { RiFileCopyLine, RiCheckLine, RiLink } from '@remixicon/react';

const links = [
  { brand: 'PeptideGains', url: 'peptidegains.peptiful.com/?ref=jessica_parker', clicks: 142, conversions: 48, rate: '33.8%' },
  { brand: 'BioStack Health', url: 'biostack.peptiful.com/?ref=jessica_parker', clicks: 89, conversions: 22, rate: '24.7%' },
  { brand: 'VitalPure Labs', url: 'vitalpure.peptiful.com/?ref=jessica_parker', clicks: 34, conversions: 8, rate: '23.5%' },
];

export default function AffiliateLinksPage() {
  const [copied, setCopied] = React.useState<string | null>(null);
  const copy = (url: string) => { setCopied(url); setTimeout(() => setCopied(null), 2000); };

  return (
    <div className='space-y-6'>
      <PageHeader title='Referral Links' description='Your unique tracking links for each brand' />
      <div className='grid gap-4'>
        {links.map((l) => (
          <div key={l.brand} className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-5 shadow-regular-xs'>
            <div className='flex items-center justify-between mb-3'>
              <h3 className='text-label-md text-text-strong-950'>{l.brand}</h3>
              <Badge variant='light' color='success' size='sm'>Active</Badge>
            </div>
            <div className='flex items-center gap-2 rounded-10 border border-stroke-soft-200 bg-bg-weak-50 px-3 py-2.5 mb-4'>
              <RiLink className='size-4 shrink-0 text-text-soft-400' />
              <span className='flex-1 truncate text-paragraph-sm text-text-sub-600'>{l.url}</span>
              <Button variant='secondary' size='xs' onClick={() => copy(l.url)}>
                {copied === l.url ? <RiCheckLine className='size-3.5' /> : <RiFileCopyLine className='size-3.5' />}
                {copied === l.url ? 'Copied' : 'Copy'}
              </Button>
            </div>
            <div className='grid grid-cols-3 gap-4'>
              <div className='rounded-10 bg-bg-weak-50 p-3 text-center'>
                <p className='text-label-md text-text-strong-950'>{l.clicks}</p>
                <p className='text-paragraph-xs text-text-sub-600'>Clicks</p>
              </div>
              <div className='rounded-10 bg-bg-weak-50 p-3 text-center'>
                <p className='text-label-md text-text-strong-950'>{l.conversions}</p>
                <p className='text-paragraph-xs text-text-sub-600'>Conversions</p>
              </div>
              <div className='rounded-10 bg-bg-weak-50 p-3 text-center'>
                <p className='text-label-md text-success-base'>{l.rate}</p>
                <p className='text-paragraph-xs text-text-sub-600'>Conv. Rate</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
