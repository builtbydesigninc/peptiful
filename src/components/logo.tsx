'use client';

import { cn } from '@/utils/cn';

const LOGOMARK_PATH =
  'M1705.12,697.41c-.81,92.22-22.8,185.17-66.86,271.79-153.17,301.15-468.31,351.43-574.97,351.43-27.89,0-55.35-1.71-82.25-5.09-4.15-16.34-8.13-32.76-11.89-49.23-45-195.86-37.47-400.58,50.99-582.46,91.24-187.74,235.26-324.23,405.63-439.81,21-14.24,46.92-14.71,68.57-4.83h.04c7.49,3.42,14.46,8.04,20.57,13.77,126.27,118.44,191.67,280.17,190.17,444.42ZM921.42,1511.22c-32.95-256.7-115.35-532.52-381.18-630.11-68.68-25.21-138.23-41.18-211.26-48.1-17.71-1.68-34.03,10.6-34.03,29.99v1028.93c0,17.46,14.38,29.81,31.18,29.81l562.16.03c20.89,0,33.94-13.69,36.63-35.35,15.87-127.48,12.56-250.07-3.5-375.2ZM1239.98,130.15c-23.92-52.16-288.44-51.7-350.88-51.72l-563.73-.18c-17.74,0-30.42,14.33-30.43,31.35l-.08,602.29c0,15.86,7.71,29.82,25.13,32.35,186.49,27.03,375.48-12.28,535.09-113.81,167.49-106.54,296.77-278.16,383.69-453.58,6.45-13.02,6.55-35.07,1.21-46.7Z';

type LogoVariant = 'gradient' | 'white' | 'black';

interface PeptifulLogomarkProps {
  className?: string;
  variant?: LogoVariant;
}

export function PeptifulLogomark({ className, variant = 'gradient' }: PeptifulLogomarkProps) {
  const gradientId = `peptiful-gradient-${variant}`;

  return (
    <svg viewBox="0 0 2000 2000" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn('size-8', className)}>
      {variant === 'gradient' && (
        <defs>
          <linearGradient id={gradientId} x1="1420.07" y1="161.09" x2="4.85" y2="1623.71" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#0E79D7" />
            <stop offset="1" stopColor="#07134D" />
          </linearGradient>
        </defs>
      )}
      <path
        d={LOGOMARK_PATH}
        fill={variant === 'gradient' ? `url(#${gradientId})` : variant === 'white' ? '#f7f7ff' : '#171717'}
      />
    </svg>
  );
}

interface PeptifulWordmarkProps {
  className?: string;
  variant?: 'dark' | 'light';
}

export function PeptifulWordmark({ className, variant = 'dark' }: PeptifulWordmarkProps) {
  return (
    <span
      className={cn(
        'font-semibold tracking-[-0.02em]',
        variant === 'dark' ? 'text-text-strong-950' : 'text-white',
        className,
      )}
    >
      peptiful
    </span>
  );
}

interface PeptifulLogoProps {
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
  variant?: LogoVariant;
  wordmarkVariant?: 'dark' | 'light';
  showWordmark?: boolean;
}

export function PeptifulLogo({
  className,
  markClassName,
  wordmarkClassName,
  variant = 'gradient',
  wordmarkVariant = 'dark',
  showWordmark = true,
}: PeptifulLogoProps) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <PeptifulLogomark variant={variant} className={markClassName} />
      {showWordmark && <PeptifulWordmark variant={wordmarkVariant} className={wordmarkClassName} />}
    </div>
  );
}
