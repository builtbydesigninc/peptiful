'use client';

import * as React from 'react';
import { cn } from '@/utils/cn';
import { StatCard } from '@/components/ui/stat-card-new';
import { PageHeader } from '@/components/ui/page-header-new';
import { Badge } from '@/components/ui/badge-new';
import { Button } from '@/components/ui/button-new';
import {
  RiTeamLine,
  RiUserLine,
  RiMoneyDollarCircleLine,
  RiSearchLine,
  RiAddLine,
  RiFileCopyLine,
  RiCheckLine,
  RiArrowDownSLine,
  RiMoreLine,
  RiMailLine,
  RiCloseLine,
} from '@remixicon/react';

type L2Affiliate = {
  id: string;
  name: string;
  email: string;
  orders: number;
  revenue: string;
  rate: string;
  status: 'active' | 'suspended';
};

type L1Affiliate = {
  id: string;
  name: string;
  email: string;
  orders: number;
  revenue: string;
  rate: string;
  overrideRate: string;
  status: 'active' | 'suspended';
  l2s: L2Affiliate[];
};

const affiliates: L1Affiliate[] = [
  {
    id: 'l1-1', name: 'Jessica Parker', email: 'jessica@fitness.com', orders: 48, revenue: '$4,280',
    rate: '15%', overrideRate: '5%', status: 'active',
    l2s: [
      { id: 'l2-1', name: 'Mike Chen', email: 'mike@gmail.com', orders: 12, revenue: '$980', rate: '10%', status: 'active' },
      { id: 'l2-2', name: 'Anna White', email: 'anna@outlook.com', orders: 8, revenue: '$650', rate: '10%', status: 'active' },
    ],
  },
  {
    id: 'l1-2', name: 'David Rodriguez', email: 'david@wellness.co', orders: 35, revenue: '$3,120',
    rate: '12%', overrideRate: '3%', status: 'active',
    l2s: [
      { id: 'l2-3', name: 'Sophie Turner', email: 'sophie@gmail.com', orders: 15, revenue: '$1,200', rate: '8%', status: 'active' },
    ],
  },
  {
    id: 'l1-3', name: 'Rachel Kim', email: 'rachel@health.io', orders: 62, revenue: '$5,890',
    rate: '20%', overrideRate: '5%', status: 'active',
    l2s: [
      { id: 'l2-4', name: 'Tom Baker', email: 'tom@yahoo.com', orders: 22, revenue: '$1,780', rate: '10%', status: 'active' },
      { id: 'l2-5', name: 'Lisa Park', email: 'lisa@gmail.com', orders: 5, revenue: '$380', rate: '8%', status: 'suspended' },
      { id: 'l2-6', name: 'Jake Morris', email: 'jake@proton.me', orders: 18, revenue: '$1,450', rate: '10%', status: 'active' },
    ],
  },
  {
    id: 'l1-4', name: 'Mark Thompson', email: 'mark@supps.net', orders: 19, revenue: '$1,650',
    rate: '10%', overrideRate: '3%', status: 'active',
    l2s: [],
  },
  {
    id: 'l1-5', name: 'Olivia Santos', email: 'olivia@bio.co', orders: 0, revenue: '$0',
    rate: '15%', overrideRate: '5%', status: 'suspended',
    l2s: [],
  },
];

const totalL2 = affiliates.reduce((sum, a) => sum + a.l2s.length, 0);

