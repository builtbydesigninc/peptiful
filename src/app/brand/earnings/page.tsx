'use client';

import * as React from 'react';
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
import { brandApi } from '@/lib/api-client';

export default function EarningsPage() {
  const [stats, setStats] = React.useState<any>(null);
  const [monthlyData, setMonthlyData] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [s, m] = await Promise.all([
        brandApi.getEarnings(),
        brandApi.getMonthlyEarnings()
      ]);
      setStats(s);
      setMonthlyData(m);
    } catch (error) {
      console.error('Failed to fetch earnings data:', error);
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

  const maxRevenue = Math.max(...monthlyData.map((b) => Number(b.revenue)), 1);
  const totalRev = monthlyData.reduce((acc, curr) => acc + Number(curr.revenue), 0);
  const totalWholesale = monthlyData.reduce((acc, curr) => acc + Number(curr.wholesaleCost), 0);
  const totalCommissions = monthlyData.reduce((acc, curr) => acc + Number(curr.commissions), 0);
  const totalProfit = monthlyData.reduce((acc, curr) => acc + Number(curr.netProfit), 0);
  const totalMargin = totalRev > 0 ? ((totalProfit / totalRev) * 100).toFixed(1) : '0.0';

  return (
    <div className='space-y-6'>
      <PageHeader
        title='Earnings'
        description='Track your revenue, costs, and profit'
        actions={
          <Button variant='secondary' size='sm' onClick={() => window.location.href = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/brand/earnings/export`}>
            <RiDownloadLine className='size-4' />
            Export CSV
          </Button>
        }
      />

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <StatCard title='Total Revenue' value={`$${totalRev.toLocaleString()}`} icon={RiMoneyDollarCircleLine} />
        <StatCard title='Net Profit' value={`$${totalProfit.toLocaleString()}`} icon={RiLineChartLine} />
        <StatCard title='Commissions Paid' value={`$${totalCommissions.toLocaleString()}`} icon={RiHandCoinLine} />
        <StatCard title='Wholesale Cost' value={`$${totalWholesale.toLocaleString()}`} icon={RiPriceTag3Line} />
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
          {monthlyData.map((bar) => {
            const totalH = 180;
            const revNum = Number(bar.revenue);
            const wholesaleNum = Number(bar.wholesaleCost);
            const commissionNum = Number(bar.commissions);

            const barH = (revNum / maxRevenue) * totalH;
            const wholesaleH = revNum > 0 ? (wholesaleNum / revNum) * barH : 0;
            const commissionH = revNum > 0 ? (commissionNum / revNum) * barH : 0;
            const profitH = barH - wholesaleH - commissionH;

            return (
              <div key={bar.month} className='flex flex-1 flex-col items-center justify-end gap-1.5 h-full'>
                <div className='text-label-2xs text-text-sub-600'>
                  ${(revNum / 1000).toFixed(1)}k
                </div>
                <div className='flex w-10 flex-col overflow-hidden rounded-md'>
                  <div className='border-b border-white/20 bg-primary-base/20' style={{ height: Math.max(profitH, 2) }} />
                  <div className='border-b border-white/20 bg-feature-base/30' style={{ height: Math.max(commissionH, 2) }} />
                  <div className='bg-warning-base/30' style={{ height: Math.max(wholesaleH, 2) }} />
                </div>
                <span className='text-label-2xs text-text-soft-400'>{bar.month}</span>
              </div>
            );
          })}
          {monthlyData.length === 0 && (
            <div className='flex w-full items-center justify-center h-full text-text-sub-600'>
              No historical data available
            </div>
          )}
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
            {monthlyData.map((row) => {
              const rev = Number(row.revenue);
              const prof = Number(row.netProfit);
              const margin = rev > 0 ? ((prof / rev) * 100).toFixed(1) : '0.0';
              return (
                <tr key={row.month} className='border-b border-stroke-soft-200 last:border-0 hover:bg-bg-weak-50 transition-colors'>
                  <td className='px-5 py-3.5 text-label-sm text-text-strong-950'>{row.month}</td>
                  <td className='px-5 py-3.5 text-right text-paragraph-sm text-text-strong-950'>${rev.toLocaleString()}</td>
                  <td className='px-5 py-3.5 text-right text-paragraph-sm text-text-sub-600'>${Number(row.wholesaleCost).toLocaleString()}</td>
                  <td className='px-5 py-3.5 text-right text-paragraph-sm text-text-sub-600'>${Number(row.commissions).toLocaleString()}</td>
                  <td className='px-5 py-3.5 text-right text-label-sm text-success-base'>${prof.toLocaleString()}</td>
                  <td className='px-5 py-3.5 text-right'>
                    <Badge variant='light' color='success' size='sm'>{margin}%</Badge>
                  </td>
                </tr>
              );
            })}
            {monthlyData.length === 0 && (
              <tr>
                <td colSpan={6} className='px-5 py-12 text-center text-text-sub-600'>No earnings data found</td>
              </tr>
            )}
          </tbody>
          {monthlyData.length > 0 && (
            <tfoot>
              <tr className='bg-bg-weak-50'>
                <td className='px-5 py-3.5 text-label-sm text-text-strong-950'>Total</td>
                <td className='px-5 py-3.5 text-right text-label-sm text-text-strong-950'>${totalRev.toLocaleString()}</td>
                <td className='px-5 py-3.5 text-right text-label-sm text-text-sub-600'>${totalWholesale.toLocaleString()}</td>
                <td className='px-5 py-3.5 text-right text-label-sm text-text-sub-600'>${totalCommissions.toLocaleString()}</td>
                <td className='px-5 py-3.5 text-right text-label-sm text-success-base'>${totalProfit.toLocaleString()}</td>
                <td className='px-5 py-3.5 text-right'>
                  <Badge variant='filled' color='success' size='sm'>{totalMargin}%</Badge>
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
}
