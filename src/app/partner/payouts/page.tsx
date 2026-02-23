'use client';

import { PageHeader } from '@/components/ui/page-header-new';
import { Badge } from '@/components/ui/badge-new';
import { Button } from '@/components/ui/button-new';
import { RiCalendarCheckLine, RiMoneyDollarCircleLine, RiBankCardLine, RiEditLine, RiExternalLinkLine } from '@remixicon/react';

const payouts = [
  { id: 'PPAY-018', date: 'Feb 15, 2026', amount: '$4,520', method: 'Bank Transfer', status: 'completed' },
  { id: 'PPAY-017', date: 'Jan 15, 2026', amount: '$5,180', method: 'Bank Transfer', status: 'completed' },
  { id: 'PPAY-016', date: 'Dec 15, 2025', amount: '$4,210', method: 'Bank Transfer', status: 'completed' },
  { id: 'PPAY-015', date: 'Nov 15, 2025', amount: '$3,860', method: 'Bank Transfer', status: 'completed' },
  { id: 'PPAY-014', date: 'Oct 15, 2025', amount: '$3,240', method: 'PayPal', status: 'completed' },
];

export default function PartnerPayoutsPage() {
  return (
    <div className='space-y-6'>
      <PageHeader title='Payouts' description='Track your commission payouts' />
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
        <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-5 shadow-regular-xs'>
          <div className='flex items-center gap-3'>
            <div className='flex size-10 items-center justify-center rounded-10 bg-primary-alpha-10'><RiCalendarCheckLine className='size-5 text-primary-base' /></div>
            <div>
              <p className='text-label-xs text-text-sub-600'>Next Payout</p>
              <p className='text-title-h5 text-text-strong-950'>$5,630</p>
            </div>
          </div>
          <div className='mt-4 rounded-10 bg-bg-weak-50 px-3 py-2 flex justify-between'>
            <span className='text-paragraph-xs text-text-sub-600'>Scheduled</span>
            <span className='text-label-xs text-text-strong-950'>Mar 15, 2026</span>
          </div>
        </div>
        <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-5 shadow-regular-xs'>
          <div className='flex items-center gap-3'>
            <div className='flex size-10 items-center justify-center rounded-10 bg-success-lighter'><RiMoneyDollarCircleLine className='size-5 text-success-base' /></div>
            <div>
              <p className='text-label-xs text-text-sub-600'>Total Received</p>
              <p className='text-title-h5 text-text-strong-950'>$21,010</p>
            </div>
          </div>
          <div className='mt-4 rounded-10 bg-bg-weak-50 px-3 py-2 flex justify-between'>
            <span className='text-paragraph-xs text-text-sub-600'>Payouts</span>
            <span className='text-label-xs text-text-strong-950'>5 completed</span>
          </div>
        </div>
        <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-5 shadow-regular-xs'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='flex size-10 items-center justify-center rounded-10 bg-bg-weak-50'><RiBankCardLine className='size-5 text-text-soft-400' /></div>
              <div>
                <p className='text-label-xs text-text-sub-600'>Payment Method</p>
                <p className='text-label-md text-text-strong-950'>Bank Transfer</p>
              </div>
            </div>
            <Button variant='ghost' size='xs'><RiEditLine className='size-4' />Edit</Button>
          </div>
          <div className='mt-4 rounded-10 bg-bg-weak-50 px-3 py-2 flex justify-between'>
            <span className='text-paragraph-xs text-text-sub-600'>Account</span>
            <span className='text-label-xs text-text-strong-950'>**** 7291</span>
          </div>
        </div>
      </div>
      <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs overflow-hidden'>
        <div className='border-b border-stroke-soft-200 px-5 py-4'>
          <h3 className='text-label-md text-text-strong-950'>Payout History</h3>
        </div>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-stroke-soft-200 bg-bg-weak-50'>
              {['Payout ID', 'Date', 'Amount', 'Method', 'Status', ''].map((h) => (
                <th key={h} className='px-5 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600'>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {payouts.map((p) => (
              <tr key={p.id} className='border-b border-stroke-soft-200 last:border-0 hover:bg-bg-weak-50 transition-colors'>
                <td className='px-5 py-3.5 text-label-sm text-text-strong-950'>{p.id}</td>
                <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{p.date}</td>
                <td className='px-5 py-3.5 text-label-sm text-text-strong-950'>{p.amount}</td>
                <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{p.method}</td>
                <td className='px-5 py-3.5'><Badge variant='light' color='success' size='sm' dot>Completed</Badge></td>
                <td className='px-5 py-3.5'><Button variant='ghost' size='xs'><RiExternalLinkLine className='size-3.5' />View</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