export default function AffiliatesPage() {
  const [expandedRows, setExpandedRows] = React.useState<Set<string>>(new Set());
  const [showInvite, setShowInvite] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='space-y-6'>
      <PageHeader
        title='Affiliates'
        description='Manage your affiliate network and track commissions'
        actions={
          <Button size='md' onClick={() => setShowInvite(true)}>
            <RiAddLine className='size-4' />
            Invite Affiliate
          </Button>
        }
      />

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <StatCard title='Total Affiliates' value={affiliates.length + totalL2} icon={RiTeamLine} />
        <StatCard title='L1 Active' value={affiliates.filter((a) => a.status === 'active').length} icon={RiUserLine} />
        <StatCard title='L2 Active' value={totalL2} icon={RiUserLine} />
        <StatCard title='Commissions Paid' value='$8,240' change='+24% this month' trend='up' icon={RiMoneyDollarCircleLine} />
      </div>

      {/* Search */}
      <div className='flex items-center gap-3'>
        <div className='relative flex-1'>
          <RiSearchLine className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-soft-400' />
          <input
            placeholder='Search affiliates...'
            className='h-9 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 pl-9 pr-3 text-paragraph-sm text-text-strong-950 placeholder:text-text-disabled-300 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16'
          />
        </div>
      </div>

      {/* Affiliates Table */}
      <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs overflow-hidden'>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-stroke-soft-200 bg-bg-weak-50'>
              <th className='w-8 px-5 py-3' />
              <th className='px-5 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600'>Name</th>
              <th className='px-5 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600'>Type</th>
              <th className='px-5 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600'>Orders</th>
              <th className='px-5 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600'>Revenue</th>
              <th className='px-5 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600'>Rate</th>
              <th className='px-5 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600'>Status</th>
              <th className='w-10 px-5 py-3' />
            </tr>
          </thead>
          <tbody>
            {affiliates.map((aff) => (
              <React.Fragment key={aff.id}>
                <tr
                  className={cn(
                    'border-b border-stroke-soft-200 transition-colors cursor-pointer hover:bg-bg-weak-50',
                    expandedRows.has(aff.id) && 'bg-bg-weak-50',
                  )}
                  onClick={() => aff.l2s.length > 0 && toggleRow(aff.id)}
                >
                  <td className='px-5 py-3.5'>
                    {aff.l2s.length > 0 && (
                      <RiArrowDownSLine
                        className={cn(
                          'size-4 text-text-soft-400 transition-transform',
                          expandedRows.has(aff.id) && 'rotate-180',
                        )}
                      />
                    )}
                  </td>
                  <td className='px-5 py-3.5'>
                    <div>
                      <p className='text-label-sm text-text-strong-950'>{aff.name}</p>
                      <p className='text-paragraph-xs text-text-sub-600'>{aff.email}</p>
                    </div>
                  </td>
                  <td className='px-5 py-3.5'>
                    <Badge variant='light' color='primary' size='sm'>L1</Badge>
                    {aff.l2s.length > 0 && (
                      <span className='ml-1.5 text-paragraph-xs text-text-soft-400'>
                        ({aff.l2s.length} L2s)
                      </span>
                    )}
                  </td>
                  <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{aff.orders}</td>
                  <td className='px-5 py-3.5 text-label-sm text-text-strong-950'>{aff.revenue}</td>
                  <td className='px-5 py-3.5'>
                    <span className='text-paragraph-sm text-text-sub-600'>{aff.rate}</span>
                    {aff.overrideRate && (
                      <span className='ml-1 text-paragraph-xs text-text-soft-400'>
                        +{aff.overrideRate} override
                      </span>
                    )}
                  </td>
                  <td className='px-5 py-3.5'>
                    <Badge variant='light' color={aff.status === 'active' ? 'success' : 'error'} size='sm' dot>
                      {aff.status === 'active' ? 'Active' : 'Suspended'}
                    </Badge>
                  </td>
                  <td className='px-5 py-3.5'>
                    <Button variant='ghost' size='xs' iconOnly onClick={(e) => e.stopPropagation()}>
                      <RiMoreLine className='size-4' />
                    </Button>
                  </td>
                </tr>
                {/* L2 rows */}
                {expandedRows.has(aff.id) &&
                  aff.l2s.map((l2) => (
                    <tr key={l2.id} className='border-b border-stroke-soft-200 bg-bg-weak-50/60'>
                      <td className='px-5 py-3' />
                      <td className='px-5 py-3'>
                        <div className='pl-6 border-l-2 border-stroke-soft-200 ml-1'>
                          <p className='text-label-sm text-text-strong-950'>{l2.name}</p>
                          <p className='text-paragraph-xs text-text-sub-600'>{l2.email}</p>
                        </div>
                      </td>
                      <td className='px-5 py-3'>
                        <Badge variant='stroke' color='gray' size='sm'>L2</Badge>
                      </td>
                      <td className='px-5 py-3 text-paragraph-sm text-text-sub-600'>{l2.orders}</td>
                      <td className='px-5 py-3 text-label-sm text-text-strong-950'>{l2.revenue}</td>
                      <td className='px-5 py-3 text-paragraph-sm text-text-sub-600'>{l2.rate}</td>
                      <td className='px-5 py-3'>
                        <Badge variant='light' color={l2.status === 'active' ? 'success' : 'error'} size='sm' dot>
                          {l2.status === 'active' ? 'Active' : 'Suspended'}
                        </Badge>
                      </td>
                      <td className='px-5 py-3'>
                        <Button variant='ghost' size='xs' iconOnly>
                          <RiMoreLine className='size-4' />
                        </Button>
                      </td>
                    </tr>
                  ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invite Modal */}
      {showInvite && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-overlay'>
          <div className='w-full max-w-md rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-6 shadow-complex'>
            <div className='flex items-center justify-between mb-5'>
              <h3 className='text-label-lg text-text-strong-950'>Invite Affiliate</h3>
              <Button variant='ghost' size='xs' iconOnly onClick={() => setShowInvite(false)}>
                <RiCloseLine className='size-5' />
              </Button>
            </div>
            <p className='mb-4 text-paragraph-sm text-text-sub-600'>
              Share this link to invite L1 affiliates to your brand.
            </p>
            <div className='flex items-center gap-2 rounded-10 border border-stroke-soft-200 bg-bg-weak-50 px-3 py-2.5'>
              <span className='flex-1 truncate text-paragraph-sm text-text-sub-600'>
                https://peptidegains.peptiful.com/join/aff_inv_x8k2m
              </span>
              <Button variant='secondary' size='xs' onClick={handleCopy}>
                {copied ? <RiCheckLine className='size-3.5' /> : <RiFileCopyLine className='size-3.5' />}
                {copied ? 'Copied' : 'Copy'}
              </Button>
            </div>
            <div className='mt-4'>
              <p className='mb-2 text-label-xs text-text-sub-600'>Or invite by email</p>
              <div className='flex gap-2'>
                <div className='relative flex-1'>
                  <RiMailLine className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-soft-400' />
                  <input
                    placeholder='affiliate@email.com'
                    className='h-9 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 pl-9 pr-3 text-paragraph-sm placeholder:text-text-disabled-300 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16'
                  />
                </div>
                <Button size='md'>Send Invite</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
