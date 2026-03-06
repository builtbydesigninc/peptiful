'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/utils/cn';
import { StatCard } from '@/components/ui/stat-card-new';
import { PageHeader } from '@/components/ui/page-header-new';
import { Badge } from '@/components/ui/badge-new';
import { Button } from '@/components/ui/button-new';
import { RiFileList3Line, RiMoneyDollarCircleLine, RiTimeLine, RiSearchLine, RiArrowRightSLine, RiArrowRightLine } from '@remixicon/react';
import { adminApi } from '@/lib/api-client';

export default function AdminOrdersPage() {
  const [filter, setFilter] = React.useState('all');
  const [orders, setOrders] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response: any = await adminApi.getOrders(filter);
      setOrders(Array.isArray(response) ? response : (response.data || []));
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchOrders();
  }, [filter]);

  return (
    <div className='space-y-6'>
      <PageHeader title='Orders' description='All platform orders across all brands' />
      <div className='flex items-center gap-3'>
        <div className='relative flex-1'>
          <RiSearchLine className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-soft-400' />
          <input placeholder='Search orders by ID, email or brand...' className='h-9 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 pl-9 pr-3 text-paragraph-sm placeholder:text-text-disabled-300 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16' />
        </div>
        {['all', 'confirmed', 'shipped', 'cancelled'].map((f) => (
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
                {['Order ID', 'Date', 'Brand', 'Customer', 'Total', 'Status', ''].map((h) => (
                  <th key={h} className='px-5 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600'>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className='border-b border-stroke-soft-200 last:border-0 hover:bg-bg-weak-50 transition-colors'>
                  <td className='px-5 py-3.5 text-label-sm text-text-strong-950'>#{o.orderNumber || o.id.slice(0, 8)}</td>
                  <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{new Date(o.createdAt).toLocaleDateString()}</td>
                  <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{o.brand?.name}</td>
                  <td className='px-5 py-3.5'>
                    <div className='text-paragraph-sm text-text-strong-950'>{o.customer?.user?.fullName}</div>
                    <div className='text-xs text-text-soft-400'>{o.customer?.user?.email}</div>
                  </td>
                  <td className='px-5 py-3.5 text-label-sm text-text-strong-950'>${o.totalAmount}</td>
                  <td className='px-5 py-3.5'>
                    <Badge variant='light' color={o.status === 'SHIPPED' || o.status === 'DELIVERED' ? 'success' : o.status === 'CANCELLED' ? 'error' : 'primary'} size='sm' dot>
                      {o.status.charAt(0).toUpperCase() + o.status.slice(1).toLowerCase()}
                    </Badge>
                  </td>
                  <td className='px-5 py-3.5'>
                    <Button variant='ghost' size='xs' asChild iconOnly>
                      <Link href={`/admin/orders/${o.id}`}><RiArrowRightLine className='size-4' /></Link>
                    </Button>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={7} className='px-5 py-12 text-center text-text-sub-600'>No orders found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
