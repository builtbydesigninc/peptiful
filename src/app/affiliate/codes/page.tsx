'use client';

import { PageHeader } from '@/components/ui/page-header-new';
import { Badge } from '@/components/ui/badge-new';
import { Button } from '@/components/ui/button-new';
import { RiFileCopyLine, RiShareLine } from '@remixicon/react';

const codes = [
  { code: 'MIKE10', discount: '10% off', uses: 38, limit: 'Unlimited', revenue: '$2,450', earned: '$122.50', expires: 'Never', active: true },
  { code: 'MIKE20', discount: '20% off', uses: 12, limit: '50', revenue: '$890', earned: '$44.50', expires: 'Mar 31, 2026', active: true },
  { code: 'MIKEFLASH', discount: '15% off', uses: 25, limit: '25', revenue: '$1,200', earned: '$60.00', expires: 'Expired', active: false },
];

export default function PromoterCodesPage() {
  return (
    <div className='space-y-6'>
      <PageHeader title='My Codes' description='Your promo codes and their performance' />
      <div className='grid gap-4'>
        {codes.map((c) => (
          <div key={c.code} className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-5 shadow-regular-xs'>
            <div className='flex items-start justify-between mb-4'>
              <div>
                <div className='flex items-center gap-2'>
                  <span className='text-title-h6 font-bold tracking-wider text-text-strong-950'>{c.code}</span>
                  <Badge variant='light' color={c.active ? 'success' : 'gray'} size='sm' dot>{c.active ? 'Active' : 'Expired'}</Badge>
                </div>
                <p className='mt-0.5 text-paragraph-sm text-text-sub-600'>{c.discount} • Expires: {c.expires}</p>
              </div>
              <div className='flex gap-2'>
                <Button variant='secondary' size='xs'><RiFileCopyLine className='size-3.5' />Copy</Button>
                <Button variant='secondary' size='xs'><RiShareLine className='size-3.5' />Share</Button>
              </div>
            </div>
            <div className='grid grid-cols-4 gap-4'>
              <div className='rounded-10 bg-bg-weak-50 p-3 text-center'>
                <p className='text-label-md text-text-strong-950'>{c.uses}</p>
                <p className='text-paragraph-xs text-text-sub-600'>Uses</p>
              </div>
              <div className='rounded-10 bg-bg-weak-50 p-3 text-center'>
                <p className='text-label-md text-text-sub-600'>{c.limit}</p>
                <p className='text-paragraph-xs text-text-sub-600'>Limit</p>
              </div>
              <div className='rounded-10 bg-bg-weak-50 p-3 text-center'>
                <p className='text-label-md text-text-strong-950'>{c.revenue}</p>
                <p className='text-paragraph-xs text-text-sub-600'>Revenue</p>
              </div>
              <div className='rounded-10 bg-bg-weak-50 p-3 text-center'>
                <p className='text-label-md text-success-base'>{c.earned}</p>
                <p className='text-paragraph-xs text-text-sub-600'>You Earned</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
