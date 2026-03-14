'use client';

import * as React from 'react';
import { cn } from '@/utils/cn';
import { PageHeader } from '@/components/ui/page-header-new';
import { Button } from '@/components/ui/button-new';
import { brandApi } from '@/lib/api-client';
import {
  RiSettings4Line,
  RiPaintBrushLine,
  RiPercentLine,
  RiNotification3Line,
  RiUploadCloud2Line,
  RiGlobalLine,
  RiSecurePaymentLine,
  RiBankCardLine,
  RiAddLine,
} from '@remixicon/react';
import { Badge } from '@/components/ui/badge-new';

const tabs = [
  { id: 'general', label: 'General', icon: RiSettings4Line },
  { id: 'branding', label: 'Branding', icon: RiPaintBrushLine },
  { id: 'billing', label: 'Billing', icon: RiSecurePaymentLine },
  { id: 'commission', label: 'Commission', icon: RiPercentLine },
  { id: 'notifications', label: 'Notifications', icon: RiNotification3Line },
];

function FieldGroup({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div className='space-y-1.5'>
      <label className='text-label-sm text-text-strong-950'>{label}</label>
      {children}
      {hint && <p className='text-paragraph-xs text-text-soft-400'>{hint}</p>}
    </div>
  );
}

function InputField({ value, placeholder, prefix }: { value?: string; placeholder?: string; prefix?: string }) {
  return (
    <div className='flex'>
      {prefix && (
        <span className='flex items-center rounded-l-10 border border-r-0 border-stroke-soft-200 bg-bg-weak-50 px-3 text-paragraph-sm text-text-sub-600'>
          {prefix}
        </span>
      )}
      <input
        defaultValue={value}
        placeholder={placeholder}
        className={cn(
          'h-10 w-full border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 placeholder:text-text-disabled-300 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16',
          prefix ? 'rounded-r-10' : 'rounded-10',
        )}
      />
    </div>
  );
}

function Toggle({ defaultChecked }: { defaultChecked?: boolean }) {
  const [checked, setChecked] = React.useState(defaultChecked ?? false);
  return (
    <button
      onClick={() => setChecked(!checked)}
      className={cn(
        'relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors cursor-pointer',
        checked ? 'bg-primary-base' : 'bg-bg-soft-200',
      )}
    >
      <span
        className={cn(
          'inline-block size-4 rounded-full bg-white shadow-switch-thumb transition-transform',
          checked ? 'translate-x-[18px]' : 'translate-x-0.5',
        )}
      />
    </button>
  );
}

