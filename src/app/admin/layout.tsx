'use client';

import {
  RiHome5Line,
  RiBuilding2Line,
  RiHandHeartLine,
  RiFileList3Line,
  RiPercentLine,
  RiWallet3Line,
  RiSettings4Line,
} from '@remixicon/react';
import { AppShell } from '@/components/layout/app-shell';
import type { SidebarConfig } from '@/components/layout/app-sidebar';
import { PeptifulLogomark } from '@/components/logo';

const adminSidebarConfig: SidebarConfig = {
  logo: <PeptifulLogomark variant='gradient' className='size-8' />,
  title: 'Peptiful',
  subtitle: 'Admin Console',
  navItems: [
    { label: 'Overview', href: '/admin', icon: RiHome5Line },
    { label: 'Partners', href: '/admin/partners', icon: RiHandHeartLine, badge: 8 },
    { label: 'Brands', href: '/admin/brands', icon: RiBuilding2Line, badge: 42 },
    { label: 'Orders', href: '/admin/orders', icon: RiFileList3Line, badge: 18 },
    { label: 'Commissions', href: '/admin/commissions', icon: RiPercentLine },
    { label: 'Payouts', href: '/admin/payouts', icon: RiWallet3Line },
    { label: 'Settings', href: '/admin/settings', icon: RiSettings4Line },
  ],
  user: { name: 'Admin', email: 'admin@peptiful.com' },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AppShell sidebarConfig={adminSidebarConfig}>{children}</AppShell>;
}
