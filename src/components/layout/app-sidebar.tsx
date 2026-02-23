'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/utils/cn';
import {
  RiMenuFoldLine,
  RiMenuUnfoldLine,
  RiMoonLine,
  RiSunLine,
  RiLogoutBoxRLine,
  RiSettings4Line,
  RiNotification3Line,
  RiUserLine,
  RiArrowUpSLine,
} from '@remixicon/react';
import { useTheme } from 'next-themes';

export type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  children?: NavItem[];
};

export type SidebarConfig = {
  logo: React.ReactNode;
  title: string;
  subtitle?: string;
  navItems: NavItem[];
  bottomNavItems?: NavItem[];
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
};

export function AppSidebar({ config }: { config: SidebarConfig }) {
  const [collapsed, setCollapsed] = React.useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const isActive = (href: string) => {
    if (pathname === href) return true;
    const hrefSegments = href.split('/').filter(Boolean);
    const pathSegments = pathname.split('/').filter(Boolean);
    if (hrefSegments.length < 2) return pathname === href;
    return pathname.startsWith(href + '/') || pathname === href;
  };

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-stroke-soft-200 bg-bg-white-0 transition-all duration-300',
        collapsed ? 'w-[68px]' : 'w-[260px]',
      )}
    >
      {/* Logo Area */}
      <div className='flex h-16 items-center gap-3 border-b border-stroke-soft-200 px-4'>
        <div className='flex shrink-0 items-center justify-center'>
          {config.logo}
        </div>
        {!collapsed && (
          <div className='min-w-0'>
            <p className='truncate text-label-sm text-text-strong-950'>
              {config.title}
            </p>
            {config.subtitle && (
              <p className='truncate text-paragraph-xs text-text-sub-600'>
                {config.subtitle}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className='flex-1 overflow-y-auto px-3 py-4'>
        <ul className='space-y-1'>
          {config.navItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'group flex items-center gap-3 rounded-10 px-3 py-2.5 text-label-sm transition-colors',
                    active
                      ? 'bg-primary-alpha-10 text-primary-base'
                      : 'text-text-sub-600 hover:bg-bg-weak-50 hover:text-text-strong-950',
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon
                    className={cn(
                      'size-5 shrink-0 transition-colors',
                      active
                        ? 'text-primary-base'
                        : 'text-text-soft-400 group-hover:text-text-strong-950',
                    )}
                  />
                  {!collapsed && (
                    <>
                      <span className='flex-1 truncate'>{item.label}</span>
                      {item.badge !== undefined && (
                        <span
                          className={cn(
                            'flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-label-2xs',
                            active
                              ? 'bg-primary-base text-white'
                              : 'bg-bg-soft-200 text-text-sub-600',
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className='border-t border-stroke-soft-200 px-3 py-3'>
        {/* Theme Toggle */}
        {mounted && (
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className='mb-2 flex w-full items-center gap-3 rounded-10 px-3 py-2 text-label-sm text-text-sub-600 transition-colors hover:bg-bg-weak-50 hover:text-text-strong-950'
            title={collapsed ? 'Toggle theme' : undefined}
          >
            {theme === 'dark' ? (
              <RiSunLine className='size-5 shrink-0 text-text-soft-400' />
            ) : (
              <RiMoonLine className='size-5 shrink-0 text-text-soft-400' />
            )}
            {!collapsed && (
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            )}
          </button>
        )}

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className='flex w-full items-center gap-3 rounded-10 px-3 py-2 text-label-sm text-text-sub-600 transition-colors hover:bg-bg-weak-50 hover:text-text-strong-950'
        >
          {collapsed ? (
            <RiMenuUnfoldLine className='size-5 shrink-0 text-text-soft-400' />
          ) : (
            <RiMenuFoldLine className='size-5 shrink-0 text-text-soft-400' />
          )}
          {!collapsed && <span>Collapse</span>}
        </button>

        {/* User with Dropdown */}
        {config.user && (
          <UserDropdown user={config.user} collapsed={collapsed} />
        )}
      </div>
    </aside>
  );
}

function UserDropdown({ user, collapsed }: { user: { name: string; email: string }; collapsed: boolean }) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const initials = user.name.split(' ').map((n) => n[0]).join('').slice(0, 2);

  return (
    <div ref={ref} className='relative mt-2'>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'flex w-full items-center gap-3 rounded-10 border border-stroke-soft-200 px-3 py-2.5 transition-colors hover:bg-bg-weak-50 cursor-pointer',
          collapsed && 'justify-center px-0',
          open && 'bg-bg-weak-50',
        )}
      >
        <div className='flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-alpha-10 text-label-xs text-primary-base'>
          {initials}
        </div>
        {!collapsed && (
          <>
            <div className='min-w-0 flex-1 text-left'>
              <p className='truncate text-label-xs text-text-strong-950'>{user.name}</p>
              <p className='truncate text-paragraph-xs text-text-sub-600'>{user.email}</p>
            </div>
            <RiArrowUpSLine className={cn('size-4 text-text-soft-400 transition-transform', !open && 'rotate-180')} />
          </>
        )}
      </button>

      {open && (
        <div className={cn(
          'absolute bottom-full left-0 mb-2 w-full overflow-hidden rounded-xl border border-stroke-soft-200 bg-bg-white-0 shadow-complex',
          collapsed && 'left-1/2 -translate-x-1/2 w-48',
        )}>
          <div className='border-b border-stroke-soft-200 px-3 py-3'>
            <p className='text-label-xs text-text-strong-950'>{user.name}</p>
            <p className='text-paragraph-xs text-text-sub-600'>{user.email}</p>
          </div>
          <div className='py-1'>
            <button
              onClick={() => { setOpen(false); }}
              className='flex w-full items-center gap-2.5 px-3 py-2 text-label-xs text-text-sub-600 hover:bg-bg-weak-50 hover:text-text-strong-950 transition-colors cursor-pointer'
            >
              <RiUserLine className='size-4' />
              View Profile
            </button>
            <button
              onClick={() => { setOpen(false); router.push('/login'); }}
              className='flex w-full items-center gap-2.5 px-3 py-2 text-label-xs text-error-base hover:bg-error-lighter transition-colors cursor-pointer'
            >
              <RiLogoutBoxRLine className='size-4' />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
