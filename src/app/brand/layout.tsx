'use client';

import {
  RiHome5Line,
  RiGridLine,
  RiShoppingBag3Line,
  RiFileList3Line,
  RiTeamLine,
  RiSettings4Line,
  RiBarChartBoxLine,
  RiWallet3Line,
} from '@remixicon/react';
import { AppShell } from '@/components/layout/app-shell';
import type { SidebarConfig } from '@/components/layout/app-sidebar';
import { PeptifulLogomark } from '@/components/logo';

const brandSidebarConfig: SidebarConfig = {
  logo: <PeptifulLogomark variant='gradient' className='size-8' />,
  title: 'Peptiful',
  subtitle: 'Brand Portal',
  navItems: [
    { label: 'Home', href: '/brand', icon: RiHome5Line },
    { label: 'Catalog', href: '/brand/catalog', icon: RiGridLine },
    {
      label: 'My Products',
      href: '/brand/products',
      icon: RiShoppingBag3Line,
      badge: 8,
    },
    {
      label: 'Orders',
      href: '/brand/orders',
      icon: RiFileList3Line,
      badge: 3,
    },
    { label: 'Affiliates', href: '/brand/affiliates', icon: RiTeamLine },
    {
      label: 'Earnings',
      href: '/brand/earnings',
      icon: RiBarChartBoxLine,
    },
    { label: 'Payouts', href: '/brand/payouts', icon: RiWallet3Line },
    {
      label: 'Store Settings',
      href: '/brand/settings',
      icon: RiSettings4Line,
    },
  ],
  user: {
    name: 'Sarah Chen',
    email: 'sarah@peptidegains.com',
  },
};

export default function BrandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell sidebarConfig={brandSidebarConfig}>{children}</AppShell>;
}
