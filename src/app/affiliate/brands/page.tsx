'use client';

import { PageHeader } from '@/components/ui/page-header-new';
import { Badge } from '@/components/ui/badge-new';
import { Button } from '@/components/ui/button-new';
import { RiExternalLinkLine, RiFileCopyLine } from '@remixicon/react';

const brands = [
  { name: 'PeptideGains', domain: 'peptidegains.peptiful.com', rate: '15%', orders: 48, earnings: '$4,280', status: 'active' },
  { name: 'BioStack Health', domain: 'biostack.peptiful.com', rate: '12%', orders: 22, earnings: '$1,980', status: 'active' },
  { name: 'VitalPure Labs', domain: 'vitalpure.peptiful.com', rate: '10%', orders: 8, earnings: '$640', status: 'active' },
];

export default function AffiliateBrandsPage() {
  return (
    <div className='space-y-6'>
      <PageHeader title='My Brands' description='Brands you promote as an L1 affiliate' />
      <div className='grid gap-4'>
        {brands.map((b) => (
          <div key={b.name} className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-5 shadow-regular-xs'>
            <div className='flex items-start justify-between'>
              <div>
                <div className='flex items-center gap-2'>
                  <h3 className='text-label-md text-text-strong-950'>{b.name}</h3>
                  <Badge variant='light' color='success' size='sm' dot>Active</Badge>
                </div>
                <p className='mt-0.5 text-paragraph-xs text-text-sub-600'>{b.domain}</p>
              </div>
              <div className='flex gap-2'>
                <Button variant='ghost' size='xs'><RiFileCopyLine className='size-3.5' />Copy Link</Button>
                <Button variant='ghost' size='xs'><RiExternalLinkLine className='size-3.5' />Visit</Button>
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
        ))}
      </div>
    </div>
  );
}
