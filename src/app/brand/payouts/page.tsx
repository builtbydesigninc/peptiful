'use client';

import { cn } from '@/utils/cn';
import { PageHeader } from '@/components/ui/page-header-new';
import { Badge } from '@/components/ui/badge-new';
import { Button } from '@/components/ui/button-new';
import {
  RiWallet3Line,
  RiBankCardLine,
  RiCalendarCheckLine,
  RiMoneyDollarCircleLine,
  RiExternalLinkLine,
  RiEditLine,
} from '@remixicon/react';

const payoutHistory = [
  { id: 'PAY-042', date: 'Feb 15, 2026', amount: '$4,648', method: 'Bank Transfer', status: 'completed' },
  { id: 'PAY-041', date: 'Jan 15, 2026', amount: '$6,492', method: 'Bank Transfer', status: 'completed' },
  { id: 'PAY-040', date: 'Dec 15, 2025', amount: '$4,982', method: 'Bank Transfer', status: 'completed' },
  { id: 'PAY-039', date: 'Nov 15, 2025', amount: '$4,268', method: 'Bank Transfer', status: 'completed' },
  { id: 'PAY-038', date: 'Oct 15, 2025', amount: '$3,584', method: 'Bank Transfer', status: 'completed' },
  { id: 'PAY-037', date: 'Sep 15, 2025', amount: '$2,910', method: 'PayPal', status: 'completed' },
  { id: 'PAY-036', date: 'Aug 15, 2025', amount: '$2,120', method: 'PayPal', status: 'completed' },
];

export default function PayoutsPage() {
  return (
    <div className='space-y-6'>
      <PageHeader title='Payouts' description='Track your earnings and manage payment methods' />

      {/* Summary Cards */}
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
        {/* Next Payout */}
        <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-5 shadow-regular-xs'>
          <div className='flex items-center gap-3'>
            <div className='flex size-10 items-center justify-center rounded-10 bg-primary-alpha-10'>
              <RiCalendarCheckLine className='size-5 text-primary-base' />
            </div>
            <div>
              <p className='text-label-xs text-text-sub-600'>Next Payout</p>
              <p className='text-title-h5 text-text-strong-950'>$5,412</p>
            </div>
          </div>
          <div className='mt-4 flex items-center justify-between rounded-10 bg-bg-weak-50 px-3 py-2'>
            <span className='text-paragraph-xs text-text-sub-600'>Scheduled for</span>
            <span className='text-label-xs text-text-strong-950'>Mar 15, 2026</span>
          </div>
          <div className='mt-2 flex items-center justify-between rounded-10 bg-bg-weak-50 px-3 py-2'>
            <span className='text-paragraph-xs text-text-sub-600'>Period</span>
            <span className='text-label-xs text-text-strong-950'>Feb 1 - Feb 28</span>
          </div>
        </div>

        {/* Total Received */}
        <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-5 shadow-regular-xs'>
          <div className='flex items-center gap-3'>
            <div className='flex size-10 items-center justify-center rounded-10 bg-success-lighter'>
              <RiMoneyDollarCircleLine className='size-5 text-success-base' />
            </div>
            <div>
              <p className='text-label-xs text-text-sub-600'>Total Received</p>
              <p className='text-title-h5 text-text-strong-950'>$29,004</p>
            </div>
          </div>
          <div className='mt-4 flex items-center justify-between rounded-10 bg-bg-weak-50 px-3 py-2'>
            <span className='text-paragraph-xs text-text-sub-600'>Payouts received</span>
            <span className='text-label-xs text-text-strong-950'>7 payouts</span>
          </div>
          <div className='mt-2 flex items-center justify-between rounded-10 bg-bg-weak-50 px-3 py-2'>
            <span className='text-paragraph-xs text-text-sub-600'>Since</span>
            <span className='text-label-xs text-text-strong-950'>Aug 2025</span>
          </div>
        </div>

        {/* Payment Method */}
        <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-5 shadow-regular-xs'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='flex size-10 items-center justify-center rounded-10 bg-bg-weak-50'>
                <RiBankCardLine className='size-5 text-text-soft-400' />
              </div>
              <div>
                <p className='text-label-xs text-text-sub-600'>Payment Method</p>
                <p className='text-label-md text-text-strong-950'>Bank Transfer</p>
              </div>
            </div>
            <Button variant='ghost' size='xs'>
              <RiEditLine className='size-4' />
              Edit
            </Button>
          </div>
          <div className='mt-4 space-y-2'>
            <div className='flex items-center justify-between rounded-10 bg-bg-weak-50 px-3 py-2'>
              <span className='text-paragraph-xs text-text-sub-600'>Account</span>
              <span className='text-label-xs text-text-strong-950'>**** 4829</span>
            </div>
            <div className='flex items-center justify-between rounded-10 bg-bg-weak-50 px-3 py-2'>
              <span className='text-paragraph-xs text-text-sub-600'>Bank</span>
              <span className='text-label-xs text-text-strong-950'>Chase</span>
            </div>
            <div className='flex items-center justify-between rounded-10 bg-bg-weak-50 px-3 py-2'>
              <span className='text-paragraph-xs text-text-sub-600'>Schedule</span>
              <span className='text-label-xs text-text-strong-950'>Monthly (15th)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payout History */}
      <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs overflow-hidden'>
        <div className='border-b border-stroke-soft-200 px-5 py-4'>
          <h3 className='text-label-md text-text-strong-950'>Payout History</h3>
        </div>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-stroke-soft-200 bg-bg-weak-50'>
              <th className='px-5 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600'>Payout ID</th>
              <th className='px-5 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600'>Date</th>
              <th className='px-5 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600'>Amount</th>
              <th className='px-5 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600'>Method</th>
              <th className='px-5 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600'>Status</th>
              <th className='px-5 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600'>Receipt</th>
            </tr>
          </thead>
          <tbody>
            {payoutHistory.map((payout) => (
              <tr key={payout.id} className='border-b border-stroke-soft-200 last:border-0 hover:bg-bg-weak-50 transition-colors'>
                <td className='px-5 py-3.5 text-label-sm text-text-strong-950'>{payout.id}</td>
                <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{payout.date}</td>
                <td className='px-5 py-3.5 text-label-sm text-text-strong-950'>{payout.amount}</td>
                <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{payout.method}</td>
                <td className='px-5 py-3.5'>
                  <Badge variant='light' color='success' size='sm' dot>
                    Completed
                  </Badge>
                </td>
                <td className='px-5 py-3.5'>
                  <Button variant='ghost' size='xs'>
                    <RiExternalLinkLine className='size-3.5' />
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='border-t border-stroke-soft-200 px-5 py-3 text-paragraph-xs text-text-sub-600'>
          Showing {payoutHistory.length} payouts
        </div>
      </div>
    </div>
  );
}
