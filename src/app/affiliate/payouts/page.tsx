'use client';

import * as React from 'react';
import { PageHeader } from '@/components/ui/page-header-new';
import { Badge } from '@/components/ui/badge-new';
import { Button } from '@/components/ui/button-new';
import {
  RiCalendarCheckLine,
  RiMoneyDollarCircleLine,
  RiBankCardLine,
  RiEditLine,
  RiExternalLinkLine,
  RiLoader4Line
} from '@remixicon/react';
import { affiliateApi } from '@/lib/api-client';
import { useAffiliate } from '../context';
import { AlertBanner } from '@/components/ui/alert-banner';

export default function AffiliatePayoutsPage() {
  const { getSelectedBrand, isLoading: ctxLoading } = useAffiliate();
  const selectedBrand = getSelectedBrand();

  const [payouts, setPayouts] = React.useState<any[]>([]);
  const [summary, setSummary] = React.useState<any>(null);
  const [paymentMethod, setPaymentMethod] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!selectedBrand?.id) return;

    const fetchPayoutData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [payoutsData, summaryData, methodData] = await Promise.all([
          affiliateApi.getPayouts(selectedBrand.id, { limit: 50 }),
          affiliateApi.getPayoutSummary(selectedBrand.id),
          affiliateApi.getPaymentMethod(selectedBrand.id)
        ]);
        setPayouts(payoutsData.data || payoutsData.payouts || []);
        setSummary(summaryData);
        setPaymentMethod(methodData);
      } catch (error) {
        console.error('Failed to fetch payout data:', error);
        setError('Failed to load payout data. Please refresh the page.');
      } finally {
        setLoading(false);
      }
    };
    fetchPayoutData();
  }, [selectedBrand?.id]);

  if (ctxLoading) {
    return (
      <div className='flex h-64 items-center justify-center text-text-soft-400'>
        <RiLoader4Line className='size-8 animate-spin' />
      </div>
    );
  }

  if (!selectedBrand) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <p className='text-paragraph-sm text-text-sub-600'>Please select a brand to view payouts.</p>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'COMPLETED': return 'success';
      case 'PENDING': return 'warning';
      case 'FAILED': return 'error';
      default: return 'gray';
    }
  };

  return (
    <div className='space-y-6'>
      <PageHeader title='Payouts' description='Your payout history and payment method' />

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
              Promise.all([
                affiliateApi.getPayouts(selectedBrand.id, { limit: 50 }),
                affiliateApi.getPayoutSummary(selectedBrand.id),
                affiliateApi.getPaymentMethod(selectedBrand.id)
              ]).then(([payoutsData, summaryData, methodData]) => {
                setPayouts(payoutsData.data || payoutsData.payouts || []);
                setSummary(summaryData);
                setPaymentMethod(methodData);
                setLoading(false);
              }).catch(err => {
                console.error('Failed to fetch payout data:', err);
                setError('Failed to load payout data. Please refresh the page.');
                setLoading(false);
              });
            }
          }}
        />
      )}

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
        <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-5 shadow-regular-xs transition-shadow hover:shadow-regular-sm'>
          <div className='flex items-center gap-3'>
            <div className='flex size-10 items-center justify-center rounded-10 bg-primary-alpha-10'>
              <RiCalendarCheckLine className='size-5 text-primary-base' />
            </div>
            <div>
              <p className='text-label-xs text-text-sub-600'>Next Payout</p>
              <p className='text-title-h5 text-text-strong-950'>
                {loading ? '—' : `$${(summary?.nextPayoutAmount || 0).toLocaleString()}`}
              </p>
            </div>
          </div>
          <div className='mt-4 rounded-10 bg-bg-weak-50 px-3 py-2 flex justify-between'>
            <span className='text-paragraph-xs text-text-sub-600'>Scheduled</span>
            <span className='text-label-xs text-text-strong-950'>
              {loading ? '—' : summary?.nextPayoutDate ? new Date(summary.nextPayoutDate).toLocaleDateString() : 'TBD'}
            </span>
          </div>
        </div>

        <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-5 shadow-regular-xs transition-shadow hover:shadow-regular-sm'>
          <div className='flex items-center gap-3'>
            <div className='flex size-10 items-center justify-center rounded-10 bg-success-lighter'>
              <RiMoneyDollarCircleLine className='size-5 text-success-base' />
            </div>
            <div>
              <p className='text-label-xs text-text-sub-600'>Total Received</p>
              <p className='text-title-h5 text-text-strong-950'>
                {loading ? '—' : `$${(summary?.totalReceived || 0).toLocaleString()}`}
              </p>
            </div>
          </div>
          <div className='mt-4 rounded-10 bg-bg-weak-50 px-3 py-2 flex justify-between'>
            <span className='text-paragraph-xs text-text-sub-600'>Payouts</span>
            <span className='text-label-xs text-text-strong-950'>
              {loading ? '—' : `${summary?.completedPayouts || 0} completed`}
            </span>
          </div>
        </div>

        <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-5 shadow-regular-xs transition-shadow hover:shadow-regular-sm'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='flex size-10 items-center justify-center rounded-10 bg-bg-weak-50'>
                <RiBankCardLine className='size-5 text-text-soft-400' />
              </div>
              <div>
                <p className='text-label-xs text-text-sub-600'>Payment Method</p>
                <p className='text-label-md text-text-strong-950'>
                  {loading ? '—' : paymentMethod?.type || 'Not Set'}
                </p>
              </div>
            </div>
            <Button variant='ghost' size='xs'><RiEditLine className='size-4' />Edit</Button>
          </div>
          <div className='mt-4 rounded-10 bg-bg-weak-50 px-3 py-2 flex justify-between'>
            <span className='text-paragraph-xs text-text-sub-600'>Account</span>
            <span className='text-label-xs text-text-strong-950 truncate max-w-[140px]'>
              {loading ? '—' : paymentMethod?.details?.email || paymentMethod?.details?.last4 ? `**** ${paymentMethod.details.last4}` : 'None'}
            </span>
          </div>
        </div>
      </div>

      <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs overflow-hidden'>
        <div className='border-b border-stroke-soft-200 px-5 py-4'>
          <h3 className='text-label-md text-text-strong-950 font-semibold'>Payout History</h3>
        </div>

        {loading ? (
          <div className='flex h-64 items-center justify-center'>
            <RiLoader4Line className='size-8 animate-spin text-text-soft-400' />
          </div>
        ) : !error && payouts.length === 0 ? (
          <div className='p-12 text-center'>
            <p className='text-paragraph-sm text-text-sub-600'>No payout history yet.</p>
          </div>
        ) : !error ? (
          <div className='overflow-x-auto'>
            <table className='w-full text-nowrap'>
              <thead>
                <tr className='border-b border-stroke-soft-200 bg-bg-weak-50'>
                  {['ID', 'Date', 'Amount', 'Method', 'Status', ''].map((h) => (
                    <th key={h} className='px-5 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600'>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {payouts.map((p) => (
                  <tr key={p.id} className='border-b border-stroke-soft-200 last:border-0 hover:bg-bg-weak-50 transition-colors'>
                    <td className='px-5 py-3.5 text-label-sm text-text-strong-950 font-medium'>{p.payoutNumber || p.id.slice(0, 8)}</td>
                    <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{new Date(p.createdAt).toLocaleDateString()}</td>
                    <td className='px-5 py-3.5 text-label-sm text-text-strong-950 font-bold'>${(p.amount || 0).toLocaleString()}</td>
                    <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{p.method || 'PayPal'}</td>
                    <td className='px-5 py-3.5'>
                      <Badge variant='light' color={getStatusColor(p.status)} size='sm' dot>
                        {p.status?.charAt(0).toUpperCase() + (p.status?.slice(1)?.toLowerCase() ?? '')}
                      </Badge>
                    </td>
                    <td className='px-5 py-3.5 text-right'>
                      <Button variant='ghost' size='xs'>
                        <RiExternalLinkLine className='size-3.5' />View Receipt
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </div>
  );
}
