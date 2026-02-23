'use client';

import { PageHeader } from '@/components/ui/page-header-new';
import { StatCard } from '@/components/ui/stat-card-new';
import { Badge } from '@/components/ui/badge-new';
import { Button } from '@/components/ui/button-new';
import { RiWallet3Line, RiTimeLine, RiCheckboxCircleLine, RiMoneyDollarCircleLine } from '@remixicon/react';

const payoutQueue = [
  { actor: 'Marcus Rivera', type: 'Partner', amount: '$5,630', period: 'Feb 2026', scheduled: 'Mar 15, 2026' },
  { actor: 'Jessica Parker', type: 'L1 Affiliate', amount: '$1,280', period: 'Feb 2026', scheduled: 'Mar 15, 2026' },
  { actor: 'David Rodriguez', type: 'L1 Affiliate', amount: '$940', period: 'Feb 2026', scheduled: 'Mar 15, 2026' },
  { actor: 'Rachel Kim', type: 'L1 Affiliate', amount: '$1,820', period: 'Feb 2026', scheduled: 'Mar 15, 2026' },
  { actor: 'Linda Chen', type: 'Partner', amount: '$3,840', period: 'Feb 2026', scheduled: 'Mar 15, 2026' },
];

const recentPayouts = [
  { id: 'PPAY-102', actor: 'Marcus Rivera', type: 'Partner', amount: '$4,520', date: 'Feb 15, 2026', status: 'completed' },
  { id: 'PPAY-101', actor: 'Jessica Parker', type: 'L1 Affiliate', amount: '$1,080', date: 'Feb 15, 2026', status: 'completed' },
  { id: 'PPAY-100', actor: 'Rachel Kim', type: 'L1 Affiliate', amount: '$1,620', date: 'Feb 15, 2026', status: 'completed' },
  { id: 'PPAY-099', actor: 'Linda Chen', type: 'Partner', amount: '$3,240', date: 'Feb 15, 2026', status: 'completed' },
  { id: 'PPAY-098', actor: 'Jake Williams', type: 'Partner', amount: '$2,410', date: 'Feb 15, 2026', status: 'completed' },
];

export default function AdminPayoutsPage() {
  return (
    <div className='space-y-6'>
      <PageHeader title='Payouts' description='Manage payout queue and history' actions={<Button size='md'>Process All Pending</Button>} />
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <StatCard title='Pending Payouts' value='$13,510' icon={RiTimeLine} />
        <StatCard title='Processed This Month' value='$38,200' icon={RiCheckboxCircleLine} />
        <StatCard title='Total Paid (All Time)' value='$184,600' icon={RiMoneyDollarCircleLine} />
        <StatCard title='Payout Queue' value='5 actors' icon={RiWallet3Line} />
      </div>

      <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs overflow-hidden'>
        <div className='border-b border-stroke-soft-200 px-5 py-4'>
          <h3 className='text-label-md text-text-strong-950'>Payout Queue (Mar 15, 2026)</h3>
        </div>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-stroke-soft-200 bg-bg-weak-50'>
              {['Actor', 'Type', 'Period', 'Amount', 'Scheduled', ''].map((h) => (
                <th key={h} className='px-5 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600'>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {payoutQueue.map((p) => (
              <tr key={p.actor} className='border-b border-stroke-soft-200 last:border-0 hover:bg-bg-weak-50 transition-colors'>
                <td className='px-5 py-3.5 text-label-sm text-text-strong-950'>{p.actor}</td>
                <td className='px-5 py-3.5'><Badge variant='light' color={p.type === 'Partner' ? 'warning' : 'primary'} size='sm'>{p.type}</Badge></td>
                <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{p.period}</td>
                <td className='px-5 py-3.5 text-label-sm text-text-strong-950'>{p.amount}</td>
                <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{p.scheduled}</td>
                <td className='px-5 py-3.5'><Button variant='secondary' size='xs'>Process</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs overflow-hidden'>
        <div className='border-b border-stroke-soft-200 px-5 py-4'>
          <h3 className='text-label-md text-text-strong-950'>Recent Payouts</h3>
        </div>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-stroke-soft-200 bg-bg-weak-50'>
              {['ID', 'Actor', 'Type', 'Amount', 'Date', 'Status'].map((h) => (
                <th key={h} className='px-5 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600'>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentPayouts.map((p) => (
              <tr key={p.id} className='border-b border-stroke-soft-200 last:border-0 hover:bg-bg-weak-50 transition-colors'>
                <td className='px-5 py-3.5 text-label-sm text-text-sub-600'>{p.id}</td>
                <td className='px-5 py-3.5 text-label-sm text-text-strong-950'>{p.actor}</td>
                <td className='px-5 py-3.5'><Badge variant='light' color={p.type === 'Partner' ? 'warning' : 'primary'} size='sm'>{p.type}</Badge></td>
                <td className='px-5 py-3.5 text-label-sm text-text-strong-950'>{p.amount}</td>
                <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{p.date}</td>
                <td className='px-5 py-3.5'><Badge variant='light' color='success' size='sm' dot>Completed</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
