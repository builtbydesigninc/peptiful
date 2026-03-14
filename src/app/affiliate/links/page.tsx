'use client';

import * as React from 'react';
import { PageHeader } from '@/components/ui/page-header-new';
import { Button } from '@/components/ui/button-new';
import { Badge } from '@/components/ui/badge-new';
import { RiFileCopyLine, RiCheckLine, RiLink, RiLoader4Line } from '@remixicon/react';
import { affiliateApi } from '@/lib/api-client';

interface ReferralLink {
  id: string;
  brand: string;
  brandId: string;
  url: string;
  clicks: number;
  conversions: number;
  rate: string;
  status: string;
}

export default function AffiliateLinksPage() {
  const [links, setLinks] = React.useState<ReferralLink[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [copied, setCopied] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchLinks = async () => {
      try {
        const data = await affiliateApi.getAllLinks();
        setLinks(data);
      } catch (error) {
        console.error('Failed to fetch links:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLinks();
  }, []);

  const copy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 2000);
  };

  if (loading) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <RiLoader4Line className='size-8 animate-spin text-text-soft-400' />
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <PageHeader title='Referral Links' description='Your unique tracking links for each brand' />
      <div className='grid gap-4'>
        {links.length === 0 ? (
          <div className='rounded-xl border border-dashed border-stroke-soft-200 p-12 text-center'>
            <p className='text-paragraph-sm text-text-sub-600'>No referral links found.</p>
          </div>
        ) : (
          links.map((l) => (
            <div key={l.id} className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-5 shadow-regular-xs'>
              <div className='flex items-center justify-between mb-3'>
                <h3 className='text-label-md text-text-strong-950'>{l.brand}</h3>
                <Badge variant='light' color={l.status === 'active' ? 'success' : 'warning'} size='sm'>
                  {l.status.charAt(0).toUpperCase() + l.status.slice(1)}
                </Badge>
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
          ))
        )}
      </div>
    </div>
  );
}
