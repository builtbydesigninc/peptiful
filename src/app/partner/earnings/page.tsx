'use client';

import { StatCard } from '@/components/ui/stat-card-new';
import { PageHeader } from '@/components/ui/page-header-new';
import { Badge } from '@/components/ui/badge-new';
import { Button } from '@/components/ui/button-new';
import { RiMoneyDollarCircleLine, RiLineChartLine, RiDownloadLine } from '@remixicon/react';

import * as React from 'react';
import { partnerApi } from '@/lib/api-client';

export default function PartnerEarningsPage() {
  const [loading, setLoading] = React.useState(true);
  const [summary, setSummary] = React.useState<any>(null);
  const [monthly, setMonthly] = React.useState<any[]>([]);

  const fetchData = React.useCallback(async () => {
    try {
      const [summaryRes, monthlyRes] = await Promise.all([
        partnerApi.getEarnings(),
        partnerApi.getMonthlyEarnings(),
      ]);
      setSummary(summaryRes);
      setMonthly(monthlyRes || []);
    } catch (error) {
      console.error('Failed to fetch earnings:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);
  const handleExport = () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/partner/earnings/export`;
    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-4 border-primary-base border-t-transparent" />
      </div>
    );
  }

  const change = summary?.lastMonth > 0
    ? ((summary.thisMonth - summary.lastMonth) / summary.lastMonth) * 100
    : 0;

  return (
    <div className='space-y-6'>
      <PageHeader
        title='Earnings'
        description='Track your referral commissions'
        actions={
          <Button variant='secondary' size='sm' onClick={handleExport}>
            <RiDownloadLine className='size-4' />Export CSV
          </Button>
        }
      />

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <StatCard
          title='Total Earnings'
          value={`$${(summary?.totalEarnings || 0).toLocaleString()}`}
          icon={RiMoneyDollarCircleLine}
        />
        <StatCard
          title='This Month'
          value={`$${(summary?.thisMonth || 0).toLocaleString()}`}
          change={change !== 0 ? `${change > 0 ? '+' : ''}${change.toFixed(1)}% vs last` : undefined}
          trend={change > 0 ? 'up' : change < 0 ? 'down' : undefined}
          icon={RiLineChartLine}
        />
        <StatCard title='Active Brands' value={monthly[0]?.orderCount ? '—' : '0'} />
        <StatCard title='Avg per Brand' value='—' />
      </div>

      <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs overflow-hidden'>
        <div className='border-b border-stroke-soft-200 px-5 py-4'>
          <h3 className='text-label-md text-text-strong-950'>Monthly Breakdown</h3>
        </div>
        <div className='overflow-x-auto'>
          <table className='w-full text-left'>
            <thead>
              <tr className='border-b border-stroke-soft-200 bg-bg-weak-50'>
                {['Month', 'Total Earnings', 'Order Count'].map((h) => (
                  <th key={h} className='px-5 py-3 text-label-xs uppercase tracking-wider text-text-sub-600 font-medium'>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {monthly.length > 0 ? (
                monthly.map((r: any) => (
                  <tr key={r.month} className='border-b border-stroke-soft-200 last:border-0 hover:bg-bg-weak-50 transition-colors'>
                    <td className='px-5 py-3.5 text-label-sm text-text-strong-950'>
                      {new Date(r.month).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
                    </td>
                    <td className='px-5 py-3.5 text-label-sm text-success-base'>
                      ${(r.total || 0).toLocaleString()}
                    </td>
                    <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{r.orderCount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-5 py-8 text-center text-paragraph-sm text-text-sub-600">
                    No earnings history yet.
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
