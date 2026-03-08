'use client';

import * as React from 'react';
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
import { brandApi } from '@/lib/api-client';

export default function PayoutsPage() {
  const [payouts, setPayouts] = React.useState<any[]>([]);
  const [nextPayout, setNextPayout] = React.useState<any>(null);
  const [summary, setSummary] = React.useState<any>(null);
  const [paymentMethod, setPaymentMethod] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [p, n, s, pm] = await Promise.all([
        brandApi.getPayouts({ limit: 10 }),
        brandApi.getNextPayout(),
        brandApi.getPayoutSummary(),
        brandApi.getPaymentMethod(),
      ]);
      setPayouts(p.data || []);
      setNextPayout(n.next);
      setSummary(s);
      setPaymentMethod(pm);
    } catch (error) {
      console.error('Failed to fetch payouts data:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className='flex items-center justify-center p-24'>
        <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-primary-base' />
      </div>
    );
  }

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
              <p className='text-title-h5 text-text-strong-950'>
                {nextPayout ? `$${Number(nextPayout.amount).toLocaleString()}` : '--'}
              </p>
            </div>
          </div>
          <div className='mt-4 flex items-center justify-between rounded-10 bg-bg-weak-50 px-3 py-2'>
            <span className='text-paragraph-xs text-text-sub-600'>Scheduled for</span>
            <span className='text-label-xs text-text-strong-950'>
              {nextPayout?.scheduledDate ? new Date(nextPayout.scheduledDate).toLocaleDateString() : 'N/A'}
            </span>
          </div>
          <div className='mt-2 flex items-center justify-between rounded-10 bg-bg-weak-50 px-3 py-2'>
            <span className='text-paragraph-xs text-text-sub-600'>Status</span>
            <span className='text-label-xs text-text-strong-950 capitalize'>{nextPayout?.status || 'No pending'}</span>
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
              <p className='text-title-h5 text-text-strong-950'>${Number(summary?.totalPaid || 0).toLocaleString()}</p>
            </div>
          </div>
          <div className='mt-4 flex items-center justify-between rounded-10 bg-bg-weak-50 px-3 py-2'>
            <span className='text-paragraph-xs text-text-sub-600'>Payouts received</span>
            <span className='text-label-xs text-text-strong-950'>{summary?.payoutCount || 0} payouts</span>
          </div>
          <div className='mt-2 flex items-center justify-between rounded-10 bg-bg-weak-50 px-3 py-2'>
            <span className='text-paragraph-xs text-text-sub-600'>Pending</span>
            <span className='text-label-xs text-text-strong-950'>${Number(summary?.pendingAmount || 0).toLocaleString()}</span>
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
                <p className='text-label-md text-text-strong-950 capitalize'>{paymentMethod?.type?.toLowerCase().replace('_', ' ') || 'Not set'}</p>
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
              <span className='text-label-xs text-text-strong-950'>{paymentMethod?.details?.last4 ? `**** ${paymentMethod.details.last4}` : paymentMethod?.details?.email || '—'}</span>
            </div>
            <div className='flex items-center justify-between rounded-10 bg-bg-weak-50 px-3 py-2'>
              <span className='text-paragraph-xs text-text-sub-600'>Bank/Provider</span>
              <span className='text-label-xs text-text-strong-950'>{paymentMethod?.details?.bankName || 'Stripe'}</span>
            </div>
            <div className='flex items-center justify-between rounded-10 bg-bg-weak-50 px-3 py-2'>
              <span className='text-paragraph-xs text-text-sub-600'>Schedule</span>
              <span className='text-label-xs text-text-strong-950'>Weekly</span>
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
            {payouts.map((payout) => (
              <tr key={payout.id} className='border-b border-stroke-soft-200 last:border-0 hover:bg-bg-weak-50 transition-colors'>
                <td className='px-5 py-3.5 text-label-sm text-text-strong-950'>{payout.id.slice(-8).toUpperCase()}</td>
                <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{new Date(payout.createdAt).toLocaleDateString()}</td>
                <td className='px-5 py-3.5 text-label-sm text-text-strong-950'>${Number(payout.amount).toLocaleString()}</td>
                <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600 capitalize'>{payout.method?.toLowerCase()}</td>
                <td className='px-5 py-3.5'>
                  <Badge variant='light' color={payout.status === 'COMPLETED' ? 'success' : 'warning'} size='sm' dot>
                    {payout.status}
                  </Badge>
                </td>
                <td className='px-5 py-3.5'>
                  {payout.receiptUrl ? (
                    <Button variant='ghost' size='xs' asChild>
                      <a href={payout.receiptUrl} target='_blank'>
                        <RiExternalLinkLine className='size-3.5' />
                        View
                      </a>
                    </Button>
                  ) : '—'}
                </td>
              </tr>
            ))}
            {payouts.length === 0 && (
              <tr>
                <td colSpan={6} className='px-5 py-12 text-center text-text-sub-600'>No payouts yet</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className='border-t border-stroke-soft-200 px-5 py-3 text-paragraph-xs text-text-sub-600'>
          Showing {payouts.length} payouts
        </div>
      </div>
    </div>
  );
}
