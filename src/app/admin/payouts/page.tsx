'use client';

import * as React from 'react';
import { PageHeader } from '@/components/ui/page-header-new';
import { StatCard } from '@/components/ui/stat-card-new';
import { Badge } from '@/components/ui/badge-new';
import { Button } from '@/components/ui/button-new';
import { RiWallet3Line, RiTimeLine, RiCheckboxCircleLine, RiMoneyDollarCircleLine } from '@remixicon/react';
import { adminApi } from '@/lib/api-client';

export default function AdminPayoutsPage() {
  const [payouts, setPayouts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [stats, setStats] = React.useState<any>(null);

  const fetchPayouts = async () => {
    setLoading(true);
    try {
      const response: any = await adminApi.getPayouts();
      const data = Array.isArray(response) ? response : (response.data || []);
      setPayouts(data);
      // Mock stats based on data for now or fetch from a stats endpoint
      const totalPending = data.filter((p: any) => p.status === 'PENDING').reduce((acc: number, p: any) => acc + parseFloat(p.amount), 0);
      const totalCompleted = data.filter((p: any) => p.status === 'COMPLETED').reduce((acc: number, p: any) => acc + parseFloat(p.amount), 0);
      setStats({
        pendingPayouts: `$${totalPending.toFixed(2)}`,
        processedThisMonth: `$${totalCompleted.toFixed(2)}`,
        totalPaid: `$${totalCompleted.toFixed(2)}`,
        queueCount: data.filter((p: any) => p.status === 'PENDING').length
      });
    } catch (error) {
      console.error('Failed to fetch payouts:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchPayouts();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      await adminApi.approvePayout(id);
      fetchPayouts();
    } catch (error) {
      console.error('Failed to approve payout:', error);
    }
  };

  if (loading || !stats) {
    return (
      <div className='flex items-center justify-center p-12'>
        <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-primary-base' />
      </div>
    );
  }

  const pendingPayouts = payouts.filter(p => p.status === 'PENDING');
  const processedPayouts = payouts.filter(p => p.status !== 'PENDING');

  return (
    <div className='space-y-6'>
      <PageHeader title='Payouts' description='Manage payout queue and history' actions={<Button size='md' onClick={() => { }}>Process All Pending</Button>} />
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <StatCard title='Pending Payouts' value={stats.pendingPayouts} icon={RiTimeLine} />
        <StatCard title='Processed This Month' value={stats.processedThisMonth} icon={RiCheckboxCircleLine} />
        <StatCard title='Total Paid (All Time)' value={stats.totalPaid} icon={RiMoneyDollarCircleLine} />
        <StatCard title='Payout Queue' value={`${stats.queueCount} items`} icon={RiWallet3Line} />
      </div>

      <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs overflow-hidden'>
        <div className='border-b border-stroke-soft-200 px-5 py-4'>
          <h3 className='text-label-md text-text-strong-950'>Payout Queue</h3>
        </div>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-stroke-soft-200 bg-bg-weak-50'>
              {['Recipient', 'Type', 'Amount', 'Date', 'Status', ''].map((h) => (
                <th key={h} className='px-5 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600'>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pendingPayouts.map((p) => (
              <tr key={p.id} className='border-b border-stroke-soft-200 last:border-0 hover:bg-bg-weak-50 transition-colors'>
                <td className='px-5 py-3.5'>
                  <div className='text-label-sm text-text-strong-950'>{p.recipientName || 'Untitled'}</div>
                  <div className='text-xs text-text-sub-600'>{p.recipientEmail}</div>
                </td>
                <td className='px-5 py-3.5'><Badge variant='light' color={p.recipientType === 'PARTNER' ? 'warning' : 'primary'} size='sm'>{p.recipientType}</Badge></td>
                <td className='px-5 py-3.5 text-label-sm text-text-strong-950'>${p.amount}</td>
                <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{new Date(p.createdAt).toLocaleDateString()}</td>
                <td className='px-5 py-3.5'>
                  <Badge variant='light' color='warning' size='sm' dot>Pending</Badge>
                </td>
                <td className='px-5 py-3.5'>
                  <Button variant='secondary' size='xs' onClick={() => handleApprove(p.id)}>Approve</Button>
                </td>
              </tr>
            ))}
            {pendingPayouts.length === 0 && (
              <tr>
                <td colSpan={6} className='px-5 py-12 text-center text-text-sub-600'>Queue is empty</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs overflow-hidden'>
        <div className='border-b border-stroke-soft-200 px-5 py-4'>
          <h3 className='text-label-md text-text-strong-950'>Recent Payouts</h3>
        </div>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-stroke-soft-200 bg-bg-weak-50'>
              {['ID', 'Recipient', 'Amount', 'Date', 'Status'].map((h) => (
                <th key={h} className='px-5 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600'>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {processedPayouts.map((p) => (
              <tr key={p.id} className='border-b border-stroke-soft-200 last:border-0 hover:bg-bg-weak-50 transition-colors'>
                <td className='px-5 py-3.5 text-label-sm text-text-sub-600'>{p.id.slice(0, 8)}</td>
                <td className='px-5 py-3.5 text-label-sm text-text-strong-950'>{p.recipientName}</td>
                <td className='px-5 py-3.5 text-label-sm text-text-strong-950'>${p.amount}</td>
                <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{new Date(p.createdAt).toLocaleDateString()}</td>
                <td className='px-5 py-3.5'>
                  <Badge variant='light' color={p.status === 'COMPLETED' ? 'success' : 'error'} size='sm' dot>
                    {p.status.charAt(0).toUpperCase() + p.status.slice(1).toLowerCase()}
                  </Badge>
                </td>
              </tr>
            ))}
            {processedPayouts.length === 0 && (
              <tr>
                <td colSpan={5} className='px-5 py-12 text-center text-text-sub-600'>No recent payouts</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
