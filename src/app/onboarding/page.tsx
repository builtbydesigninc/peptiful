'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/utils/cn';
import { Button } from '@/components/ui/button-new';
import { Badge } from '@/components/ui/badge-new';
import {
  RiUserLine,
  RiShoppingBag3Line,
  RiPriceTag3Line,
  RiPaintBrushLine,
  RiSecurePaymentLine,
  RiRocketLine,
  RiArrowLeftLine,
  RiArrowRightLine,
  RiCheckLine,
  RiUploadCloud2Line,
  RiAddLine,
  RiSubtractLine,
  RiDeleteBinLine,
  RiStoreLine,
  RiExternalLinkLine,
  RiCheckboxCircleLine,
  RiStarLine,
} from '@remixicon/react';
import Image from 'next/image';
import { PeptifulLogo } from '@/components/logo';

const STEPS = [
  { id: 1, title: 'Business Profile', icon: RiUserLine },
  { id: 2, title: 'Select Products', icon: RiShoppingBag3Line },
  { id: 3, title: 'Set Pricing', icon: RiPriceTag3Line },
  { id: 4, title: 'Customize Store', icon: RiPaintBrushLine },
  { id: 5, title: 'Connect Payment', icon: RiSecurePaymentLine },
  { id: 6, title: 'Review & Publish', icon: RiRocketLine },
];

const CATALOG_PRODUCTS = [
  { id: 'p1', name: 'BPC-157 (Body Protective Compound)', category: 'Recovery', wholesale: 22.0, suggestedRetail: 89.99 },
  { id: 'p2', name: 'Semaglutide (GLP-1 Agonist)', category: 'Weight Loss', wholesale: 38.0, suggestedRetail: 189.99 },
  { id: 'p3', name: 'PT-141 (Bremelanotide)', category: 'Sexual Wellness', wholesale: 17.0, suggestedRetail: 79.99 },
  { id: 'p4', name: 'TB-500 (Thymosin Beta-4)', category: 'Recovery', wholesale: 25.0, suggestedRetail: 99.99 },
  { id: 'p5', name: 'Selank (Anxiolytic Peptide)', category: 'Cognitive', wholesale: 14.0, suggestedRetail: 69.99 },
  { id: 'p6', name: 'Epithalon (Epitalon)', category: 'Longevity', wholesale: 18.0, suggestedRetail: 84.99 },
  { id: 'p7', name: 'Tirzepatide (Dual GIP/GLP-1)', category: 'Weight Loss', wholesale: 45.0, suggestedRetail: 219.99 },
  { id: 'p8', name: 'NAD+ Precursor Complex', category: 'Longevity', wholesale: 15.0, suggestedRetail: 79.99 },
  { id: 'p9', name: 'Thymalin (Thymic Peptide)', category: 'Immune', wholesale: 11.0, suggestedRetail: 59.99 },
  { id: 'p10', name: 'Vitamin D3 + K2 Complex', category: 'Vitamins', wholesale: 5.0, suggestedRetail: 28.99 },
];

type SelectedProduct = { id: string; retail: number };

