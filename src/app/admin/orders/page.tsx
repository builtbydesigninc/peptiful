'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/utils/cn';
import { StatCard } from '@/components/ui/stat-card-new';
import { PageHeader } from '@/components/ui/page-header-new';
import { Badge } from '@/components/ui/badge-new';
import { Button } from '@/components/ui/button-new';
import { RiFileList3Line, RiMoneyDollarCircleLine, RiTimeLine, RiSearchLine } from '@remixicon/react';

const orders = [
  { id: '#PEP-4821', brand: 'PeptideGains', customer: 'Alex Thompson', items: 2, total: '$169.98', wholesale: '$44.00', profit: '$125.98', status: 'delivered' },
  { id: '#PEP-4820', brand: 'BioStack Health', customer: 'Maria Garcia', items: 1, total: '$89.99', wholesale: '$22.00', profit: '$67.99', status: 'delivered' },
  { id: '#PEP-4819', brand: 'VitalPure Labs', customer: 'James Wilson', items: 3, total: '$254.97', wholesale: '$75.00', profit: '$179.97', status: 'shipped' },
  { id: '#PEP-4818', brand: 'Apex Longevity', customer: 'Emily Davis', items: 1, total: '$84.99', wholesale: '$18.00', profit: '$66.99', status: 'shipped' },
  { id: '#PEP-4817', brand: 'TheraPep Co', customer: 'Robert Brown', items: 2, total: '$124.99', wholesale: '$36.00', profit: '$88.99', status: 'processing' },
  { id: '#PEP-4816', brand: 'PeptideGains', customer: 'Lisa Anderson', items: 4, total: '$309.97', wholesale: '$88.00', profit: '$221.97', status: 'processing' },
  { id: '#PEP-4815', brand: 'OmniVita', customer: 'David Martinez', items: 1, total: '$79.99', wholesale: '$15.00', profit: '$64.99', status: 'new' },
  { id: '#PEP-4814', brand: 'SynaptiCore', customer: 'Sarah Johnson', items: 2, total: '$134.98', wholesale: '$28.00', profit: '$106.98', status: 'new' },
];

const statusColor = { delivered: 'success', shipped: 'warning', processing: 'information', new: 'gray' } as const;

export default function AdminOrdersPage() {
  const [activeStatus, setActiveStatus] = React.useState('all');

  return (
    <div className='space-y-6'>
      <PageHeader title='Orders' description='All platform orders across all brands' />
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <StatCard title='Total Orders' value='1,847' change='+156 this week' trend='up' icon={RiFileList3Line} />
        <StatCard title='Platform Revenue' value='$284,500' trend='up' change='+18.5%' icon={RiMoneyDollarCircleLine} />
        <StatCard title='Wholesale Cost' value='$118,000' />
        <StatCard title='Pending Fulfillment' value='18' icon={RiTimeLine} />
      </div>
      <div className='flex items-center gap-3'>
        {['all', 'new', 'processing', 'shipped', 'delivered'].map((s) => (
          <Button key={s} variant='ghost' size='xs' className={cn(activeStatus === s && 'bg-primary-alpha-10 text-primary-base')} onClick={() => setActiveStatus(s)}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </Button>
        ))}
        <div className='relative ml-auto w-64'>
          <RiSearchLine className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-soft-400' />
          <input placeholder='Search orders...' className='h-9 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 pl-9 pr-3 text-paragraph-sm placeholder:text-text-disabled-300 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16' />
        </div>
      </div>
      <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs overflow-hidden'>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-stroke-soft-200 bg-bg-weak-50'>
              {['Order', 'Brand', 'Customer', 'Items', 'Total', 'Wholesale', 'Profit', 'Status'].map((h) => (
                <th key={h} className='px-5 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600'>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.filter((o) => activeStatus === 'all' || o.status === activeStatus).map((o) => (
              <tr key={o.id} className='border-b border-stroke-soft-200 last:border-0 hover:bg-bg-weak-50 transition-colors cursor-pointer' onClick={() => window.location.href = `/admin/orders/${o.id.replace('#', '')}`}>
                <td className='px-5 py-3.5 text-label-sm text-primary-base'>{o.id}</td>
                <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{o.brand}</td>
                <td className='px-5 py-3.5 text-paragraph-sm text-text-strong-950'>{o.customer}</td>
                <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{o.items}</td>
                <td className='px-5 py-3.5 text-label-sm text-text-strong-950'>{o.total}</td>
                <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{o.wholesale}</td>
                <td className='px-5 py-3.5 text-label-sm text-success-base'>{o.profit}</td>
                <td className='px-5 py-3.5'>
                  <Badge variant='light' color={statusColor[o.status as keyof typeof statusColor]} size='sm' dot>
                    {o.status.charAt(0).toUpperCase() + o.status.slice(1)}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
