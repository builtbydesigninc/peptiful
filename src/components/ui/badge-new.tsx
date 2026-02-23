'use client';

import * as React from 'react';
import { cn } from '@/utils/cn';
import { tv, type VariantProps } from '@/utils/tv';

const badgeVariants = tv({
  base: 'inline-flex items-center gap-1 rounded-full font-medium whitespace-nowrap',
  variants: {
    variant: {
      filled: '',
      light: '',
      stroke: 'ring-1 ring-inset',
    },
    color: {
      gray: '',
      primary: '',
      success: '',
      error: '',
      warning: '',
      information: '',
      feature: '',
    },
    size: {
      sm: 'px-2 py-0.5 text-label-2xs',
      md: 'px-2.5 py-0.5 text-label-xs',
      lg: 'px-3 py-1 text-label-xs',
    },
  },
  compoundVariants: [
    { variant: 'filled', color: 'gray', className: 'bg-bg-soft-200 text-text-sub-600' },
    { variant: 'filled', color: 'primary', className: 'bg-primary-base text-white' },
    { variant: 'filled', color: 'success', className: 'bg-success-base text-white' },
    { variant: 'filled', color: 'error', className: 'bg-error-base text-white' },
    { variant: 'filled', color: 'warning', className: 'bg-warning-base text-white' },
    { variant: 'filled', color: 'information', className: 'bg-information-base text-white' },
    { variant: 'filled', color: 'feature', className: 'bg-feature-base text-white' },
    { variant: 'light', color: 'gray', className: 'bg-bg-weak-50 text-text-sub-600' },
    { variant: 'light', color: 'primary', className: 'bg-primary-alpha-10 text-primary-base' },
    { variant: 'light', color: 'success', className: 'bg-success-lighter text-success-dark' },
    { variant: 'light', color: 'error', className: 'bg-error-lighter text-error-dark' },
    { variant: 'light', color: 'warning', className: 'bg-warning-lighter text-warning-dark' },
    { variant: 'light', color: 'information', className: 'bg-information-lighter text-information-dark' },
    { variant: 'light', color: 'feature', className: 'bg-feature-lighter text-feature-dark' },
    { variant: 'stroke', color: 'gray', className: 'ring-stroke-soft-200 text-text-sub-600' },
    { variant: 'stroke', color: 'primary', className: 'ring-primary-alpha-16 text-primary-base' },
    { variant: 'stroke', color: 'success', className: 'ring-green-alpha-16 text-success-dark' },
    { variant: 'stroke', color: 'error', className: 'ring-red-alpha-16 text-error-dark' },
    { variant: 'stroke', color: 'warning', className: 'ring-orange-alpha-16 text-warning-dark' },
  ],
  defaultVariants: {
    variant: 'light',
    color: 'gray',
    size: 'md',
  },
});

export type BadgeProps = VariantProps<typeof badgeVariants> & {
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
};

export function Badge({
  children,
  variant,
  color,
  size,
  dot,
  className,
}: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, color, size }), className)}>
      {dot && (
        <span
          className={cn(
            'size-1.5 rounded-full',
            color === 'success' && 'bg-success-base',
            color === 'error' && 'bg-error-base',
            color === 'warning' && 'bg-warning-base',
            color === 'primary' && 'bg-primary-base',
            color === 'information' && 'bg-information-base',
            color === 'feature' && 'bg-feature-base',
            color === 'gray' && 'bg-text-soft-400',
          )}
        />
      )}
      {children}
    </span>
  );
}
