'use client';

import * as React from 'react';
import { cn } from '@/utils/cn';
import { StatCard } from '@/components/ui/stat-card-new';
import { PageHeader } from '@/components/ui/page-header-new';
import { Badge } from '@/components/ui/badge-new';
import { Button } from '@/components/ui/button-new';
import { RiBuilding2Line, RiSearchLine, RiExternalLinkLine, RiMoreLine } from '@remixicon/react';

const brands = [
  { name: 'PeptideGains', domain: 'peptidegains.peptiful.com', status: 'active', products: 8, orders: 156, revenue: '$12,450', commission: '$1,245', joined: 'Jan 15, 2026' },
  { name: 'VitalPure Labs', domain: 'vitalpure.peptiful.com', status: 'active', products: 12, orders: 89, revenue: '$7,820', commission: '$782', joined: 'Feb 1, 2026' },
  { name: 'NeuroEdge', domain: 'neuroedge.peptiful.com', status: 'active', products: 5, orders: 42, revenue: '$3,650', commission: '$365', joined: 'Feb 10, 2026' },
  { name: 'BioStack Health', domain: 'biostack.peptiful.com', status: 'active', products: 15, orders: 210, revenue: '$18,900', commission: '$1,890', joined: 'Nov 5, 2025' },
  { name: 'PureForm Peptides', domain: 'pureform.peptiful.com', status: 'active', products: 6, orders: 78, revenue: '$6,240', commission: '$624', joined: 'Dec 12, 2025' },
  { name: 'Apex Longevity', domain: 'apex.peptiful.com', status: 'active', products: 9, orders: 134, revenue: '$11,200', commission: '$1,120', joined: 'Oct 20, 2025' },
  { name: 'SynaptiCore', domain: 'synapticore.peptiful.com', status: 'active', products: 4, orders: 56, revenue: '$4,800', commission: '$480', joined: 'Jan 28, 2026' },
  { name: 'TheraPep Co', domain: 'therapep.peptiful.com', status: 'active', products: 7, orders: 95, revenue: '$8,100', commission: '$810', joined: 'Dec 1, 2025' },
  { name: 'OmniVita', domain: 'omnivita.peptiful.com', status: 'active', products: 10, orders: 67, revenue: '$5,360', commission: '$536', joined: 'Jan 5, 2026' },
  { name: 'AlphaRecovery', domain: 'alpharecovery.peptiful.com', status: 'pending', products: 0, orders: 0, revenue: '$0', commission: '$0', joined: 'Feb 20, 2026' },
  { name: 'CellRegen Labs', domain: 'cellregen.peptiful.com', status: 'pending', products: 0, orders: 0, revenue: '$0', commission: '$0', joined: 'Feb 21, 2026' },
  { name: 'PrimePep', domain: 'primepep.peptiful.com', status: 'suspended', products: 3, orders: 12, revenue: '$960', commission: '$96', joined: 'Sep 15, 2025' },
];

export default function PartnerBrandsPage() {
  const [filter, setFilter] = React.useState('all');
  const filtered = brands.filter((b) => filter === 'all' || b.status === filter);

  return (
    <div className='space-y-6'>
      <PageHeader title='My Brands' description='Brands you&apos;ve referred to the Peptiful platform' />
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
        <StatCard title='Total Brands' value={brands.length} icon={RiBuilding2Line} />
        <StatCard title='Active' value={brands.filter((b) => b.status === 'active').length} trend='up' change='+3 this month' />
        <StatCard title='Total Commission' value='$7,948' trend='up' change='+18%' />
      </div>
      <div className='flex items-center gap-3'>
        <div className='relative flex-1'>
          <RiSearchLine className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-soft-400' />
          <input placeholder='Search brands...' className='h-9 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 pl-9 pr-3 text-paragraph-sm placeholder:text-text-disabled-300 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16' />
        </div>
        {['all', 'active', 'pending', 'suspended'].map((f) => (
          <Button key={f} variant='ghost' size='xs' className={cn(filter === f && 'bg-primary-alpha-10 text-primary-base')} onClick={() => setFilter(f)}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </Button>
        ))}
      </div>
      <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs overflow-hidden'>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-stroke-soft-200 bg-bg-weak-50'>
              {['Brand', 'Status', 'Products', 'Orders', 'Revenue', 'Your Commission', 'Joined'].map((h) => (
                <th key={h} className='px-5 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600'>{h}</th>
              ))}
              <th className='w-10 px-5 py-3' />
            </tr>
          </thead>
          <tbody>
            {filtered.map((b) => (
              <tr key={b.name} className='border-b border-stroke-soft-200 last:border-0 hover:bg-bg-weak-50 transition-colors'>
                <td className='px-5 py-3.5'>
                  <p className='text-label-sm text-text-strong-950'>{b.name}</p>
                  <p className='text-paragraph-xs text-text-sub-600'>{b.domain}</p>
                </td>
                <td className='px-5 py-3.5'>
                  <Badge variant='light' color={b.status === 'active' ? 'success' : b.status === 'pending' ? 'warning' : 'error'} size='sm' dot>
                    {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                  </Badge>
                </td>
                <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{b.products}</td>
                <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{b.orders}</td>
                <td className='px-5 py-3.5 text-label-sm text-text-strong-950'>{b.revenue}</td>
                <td className='px-5 py-3.5 text-label-sm text-success-base'>{b.commission}</td>
                <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{b.joined}</td>
                <td className='px-5 py-3.5'>
                  <Button variant='ghost' size='xs' iconOnly><RiMoreLine className='size-4' /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
