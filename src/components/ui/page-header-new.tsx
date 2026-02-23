'use client';

import * as React from 'react';
import { cn } from '@/utils/cn';

type PageHeaderProps = {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
  breadcrumbs?: { label: string; href?: string }[];
};

export function PageHeader({
  title,
  description,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between',
        className,
      )}
    >
      <div>
        <h1 className='text-title-h5 text-text-strong-950'>{title}</h1>
        {description && (
          <p className='mt-1 text-paragraph-sm text-text-sub-600'>
            {description}
          </p>
        )}
      </div>
      {actions && <div className='flex items-center gap-3'>{actions}</div>}
    </div>
  );
}
