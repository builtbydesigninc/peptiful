'use client';

import * as React from 'react';
import { PageHeader } from '@/components/ui/page-header-new';
import { Button } from '@/components/ui/button-new';
import {
  RiFileCopyLine,
  RiCheckLine,
  RiInstagramLine,
  RiTwitterXLine,
  RiFacebookLine,
  RiWhatsappLine,
  RiTelegramLine,
  RiMailLine,
  RiTiktokLine,
  RiLoader4Line
} from '@remixicon/react';
import { useAffiliate } from '../context';
import { affiliateApi } from '@/lib/api-client';

const PLATFORM_ICONS: Record<string, any> = {
  INSTAGRAM: { icon: RiInstagramLine, color: 'bg-pink-50 text-pink-600' },
  TWITTER: { icon: RiTwitterXLine, color: 'bg-gray-100 text-gray-800' },
  FACEBOOK: { icon: RiFacebookLine, color: 'bg-blue-50 text-blue-600' },
  WHATSAPP: { icon: RiWhatsappLine, color: 'bg-green-50 text-green-600' },
  TELEGRAM: { icon: RiTelegramLine, color: 'bg-sky-50 text-sky-600' },
  EMAIL: { icon: RiMailLine, color: 'bg-orange-50 text-orange-600' },
  TIKTOK: { icon: RiTiktokLine, color: 'bg-black text-white' },
};

export default function PromoterSharePage() {
  const { getSelectedBrand, isLoading: ctxLoading } = useAffiliate();
  const selectedBrand = getSelectedBrand();

  const [templates, setTemplates] = React.useState<any[]>([]);
  const [links, setLinks] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [copied, setCopied] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!selectedBrand?.id) return;

    const fetchShareData = async () => {
      setLoading(true);
      try {
        const [templatesData, linksData] = await Promise.all([
          affiliateApi.getShareTemplates(selectedBrand.id),
          affiliateApi.getShareLinks(selectedBrand.id)
        ]);
        setTemplates(templatesData);
        setLinks(linksData);
      } catch (error) {
        console.error('Failed to fetch share toolkit:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchShareData();
  }, [selectedBrand?.id]);

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const shareToPlatform = (url: string) => {
    window.open(url, '_blank');
  };

  if (ctxLoading) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <RiLoader4Line className='size-8 animate-spin text-text-soft-400' />
      </div>
    );
  }

  if (!selectedBrand) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <p className='text-paragraph-sm text-text-sub-600'>Please select a brand to view your share toolkit.</p>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <PageHeader title='Share Toolkit' description='Ready-to-use content for your social channels' />

      <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-6 shadow-regular-xs transition-all hover:shadow-regular-sm'>
        <h3 className='mb-4 text-label-md text-text-strong-950 font-semibold'>Quick Share Links</h3>
        <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6'>
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className='h-24 rounded-xl bg-bg-weak-50 animate-pulse' />
            ))
          ) : links.length === 0 ? (
            <p className='col-span-full py-4 text-center text-paragraph-sm text-text-sub-600'>No links available.</p>
          ) : (
            links.map((s) => {
              const platformInfo = PLATFORM_ICONS[s.platform] || { icon: RiCheckLine, color: 'bg-bg-weak-50 text-text-sub-600' };
              const Icon = platformInfo.icon;
              return (
                <button
                  key={s.platform}
                  onClick={() => shareToPlatform(s.url)}
                  className='flex flex-col items-center gap-2 rounded-xl border border-stroke-soft-200 p-4 transition-all hover:shadow-regular-xs hover:border-primary-alpha-24 cursor-pointer group'
                >
                  <div className={`flex size-12 items-center justify-center rounded-full transition-transform group-hover:scale-110 ${platformInfo.color}`}>
                    <Icon className='size-6' />
                  </div>
                  <span className='text-label-xs text-text-strong-950 font-medium'>{s.platform.charAt(0) + s.platform.slice(1).toLowerCase()}</span>
                </button>
              );
            })
          )}
        </div>
      </div>

      <div className='space-y-4'>
        <h3 className='text-label-md text-text-strong-950 font-semibold'>Content Templates</h3>
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className='h-32 rounded-xl bg-bg-weak-50 animate-pulse' />
          ))
        ) : templates.length === 0 ? (
          <div className='rounded-xl border border-dashed border-stroke-soft-200 p-12 text-center'>
            <p className='text-paragraph-sm text-text-sub-600'>No templates found for this brand yet.</p>
          </div>
        ) : (
          templates.map((t) => (
            <div key={t.id} className='group rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-5 shadow-regular-xs transition-all hover:shadow-regular-sm'>
              <div className='flex items-center justify-between mb-3'>
                <div className='flex items-center gap-2'>
                  <p className='text-label-sm text-text-strong-950 font-semibold'>{t.label}</p>
                  <span className='rounded-full bg-bg-weak-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-text-sub-600 ring-1 ring-inset ring-stroke-soft-200'>
                    {t.platform}
                  </span>
                </div>
                <Button variant='secondary' size='xs' onClick={() => copy(t.text, t.id)}>
                  {copied === t.id ? <RiCheckLine className='size-3.5' /> : <RiFileCopyLine className='size-3.5' />}
                  {copied === t.id ? 'Copied' : 'Copy Text'}
                </Button>
              </div>
              <p className='rounded-10 bg-bg-weak-50 p-4 text-paragraph-sm text-text-sub-800 border border-stroke-soft-100 whitespace-pre-wrap leading-relaxed'>
                {t.text}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
