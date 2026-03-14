'use client';

import { useEffect, useState } from 'react';
import {
    RiHome5Line,
    RiFileList3Line,
    RiBarChartBoxLine,
    RiWallet3Line,
    RiSettings4Line,
} from '@remixicon/react';
import { AppShell } from '@/components/layout/app-shell';
import type { SidebarConfig } from '@/components/layout/app-sidebar';
import { PeptifulLogomark } from '@/components/logo';
import { labApi } from '@/lib/api-client';

import { LabProvider, useLab } from './context';

function LabShell({ children }: { children: React.ReactNode }) {
    const { user } = useLab();
    const [pendingPOs, setPendingPOs] = useState<number>(0);

    useEffect(() => {
        labApi.getNavBadges()
            .then((data) => setPendingPOs(data.pendingPOs || 0))
            .catch(() => { });
    }, []);

    const labSidebarConfig: SidebarConfig = {
        logo: <PeptifulLogomark variant='gradient' className='size-8' />,
        title: 'Peptiful',
        subtitle: 'Lab Console',
        navItems: [
            { label: 'Overview', href: '/lab', icon: RiHome5Line },
            { label: 'Purchase Orders', href: '/lab/purchase-orders', icon: RiFileList3Line, badge: pendingPOs > 0 ? pendingPOs : undefined },
            { label: 'Earnings', href: '/lab/earnings', icon: RiBarChartBoxLine },
            { label: 'Payouts', href: '/lab/payouts', icon: RiWallet3Line },
            { label: 'Settings', href: '/lab/settings', icon: RiSettings4Line },
        ],
        user: user
            ? { name: user.name, email: user.email }
            : { name: 'Loading...', email: '' },
    };

    return <AppShell sidebarConfig={labSidebarConfig}>{children}</AppShell>;
}

export default function LabLayout({ children }: { children: React.ReactNode }) {
    return (
        <LabProvider>
            <LabShell>{children}</LabShell>
        </LabProvider>
    );
}
