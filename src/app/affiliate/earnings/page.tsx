'use client';

import { StatCard } from '@/components/ui/stat-card-new';
import { PageHeader } from '@/components/ui/page-header-new';
import { Badge } from '@/components/ui/badge-new';
import { Button } from '@/components/ui/button-new';
import { RiMoneyDollarCircleLine, RiLineChartLine, RiDownloadLine } from '@remixicon/react';

const monthly = [
  { month: 'Nov 2025', direct: '$520', override: '$45', total: '$565' },
  { month: 'Dec 2025', direct: '$680', override: '$62', total: '$742' },
  { month: 'Jan 2026', direct: '$890', override: '$98', total: '$988' },
  { month: 'Feb 2026', direct: '$1,120', override: '$142', total: '$1,262' },
];

export default function AffiliateEarningsPage() {
  return (
    <div className='space-y-6'>
      <PageHeader title='Earnings' description='Your commission earnings breakdown' actions={<Button variant='secondary' size='sm'><RiDownloadLine className='size-4' />Export</Button>} />
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <StatCard title='Total Earnings' value='$4,280' change='+32%' trend='up' icon={RiMoneyDollarCircleLine} />
        <StatCard title='Direct Sales' value='$3,600' icon={RiLineChartLine} />
        <StatCard title='L2 Override' value='$680' change='From 6 L2s' />
        <StatCard title='Unpaid Balance' value='$1,262' />
      </div>
      <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs overflow-hidden'>
        <div className='border-b border-stroke-soft-200 px-5 py-4'>
          <h3 className='text-label-md text-text-strong-950'>Monthly Breakdown</h3>
        </div>
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
                <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{m.direct}</td>
                <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{m.override}</td>
                <td className='px-5 py-3.5 text-label-sm text-success-base'>{m.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
