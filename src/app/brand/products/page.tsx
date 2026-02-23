'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/utils/cn';
import { RiSearchLine, RiMoreLine, RiArrowUpLine, RiEyeLine, RiEditLine, RiDeleteBinLine, RiCheckLine, RiForbidLine } from '@remixicon/react';
import { StatCard } from '@/components/ui/stat-card-new';
import { PageHeader } from '@/components/ui/page-header-new';
import { Badge } from '@/components/ui/badge-new';
import { Button } from '@/components/ui/button-new';

const PRODUCTS = [
  { id: '1', name: 'BPC-157 Peptide Complex', wholesale: 22.0, retail: 89.99, margin: 309, status: 'Published' as const, color: 'bg-primary-alpha-16' },
  { id: '2', name: 'Semaglutide (GLP-1)', wholesale: 38.0, retail: 189.99, margin: 400, status: 'Published' as const, color: 'bg-orange-100' },
  { id: '3', name: 'TB-500 Recovery', wholesale: 25.0, retail: 99.99, margin: 300, status: 'Published' as const, color: 'bg-teal-100' },
  { id: '4', name: 'NAD+ Precursor Complex', wholesale: 15.0, retail: 79.99, margin: 433, status: 'Published' as const, color: 'bg-violet-100' },
  { id: '5', name: 'Selank Nootropic', wholesale: 14.0, retail: 69.99, margin: 400, status: 'Published' as const, color: 'bg-blue-100' },
  { id: '6', name: 'Epithalon Anti-Aging', wholesale: 18.0, retail: 84.99, margin: 372, status: 'Published' as const, color: 'bg-green-100' },
  { id: '7', name: 'Thymalin Immune', wholesale: 11.0, retail: 59.99, margin: 445, status: 'Draft' as const, color: 'bg-sky-100' },
  { id: '8', name: 'Vitamin D3+K2 Complex', wholesale: 5.0, retail: 28.99, margin: 480, status: 'Draft' as const, color: 'bg-yellow-100' },
];

const TABS = ['All', 'Published', 'Draft'] as const;

function RowMenu({ product }: { product: typeof PRODUCTS[0] }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const router = useRouter();
  React.useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

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
          <button onClick={() => setOpen(false)} className='flex w-full items-center gap-2.5 px-3 py-2 text-label-xs text-text-sub-600 hover:bg-bg-weak-50 hover:text-text-strong-950 transition-colors cursor-pointer'>
            {product.status === 'Published' ? <><RiForbidLine className='size-4' />Unpublish</> : <><RiCheckLine className='size-4' />Publish</>}
          </button>
          <button onClick={() => setOpen(false)} className='flex w-full items-center gap-2.5 px-3 py-2 text-label-xs text-error-base hover:bg-error-lighter transition-colors cursor-pointer'>
            <RiDeleteBinLine className='size-4' />Remove
          </button>
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  const [activeTab, setActiveTab] = React.useState<(typeof TABS)[number]>('All');
  const [searchQuery, setSearchQuery] = React.useState('');
  const router = useRouter();

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'All' || p.status === activeTab;
    return matchesSearch && matchesTab;
  });

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
        <StatCard title='Total Products' value={PRODUCTS.length} />
        <StatCard title='Published' value={PRODUCTS.filter((p) => p.status === 'Published').length} change='Active' trend='up' icon={RiArrowUpLine} />
        <StatCard title='Draft' value={PRODUCTS.filter((p) => p.status === 'Draft').length} />
      </div>

      <div className='flex flex-wrap items-center gap-3'>
        <div className='relative flex-1 min-w-[200px] max-w-sm'>
          <RiSearchLine className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-soft-400' />
          <input type='text' placeholder='Search products...' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className='h-9 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 pl-9 pr-3 text-paragraph-sm text-text-strong-950 placeholder:text-text-soft-400 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16' />
        </div>
        <div className='flex items-center rounded-10 border border-stroke-soft-200 bg-bg-white-0 p-0.5'>
          {TABS.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={cn('rounded-lg px-3 py-1.5 text-label-xs transition-colors cursor-pointer', activeTab === tab ? 'bg-primary-alpha-10 text-primary-base' : 'text-text-sub-600 hover:text-text-strong-950')}>
              {tab} ({tab === 'All' ? PRODUCTS.length : PRODUCTS.filter((p) => p.status === tab).length})
            </button>
          ))}
        </div>
      </div>

      <div className='overflow-hidden rounded-xl border border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs'>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-stroke-soft-200 bg-bg-weak-50'>
              <th className='w-12 px-4 py-3'><input type='checkbox' className='size-4 rounded border-stroke-soft-200' /></th>
              {['Product', 'Wholesale', 'Retail Price', 'Margin', 'Status', ''].map((h) => (
                <th key={h} className='px-4 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600'>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} onClick={() => router.push(`/brand/products/${product.id}`)} className='border-b border-stroke-soft-200 last:border-0 hover:bg-bg-weak-50 transition-colors cursor-pointer'>
                <td className='px-4 py-3' onClick={(e) => e.stopPropagation()}>
                  <input type='checkbox' className='size-4 rounded border-stroke-soft-200' />
                </td>
                <td className='px-4 py-3'>
                  <div className='flex items-center gap-3'>
                    <div className={cn('size-10 shrink-0 rounded-10', product.color)} />
                    <span className='text-label-sm text-text-strong-950'>{product.name}</span>
                  </div>
                </td>
                <td className='px-4 py-3 text-paragraph-sm text-text-sub-600'>${product.wholesale.toFixed(2)}</td>
                <td className='px-4 py-3' onClick={(e) => e.stopPropagation()}>
                  <input type='text' defaultValue={`$${product.retail.toFixed(2)}`} className='w-20 border-b border-dashed border-stroke-soft-200 bg-transparent text-label-sm text-text-strong-950 focus:outline-none focus:border-primary-base' />
                </td>
                <td className='px-4 py-3 text-paragraph-sm text-success-base'>{product.margin}%</td>
                <td className='px-4 py-3'>
                  <Badge variant='light' color={product.status === 'Published' ? 'success' : 'gray'} size='sm'>{product.status}</Badge>
                </td>
                <td className='px-4 py-3' onClick={(e) => e.stopPropagation()}>
                  <RowMenu product={product} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='border-t border-stroke-soft-200 px-4 py-3'>
          <p className='text-paragraph-sm text-text-sub-600'>Showing {filteredProducts.length} of {PRODUCTS.length} products</p>
        </div>
      </div>
    </div>
  );
}
