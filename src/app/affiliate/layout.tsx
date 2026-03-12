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
import { AffiliateProvider, useAffiliate } from './context';

const BASE_NAV_ITEMS: SidebarConfig['navItems'] = [
  { label: 'Dashboard', href: '/affiliate', icon: RiHome5Line },
  { label: 'My Brands', href: '/affiliate/brands', icon: RiBuilding2Line },
  { label: 'Referral Links', href: '/affiliate/links', icon: RiLink },
  { label: 'My Team', href: '/affiliate/team', icon: RiTeamLine },
  { label: 'Promo Codes', href: '/affiliate/codes', icon: RiCoupon3Line },
  { label: 'Orders', href: '/affiliate/orders', icon: RiFileList3Line },
  { label: 'Earnings', href: '/affiliate/earnings', icon: RiBarChartBoxLine },
  { label: 'Share Toolkit', href: '/affiliate/share', icon: RiShareLine },
  { label: 'Payouts', href: '/affiliate/payouts', icon: RiWallet3Line },
  { label: 'Settings', href: '/affiliate/settings', icon: RiSettings4Line },
];

import { usePathname } from 'next/navigation';

function AffiliateShell({ children }: { children: React.ReactNode }) {
  const { user } = useAffiliate();
  const pathname = usePathname();

  // If we're on the login page, don't show the sidebar/shell
  if (pathname === '/affiliate/login') {
    return <>{children}</>;
  }

  // Filter out "My Team" for L2 affiliates
  const navItems = BASE_NAV_ITEMS.filter((item) => {
    if (item.label === 'My Team' && user?.role === 'L2_AFFILIATE') {
      return false;
    }
    return true;
  });

  const sidebarConfig: SidebarConfig = {
    logo: <PeptifulLogomark variant='gradient' className='size-8' />,
    title: 'Peptiful',
    subtitle: 'Promoter Portal',
    navItems,
    user: user
      ? { name: user.name, email: user.email }
      : { name: 'Loading…', email: '' },
  };

  return <AppShell sidebarConfig={sidebarConfig}>{children}</AppShell>;
}

export default function AffiliateLayout({ children }: { children: React.ReactNode }) {
  return (
    <AffiliateProvider>
      <AffiliateShell>{children}</AffiliateShell>
    </AffiliateProvider>
  );
}
