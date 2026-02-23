'use client';

import Link from 'next/link';
import { cn } from '@/utils/cn';
import {
  RiShieldLine,
  RiHandHeartLine,
  RiStore2Line,
  RiMegaphoneLine,
  RiArrowRightLine,
} from '@remixicon/react';
import { PeptifulLogo } from '@/components/logo';

const portals = [
  {
    title: 'Admin',
    description: 'Platform management',
    icon: RiShieldLine,
    href: '/admin',
    accent: 'bg-red-500/10 text-red-600 group-hover:bg-red-500 group-hover:text-white',
  },
  {
    title: 'Partner',
    description: 'Referral & earnings',
    icon: RiHandHeartLine,
    href: '/partner',
    accent: 'bg-amber-500/10 text-amber-600 group-hover:bg-amber-500 group-hover:text-white',
  },
  {
    title: 'Brand',
    description: 'Store & products',
    icon: RiStore2Line,
    href: '/brand',
    accent: 'bg-primary-alpha-10 text-primary-base group-hover:bg-primary-base group-hover:text-white',
  },
  {
    title: 'Promoter',
    description: 'Affiliate tools',
    icon: RiMegaphoneLine,
    href: '/affiliate',
    accent: 'bg-emerald-500/10 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white',
  },
];

export default function HomePage() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-bg-white-0 px-6'>
      {/* Subtle gradient backdrop */}
      <div className='pointer-events-none fixed inset-0 overflow-hidden'>
        <div className='absolute -top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-primary-alpha-10 to-transparent blur-3xl' />
      </div>

      <div className='relative flex w-full max-w-lg flex-col items-center'>
        {/* Logo + Wordmark */}
        <PeptifulLogo
          variant='gradient'
          wordmarkVariant='dark'
          markClassName='size-10'
          wordmarkClassName='text-title-h4'
          className='mb-3'
        />
        <p className='mb-12 text-paragraph-sm text-text-sub-600'>
          B2B Peptide Dropshipping Platform
        </p>

        {/* Portal Grid */}
        <div className='grid w-full grid-cols-1 gap-3 sm:grid-cols-2'>
          {portals.map((p) => {
            const Icon = p.icon;
            return (
              <Link
                key={p.href}
                href={p.href}
                className='group flex items-center gap-4 rounded-2xl border border-stroke-soft-200 bg-bg-white-0 px-5 py-4 transition-all duration-200 hover:border-stroke-sub-300 hover:shadow-regular-sm'
              >
                <div
                  className={cn(
                    'flex size-11 shrink-0 items-center justify-center rounded-xl transition-all duration-200',
                    p.accent,
                  )}
                >
                  <Icon className='size-5' />
                </div>
                <div className='min-w-0 flex-1'>
                  <p className='text-label-sm text-text-strong-950'>{p.title}</p>
                  <p className='text-paragraph-xs text-text-sub-600'>{p.description}</p>
                </div>
                <RiArrowRightLine className='size-4 text-text-soft-400 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100' />
              </Link>
            );
          })}
        </div>

        {/* Auth */}
        <div className='mt-10 flex items-center gap-6'>
          <Link
            href='/login'
            className='text-label-xs text-text-sub-600 transition-colors hover:text-primary-base'
          >
            Sign in
          </Link>
          <span className='h-3.5 w-px bg-stroke-soft-200' />
          <Link
            href='/register'
            className='text-label-xs text-primary-base transition-colors hover:text-primary-dark'
          >
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}
