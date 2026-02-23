'use client';

import * as React from 'react';
import { cn } from '@/utils/cn';
import { RiInboxLine } from '@remixicon/react';

type EmptyStateProps = {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
};

export function EmptyState({
  icon: Icon = RiInboxLine,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-16 text-center',
        className,
      )}
    >
      <div className='flex size-14 items-center justify-center rounded-full bg-bg-weak-50'>
        <Icon className='size-6 text-text-disabled-300' />
      </div>
      <h3 className='mt-4 text-label-md text-text-strong-950'>{title}</h3>
      {description && (
        <p className='mt-1 max-w-sm text-paragraph-sm text-text-sub-600'>
          {description}
        </p>
      )}
      {action && <div className='mt-5'>{action}</div>}
    </div>
  );
}
