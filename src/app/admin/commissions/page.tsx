'use client';

import * as React from 'react';
import { cn } from '@/utils/cn';
import { StatCard } from '@/components/ui/stat-card-new';
import { PageHeader } from '@/components/ui/page-header-new';
import { Badge } from '@/components/ui/badge-new';
import { Button } from '@/components/ui/button-new';
import { RiPercentLine, RiMoneyDollarCircleLine, RiTimeLine, RiSearchLine } from '@remixicon/react';
import { adminApi } from '@/lib/api-client';

const typeColor = {
  'L1_AFFILIATE': 'primary',
  'L2_AFFILIATE': 'feature',
  'PARTNER': 'warning',
  'BRAND': 'information',
  'LAB': 'error',
  'ADMIN': 'gray'
} as const;

export default function AdminCommissionsPage() {
  const [tab, setTab] = React.useState('all');
  const [commissions, setCommissions] = React.useState<any[]>([]);
  const [stats, setStats] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [commData, statData] = await Promise.all([
        adminApi.getCommissions({ status: tab, search: search || undefined }),
        adminApi.getCommissionStats()
      ]);
      setCommissions(commData.data || []);
      setStats(statData);
    } catch (error) {
      console.error('Failed to fetch commission data:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [tab, search]);

  return (
    <div className='space-y-6'>
      <PageHeader title='Commissions' description='Track all commission calculations across the platform' />

      {stats ? (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          <StatCard title='Projected Commissions' value={`$${stats.projected.toLocaleString()}`} icon={RiTimeLine} />
          <StatCard title='Earned (Payable)' value={`$${stats.payable.toLocaleString()}`} icon={RiMoneyDollarCircleLine} />
          <StatCard title='Total Paid (All Time)' value={`$${stats.paid.toLocaleString()}`} icon={RiPercentLine} />
          <StatCard title='Earned This Month' value={`$${stats.thisMonth.toLocaleString()}`} />
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-pulse'>
          {[1, 2, 3, 4].map(i => <div key={i} className='h-24 rounded-xl bg-bg-weak-50' />)}
        </div>
      )}

      <div className='flex items-center gap-3'>
        {['all', 'projected', 'payable', 'paid', 'voided'].map((t) => (
          <Button key={t} variant='ghost' size='xs' className={cn(tab === t && 'bg-primary-alpha-10 text-primary-base')} onClick={() => setTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </Button>
        ))}
        <div className='relative ml-auto w-64'>
          <RiSearchLine className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-soft-400' />
          <input
            placeholder='Search commissions...'
            className='h-9 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 pl-9 pr-3 text-paragraph-sm placeholder:text-text-disabled-300 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16'
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs overflow-hidden'>
        {loading ? (
          <div className='flex items-center justify-center p-12'>
            <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-primary-base' />
          </div>
        ) : (
          <table className='w-full'>
            <thead>
              <tr className='border-b border-stroke-soft-200 bg-bg-weak-50'>
                {['ID', 'Order', 'Recipient', 'Type', 'Brand', 'Rate', 'Amount', 'Status', 'Date'].map((h) => (
                  <th key={h} className='px-5 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600'>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {commissions.map((c) => (
                <tr key={c.id} className='border-b border-stroke-soft-200 last:border-0 hover:bg-bg-weak-50 transition-colors'>
                  <td className='px-5 py-3.5 text-label-sm text-text-sub-600'>{c.id.slice(0, 8)}</td>
                  <td className='px-5 py-3.5 text-label-sm text-primary-base'>#{c.order?.orderNumber || c.order?.id?.slice(0, 8) || 'N/A'}</td>
                  <td className='px-5 py-3.5 text-paragraph-sm text-text-strong-950 capitalize'>{c.recipientType.toLowerCase()}</td>
                  <td className='px-5 py-3.5'>
                    <Badge variant='light' color={typeColor[c.recipientType as keyof typeof typeColor] ?? 'gray'} size='sm'>{c.recipientType}</Badge>
                  </td>
                  <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{c.brand?.name}</td>
                  <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{c.rateDescription || `${(parseFloat(c.rate) * 100).toFixed(1)}%`}</td>
                  <td className='px-5 py-3.5 text-label-sm text-text-strong-950'>${parseFloat(c.amount).toLocaleString()}</td>
                  <td className='px-5 py-3.5'>
                    <Badge variant='light' color={c.status === 'PAID' ? 'success' : c.status === 'VOIDED' ? 'error' : 'warning'} size='sm' dot>
                      {c.status.charAt(0) + c.status.slice(1).toLowerCase()}
                    </Badge>
                  </td>
                  <td className='px-5 py-3.5 text-paragraph-xs text-text-soft-400'>{new Date(c.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {commissions.length === 0 && (
                <tr>
                  <td colSpan={9} className='px-5 py-12 text-center text-text-sub-600'>No commissions found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
