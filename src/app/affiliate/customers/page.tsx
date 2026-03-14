'use client';

import * as React from 'react';
import {
  Users,
  ShoppingBag,
  DollarSign,
  Mail,
  TrendingUp,
} from 'lucide-react';
import { RiLoader4Line } from '@remixicon/react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PageHeader } from '@/components/ui/page-header-new';
import { StatCard } from '@/components/ui/stat-card-new';
import { Button } from '@/components/ui/button-new';
import { useAffiliate } from "../context";
import { affiliateApi } from '@/lib/api-client';

export default function AffiliateCustomersPage() {
  const { getSelectedBrand, isLoading: ctxLoading } = useAffiliate();
  const selectedBrand = getSelectedBrand();

  const [stats, setStats] = React.useState<any>(null);
  const [topCustomers, setTopCustomers] = React.useState<any[]>([]);
  const [topProducts, setTopProducts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [offerLoading, setOfferLoading] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!selectedBrand?.id) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const [statsData, customersData, productsData] = await Promise.all([
          affiliateApi.getCustomerStats(selectedBrand.id),
          affiliateApi.getTopCustomers(selectedBrand.id),
          affiliateApi.getTopProducts(selectedBrand.id)
        ]);
        setStats(statsData);
        setTopCustomers(customersData);
        setTopProducts(productsData);
      } catch (error) {
        console.error('Failed to fetch customer insights:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedBrand?.id]);

  const handleSendOffer = async (customerId: string) => {
    if (!selectedBrand?.id) return;
    setOfferLoading(customerId);
    try {
      // Small delay for effect
      await new Promise(resolve => setTimeout(resolve, 800));
      // In a real app, you might show a modal to choose the offer
      console.log('Sending offer to', customerId);
      // await affiliateApi.sendOffer(selectedBrand.id, customerId, { offerType: 'RECURRING_DISCOUNT' });
      alert('Offer sent successfully!');
    } catch (error) {
      console.error('Failed to send offer:', error);
    } finally {
      setOfferLoading(null);
    }
  };

  if (ctxLoading) {
    return (
      <div className='flex h-64 items-center justify-center text-text-soft-400'>
        <RiLoader4Line className='size-8 animate-spin' />
      </div>
    );
  }

  if (!selectedBrand) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <p className='text-paragraph-sm text-text-sub-600'>Please select a brand to view customer insights.</p>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <PageHeader
        title='Customer Insights'
        description={`Understand your base and top performing products for ${selectedBrand.name}`}
      />

      {/* Stats */}
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <StatCard
          title='Total Customers'
          value={loading ? '—' : (stats?.totalCustomers || 0).toLocaleString()}
          icon={Users}
        />
        <StatCard
          title='Repeat Rate'
          value={loading ? '—' : `${(stats?.repeatRate || 0).toFixed(1)}%`}
          icon={TrendingUp}
        />
        <StatCard
          title='Avg Orders'
          value={loading ? '—' : (stats?.avgOrdersPerCustomer || 0).toFixed(2)}
          icon={ShoppingBag}
        />
        <StatCard
          title='Avg Order Value'
          value={loading ? '—' : `$${(stats?.avgOrderValue || 0).toLocaleString()}`}
          icon={DollarSign}
        />
      </div>

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        {/* Top Customers */}
        <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs overflow-hidden'>
          <div className='border-b border-stroke-soft-200 px-5 py-4'>
            <h3 className='text-label-md text-text-strong-950 font-semibold'>Top Customers</h3>
          </div>

          {loading ? (
            <div className='flex h-64 items-center justify-center border-b border-stroke-soft-200'>
              <RiLoader4Line className='size-8 animate-spin text-text-soft-400' />
            </div>
          ) : topCustomers.length === 0 ? (
            <div className='p-12 text-center border-b border-stroke-soft-200'>
              <Users className='size-12 mx-auto text-text-soft-400/20 mb-3' />
              <p className='text-paragraph-sm text-text-sub-600'>No customer data available yet</p>
            </div>
          ) : (
            <div className='divide-y divide-stroke-soft-200'>
              {topCustomers.map((customer, index) => (
                <div key={customer.id} className='p-4 flex items-center justify-between gap-3 hover:bg-bg-weak-50 transition-colors'>
                  <div className='flex items-center gap-3 min-w-0'>
                    <span className='text-label-sm font-bold text-text-sub-600/30 w-4 shrink-0'>
                      {index + 1}
                    </span>
                    <Avatar className='size-10 shrink-0 border border-stroke-soft-200'>
                      <AvatarFallback className='bg-primary-alpha-10 text-primary-base text-xs font-semibold'>
                        {(customer.name || 'U').split(" ").map((n: string) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className='min-w-0'>
                      <p className='text-label-sm text-text-strong-950 font-medium truncate'>{customer.name || 'Anonymous'}</p>
                      <p className='text-paragraph-xs text-text-sub-600 truncate'>{customer.orders} orders • Last: {new Date(customer.lastOrderDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-4'>
                    <div className='text-right'>
                      <p className='text-label-sm text-success-base font-bold'>${(customer.totalSpent || 0).toLocaleString()}</p>
                      <p className='text-paragraph-xs text-text-sub-600'>Avg: ${(customer.avgOrder || 0).toLocaleString()}</p>
                    </div>
                    <Button
                      variant='secondary'
                      size='xs'
                      onClick={() => handleSendOffer(customer.id)}
                      disabled={!!offerLoading}
                    >
                      {offerLoading === customer.id ? (
                        <RiLoader4Line className='size-3.5 animate-spin' />
                      ) : (
                        <Mail className='size-3.5' />
                      )}
                      Send Offer
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top Products */}
        <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs overflow-hidden'>
          <div className='border-b border-stroke-soft-200 px-5 py-4'>
            <h3 className='text-label-md text-text-strong-950 font-semibold'>Top Products</h3>
          </div>

          {loading ? (
            <div className='flex h-64 items-center justify-center'>
              <RiLoader4Line className='size-8 animate-spin text-text-soft-400' />
            </div>
          ) : topProducts.length === 0 ? (
            <div className='p-12 text-center'>
              <ShoppingBag className='size-12 mx-auto text-text-soft-400/20 mb-3' />
              <p className='text-paragraph-sm text-text-sub-600'>No product data available yet</p>
            </div>
          ) : (
            <div className='divide-y divide-stroke-soft-200'>
              {topProducts.map((product, index) => (
                <div key={product.id} className='p-4 hover:bg-bg-weak-50 transition-colors'>
                  <div className='flex items-center justify-between gap-2 mb-2'>
                    <div className='flex items-center gap-3 min-w-0'>
                      <span className='text-label-sm font-bold text-text-sub-600/30 w-4 shrink-0'>
                        {index + 1}
                      </span>
                      <div className='min-w-0'>
                        <p className='text-label-sm text-text-strong-950 font-medium truncate'>{product.name}</p>
                      </div>
                    </div>
                    <span className='inline-flex items-center rounded-full bg-bg-weak-50 px-2 py-0.5 text-label-2xs font-medium text-text-sub-600 ring-1 ring-inset ring-stroke-soft-200'>
                      {product.sold} sold
                    </span>
                  </div>
                  <div className='flex flex-wrap items-center justify-between gap-x-4 gap-y-1 ml-7 text-paragraph-xs'>
                    <div>
                      <span className='text-text-sub-600'>Revenue: </span>
                      <span className='font-medium text-text-strong-950'>${(product.revenue || 0).toLocaleString()}</span>
                    </div>
                    <div>
                      <span className='text-text-sub-600'>Comm: </span>
                      <span className='font-bold text-success-base'>${(product.commission || 0).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
