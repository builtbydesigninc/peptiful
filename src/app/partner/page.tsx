'use client';

import Link from 'next/link';
import { cn } from '@/utils/cn';
import { StatCard } from '@/components/ui/stat-card-new';
import { Badge } from '@/components/ui/badge-new';
import { Button } from '@/components/ui/button-new';
import {
  RiBuilding2Line,
  RiMoneyDollarCircleLine,
  RiBarChartBoxLine,
  RiTeamLine,
  RiArrowRightLine,
  RiLink,
  RiFileCopyLine,
  RiCheckLine,
  RiExternalLinkLine,
} from '@remixicon/react';
import * as React from 'react';

const recentBrands = [
  { name: 'PeptideGains', status: 'active', orders: 156, revenue: '$12,450', joined: 'Jan 15, 2026' },
  { name: 'VitalPure Labs', status: 'active', orders: 89, revenue: '$7,820', joined: 'Feb 1, 2026' },
  { name: 'NeuroEdge', status: 'active', orders: 42, revenue: '$3,650', joined: 'Feb 10, 2026' },
  { name: 'AlphaRecovery', status: 'pending', orders: 0, revenue: '$0', joined: 'Feb 20, 2026' },
];

export default function PartnerHomePage() {
  const [copied, setCopied] = React.useState(false);
  const handleCopy = () => { setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className='space-y-6'>
      <div className='flex items-start justify-between'>
        <div>
          <h1 className='text-title-h4 text-text-strong-950'>Welcome back, Marcus</h1>
          <p className='mt-1 text-paragraph-sm text-text-sub-600'>Here&apos;s your partner performance overview</p>
        </div>
        <Button variant='secondary' size='sm' asChild>
          <Link href='/partner/referrals'>
            <RiLink className='size-4' />
            Referral Tools
          </Link>
        </Button>
      </div>

      {/* Referral Link Card */}
      <div className='rounded-xl border border-primary-alpha-16 bg-primary-alpha-10/30 p-5'>
        <div className='flex items-center justify-between'>
          <div>
            <p className='text-label-sm text-text-strong-950'>Your Referral Link</p>
            <p className='mt-0.5 text-paragraph-xs text-text-sub-600'>Share this to recruit new brands and earn ongoing commissions</p>
          </div>
          <div className='flex items-center gap-2 rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 py-2'>
            <span className='text-paragraph-sm text-text-sub-600'>peptiful.com/join/partner_marcus</span>
            <Button variant='secondary' size='xs' onClick={handleCopy}>
              {copied ? <RiCheckLine className='size-3.5' /> : <RiFileCopyLine className='size-3.5' />}
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <StatCard title='Referred Brands' value='12' change='+3 this month' trend='up' icon={RiBuilding2Line} />
        <StatCard title='Active Brands' value='9' icon={RiTeamLine} />
        <StatCard title='Total Earnings' value='$18,640' change='+22% vs last month' trend='up' icon={RiMoneyDollarCircleLine} />
        <StatCard title='Avg Revenue / Brand' value='$2,180' icon={RiBarChartBoxLine} />
      </div>

      {/* Recent Brands */}
      <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs'>
        <div className='flex items-center justify-between border-b border-stroke-soft-200 px-5 py-4'>
          <h2 className='text-label-md text-text-strong-950'>Recent Brands</h2>
          <Button variant='ghost' size='sm' asChild>
            <Link href='/partner/brands'>View All <RiArrowRightLine className='size-4' /></Link>
          </Button>
        </div>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-stroke-soft-200'>
              {['Brand', 'Status', 'Orders', 'Revenue', 'Joined'].map((h) => (
                <th key={h} className='px-5 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600'>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentBrands.map((b) => (
              <tr key={b.name} className='border-b border-stroke-soft-200 last:border-0 hover:bg-bg-weak-50 transition-colors'>
                <td className='px-5 py-3.5 text-label-sm text-text-strong-950'>{b.name}</td>
                <td className='px-5 py-3.5'>
                  <Badge variant='light' color={b.status === 'active' ? 'success' : 'warning'} size='sm' dot>
                    {b.status === 'active' ? 'Active' : 'Pending'}
                  </Badge>
                </td>
                <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{b.orders}</td>
                <td className='px-5 py-3.5 text-label-sm text-text-strong-950'>{b.revenue}</td>
                <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{b.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
