'use client';

import * as React from 'react';
import { cn } from '@/utils/cn';
import { StatCard } from '@/components/ui/stat-card-new';
import { PageHeader } from '@/components/ui/page-header-new';
import { Badge } from '@/components/ui/badge-new';
import { Button } from '@/components/ui/button-new';
import {
  RiTeamLine,
  RiUserLine,
  RiMoneyDollarCircleLine,
  RiSearchLine,
  RiAddLine,
  RiFileCopyLine,
  RiCheckLine,
  RiArrowDownSLine,
  RiMoreLine,
  RiMailLine,
  RiCloseLine,
} from '@remixicon/react';
import { brandApi } from '@/lib/api-client';

export default function AffiliatesPage() {
  const [expandedRows, setExpandedRows] = React.useState<Set<string>>(new Set());
  const [showInvite, setShowInvite] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [affiliates, setAffiliates] = React.useState<any[]>([]);
  const [stats, setStats] = React.useState<any>(null);
  const [inviteLink, setInviteLink] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [total, setTotal] = React.useState(0);
  const [inviteEmail, setInviteEmail] = React.useState('');
  const [sendingInvite, setSendingInvite] = React.useState(false);
  const limit = 10;

  const fetchData = async () => {
    setLoading(true);
    try {
      const [affRes, statsRes, linkRes] = await Promise.all([
        brandApi.getAffiliates({ search, page, limit }),
        brandApi.getAffiliateStats(),
        brandApi.getInviteLink(),
      ]);
      setAffiliates(affRes.data || []);
      setTotal(affRes.total || 0);
      setStats(statsRes);
      setInviteLink(linkRes.url);
    } catch (error) {
      console.error('Failed to fetch affiliates data:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [search, page]);

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendInvite = async () => {
    if (!inviteEmail) return;
    setSendingInvite(true);
    try {
      await brandApi.inviteAffiliate(inviteEmail);
      setInviteEmail('');
      alert('Invitation sent successfully!');
    } catch (e) {
      alert('Failed to send invitation');
    } finally {
      setSendingInvite(false);
    }
  };

  return (
    <div className='space-y-6'>
      <PageHeader
        title='Affiliates'
        description='Manage your affiliate network and track commissions'
        actions={
          <Button size='md' onClick={() => setShowInvite(true)}>
            <RiAddLine className='size-4' />
            Invite Affiliate
          </Button>
        }
      />

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <StatCard title='Total Affiliates' value={stats?.totalCount || 0} icon={RiTeamLine} />
        <StatCard title='L1 Active' value={stats?.l1Count || 0} icon={RiUserLine} />
        <StatCard title='L2 Active' value={stats?.l2Count || 0} icon={RiUserLine} />
        <StatCard title='Commissions Generated' value={`$${(stats?.commissionsGenerated || 0).toLocaleString()}`} icon={RiMoneyDollarCircleLine} />
      </div>

      {/* Search */}
      <div className='flex items-center gap-3'>
        <div className='relative flex-1 max-w-sm'>
          <RiSearchLine className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-soft-400' />
          <input
            placeholder='Search affiliates...'
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className='h-9 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 pl-9 pr-3 text-paragraph-sm text-text-strong-950 placeholder:text-text-disabled-300 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16'
          />
        </div>
      </div>

      {/* Affiliates Table */}
      <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs overflow-hidden'>
        {loading ? (
          <div className='flex items-center justify-center p-24'>
            <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-primary-base' />
          </div>
        ) : (
          <table className='w-full'>
            <thead>
              <tr className='border-b border-stroke-soft-200 bg-bg-weak-50'>
                <th className='w-8 px-5 py-3' />
                <th className='px-5 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600'>Name</th>
                <th className='px-5 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600'>Type</th>
                <th className='px-5 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600'>Orders</th>
                <th className='px-5 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600'>Revenue</th>
                <th className='px-5 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600'>Rate</th>
                <th className='px-5 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600'>Status</th>
                <th className='w-10 px-5 py-3' />
              </tr>
            </thead>
            <tbody>
              {affiliates.map((aff) => {
                const l1 = aff.affiliate;
                const hasL2s = aff.l2s && aff.l2s.length > 0;

                return (
                  <React.Fragment key={aff.id}>
                    <tr
                      className={cn(
                        'border-b border-stroke-soft-200 transition-colors cursor-pointer hover:bg-bg-weak-50',
                        expandedRows.has(aff.id) && 'bg-bg-weak-50',
                      )}
                      onClick={() => hasL2s && toggleRow(aff.id)}
                    >
                      <td className='px-5 py-3.5'>
                        {hasL2s && (
                          <RiArrowDownSLine
                            className={cn(
                              'size-4 text-text-soft-400 transition-transform',
                              expandedRows.has(aff.id) && 'rotate-180',
                            )}
                          />
                        )}
                      </td>
                      <td className='px-5 py-3.5'>
                        <div>
                          <p className='text-label-sm text-text-strong-950'>{l1.name}</p>
                          <p className='text-paragraph-xs text-text-sub-600'>{l1.email}</p>
                        </div>
                      </td>
                      <td className='px-5 py-3.5'>
                        <Badge variant='light' color='primary' size='sm'>L1</Badge>
                        {hasL2s && (
                          <span className='ml-1.5 text-paragraph-xs text-text-soft-400'>
                            ({aff.l2s.length} L2s)
                          </span>
                        )}
                      </td>
                      <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{aff.stats?.ordersCount || 0}</td>
                      <td className='px-5 py-3.5 text-label-sm text-text-strong-950'>${Number(aff.stats?.totalRevenue || 0).toLocaleString()}</td>
                      <td className='px-5 py-3.5'>
                        <span className='text-paragraph-sm text-text-sub-600'>{aff.commissionRate}%</span>
                        {aff.overrideRate > 0 && (
                          <span className='ml-1 text-paragraph-xs text-text-soft-400'>
                            +{aff.overrideRate}% override
                          </span>
                        )}
                      </td>
                      <td className='px-5 py-3.5'>
                        <Badge variant='light' color={aff.status === 'ACTIVE' ? 'success' : 'error'} size='sm' dot className="hidden sm:inline-flex">
                          {aff.status.charAt(0).toUpperCase() + aff.status.slice(1).toLowerCase()}
                        </Badge>
                      </td>
                      <td className='px-5 py-3.5'>
                        <Button variant='ghost' size='xs' iconOnly onClick={(e) => e.stopPropagation()}>
                          <RiMoreLine className='size-4' />
                        </Button>
                      </td>
                    </tr>
                    {/* L2 rows */}
                    {expandedRows.has(aff.id) &&
                      aff.l2s.map((l2: any) => (
                        <tr key={l2.id} className='border-b border-stroke-soft-200 bg-bg-weak-50/60'>
                          <td className='px-5 py-3' />
                          <td className='px-5 py-3'>
                            <div className='pl-6 border-l-2 border-stroke-soft-200 ml-1'>
                              <p className='text-label-sm text-text-strong-950'>{l2.affiliate?.name}</p>
                              <p className='text-paragraph-xs text-text-sub-600'>{l2.affiliate?.email}</p>
                            </div>
                          </td>
                          <td className='px-5 py-3'>
                            <Badge variant='stroke' color='gray' size='sm'>L2</Badge>
                          </td>
                          <td className='px-5 py-3 text-paragraph-sm text-text-sub-600'>{l2.stats?.ordersCount || 0}</td>
                          <td className='px-5 py-3 text-label-sm text-text-strong-950'>${Number(l2.stats?.totalRevenue || 0).toLocaleString()}</td>
                          <td className='px-5 py-3 text-paragraph-sm text-text-sub-600'>{l2.commissionRate}%</td>
                          <td className='px-5 py-3'>
                            <Badge variant='light' color={l2.status === 'ACTIVE' ? 'success' : 'error'} size='sm' dot className="hidden sm:inline-flex">
                              {l2.status.charAt(0).toUpperCase() + l2.status.slice(1).toLowerCase()}
                            </Badge>
                          </td>
                          <td className='px-5 py-3'>
                            <Button variant='ghost' size='xs' iconOnly>
                              <RiMoreLine className='size-4' />
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </React.Fragment>
                );
              })}
              {affiliates.length === 0 && (
                <tr>
                  <td colSpan={8} className='px-5 py-12 text-center text-text-sub-600'>No affiliates found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {total > limit && (
        <div className='flex items-center justify-between border-t border-stroke-soft-200 pt-4'>
          <p className='text-paragraph-sm text-text-sub-600'>Showing {(page - 1) * limit + 1}-{Math.min(page * limit, total)} of {total} affiliates</p>
          <div className='flex items-center gap-2'>
            <Button variant='ghost' size='xs' disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</Button>
            <Button variant='ghost' size='xs' disabled={page * limit >= total} onClick={() => setPage(page + 1)}>Next</Button>
          </div>
        </div>
      )}

      {/* Invite Modal */}
      {showInvite && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-overlay'>
          <div className='w-full max-w-md rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-6 shadow-complex mx-4'>
            <div className='flex items-center justify-between mb-5'>
              <h3 className='text-label-lg text-text-strong-950'>Invite Affiliate</h3>
              <Button variant='ghost' size='xs' iconOnly onClick={() => setShowInvite(false)}>
                <RiCloseLine className='size-5' />
              </Button>
            </div>
            <p className='mb-4 text-paragraph-sm text-text-sub-600'>
              Share this link to invite L1 affiliates to your brand.
            </p>
            <div className='flex items-center gap-2 rounded-10 border border-stroke-soft-200 bg-bg-weak-50 px-3 py-2.5'>
              <span className='flex-1 truncate text-paragraph-sm text-text-sub-600'>
                {inviteLink || 'Generating link...'}
              </span>
              <Button variant='secondary' size='xs' onClick={handleCopy} disabled={!inviteLink}>
                {copied ? <RiCheckLine className='size-3.5' /> : <RiFileCopyLine className='size-3.5' />}
                {copied ? 'Copied' : 'Copy'}
              </Button>
            </div>
            <div className='mt-4'>
              <p className='mb-2 text-label-xs text-text-sub-600'>Or invite by email</p>
              <div className='flex gap-2'>
                <div className='relative flex-1'>
                  <RiMailLine className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-soft-400' />
                  <input
                    placeholder='affiliate@email.com'
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className='h-9 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 pl-9 pr-3 text-paragraph-sm placeholder:text-text-disabled-300 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16'
                  />
                </div>
                <Button size='md' onClick={handleSendInvite} disabled={sendingInvite || !inviteEmail}>
                  {sendingInvite ? 'Sending...' : 'Send'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
