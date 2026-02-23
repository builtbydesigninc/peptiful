'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/utils/cn';
import { tv, type VariantProps } from '@/utils/tv';

const buttonVariants = tv({
  base: 'inline-flex items-center justify-center gap-2 rounded-10 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-alpha-16 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
  variants: {
    variant: {
      primary:
        'bg-primary-base text-white hover:bg-primary-darker active:bg-primary-dark shadow-regular-xs hover:shadow-regular-sm',
      secondary:
        'bg-bg-white-0 text-text-strong-950 ring-1 ring-inset ring-stroke-soft-200 hover:bg-bg-weak-50 active:bg-bg-soft-200 shadow-regular-xs',
      ghost:
        'text-text-sub-600 hover:bg-bg-weak-50 hover:text-text-strong-950 active:bg-bg-soft-200',
      error:
        'bg-error-base text-white hover:bg-red-600 active:bg-red-700 shadow-regular-xs',
      success:
        'bg-success-base text-white hover:bg-green-600 active:bg-green-700 shadow-regular-xs',
    },
    size: {
      xs: 'h-7 px-2.5 text-label-2xs',
      sm: 'h-8 px-3 text-label-xs',
      md: 'h-9 px-4 text-label-sm',
      lg: 'h-10 px-5 text-label-sm',
      xl: 'h-11 px-6 text-label-md',
    },
    iconOnly: {
      true: 'p-0',
    },
  },
  compoundVariants: [
    { iconOnly: true, size: 'xs', className: 'size-7' },
    { iconOnly: true, size: 'sm', className: 'size-8' },
    { iconOnly: true, size: 'md', className: 'size-9' },
    { iconOnly: true, size: 'lg', className: 'size-10' },
    { iconOnly: true, size: 'xl', className: 'size-11' },
  ],
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, iconOnly, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, iconOnly }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';
