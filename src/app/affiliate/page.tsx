'use client';

import Link from 'next/link';
import { StatCard } from '@/components/ui/stat-card-new';
import { Badge } from '@/components/ui/badge-new';
import { Button } from '@/components/ui/button-new';
import {
  RiMoneyDollarCircleLine, RiFileList3Line, RiTeamLine, RiLineChartLine,
  RiArrowRightLine, RiFileCopyLine, RiCheckLine,
} from '@remixicon/react';
import * as React from 'react';

const recentOrders = [
  { id: '#PG-1156', brand: 'PeptideGains', customer: 'Alex Thompson', total: '$169.98', commission: '$17.00', date: 'Feb 22', status: 'Delivered' },
  { id: '#PG-1155', brand: 'PeptideGains', customer: 'Maria Garcia', total: '$89.99', commission: '$9.00', date: 'Feb 22', status: 'Shipped' },
  { id: '#BS-0421', brand: 'BioStack Health', customer: 'James Wilson', total: '$154.97', commission: '$23.25', date: 'Feb 21', status: 'Delivered' },
  { id: '#PG-1152', brand: 'PeptideGains', customer: 'Robert Brown', total: '$124.99', commission: '$12.50', date: 'Feb 20', status: 'Processing' },
];

export default function AffiliateDashboardPage() {
  const [copied, setCopied] = React.useState(false);
  const copy = () => { setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-title-h4 text-text-strong-950'>Welcome back, Jessica</h1>
        <p className='mt-1 text-paragraph-sm text-text-sub-600'>Your affiliate performance overview</p>
      </div>

      {/* Quick referral link */}
      <div className='flex items-center gap-3 rounded-xl border border-primary-alpha-16 bg-primary-alpha-10/30 px-5 py-4'>
        <div className='flex-1 min-w-0'>
          <p className='text-label-xs text-text-sub-600'>Your Referral Link</p>
          <p className='truncate text-paragraph-sm text-text-sub-600'>peptidegains.peptiful.com/?ref=jessica_parker</p>
        </div>
        <Button variant='secondary' size='xs' onClick={copy}>
          {copied ? <RiCheckLine className='size-3.5' /> : <RiFileCopyLine className='size-3.5' />}
          {copied ? 'Copied' : 'Copy'}
        </Button>
      </div>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <StatCard title='Total Earnings' value='$4,280' change='+32% this month' trend='up' icon={RiMoneyDollarCircleLine} />
        <StatCard title='Orders Referred' value='48' change='+8 this week' trend='up' icon={RiFileList3Line} />
        <StatCard title='My L2 Team' value='6' icon={RiTeamLine} />
        <StatCard title='Override Earnings' value='$680' change='From L2 sales' trend='up' icon={RiLineChartLine} />
      </div>

      {/* Recent Orders */}
      <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs'>
        <div className='flex items-center justify-between border-b border-stroke-soft-200 px-5 py-4'>
          <h2 className='text-label-md text-text-strong-950'>Recent Orders</h2>
          <Button variant='ghost' size='sm' asChild>
            <Link href='/affiliate/orders'>View All <RiArrowRightLine className='size-4' /></Link>
          </Button>
        </div>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-stroke-soft-200'>
              {['Order', 'Brand', 'Customer', 'Total', 'Commission', 'Status'].map((h) => (
                <th key={h} className='px-5 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600'>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((o) => (
              <tr key={o.id} className='border-b border-stroke-soft-200 last:border-0 hover:bg-bg-weak-50 transition-colors'>
                <td className='px-5 py-3.5 text-label-sm text-primary-base'>{o.id}</td>
                <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{o.brand}</td>
                <td className='px-5 py-3.5 text-paragraph-sm text-text-strong-950'>{o.customer}</td>
                <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{o.total}</td>
                <td className='px-5 py-3.5 text-label-sm text-success-base'>{o.commission}</td>
                <td className='px-5 py-3.5'>
                  <Badge variant='light' color={o.status === 'Delivered' ? 'success' : o.status === 'Shipped' ? 'warning' : 'information'} size='sm' dot>{o.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
