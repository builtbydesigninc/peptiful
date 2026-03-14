'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/utils/cn';
import { StatCard } from '@/components/ui/stat-card-new';
import { Badge } from '@/components/ui/badge-new';
import { Button } from '@/components/ui/button-new';
import Image from 'next/image';
import {
  RiMoneyDollarCircleLine, RiShoppingBag3Line, RiFileList3Line, RiTeamLine,
  RiExternalLinkLine, RiCheckLine, RiGridLine, RiSettings4Line, RiArrowRightLine,
  RiUserAddLine, RiPaintBrushLine, RiSecurePaymentLine, RiStore2Line, RiRocketLine,
  RiCloseLine,
} from '@remixicon/react';
import { brandApi } from '@/lib/api-client';
import { AlertBanner } from '@/components/ui/alert-banner';

const checklistStepIcons: Record<number, any> = {
  1: RiUserAddLine,
  2: RiShoppingBag3Line,
  3: RiMoneyDollarCircleLine,
  4: RiPaintBrushLine,
  5: RiSecurePaymentLine,
  6: RiRocketLine,
};

const defaultSteps = [
  { id: 1, title: 'Complete Profile', desc: 'Add business details', icon: RiUserAddLine, href: '/brand/settings' },
  { id: 2, title: 'Select Products', desc: 'Browse catalog', icon: RiShoppingBag3Line, href: '/brand/catalog' },
  { id: 3, title: 'Set Pricing', desc: 'Set retail prices', icon: RiMoneyDollarCircleLine, href: '/brand/products' },
  { id: 4, title: 'Customize Store', desc: 'Logo & branding', icon: RiPaintBrushLine, href: '/brand/settings' },
  { id: 5, title: 'Connect Payment', desc: 'Stripe setup', icon: RiSecurePaymentLine, href: '/brand/settings' },
  { id: 6, title: 'Publish Store', desc: 'Go live', icon: RiRocketLine, href: '/onboarding' },
];

const quickActions = [
  { title: 'Browse Catalog', desc: 'Add new products to your store', icon: RiGridLine, href: '/brand/catalog' },
  { title: 'Manage Affiliates', desc: 'Recruit and track affiliates', icon: RiTeamLine, href: '/brand/affiliates' },
  { title: 'Store Settings', desc: 'Customize your brand', icon: RiSettings4Line, href: '/brand/settings' },
];

