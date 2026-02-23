'use client';

import * as React from 'react';
import { cn } from '@/utils/cn';
import { AppSidebar, type SidebarConfig } from './app-sidebar';

export function AppShell({
  children,
  sidebarConfig,
}: {
  children: React.ReactNode;
  sidebarConfig: SidebarConfig;
}) {
  return (
    <div className='min-h-screen bg-bg-weak-50'>
      <AppSidebar config={sidebarConfig} />
      <main className='ml-[260px] min-h-screen transition-all duration-300 peer-[[data-collapsed=true]]:ml-[68px]'>
        <div className='mx-auto max-w-[1400px] px-6 py-6 lg:px-8'>
          {children}
        </div>
      </main>
    </div>
  );
}
