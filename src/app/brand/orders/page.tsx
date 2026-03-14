'use client';

import * as React from 'react';
import {
  RiFileList3Line,
  RiMoneyDollarCircleLine,
  RiTimeLine,
  RiCheckboxCircleLine,
  RiSearchLine,
  RiCalendarLine,
  RiArrowRightLine,
} from '@remixicon/react';
import { cn } from '@/utils/cn';
import { StatCard } from '@/components/ui/stat-card-new';
import { PageHeader } from '@/components/ui/page-header-new';
import { Badge } from '@/components/ui/badge-new';
import { Button } from '@/components/ui/button-new';
import { brandApi } from '@/lib/api-client';
import Link from 'next/link';

export default function OrdersPage() {
  const [activeStatus, setActiveStatus] = React.useState<string>('all');
  const [search, setSearch] = React.useState('');
  const [orders, setOrders] = React.useState<any[]>([]);
  const [stats, setStats] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [total, setTotal] = React.useState(0);
  const limit = 10;

  const fetchData = async () => {
    setLoading(true);
    try {
      const [orderRes, statsRes] = await Promise.all([
        brandApi.getOrders({ status: activeStatus, search, page, limit }),
        brandApi.getStats(), // for the stat cards
      ]);
      setOrders(orderRes.data || []);
      setTotal(orderRes.total || 0);
      setStats(statsRes);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [activeStatus, search, page]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DELIVERED': return 'success';
      case 'SHIPPED': return 'warning';
      case 'CANCELLED': return 'error';
      case 'PROCESSING': return 'information';
      default: return 'gray';
    }
  };

  const statusTabs = [
    { key: 'all', label: 'All' },
    { key: 'confirmed', label: 'Confirmed' },
    { key: 'processing', label: 'Processing' },
    { key: 'shipped', label: 'Shipped' },
    { key: 'delivered', label: 'Delivered' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Orders"
        description="Track and manage your store's orders"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Orders"
          value={stats?.totalOrders || 0}
          icon={RiFileList3Line}
        />
        <StatCard
          title="Revenue This Month"
          value={`$${(stats?.revenueThisMonth || 0).toLocaleString()}`}
          icon={RiMoneyDollarCircleLine}
        />
        <StatCard
          title="Active Products"
          value={stats?.activeProducts || 0}
          icon={RiTimeLine}
        />
        <StatCard
          title="Active Affiliates"
          value={stats?.activeAffiliates || 0}
          icon={RiCheckboxCircleLine}
        />
      </div>

      <div className="flex flex-col gap-4 rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-4 shadow-regular-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2 overflow-x-auto">
          {statusTabs.map((tab) => (
            <Button
              key={tab.key}
              variant="ghost"
              size="sm"
              className={cn(
                activeStatus === tab.key &&
                'bg-primary-alpha-10 text-primary-base hover:bg-primary-alpha-16',
              )}
              onClick={() => { setActiveStatus(tab.key); setPage(1); }}
            >
              {tab.label}
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-56 sm:w-64">
            <RiSearchLine className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-soft-400" />
            <input
              type="search"
              placeholder="Search orders..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="h-9 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 pl-9 pr-3 text-label-sm text-text-strong-950 placeholder:text-text-soft-400 focus:border-primary-base focus:outline-none focus:ring-2 focus:ring-primary-alpha-10"
            />
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs">
        {loading ? (
          <div className='flex items-center justify-center p-24'>
            <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-primary-base' />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-stroke-soft-200 bg-bg-weak-50">
                  {['Order #', 'Date', 'Customer', 'Items', 'Total', 'Status', 'Tracking', ''].map(h => (
                    <th key={h} className="px-5 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-stroke-soft-200 transition-colors last:border-b-0 hover:bg-bg-weak-50"
                  >
                    <td className="px-5 py-3.5 text-paragraph-sm font-medium text-text-strong-950">
                      #{order.orderNumber}
                    </td>
                    <td className="px-5 py-3.5 text-paragraph-sm text-text-sub-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3.5 text-paragraph-sm text-text-strong-950">
                      {order.customer?.name}
                    </td>
                    <td className="px-5 py-3.5 text-paragraph-sm text-text-sub-600">
                      {order.itemsCount} {order.itemsCount === 1 ? 'item' : 'items'}
                    </td>
                    <td className="px-5 py-3.5 text-paragraph-sm font-medium text-text-strong-950">
                      ${Number(order.total).toFixed(2)}
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge
                        variant="light"
                        color={getStatusColor(order.status) as any}
                        size="sm"
                        dot
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1).toLowerCase().replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5 text-paragraph-sm text-text-sub-600">
                      {order.trackingNumber ? (
                        <a
                          href={order.trackingUrl || '#'}
                          target='_blank'
                          className="text-primary-base hover:underline font-mono text-xs"
                        >
                          {order.trackingNumber}
                        </a>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className="px-5 py-3.5">
                      <Button variant='ghost' size='xs' asChild iconOnly>
                        <Link href={`/brand/orders/${order.id}`}><RiArrowRightLine className='size-4' /></Link>
                      </Button>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-5 py-12 text-center text-text-sub-600">
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {total > limit && (
        <div className="flex flex-col items-center justify-between gap-4 border-t border-stroke-soft-200 pt-6 sm:flex-row">
          <p className="text-paragraph-sm text-text-sub-600">
            Showing {(page - 1) * limit + 1}-{Math.min(page * limit, total)} of {total} orders
          </p>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>
              Previous
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="min-w-[2rem]"
            >
              {page}
            </Button>
            <Button variant="ghost" size="sm" disabled={page * limit >= total} onClick={() => setPage(page + 1)}>
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
