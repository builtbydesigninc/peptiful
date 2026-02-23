'use client';

import * as React from 'react';
import { cn } from '@/utils/cn';
import { tv, type VariantProps } from '@/utils/tv';

const statCardVariants = tv({
  base: 'rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-5 shadow-regular-xs transition-shadow hover:shadow-regular-sm',
  variants: {
    trend: {
      up: '',
      down: '',
      neutral: '',
    },
  },
  defaultVariants: {
    trend: 'neutral',
  },
});

type StatCardProps = VariantProps<typeof statCardVariants> & {
  title: string;
  value: string | number;
  change?: string;
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
};

export function StatCard({
  title,
  value,
  change,
  icon: Icon,
  trend = 'neutral',
  className,
}: StatCardProps) {
  return (
    <div className={cn(statCardVariants({ trend }), className)}>
      <div className='flex items-start justify-between'>
        <p className='text-label-xs text-text-sub-600 uppercase tracking-wider'>
          {title}
        </p>
        {Icon && (
          <div className='flex size-9 items-center justify-center rounded-10 bg-bg-weak-50'>
            <Icon className='size-4.5 text-text-soft-400' />
          </div>
        )}
      </div>
      <p className='mt-2 text-title-h4 text-text-strong-950'>{value}</p>
      {change && (
        <p
          className={cn(
            'mt-1 text-label-xs',
            trend === 'up' && 'text-success-base',
            trend === 'down' && 'text-error-base',
            trend === 'neutral' && 'text-text-soft-400',
          )}
        >
          {change}
        </p>
      )}
    </div>
  );
}
