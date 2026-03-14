'use client';

import Link from 'next/link';
import { StatCard } from '@/components/ui/stat-card-new';
import { Badge } from '@/components/ui/badge-new';
import { Button } from '@/components/ui/button-new';
import Image from 'next/image';
import {
  RiMoneyDollarCircleLine, RiFileList3Line, RiTeamLine, RiLineChartLine,
  RiArrowRightLine, RiFileCopyLine, RiCheckLine, RiLoader4Line,
} from '@remixicon/react';
import * as React from 'react';
import { useAffiliate } from './context';
import { affiliateApi } from '@/lib/api-client';

export default function AffiliateDashboardPage() {
  const { getSelectedBrand, isLoading: ctxLoading, user } = useAffiliate();
  const [copied, setCopied] = React.useState(false);
  const [stats, setStats] = React.useState<any>(null);
  const [referralLink, setReferralLink] = React.useState('');
  const [trendingProducts, setTrendingProducts] = React.useState<any[]>([]);
  const [recentOrders, setRecentOrders] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  const selectedBrand = getSelectedBrand();

  React.useEffect(() => {
    if (!selectedBrand?.id) return;
    setLoading(true);

    Promise.all([
      affiliateApi.getDashboardStats(selectedBrand.id),
      affiliateApi.getReferralLink(selectedBrand.id),
      affiliateApi.getTrendingProducts(selectedBrand.id),
      affiliateApi.getOrders(selectedBrand.id, { limit: 5 }),
    ])
      .then(([statsData, linkData, products, ordersData]) => {
        setStats(statsData);
        setReferralLink(linkData?.url || linkData?.referralLink || '');
        setTrendingProducts(Array.isArray(products) ? products : []);
        setRecentOrders(ordersData?.data || ordersData?.orders || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [selectedBrand?.id]);

  const copy = () => {
    if (referralLink) navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (ctxLoading) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <RiLoader4Line className='size-6 animate-spin text-text-soft-400' />
      </div>
    );
  }

  const displayName = user?.name?.split(' ')[0] ?? 'there';

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-title-h4 text-text-strong-950'>Welcome back, {displayName}</h1>
        <p className='mt-1 text-paragraph-sm text-text-sub-600'>
          {selectedBrand ? `${selectedBrand.name} · ` : ''}Your affiliate performance overview
        </p>
      </div>

      {/* Quick referral link */}
      <div className='flex items-center gap-3 rounded-xl border border-primary-alpha-16 bg-primary-alpha-10/30 px-5 py-4'>
        <div className='flex-1 min-w-0'>
          <p className='text-label-xs text-text-sub-600'>Your Referral Link</p>
          <p className='truncate text-paragraph-sm text-text-sub-600'>
            {referralLink || (loading ? 'Loading…' : 'No referral link available')}
          </p>
        </div>
        <Button variant='secondary' size='xs' onClick={copy} disabled={!referralLink}>
          {copied ? <RiCheckLine className='size-3.5' /> : <RiFileCopyLine className='size-3.5' />}
          {copied ? 'Copied' : 'Copy'}
        </Button>
      </div>

      {/* Featured Products Banner */}
      {trendingProducts.length > 0 && (
        <div className='overflow-hidden rounded-xl border border-stroke-soft-200 bg-gradient-to-r from-bg-white-0 to-primary-alpha-10/30 shadow-regular-xs'>
          <div className='flex items-center justify-between px-6 py-5'>
            <div>
              <p className='text-label-xs text-text-sub-600 uppercase tracking-wider'>Trending Now</p>
              <h3 className='mt-1 text-label-md text-text-strong-950'>
                {trendingProducts.map((p: any) => p.name || p.handle).join(' · ')}
              </h3>
              <p className='mt-1 text-paragraph-xs text-text-sub-600'>
                Share these top sellers with your audience for higher conversions
              </p>
            </div>
            <div className='hidden items-center gap-2 sm:flex'>
              {trendingProducts.slice(0, 3).map((p: any, i: number) => (
                <div key={p.id || i} className='relative size-16 overflow-hidden rounded-xl bg-bg-white-0 shadow-regular-xs border border-stroke-soft-100'>
                  <Image
                    src={p.image || '/peptiful-vial.png'}
                    alt={p.name || 'Product'}
                    fill
                    className='object-contain p-1.5'
                    sizes='64px'
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <StatCard
          title='Total Earnings'
          value={stats ? `$${(stats.totalEarnings ?? stats.totalCommission ?? stats.ownEarnings ?? 0).toLocaleString()}` : '—'}
          change={stats?.earningsChange ?? ''}
          trend={stats?.earningsTrend ?? 'up'}
          icon={RiMoneyDollarCircleLine}
        />
        <StatCard
          title='Orders Referred'
          value={stats ? String(stats.totalOrders ?? stats.ordersReferred ?? stats.ownOrders ?? 0) : '—'}
          change={stats?.ordersChange ?? ''}
          trend={stats?.ordersTrend ?? 'up'}
          icon={RiFileList3Line}
        />

        {user?.role !== 'L2_AFFILIATE' ? (
          <>
            <StatCard
              title='My L2 Team'
              value={stats ? String(stats.teamSize ?? stats.l2Count ?? 0) : '—'}
              icon={RiTeamLine}
            />
            <StatCard
              title='Override Earnings'
              value={stats ? `$${(stats.overrideEarnings ?? stats.l2Earnings ?? 0).toLocaleString()}` : '—'}
              change={stats?.overrideChange ?? 'From L2 sales'}
              trend='up'
              icon={RiLineChartLine}
            />
          </>
        ) : (
          <StatCard
            title='Total Customers'
            value={stats ? String(stats.totalCustomers ?? 0) : '—'}
            icon={RiTeamLine}
          />
        )}
      </div>

      {/* Recent Orders */}
      <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs'>
        <div className='flex items-center justify-between border-b border-stroke-soft-200 px-5 py-4'>
          <h2 className='text-label-md text-text-strong-950'>Recent Orders</h2>
          <Button variant='ghost' size='sm' asChild>
            <Link href='/affiliate/orders'>View All <RiArrowRightLine className='size-4' /></Link>
          </Button>
        </div>

        {loading ? (
          <div className='flex h-40 items-center justify-center'>
            <RiLoader4Line className='size-5 animate-spin text-text-soft-400' />
          </div>
        ) : recentOrders.length === 0 ? (
          <div className='flex h-40 items-center justify-center'>
            <p className='text-paragraph-sm text-text-sub-600'>No orders yet for this brand.</p>
          </div>
        ) : (
          <table className='w-full'>
            <thead>
              <tr className='border-b border-stroke-soft-200'>
                {['Order', 'Brand', 'Customer', 'Total', 'Commission', 'Status'].map((h) => (
                  <th key={h} className='px-5 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600'>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o: any) => (
                <tr key={o.id} className='border-b border-stroke-soft-200 last:border-0 hover:bg-bg-weak-50 transition-colors'>
                  <td className='px-5 py-3.5 text-label-sm text-primary-base'>{o.orderNumber || o.id}</td>
                  <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{o.brandName || o.brand?.name || '—'}</td>
                  <td className='px-5 py-3.5 text-paragraph-sm text-text-strong-950'>{o.customerName || o.customer?.name || '—'}</td>
                  <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>${(o.total ?? 0).toLocaleString()}</td>
                  <td className='px-5 py-3.5 text-label-sm text-success-base'>${(o.commission ?? 0).toLocaleString()}</td>
                  <td className='px-5 py-3.5'>
                    <Badge
                      variant='light'
                      color={o.status === 'DELIVERED' ? 'success' : o.status === 'SHIPPED' ? 'warning' : 'information'}
                      size='sm'
                      dot
                    >
                      {o.status?.charAt(0) + o.status?.slice(1).toLowerCase()}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
