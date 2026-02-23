'use client';

import Link from 'next/link';
import { StatCard } from '@/components/ui/stat-card-new';
import { Badge } from '@/components/ui/badge-new';
import { Button } from '@/components/ui/button-new';
import {
  RiBuilding2Line, RiHandHeartLine, RiMoneyDollarCircleLine, RiFileList3Line,
  RiTeamLine, RiShoppingBag3Line, RiArrowRightLine, RiArrowUpLine,
} from '@remixicon/react';

const recentActivity = [
  { type: 'brand', msg: 'AlphaRecovery signed up via partner Marcus Rivera', time: '2 hours ago', href: '/admin/brands' },
  { type: 'order', msg: 'Order #PG-1156 completed — BPC-157 x2 to Alex Thompson', time: '3 hours ago', href: '/admin/orders/1156' },
  { type: 'payout', msg: 'Partner payout $4,520 processed to Marcus Rivera', time: '1 day ago', href: '/admin/payouts' },
  { type: 'brand', msg: 'CellRegen Labs signed up via partner Marcus Rivera', time: '1 day ago', href: '/admin/brands' },
  { type: 'commission', msg: 'Commission $17.00 calculated for affiliate Jessica Parker', time: '2 days ago', href: '/admin/commissions' },
];

const topBrands = [
  { name: 'BioStack Health', orders: 210, revenue: '$18,900', href: '/admin/brands' },
  { name: 'PeptideGains', orders: 156, revenue: '$12,450', href: '/admin/brands' },
  { name: 'Apex Longevity', orders: 134, revenue: '$11,200', href: '/admin/brands' },
  { name: 'TheraPep Co', orders: 95, revenue: '$8,100', href: '/admin/brands' },
  { name: 'VitalPure Labs', orders: 89, revenue: '$7,820', href: '/admin/brands' },
];

export default function AdminOverviewPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-title-h4 text-text-strong-950'>Platform Overview</h1>
        <p className='mt-1 text-paragraph-sm text-text-sub-600'>Peptiful admin dashboard — all platform metrics at a glance</p>
      </div>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <StatCard title='Total Brands' value='42' change='+6 this month' trend='up' icon={RiBuilding2Line} />
        <StatCard title='Active Partners' value='8' change='+2' trend='up' icon={RiHandHeartLine} />
        <StatCard title='Platform Revenue' value='$284,500' change='+18.5%' trend='up' icon={RiMoneyDollarCircleLine} />
        <StatCard title='Total Orders' value='1,847' change='+156 this week' trend='up' icon={RiFileList3Line} />
      </div>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <StatCard title='Total Affiliates' value='312' icon={RiTeamLine} />
        <StatCard title='Products in Catalog' value='48' icon={RiShoppingBag3Line} />
        <StatCard title='Pending Commissions' value='$12,480' />
        <StatCard title='Monthly Payouts' value='$38,200' />
      </div>

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        {/* Recent Activity */}
        <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs'>
          <div className='border-b border-stroke-soft-200 px-5 py-4'>
            <h2 className='text-label-md text-text-strong-950'>Recent Activity</h2>
          </div>
          <div className='divide-y divide-stroke-soft-200'>
            {recentActivity.map((a, i) => (
              <Link key={i} href={a.href} className='flex items-start gap-3 px-5 py-3.5 transition-colors hover:bg-bg-weak-50'>
                <div className='mt-0.5 size-2 shrink-0 rounded-full bg-primary-base' />
                <div className='flex-1 min-w-0'>
                  <p className='text-paragraph-sm text-text-strong-950'>{a.msg}</p>
                  <p className='text-paragraph-xs text-text-soft-400'>{a.time}</p>
                </div>
                <RiArrowRightLine className='mt-1 size-4 shrink-0 text-text-soft-400' />
              </Link>
            ))}
          </div>
        </div>

        {/* Top Brands */}
        <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs'>
          <div className='flex items-center justify-between border-b border-stroke-soft-200 px-5 py-4'>
            <h2 className='text-label-md text-text-strong-950'>Top Brands</h2>
            <Button variant='ghost' size='sm' asChild>
              <Link href='/admin/brands'>View All <RiArrowRightLine className='size-4' /></Link>
            </Button>
          </div>
          <div className='divide-y divide-stroke-soft-200'>
            {topBrands.map((b, i) => (
              <Link key={b.name} href={b.href} className='flex items-center justify-between px-5 py-3.5 transition-colors hover:bg-bg-weak-50'>
                <div className='flex items-center gap-3'>
                  <span className='flex size-7 items-center justify-center rounded-full bg-bg-weak-50 text-label-2xs text-text-sub-600'>{i + 1}</span>
                  <span className='text-label-sm text-text-strong-950'>{b.name}</span>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='text-right'>
                    <p className='text-label-sm text-text-strong-950'>{b.revenue}</p>
                    <p className='text-paragraph-xs text-text-sub-600'>{b.orders} orders</p>
                  </div>
                  <RiArrowRightLine className='size-4 text-text-soft-400' />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
