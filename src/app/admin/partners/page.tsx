'use client';

import * as React from 'react';
import { cn } from '@/utils/cn';
import { PageHeader } from '@/components/ui/page-header-new';
import { Badge } from '@/components/ui/badge-new';
import { Button } from '@/components/ui/button-new';
import { RiSearchLine, RiAddLine, RiMoreLine, RiCloseLine, RiEyeLine, RiEditLine, RiDeleteBinLine, RiForbidLine, RiCheckLine } from '@remixicon/react';

const partners = [
  { id: 'p1', name: 'Marcus Rivera', company: 'Wellness Partners Co.', brands: 12, revenue: '$56,300', commission: '$5,630', rate: '10%', status: 'active' },
  { id: 'p2', name: 'Linda Chen', company: 'SupplChain Inc.', brands: 8, revenue: '$38,400', commission: '$3,840', rate: '10%', status: 'active' },
  { id: 'p3', name: 'Jake Williams', company: 'BioConnect', brands: 6, revenue: '$24,100', commission: '$2,410', rate: '10%', status: 'active' },
  { id: 'p4', name: 'Priya Sharma', company: 'NutriPartners', brands: 5, revenue: '$18,200', commission: '$1,820', rate: '10%', status: 'active' },
  { id: 'p5', name: 'Tom Baker', company: 'PeptideNetwork', brands: 4, revenue: '$12,600', commission: '$1,260', rate: '10%', status: 'active' },
  { id: 'p6', name: 'Sarah Kim', company: 'HealthDistro', brands: 3, revenue: '$8,900', commission: '$890', rate: '10%', status: 'active' },
  { id: 'p7', name: 'David Moore', company: 'WellnessHub', brands: 2, revenue: '$4,200', commission: '$420', rate: '10%', status: 'pending' },
  { id: 'p8', name: 'Emma Lewis', company: 'VitaReach', brands: 0, revenue: '$0', commission: '$0', rate: '10%', status: 'pending' },
];

function RowMenu({ partner }: { partner: typeof partners[0] }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  return (
    <div ref={ref} className='relative'>
      <Button variant='ghost' size='xs' iconOnly onClick={() => setOpen(!open)}>
        <RiMoreLine className='size-4' />
      </Button>
      {open && (
        <div className='absolute right-0 top-full z-20 mt-1 w-44 overflow-hidden rounded-xl border border-stroke-soft-200 bg-bg-white-0 shadow-complex'>
          {[
            { label: 'View Details', icon: RiEyeLine },
            { label: 'Edit', icon: RiEditLine },
            { label: partner.status === 'pending' ? 'Activate' : 'Suspend', icon: partner.status === 'pending' ? RiCheckLine : RiForbidLine },
            { label: 'Delete', icon: RiDeleteBinLine, danger: true },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button key={item.label} onClick={() => setOpen(false)} className={cn('flex w-full items-center gap-2.5 px-3 py-2 text-label-xs transition-colors cursor-pointer', item.danger ? 'text-error-base hover:bg-error-lighter' : 'text-text-sub-600 hover:bg-bg-weak-50 hover:text-text-strong-950')}>
                <Icon className='size-4' />{item.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function AdminPartnersPage() {
  const [showCreate, setShowCreate] = React.useState(false);

  return (
    <div className='space-y-6'>
      <PageHeader title='Partners' description='Manage platform partners and referral programs' actions={
        <Button size='md' onClick={() => setShowCreate(true)}><RiAddLine className='size-4' />Add Partner</Button>
      } />
      <div className='relative'>
        <RiSearchLine className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-soft-400' />
        <input placeholder='Search partners...' className='h-9 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 pl-9 pr-3 text-paragraph-sm placeholder:text-text-disabled-300 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16' />
      </div>
      <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs overflow-hidden'>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-stroke-soft-200 bg-bg-weak-50'>
              {['Partner', 'Brands', 'Brand Revenue', 'Commission', 'Rate', 'Status', ''].map((h) => (
                <th key={h} className='px-5 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600'>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {partners.map((p) => (
              <tr key={p.id} className='border-b border-stroke-soft-200 last:border-0 hover:bg-bg-weak-50 transition-colors'>
                <td className='px-5 py-3.5'><p className='text-label-sm text-text-strong-950'>{p.name}</p><p className='text-paragraph-xs text-text-sub-600'>{p.company}</p></td>
                <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{p.brands}</td>
                <td className='px-5 py-3.5 text-label-sm text-text-strong-950'>{p.revenue}</td>
                <td className='px-5 py-3.5 text-label-sm text-success-base'>{p.commission}</td>
                <td className='px-5 py-3.5'><Badge variant='light' color='primary' size='sm'>{p.rate}</Badge></td>
                <td className='px-5 py-3.5'><Badge variant='light' color={p.status === 'active' ? 'success' : 'warning'} size='sm' dot>{p.status === 'active' ? 'Active' : 'Pending'}</Badge></td>
                <td className='px-5 py-3.5'><RowMenu partner={p} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showCreate && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-overlay'>
          <div className='w-full max-w-lg rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-6 shadow-complex'>
            <div className='flex items-center justify-between mb-5'>
              <h3 className='text-label-lg text-text-strong-950'>Add New Partner</h3>
              <Button variant='ghost' size='xs' iconOnly onClick={() => setShowCreate(false)}><RiCloseLine className='size-5' /></Button>
            </div>
            <div className='space-y-4'>
              {[
                { label: 'Full Name', placeholder: 'e.g. John Smith' },
                { label: 'Company', placeholder: 'e.g. Wellness Partners Co.' },
                { label: 'Email', placeholder: 'john@company.com' },
              ].map((f) => (
                <div key={f.label} className='space-y-1.5'>
                  <label className='text-label-sm text-text-strong-950'>{f.label}</label>
                  <input placeholder={f.placeholder} className='h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm placeholder:text-text-disabled-300 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16' />
                </div>
              ))}
              <div className='space-y-1.5'>
                <label className='text-label-sm text-text-strong-950'>Commission Rate (% of wholesale)</label>
                <div className='flex items-center gap-2'>
                  <input defaultValue='10' type='number' className='h-10 w-24 rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16' />
                  <span className='text-label-sm text-text-sub-600'>%</span>
                </div>
              </div>
              <div className='flex justify-end gap-3 pt-2'>
                <Button variant='secondary' onClick={() => setShowCreate(false)}>Cancel</Button>
                <Button onClick={() => setShowCreate(false)}>Add Partner</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
