'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { cn } from '@/utils/cn';
import { RiSearchLine, RiMoreLine, RiArrowUpLine, RiEditLine, RiDeleteBinLine, RiCheckLine, RiForbidLine } from '@remixicon/react';
import { StatCard } from '@/components/ui/stat-card-new';
import { PageHeader } from '@/components/ui/page-header-new';
import { Badge } from '@/components/ui/badge-new';
import { Button } from '@/components/ui/button-new';
import { brandApi } from '@/lib/api-client';

function RowMenu({ product, onRefresh }: { product: any, onRefresh: () => void }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const router = useRouter();

  React.useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const handleAction = async (e: React.MouseEvent) => {
    e.stopPropagation();
    // Implementation for delete/publish/unpublish would go here
    setOpen(false);
  };

  return (
    <div ref={ref} className='relative'>
      <Button variant='ghost' size='xs' iconOnly onClick={(e) => { e.stopPropagation(); setOpen(!open); }}>
        <RiMoreLine className='size-4' />
      </Button>
      {open && (
        <div className='absolute right-0 top-full z-20 mt-1 w-44 overflow-hidden rounded-xl border border-stroke-soft-200 bg-bg-white-0 shadow-complex'>
          <button onClick={() => { setOpen(false); router.push(`/brand/products/${product.id}`); }} className='flex w-full items-center gap-2.5 px-3 py-2 text-label-xs text-text-sub-600 hover:bg-bg-weak-50 hover:text-text-strong-950 transition-colors cursor-pointer'>
            <RiEditLine className='size-4' />Customize
          </button>
          <button onClick={handleAction} className='flex w-full items-center gap-2.5 px-3 py-2 text-label-xs text-text-sub-600 hover:bg-bg-weak-50 hover:text-text-strong-950 transition-colors cursor-pointer'>
            {product.status === 'PUBLISHED' ? <><RiForbidLine className='size-4' />Unpublish</> : <><RiCheckLine className='size-4' />Publish</>}
          </button>
          <button onClick={handleAction} className='flex w-full items-center gap-2.5 px-3 py-2 text-label-xs text-error-base hover:bg-error-lighter transition-colors cursor-pointer'>
            <RiDeleteBinLine className='size-4' />Remove
          </button>
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  const [activeTab, setActiveTab] = React.useState('All');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [products, setProducts] = React.useState<any[]>([]);
  const [stats, setStats] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [total, setTotal] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const limit = 10;
  const router = useRouter();

  const fetchData = async () => {
    setLoading(true);
    try {
      const [prodRes, statsRes] = await Promise.all([
        brandApi.getProducts({
          status: activeTab === 'All' ? undefined : activeTab,
          search: searchQuery,
          page,
          limit
        }),
        brandApi.getStats()
      ]);
      setProducts(prodRes.data || []);
      setTotal(prodRes.total || 0);
      setStats(statsRes);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [activeTab, searchQuery, page]);

  const tabs = [
    { key: 'All', label: 'All' },
    { key: 'PUBLISHED', label: 'Published' },
    { key: 'DRAFT', label: 'Draft' },
    { key: 'ARCHIVED', label: 'Archived' },
  ];

  return (
    <div className='space-y-6'>
      <PageHeader
        title='My Products'
        description="Manage your store's product catalog and pricing"
        actions={
          <Button variant='secondary' size='md' asChild>
            <Link href='/brand/catalog'>Browse Catalog</Link>
          </Button>
        }
      />

      <div className='grid gap-4 md:grid-cols-3'>
        <StatCard title='Total Products' value={stats?.activeProducts || 0} />
        <StatCard title='Revenue This Month' value={`$${(stats?.revenueThisMonth || 0).toLocaleString()}`} icon={RiArrowUpLine} />
        <StatCard title='Total Orders' value={stats?.totalOrders || 0} />
      </div>

      <div className='flex flex-wrap items-center gap-3'>
        <div className='relative flex-1 min-w-[200px] max-w-sm'>
          <RiSearchLine className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-soft-400' />
          <input
            type='text'
            placeholder='Search products...'
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
            className='h-9 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 pl-9 pr-3 text-paragraph-sm text-text-strong-950 placeholder:text-text-soft-400 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16'
          />
        </div>
        <div className='flex items-center rounded-10 border border-stroke-soft-200 bg-bg-white-0 p-0.5'>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => { setActiveTab(tab.key); setPage(1); }}
              className={cn('rounded-lg px-3 py-1.5 text-label-xs transition-colors cursor-pointer', activeTab === tab.key ? 'bg-primary-alpha-10 text-primary-base' : 'text-text-sub-600 hover:text-text-strong-950')}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className='overflow-hidden rounded-xl border border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs'>
        {loading ? (
          <div className='flex items-center justify-center p-24'>
            <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-primary-base' />
          </div>
        ) : (
          <>
            <table className='w-full'>
              <thead>
                <tr className='border-b border-stroke-soft-200 bg-bg-weak-50'>
                  <th className='w-12 px-5 py-3'><input type='checkbox' className='size-4 rounded border-stroke-soft-200' /></th>
                  {['Product', 'Wholesale', 'Retail Price', 'Margin', 'Status', ''].map((h) => (
                    <th key={h} className='px-5 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600'>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  const wholesale = Number(product.catalogProduct?.wholesalePrice || 0);
                  const retail = Number(product.retailPrice || 0);
                  const margin = wholesale > 0 ? Math.round(((retail - wholesale) / retail) * 100) : 0;

                  return (
                    <tr key={product.id} onClick={() => router.push(`/brand/products/${product.id}`)} className='border-b border-stroke-soft-200 last:border-0 hover:bg-bg-weak-50 transition-colors cursor-pointer'>
                      <td className='px-5 py-3.5' onClick={(e) => e.stopPropagation()}>
                        <input type='checkbox' className='size-4 rounded border-stroke-soft-200' />
                      </td>
                      <td className='px-5 py-3.5'>
                        <div className='flex items-center gap-3'>
                          <div className='relative size-10 shrink-0 overflow-hidden rounded-10 bg-bg-soft-200'>
                            <Image src={product.catalogProduct?.image || '/peptiful-vial.png'} alt={product.catalogProduct?.name || ''} fill className='object-cover' sizes='40px' />
                          </div>
                          <span className='text-label-sm text-text-strong-950'>{product.catalogProduct?.name}</span>
                        </div>
                      </td>
                      <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>${wholesale.toFixed(2)}</td>
                      <td className='px-5 py-3.5' onClick={(e) => e.stopPropagation()}>
                        <span className='text-label-sm text-text-strong-950'>${retail.toFixed(2)}</span>
                      </td>
                      <td className='px-5 py-3.5 text-paragraph-sm text-success-base'>{margin}%</td>
                      <td className='px-5 py-3.5'>
                        <Badge variant='light' color={product.status === 'PUBLISHED' ? 'success' : 'gray'} size='sm'>{product.status}</Badge>
                      </td>
                      <td className='px-5 py-3.5' onClick={(e) => e.stopPropagation()}>
                        <RowMenu product={product} onRefresh={fetchData} />
                      </td>
                    </tr>
                  );
                })}
                {products.length === 0 && (
                  <tr>
                    <td colSpan={7} className='px-5 py-12 text-center text-text-sub-600'>No products found</td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className='flex items-center justify-between border-t border-stroke-soft-200 px-5 py-4'>
              <p className='text-paragraph-sm text-text-sub-600'>Showing {products.length} of {total} products</p>
              {total > limit && (
                <div className='flex items-center gap-2'>
                  <Button variant='ghost' size='xs' disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</Button>
                  <Button variant='ghost' size='xs' disabled={page * limit >= total} onClick={() => setPage(page + 1)}>Next</Button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
