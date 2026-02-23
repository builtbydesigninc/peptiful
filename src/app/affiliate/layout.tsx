'use client';

import {
  RiHome5Line,
  RiBuilding2Line,
  RiLink,
  RiFileList3Line,
  RiTeamLine,
  RiBarChartBoxLine,
  RiWallet3Line,
  RiSettings4Line,
  RiCoupon3Line,
  RiShareLine,
} from '@remixicon/react';
import { AppShell } from '@/components/layout/app-shell';
import type { SidebarConfig } from '@/components/layout/app-sidebar';
import { PeptifulLogomark } from '@/components/logo';
import { AffiliateProvider } from './context';

const affiliateSidebarConfig: SidebarConfig = {
  logo: <PeptifulLogomark variant='gradient' className='size-8' />,
  title: 'Peptiful',
  subtitle: 'Promoter Portal',
  navItems: [
    { label: 'Dashboard', href: '/affiliate', icon: RiHome5Line },
    { label: 'My Brands', href: '/affiliate/brands', icon: RiBuilding2Line },
    { label: 'Referral Links', href: '/affiliate/links', icon: RiLink },
    { label: 'My Team', href: '/affiliate/team', icon: RiTeamLine, badge: 6 },
    { label: 'Promo Codes', href: '/affiliate/codes', icon: RiCoupon3Line },
    { label: 'Orders', href: '/affiliate/orders', icon: RiFileList3Line },
    { label: 'Earnings', href: '/affiliate/earnings', icon: RiBarChartBoxLine },
    { label: 'Share Toolkit', href: '/affiliate/share', icon: RiShareLine },
    { label: 'Payouts', href: '/affiliate/payouts', icon: RiWallet3Line },
    { label: 'Settings', href: '/affiliate/settings', icon: RiSettings4Line },
  ],
  user: { name: 'Jessica Parker', email: 'jessica@fitness.com' },
};

export default function AffiliateLayout({ children }: { children: React.ReactNode }) {
  return (
    <AffiliateProvider>
      <AppShell sidebarConfig={affiliateSidebarConfig}>{children}</AppShell>
    </AffiliateProvider>
  );
}
