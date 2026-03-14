'use client';

import * as React from 'react';
import { cn } from '@/utils/cn';
import { StatCard } from '@/components/ui/stat-card-new';
import { PageHeader } from '@/components/ui/page-header-new';
import { Badge } from '@/components/ui/badge-new';
import { Button } from '@/components/ui/button-new';
import { RiBuilding2Line, RiSearchLine, RiExternalLinkLine, RiMoreLine } from '@remixicon/react';

import { partnerApi } from '@/lib/api-client';

export default function PartnerBrandsPage() {
  const [filter, setFilter] = React.useState('all');
  const [search, setSearch] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [brands, setBrands] = React.useState<any[]>([]);
  const [stats, setStats] = React.useState<any>(null);

  const fetchData = React.useCallback(async () => {
    try {
      const [brandsRes, statsRes] = await Promise.all([
        partnerApi.getBrands({ search: search || undefined }),
        partnerApi.getBrandsStats(),
      ]);
      setBrands(brandsRes.data || []);
      setStats(statsRes);
    } catch (error) {
      console.error('Failed to fetch brands:', error);
    } finally {
      setLoading(false);
    }
  }, [search]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filtered = brands.filter((b) => filter === 'all' || b.status.toLowerCase() === filter);

  return (
    <div className='space-y-6'>
      <PageHeader title='My Brands' description='Brands you&apos;ve referred to the Peptiful platform' />

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="size-8 animate-spin rounded-full border-4 border-primary-base border-t-transparent" />
        </div>
      ) : (
        <>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
            <StatCard title='Total Brands' value={stats?.total || 0} icon={RiBuilding2Line} />
            <StatCard title='Active' value={stats?.active || 0} trend='up' />
            <StatCard title='Total Commission' value={`$${(stats?.totalCommission || 0).toLocaleString()}`} trend='up' />
          </div>

          <div className='flex items-center gap-3'>
            <div className='relative flex-1'>
              <RiSearchLine className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-soft-400' />
              <input
                placeholder='Search brands...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='h-9 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 pl-9 pr-3 text-paragraph-sm placeholder:text-text-disabled-300 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16'
              />
            </div>
            {['all', 'active', 'pending', 'suspended'].map((f) => (
              <Button
                key={f}
                variant='ghost'
                size='xs'
                className={cn(filter === f && 'bg-primary-alpha-10 text-primary-base')}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </Button>
            ))}
          </div>

          <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs overflow-hidden'>
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead>
                  <tr className='border-b border-stroke-soft-200 bg-bg-weak-50 text-left'>
                    {['Brand', 'Status', 'Joined'].map((h) => (
                      <th key={h} className='px-5 py-3 text-label-xs uppercase tracking-wider text-text-sub-600 font-medium'>{h}</th>
                    ))}
                    <th className='w-10 px-5 py-3' />
                  </tr>
                </thead>
                <tbody>
                  {filtered.length > 0 ? (
                    filtered.map((b) => (
                      <tr key={b.id} className='border-b border-stroke-soft-200 last:border-0 hover:bg-bg-weak-50 transition-colors'>
                        <td className='px-5 py-3.5'>
                          <p className='text-label-sm text-text-strong-950'>{b.name}</p>
                          <p className='text-paragraph-xs text-text-sub-600 font-mono'>{b.slug}.peptiful.com</p>
                        </td>
                        <td className='px-5 py-3.5'>
                          <Badge variant='light' color={b.status === 'ACTIVE' ? 'success' : b.status === 'PENDING' ? 'warning' : 'error'} size='sm' dot>
                            {b.status}
                          </Badge>
                        </td>
                        <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>
                          {new Date(b.createdAt).toLocaleDateString()}
                        </td>
                        <td className='px-5 py-3.5'>
                          <Button variant='ghost' size='xs' iconOnly><RiMoreLine className='size-4' /></Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-5 py-8 text-center text-paragraph-sm text-text-sub-600">
                        No brands found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
