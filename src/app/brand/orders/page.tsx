'use client';

import { useState } from 'react';
import {
  RiFileList3Line,
  RiMoneyDollarCircleLine,
  RiTimeLine,
  RiCheckboxCircleLine,
  RiSearchLine,
  RiCalendarLine,
} from '@remixicon/react';
import { cn } from '@/utils/cn';
import { StatCard } from '@/components/ui/stat-card-new';
import { PageHeader } from '@/components/ui/page-header-new';
import { Badge } from '@/components/ui/badge-new';
import { Button } from '@/components/ui/button-new';

const STATUS_TABS = [
  { key: 'all', label: 'All', count: 156 },
  { key: 'new', label: 'New', count: 3 },
  { key: 'processing', label: 'Processing', count: 8 },
  { key: 'shipped', label: 'Shipped', count: 3 },
  { key: 'completed', label: 'Completed', count: 142 },
] as const;

const ORDERS = [
  {
    id: 'PG-1156',
    date: 'Feb 22 2026',
    customer: 'Alex Thompson',
    items: 2,
    total: 169.98,
    commission: 17.0,
    status: 'Delivered',
    statusColor: 'success' as const,
    tracking: '1Z999AA10123456784',
  },
  {
    id: 'PG-1155',
    date: 'Feb 22 2026',
    customer: 'Maria Garcia',
    items: 1,
    total: 89.99,
    commission: 9.0,
    status: 'Delivered',
    statusColor: 'success' as const,
    tracking: '1Z999AA10123456785',
  },
  {
    id: 'PG-1154',
    date: 'Feb 21 2026',
    customer: 'James Wilson',
    items: 3,
    total: 154.97,
    commission: 15.5,
    status: 'Shipped',
    statusColor: 'warning' as const,
    tracking: '1Z999AA10123456786',
  },
  {
    id: 'PG-1153',
    date: 'Feb 21 2026',
    customer: 'Emily Davis',
    items: 1,
    total: 42.0,
    commission: 4.2,
    status: 'Shipped',
    statusColor: 'warning' as const,
    tracking: '1Z999AA10123456787',
  },
  {
    id: 'PG-1152',
    date: 'Feb 20 2026',
    customer: 'Robert Brown',
    items: 2,
    total: 124.99,
    commission: 12.5,
    status: 'Processing',
    statusColor: 'information' as const,
    tracking: null,
  },
  {
    id: 'PG-1151',
    date: 'Feb 20 2026',
    customer: 'Lisa Anderson',
    items: 4,
    total: 209.97,
    commission: 21.0,
    status: 'Processing',
    statusColor: 'information' as const,
    tracking: null,
  },
  {
    id: 'PG-1150',
    date: 'Feb 19 2026',
    customer: 'David Martinez',
    items: 1,
    total: 79.99,
    commission: 8.0,
    status: 'Delivered',
    statusColor: 'success' as const,
    tracking: '1Z999AA10123456788',
  },
  {
    id: 'PG-1149',
    date: 'Feb 19 2026',
    customer: 'Sarah Johnson',
    items: 2,
    total: 134.98,
    commission: 13.5,
    status: 'New',
    statusColor: 'gray' as const,
    tracking: null,
  },
  {
    id: 'PG-1148',
    date: 'Feb 18 2026',
    customer: 'Chris Taylor',
    items: 1,
    total: 45.0,
    commission: 4.5,
    status: 'New',
    statusColor: 'gray' as const,
    tracking: null,
  },
  {
    id: 'PG-1147',
    date: 'Feb 18 2026',
    customer: 'Jennifer Lee',
    items: 3,
    total: 187.97,
    commission: 18.8,
    status: 'New',
    statusColor: 'gray' as const,
    tracking: null,
  },
];

export default function OrdersPage() {
  const [activeStatus, setActiveStatus] = useState<string>('all');

  return (
    <div className="space-y-6">
      <PageHeader
        title="Orders"
        description="Track and manage your store's orders"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Orders"
          value={156}
          icon={RiFileList3Line}
        />
        <StatCard
          title="Revenue Today"
          value="$1,245"
          change="+22%"
          trend="up"
          icon={RiMoneyDollarCircleLine}
        />
        <StatCard
          title="Pending Fulfillment"
          value={3}
          icon={RiTimeLine}
        />
        <StatCard
          title="Completed"
          value={142}
          icon={RiCheckboxCircleLine}
        />
      </div>

      <div className="flex flex-col gap-4 rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-4 shadow-regular-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2 overflow-x-auto">
          {STATUS_TABS.map((tab) => (
            <Button
              key={tab.key}
              variant="ghost"
              size="sm"
              className={cn(
                activeStatus === tab.key &&
                  'bg-primary-alpha-10 text-primary-base hover:bg-primary-alpha-16',
              )}
              onClick={() => setActiveStatus(tab.key)}
            >
              {tab.label} ({tab.count})
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-56 sm:w-64">
            <RiSearchLine className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-soft-400" />
            <input
              type="search"
              placeholder="Search orders..."
              className="h-9 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 pl-9 pr-3 text-label-sm text-text-strong-950 placeholder:text-text-soft-400 focus:border-primary-base focus:outline-none focus:ring-2 focus:ring-primary-alpha-10"
            />
          </div>
          <span className="flex items-center gap-1.5 text-paragraph-sm text-text-sub-600">
            <RiCalendarLine className="size-4 text-text-soft-400" />
            Last 30 days
          </span>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-stroke-soft-200 bg-bg-weak-50">
                <th className="px-4 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600">
                  Order #
                </th>
                <th className="px-4 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600">
                  Customer
                </th>
                <th className="px-4 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600">
                  Items
                </th>
                <th className="px-4 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600">
                  Total
                </th>
                <th className="px-4 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600">
                  Commission
                </th>
                <th className="px-4 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600">
                  Tracking
                </th>
              </tr>
            </thead>
            <tbody>
              {ORDERS.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-stroke-soft-200 transition-colors last:border-b-0 hover:bg-bg-weak-50"
                >
                  <td className="px-4 py-3 text-paragraph-sm font-medium text-text-strong-950">
                    #{order.id}
                  </td>
                  <td className="px-4 py-3 text-paragraph-sm text-text-sub-600">
                    {order.date}
                  </td>
                  <td className="px-4 py-3 text-paragraph-sm text-text-strong-950">
                    {order.customer}
                  </td>
                  <td className="px-4 py-3 text-paragraph-sm text-text-sub-600">
                    {order.items} {order.items === 1 ? 'item' : 'items'}
                  </td>
                  <td className="px-4 py-3 text-paragraph-sm font-medium text-text-strong-950">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-paragraph-sm text-text-sub-600">
                    ${order.commission.toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant="light"
                      color={order.statusColor}
                      size="sm"
                      dot
                    >
                      {order.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-paragraph-sm text-text-sub-600">
                    {order.tracking ? (
                      <a
                        href="#"
                        className="text-primary-base hover:underline"
                      >
                        {order.tracking}
                      </a>
                    ) : (
                      '—'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 border-t border-stroke-soft-200 pt-6 sm:flex-row">
        <p className="text-paragraph-sm text-text-sub-600">
          Showing 1-10 of 156 orders
        </p>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" disabled>
            Previous
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="min-w-[2rem]"
          >
            1
          </Button>
          <Button variant="ghost" size="sm">
            2
          </Button>
          <Button variant="ghost" size="sm">
            3
          </Button>
          <Button variant="ghost" size="sm">
            ...
          </Button>
          <Button variant="ghost" size="sm">
            16
          </Button>
          <Button variant="ghost" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
