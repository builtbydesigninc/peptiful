'use client';

import * as React from 'react';
import { PageHeader } from '@/components/ui/page-header-new';
import { Button } from '@/components/ui/button-new';
import { RiFileCopyLine, RiCheckLine, RiInstagramLine, RiTwitterLine, RiFacebookLine, RiWhatsappLine, RiTelegramLine, RiMailLine } from '@remixicon/react';

const shareTemplates = [
  { label: 'Instagram Story', text: 'Use my code MIKE10 for 10% off premium peptides at PeptideGains! 💪 Link in bio.' },
  { label: 'Twitter Post', text: "I've been using @PeptideGains for my supplement needs. Use code MIKE10 for 10% off your first order! 🧬" },
  { label: 'Text / WhatsApp', text: "Hey! I found this amazing peptide brand. Use my code MIKE10 at peptidegains.peptiful.com for 10% off!" },
];

export default function PromoterSharePage() {
  const [copied, setCopied] = React.useState<string | null>(null);
  const copy = (key: string) => { setCopied(key); setTimeout(() => setCopied(null), 2000); };

  return (
    <div className='space-y-6'>
      <PageHeader title='Share Toolkit' description='Ready-to-use content for your social channels' />

      <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-6 shadow-regular-xs'>
        <h3 className='mb-4 text-label-md text-text-strong-950'>Share Your Link</h3>
        <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6'>
          {[
            { label: 'Instagram', icon: RiInstagramLine, color: 'bg-pink-50 text-pink-600' },
            { label: 'Twitter', icon: RiTwitterLine, color: 'bg-gray-100 text-gray-800' },
            { label: 'Facebook', icon: RiFacebookLine, color: 'bg-blue-50 text-blue-600' },
            { label: 'WhatsApp', icon: RiWhatsappLine, color: 'bg-green-50 text-green-600' },
            { label: 'Telegram', icon: RiTelegramLine, color: 'bg-sky-50 text-sky-600' },
            { label: 'Email', icon: RiMailLine, color: 'bg-orange-50 text-orange-600' },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <button key={s.label} className='flex flex-col items-center gap-2 rounded-xl border border-stroke-soft-200 p-4 transition-all hover:shadow-regular-xs cursor-pointer'>
                <div className={`flex size-12 items-center justify-center rounded-full ${s.color}`}><Icon className='size-6' /></div>
                <span className='text-label-xs text-text-strong-950'>{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className='space-y-4'>
        <h3 className='text-label-md text-text-strong-950'>Copy-Paste Templates</h3>
        {shareTemplates.map((t) => (
          <div key={t.label} className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-5 shadow-regular-xs'>
            <div className='flex items-center justify-between mb-3'>
              <p className='text-label-sm text-text-strong-950'>{t.label}</p>
              <Button variant='secondary' size='xs' onClick={() => copy(t.label)}>
                {copied === t.label ? <RiCheckLine className='size-3.5' /> : <RiFileCopyLine className='size-3.5' />}
                {copied === t.label ? 'Copied' : 'Copy'}
              </Button>
            </div>
            <p className='rounded-10 bg-bg-weak-50 p-3 text-paragraph-sm text-text-sub-600'>{t.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
