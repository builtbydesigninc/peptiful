'use client';

import * as React from 'react';
import { cn } from '@/utils/cn';
import { PageHeader } from '@/components/ui/page-header-new';
import { Button } from '@/components/ui/button-new';
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

export default function SettingsPage() {
  const [activeTab, setActiveTab] = React.useState('general');

  return (
    <div className='space-y-6'>
      <PageHeader title='Store Settings' description='Configure your storefront and preferences' />

      {/* Tabs */}
      <div className='flex gap-1 rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-1 shadow-regular-xs'>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 rounded-10 px-4 py-2 text-label-sm transition-colors cursor-pointer',
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
          <div className='max-w-lg space-y-6'>
            <h3 className='text-label-lg text-text-strong-950'>General Settings</h3>
            <FieldGroup label='Store Name'>
              <InputField value='PeptideGains' />
            </FieldGroup>
            <FieldGroup label='Subdomain' hint='Your storefront URL'>
              <div className='flex items-center gap-2'>
                <InputField value='peptidegains' prefix='https://' />
                <span className='shrink-0 text-paragraph-sm text-text-sub-600'>.peptiful.com</span>
              </div>
            </FieldGroup>
            <FieldGroup label='Contact Email'>
              <InputField value='sarah@peptidegains.com' />
            </FieldGroup>
            <FieldGroup label='Phone Number'>
              <InputField placeholder='+1 (555) 000-0000' />
            </FieldGroup>
            <FieldGroup label='Business Address'>
              <InputField placeholder='123 Main St, City, State ZIP' />
            </FieldGroup>
            <Button>Save Changes</Button>
          </div>
        )}

        {activeTab === 'branding' && (
          <div className='max-w-lg space-y-6'>
            <h3 className='text-label-lg text-text-strong-950'>Branding</h3>
            <FieldGroup label='Logo'>
              <div className='flex items-center gap-4'>
                <div className='flex size-16 items-center justify-center rounded-xl border-2 border-dashed border-stroke-soft-200 bg-bg-weak-50'>
                  <RiUploadCloud2Line className='size-6 text-text-disabled-300' />
                </div>
                <div>
                  <Button variant='secondary' size='sm'>
                    <RiUploadCloud2Line className='size-4' />
                    Upload Logo
                  </Button>
                  <p className='mt-1 text-paragraph-xs text-text-soft-400'>PNG, JPG. Max 2MB.</p>
                </div>
              </div>
            </FieldGroup>
            <FieldGroup label='Primary Color'>
              <div className='flex items-center gap-3'>
                <div className='size-10 rounded-10 bg-blue-500 ring-2 ring-primary-alpha-16 ring-offset-2' />
                <InputField value='#335cff' />
              </div>
            </FieldGroup>
            <FieldGroup label='Store Description' hint='Shown in search results and social shares'>
              <textarea
                defaultValue='Premium peptides and supplements for optimal performance.'
                rows={3}
                className='w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 py-2.5 text-paragraph-sm text-text-strong-950 placeholder:text-text-disabled-300 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16 resize-none'
              />
            </FieldGroup>
            <FieldGroup label='Custom Domain' hint='Connect your own domain to replace peptidegains.peptiful.com'>
              <div className='flex items-center gap-2'>
                <div className='relative flex-1'>
                  <RiGlobalLine className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-soft-400' />
                  <input
                    placeholder='www.peptidegains.com'
                    defaultValue='www.peptidegains.com'
                    className='h-10 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 pl-9 pr-3 text-paragraph-sm text-text-strong-950 placeholder:text-text-disabled-300 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16'
                  />
                </div>
                <Badge variant='light' color='warning' size='md' dot>Pending</Badge>
              </div>
              <div className='mt-3 rounded-10 border border-warning-light bg-warning-lighter p-4'>
                <p className='text-label-xs text-warning-dark mb-2'>DNS Verification Required</p>
                <p className='text-paragraph-xs text-text-sub-600 mb-3'>
                  Add the following CNAME record to your domain&apos;s DNS settings:
                </p>
                <div className='rounded-lg bg-bg-white-0 border border-stroke-soft-200 p-3 space-y-2'>
                  <div className='flex justify-between text-paragraph-xs'>
                    <span className='text-text-sub-600'>Type</span>
                    <span className='text-label-xs text-text-strong-950 font-mono'>CNAME</span>
                  </div>
                  <div className='flex justify-between text-paragraph-xs'>
                    <span className='text-text-sub-600'>Name</span>
                    <span className='text-label-xs text-text-strong-950 font-mono'>www</span>
                  </div>
                  <div className='flex justify-between text-paragraph-xs'>
                    <span className='text-text-sub-600'>Value</span>
                    <span className='text-label-xs text-text-strong-950 font-mono'>cname.peptiful.com</span>
                  </div>
                </div>
                <div className='mt-3 flex items-center gap-2'>
                  <Button variant='secondary' size='xs'>Verify DNS</Button>
                  <span className='text-paragraph-xs text-text-soft-400'>DNS changes may take up to 48 hours to propagate</span>
                </div>
              </div>
            </FieldGroup>
            <Button>Save Changes</Button>
          </div>
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
              <div className='rounded-10 border border-stroke-soft-200 p-4'>
                <div className='flex items-center gap-3'>
                  <div className='flex size-10 items-center justify-center rounded-10 bg-bg-weak-50'>
                    <RiBankCardLine className='size-5 text-text-soft-400' />
                  </div>
                  <div className='flex-1'>
                    <p className='text-label-sm text-text-strong-950'>Visa ending in 4829</p>
                    <p className='text-paragraph-xs text-text-sub-600'>Expires 08/2027</p>
                  </div>
                  <Badge variant='light' color='primary' size='sm'>Default</Badge>
                </div>
              </div>
            </div>

            <div>
              <h4 className='text-label-sm text-text-strong-950 mb-3'>Invoices</h4>
              <div className='rounded-10 border border-stroke-soft-200 overflow-hidden'>
                {[
                  { id: 'INV-042', date: 'Feb 15, 2026', type: 'Wholesale', amount: '$1,240' },
                  { id: 'INV-041', date: 'Jan 15, 2026', type: 'Wholesale', amount: '$1,890' },
                  { id: 'INV-040', date: 'Dec 15, 2025', type: 'Wholesale', amount: '$1,560' },
                ].map((inv) => (
                  <div key={inv.id} className='flex items-center justify-between border-b border-stroke-soft-200 last:border-0 px-4 py-3'>
                    <div>
                      <p className='text-label-xs text-text-strong-950'>{inv.id}</p>
                      <p className='text-paragraph-xs text-text-sub-600'>{inv.date} — {inv.type}</p>
                    </div>
                    <span className='text-label-sm text-text-strong-950'>{inv.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className='text-label-sm text-text-strong-950 mb-3'>Billing Information</h4>
              <div className='space-y-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <FieldGroup label='First Name'><InputField value='Sarah' /></FieldGroup>
                  <FieldGroup label='Last Name'><InputField value='Chen' /></FieldGroup>
                </div>
                <FieldGroup label='Company'><InputField value='PeptideGains Inc.' /></FieldGroup>
                <FieldGroup label='Address'><InputField value='285 Arcadia Ave' /></FieldGroup>
                <div className='grid grid-cols-3 gap-4'>
                  <FieldGroup label='City'><InputField value='Uniondale' /></FieldGroup>
                  <FieldGroup label='State'><InputField value='NY' /></FieldGroup>
                  <FieldGroup label='ZIP'><InputField value='11553' /></FieldGroup>
                </div>
                <Button>Save Billing Info</Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'commission' && (
          <div className='max-w-lg space-y-6'>
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
                <InputField value='15' />
                <span className='text-label-sm text-text-sub-600'>% of retail</span>
              </div>
            </FieldGroup>

            <div className='rounded-10 border border-information-light bg-information-lighter p-4'>
              <p className='text-label-xs text-information-dark'>Live Example — Scenario 4 (L2 Sale)</p>
              <p className='mt-1 text-paragraph-xs text-text-sub-600 mb-3'>
                Product: Wholesale $80 • Retail $150 • L1 rate 15% • L2 gets 30% of L1&apos;s cut
              </p>
              <div className='space-y-1.5'>
                {[
                  { who: 'Peptiful', calc: 'Wholesale - partner cut', amount: '$76.00' },
                  { who: 'Partner (5%)', calc: '5% of $80 wholesale', amount: '$4.00' },
                  { who: 'You (Brand)', calc: '$150 - $80 - $22.50', amount: '$47.50', highlight: true },
                  { who: 'L1 Affiliate', calc: '15% of $150 - L2 share', amount: '$15.75' },
                  { who: 'L2 Affiliate', calc: '30% of L1\'s $22.50', amount: '$6.75' },
                ].map((r) => (
                  <div key={r.who} className={`flex items-center justify-between rounded-lg px-3 py-2 ${r.highlight ? 'bg-success-lighter' : 'bg-bg-white-0'}`}>
                    <div>
                      <span className='text-label-xs text-text-strong-950'>{r.who}</span>
                      <span className='ml-2 text-paragraph-xs text-text-soft-400'>{r.calc}</span>
                    </div>
                    <span className={`text-label-sm ${r.highlight ? 'text-success-dark' : 'text-text-strong-950'}`}>{r.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className='rounded-10 border border-warning-light bg-warning-lighter p-4'>
              <p className='text-label-xs text-warning-dark'>Note about L2 commission</p>
              <p className='mt-1 text-paragraph-xs text-text-sub-600'>
                L2 commission is set by each L1 affiliate from their own cut. You always pay the same L1 rate regardless of whether the sale came from an L1 or L2. Your margin is unaffected.
              </p>
            </div>

            <Button>Save Changes</Button>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className='max-w-lg space-y-6'>
            <h3 className='text-label-lg text-text-strong-950'>Email Notifications</h3>
            <p className='text-paragraph-sm text-text-sub-600'>
              Choose which notifications you&apos;d like to receive.
            </p>
            {[
              { label: 'New Order', desc: 'When a customer places an order', on: true },
              { label: 'Order Shipped', desc: 'When an order is fulfilled and shipped', on: true },
              { label: 'New Affiliate', desc: 'When someone joins your affiliate network', on: true },
              { label: 'Commission Earned', desc: 'When an affiliate earns a commission', on: false },
              { label: 'Payout Processed', desc: 'When a payout is sent to your account', on: true },
              { label: 'Product Out of Stock', desc: 'When a product runs low or out of stock', on: true },
              { label: 'Weekly Summary', desc: 'Weekly report of sales and performance', on: false },
            ].map((n) => (
              <div key={n.label} className='flex items-center justify-between border-b border-stroke-soft-200 py-3 last:border-0'>
                <div>
                  <p className='text-label-sm text-text-strong-950'>{n.label}</p>
                  <p className='text-paragraph-xs text-text-sub-600'>{n.desc}</p>
                </div>
                <Toggle defaultChecked={n.on} />
              </div>
            ))}
            <Button>Save Preferences</Button>
          </div>
        )}
      </div>
    </div>
  );
}