function InputField({
  label, value, onChange, placeholder, prefix, suffix, type = 'text', hint,
}: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string;
  prefix?: string; suffix?: string; type?: string; hint?: string;
}) {
  return (
    <div className='space-y-1.5'>
      <label className='text-label-sm text-text-strong-950'>{label}</label>
      <div className='flex'>
        {prefix && (
          <span className='flex items-center rounded-l-10 border border-r-0 border-stroke-soft-200 bg-bg-weak-50 px-3 text-paragraph-sm text-text-sub-600'>
            {prefix}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            'h-10 w-full border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 placeholder:text-text-disabled-300 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16',
            prefix && !suffix && 'rounded-r-10',
            suffix && !prefix && 'rounded-l-10',
            !prefix && !suffix && 'rounded-10',
            prefix && suffix && '',
          )}
        />
        {suffix && (
          <span className='flex items-center rounded-r-10 border border-l-0 border-stroke-soft-200 bg-bg-weak-50 px-3 text-paragraph-sm text-text-sub-600'>
            {suffix}
          </span>
        )}
      </div>
      {hint && <p className='text-paragraph-xs text-text-soft-400'>{hint}</p>}
    </div>
  );
}

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = React.useState(1);

  // Step 1
  const [brandName, setBrandName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [businessType, setBusinessType] = React.useState('');

  // Step 2
  const [selectedProducts, setSelectedProducts] = React.useState<SelectedProduct[]>([]);

  // Step 4
  const [subdomain, setSubdomain] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [primaryColor, setPrimaryColor] = React.useState('#0A4591');

  const toggleProduct = (id: string, suggestedRetail: number) => {
    setSelectedProducts((prev) =>
      prev.find((p) => p.id === id)
        ? prev.filter((p) => p.id !== id)
        : [...prev, { id, retail: suggestedRetail }],
    );
  };

  const updateRetailPrice = (id: string, price: number) => {
    setSelectedProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, retail: price } : p)),
    );
  };

  const canProceed = () => {
    switch (step) {
      case 1: return brandName.trim().length > 0 && email.trim().length > 0;
      case 2: return selectedProducts.length > 0;
      case 3: return true;
      case 4: return subdomain.trim().length > 0;
      case 5: return true;
      case 6: return true;
      default: return false;
    }
  };

  return (
    <div className='min-h-screen bg-bg-weak-50'>
      {/* Top Bar */}
      <header className='sticky top-0 z-50 border-b border-stroke-soft-200 bg-bg-white-0'>
        <div className='mx-auto flex h-16 max-w-4xl items-center justify-between px-6'>
          <PeptifulLogo variant='gradient' markClassName='size-8' wordmarkClassName='text-label-md' />
          <div className='flex items-center gap-2'>
            <span className='text-paragraph-xs text-text-sub-600'>
              Step {step} of {STEPS.length}
            </span>
            <Button variant='ghost' size='sm' onClick={() => router.push('/brand')}>
              Save & Exit
            </Button>
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className='border-b border-stroke-soft-200 bg-bg-white-0'>
        <div className='mx-auto max-w-4xl px-6 py-4'>
          <div className='flex items-center gap-1'>
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const isComplete = s.id < step;
              const isCurrent = s.id === step;
              return (
                <React.Fragment key={s.id}>
                  <button
                    onClick={() => s.id < step && setStep(s.id)}
                    className={cn(
                      'flex items-center gap-2 rounded-10 px-3 py-2 text-label-xs transition-colors cursor-pointer',
                      isCurrent && 'bg-primary-alpha-10 text-primary-base',
                      isComplete && 'text-success-base hover:bg-success-lighter',
                      !isCurrent && !isComplete && 'text-text-disabled-300',
                    )}
                  >
                    <div className={cn(
                      'flex size-6 items-center justify-center rounded-full text-[10px] font-bold',
                      isCurrent && 'bg-primary-base text-white',
                      isComplete && 'bg-success-base text-white',
                      !isCurrent && !isComplete && 'bg-bg-soft-200 text-text-disabled-300',
                    )}>
                      {isComplete ? <RiCheckLine className='size-3.5' /> : s.id}
                    </div>
                    <span className='hidden sm:inline'>{s.title}</span>
                  </button>
                  {i < STEPS.length - 1 && (
                    <div className={cn(
                      'h-px flex-1',
                      s.id < step ? 'bg-success-base' : 'bg-stroke-soft-200',
                    )} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className='mx-auto max-w-4xl px-6 py-8'>
        {/* Step 1: Business Profile */}
        {step === 1 && (
          <div className='mx-auto max-w-lg space-y-6'>
            <div className='text-center'>
              <h2 className='text-title-h4 text-text-strong-950'>Tell us about your brand</h2>
              <p className='mt-2 text-paragraph-sm text-text-sub-600'>
                This information will be used to set up your storefront.
              </p>
            </div>
            <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-6 shadow-regular-xs space-y-5'>
              <InputField label='Brand Name' value={brandName} onChange={setBrandName} placeholder='e.g. PeptideGains' />
              <InputField label='Contact Email' value={email} onChange={setEmail} placeholder='you@company.com' type='email' />
              <InputField label='Phone Number' value={phone} onChange={setPhone} placeholder='+1 (555) 000-0000' />
              <div className='space-y-1.5'>
                <label className='text-label-sm text-text-strong-950'>Business Type</label>
                <div className='grid grid-cols-2 gap-3'>
                  {['Retailer', 'Clinic / Practice', 'Influencer', 'Other'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setBusinessType(t)}
                      className={cn(
                        'rounded-10 border px-4 py-3 text-label-sm transition-all cursor-pointer',
                        businessType === t
                          ? 'border-primary-base bg-primary-alpha-10 text-primary-base'
                          : 'border-stroke-soft-200 text-text-sub-600 hover:border-primary-alpha-16 hover:bg-bg-weak-50',
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Select Products */}
        {step === 2 && (
          <div className='space-y-6'>
            <div className='text-center'>
              <h2 className='text-title-h4 text-text-strong-950'>Choose your products</h2>
              <p className='mt-2 text-paragraph-sm text-text-sub-600'>
                Select products from our catalog to sell on your store. You can add more later.
              </p>
            </div>
            <div className='flex items-center justify-between'>
              <Badge variant='light' color='primary' size='md'>
                {selectedProducts.length} selected
              </Badge>
            </div>
            <div className='grid gap-3'>
              {CATALOG_PRODUCTS.map((product) => {
                const isSelected = selectedProducts.some((p) => p.id === product.id);
                return (
                  <button
                    key={product.id}
                    onClick={() => toggleProduct(product.id, product.suggestedRetail)}
                    className={cn(
                      'flex items-center gap-4 rounded-xl border p-4 text-left transition-all cursor-pointer',
                      isSelected
                        ? 'border-primary-base bg-primary-alpha-10/50 shadow-regular-xs'
                        : 'border-stroke-soft-200 bg-bg-white-0 hover:border-primary-alpha-16 hover:shadow-regular-xs',
                    )}
                  >
                    <div className={cn(
                      'relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-10 transition-colors',
                      isSelected ? 'ring-2 ring-primary-base' : 'bg-bg-weak-50',
                    )}>
                      <Image src='/peptiful-vial.png' alt={product.name} fill className='object-contain p-1' sizes='48px' />
                      {isSelected && (
                        <div className='absolute inset-0 flex items-center justify-center bg-primary-base/80'>
                          <RiCheckLine className='size-5 text-white' />
                        </div>
                      )}
                    </div>
                    <div className='flex-1 min-w-0'>
                      <p className='text-label-sm text-text-strong-950'>{product.name}</p>
                      <p className='text-paragraph-xs text-text-sub-600'>{product.category}</p>
                    </div>
                    <div className='text-right shrink-0'>
                      <p className='text-paragraph-xs text-text-sub-600'>Wholesale</p>
                      <p className='text-label-sm text-text-strong-950'>${product.wholesale.toFixed(2)}</p>
                    </div>
                    <div className='text-right shrink-0'>
                      <p className='text-paragraph-xs text-text-sub-600'>Suggested Retail</p>
                      <p className='text-label-sm text-text-strong-950'>${product.suggestedRetail.toFixed(2)}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Set Pricing */}
        {step === 3 && (
          <div className='space-y-6'>
            <div className='text-center'>
              <h2 className='text-title-h4 text-text-strong-950'>Set your retail prices</h2>
              <p className='mt-2 text-paragraph-sm text-text-sub-600'>
                Adjust retail prices for each product. We&apos;ll show your margin in real time.
              </p>
            </div>
            <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs overflow-hidden'>
              <table className='w-full'>
                <thead>
                  <tr className='border-b border-stroke-soft-200 bg-bg-weak-50'>
                    <th className='px-5 py-3 text-left text-label-xs uppercase tracking-wider text-text-sub-600'>Product</th>
                    <th className='px-5 py-3 text-right text-label-xs uppercase tracking-wider text-text-sub-600'>Wholesale</th>
                    <th className='px-5 py-3 text-right text-label-xs uppercase tracking-wider text-text-sub-600'>Your Retail Price</th>
                    <th className='px-5 py-3 text-right text-label-xs uppercase tracking-wider text-text-sub-600'>Margin</th>
                    <th className='px-5 py-3 text-right text-label-xs uppercase tracking-wider text-text-sub-600'>Profit</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedProducts.map((sp) => {
                    const product = CATALOG_PRODUCTS.find((p) => p.id === sp.id)!;
                    const profit = sp.retail - product.wholesale;
                    const margin = ((profit / sp.retail) * 100).toFixed(0);
                    return (
                      <tr key={sp.id} className='border-b border-stroke-soft-200 last:border-0'>
                        <td className='px-5 py-4'>
                          <p className='text-label-sm text-text-strong-950'>{product.name}</p>
                          <p className='text-paragraph-xs text-text-sub-600'>{product.category}</p>
                        </td>
                        <td className='px-5 py-4 text-right text-paragraph-sm text-text-sub-600'>
                          ${product.wholesale.toFixed(2)}
                        </td>
                        <td className='px-5 py-4 text-right'>
                          <div className='inline-flex items-center gap-1'>
                            <span className='text-paragraph-sm text-text-sub-600'>$</span>
                            <input
                              type='number'
                              value={sp.retail}
                              onChange={(e) => updateRetailPrice(sp.id, parseFloat(e.target.value) || 0)}
                              className='w-20 rounded-lg border border-stroke-soft-200 bg-bg-white-0 px-2 py-1.5 text-right text-label-sm text-text-strong-950 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16'
                              step='0.01'
                            />
                          </div>
                        </td>
                        <td className='px-5 py-4 text-right'>
                          <Badge variant='light' color={profit > 0 ? 'success' : 'error'} size='sm'>
                            {margin}%
                          </Badge>
                        </td>
                        <td className='px-5 py-4 text-right text-label-sm text-success-base'>
                          ${profit.toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {selectedProducts.length === 0 && (
                <div className='py-12 text-center text-paragraph-sm text-text-sub-600'>
                  No products selected. Go back to select products first.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 4: Customize Store */}
        {step === 4 && (
          <div className='mx-auto max-w-lg space-y-6'>
            <div className='text-center'>
              <h2 className='text-title-h4 text-text-strong-950'>Customize your storefront</h2>
              <p className='mt-2 text-paragraph-sm text-text-sub-600'>
                Make it yours with your brand&apos;s identity.
              </p>
            </div>
            <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-6 shadow-regular-xs space-y-5'>
              <div className='space-y-1.5'>
                <label className='text-label-sm text-text-strong-950'>Logo</label>
                <div className='flex items-center gap-4'>
                  <div className='flex size-20 items-center justify-center rounded-xl border-2 border-dashed border-stroke-soft-200 bg-bg-weak-50'>
                    <RiUploadCloud2Line className='size-7 text-text-disabled-300' />
                  </div>
                  <div>
                    <Button variant='secondary' size='sm'>
                      <RiUploadCloud2Line className='size-4' />
                      Upload Logo
                    </Button>
                    <p className='mt-1.5 text-paragraph-xs text-text-soft-400'>PNG, JPG or SVG. Max 2MB.</p>
                  </div>
                </div>
              </div>
              <InputField
                label='Subdomain'
                value={subdomain}
                onChange={setSubdomain}
                placeholder={brandName.toLowerCase().replace(/\s+/g, '') || 'yourbrand'}
                suffix='.peptiful.com'
                hint='This will be your storefront URL'
              />
              <div className='space-y-1.5'>
                <label className='text-label-sm text-text-strong-950'>Brand Color</label>
                <div className='flex items-center gap-3'>
                  <input
                    type='color'
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className='size-10 cursor-pointer rounded-10 border border-stroke-soft-200 p-0.5'
                  />
                  <input
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className='h-10 w-28 rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16'
                  />
                </div>
              </div>
              <div className='space-y-1.5'>
                <label className='text-label-sm text-text-strong-950'>Store Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder='Tell customers what your brand is about...'
                  rows={3}
                  className='w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 py-2.5 text-paragraph-sm text-text-strong-950 placeholder:text-text-disabled-300 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16 resize-none'
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Connect Payment */}
        {step === 5 && (
          <div className='mx-auto max-w-lg space-y-6'>
            <div className='text-center'>
              <h2 className='text-title-h4 text-text-strong-950'>Connect your payment method</h2>
              <p className='mt-2 text-paragraph-sm text-text-sub-600'>
                Set up Stripe to accept payments and receive payouts.
              </p>
            </div>
            <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-6 shadow-regular-xs space-y-5'>
              <div className='flex items-center gap-4 rounded-xl border border-stroke-soft-200 bg-bg-weak-50 p-5'>
                <div className='flex size-12 items-center justify-center rounded-xl bg-[#635BFF]/10'>
                  <span className='text-label-lg font-bold text-[#635BFF]'>S</span>
                </div>
                <div className='flex-1'>
                  <p className='text-label-md text-text-strong-950'>Stripe</p>
                  <p className='text-paragraph-xs text-text-sub-600'>
                    Accept credit cards, Apple Pay, Google Pay and more
                  </p>
                </div>
                <Button variant='primary' size='md'>
                  Connect Stripe
                  <RiExternalLinkLine className='size-4' />
                </Button>
              </div>
              <div className='rounded-10 border border-information-light bg-information-lighter p-4'>
                <p className='text-label-xs text-information-dark'>How payouts work</p>
                <ul className='mt-2 space-y-1 text-paragraph-xs text-text-sub-600'>
                  <li>Customers pay via your storefront → Stripe processes the payment</li>
                  <li>Peptiful fulfills the order and deducts wholesale cost</li>
                  <li>Your profit is deposited to your bank account monthly</li>
                </ul>
              </div>
              <p className='text-paragraph-xs text-text-soft-400 text-center'>
                You can skip this step and connect later from Store Settings.
              </p>
            </div>
          </div>
        )}

        {/* Step 6: Review & Publish */}
        {step === 6 && (
          <div className='mx-auto max-w-lg space-y-6'>
            <div className='text-center'>
              <h2 className='text-title-h4 text-text-strong-950'>You&apos;re almost there!</h2>
              <p className='mt-2 text-paragraph-sm text-text-sub-600'>
                Review your setup and publish your store.
              </p>
            </div>
            <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs overflow-hidden'>
              {[
                { label: 'Brand Name', value: brandName || 'Not set', ok: !!brandName },
                { label: 'Email', value: email || 'Not set', ok: !!email },
                { label: 'Products', value: `${selectedProducts.length} selected`, ok: selectedProducts.length > 0 },
                { label: 'Storefront', value: subdomain ? `${subdomain}.peptiful.com` : 'Not set', ok: !!subdomain },
                { label: 'Payment', value: 'Stripe (skipped)', ok: false },
              ].map((item, i) => (
                <div key={item.label} className={cn(
                  'flex items-center justify-between px-5 py-4',
                  i < 4 && 'border-b border-stroke-soft-200',
                )}>
                  <div className='flex items-center gap-3'>
                    <div className={cn(
                      'flex size-7 items-center justify-center rounded-full',
                      item.ok ? 'bg-success-lighter text-success-base' : 'bg-bg-soft-200 text-text-disabled-300',
                    )}>
                      {item.ok ? <RiCheckLine className='size-4' /> : <RiSubtractLine className='size-4' />}
                    </div>
                    <span className='text-label-sm text-text-strong-950'>{item.label}</span>
                  </div>
                  <span className={cn(
                    'text-paragraph-sm',
                    item.ok ? 'text-text-sub-600' : 'text-text-disabled-300',
                  )}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Preview Card */}
            <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-6 shadow-regular-xs'>
              <p className='mb-3 text-label-xs text-text-sub-600 uppercase tracking-wider'>Store Preview</p>
              <div className='rounded-xl border border-stroke-soft-200 bg-bg-weak-50 p-8 text-center'>
                <div className='mx-auto mb-3 flex size-14 items-center justify-center rounded-xl' style={{ backgroundColor: primaryColor }}>
                  <RiStoreLine className='size-7 text-white' />
                </div>
                <p className='text-label-lg text-text-strong-950'>{brandName || 'Your Brand'}</p>
                <p className='mt-1 text-paragraph-xs text-text-sub-600'>
                  {subdomain ? `${subdomain}.peptiful.com` : 'yourbrand.peptiful.com'}
                </p>
                <p className='mt-2 text-paragraph-sm text-text-sub-600'>
                  {description || 'Premium peptides and supplements'}
                </p>
                <div className='mt-4 flex items-center justify-center gap-3'>
                  {selectedProducts.slice(0, 4).map((sp) => (
                    <div key={sp.id} className='relative size-12 overflow-hidden rounded-lg bg-bg-weak-50'>
                      <Image src='/peptiful-vial.png' alt='Product' fill className='object-contain p-1' sizes='48px' />
                    </div>
                  ))}
                  {selectedProducts.length > 4 && (
                    <div className='flex size-12 items-center justify-center rounded-lg bg-bg-soft-200 text-label-xs text-text-sub-600'>
                      +{selectedProducts.length - 4}
                    </div>
                  )}
                  {selectedProducts.length === 0 && (
                    <div className='flex items-center gap-2 text-paragraph-xs text-text-soft-400'>
                      <RiShoppingBag3Line className='size-3.5' />
                      No products yet
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className='mt-8 flex items-center justify-between border-t border-stroke-soft-200 pt-6'>
          <Button
            variant='ghost'
            size='md'
            onClick={() => step === 1 ? router.push('/brand') : setStep(step - 1)}
          >
            <RiArrowLeftLine className='size-4' />
            {step === 1 ? 'Cancel' : 'Back'}
          </Button>
          {step < 6 ? (
            <Button
              size='md'
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
            >
              Continue
              <RiArrowRightLine className='size-4' />
            </Button>
          ) : (
            <Button
              size='lg'
              onClick={() => router.push('/brand')}
            >
              <RiRocketLine className='size-4' />
              Publish Store
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