import { useEvents } from '@/hooks/use-events';
import { toast } from 'sonner';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = React.useState('general');
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [settings, setSettings] = React.useState<any>(null);
  const [dnsInfo, setDnsInfo] = React.useState<any>(null);

  const { socket } = useEvents(settings?.id);

  const fetchData = React.useCallback(async () => {
    try {
      const data = await brandApi.getSettings();
      setSettings(data);

      if (data?.branding?.customDomain) {
        const dnsData = await brandApi.getDnsStatus();
        setDnsInfo(dnsData);
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  React.useEffect(() => {
    if (!socket) return;

    socket.on('dns:update', (data: any) => {
      if (data.success) {
        toast.success('DNS Verified', {
          description: 'Your custom domain has been successfully verified.',
        });
        fetchData();
      } else {
        toast.error('DNS Verification Failed', {
          description: `Failed check: ${data.failedCheck}`,
        });
        fetchData();
      }
    });

    return () => {
      socket.off('dns:update');
    };
  }, [socket, fetchData]);

  const handleSaveGeneral = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      subdomain: formData.get('subdomain') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
    };

    try {
      await brandApi.updateGeneralSettings(data);
      await fetchData();
    } catch (error) {
      console.error('Failed to update general settings:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveBranding = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      primaryColor: formData.get('primaryColor') as string,
      description: formData.get('description') as string,
    };

    try {
      await brandApi.updateBrandingSettings(data);
      await fetchData();
    } catch (error) {
      console.error('Failed to update branding settings:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveBilling = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      company: formData.get('company') as string,
      address: formData.get('address') as string,
      city: formData.get('city') as string,
      state: formData.get('state') as string,
      zip: formData.get('zip') as string,
      country: 'US', // Default or handle from select
    };

    try {
      await brandApi.updateBillingInfo(data);
      await fetchData();
    } catch (error) {
      console.error('Failed to update billing info:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveCommission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      l1CommissionRate: Number(formData.get('l1CommissionRate')),
    };

    try {
      await brandApi.updateCommission(data);
      await fetchData();
    } catch (error) {
      console.error('Failed to update commission rate:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveNotifications = async (preferences: any) => {
    setSaving(true);
    try {
      await brandApi.updateNotificationPrefs(preferences);
      await fetchData();
    } catch (error) {
      console.error('Failed to update notification preferences:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleToggleAffiliate = async (enabled: boolean) => {
    setSaving(true);
    try {
      await brandApi.updateAffiliateToggle({ enabled });
      await fetchData();
    } catch (error) {
      console.error('Failed to toggle affiliate program:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleVerifyDns = async () => {
    setSaving(true);
    try {
      await brandApi.verifyDns();
      await fetchData();
    } catch (error) {
      console.error('DNS verification failed:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className='flex h-[400px] items-center justify-center'>
        <div className='size-8 animate-spin rounded-full border-4 border-primary-base border-t-transparent' />
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <PageHeader title='Store Settings' description='Configure your storefront and preferences' />

      {/* Tabs */}
      <div className='flex gap-1 overflow-x-auto rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-1 shadow-regular-xs scrollbar-none'>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 whitespace-nowrap rounded-10 px-4 py-2 text-label-sm transition-colors cursor-pointer',
                activeTab === tab.id
                  ? 'bg-primary-alpha-10 text-primary-base'
                  : 'text-text-sub-600 hover:bg-bg-weak-50 hover:text-text-strong-950',
              )}
            >
              <Icon className='size-4' />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-6 shadow-regular-xs'>
        {activeTab === 'general' && (
          <form onSubmit={handleSaveGeneral} className='max-w-lg space-y-6'>
            <h3 className='text-label-lg text-text-strong-950'>General Settings</h3>
            <FieldGroup label='Store Name'>
              <input
                name='name'
                defaultValue={settings?.general?.name}
                className='h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 placeholder:text-text-disabled-300 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16'
              />
            </FieldGroup>
            <FieldGroup label='Subdomain' hint='Your storefront URL'>
              <div className='flex items-center gap-2'>
                <div className='flex flex-1'>
                  <span className='flex items-center rounded-l-10 border border-r-0 border-stroke-soft-200 bg-bg-weak-50 px-3 text-paragraph-sm text-text-sub-600'>
                    https://
                  </span>
                  <input
                    name='subdomain'
                    defaultValue={settings?.general?.slug}
                    className='h-10 w-full rounded-r-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 placeholder:text-text-disabled-300 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16'
                  />
                </div>
                <span className='shrink-0 text-paragraph-sm text-text-sub-600'>.peptiful.com</span>
              </div>
            </FieldGroup>
            <FieldGroup label='Contact Email'>
              <input
                name='email'
                defaultValue={settings?.general?.email}
                className='h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 placeholder:text-text-disabled-300 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16'
              />
            </FieldGroup>
            <FieldGroup label='Phone Number'>
              <input
                name='phone'
                defaultValue={settings?.general?.phone}
                placeholder='+1 (555) 000-0000'
                className='h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 placeholder:text-text-disabled-300 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16'
              />
            </FieldGroup>
            <Button disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        )}

        {activeTab === 'branding' && (
          <form onSubmit={handleSaveBranding} className='max-w-lg space-y-6'>
            <h3 className='text-label-lg text-text-strong-950'>Branding</h3>
            <FieldGroup label='Logo'>
              <div className='flex items-center gap-4'>
                <div className='flex size-16 items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-stroke-soft-200 bg-bg-weak-50'>
                  {settings?.branding?.themeConfig?.logoUrl ? (
                    <img src={settings.branding.themeConfig.logoUrl} alt="Logo" className="size-full object-contain p-2" />
                  ) : (
                    <RiUploadCloud2Line className='size-6 text-text-disabled-300' />
                  )}
                </div>
                <div>
                  <Button type="button" variant='secondary' size='sm'>
                    <RiUploadCloud2Line className='size-4' />
                    Upload Logo
                  </Button>
                  <p className='mt-1 text-paragraph-xs text-text-soft-400'>PNG, JPG. Max 2MB.</p>
                </div>
              </div>
            </FieldGroup>
            <FieldGroup label='Primary Color'>
              <div className='flex items-center gap-3'>
                <div
                  className='size-10 rounded-10 ring-2 ring-primary-alpha-16 ring-offset-2'
                  style={{ backgroundColor: settings?.branding?.themeConfig?.primaryColor || '#335cff' }}
                />
                <input
                  name='primaryColor'
                  defaultValue={settings?.branding?.themeConfig?.primaryColor || '#335cff'}
                  className='h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 placeholder:text-text-disabled-300 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16'
                />
              </div>
            </FieldGroup>
            <FieldGroup label='Store Description' hint='Shown in search results and social shares'>
              <textarea
                name='description'
                defaultValue={settings?.branding?.themeConfig?.description || ''}
                rows={3}
                className='w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 py-2.5 text-paragraph-sm text-text-strong-950 placeholder:text-text-disabled-300 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16 resize-none'
              />
            </FieldGroup>
            <FieldGroup label='Custom Domain' hint='Connect your own domain to replace your subdomain'>
              <div className='flex items-center gap-2'>
                <div className='relative flex-1'>
                  <RiGlobalLine className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-soft-400' />
                  <input
                    name="customDomain"
                    placeholder='www.yourdomain.com'
                    defaultValue={settings?.branding?.customDomain || ''}
                    className='h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 pl-9 pr-3 text-paragraph-sm text-text-strong-950 placeholder:text-text-disabled-300 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16'
                  />
                </div>
                {settings?.branding?.customDomain && (
                  <Badge
                    variant='light'
                    color={settings?.branding?.dnsStatus === 'VERIFIED' ? 'success' : 'warning'}
                    size='md'
                    dot
                  >
                    {settings?.branding?.dnsStatus || 'PENDING'}
                  </Badge>
                )}
              </div>

              {settings?.branding?.customDomain && settings?.branding?.dnsStatus !== 'VERIFIED' && (
                <div className='mt-3 rounded-10 border border-warning-light bg-warning-lighter p-4'>
                  <p className='text-label-xs text-warning-dark mb-2'>DNS Verification Required</p>
                  <p className='text-paragraph-xs text-text-sub-600 mb-3'>
                    Add the following CNAME record to your domain&apos;s DNS settings:
                  </p>
                  <div className='rounded-lg bg-bg-white-0 border border-stroke-soft-200 p-3 space-y-3'>
                    <div className='space-y-1.5'>
                      <p className='text-label-xs text-text-strong-950 px-1'>Record 1: CNAME</p>
                      <div className='rounded-lg bg-bg-weak-50 p-2 text-paragraph-xs border border-stroke-soft-200'>
                        <div className='flex justify-between'><span className='text-text-soft-400'>Host</span><span className='font-mono'>www</span></div>
                        <div className='flex justify-between mt-1'><span className='text-text-soft-400'>Value</span><span className='font-mono'>{settings?.general?.slug}.peptiful.com</span></div>
                      </div>
                    </div>

                    <div className='space-y-1.5'>
                      <p className='text-label-xs text-text-strong-950 px-1'>Record 2: TXT (Verification)</p>
                      <div className='rounded-lg bg-bg-weak-50 p-2 text-paragraph-xs border border-stroke-soft-200'>
                        <div className='flex justify-between'><span className='text-text-soft-400'>Host</span><span className='font-mono text-right shrink-0'>_peptiful-verify</span></div>
                        <div className='flex justify-between mt-1 overflow-x-auto'><span className='text-text-soft-400 mr-2'>Value</span><span className='font-mono text-right whitespace-nowrap'>peptiful-verify={dnsInfo?.dnsVerificationToken || '...'}</span></div>
                      </div>
                    </div>
                  </div>
                  <div className='mt-3 flex items-center gap-2'>
                    <Button type="button" variant='secondary' size='xs' onClick={handleVerifyDns} disabled={saving}>
                      {saving ? 'Verifying...' : 'Verify DNS'}
                    </Button>
                    <span className='text-paragraph-xs text-text-soft-400'>DNS changes may take up to 48 hours to propagate</span>
                  </div>
                </div>
              )}
            </FieldGroup>
            <Button disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        )}

        {activeTab === 'billing' && (
          <div className='max-w-lg space-y-6'>
            <h3 className='text-label-lg text-text-strong-950'>Billing & Subscription</h3>

            <div className='rounded-10 border border-stroke-soft-200 p-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-label-sm text-text-strong-950'>Payment Plan</p>
                  <p className='mt-0.5 text-paragraph-xs text-text-sub-600'>Pay-as-you-go — wholesale deducted per order</p>
                </div>
                <Badge variant='light' color='success' size='sm' dot>Active</Badge>
              </div>
            </div>

            <div>
              <div className='flex items-center justify-between mb-3'>
                <h4 className='text-label-sm text-text-strong-950'>Payment Methods</h4>
                <Button variant='secondary' size='xs'><RiAddLine className='size-3.5' />Add</Button>
              </div>
              <div className='space-y-3'>
                {settings?.paymentMethods?.length > 0 ? (
                  settings.paymentMethods.map((pm: any) => (
                    <div key={pm.id} className='flex items-center gap-3 rounded-10 border border-stroke-soft-200 p-4'>
                      <div className='flex size-10 items-center justify-center rounded-10 bg-bg-weak-50'>
                        <RiBankCardLine className='size-5 text-text-soft-400' />
                      </div>
                      <div className='flex-1'>
                        <p className='text-label-sm text-text-strong-950'>{pm.type} ending in {pm.lastFour}</p>
                        <p className='text-paragraph-xs text-text-sub-600'>Expires {pm.expiry}</p>
                      </div>
                      <Badge variant='light' color='primary' size='sm'>Default</Badge>
                      <Button variant='ghost' size='xs' onClick={async () => {
                        if (confirm('Are you sure you want to remove this payment method?')) {
                          setSaving(true);
                          try {
                            await brandApi.removePaymentMethod(pm.id);
                            await fetchData();
                          } catch (err) {
                            console.error('Failed to remove pm:', err);
                          } finally {
                            setSaving(false);
                          }
                        }
                      }}>Remove</Button>
                    </div>
                  ))
                ) : (
                  <div className='rounded-10 border border-stroke-soft-200 p-4 text-center'>
                    <RiBankCardLine className='mx-auto size-8 text-text-soft-400 mb-2' />
                    <p className='text-paragraph-xs text-text-sub-600'>No payment methods added yet.</p>
                  </div>
                )}
              </div>
            </div>

            <form onSubmit={handleSaveBilling}>
              <h4 className='text-label-sm text-text-strong-950 mb-3'>Billing Information</h4>
              <div className='space-y-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <FieldGroup label='First Name'>
                    <input
                      name='firstName'
                      defaultValue={settings?.billing?.firstName || ''}
                      className='h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 placeholder:text-text-disabled-300 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16'
                    />
                  </FieldGroup>
                  <FieldGroup label='Last Name'>
                    <input
                      name='lastName'
                      defaultValue={settings?.billing?.lastName || ''}
                      className='h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 placeholder:text-text-disabled-300 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16'
                    />
                  </FieldGroup>
                </div>
                <FieldGroup label='Company'>
                  <input
                    name='company'
                    defaultValue={settings?.billing?.company || ''}
                    className='h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 placeholder:text-text-disabled-300 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16'
                  />
                </FieldGroup>
                <FieldGroup label='Address'>
                  <input
                    name='address'
                    defaultValue={settings?.billing?.address || ''}
                    className='h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 placeholder:text-text-disabled-300 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16'
                  />
                </FieldGroup>
                <div className='grid grid-cols-3 gap-4'>
                  <FieldGroup label='City'>
                    <input
                      name='city'
                      defaultValue={settings?.billing?.city || ''}
                      className='h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 placeholder:text-text-disabled-300 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16'
                    />
                  </FieldGroup>
                  <FieldGroup label='State'>
                    <input
                      name='state'
                      defaultValue={settings?.billing?.state || ''}
                      className='h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 placeholder:text-text-disabled-300 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16'
                    />
                  </FieldGroup>
                  <FieldGroup label='ZIP'>
                    <input
                      name='zip'
                      defaultValue={settings?.billing?.zip || ''}
                      className='h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 placeholder:text-text-disabled-300 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16'
                    />
                  </FieldGroup>
                </div>
                <Button disabled={saving}>
                  {saving ? 'Saving...' : 'Save Billing Info'}
                </Button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'commission' && (
          <form onSubmit={handleSaveCommission} className='max-w-lg space-y-6'>
            <h3 className='text-label-lg text-text-strong-950'>Commission Rates</h3>
            <p className='text-paragraph-sm text-text-sub-600'>
              Set the L1 affiliate commission rate. L1 affiliates set their own L2 split from their cut.
            </p>

            <div className='rounded-10 border border-stroke-soft-200 bg-bg-weak-50 p-4'>
              <p className='text-label-xs text-text-sub-600 uppercase tracking-wider'>How commissions work</p>
              <ul className='mt-2 space-y-1.5 text-paragraph-xs text-text-sub-600'>
                <li><span className='font-medium text-text-strong-950'>Peptiful</span> sets the wholesale price (what you pay per order)</li>
                <li><span className='font-medium text-text-strong-950'>You (Brand)</span> set the retail price + L1 commission %</li>
                <li><span className='font-medium text-text-strong-950'>L1 Affiliates</span> set L2 commission % from their own cut</li>
                <li>L2 commission comes from L1&apos;s pocket — your margin stays the same</li>
              </ul>
            </div>

            <FieldGroup label='L1 Affiliate Commission' hint='% of retail price paid to L1 affiliates per sale. This is what you pay.'>
              <div className='flex items-center gap-2'>
                <input
                  name='l1CommissionRate'
                  type='number'
                  defaultValue={settings?.commissionRates?.l1CommissionRate || 15}
                  className='h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 placeholder:text-text-disabled-300 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16'
                />
                <span className='text-label-sm text-text-sub-600 whitespace-nowrap'>% of retail</span>
              </div>
            </FieldGroup>

            <div className='flex items-center justify-between border-t border-stroke-soft-200 pt-6'>
              <div>
                <p className='text-label-sm text-text-strong-950'>Affiliate Program</p>
                <p className='text-paragraph-xs text-text-sub-600'>Enable or disable your storefront&apos;s affiliate program</p>
              </div>
              <button
                type="button"
                onClick={() => handleToggleAffiliate(!settings?.affiliatesEnabled)}
                disabled={saving}
                className={cn(
                  'relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors cursor-pointer',
                  settings?.affiliatesEnabled ? 'bg-primary-base' : 'bg-bg-soft-200',
                )}
              >
                <span
                  className={cn(
                    'inline-block size-4 rounded-full bg-white shadow-switch-thumb transition-transform',
                    settings?.affiliatesEnabled ? 'translate-x-[18px]' : 'translate-x-0.5',
                  )}
                />
              </button>
            </div>

            <Button disabled={saving} className="mt-4">
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        )}

        {activeTab === 'notifications' && (
          <div className='max-w-lg space-y-6'>
            <h3 className='text-label-lg text-text-strong-950'>Email Notifications</h3>
            <p className='text-paragraph-sm text-text-sub-600'>
              Choose which notifications you&apos;d like to receive.
            </p>
            {[
              { id: 'orderConfirmation', label: 'New Order', desc: 'When a customer places an order' },
              { id: 'orderShipped', label: 'Order Shipped', desc: 'When an order is fulfilled and shipped' },
              { id: 'affiliateSignup', label: 'New Affiliate', desc: 'When someone joins your affiliate network' },
              { id: 'commissionEarned', label: 'Commission Earned', desc: 'When an affiliate earns a commission' },
              { id: 'payoutProcessed', label: 'Payout Processed', desc: 'When a payout is sent to your account' },
            ].map((n) => (
              <div key={n.id} className='flex items-center justify-between border-b border-stroke-soft-200 py-3 last:border-0'>
                <div>
                  <p className='text-label-sm text-text-strong-950'>{n.label}</p>
                  <p className='text-paragraph-xs text-text-sub-600'>{n.desc}</p>
                </div>
                <button
                  onClick={() => {
                    const newPrefs = {
                      ...settings.notificationPrefs,
                      [n.id]: !settings.notificationPrefs[n.id],
                    };
                    handleSaveNotifications(newPrefs);
                  }}
                  disabled={saving}
                  className={cn(
                    'relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors cursor-pointer',
                    settings?.notificationPrefs?.[n.id] ? 'bg-primary-base' : 'bg-bg-soft-200',
                  )}
                >
                  <span
                    className={cn(
                      'inline-block size-4 rounded-full bg-white shadow-switch-thumb transition-transform',
                      settings?.notificationPrefs?.[n.id] ? 'translate-x-[18px]' : 'translate-x-0.5',
                    )}
                  />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
