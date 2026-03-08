'use client';

import * as React from 'react';
import { cn } from '@/utils/cn';
import { PageHeader } from '@/components/ui/page-header-new';
import { Button } from '@/components/ui/button-new';
import { Badge } from '@/components/ui/badge-new';
import { adminApi } from '@/lib/api-client';

function Toggle({ checked, onChange, disabled }: { checked: boolean; onChange: (val: boolean) => void; disabled?: boolean }) {
  return (
    <button
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors cursor-pointer',
        checked ? 'bg-primary-base' : 'bg-bg-soft-200',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      <span className={cn('inline-block size-4 rounded-full bg-white shadow-switch-thumb transition-transform', checked ? 'translate-x-[18px]' : 'translate-x-0.5')} />
    </button>
  );
}

export default function AdminSettingsPage() {
  const [data, setData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [message, setMessage] = React.useState({ text: '', type: '' });

  const fetchData = async () => {
    try {
      const res = await adminApi.getSettings();
      setData(res);
    } catch (err) {
      console.error('Failed to fetch settings:', err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleSaveSettings = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ text: '', type: '' });

    const formData = new FormData(e.currentTarget);
    const settings = {
      platform_name: formData.get('platform_name'),
      support_email: formData.get('support_email'),
      default_partner_commission_rate: formData.get('default_partner_commission_rate'),
    };

    try {
      await adminApi.updateSettings(settings);
      setMessage({ text: 'Settings updated successfully', type: 'success' });
      fetchData();
    } catch (err) {
      setMessage({ text: 'Failed to update settings', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleToggleFlag = async (key: string, enabled: boolean) => {
    try {
      await adminApi.updateFeatureFlags({ [key]: enabled });
      fetchData();
    } catch (err) {
      console.error('Failed to toggle flag:', err);
    }
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center p-12'>
        <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-primary-base' />
      </div>
    );
  }

  const settings = Object.fromEntries(data.settings.map((s: any) => [s.key, s.value]));
  const flags = Object.fromEntries(data.flags.map((f: any) => [f.key, f.enabled]));

  return (
    <div className='space-y-6'>
      <PageHeader title='Platform Settings' description='Global configuration for the Peptiful platform' />

      {message.text && (
        <div className={cn(
          'rounded-10 p-3 text-paragraph-sm',
          message.type === 'success' ? 'bg-success-lighter text-success-base' : 'bg-error-lighter text-error-base'
        )}>
          {message.text}
        </div>
      )}

      <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-6 shadow-regular-xs'>
        <form onSubmit={handleSaveSettings} className='max-w-lg space-y-6'>
          <h3 className='text-label-lg text-text-strong-950'>General</h3>
          <div className='space-y-1.5'>
            <label className='text-label-sm text-text-strong-950'>Platform Name</label>
            <input
              name='platform_name'
              defaultValue={settings.platform_name || 'Peptiful'}
              className='h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16'
            />
          </div>
          <div className='space-y-1.5'>
            <label className='text-label-sm text-text-strong-950'>Support Email</label>
            <input
              name='support_email'
              defaultValue={settings.support_email || 'support@peptiful.com'}
              className='h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16'
            />
          </div>
          <div className='space-y-1.5'>
            <label className='text-label-sm text-text-strong-950'>Default Partner Commission Rate</label>
            <div className='flex items-center gap-2'>
              <input
                name='default_partner_commission_rate'
                defaultValue={settings.default_partner_commission_rate || '10'}
                type='number'
                className='h-10 w-24 rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16'
              />
              <span className='text-label-sm text-text-sub-600'>%</span>
            </div>
          </div>
          <Button type='submit' disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </div>

      <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-6 shadow-regular-xs'>
        <h3 className='mb-4 text-label-lg text-text-strong-950'>Feature Flags</h3>
        <div className='max-w-lg space-y-4'>
          {[
            { key: 'brand_self_registration', label: 'Brand Self-Registration', desc: 'Allow brands to sign up without partner referral' },
            { key: 'two_tier_affiliates', label: 'Two-Tier Affiliates', desc: 'Enable L1/L2 affiliate hierarchy' },
            { key: 'custom_domains', label: 'Custom Domains', desc: 'Allow brands to connect custom domains (Phase 2)' },
            { key: 'multi_currency', label: 'Multi-Currency', desc: 'Support international currencies (Phase 3)' },
            { key: 'api_access', label: 'API Access', desc: 'Public API for advanced partners' },
          ].map((f) => (
            <div key={f.key} className='flex items-center justify-between border-b border-stroke-soft-200 py-3 last:border-0'>
              <div>
                <div className='flex items-center gap-2'>
                  <p className='text-label-sm text-text-strong-950'>{f.label}</p>
                  {/* Mark some features as draft if they are not in the flags yet or explicitly handled */}
                  {!['brand_self_registration', 'two_tier_affiliates'].includes(f.key) && flags[f.key] === undefined && (
                    <Badge variant='stroke' color='gray' size='sm'>Coming Soon</Badge>
                  )}
                </div>
                <p className='text-paragraph-xs text-text-sub-600'>{f.desc}</p>
              </div>
              <Toggle
                checked={flags[f.key] ?? false}
                onChange={(val) => handleToggleFlag(f.key, val)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
