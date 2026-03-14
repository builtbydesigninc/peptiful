'use client';

import * as React from 'react';
import { StatCard } from '@/components/ui/stat-card-new';
import { PageHeader } from '@/components/ui/page-header-new';
import { Button } from '@/components/ui/button-new';
import {
  RiMoneyDollarCircleLine,
  RiLineChartLine,
  RiDownloadLine,
  RiLoader4Line
} from '@remixicon/react';
import { useAffiliate } from '../context';
import { affiliateApi } from '@/lib/api-client';
import { AlertBanner } from '@/components/ui/alert-banner';

export default function AffiliateEarningsPage() {
  const { getSelectedBrand, isLoading: ctxLoading } = useAffiliate();
  const selectedBrand = getSelectedBrand();

  const [stats, setStats] = React.useState<any>(null);
  const [monthly, setMonthly] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!selectedBrand?.id) return;

    const fetchEarnings = async () => {
      setLoading(true);
      setError(null);
      try {
        const [statsData, monthlyData] = await Promise.all([
          affiliateApi.getEarningsStats(selectedBrand.id),
          affiliateApi.getMonthlyEarnings(selectedBrand.id)
        ]);
        setStats(statsData);
        setMonthly(monthlyData);
      } catch (error) {
        console.error('Failed to fetch earnings:', error);
        setError('Failed to load earnings. Please refresh the page.');
      } finally {
        setLoading(false);
      }
    };
    fetchEarnings();
  }, [selectedBrand?.id]);

  const handleExport = async () => {
    if (!selectedBrand?.id) return;
    window.open(`${process.env.NEXT_PUBLIC_API_URL}/affiliate/earnings/export?brandId=${selectedBrand.id}`, '_blank');
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
        <p className='text-paragraph-sm text-text-sub-600'>Please select a brand to view your earnings.</p>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <PageHeader
        title='Earnings'
        description='Your commission earnings breakdown'
        actions={
          <Button variant='secondary' size='sm' onClick={handleExport}>
            <RiDownloadLine className='size-4' />Export
          </Button>
        }
      />

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
                affiliateApi.getEarningsStats(selectedBrand.id),
                affiliateApi.getMonthlyEarnings(selectedBrand.id)
              ]).then(([statsData, monthlyData]) => {
                setStats(statsData);
                setMonthly(monthlyData);
                setLoading(false);
              }).catch(err => {
                console.error('Failed to fetch earnings:', err);
                setError('Failed to load earnings. Please refresh the page.');
                setLoading(false);
              });
            }
          }}
        />
      )}

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <StatCard
          title='Total Earnings'
          value={loading ? '—' : `$${((stats?.directEarnings || 0) + (stats?.overrideEarnings || 0)).toLocaleString()}`}
          icon={RiMoneyDollarCircleLine}
        />
        <StatCard
          title='Direct Sales'
          value={loading ? '—' : `$${(stats?.directEarnings || 0).toLocaleString()}`}
          icon={RiLineChartLine}
        />
        <StatCard
          title='L2 Override'
          value={loading ? '—' : `$${(stats?.overrideEarnings || 0).toLocaleString()}`}
        />
        <StatCard
          title='Unpaid Balance'
          value={loading ? '—' : `$${(stats?.unpaid || 0).toLocaleString()}`}
        />
      </div>

      <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs overflow-hidden'>
        <div className='border-b border-stroke-soft-200 px-5 py-4'>
          <h3 className='text-label-md text-text-strong-950'>Monthly Breakdown</h3>
        </div>

        {loading ? (
          <div className='flex h-40 items-center justify-center'>
            <RiLoader4Line className='size-6 animate-spin text-text-soft-400' />
          </div>
        ) : !error && monthly.length === 0 ? (
          <div className='p-12 text-center'>
            <p className='text-paragraph-sm text-text-sub-600'>No earnings data found for this period.</p>
          </div>
        ) : !error ? (
          <table className='w-full'>
            <thead>
              <tr className='border-b border-stroke-soft-200 bg-bg-weak-50'>
                {['Month', 'Direct Sales', 'L2 Override', 'Total'].map((h) => (
                  <th key={h} className='px-5 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600'>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {monthly.map((m) => (
                <tr key={m.month} className='border-b border-stroke-soft-200 last:border-0 hover:bg-bg-weak-50 transition-colors'>
                  <td className='px-5 py-3.5 text-label-sm text-text-strong-950'>{m.month}</td>
                  <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>${(m.direct || 0).toLocaleString()}</td>
                  <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>${(m.override || 0).toLocaleString()}</td>
                  <td className='px-5 py-3.5 text-label-sm text-success-base'>${(m.total || 0).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </div>
    </div>
  );
}
