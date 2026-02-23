'use client';

import { StatCard } from '@/components/ui/stat-card-new';
import { PageHeader } from '@/components/ui/page-header-new';
import { Badge } from '@/components/ui/badge-new';
import { Button } from '@/components/ui/button-new';
import { RiMoneyDollarCircleLine, RiLineChartLine, RiDownloadLine } from '@remixicon/react';

const monthly = [
  { month: 'Sep 2025', brands: 6, brandRevenue: '$32,400', rate: '10%', commission: '$3,240' },
  { month: 'Oct 2025', brands: 7, brandRevenue: '$38,600', rate: '10%', commission: '$3,860' },
  { month: 'Nov 2025', brands: 8, brandRevenue: '$42,100', rate: '10%', commission: '$4,210' },
  { month: 'Dec 2025', brands: 9, brandRevenue: '$51,800', rate: '10%', commission: '$5,180' },
  { month: 'Jan 2026', brands: 10, brandRevenue: '$45,200', rate: '10%', commission: '$4,520' },
  { month: 'Feb 2026', brands: 12, brandRevenue: '$56,300', rate: '10%', commission: '$5,630' },
];

export default function PartnerEarningsPage() {
  return (
    <div className='space-y-6'>
      <PageHeader title='Earnings' description='Track your referral commissions' actions={
        <Button variant='secondary' size='sm'><RiDownloadLine className='size-4' />Export CSV</Button>
      } />
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <StatCard title='Total Earnings' value='$26,640' change='+24%' trend='up' icon={RiMoneyDollarCircleLine} />
        <StatCard title='This Month' value='$5,630' change='+24.5% vs last' trend='up' icon={RiLineChartLine} />
        <StatCard title='Commission Rate' value='10%' />
        <StatCard title='Avg per Brand' value='$2,220' />
      </div>
      <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs overflow-hidden'>
        <div className='border-b border-stroke-soft-200 px-5 py-4'>
          <h3 className='text-label-md text-text-strong-950'>Monthly Breakdown</h3>
        </div>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-stroke-soft-200 bg-bg-weak-50'>
              {['Month', 'Active Brands', 'Brand Revenue', 'Rate', 'Your Commission'].map((h) => (
                <th key={h} className='px-5 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600'>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {monthly.map((r) => (
              <tr key={r.month} className='border-b border-stroke-soft-200 last:border-0 hover:bg-bg-weak-50 transition-colors'>
                <td className='px-5 py-3.5 text-label-sm text-text-strong-950'>{r.month}</td>
                <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{r.brands}</td>
                <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{r.brandRevenue}</td>
                <td className='px-5 py-3.5'><Badge variant='light' color='primary' size='sm'>{r.rate}</Badge></td>
                <td className='px-5 py-3.5 text-label-sm text-success-base'>{r.commission}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className='bg-bg-weak-50'>
              <td className='px-5 py-3.5 text-label-sm text-text-strong-950'>Total</td>
              <td className='px-5 py-3.5 text-label-sm text-text-sub-600'>—</td>
              <td className='px-5 py-3.5 text-label-sm text-text-sub-600'>$266,400</td>
              <td className='px-5 py-3.5'><Badge variant='filled' color='primary' size='sm'>10%</Badge></td>
              <td className='px-5 py-3.5 text-label-sm text-success-base'>$26,640</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
