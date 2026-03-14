'use client';

import * as React from 'react';
import { PageHeader } from '@/components/ui/page-header-new';
import { Badge } from '@/components/ui/badge-new';
import { StatCard } from '@/components/ui/stat-card-new';
import { RiFileList3Line, RiLoader4Line } from '@remixicon/react';
import { useAffiliate } from '../context';
import { affiliateApi } from '@/lib/api-client';
import { AlertBanner } from '@/components/ui/alert-banner';

export default function AffiliateOrdersPage() {
  const { getSelectedBrand, isLoading: ctxLoading } = useAffiliate();
  const selectedBrand = getSelectedBrand();

  const [orders, setOrders] = React.useState<any[]>([]);
  const [stats, setStats] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!selectedBrand?.id) return;

    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const [ordersData, statsData] = await Promise.all([
          affiliateApi.getOrders(selectedBrand.id, { limit: 50 }),
          affiliateApi.getOrderStats(selectedBrand.id)
        ]);
        setOrders(ordersData.data || ordersData.orders || []);
        setStats(statsData);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
        setError('Failed to load orders. Please refresh the page.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [selectedBrand?.id]);

  if (ctxLoading) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <RiLoader4Line className='size-8 animate-spin text-text-soft-400' />
      </div>
    );
  }

  if (!selectedBrand) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <p className='text-paragraph-sm text-text-sub-600'>Please select a brand to view your orders.</p>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <PageHeader title='Orders' description='All orders attributed to you and your L2 team' />

      {error && (
        <AlertBanner
          variant='error'
          title='Error'
          description={error || undefined}
          action={{
            label: 'Retry',
            onClick: () => {
              if (!selectedBrand?.id) return;
              setLoading(true);
              setError(null);
              Promise.all([
                affiliateApi.getOrders(selectedBrand.id, { limit: 50 }),
                affiliateApi.getOrderStats(selectedBrand.id)
              ]).then(([ordersData, statsData]) => {
                setOrders(ordersData.data || ordersData.orders || []);
                setStats(statsData);
                setLoading(false);
              }).catch(err => {
                console.error('Failed to fetch orders:', err);
                setError('Failed to load orders. Please refresh the page.');
                setLoading(false);
              });
            }
          }}
        />
      )}

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
        <StatCard
          title='Total Orders'
          value={loading ? '—' : (stats?.totalOrders ?? stats?.ordersReferred ?? 0)}
          icon={RiFileList3Line}
        />
        <StatCard
          title='Direct Sales'
          value={loading ? '—' : (stats?.directOrders ?? stats?.l1Orders ?? 0)}
        />
        <StatCard
          title='L2 Override Orders'
          value={loading ? '—' : (stats?.overrideOrders ?? stats?.l2Orders ?? 0)}
        />
      </div>

      <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs overflow-hidden'>
        {loading ? (
          <div className='flex h-64 items-center justify-center'>
            <RiLoader4Line className='size-8 animate-spin text-text-soft-400' />
          </div>
        ) : !error && orders.length === 0 ? (
          <div className='p-12 text-center'>
            <p className='text-paragraph-sm text-text-sub-600'>No orders found for this brand yet.</p>
          </div>
        ) : !error ? (
          <div className='overflow-x-auto'>
            <table className='w-full text-nowrap'>
              <thead>
                <tr className='border-b border-stroke-soft-200 bg-bg-weak-50'>
                  {['Order', 'Brand', 'Customer', 'Total', 'Your Commission', 'Type', 'Date', 'Status'].map((h) => (
                    <th key={h} className='px-5 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600'>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => {
                  const isL2 = !!o.parentAffiliateId || o.scenario === 'S3_L2_SALE' || o.type === 'L2 Override';
                  return (
                    <tr key={o.id} className='border-b border-stroke-soft-200 last:border-0 hover:bg-bg-weak-50 transition-colors'>
                      <td className='px-5 py-3.5 text-label-sm text-primary-base font-medium'>{o.orderNumber || `#${o.id.slice(0, 8)}`}</td>
                      <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{o.brandName || o.brand?.name || selectedBrand.name}</td>
                      <td className='px-5 py-3.5 text-paragraph-sm text-text-strong-950 font-medium'>{o.customerName || o.customer?.name || '—'}</td>
                      <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>${(o.total || 0).toLocaleString()}</td>
                      <td className='px-5 py-3.5 text-label-sm text-success-base font-medium'>${(o.commission || 0).toLocaleString()}</td>
                      <td className='px-5 py-3.5'>
                        <Badge variant='light' color={!isL2 ? 'primary' : 'feature'} size='sm'>
                          {!isL2 ? 'Direct' : 'L2 Override'}
                        </Badge>
                      </td>
                      <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{new Date(o.createdAt).toLocaleDateString()}</td>
                      <td className='px-5 py-3.5'>
                        <Badge
                          variant='light'
                          color={o.status === 'DELIVERED' ? 'success' : o.status === 'SHIPPED' ? 'warning' : 'information'}
                          size='sm'
                          dot
                        >
                          {o.status?.charAt(0).toUpperCase() + (o.status?.slice(1)?.toLowerCase() ?? '') || 'Processing'}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </div>
  );
}
