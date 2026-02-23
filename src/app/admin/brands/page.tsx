'use client';

import * as React from 'react';
import { cn } from '@/utils/cn';
import { PageHeader } from '@/components/ui/page-header-new';
import { Badge } from '@/components/ui/badge-new';
import { Button } from '@/components/ui/button-new';
import { RiSearchLine, RiMoreLine, RiAddLine, RiCloseLine, RiEyeLine, RiEditLine, RiDeleteBinLine, RiForbidLine, RiCheckLine } from '@remixicon/react';

const initialBrands = [
  { id: 'b1', name: 'BioStack Health', partner: 'Marcus Rivera', products: 15, orders: 210, revenue: '$18,900', affiliates: 28, status: 'active' },
  { id: 'b2', name: 'PeptideGains', partner: 'Marcus Rivera', products: 8, orders: 156, revenue: '$12,450', affiliates: 24, status: 'active' },
  { id: 'b3', name: 'Apex Longevity', partner: 'Linda Chen', products: 9, orders: 134, revenue: '$11,200', affiliates: 18, status: 'active' },
  { id: 'b4', name: 'TheraPep Co', partner: 'Jake Williams', products: 7, orders: 95, revenue: '$8,100', affiliates: 12, status: 'active' },
  { id: 'b5', name: 'VitalPure Labs', partner: 'Marcus Rivera', products: 12, orders: 89, revenue: '$7,820', affiliates: 15, status: 'active' },
  { id: 'b6', name: 'PureForm Peptides', partner: 'Linda Chen', products: 6, orders: 78, revenue: '$6,240', affiliates: 9, status: 'active' },
  { id: 'b7', name: 'OmniVita', partner: 'Priya Sharma', products: 10, orders: 67, revenue: '$5,360', affiliates: 11, status: 'active' },
  { id: 'b8', name: 'SynaptiCore', partner: 'None', products: 4, orders: 56, revenue: '$4,800', affiliates: 6, status: 'active' },
  { id: 'b9', name: 'AlphaRecovery', partner: 'Marcus Rivera', products: 0, orders: 0, revenue: '$0', affiliates: 0, status: 'pending' },
  { id: 'b10', name: 'PrimePep', partner: 'Tom Baker', products: 3, orders: 12, revenue: '$960', affiliates: 2, status: 'suspended' },
];

const partners = ['None', 'Marcus Rivera', 'Linda Chen', 'Jake Williams', 'Priya Sharma', 'Tom Baker', 'Sarah Kim'];

function RowMenu({ brand, onAction }: { brand: typeof initialBrands[0]; onAction: (action: string) => void }) {
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
            { label: 'View Details', icon: RiEyeLine, action: 'view' },
            { label: 'Edit', icon: RiEditLine, action: 'edit' },
            { label: brand.status === 'suspended' ? 'Activate' : 'Suspend', icon: brand.status === 'suspended' ? RiCheckLine : RiForbidLine, action: 'toggle' },
            { label: 'Delete', icon: RiDeleteBinLine, action: 'delete', danger: true },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.action}
                onClick={() => { setOpen(false); onAction(item.action); }}
                className={cn(
                  'flex w-full items-center gap-2.5 px-3 py-2 text-label-xs transition-colors cursor-pointer',
                  item.danger ? 'text-error-base hover:bg-error-lighter' : 'text-text-sub-600 hover:bg-bg-weak-50 hover:text-text-strong-950',
                )}
              >
                <Icon className='size-4' />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function AdminBrandsPage() {
  const [filter, setFilter] = React.useState('all');
  const [showCreate, setShowCreate] = React.useState(false);
  const [brands] = React.useState(initialBrands);
  const filtered = brands.filter((b) => filter === 'all' || b.status === filter);

  return (
    <div className='space-y-6'>
      <PageHeader title='Brands' description='All brands on the Peptiful platform' actions={
        <Button size='md' onClick={() => setShowCreate(true)}><RiAddLine className='size-4' />Create Brand</Button>
      } />
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
              {['Brand', 'Partner', 'Products', 'Orders', 'Revenue', 'Affiliates', 'Status', ''].map((h) => (
                <th key={h} className='px-5 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600'>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((b) => (
              <tr key={b.id} className='border-b border-stroke-soft-200 last:border-0 hover:bg-bg-weak-50 transition-colors'>
                <td className='px-5 py-3.5 text-label-sm text-text-strong-950'>{b.name}</td>
                <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{b.partner}</td>
                <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{b.products}</td>
                <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{b.orders}</td>
                <td className='px-5 py-3.5 text-label-sm text-text-strong-950'>{b.revenue}</td>
                <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{b.affiliates}</td>
                <td className='px-5 py-3.5'>
                  <Badge variant='light' color={b.status === 'active' ? 'success' : b.status === 'pending' ? 'warning' : 'error'} size='sm' dot>
                    {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                  </Badge>
                </td>
                <td className='px-5 py-3.5'>
                  <RowMenu brand={b} onAction={() => {}} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Brand Modal */}
      {showCreate && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-overlay'>
          <div className='w-full max-w-lg rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-6 shadow-complex'>
            <div className='flex items-center justify-between mb-5'>
              <h3 className='text-label-lg text-text-strong-950'>Create New Brand</h3>
              <Button variant='ghost' size='xs' iconOnly onClick={() => setShowCreate(false)}>
                <RiCloseLine className='size-5' />
              </Button>
            </div>
            <div className='space-y-4'>
              {[
                { label: 'Brand Name', placeholder: 'e.g. PeptideKing' },
                { label: 'Contact Email', placeholder: 'founder@brand.com' },
                { label: 'Subdomain', placeholder: 'peptideking' },
              ].map((f) => (
                <div key={f.label} className='space-y-1.5'>
                  <label className='text-label-sm text-text-strong-950'>{f.label}</label>
                  <input placeholder={f.placeholder} className='h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm placeholder:text-text-disabled-300 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16' />
                </div>
              ))}
              <div className='space-y-1.5'>
                <label className='text-label-sm text-text-strong-950'>Assign Partner</label>
                <select className='h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16 cursor-pointer'>
                  {partners.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-1.5'>
                  <label className='text-label-sm text-text-strong-950'>L1 Commission Rate</label>
                  <div className='flex items-center gap-2'>
                    <input defaultValue='15' type='number' className='h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16' />
                    <span className='text-label-sm text-text-sub-600'>%</span>
                  </div>
                </div>
                <div className='space-y-1.5'>
                  <label className='text-label-sm text-text-strong-950'>Status</label>
                  <select className='h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16 cursor-pointer'>
                    <option value='active'>Active</option>
                    <option value='pending'>Pending</option>
                  </select>
                </div>
              </div>
              <div className='flex justify-end gap-3 pt-2'>
                <Button variant='secondary' onClick={() => setShowCreate(false)}>Cancel</Button>
                <Button onClick={() => setShowCreate(false)}>Create Brand</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
