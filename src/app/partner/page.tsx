'use client';

import Link from 'next/link';
import { cn } from '@/utils/cn';
import { StatCard } from '@/components/ui/stat-card-new';
import { Badge } from '@/components/ui/badge-new';
import { Button } from '@/components/ui/button-new';
import {
  RiBuilding2Line,
  RiMoneyDollarCircleLine,
  RiBarChartBoxLine,
  RiTeamLine,
  RiArrowRightLine,
  RiLink,
  RiFileCopyLine,
  RiCheckLine,
  RiExternalLinkLine,
} from '@remixicon/react';
import { partnerApi } from '@/lib/api-client';
import { AlertBanner } from '@/components/ui/alert-banner';
import * as React from 'react';

export default function PartnerHomePage() {
  const [copied, setCopied] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [profile, setProfile] = React.useState<any>(null);
  const [stats, setStats] = React.useState<any>(null);
  const [brands, setBrands] = React.useState<any[]>([]);
  const [referralLink, setReferralLink] = React.useState<any>(null);
  const [error, setError] = React.useState<string | null>(null);

  const fetchData = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [profileRes, statsRes, brandsRes, linkRes] = await Promise.all([
        partnerApi.getProfile(),
        partnerApi.getStats(),
        partnerApi.getBrands({ limit: 5 }),
        partnerApi.getReferralLink(),
      ]);
      setProfile(profileRes);
      setStats(statsRes);
      setBrands(brandsRes.data || []);
      setReferralLink(linkRes);
    } catch (error) {
      console.error('Failed to fetch partner data:', error);
      setError('Failed to load partner data. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCopy = () => {
    if (referralLink?.url) {
      navigator.clipboard.writeText(referralLink.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-4 border-primary-base border-t-transparent" />
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-start justify-between'>
        <div>
          <h1 className='text-title-h4 text-text-strong-950'>
            Welcome back, {profile?.user?.firstName || 'Partner'}
          </h1>
          <p className='mt-1 text-paragraph-sm text-text-sub-600'>Here&apos;s your partner performance overview</p>
        </div>
        <Button variant='secondary' size='sm' asChild>
          <Link href='/partner/referrals'>
            <RiLink className='size-4' />
            Referral Tools
          </Link>
        </Button>
      </div>

      {error && (
        <AlertBanner
          variant='error'
          title='Error'
          description={error || undefined}
          action={{
            label: 'Retry',
            onClick: () => fetchData()
          }}
        />
      )}

      {/* Referral Link Card */}
      <div className='rounded-xl border border-primary-alpha-16 bg-primary-alpha-10/30 p-5'>
        <div className='flex items-center justify-between gap-4'>
          <div>
            <p className='text-label-sm text-text-strong-950'>Your Referral Link</p>
            <p className='mt-0.5 text-paragraph-xs text-text-sub-600'>Share this to recruit new brands and earn ongoing commissions</p>
          </div>
          <div className='flex items-center gap-2 rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 py-2 shrink-0'>
            <span className='text-paragraph-sm text-text-sub-600 font-mono'>
              {referralLink?.url?.replace(/^https?:\/\//, '') || 'peptiful.com/join/...'}
            </span>
            <Button variant='secondary' size='xs' onClick={handleCopy} disabled={!referralLink?.url}>
              {copied ? <RiCheckLine className='size-3.5' /> : <RiFileCopyLine className='size-3.5' />}
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <StatCard
          title='Referred Brands'
          value={stats?.referredBrands || '0'}
          icon={RiBuilding2Line}
        />
        <StatCard
          title='Active Brands'
          value={stats?.activeBrands || '0'}
          icon={RiTeamLine}
        />
        <StatCard
          title='Total Earnings'
          value={`$${(stats?.totalEarnings || 0).toLocaleString()}`}
          icon={RiMoneyDollarCircleLine}
        />
        <StatCard
          title='Signups'
          value={stats?.totalSignups || '0'}
          change={`${stats?.totalClicks || 0} clicks`}
          icon={RiBarChartBoxLine}
        />
      </div>

      {/* Recent Brands */}
      <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs'>
        <div className='flex items-center justify-between border-b border-stroke-soft-200 px-5 py-4'>
          <h2 className='text-label-md text-text-strong-950'>Recent Brands</h2>
          <Button variant='ghost' size='sm' asChild>
            <Link href='/partner/brands'>View All <RiArrowRightLine className='size-4' /></Link>
          </Button>
        </div>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b border-stroke-soft-200 text-left'>
                {['Brand', 'Status', 'Orders', 'Earnings', 'Joined'].map((h) => (
                  <th key={h} className='px-5 py-3 text-label-xs uppercase tracking-wider text-text-sub-600 font-medium'>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {brands.length > 0 ? (
                brands.map((b: any) => (
                  <tr key={b.id} className='border-b border-stroke-soft-200 last:border-0 hover:bg-bg-weak-50 transition-colors'>
                    <td className='px-5 py-3.5'>
                      <div className='font-medium text-text-strong-950'>{b.name}</div>
                      <div className='text-paragraph-xs text-text-sub-600'>{b.slug}.peptiful.com</div>
                    </td>
                    <td className='px-5 py-3.5'>
                      <Badge variant='light' color={b.status === 'ACTIVE' ? 'success' : 'warning'} size='sm' dot>
                        {b.status}
                      </Badge>
                    </td>
                    <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{b._count?.orders || 0}</td>
                    <td className='px-5 py-3.5 text-label-sm text-text-strong-950'>
                      ${(b.totalPartnerEarnings || 0).toLocaleString()}
                    </td>
                    <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>
                      {new Date(b.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-paragraph-sm text-text-sub-600">
                    No brands referred yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div >
  );
}
