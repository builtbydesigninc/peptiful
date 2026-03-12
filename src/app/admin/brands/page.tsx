'use client';

import * as React from 'react';
import { cn } from '@/utils/cn';
import { PageHeader } from '@/components/ui/page-header-new';
import { Badge } from '@/components/ui/badge-new';
import { Button } from '@/components/ui/button-new';
import { RiSearchLine, RiMoreLine, RiAddLine, RiCloseLine, RiEyeLine, RiEditLine, RiDeleteBinLine, RiForbidLine, RiCheckLine } from '@remixicon/react';
import { adminApi } from '@/lib/api-client';

function RowMenu({ brand, onAction }: { brand: any; onAction: (action: string) => void }) {
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
            { label: brand.status === 'SUSPENDED' ? 'Activate' : 'Suspend', icon: brand.status === 'SUSPENDED' ? RiCheckLine : RiForbidLine, action: 'toggle' },
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
  const [brands, setBrands] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [partners, setPartners] = React.useState<any[]>([]);

  const fetchBrands = async () => {
    setLoading(true);
    try {
      const response: any = await adminApi.getBrands(filter);
      setBrands(Array.isArray(response) ? response : (response.data || []));
    } catch (error) {
      console.error('Failed to fetch brands:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchBrands();
  }, [filter]);

  React.useEffect(() => {
    adminApi.getPartnersList().then(setPartners).catch(console.error);
  }, []);

  const handleCreateBrand = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      slug: formData.get('slug'),
      partnerId: formData.get('partnerId') || null,
      l1CommissionRate: parseFloat(formData.get('l1CommissionRate') as string),
      status: formData.get('status'),
    };

    try {
      await adminApi.createBrand(data);
      setShowCreate(false);
      fetchBrands();
    } catch (error) {
      console.error('Failed to create brand:', error);
      alert('Failed to create brand. Check console for details.');
    }
  };

  const [editingBrand, setEditingBrand] = React.useState<any>(null);
  const [viewingBrand, setViewingBrand] = React.useState<any>(null);

  const handleAction = async (brandId: string, action: string) => {
    const brand = brands.find(b => b.id === brandId);
    if (!brand) return;

    if (action === 'delete') {
      if (confirm(`Are you sure you want to delete ${brand.name}?`)) {
        try {
          await adminApi.deleteBrand(brandId);
          fetchBrands();
        } catch (error) {
          console.error('Failed to delete brand:', error);
          alert('Failed to delete brand.');
        }
      }
    } else if (action === 'toggle') {
      const newStatus = brand.status === 'SUSPENDED' ? 'ACTIVE' : 'SUSPENDED';
      try {
        await adminApi.updateBrand(brandId, { status: newStatus });
        fetchBrands();
      } catch (error) {
        console.error('Failed to update brand status:', error);
        alert('Failed to update brand status.');
      }
    } else if (action === 'edit') {
      setEditingBrand(brand);
    } else if (action === 'view') {
      setViewingBrand(brand);
    }
  };

  const handleSubmitBrand = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: any = {
      name: formData.get('name'),
      email: formData.get('email'),
      slug: formData.get('slug'),
      partnerId: formData.get('partnerId') || null,
      l1CommissionRate: parseFloat(formData.get('l1CommissionRate') as string),
      status: formData.get('status'),
    };

    try {
      if (editingBrand) {
        await adminApi.updateBrand(editingBrand.id, data);
        setEditingBrand(null);
      } else {
        await adminApi.createBrand(data);
        setShowCreate(false);
      }
      fetchBrands();
    } catch (error) {
      console.error('Failed to save brand:', error);
      alert('Failed to save brand. Check console for details.');
    }
  };

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
        {loading ? (
          <div className='flex items-center justify-center p-12'>
            <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-primary-base' />
          </div>
        ) : (
          <table className='w-full'>
            <thead>
              <tr className='border-b border-stroke-soft-200 bg-bg-weak-50'>
                {['Brand', 'Partner', 'Products', 'Orders', 'Revenue', 'Status', ''].map((h) => (
                  <th key={h} className='px-5 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600'>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {brands.map((b) => (
                <tr key={b.id} className='border-b border-stroke-soft-200 last:border-0 hover:bg-bg-weak-50 transition-colors'>
                  <td className='px-5 py-3.5'>
                    <div className='font-medium text-text-strong-950'>{b.name}</div>
                    <div className='text-xs text-text-sub-600'>{b.slug}.peptiful.com</div>
                  </td>
                  <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{b.partner?.user?.fullName || 'None'}</td>
                  <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{b._count?.brandProducts || 0}</td>
                  <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{b._count?.orders || 0}</td>
                  <td className='px-5 py-3.5 text-label-sm text-text-strong-950'>${b.totalRevenue || '0.00'}</td>
                  <td className='px-5 py-3.5'>
                    <Badge variant='light' color={b.status === 'ACTIVE' ? 'success' : b.status === 'PENDING' ? 'warning' : 'error'} size='sm' dot>
                      {b.status.charAt(0).toUpperCase() + b.status.slice(1).toLowerCase()}
                    </Badge>
                  </td>
                  <td className='px-5 py-3.5'>
                    <RowMenu brand={b} onAction={(action) => handleAction(b.id, action)} />
                  </td>
                </tr>
              ))}
              {brands.length === 0 && (
                <tr>
                  <td colSpan={7} className='px-5 py-12 text-center text-text-sub-600'>No brands found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Create/Edit Brand Modal */}
      {(showCreate || editingBrand) && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-overlay'>
          <form onSubmit={handleSubmitBrand} className='w-full max-w-lg rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-6 shadow-complex'>
            <div className='flex items-center justify-between mb-5'>
              <h3 className='text-label-lg text-text-strong-950'>{editingBrand ? 'Edit Brand' : 'Create New Brand'}</h3>
              <Button type='button' variant='ghost' size='xs' iconOnly onClick={() => { setShowCreate(false); setEditingBrand(null); }}>
                <RiCloseLine className='size-5' />
              </Button>
            </div>
            <div className='space-y-4'>
              <div className='space-y-1.5'>
                <label className='text-label-sm text-text-strong-950'>Brand Name</label>
                <input name='name' required defaultValue={editingBrand?.name} placeholder='e.g. PeptideKing' className='h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm placeholder:text-text-disabled-300 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16' />
              </div>
              <div className='space-y-1.5'>
                <label className='text-label-sm text-text-strong-950'>Contact Email</label>
                <input name='email' type='email' required defaultValue={editingBrand?.email} placeholder='founder@brand.com' className='h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm placeholder:text-text-disabled-300 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16' />
              </div>
              <div className='space-y-1.5'>
                <label className='text-label-sm text-text-strong-950'>Subdomain (Slug)</label>
                <input name='slug' required defaultValue={editingBrand?.slug} placeholder='peptideking' className='h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm placeholder:text-text-disabled-300 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16' />
              </div>

              <div className='space-y-1.5'>
                <label className='text-label-sm text-text-strong-950'>Partner (Optional)</label>
                <select name='partnerId' defaultValue={editingBrand?.partnerId || ''} className='h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16 cursor-pointer'>
                  <option value=''>None (Direct)</option>
                  {partners.map(p => (
                    <option key={p.id} value={p.id}>{p.company || p.user?.fullName || 'Untitled Partner'}</option>
                  ))}
                </select>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-1.5'>
                  <label className='text-label-sm text-text-strong-950'>L1 Commission Rate (%)</label>
                  <input name='l1CommissionRate' type='number' step='0.1' defaultValue={editingBrand?.l1CommissionRate || '15'} className='h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16' />
                </div>
                <div className='space-y-1.5'>
                  <label className='text-label-sm text-text-strong-950'>Status</label>
                  <select name='status' defaultValue={editingBrand?.status || 'ACTIVE'} className='h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16 cursor-pointer'>
                    <option value='ACTIVE'>Active</option>
                    <option value='PENDING'>Pending</option>
                    <option value='SUSPENDED'>Suspended</option>
                  </select>
                </div>
              </div>

              <div className='flex justify-end gap-3 pt-2'>
                <Button type='button' variant='secondary' onClick={() => { setShowCreate(false); setEditingBrand(null); }}>Cancel</Button>
                <Button type='submit'>{editingBrand ? 'Save Changes' : 'Create Brand'}</Button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* View Brand Modal */}
      {viewingBrand && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-overlay p-4'>
          <div className='w-full max-w-2xl rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-6 shadow-complex'>
            <div className='flex items-center justify-between mb-6'>
              <div>
                <h3 className='text-label-lg text-text-strong-950'>{viewingBrand.name}</h3>
                <p className='text-paragraph-xs text-text-sub-600'>{viewingBrand.slug}.peptiful.com</p>
              </div>
              <Button variant='ghost' size='xs' iconOnly onClick={() => setViewingBrand(null)}>
                <RiCloseLine className='size-5' />
              </Button>
            </div>

            <div className='grid grid-cols-2 gap-6'>
              <div className='space-y-4'>
                <div>
                  <label className='text-label-2xs uppercase tracking-wider text-text-soft-400'>Store Details</label>
                  <div className='mt-2 space-y-2'>
                    <div className='flex justify-between text-paragraph-sm'>
                      <span className='text-text-sub-600'>Status</span>
                      <Badge variant='light' color={viewingBrand.status === 'ACTIVE' ? 'success' : viewingBrand.status === 'PENDING' ? 'warning' : 'error'} size='sm'>
                        {viewingBrand.status}
                      </Badge>
                    </div>
                    <div className='flex justify-between text-paragraph-sm'>
                      <span className='text-text-sub-600'>Partner</span>
                      <span className='text-text-strong-950'>{viewingBrand.partner?.user?.fullName || 'Direct'}</span>
                    </div>
                    <div className='flex justify-between text-paragraph-sm'>
                      <span className='text-text-sub-600'>L1 Commission</span>
                      <span className='text-text-strong-950'>{viewingBrand.l1CommissionRate}%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className='text-label-2xs uppercase tracking-wider text-text-soft-400'>Performance</label>
                  <div className='mt-2 space-y-2'>
                    <div className='flex justify-between text-paragraph-sm'>
                      <span className='text-text-sub-600'>Total Revenue</span>
                      <span className='text-text-strong-950 font-medium'>${viewingBrand.totalRevenue || '0.00'}</span>
                    </div>
                    <div className='flex justify-between text-paragraph-sm'>
                      <span className='text-text-sub-600'>Total Orders</span>
                      <span className='text-text-strong-950'>{viewingBrand._count?.orders || 0}</span>
                    </div>
                    <div className='flex justify-between text-paragraph-sm'>
                      <span className='text-text-sub-600'>Products</span>
                      <span className='text-text-strong-950'>{viewingBrand._count?.brandProducts || 0}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className='space-y-4'>
                <div>
                  <label className='text-label-2xs uppercase tracking-wider text-text-soft-400'>Contact Information</label>
                  <p className='mt-2 text-paragraph-sm text-text-strong-950'>{viewingBrand.email}</p>
                </div>
                {/* Placeholder for more details like created date etc */}
                <div>
                  <label className='text-label-2xs uppercase tracking-wider text-text-soft-400'>Created At</label>
                  <p className='mt-1 text-paragraph-sm text-text-sub-600'>
                    {new Date(viewingBrand.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div className='mt-8 pt-5 border-t border-stroke-soft-200 flex justify-end gap-3'>
              <Button variant='secondary' onClick={() => setViewingBrand(null)}>Close</Button>
              <Button onClick={() => { setViewingBrand(null); setEditingBrand(viewingBrand); }}>
                <RiEditLine className='size-4' />
                Edit Brand
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
