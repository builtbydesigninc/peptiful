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

const roles = [
  { id: 'brand', label: 'Brand Owner', desc: 'Manage your storefront and products', href: '/brand', apiRole: 'BRAND' },
  { id: 'partner', label: 'Partner', desc: 'Track referrals and commissions', href: '/partner', apiRole: 'PARTNER' },
  { id: 'affiliate', label: 'L1 Affiliate', desc: 'Manage your affiliate network', href: '/affiliate', apiRole: 'AFFILIATE' },
  { id: 'promoter', label: 'L2 Promoter', desc: 'Share codes and earn', href: '/promoter', apiRole: 'PROMOTER' },
  { id: 'admin', label: 'Admin', desc: 'Platform administration', href: '/admin', apiRole: 'ADMIN' },
];

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = React.useState('brand');
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const selectedRole = roles.find((r) => r.id === role)!;

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const { accessToken, user } = await adminApi.login({
        email,
        password,
        role: selectedRole.apiRole
      });

      setApiToken(accessToken);

      // Redirect based on backend role or selected role
      router.push(selectedRole.href);
    } catch (err: any) {
      console.error('Login failed:', err);
      setError(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex min-h-screen'>
      {/* Left Panel */}
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
          <h2 className='text-title-h3 text-white'>White-label dropshipping for the peptide industry</h2>
          <p className='mt-4 text-paragraph-md text-white/70'>
            Launch your branded storefront, manage affiliates, and scale your supplement business — all in one platform.
          </p>
        </div>
        <p className='relative z-20 text-paragraph-xs text-white/40'>2026 Peptiful. All rights reserved.</p>
      </div>

      {/* Right Panel */}
      <div className='flex flex-1 items-center justify-center bg-bg-weak-50 px-6'>
        <div className='w-full max-w-md'>
          <div className='mb-8 lg:hidden'>
            <PeptifulLogo variant='gradient' markClassName='size-9' wordmarkClassName='text-label-md' />
          </div>

          <h1 className='text-title-h4 text-text-strong-950'>Sign in to your account</h1>
          <p className='mt-2 text-paragraph-sm text-text-sub-600'>
            Select your role and enter your credentials.
          </p>

          {error && (
            <div className='mt-4 rounded-10 bg-error-lighter p-3 text-paragraph-xs text-error-base'>
              {error}
            </div>
          )}

          {/* Role Selector */}
          <div className='mt-6 flex flex-wrap gap-2'>
            {roles.map((r) => (
              <button
                key={r.id}
                type='button'
                onClick={() => setRole(r.id)}
                className={cn(
                  'rounded-10 px-3 py-1.5 text-label-xs transition-all cursor-pointer',
                  role === r.id
                    ? 'bg-primary-base text-white'
                    : 'bg-bg-white-0 text-text-sub-600 ring-1 ring-inset ring-stroke-soft-200 hover:ring-primary-alpha-16',
                )}
              >
                {r.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className='mt-6 space-y-4'>
            <div className='space-y-1.5'>
              <label className='text-label-sm text-text-strong-950'>Email</label>
              <input
                name='email'
                type='email'
                required
                placeholder='demo@peptiful.com'
                autoComplete='email'
                className='h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 placeholder:text-text-disabled-300 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16'
              />
            </div>
            <div className='space-y-1.5'>
              <div className='flex items-center justify-between'>
                <label className='text-label-sm text-text-strong-950'>Password</label>
                <Link href='/forgot-password' className='text-label-xs text-primary-base hover:underline'>Forgot?</Link>
              </div>
              <div className='relative'>
                <input
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder='Your password'
                  autoComplete='current-password'
                  className='h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 pr-10 text-paragraph-sm text-text-strong-950 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16'
                />
                <button type='button' onClick={() => setShowPassword(!showPassword)} className='absolute right-3 top-1/2 -translate-y-1/2 text-text-soft-400 hover:text-text-strong-950 cursor-pointer'>
                  {showPassword ? <RiEyeOffLine className='size-4' /> : <RiEyeLine className='size-4' />}
                </button>
              </div>
            </div>
            <Button type='submit' size='lg' className='w-full' disabled={loading}>
              {loading ? 'Signing In...' : `Sign In as ${selectedRole.label}`}
              {!loading && <RiArrowRightLine className='size-4' />}
            </Button>
          </form>

          <p className='mt-6 text-center text-paragraph-sm text-text-sub-600'>
            Don&apos;t have an account?{' '}
            <Link href='/register' className='text-label-sm text-primary-base hover:underline'>Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
