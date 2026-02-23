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
  RiCloseLine, RiListCheck3,
} from '@remixicon/react';

const defaultSteps = [
  { id: 1, title: 'Complete Profile', desc: 'Add business details', icon: RiUserAddLine, href: '/brand/settings' },
  { id: 2, title: 'Select Products', desc: 'Browse catalog', icon: RiShoppingBag3Line, href: '/brand/catalog' },
  { id: 3, title: 'Set Pricing', desc: 'Set retail prices', icon: RiMoneyDollarCircleLine, href: '/brand/products' },
  { id: 4, title: 'Customize Store', desc: 'Logo & branding', icon: RiPaintBrushLine, href: '/brand/settings' },
  { id: 5, title: 'Connect Payment', desc: 'Stripe setup', icon: RiSecurePaymentLine, href: '/brand/settings' },
  { id: 6, title: 'Publish Store', desc: 'Go live', icon: RiRocketLine, href: '/onboarding' },
];

const recentOrders = [
  { id: '#PG-1156', date: 'Feb 22, 2026', customer: 'Alex Thompson', items: 2, total: '$169.98', status: 'Delivered', statusColor: 'success' as const },
  { id: '#PG-1155', date: 'Feb 22, 2026', customer: 'Maria Garcia', items: 1, total: '$89.99', status: 'Shipped', statusColor: 'warning' as const },
  { id: '#PG-1154', date: 'Feb 21, 2026', customer: 'James Wilson', items: 3, total: '$154.97', status: 'Processing', statusColor: 'information' as const },
  { id: '#PG-1153', date: 'Feb 21, 2026', customer: 'Emily Davis', items: 1, total: '$42.00', status: 'New', statusColor: 'gray' as const },
  { id: '#PG-1152', date: 'Feb 20, 2026', customer: 'Robert Brown', items: 2, total: '$124.99', status: 'Delivered', statusColor: 'success' as const },
];

const quickActions = [
  { title: 'Browse Catalog', desc: 'Add new products to your store', icon: RiGridLine, href: '/brand/catalog' },
  { title: 'Manage Affiliates', desc: 'Recruit and track affiliates', icon: RiTeamLine, href: '/brand/affiliates' },
  { title: 'Store Settings', desc: 'Customize your brand', icon: RiSettings4Line, href: '/brand/settings' },
];

