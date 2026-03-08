'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { RiSearchLine, RiArrowDownSLine } from '@remixicon/react';
import { cn } from '@/utils/cn';
import { PageHeader } from '@/components/ui/page-header-new';
import { Badge } from '@/components/ui/badge-new';
import { Button } from '@/components/ui/button-new';
import { catalogApi } from '@/lib/api-client';

const CATEGORY_COLORS: Record<string, 'primary' | 'success' | 'information' | 'warning' | 'feature' | 'gray' | 'error'> = {
  'Weight Loss': 'warning',
  'Sexual Wellness': 'feature',
  'Recovery': 'success',
  'Cognitive': 'information',
  'Immune': 'primary',
  'Longevity': 'success',
  'Bio Regulators': 'feature',
  'Vitamins': 'warning',
  'Research Grade': 'error',
};

export default function CatalogPage() {
  const [activeCategoryId, setActiveCategoryId] = React.useState<string>('All');
  const [search, setSearch] = React.useState('');
  const [debouncedSearch, setDebouncedSearch] = React.useState('');
  const [categories, setCategories] = React.useState<any[]>([]);
  const [products, setProducts] = React.useState<any[]>([]);
  const [total, setTotal] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(true);
  const limit = 12;

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const categoryId = activeCategoryId === 'All' ? undefined : activeCategoryId;
      const [pRes, cRes] = await Promise.all([
        catalogApi.getProducts({ categoryId, search: debouncedSearch, page, limit }),
        catalogApi.getCategories(),
      ]);
      setProducts(pRes.data || []);
      setTotal(pRes.total || 0);
      setCategories([{ id: 'All', name: 'All' }, ...cRes]);
    } catch (error) {
      console.error('Failed to fetch catalog data:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [activeCategoryId, debouncedSearch, page]);

  return (
    <div className='space-y-6'>
      <PageHeader
        title='Product Catalog'
        description='Browse our curated catalog of peptides, supplements, and wellness products'
        actions={
          <div className='relative w-72 sm:w-80'>
            <RiSearchLine className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-soft-400' />
            <input
              type='search'
              placeholder='Search products...'
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className='h-9 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 pl-9 pr-3 text-label-sm text-text-strong-950 placeholder:text-text-soft-400 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16'
            />
          </div>
        }
      />

      <div className='sticky top-0 z-10 -mx-6 -mt-2 bg-bg-weak-50/95 px-6 py-4 backdrop-blur-sm lg:-mx-8 lg:px-8'>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div className='flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar'>
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant='ghost'
                size='xs'
                className={cn(
                  activeCategoryId === cat.id &&
                  'bg-primary-alpha-10 text-primary-base hover:bg-primary-alpha-16',
                )}
                onClick={() => { setActiveCategoryId(cat.id); setPage(1); }}
              >
                {cat.name}
              </Button>
            ))}
          </div>
          <div className='flex items-center gap-4'>
            <button className='flex items-center gap-1.5 text-label-xs text-text-sub-600 hover:text-text-strong-950 cursor-pointer'>
              Sort by: Recommended
              <RiArrowDownSLine className='size-4' />
            </button>
            <span className='text-paragraph-xs text-text-soft-400'>
              {total} products
            </span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className='flex items-center justify-center p-24'>
          <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-primary-base' />
        </div>
      ) : (
        <>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/brand/catalog/${product.id}`}
                className='group flex flex-col overflow-hidden rounded-xl border border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs transition-shadow hover:shadow-regular-sm'
              >
                <div className='relative h-[180px] shrink-0 overflow-hidden bg-bg-weak-50'>
                  <Image
                    src={product.images?.[0] || '/peptiful-vial.png'}
                    alt={product.name}
                    fill
                    className='object-cover transition-transform duration-300 group-hover:scale-105'
                    sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
                  />
                  {product.status === 'NEW' && (
                    <Badge
                      variant='filled'
                      color='primary'
                      size='sm'
                      className='absolute left-3 top-3'
                    >
                      NEW
                    </Badge>
                  )}
                </div>
                <div className='flex flex-1 flex-col gap-2.5 p-4'>
                  <Badge
                    variant='light'
                    color={CATEGORY_COLORS[product.category?.name] ?? 'gray'}
                    size='sm'
                    className='w-fit'
                  >
                    {product.category?.name}
                  </Badge>
                  <h3 className='text-label-sm text-text-strong-950 line-clamp-2'>
                    {product.name}
                  </h3>
                  <p className='text-paragraph-xs text-text-soft-400 line-clamp-1'>
                    {product.description}
                  </p>
                  <div className='mt-auto space-y-1 pt-2'>
                    <div className='flex items-center justify-between'>
                      <span className='text-paragraph-xs text-text-sub-600'>Wholesale</span>
                      <span className='text-paragraph-xs text-text-sub-600'>${Number(product.wholesalePrice).toFixed(2)}</span>
                    </div>
                    <div className='flex items-center justify-between'>
                      <span className='text-label-xs text-text-sub-600'>Suggested Retail</span>
                      <span className='text-label-sm text-text-strong-950'>${Number(product.suggestedRetail).toFixed(2)}</span>
                    </div>
                  </div>
                  <div className='mt-2 flex h-8 w-full items-center justify-center rounded-10 border border-stroke-soft-200 text-label-xs text-text-sub-600 transition-colors group-hover:border-primary-alpha-16 group-hover:text-primary-base'>
                    View Details
                  </div>
                </div>
              </Link>
            ))}
            {products.length === 0 && (
              <div className='col-span-full py-12 text-center text-text-sub-600'>No products found matching your search.</div>
            )}
          </div>

          {total > limit && (
            <div className='flex flex-col items-center justify-between gap-4 border-t border-stroke-soft-200 pt-6 sm:flex-row'>
              <p className='text-paragraph-sm text-text-sub-600'>
                Showing {(page - 1) * limit + 1}-{Math.min(page * limit, total)} of {total} products
              </p>
              <div className='flex items-center gap-1'>
                <Button variant='ghost' size='sm' disabled={page === 1} onClick={() => setPage(page - 1)}>
                  Previous
                </Button>
                {Array.from({ length: Math.ceil(total / limit) }).map((_, i) => (
                  <Button
                    key={i}
                    variant={page === i + 1 ? 'primary' : 'ghost'}
                    size='sm'
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}
                <Button variant='ghost' size='sm' disabled={page * limit >= total} onClick={() => setPage(page + 1)}>
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
