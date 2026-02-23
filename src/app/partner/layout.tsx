'use client';

import {
  RiHome5Line,
  RiBuilding2Line,
  RiBarChartBoxLine,
  RiWallet3Line,
  RiLink,
  RiSettings4Line,
} from '@remixicon/react';
import { AppShell } from '@/components/layout/app-shell';
import type { SidebarConfig } from '@/components/layout/app-sidebar';
import { PeptifulLogomark } from '@/components/logo';

const partnerSidebarConfig: SidebarConfig = {
  logo: <PeptifulLogomark variant='gradient' className='size-8' />,
  title: 'Peptiful',
  subtitle: 'Partner Portal',
  navItems: [
    { label: 'Home', href: '/partner', icon: RiHome5Line },
    { label: 'My Brands', href: '/partner/brands', icon: RiBuilding2Line, badge: 12 },
    { label: 'Referral Tools', href: '/partner/referrals', icon: RiLink },
    { label: 'Earnings', href: '/partner/earnings', icon: RiBarChartBoxLine },
    { label: 'Payouts', href: '/partner/payouts', icon: RiWallet3Line },
    { label: 'Settings', href: '/partner/settings', icon: RiSettings4Line },
  ],
  user: {
    name: 'Marcus Rivera',
    email: 'marcus@wellness-partners.co',
  },
};

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  return <AppShell sidebarConfig={partnerSidebarConfig}>{children}</AppShell>;
}
