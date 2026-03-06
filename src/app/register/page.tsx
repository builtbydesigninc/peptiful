'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/utils/cn';
import { Button } from '@/components/ui/button-new';
import { RiArrowRightLine, RiEyeLine, RiEyeOffLine } from '@remixicon/react';
import Image from 'next/image';
import { PeptifulLogo } from '@/components/logo';
import { adminApi, setApiToken } from '@/lib/api-client';

const roleOptions = [
  { id: 'brand', label: 'Brand Owner', desc: 'Launch your own storefront and sell products', href: '/onboarding', apiRole: 'BRAND' },
  { id: 'partner', label: 'Partner', desc: 'Refer brands and earn ongoing commissions', href: '/partner', apiRole: 'PARTNER' },
  { id: 'affiliate', label: 'Affiliate', desc: 'Promote products and earn per sale', href: '/affiliate', apiRole: 'AFFILIATE' },
];

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = React.useState('brand');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      password: formData.get('password'),
      role: roleOptions.find(r => r.id === role)?.apiRole
    };

    try {
      const { accessToken } = await adminApi.register(data);
      setApiToken(accessToken);

      const selected = roleOptions.find((r) => r.id === role)!;
      router.push(selected.href);
    } catch (err: any) {
      console.error('Registration failed:', err);
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex min-h-screen'>
      <div className='relative hidden w-[480px] shrink-0 flex-col justify-between overflow-hidden bg-primary-base p-10 lg:flex'>
        <div className='absolute inset-0 bg-gradient-to-b from-primary-base/80 via-primary-base/40 to-primary-base/90 z-10' />
        <Image
          src='/peptiful-vial.png'
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

          {error && (
            <div className='mt-4 rounded-10 bg-error-lighter p-3 text-paragraph-xs text-error-base'>
              {error}
            </div>
          )}

          {/* Role Cards */}
          <div className='mt-6 space-y-3'>
            {roleOptions.map((r) => (
              <button
                key={r.id}
                type='button'
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
              <input name='fullName' required placeholder='Your name' className='h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 placeholder:text-text-disabled-300 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16' />
            </div>
            <div className='space-y-1.5'>
              <label className='text-label-sm text-text-strong-950'>Email</label>
              <input name='email' type='email' required placeholder='you@company.com' autoComplete='email' className='h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 placeholder:text-text-disabled-300 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16' />
            </div>
            <div className='space-y-1.5'>
              <label className='text-label-sm text-text-strong-950'>Password</label>
              <div className='relative'>
                <input
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder='Min 8 characters'
                  autoComplete='new-password'
                  className='h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 pr-10 text-paragraph-sm text-text-strong-950 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16'
                />
                <button type='button' onClick={() => setShowPassword(!showPassword)} className='absolute right-3 top-1/2 -translate-y-1/2 text-text-soft-400 hover:text-text-strong-950 cursor-pointer'>
                  {showPassword ? <RiEyeOffLine className='size-4' /> : <RiEyeLine className='size-4' />}
                </button>
              </div>
            </div>
            <Button type='submit' size='lg' className='w-full' disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
              {!loading && <RiArrowRightLine className='size-4' />}
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
