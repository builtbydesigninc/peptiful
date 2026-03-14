'use client';

import { PageHeader } from '@/components/ui/page-header-new';
import { Badge } from '@/components/ui/badge-new';
import { Button } from '@/components/ui/button-new';
import { RiExternalLinkLine, RiFileCopyLine, RiLoader4Line } from '@remixicon/react';
import { useEffect, useState } from 'react';
import { affiliateApi } from '@/lib/api-client';
import { AlertBanner } from '@/components/ui/alert-banner';

interface Brand {
  id: string;
  name: string;
  slug: string;
  domain: string;
  rate: string;
  orders: number;
  earnings: string;
  status: string;
}

export default function AffiliateBrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setError(null);
        const data = await affiliateApi.getBrands();
        setBrands(data);
      } catch (err: any) {
        console.error('Failed to fetch brands:', err);
        setError('Failed to load brands. Please refresh the page.');
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, []);

  if (loading) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <RiLoader4Line className='size-8 animate-spin text-text-soft-400' />
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <PageHeader title='My Brands' description='Brands you promote as an L1 affiliate' />

      {error && (
        <AlertBanner
          variant='error'
          title='Error'
          description={error || undefined}
          action={{
            label: 'Retry',
            onClick: () => {
              setLoading(true);
              setError(null);
              affiliateApi.getBrands().then(data => {
                setBrands(data);
                setLoading(false);
              }).catch(err => {
                console.error('Failed to fetch brands:', err);
                setError('Failed to load brands. Please refresh the page.');
                setLoading(false);
              });
            }
          }}
        />
      )}

      <div className='grid gap-4'>
        {!error && brands.length === 0 ? (
          <div className='rounded-xl border border-dashed border-stroke-soft-200 p-12 text-center'>
            <p className='text-paragraph-sm text-text-sub-600'>No brands found.</p>
          </div>
        ) : (
          brands.map((b) => (
            <div key={b.id} className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-5 shadow-regular-xs'>
              <div className='flex items-start justify-between'>
                <div>
                  <div className='flex items-center gap-2'>
                    <h3 className='text-label-md text-text-strong-950'>{b.name}</h3>
                    <Badge variant='light' color={b.status === 'active' ? 'success' : 'warning'} size='sm' dot>
                      {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                    </Badge>
                  </div>
                  <p className='mt-0.5 text-paragraph-xs text-text-sub-600'>{b.domain}</p>
                </div>
                <div className='flex gap-2'>
                  <Button variant='ghost' size='xs' onClick={() => {
                    navigator.clipboard.writeText(`https://${b.domain}`);
                  }}>
                    <RiFileCopyLine className='size-3.5' />Copy Link
                  </Button>
                  <Button variant='ghost' size='xs' onClick={() => window.open(`https://${b.domain}`, '_blank')}>
                    <RiExternalLinkLine className='size-3.5' />Visit
                  </Button>
                </div>
              </div>
              <div className='mt-4 grid grid-cols-3 gap-4'>
                <div className='rounded-10 bg-bg-weak-50 p-3 text-center'>
                  <p className='text-title-h6 text-text-strong-950'>{b.rate}</p>
                  <p className='text-paragraph-xs text-text-sub-600'>Commission Rate</p>
                </div>
                <div className='rounded-10 bg-bg-weak-50 p-3 text-center'>
                  <p className='text-title-h6 text-text-strong-950'>{b.orders}</p>
                  <p className='text-paragraph-xs text-text-sub-600'>Orders Referred</p>
                </div>
                <div className='rounded-10 bg-bg-weak-50 p-3 text-center'>
                  <p className='text-title-h6 text-success-base'>{b.earnings}</p>
                  <p className='text-paragraph-xs text-text-sub-600'>Total Earnings</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