export default function BrandHomePage() {
  const [profile, setProfile] = React.useState<any>(null);
  const [stats, setStats] = React.useState<any>(null);
  const [orders, setOrders] = React.useState<any[]>([]);
  const [topSeller, setTopSeller] = React.useState<any>(null);
  const [checklist, setChecklist] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [checklistOpen, setChecklistOpen] = React.useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [p, s, o, ts, cl] = await Promise.all([
        brandApi.getProfile(),
        brandApi.getStats(),
        brandApi.getOrders({ limit: 5 }),
        brandApi.getTopSeller(),
        brandApi.getChecklist(),
      ]);
      setProfile(p);
      setStats(s);
      setOrders(o.data || []);
      setTopSeller(ts.topSeller);
      const stepsCompleted = cl.stepsCompleted || {};
      const mappedChecklist = defaultSteps.map(step => ({
        step: step.id,
        completed: !!stepsCompleted[step.id.toString()]
      }));
      setChecklist(mappedChecklist);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      setError('Failed to load dashboard data. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const toggleStep = async (stepId: number, currentStatus: boolean) => {
    try {
      await brandApi.updateChecklist(stepId, !currentStatus);
      setChecklist(prev => prev.map(s => s.step === stepId ? { ...s, completed: !currentStatus } : s));
    } catch (error) {
      console.error('Failed to update checklist:', error);
    }
  };

  const completedCount = checklist.filter(s => s.completed).length;
  const totalSteps = checklist.length || defaultSteps.length;

  if (loading) {
    return (
      <div className='flex items-center justify-center p-24'>
        <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-primary-base' />
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DELIVERED': return 'success';
      case 'SHIPPED': return 'warning';
      case 'CANCELLED': return 'error';
      case 'PROCESSING': return 'information';
      default: return 'gray';
    }
  };

  return (
    <div className='space-y-6'>
      {/* Welcome Header */}
      <div className='flex items-start justify-between'>
        <div>
          <h1 className='text-title-h4 text-text-strong-950'>Welcome back, {profile?.name || 'Partner'}</h1>
          <p className='mt-1 text-paragraph-sm text-text-sub-600'>Here&apos;s how your store is performing</p>
        </div>
        {profile?.slug && (
          <Button variant='secondary' size='sm' asChild>
            <Link href={`https://${profile.slug}.peptiful.com`} target='_blank'>
              <RiStore2Line className='size-4' />
              Visit Store
              <RiExternalLinkLine className='size-3.5' />
            </Link>
          </Button>
        )}
      </div>

      {error && (
        <AlertBanner
          variant='error'
          title='Error'
          description={error || undefined}
          action={{
            label: 'Retry',
            onClick: () => fetchData()
          }}
        />
      )}

      {/* Stat Cards */}
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <StatCard title='Total Revenue' value={`$${(stats?.totalRevenue || 0).toLocaleString()}`} icon={RiMoneyDollarCircleLine} />
        <StatCard title='Active Products' value={stats?.activeProducts || 0} icon={RiShoppingBag3Line} />
        <StatCard title='Total Orders' value={stats?.totalOrders || 0} icon={RiFileList3Line} />
        <StatCard title='Active Affiliates' value={stats?.activeAffiliates || 0} icon={RiTeamLine} />
      </div>

      {/* Recent Orders */}
      <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs'>
        <div className='flex items-center justify-between border-b border-stroke-soft-200 px-5 py-4'>
          <h2 className='text-label-md text-text-strong-950'>Recent Orders</h2>
          <Button variant='ghost' size='sm' asChild>
            <Link href='/brand/orders'>View All <RiArrowRightLine className='size-4' /></Link>
          </Button>
        </div>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b border-stroke-soft-200'>
                {['Order', 'Date', 'Customer', 'Items', 'Total', 'Status'].map((h) => (
                  <th key={h} className='px-5 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600'>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className='border-b border-stroke-soft-200 last:border-0 hover:bg-bg-weak-50 transition-colors'>
                  <td className='px-5 py-3.5 text-label-sm text-primary-base'>#{order.orderNumber}</td>
                  <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className='px-5 py-3.5 text-paragraph-sm text-text-strong-950'>{order.customer?.name}</td>
                  <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{order.itemsCount}</td>
                  <td className='px-5 py-3.5 text-label-sm text-text-strong-950'>${Number(order.total).toFixed(2)}</td>
                  <td className='px-5 py-3.5'><Badge variant='light' color={getStatusColor(order.status) as any} size='sm' dot>{order.status}</Badge></td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} className='px-5 py-12 text-center text-text-sub-600'>No orders found yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Seller Highlight */}
      {topSeller ? (
        <div className='overflow-hidden rounded-xl border border-stroke-soft-200 bg-gradient-to-r from-primary-alpha-10/40 via-bg-white-0 to-bg-white-0 shadow-regular-xs'>
          <div className='flex items-center gap-6 p-6'>
            <div className='relative hidden h-32 w-24 shrink-0 sm:block'>
              <Image src='/peptiful-vial.png' alt='Top selling product' fill className='object-contain drop-shadow-lg' sizes='96px' />
            </div>
            <div className='flex-1'>
              <Badge variant='light' color='primary' size='sm'>Top Seller</Badge>
              <h3 className='mt-2 text-label-md text-text-strong-950'>{topSeller.name}</h3>
              <p className='mt-1 text-paragraph-sm text-text-sub-600'>
                Your best performer this month — {topSeller.orderCount} orders, ${Number(topSeller.revenue).toLocaleString()} revenue
              </p>
              <div className='mt-3 flex items-center gap-3'>
                <Button variant='secondary' size='sm' asChild>
                  <Link href={`/brand/products/${topSeller.id}`}>View Details</Link>
                </Button>
                <Button variant='ghost' size='sm' asChild>
                  <Link href='/brand/catalog'>Browse Catalog <RiArrowRightLine className='size-4' /></Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='rounded-xl border border-dashed border-stroke-soft-200 p-8 text-center'>
          <p className='text-paragraph-sm text-text-sub-600'>Add more products and start selling to see your first top performers!</p>
        </div>
      )}

      {/* Quick Actions */}
      <div>
        <h2 className='mb-3 text-label-md text-text-strong-950'>Quick Actions</h2>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.title} href={action.href} className='group flex items-start gap-4 rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-5 shadow-regular-xs transition-all hover:shadow-regular-sm hover:border-primary-alpha-16'>
                <div className='flex size-10 shrink-0 items-center justify-center rounded-10 bg-primary-alpha-10 text-primary-base transition-colors group-hover:bg-primary-base group-hover:text-white'>
                  <Icon className='size-5' />
                </div>
                <div>
                  <p className='text-label-sm text-text-strong-950'>{action.title}</p>
                  <p className='mt-0.5 text-paragraph-xs text-text-sub-600'>{action.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Floating Checklist Button */}
      <button
        onClick={() => setChecklistOpen(true)}
        className='fixed bottom-6 right-6 z-40 flex items-center gap-2.5 rounded-full border border-stroke-soft-200 bg-bg-white-0 px-4 py-3 shadow-complex transition-all hover:shadow-complex-5 cursor-pointer'
      >
        <div className='relative size-8'>
          <svg className='size-8 -rotate-90' viewBox='0 0 32 32'>
            <circle cx='16' cy='16' r='13' fill='none' stroke='#ebebeb' strokeWidth='3' />
            <circle cx='16' cy='16' r='13' fill='none' stroke='#0A4591' strokeWidth='3' strokeDasharray={`${(completedCount / totalSteps) * 81.68} 81.68`} strokeLinecap='round' />
          </svg>
          <span className='absolute inset-0 flex items-center justify-center text-label-2xs text-primary-base'>{completedCount}/{totalSteps}</span>
        </div>
        <span className='text-label-xs text-text-strong-950'>Launch Checklist</span>
      </button>

      {/* Checklist Slide-out Panel */}
      {checklistOpen && (
        <>
          <div className='fixed inset-0 z-40 bg-overlay' onClick={() => setChecklistOpen(false)} />
          <div className='fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col border-l border-stroke-soft-200 bg-bg-white-0 shadow-complex'>
            <div className='flex items-center justify-between border-b border-stroke-soft-200 px-5 py-4'>
              <div>
                <h3 className='text-label-md text-text-strong-950'>Steps to complete</h3>
                <div className='mt-1 flex items-center gap-2'>
                  <span className='text-paragraph-xs text-text-sub-600'>Your progress</span>
                  <span className='text-label-xs text-text-strong-950'>{completedCount} of {totalSteps} completed</span>
                </div>
                <div className='mt-2 h-1.5 w-full overflow-hidden rounded-full bg-bg-soft-200'>
                  <div className='h-full rounded-full bg-primary-base transition-all' style={{ width: `${(completedCount / totalSteps) * 100}%` }} />
                </div>
              </div>
              <Button variant='ghost' size='xs' iconOnly onClick={() => setChecklistOpen(false)}><RiCloseLine className='size-5' /></Button>
            </div>
            <div className='flex-1 overflow-y-auto px-3 py-3'>
              {checklist.map((step) => {
                const Icon = checklistStepIcons[step.step] || RiCheckLine;
                const stepDetails = defaultSteps.find(s => s.id === step.step);
                return (
                  <div key={step.step} className={cn('mb-2 flex items-center gap-3 rounded-xl border px-4 py-3.5 transition-all', step.completed ? 'border-success-light bg-success-lighter/40' : 'border-stroke-soft-200 bg-bg-white-0 hover:border-primary-alpha-16')}>
                    <button onClick={() => toggleStep(step.step, step.completed)} className={cn('flex size-8 shrink-0 items-center justify-center rounded-full transition-colors cursor-pointer', step.completed ? 'bg-success-base text-white' : 'border-2 border-stroke-soft-200 text-transparent hover:border-primary-base')}>
                      <RiCheckLine className='size-4' />
                    </button>
                    {stepDetails ? (
                      <Link href={stepDetails.href} className='flex-1 min-w-0' onClick={() => setChecklistOpen(false)}>
                        <p className={cn('text-label-sm', step.completed ? 'text-text-sub-600 line-through' : 'text-text-strong-950')}>{stepDetails.title}</p>
                        <p className='text-paragraph-xs text-text-sub-600'>{stepDetails.desc}</p>
                      </Link>
                    ) : (
                      <div className='flex-1'>Step {step.step}</div>
                    )}
                    {!step.completed && stepDetails && (
                      <Link href={stepDetails.href} onClick={() => setChecklistOpen(false)} className='text-text-soft-400 hover:text-primary-base'>
                        <RiArrowRightLine className='size-4' />
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
