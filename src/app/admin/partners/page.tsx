'use client';

import * as React from 'react';
import { cn } from '@/utils/cn';
import { PageHeader } from '@/components/ui/page-header-new';
import { Badge } from '@/components/ui/badge-new';
import { Button } from '@/components/ui/button-new';
import { RiSearchLine, RiAddLine, RiMoreLine, RiCloseLine, RiEyeLine, RiEditLine, RiForbidLine, RiCheckLine } from '@remixicon/react';
import { adminApi } from '@/lib/api-client';

function RowMenu({ partner, onAction }: { partner: any; onAction: (action: string) => void }) {
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
            { label: partner.status === 'SUSPENDED' ? 'Activate' : 'Suspend', icon: partner.status === 'SUSPENDED' ? RiCheckLine : RiForbidLine, action: 'toggle' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.action}
                onClick={() => { setOpen(false); onAction(item.action); }}
                className={cn(
                  'flex w-full items-center gap-2.5 px-3 py-2 text-label-xs transition-colors cursor-pointer text-text-sub-600 hover:bg-bg-weak-50 hover:text-text-strong-950',
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

export default function AdminPartnersPage() {
  const [filter, setFilter] = React.useState('all');
  const [partners, setPartners] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [showCreate, setShowCreate] = React.useState(false);

  const fetchPartners = async () => {
    setLoading(true);
    try {
      const response: any = await adminApi.getPartners(filter);
      setPartners(Array.isArray(response) ? response : (response.data || []));
    } catch (error) {
      console.error('Failed to fetch partners:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchPartners();
  }, [filter]);

  return (
    <div className='space-y-6'>
      <PageHeader title='Partners' description='All platform referral partners' actions={
        <Button size='md' onClick={() => setShowCreate(true)}><RiAddLine className='size-4' />Invite Partner</Button>
      } />
      <div className='flex items-center gap-3'>
        <div className='relative flex-1'>
          <RiSearchLine className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-soft-400' />
          <input placeholder='Search partners...' className='h-9 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 pl-9 pr-3 text-paragraph-sm placeholder:text-text-disabled-300 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16' />
        </div>
        {['all', 'active', 'pending', 'suspended'].map((f) => (
          <Button key={f} variant='ghost' size='xs' className={cn(filter === f && 'bg-primary-alpha-10 text-primary-base')} onClick={() => setFilter(f)}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </Button>
        ))}
      </div>
      <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs overflow-hidden'>
        {loading ? (
          <div className='flex items-center justify-center p-12'>
            <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-primary-base' />
          </div>
        ) : (
          <table className='w-full'>
            <thead>
              <tr className='border-b border-stroke-soft-200 bg-bg-weak-50'>
                {['Partner', 'Brands Referred', 'Platform Revenue', 'Commission Rate', 'Status', ''].map((h) => (
                  <th key={h} className='px-5 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600'>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {partners.map((p) => (
                <tr key={p.id} className='border-b border-stroke-soft-200 last:border-0 hover:bg-bg-weak-50 transition-colors'>
                  <td className='px-5 py-3.5'>
                    <div className='text-label-sm text-text-strong-950'>{p.user?.fullName || 'Untitled'}</div>
                    <div className='text-xs text-text-sub-600'>{p.user?.email}</div>
                  </td>
                  <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{p._count?.brands || 0}</td>
                  <td className='px-5 py-3.5 text-label-sm text-text-strong-950'>${p.totalRevenue || '0.00'}</td>
                  <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{p.commissionRate}%</td>
                  <td className='px-5 py-3.5'>
                    <Badge variant='light' color={p.status === 'ACTIVE' ? 'success' : p.status === 'PENDING' ? 'warning' : 'error'} size='sm' dot>
                      {p.status.charAt(0).toUpperCase() + p.status.slice(1).toLowerCase()}
                    </Badge>
                  </td>
                  <td className='px-5 py-3.5'>
                    <RowMenu partner={p} onAction={() => { }} />
                  </td>
                </tr>
              ))}
              {partners.length === 0 && (
                <tr>
                  <td colSpan={6} className='px-5 py-12 text-center text-text-sub-600'>No partners found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
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
