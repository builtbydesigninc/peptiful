'use client';

import { PageHeader } from '@/components/ui/page-header-new';
import { Badge } from '@/components/ui/badge-new';
import { RiFileList3Line } from '@remixicon/react';
import { StatCard } from '@/components/ui/stat-card-new';

const orders = [
  { id: '#PG-1156', brand: 'PeptideGains', customer: 'Alex Thompson', total: '$169.98', commission: '$17.00', type: 'Direct', date: 'Feb 22, 2026', status: 'Delivered' },
  { id: '#PG-1155', brand: 'PeptideGains', customer: 'Maria Garcia', total: '$89.99', commission: '$9.00', type: 'Direct', date: 'Feb 22, 2026', status: 'Shipped' },
  { id: '#BS-0421', brand: 'BioStack Health', customer: 'James Wilson', total: '$154.97', commission: '$23.25', type: 'Direct', date: 'Feb 21, 2026', status: 'Delivered' },
  { id: '#PG-1150', brand: 'PeptideGains', customer: 'David Martinez', total: '$79.99', commission: '$4.00', type: 'L2 Override', date: 'Feb 19, 2026', status: 'Delivered' },
  { id: '#PG-1148', brand: 'PeptideGains', customer: 'Chris Taylor', total: '$45.00', commission: '$2.25', type: 'L2 Override', date: 'Feb 18, 2026', status: 'Delivered' },
  { id: '#BS-0418', brand: 'BioStack Health', customer: 'Jennifer Lee', total: '$187.97', commission: '$28.20', type: 'Direct', date: 'Feb 18, 2026', status: 'Delivered' },
];

export default function AffiliateOrdersPage() {
  return (
    <div className='space-y-6'>
      <PageHeader title='Orders' description='All orders attributed to you and your L2 team' />
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
        <StatCard title='Total Orders' value='78' icon={RiFileList3Line} />
        <StatCard title='Direct Sales' value='68' />
        <StatCard title='L2 Override Orders' value='10' />
      </div>
      <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs overflow-hidden'>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-stroke-soft-200 bg-bg-weak-50'>
              {['Order', 'Brand', 'Customer', 'Total', 'Your Commission', 'Type', 'Date', 'Status'].map((h) => (
                <th key={h} className='px-5 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600'>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id + o.type} className='border-b border-stroke-soft-200 last:border-0 hover:bg-bg-weak-50 transition-colors'>
                <td className='px-5 py-3.5 text-label-sm text-primary-base'>{o.id}</td>
                <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{o.brand}</td>
                <td className='px-5 py-3.5 text-paragraph-sm text-text-strong-950'>{o.customer}</td>
                <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{o.total}</td>
                <td className='px-5 py-3.5 text-label-sm text-success-base'>{o.commission}</td>
                <td className='px-5 py-3.5'>
                  <Badge variant='light' color={o.type === 'Direct' ? 'primary' : 'feature'} size='sm'>{o.type}</Badge>
                </td>
                <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{o.date}</td>
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
