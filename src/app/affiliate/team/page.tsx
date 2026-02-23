'use client';

import { PageHeader } from '@/components/ui/page-header-new';
import { StatCard } from '@/components/ui/stat-card-new';
import { Badge } from '@/components/ui/badge-new';
import { Button } from '@/components/ui/button-new';
import { RiTeamLine, RiMoneyDollarCircleLine, RiAddLine, RiMoreLine } from '@remixicon/react';

const l2s = [
  { name: 'Mike Chen', email: 'mike@gmail.com', orders: 12, revenue: '$980', l2Cut: '30%', l2Earned: '$44.10', youKeep: '$102.90', status: 'active' },
  { name: 'Anna White', email: 'anna@outlook.com', orders: 8, revenue: '$650', l2Cut: '30%', l2Earned: '$29.25', youKeep: '$68.25', status: 'active' },
  { name: 'Tom Baker', email: 'tom@yahoo.com', orders: 22, revenue: '$1,780', l2Cut: '25%', l2Earned: '$66.75', youKeep: '$200.25', status: 'active' },
  { name: 'Lisa Park', email: 'lisa@gmail.com', orders: 5, revenue: '$380', l2Cut: '30%', l2Earned: '$17.10', youKeep: '$39.90', status: 'suspended' },
  { name: 'Jake Morris', email: 'jake@proton.me', orders: 18, revenue: '$1,450', l2Cut: '30%', l2Earned: '$65.25', youKeep: '$152.25', status: 'active' },
  { name: 'Sarah Lee', email: 'sarah@gmail.com', orders: 3, revenue: '$240', l2Cut: '25%', l2Earned: '$9.00', youKeep: '$27.00', status: 'active' },
];

export default function AffiliateTeamPage() {
  return (
    <div className='space-y-6'>
      <PageHeader title='My Team (L2 Affiliates)' description='Affiliates you&apos;ve recruited — you earn an override on their sales' actions={<Button size='md'><RiAddLine className='size-4' />Recruit L2</Button>} />
      <div className='rounded-10 border border-information-light bg-information-lighter p-4 mb-2'>
        <p className='text-label-xs text-information-dark'>How L2 commission works</p>
        <p className='mt-1 text-paragraph-xs text-text-sub-600'>
          You set what % of <span className='font-medium'>your commission</span> each L2 earns. For example, if you earn 15% on a $150 sale ($22.50) and give an L2 30%, they get $6.75 and you keep $15.75. The brand always pays you the same amount.
        </p>
      </div>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
        <StatCard title='Total L2s' value={l2s.length} icon={RiTeamLine} />
        <StatCard title='L2 Sales Revenue' value='$5,480' change='+18%' trend='up' />
        <StatCard title='You Keep (after L2 split)' value='$590.55' change='From L2 sales' icon={RiMoneyDollarCircleLine} />
      </div>
      <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs overflow-hidden'>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-stroke-soft-200 bg-bg-weak-50'>
              {['Name', 'Orders', 'Revenue', 'Their Cut', 'They Earned', 'You Keep', 'Status', ''].map((h) => (
                <th key={h} className='px-5 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600'>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {l2s.map((l2) => (
              <tr key={l2.email} className='border-b border-stroke-soft-200 last:border-0 hover:bg-bg-weak-50 transition-colors'>
                <td className='px-5 py-3.5'>
                  <p className='text-label-sm text-text-strong-950'>{l2.name}</p>
                  <p className='text-paragraph-xs text-text-sub-600'>{l2.email}</p>
                </td>
                <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{l2.orders}</td>
                <td className='px-5 py-3.5 text-label-sm text-text-strong-950'>{l2.revenue}</td>
                <td className='px-5 py-3.5'><Badge variant='stroke' color='gray' size='sm'>{l2.l2Cut} of yours</Badge></td>
                <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{l2.l2Earned}</td>
                <td className='px-5 py-3.5 text-label-sm text-success-base'>{l2.youKeep}</td>
                <td className='px-5 py-3.5'>
                  <Badge variant='light' color={l2.status === 'active' ? 'success' : 'error'} size='sm' dot>
                    {l2.status === 'active' ? 'Active' : 'Suspended'}
                  </Badge>
                </td>
                <td className='px-5 py-3.5'><Button variant='ghost' size='xs' iconOnly><RiMoreLine className='size-4' /></Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
