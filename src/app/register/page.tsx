'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/utils/cn';
import { Button } from '@/components/ui/button-new';
import { RiArrowRightLine, RiArrowLeftLine } from '@remixicon/react';
import Image from 'next/image';
import { PeptifulLogo, PeptifulLogomark } from '@/components/logo';

const roleOptions = [
  { id: 'brand', label: 'Brand Owner', desc: 'Launch your own storefront and sell products', href: '/onboarding' },
  { id: 'partner', label: 'Partner', desc: 'Refer brands and earn ongoing commissions', href: '/partner' },
  { id: 'affiliate', label: 'Affiliate', desc: 'Promote products and earn per sale', href: '/affiliate' },
];

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = React.useState('brand');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const selected = roleOptions.find((r) => r.id === role)!;
    router.push(selected.href);
  };

  return (
    <div className='flex min-h-screen'>
      <div className='relative hidden w-[480px] shrink-0 flex-col justify-between overflow-hidden bg-primary-base p-10 lg:flex'>
        <div className='absolute inset-0 bg-gradient-to-b from-primary-base/80 via-primary-base/40 to-primary-base/90 z-10' />
        <Image
          src='/peptiful-vial.jpg'
          alt='Peptiful product vial'
          fill
          className='object-cover object-center opacity-40 mix-blend-luminosity'
          priority
        />
        <PeptifulLogo variant='white' wordmarkVariant='light' markClassName='size-10' wordmarkClassName='text-label-lg' className='relative z-20' />
        <div className='relative z-20'>
          <h2 className='text-title-h3 text-white'>Join the fastest growing peptide marketplace</h2>
          <p className='mt-4 text-paragraph-md text-white/70'>
            Whether you&apos;re a brand, partner, or affiliate — get started in minutes.
          </p>
        </div>
        <p className='relative z-20 text-paragraph-xs text-white/40'>2026 Peptiful. All rights reserved.</p>
      </div>

      <div className='flex flex-1 items-center justify-center bg-bg-weak-50 px-6'>
        <div className='w-full max-w-md'>
          <div className='mb-8 lg:hidden'>
            <PeptifulLogo variant='gradient' markClassName='size-9' wordmarkClassName='text-label-md' />
          </div>

          <h1 className='text-title-h4 text-text-strong-950'>Create your account</h1>
          <p className='mt-2 text-paragraph-sm text-text-sub-600'>Choose your role to get started.</p>

          {/* Role Cards */}
          <div className='mt-6 space-y-3'>
            {roleOptions.map((r) => (
              <button
                key={r.id}
                onClick={() => setRole(r.id)}
                className={cn(
                  'w-full rounded-xl border p-4 text-left transition-all cursor-pointer',
                  role === r.id
                    ? 'border-primary-base bg-primary-alpha-10/50 shadow-regular-xs'
                    : 'border-stroke-soft-200 bg-bg-white-0 hover:border-primary-alpha-16',
                )}
              >
                <p className='text-label-sm text-text-strong-950'>{r.label}</p>
                <p className='mt-0.5 text-paragraph-xs text-text-sub-600'>{r.desc}</p>
              </button>
            ))}
          </div>

          <form onSubmit={handleRegister} className='mt-6 space-y-4'>
            <div className='space-y-1.5'>
              <label className='text-label-sm text-text-strong-950'>Full Name</label>
              <input placeholder='Your name' className='h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 placeholder:text-text-disabled-300 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16' />
            </div>
            <div className='space-y-1.5'>
              <label className='text-label-sm text-text-strong-950'>Email</label>
              <input type='email' placeholder='you@company.com' className='h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 placeholder:text-text-disabled-300 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16' />
            </div>
            <div className='space-y-1.5'>
              <label className='text-label-sm text-text-strong-950'>Password</label>
              <input type='password' placeholder='Min 8 characters' className='h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 placeholder:text-text-disabled-300 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16' />
            </div>
            <Button type='submit' size='lg' className='w-full'>
              Create Account
              <RiArrowRightLine className='size-4' />
            </Button>
          </form>

          <p className='mt-6 text-center text-paragraph-sm text-text-sub-600'>
            Already have an account?{' '}
            <Link href='/login' className='text-label-sm text-primary-base hover:underline'>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
