'use client';

import * as React from 'react';
import { cn } from '@/utils/cn';
import { StatCard } from '@/components/ui/stat-card-new';
import { PageHeader } from '@/components/ui/page-header-new';
import { Badge } from '@/components/ui/badge-new';
import { Button } from '@/components/ui/button-new';
import { RiPercentLine, RiMoneyDollarCircleLine, RiTimeLine, RiSearchLine } from '@remixicon/react';

const commissions = [
  { id: 'COM-892', order: '#PEP-4821', actor: 'Jessica Parker', type: 'L1 Affiliate', brand: 'PeptideGains', amount: '$22.50', rate: '15% of retail', status: 'pending', note: 'Direct L1 sale' },
  { id: 'COM-891', order: '#PEP-4821', actor: 'Mike Chen', type: 'L2 Affiliate', brand: 'PeptideGains', amount: '$6.75', rate: '30% of L1 cut', status: 'pending', note: 'From Jessica\'s $22.50' },
  { id: 'COM-890', order: '#PEP-4821', actor: 'Jessica Parker', type: 'L1 (L2 sale)', brand: 'PeptideGains', amount: '$15.75', rate: '70% kept', status: 'pending', note: 'After L2 split' },
  { id: 'COM-889', order: '#PEP-4820', actor: 'Marcus Rivera', type: 'Partner', brand: 'BioStack Health', amount: '$4.00', rate: '5% of wholesale', status: 'pending', note: 'Wholesale $80' },
  { id: 'COM-888', order: '#PEP-4819', actor: 'David Rodriguez', type: 'L1 Affiliate', brand: 'VitalPure Labs', amount: '$18.00', rate: '12% of retail', status: 'paid', note: 'Direct L1 sale' },
  { id: 'COM-887', order: '#PEP-4818', actor: 'Rachel Kim', type: 'L1 Affiliate', brand: 'Apex Longevity', amount: '$30.00', rate: '20% of retail', status: 'paid', note: 'Direct L1 sale' },
  { id: 'COM-886', order: '#PEP-4817', actor: 'Linda Chen', type: 'Partner', brand: 'TheraPep Co', amount: '$4.80', rate: '6% of wholesale', status: 'paid', note: 'Wholesale $80' },
  { id: 'COM-885', order: '#PEP-4816', actor: 'Tom Baker', type: 'L2 Affiliate', brand: 'PeptideGains', amount: '$6.75', rate: '30% of L1 cut', status: 'paid', note: 'From Jessica\'s cut' },
];

const typeColor = { 'L1 Affiliate': 'primary', 'L2 Affiliate': 'feature', 'L1 (L2 sale)': 'information', 'Partner': 'warning' } as const;

export default function AdminCommissionsPage() {
  const [tab, setTab] = React.useState('all');

  return (
    <div className='space-y-6'>
      <PageHeader title='Commissions' description='Track all commission calculations across the platform' />
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <StatCard title='Pending Commissions' value='$12,480' icon={RiTimeLine} />
        <StatCard title='Paid This Month' value='$38,200' change='+15%' trend='up' icon={RiMoneyDollarCircleLine} />
        <StatCard title='Total Paid (All Time)' value='$184,600' icon={RiPercentLine} />
        <StatCard title='Commission Entries' value='2,847' />
      </div>
      <div className='flex items-center gap-3'>
        {['all', 'pending', 'paid'].map((t) => (
          <Button key={t} variant='ghost' size='xs' className={cn(tab === t && 'bg-primary-alpha-10 text-primary-base')} onClick={() => setTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </Button>
        ))}
        <div className='relative ml-auto w-64'>
          <RiSearchLine className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-soft-400' />
          <input placeholder='Search commissions...' className='h-9 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 pl-9 pr-3 text-paragraph-sm placeholder:text-text-disabled-300 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16' />
        </div>
      </div>
      <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs overflow-hidden'>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-stroke-soft-200 bg-bg-weak-50'>
              {['ID', 'Order', 'Actor', 'Type', 'Brand', 'Rate', 'Amount', 'Status', 'Note'].map((h) => (
                <th key={h} className='px-5 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600'>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {commissions.filter((c) => tab === 'all' || c.status === tab).map((c) => (
              <tr key={c.id} className='border-b border-stroke-soft-200 last:border-0 hover:bg-bg-weak-50 transition-colors'>
                <td className='px-5 py-3.5 text-label-sm text-text-sub-600'>{c.id}</td>
                <td className='px-5 py-3.5 text-label-sm text-primary-base'>{c.order}</td>
                <td className='px-5 py-3.5 text-paragraph-sm text-text-strong-950'>{c.actor}</td>
                <td className='px-5 py-3.5'>
                  <Badge variant='light' color={typeColor[c.type as keyof typeof typeColor] ?? 'gray'} size='sm'>{c.type}</Badge>
                </td>
                <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{c.brand}</td>
                <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{c.rate}</td>
                <td className='px-5 py-3.5 text-label-sm text-text-strong-950'>{c.amount}</td>
                <td className='px-5 py-3.5'>
                  <Badge variant='light' color={c.status === 'paid' ? 'success' : 'warning'} size='sm' dot>
                    {c.status === 'paid' ? 'Paid' : 'Pending'}
                  </Badge>
                </td>
                <td className='px-5 py-3.5 text-paragraph-xs text-text-soft-400'>{c.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