export default function BrandHomePage() {
  const [completedIds, setCompletedIds] = React.useState<Set<number>>(new Set([1, 2, 3]));
  const [checklistOpen, setChecklistOpen] = React.useState(false);
  const completedCount = completedIds.size;

  const toggleStep = (id: number) => {
    setCompletedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className='space-y-6'>
      {/* Welcome Header */}
      <div className='flex items-start justify-between'>
        <div>
          <h1 className='text-title-h4 text-text-strong-950'>Welcome back, Sarah</h1>
          <p className='mt-1 text-paragraph-sm text-text-sub-600'>Here&apos;s how your store is performing</p>
        </div>
        <Button variant='secondary' size='sm' asChild>
          <Link href='https://peptidegains.peptiful.com' target='_blank'>
            <RiStore2Line className='size-4' />
            Visit Store
            <RiExternalLinkLine className='size-3.5' />
          </Link>
        </Button>
      </div>

      {/* Stat Cards */}
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <StatCard title='Revenue This Month' value='$12,450' change='+18.2% vs last month' trend='up' icon={RiMoneyDollarCircleLine} />
        <StatCard title='Active Products' value='8' icon={RiShoppingBag3Line} />
        <StatCard title='Total Orders' value='156' change='+12% this week' trend='up' icon={RiFileList3Line} />
        <StatCard title='Active Affiliates' value='24' icon={RiTeamLine} />
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
              {recentOrders.map((order) => (
                <tr key={order.id} className='border-b border-stroke-soft-200 last:border-0 hover:bg-bg-weak-50 transition-colors'>
                  <td className='px-5 py-3.5 text-label-sm text-primary-base'>{order.id}</td>
                  <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{order.date}</td>
                  <td className='px-5 py-3.5 text-paragraph-sm text-text-strong-950'>{order.customer}</td>
                  <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{order.items}</td>
                  <td className='px-5 py-3.5 text-label-sm text-text-strong-950'>{order.total}</td>
                  <td className='px-5 py-3.5'><Badge variant='light' color={order.statusColor} size='sm' dot>{order.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Seller Highlight */}
      <div className='overflow-hidden rounded-xl border border-stroke-soft-200 bg-gradient-to-r from-primary-alpha-10/40 via-bg-white-0 to-bg-white-0 shadow-regular-xs'>
        <div className='flex items-center gap-6 p-6'>
          <div className='relative hidden h-32 w-24 shrink-0 sm:block'>
            <Image src='/peptiful-vial.jpg' alt='Top selling product' fill className='object-contain drop-shadow-lg' sizes='96px' />
          </div>
          <div className='flex-1'>
            <Badge variant='light' color='primary' size='sm'>Top Seller</Badge>
            <h3 className='mt-2 text-label-md text-text-strong-950'>BPC-157 Peptide Complex</h3>
            <p className='mt-1 text-paragraph-sm text-text-sub-600'>
              Your best performer this month — 42 orders, $3,779.58 revenue
            </p>
            <div className='mt-3 flex items-center gap-3'>
              <Button variant='secondary' size='sm' asChild>
                <Link href='/brand/products/1'>View Details</Link>
              </Button>
              <Button variant='ghost' size='sm' asChild>
                <Link href='/brand/catalog'>Browse Catalog <RiArrowRightLine className='size-4' /></Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

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
            <circle cx='16' cy='16' r='13' fill='none' stroke='#0A4591' strokeWidth='3' strokeDasharray={`${(completedCount / defaultSteps.length) * 81.68} 81.68`} strokeLinecap='round' />
          </svg>
          <span className='absolute inset-0 flex items-center justify-center text-label-2xs text-primary-base'>{completedCount}/{defaultSteps.length}</span>
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
                  <span className='text-label-xs text-text-strong-950'>{completedCount} of {defaultSteps.length} completed</span>
                </div>
                <div className='mt-2 h-1.5 w-full overflow-hidden rounded-full bg-bg-soft-200'>
                  <div className='h-full rounded-full bg-primary-base transition-all' style={{ width: `${(completedCount / defaultSteps.length) * 100}%` }} />
                </div>
              </div>
              <Button variant='ghost' size='xs' iconOnly onClick={() => setChecklistOpen(false)}><RiCloseLine className='size-5' /></Button>
            </div>
            <div className='flex-1 overflow-y-auto px-3 py-3'>
              {defaultSteps.map((step) => {
                const done = completedIds.has(step.id);
                const Icon = step.icon;
                return (
                  <div key={step.id} className={cn('mb-2 flex items-center gap-3 rounded-xl border px-4 py-3.5 transition-all', done ? 'border-success-light bg-success-lighter/40' : 'border-stroke-soft-200 bg-bg-white-0 hover:border-primary-alpha-16')}>
                    <button onClick={() => toggleStep(step.id)} className={cn('flex size-8 shrink-0 items-center justify-center rounded-full transition-colors cursor-pointer', done ? 'bg-success-base text-white' : 'border-2 border-stroke-soft-200 text-transparent hover:border-primary-base')}>
                      <RiCheckLine className='size-4' />
                    </button>
                    <Link href={step.href} className='flex-1 min-w-0' onClick={() => setChecklistOpen(false)}>
                      <p className={cn('text-label-sm', done ? 'text-text-sub-600 line-through' : 'text-text-strong-950')}>{step.title}</p>
                      <p className='text-paragraph-xs text-text-sub-600'>{step.desc}</p>
                    </Link>
                    {!done && (
                      <Link href={step.href} onClick={() => setChecklistOpen(false)} className='text-text-soft-400 hover:text-primary-base'>
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
