'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button-new';
import { RiArrowLeftLine, RiMailSendLine, RiCheckboxCircleLine } from '@remixicon/react';
import Image from 'next/image';
import { PeptifulLogo } from '@/components/logo';

export default function ForgotPasswordPage() {
  const [sent, setSent] = React.useState(false);

  return (
    <div className='relative flex min-h-screen items-center justify-center bg-bg-weak-50 px-6'>
      <div className='pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden'>
        <div className='relative h-[600px] w-[600px] opacity-[0.04]'>
          <Image src='/peptiful-vial.jpg' alt='' fill className='object-contain' />
        </div>
      </div>
      <div className='relative w-full max-w-md'>
        <div className='mb-8'>
          <PeptifulLogo variant='gradient' markClassName='size-9' wordmarkClassName='text-label-md' />
        </div>

        {!sent ? (
          <>
            <h1 className='text-title-h4 text-text-strong-950'>Reset your password</h1>
            <p className='mt-2 text-paragraph-sm text-text-sub-600'>
              Enter your email and we&apos;ll send you a link to reset your password.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className='mt-6 space-y-4'>
              <div className='space-y-1.5'>
                <label className='text-label-sm text-text-strong-950'>Email</label>
                <input type='email' placeholder='you@company.com' className='h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 placeholder:text-text-disabled-300 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16' />
              </div>
              <Button type='submit' size='lg' className='w-full'>
                <RiMailSendLine className='size-4' />
                Send Reset Link
              </Button>
            </form>
          </>
        ) : (
          <div className='text-center'>
            <div className='mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-success-lighter'>
              <RiCheckboxCircleLine className='size-7 text-success-base' />
            </div>
            <h1 className='text-title-h4 text-text-strong-950'>Check your email</h1>
            <p className='mt-2 text-paragraph-sm text-text-sub-600'>
              We sent a password reset link to your email. Click the link to set a new password.
            </p>
            <Button variant='secondary' size='md' className='mt-6' onClick={() => setSent(false)}>
              Resend Email
            </Button>
          </div>
        )}

        <p className='mt-8 text-center'>
          <Link href='/login' className='inline-flex items-center gap-1.5 text-label-sm text-primary-base hover:underline'>
            <RiArrowLeftLine className='size-4' />
            Back to Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
