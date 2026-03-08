'use client';

import { PageHeader } from '@/components/ui/page-header-new';
import { Badge } from '@/components/ui/badge-new';
import { Button } from '@/components/ui/button-new';
import { RiCalendarCheckLine, RiMoneyDollarCircleLine, RiBankCardLine, RiEditLine, RiExternalLinkLine } from '@remixicon/react';

import * as React from 'react';
import { partnerApi } from '@/lib/api-client';

export default function PartnerPayoutsPage() {
  const [loading, setLoading] = React.useState(true);
  const [payouts, setPayouts] = React.useState<any[]>([]);
  const [summary, setSummary] = React.useState<any>(null);
  const [paymentMethod, setPaymentMethod] = React.useState<any>(null);

  const fetchData = React.useCallback(async () => {
    try {
      const [payoutsRes, summaryRes, pmRes] = await Promise.all([
        partnerApi.getPayouts(),
        partnerApi.getPayoutSummary(),
        partnerApi.getPaymentMethod(),
      ]);
      setPayouts(payoutsRes.data || []);
      setSummary(summaryRes);
      setPaymentMethod(pmRes);
    } catch (error) {
      console.error('Failed to fetch payouts:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);
  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-4 border-primary-base border-t-transparent" />
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <PageHeader title='Payouts' description='Track your commission payouts' />

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
        <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-5 shadow-regular-xs'>
          <div className='flex items-center gap-3'>
            <div className='flex size-10 items-center justify-center rounded-10 bg-primary-alpha-10'><RiCalendarCheckLine className='size-5 text-primary-base' /></div>
            <div>
              <p className='text-label-xs text-text-sub-600'>Next Payout</p>
              <p className='text-title-h5 text-text-strong-950'>${(summary?.nextPayout || 0).toLocaleString()}</p>
            </div>
          </div>
          <div className='mt-4 rounded-10 bg-bg-weak-50 px-3 py-2 flex justify-between'>
            <span className='text-paragraph-xs text-text-sub-600'>Pending</span>
            <span className='text-label-xs text-text-strong-950'>—</span>
          </div>
        </div>

        <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-5 shadow-regular-xs'>
          <div className='flex items-center gap-3'>
            <div className='flex size-10 items-center justify-center rounded-10 bg-success-lighter'><RiMoneyDollarCircleLine className='size-5 text-success-base' /></div>
            <div>
              <p className='text-label-xs text-text-sub-600'>Total Received</p>
              <p className='text-title-h5 text-text-strong-950'>${(summary?.totalReceived || 0).toLocaleString()}</p>
            </div>
          </div>
          <div className='mt-4 rounded-10 bg-bg-weak-50 px-3 py-2 flex justify-between'>
            <span className='text-paragraph-xs text-text-sub-600'>Status</span>
            <span className='text-label-xs text-text-strong-950'>All time</span>
          </div>
        </div>

        <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-5 shadow-regular-xs'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='flex size-10 items-center justify-center rounded-10 bg-bg-weak-50'><RiBankCardLine className='size-5 text-text-soft-400' /></div>
              <div>
                <p className='text-label-xs text-text-sub-600'>Payment Method</p>
                <p className='text-label-md text-text-strong-950'>{paymentMethod?.payoutMethod || 'Not Set'}</p>
              </div>
            </div>
            <Button variant='ghost' size='xs'><RiEditLine className='size-4' />Edit</Button>
          </div>
          <div className='mt-4 rounded-10 bg-bg-weak-50 px-3 py-2 flex justify-between'>
            <span className='text-paragraph-xs text-text-sub-600'>Account</span>
            <span className='text-label-xs text-text-strong-950 font-mono'>
              {paymentMethod?.payoutAccountId ? `**** ${paymentMethod.payoutAccountId.slice(-4)}` : '—'}
            </span>
          </div>
        </div>
      </div>

      <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs overflow-hidden'>
        <div className='border-b border-stroke-soft-200 px-5 py-4'>
          <h3 className='text-label-md text-text-strong-950'>Payout History</h3>
        </div>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b border-stroke-soft-200 bg-bg-weak-50 text-left'>
                {['Payout ID', 'Date', 'Amount', 'Method', 'Status', ''].map((h) => (
                  <th key={h} className='px-5 py-3 text-label-xs uppercase tracking-wider text-text-sub-600 font-medium'>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {payouts.length > 0 ? (
                payouts.map((p: any) => (
                  <tr key={p.id} className='border-b border-stroke-soft-200 last:border-0 hover:bg-bg-weak-50 transition-colors'>
                    <td className='px-5 py-3.5 text-label-sm text-text-strong-950'>{p.id.split('-').pop()}</td>
                    <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>
                      {new Date(p.createdAt).toLocaleDateString()}
                    </td>
                    <td className='px-5 py-3.5 text-label-sm text-text-strong-950'>
                      ${(p.amount || 0).toLocaleString()}
                    </td>
                    <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{p.payoutMethod || 'Bank Transfer'}</td>
                    <td className='px-5 py-3.5'>
                      <Badge variant='light' color={p.status === 'COMPLETED' ? 'success' : 'warning'} size='sm' dot>
                        {p.status}
                      </Badge>
                    </td>
                    <td className='px-5 py-3.5 text-right'>
                      <Button variant='ghost' size='xs' asChild>
                        <a href={`/partner/payouts/${p.id}`}><RiExternalLinkLine className='size-3.5' />View</a>
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-paragraph-sm text-text-sub-600">
                    No payout history yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
