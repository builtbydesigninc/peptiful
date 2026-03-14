'use client';

import * as React from 'react';
import { PageHeader } from '@/components/ui/page-header-new';
import { StatCard } from '@/components/ui/stat-card-new';
import { Badge } from '@/components/ui/badge-new';
import { Button } from '@/components/ui/button-new';
import {
  RiTeamLine,
  RiMoneyDollarCircleLine,
  RiAddLine,
  RiMoreLine,
  RiCheckLine,
  RiFileCopyLine,
  RiLoader4Line
} from '@remixicon/react';
import { useAffiliate } from '../context';
import { affiliateApi } from '@/lib/api-client';
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter } from '@/components/ui/modal';

export default function AffiliateTeamPage() {
  const { getSelectedBrand, isLoading: ctxLoading, user } = useAffiliate();
  const selectedBrand = getSelectedBrand();

  const [team, setTeam] = React.useState<any[]>([]);
  const [stats, setStats] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [inviteLoading, setInviteLoading] = React.useState(false);
  const [inviteLink, setInviteLink] = React.useState<string | null>(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (!selectedBrand?.id || user?.role === 'L2_AFFILIATE') return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const [teamData, statsData] = await Promise.all([
          affiliateApi.getTeam(selectedBrand.id),
          affiliateApi.getTeamStats(selectedBrand.id)
        ]);
        setTeam(teamData.data || []);
        setStats(statsData);
      } catch (error) {
        console.error('Failed to fetch team data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedBrand?.id, user?.role]);

  const handleRecruit = async () => {
    if (!selectedBrand?.id) return;
    setIsInviteModalOpen(true);
    setInviteLoading(true);
    setInviteLink(null);
    try {
      const result = await affiliateApi.generateTeamInvite(selectedBrand.id);
      setInviteLink(result.url);
    } catch (error) {
      console.error('Failed to generate invite:', error);
    } finally {
      setInviteLoading(false);
    }
  };

  const copyInvite = () => {
    if (inviteLink) {
      navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (ctxLoading) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <RiLoader4Line className='size-8 animate-spin text-text-soft-400' />
      </div>
    );
  }

  if (user?.role === 'L2_AFFILIATE') {
    return (
      <div className='flex h-64 flex-col items-center justify-center gap-2'>
        <p className='text-title-h5 text-text-strong-950'>Access Restricted</p>
        <p className='text-paragraph-sm text-text-sub-600 font-medium'>Only L1 affiliates can recruit and manage teams.</p>
      </div>
    );
  }

  if (!selectedBrand) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <p className='text-paragraph-sm text-text-sub-600 font-medium'>Please select a brand to view your team.</p>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <PageHeader
        title='My Team (L2 Affiliates)'
        description='Affiliates you&apos;ve recruited — you earn an override on their sales'
        actions={
          <Button size='md' onClick={handleRecruit}>
            <RiAddLine className='size-4' />
            Recruit L2
          </Button>
        }
      />

      <Modal open={isInviteModalOpen} onOpenChange={setIsInviteModalOpen}>
        <ModalContent className='max-w-md'>
          <ModalHeader>
            <ModalTitle>Recruit L2 Affiliate</ModalTitle>
            <ModalDescription>
              Share this link with potential promoters. When they sign up, they will be added to your team.
            </ModalDescription>
          </ModalHeader>

          <div className='space-y-4 py-4'>
            {inviteLoading ? (
              <div className='flex flex-col items-center justify-center py-8 gap-3'>
                <RiLoader4Line className='size-8 animate-spin text-primary-base' />
                <p className='text-paragraph-sm text-text-sub-600'>Generating your unique invite link...</p>
              </div>
            ) : inviteLink ? (
              <div className='space-y-3'>
                <div className='rounded-xl border border-primary-alpha-16 bg-primary-alpha-10/30 p-4'>
                  <p className='text-label-xs text-text-sub-600 mb-1'>Recruitment Link</p>
                  <p className='text-paragraph-sm text-text-strong-950 break-all font-mono bg-white/50 p-2 rounded border border-white/50'>{inviteLink}</p>
                </div>
                <Button className='w-full' onClick={copyInvite}>
                  {copied ? <RiCheckLine className='size-4' /> : <RiFileCopyLine className='size-4' />}
                  {copied ? 'Copied to Clipboard' : 'Copy Invite Link'}
                </Button>
              </div>
            ) : (
              <div className='text-center py-8 text-error-base'>
                Failed to generate invite link. Please try again.
              </div>
            )}

            <div className='rounded-lg bg-bg-weak-50 p-3'>
              <ul className='space-y-2'>
                <li className='flex gap-2 text-paragraph-xs text-text-sub-600'>
                  <span className='size-4 flex shrink-0 items-center justify-center rounded-full bg-primary-alpha-10 text-primary-base text-[10px] font-bold'>1</span>
                  Send this link to anyone who wants to promote {selectedBrand.name}.
                </li>
                <li className='flex gap-2 text-paragraph-xs text-text-sub-600'>
                  <span className='size-4 flex shrink-0 items-center justify-center rounded-full bg-primary-alpha-10 text-primary-base text-[10px] font-bold'>2</span>
                  They will see a sign-up page pre-filled with your referral code.
                </li>
                <li className='flex gap-2 text-paragraph-xs text-text-sub-600'>
                  <span className='size-4 flex shrink-0 items-center justify-center rounded-full bg-primary-alpha-10 text-primary-base text-[10px] font-bold'>3</span>
                  Once they register, they appear in your team list here.
                </li>
              </ul>
            </div>
          </div>

          <ModalFooter>
            <Button variant='secondary' onClick={() => setIsInviteModalOpen(false)} className='w-full'>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <div className='rounded-10 border border-information-light bg-information-lighter p-4 mb-2'>
        <p className='text-label-xs text-information-dark'>How L2 commission works</p>
        <p className='mt-1 text-paragraph-xs text-text-sub-600'>
          You set what % of <span className='font-medium'>your commission</span> each L2 earns. For example, if you earn 15% on a $150 sale ($22.50) and give an L2 30%, they get $6.75 and you keep $15.75. The brand always pays you the same amount.
        </p>
      </div>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
        <StatCard
          title='Total L2s'
          value={loading ? '—' : stats?.totalL2s ?? 0}
          icon={RiTeamLine}
        />
        <StatCard
          title='L2 Sales Revenue'
          value={loading ? '—' : `$${(stats?.l2Revenue ?? 0).toLocaleString()}`}
          trend='up'
        />
        <StatCard
          title='You Keep (after L2 split)'
          value={loading ? '—' : `$${(stats?.overrideKeep ?? 0).toLocaleString()}`}
          icon={RiMoneyDollarCircleLine}
        />
      </div>

      <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs overflow-hidden'>
        {loading ? (
          <div className='flex h-64 items-center justify-center'>
            <RiLoader4Line className='size-8 animate-spin text-text-soft-400' />
          </div>
        ) : team.length === 0 ? (
          <div className='p-12 text-center'>
            <p className='text-paragraph-sm text-text-sub-600'>You haven&apos;t recruited any L2 affiliates yet.</p>
          </div>
        ) : (
          <table className='w-full text-nowrap'>
            <thead>
              <tr className='border-b border-stroke-soft-200 bg-bg-weak-50'>
                {['Name', 'Orders', 'Revenue', 'Their Cut', 'They Earned', 'You Keep', 'Status', ''].map((h) => (
                  <th key={h} className='px-5 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600'>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {team.map((l2) => (
                <tr key={l2.id} className='border-b border-stroke-soft-200 last:border-0 hover:bg-bg-weak-50 transition-colors'>
                  <td className='px-5 py-3.5'>
                    <p className='text-label-sm text-text-strong-950'>{l2.user?.fullName || l2.invitedEmail}</p>
                    <p className='text-paragraph-xs text-text-sub-600'>{l2.user?.email || l2.invitedEmail}</p>
                  </td>
                  <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{l2.stats?.orders ?? 0}</td>
                  <td className='px-5 py-3.5 text-label-sm text-text-strong-950'>${(l2.stats?.revenue ?? 0).toLocaleString()}</td>
                  <td className='px-5 py-3.5'><Badge variant='stroke' color='gray' size='sm'>{l2.commissionRate}% of yours</Badge></td>
                  <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>${(l2.stats?.l2Earned ?? 0).toLocaleString()}</td>
                  <td className='px-5 py-3.5 text-label-sm text-success-base'>${(l2.stats?.youKeep ?? 0).toLocaleString()}</td>
                  <td className='px-5 py-3.5'>
                    <Badge variant='light' color={l2.status === 'ACTIVE' ? 'success' : l2.status === 'PENDING' ? 'warning' : 'error'} size='sm' dot>
                      {l2.status.charAt(0) + l2.status.slice(1).toLowerCase()}
                    </Badge>
                  </td>
                  <td className='px-5 py-3.5'><Button variant='ghost' size='xs' iconOnly><RiMoreLine className='size-4' /></Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
