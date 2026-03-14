'use client';

import * as React from 'react';
import { PageHeader } from '@/components/ui/page-header-new';
import { Badge } from '@/components/ui/badge-new';
import { Button } from '@/components/ui/button-new';
import { RiFileCopyLine, RiShareLine, RiLoader4Line } from '@remixicon/react';
import { useAffiliate } from '../context';
import { affiliateApi } from '@/lib/api-client';
import { AlertBanner } from '@/components/ui/alert-banner';

export default function PromoterCodesPage() {
  const { getSelectedBrand, isLoading: ctxLoading } = useAffiliate();
  const selectedBrand = getSelectedBrand();

  const [codes, setCodes] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!selectedBrand?.id) return;

    const fetchCodes = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await affiliateApi.getCodes(selectedBrand.id);
        setCodes(result.data || []);
      } catch (error) {
        console.error('Failed to fetch codes:', error);
        setError('Failed to load promo codes. Please refresh the page.');
      } finally {
        setLoading(false);
      }
    };
    fetchCodes();
  }, [selectedBrand?.id]);

  const copy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  if (ctxLoading) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <RiLoader4Line className='size-8 animate-spin text-text-soft-400' />
      </div>
    );
  }

  if (!selectedBrand) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <p className='text-paragraph-sm text-text-sub-600'>Please select a brand to view your promo codes.</p>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <PageHeader title='My Codes' description='Your promo codes and their performance' />

      {error && (
        <AlertBanner
          variant='error'
          title='Error'
          description={error || undefined}
          action={{
            label: 'Retry',
            onClick: () => {
              if (!selectedBrand?.id) return;
              setLoading(true);
              setError(null);
              affiliateApi.getCodes(selectedBrand.id).then(result => {
                setCodes(result.data || []);
                setLoading(false);
              }).catch(err => {
                console.error('Failed to fetch codes:', err);
                setError('Failed to load promo codes. Please refresh the page.');
                setLoading(false);
              });
            }
          }}
        />
      )}

      <div className='grid gap-4'>
        {loading ? (
          <div className='flex h-64 items-center justify-center'>
            <RiLoader4Line className='size-8 animate-spin text-text-soft-400' />
          </div>
        ) : !error && codes.length === 0 ? (
          <div className='rounded-xl border border-dashed border-stroke-soft-200 p-12 text-center'>
            <p className='text-paragraph-sm text-text-sub-600'>No promo codes found for this brand.</p>
          </div>
        ) : (
          codes.map((c) => {
            const isActive = c.status === 'ACTIVE' && (!c.expiresAt || new Date(c.expiresAt) > new Date());
            const discountLabel = c.discountType === 'PERCENTAGE' ? `${c.discountValue}% off` : `$${c.discountValue} off`;
            const expiryLabel = c.expiresAt ? new Date(c.expiresAt).toLocaleDateString() : 'Never';

            return (
              <div key={c.id} className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-5 shadow-regular-xs transition-all hover:shadow-regular-sm'>
                <div className='flex items-start justify-between mb-4'>
                  <div>
                    <div className='flex items-center gap-2'>
                      <span className='text-title-h6 font-bold tracking-wider text-text-strong-950'>{c.code}</span>
                      <Badge variant='light' color={isActive ? 'success' : 'gray'} size='sm' dot>
                        {isActive ? 'Active' : (c.status === 'INACTIVE' ? 'Inactive' : 'Expired')}
                      </Badge>
                    </div>
                    <p className='mt-0.5 text-paragraph-sm text-text-sub-600'>{discountLabel} • Expires: {expiryLabel}</p>
                  </div>
                  <div className='flex gap-2'>
                    <Button variant='secondary' size='xs' onClick={() => copy(c.code)}>
                      <RiFileCopyLine className='size-3.5' />
                      {copied === c.code ? 'Copied' : 'Copy'}
                    </Button>
                    <Button variant='secondary' size='xs'>
                      <RiShareLine className='size-3.5' />Share
                    </Button>
                  </div>
                </div>
                <div className='grid grid-cols-4 gap-4'>
                  <div className='rounded-10 bg-bg-weak-50 p-3 text-center'>
                    <p className='text-label-md text-text-strong-950'>{c.uses || 0}</p>
                    <p className='text-paragraph-xs text-text-sub-600'>Uses</p>
                  </div>
                  <div className='rounded-10 bg-bg-weak-50 p-3 text-center'>
                    <p className='text-label-md text-text-sub-600'>{c.usageLimit || 'Unlimited'}</p>
                    <p className='text-paragraph-xs text-text-sub-600'>Limit</p>
                  </div>
                  <div className='rounded-10 bg-bg-weak-50 p-3 text-center'>
                    <p className='text-label-md text-text-strong-950'>${Number(c.revenue || 0).toLocaleString()}</p>
                    <p className='text-paragraph-xs text-text-sub-600'>Revenue</p>
                  </div>
                  <div className='rounded-10 bg-bg-weak-50 p-3 text-center'>
                    <p className='text-label-md text-success-base'>${Number(c.earnings || 0).toLocaleString()}</p>
                    <p className='text-paragraph-xs text-text-sub-600'>You Earned</p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
