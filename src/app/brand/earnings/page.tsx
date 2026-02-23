'use client';

import { cn } from '@/utils/cn';
import { StatCard } from '@/components/ui/stat-card-new';
import { PageHeader } from '@/components/ui/page-header-new';
import { Badge } from '@/components/ui/badge-new';
import { Button } from '@/components/ui/button-new';
import {
  RiMoneyDollarCircleLine,
  RiLineChartLine,
  RiHandCoinLine,
  RiPriceTag3Line,
  RiDownloadLine,
} from '@remixicon/react';

const monthlyData = [
  { month: 'Sep 2025', revenue: '$8,240', wholesale: '$3,420', commissions: '$1,236', profit: '$3,584' },
  { month: 'Oct 2025', revenue: '$9,810', wholesale: '$4,070', commissions: '$1,472', profit: '$4,268' },
  { month: 'Nov 2025', revenue: '$11,450', wholesale: '$4,750', commissions: '$1,718', profit: '$4,982' },
  { month: 'Dec 2025', revenue: '$14,920', wholesale: '$6,190', commissions: '$2,238', profit: '$6,492' },
  { month: 'Jan 2026', revenue: '$10,680', wholesale: '$4,430', commissions: '$1,602', profit: '$4,648' },
  { month: 'Feb 2026', revenue: '$12,450', wholesale: '$5,170', commissions: '$1,868', profit: '$5,412' },
];

const chartBars = [
  { label: 'Sep', revenue: 8240, wholesale: 3420, commissions: 1236 },
  { label: 'Oct', revenue: 9810, wholesale: 4070, commissions: 1472 },
  { label: 'Nov', revenue: 11450, wholesale: 4750, commissions: 1718 },
  { label: 'Dec', revenue: 14920, wholesale: 6190, commissions: 2238 },
  { label: 'Jan', revenue: 10680, wholesale: 4430, commissions: 1602 },
  { label: 'Feb', revenue: 12450, wholesale: 5170, commissions: 1868 },
];

const maxRevenue = Math.max(...chartBars.map((b) => b.revenue));

export default function EarningsPage() {
  return (
    <div className='space-y-6'>
      <PageHeader
        title='Earnings'
        description='Track your revenue, costs, and profit'
        actions={
          <Button variant='secondary' size='sm'>
            <RiDownloadLine className='size-4' />
            Export CSV
          </Button>
        }
      />

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <StatCard title='Total Revenue' value='$67,550' change='+16.5% vs last 6 mo' trend='up' icon={RiMoneyDollarCircleLine} />
        <StatCard title='Net Profit' value='$29,386' change='+18.2%' trend='up' icon={RiLineChartLine} />
        <StatCard title='Commissions Paid' value='$10,134' icon={RiHandCoinLine} />
        <StatCard title='Wholesale Cost' value='$28,030' icon={RiPriceTag3Line} />
      </div>

      {/* Revenue Breakdown Chart */}
      <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-6 shadow-regular-xs'>
        <div className='mb-6 flex items-center justify-between'>
          <h3 className='text-label-md text-text-strong-950'>Revenue Breakdown</h3>
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-1.5'>
              <span className='size-2.5 rounded-full bg-primary-base' />
              <span className='text-paragraph-xs text-text-sub-600'>Revenue</span>
            </div>
            <div className='flex items-center gap-1.5'>
              <span className='size-2.5 rounded-full bg-warning-base' />
              <span className='text-paragraph-xs text-text-sub-600'>Wholesale</span>
            </div>
            <div className='flex items-center gap-1.5'>
              <span className='size-2.5 rounded-full bg-feature-base' />
              <span className='text-paragraph-xs text-text-sub-600'>Commissions</span>
            </div>
          </div>
        </div>
        <div className='flex items-end gap-3' style={{ height: 192 }}>
          {chartBars.map((bar) => {
            const totalH = 180;
            const barH = (bar.revenue / maxRevenue) * totalH;
            const wholesaleH = (bar.wholesale / bar.revenue) * barH;
            const commissionH = (bar.commissions / bar.revenue) * barH;
            const profitH = barH - wholesaleH - commissionH;
            return (
              <div key={bar.label} className='flex flex-1 flex-col items-center justify-end gap-1.5 h-full'>
                <div className='text-label-2xs text-text-sub-600'>
                  ${(bar.revenue / 1000).toFixed(1)}k
                </div>
                <div className='flex w-10 flex-col overflow-hidden rounded-md'>
                  <div className='bg-primary-base/20' style={{ height: profitH }} />
                  <div className='bg-feature-base/30' style={{ height: commissionH }} />
                  <div className='bg-warning-base/30' style={{ height: wholesaleH }} />
                </div>
                <span className='text-label-2xs text-text-soft-400'>{bar.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Monthly Earnings Table */}
      <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs overflow-hidden'>
        <div className='border-b border-stroke-soft-200 px-5 py-4'>
          <h3 className='text-label-md text-text-strong-950'>Monthly Breakdown</h3>
        </div>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-stroke-soft-200 bg-bg-weak-50'>
              <th className='px-5 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600'>Month</th>
              <th className='px-5 py-3 text-right text-label-xs uppercase tracking-wider text-text-sub-600'>Revenue</th>
              <th className='px-5 py-3 text-right text-label-xs uppercase tracking-wider text-text-sub-600'>Wholesale Cost</th>
              <th className='px-5 py-3 text-right text-label-xs uppercase tracking-wider text-text-sub-600'>Commissions</th>
              <th className='px-5 py-3 text-right text-label-xs uppercase tracking-wider text-text-sub-600'>Net Profit</th>
              <th className='px-5 py-3 text-right text-label-xs uppercase tracking-wider text-text-sub-600'>Margin</th>
            </tr>
          </thead>
          <tbody>
            {monthlyData.map((row, i) => {
              const rev = parseFloat(row.revenue.replace(/[$,]/g, ''));
              const prof = parseFloat(row.profit.replace(/[$,]/g, ''));
              const margin = ((prof / rev) * 100).toFixed(1);
              return (
                <tr key={row.month} className='border-b border-stroke-soft-200 last:border-0 hover:bg-bg-weak-50 transition-colors'>
                  <td className='px-5 py-3.5 text-label-sm text-text-strong-950'>{row.month}</td>
                  <td className='px-5 py-3.5 text-right text-paragraph-sm text-text-strong-950'>{row.revenue}</td>
                  <td className='px-5 py-3.5 text-right text-paragraph-sm text-text-sub-600'>{row.wholesale}</td>
                  <td className='px-5 py-3.5 text-right text-paragraph-sm text-text-sub-600'>{row.commissions}</td>
                  <td className='px-5 py-3.5 text-right text-label-sm text-success-base'>{row.profit}</td>
                  <td className='px-5 py-3.5 text-right'>
                    <Badge variant='light' color='success' size='sm'>{margin}%</Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className='bg-bg-weak-50'>
              <td className='px-5 py-3.5 text-label-sm text-text-strong-950'>Total</td>
              <td className='px-5 py-3.5 text-right text-label-sm text-text-strong-950'>$67,550</td>
              <td className='px-5 py-3.5 text-right text-label-sm text-text-sub-600'>$28,030</td>
              <td className='px-5 py-3.5 text-right text-label-sm text-text-sub-600'>$10,134</td>
              <td className='px-5 py-3.5 text-right text-label-sm text-success-base'>$29,386</td>
              <td className='px-5 py-3.5 text-right'>
                <Badge variant='filled' color='success' size='sm'>43.5%</Badge>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
