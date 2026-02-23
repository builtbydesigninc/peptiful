'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { cn } from '@/utils/cn';
import { Badge } from '@/components/ui/badge-new';
import { Button } from '@/components/ui/button-new';
import {
  RiArrowLeftLine,
  RiCheckLine,
  RiEditLine,
  RiUploadCloud2Line,
  RiArrowDownSLine,
  RiExternalLinkLine,
  RiPaintBrushLine,
  RiCheckboxCircleLine,
  RiShieldCheckLine,
  RiLeafLine,
  RiFlaskLine,
} from '@remixicon/react';

export default function ProductEditPage() {
  const router = useRouter();
  const [step1Open, setStep1Open] = React.useState(true);
  const [step2Open, setStep2Open] = React.useState(false);
  const [step3Open, setStep3Open] = React.useState(false);

  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-3'>
        <button onClick={() => router.back()} className='flex items-center gap-1.5 text-label-sm text-text-sub-600 hover:text-primary-base transition-colors cursor-pointer'>
          <RiArrowLeftLine className='size-4' />
          Back
        </button>
        <span className='text-text-soft-400'>|</span>
        <span className='text-paragraph-xs text-text-sub-600'>View product in catalog</span>
      </div>

      <div className='flex items-start gap-2'>
        <div>
          <h1 className='text-title-h5 text-text-strong-950'>Editing: BPC-157 (Body Protective Compound)</h1>
          <Badge variant='light' color='warning' size='sm' className='mt-1'>Draft</Badge>
        </div>
      </div>

      <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
        {/* Left: Image + Steps */}
        <div className='space-y-5'>
          {/* Product Image with Label Overlay */}
          <div className='relative flex aspect-[4/5] items-center justify-center rounded-xl border border-stroke-soft-200 bg-bg-weak-50 overflow-hidden'>
            <Image src='/peptiful-vial.png' alt='Product preview' fill className='object-cover' sizes='(max-width: 1024px) 100vw, 50vw' />
          </div>

          {/* Step 1: Customize the Label */}
          <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs overflow-hidden'>
            <button onClick={() => setStep1Open(!step1Open)} className='flex w-full items-center justify-between px-5 py-4 cursor-pointer hover:bg-bg-weak-50 transition-colors'>
              <div className='flex items-center gap-3'>
                <Badge variant='filled' color='primary' size='sm'>Step 1</Badge>
                <span className='text-label-md text-text-strong-950'>Customize the label</span>
              </div>
              <RiArrowDownSLine className={cn('size-5 text-text-soft-400 transition-transform', step1Open && 'rotate-180')} />
            </button>
            {step1Open && (
              <div className='border-t border-stroke-soft-200 px-5 py-4 space-y-3'>
                <p className='text-paragraph-xs text-text-sub-600'>Pick your tool below to customize the label template.</p>
                {[
                  { label: 'Learn how to create label files (recommended)', color: 'bg-emerald-50 text-emerald-600' },
                  { label: 'Canva editor (easy)', color: 'bg-blue-50 text-blue-600' },
                  { label: 'Adobe Illustrator (advanced)', color: 'bg-orange-50 text-orange-600' },
                  { label: 'Done-for-you design (recommended)', color: 'bg-emerald-50 text-emerald-600' },
                ].map((tool) => (
                  <div key={tool.label} className='flex items-center justify-between rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-4 py-3 hover:bg-bg-weak-50 transition-colors cursor-pointer'>
                    <span className='text-paragraph-sm text-text-strong-950'>{tool.label}</span>
                    <div className={cn('flex size-7 items-center justify-center rounded-full', tool.color)}>
                      <RiExternalLinkLine className='size-3.5' />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Step 2: Upload Label PDF */}
          <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs overflow-hidden'>
            <button onClick={() => setStep2Open(!step2Open)} className='flex w-full items-center justify-between px-5 py-4 cursor-pointer hover:bg-bg-weak-50 transition-colors'>
              <div className='flex items-center gap-3'>
                <Badge variant='stroke' color='gray' size='sm'>Step 2</Badge>
                <span className='text-label-md text-text-strong-950'>Upload label PDF</span>
              </div>
              <RiArrowDownSLine className={cn('size-5 text-text-soft-400 transition-transform', step2Open && 'rotate-180')} />
            </button>
            {step2Open && (
              <div className='border-t border-stroke-soft-200 px-5 py-4 space-y-3'>
                <p className='text-paragraph-xs text-text-sub-600'>Upload a print quality PDF file. The product image above will refresh automatically.</p>
                <div className='rounded-10 border border-warning-light bg-warning-lighter p-3'>
                  <p className='text-paragraph-xs text-text-sub-600'>
                    <strong>Before uploading:</strong>
                  </p>
                  <ul className='mt-1 space-y-0.5 text-paragraph-xs text-text-sub-600'>
                    <li>Check that label size is 1.5&quot;(h) x 3.5&quot;(w) and does not exceed 10MB</li>
                    <li>Check required and allowed content</li>
                    <li>Place your <strong>business name</strong> and <strong>legal address</strong> on the label</li>
                  </ul>
                </div>
                <Button size='md'>
                  <RiUploadCloud2Line className='size-4' />
                  Upload PDF
                </Button>
              </div>
            )}
          </div>

          {/* Step 3: Start Selling */}
          <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs overflow-hidden'>
            <button onClick={() => setStep3Open(!step3Open)} className='flex w-full items-center justify-between px-5 py-4 cursor-pointer hover:bg-bg-weak-50 transition-colors'>
              <div className='flex items-center gap-3'>
                <Badge variant='stroke' color='gray' size='sm'>Step 3</Badge>
                <span className='text-label-md text-text-strong-950'>Start selling</span>
              </div>
              <RiArrowDownSLine className={cn('size-5 text-text-soft-400 transition-transform', step3Open && 'rotate-180')} />
            </button>
            {step3Open && (
              <div className='border-t border-stroke-soft-200 px-5 py-4 space-y-3'>
                <div className='space-y-2'>
                  {[
                    { label: 'Upload label print PDF file', done: false },
                    { label: 'Set up your store', done: true },
                    { label: 'Add payment method', done: true },
                  ].map((item) => (
                    <div key={item.label} className='flex items-center gap-2'>
                      {item.done ? (
                        <RiCheckboxCircleLine className='size-5 text-success-base' />
                      ) : (
                        <div className='size-5 rounded-full border-2 border-stroke-soft-200' />
                      )}
                      <span className={cn('text-paragraph-sm', item.done ? 'text-text-sub-600' : 'text-text-strong-950')}>{item.label}</span>
                    </div>
                  ))}
                </div>
                <Button size='md' disabled>Publish</Button>
              </div>
            )}
          </div>
        </div>

        {/* Right: Product Details (editable) */}
        <div className='space-y-5'>
          <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-6 shadow-regular-xs space-y-4'>
            {/* Product Name */}
            <div className='flex items-start justify-between'>
              <div className='flex-1'>
                <h2 className='text-title-h5 text-text-strong-950'>BPC-157 (Body Protective Compound)</h2>
              </div>
              <button className='flex size-7 items-center justify-center rounded-full bg-success-base text-white cursor-pointer'>
                <RiCheckLine className='size-4' />
              </button>
            </div>

            {/* Price */}
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-title-h5 text-text-strong-950'>$89.99</p>
                <p className='text-paragraph-xs text-text-sub-600'>Your wholesale price: $22.00</p>
              </div>
              <button className='flex size-7 items-center justify-center rounded-full bg-success-base text-white cursor-pointer'>
                <RiCheckLine className='size-4' />
              </button>
            </div>

            {/* Description */}
            <div>
              <p className='text-paragraph-sm text-text-sub-600 leading-relaxed'>
                <strong>BPC-157</strong> is a synthetic peptide derived from a protein found in human gastric juice. It has been extensively researched for its tissue-healing properties, including tendons, ligaments, muscles, and the nervous system.
              </p>
              <button className='mt-1 flex size-7 items-center justify-center rounded-full bg-success-base text-white cursor-pointer ml-auto'>
                <RiCheckLine className='size-4' />
              </button>
            </div>

            {/* Specs */}
            <div className='space-y-1 text-paragraph-xs text-text-sub-600'>
              <p><strong>Manufacturer&apos;s country:</strong> USA</p>
              <p><strong>Product amount:</strong> 5mg lyophilized powder / 1 vial</p>
              <p><strong>Gross weight:</strong> 2.7 oz / 0.17lbs / 76g</p>
              <p><strong>Suggested use:</strong> For research purposes. Reconstitute with bacteriostatic water.</p>
              <p><strong>Purity:</strong> ≥98% (HPLC verified)</p>
              <p><strong>Warning:</strong> For research use only. Not for human consumption. Keep out of reach of children. Store in a cool, dry place.</p>
            </div>

            {/* Certifications */}
            <div className='flex flex-wrap gap-2 pt-2'>
              {['GMP Certified', 'Lab Tested', 'Cruelty Free', 'USA Made', 'COA Available', 'Third Party'].map((c) => (
                <div key={c} className='flex items-center gap-1.5 rounded-full border border-stroke-soft-200 bg-bg-weak-50 px-3 py-1.5'>
                  <RiShieldCheckLine className='size-3.5 text-text-soft-400' />
                  <span className='text-label-2xs text-text-sub-600'>{c}</span>
                </div>
              ))}
            </div>

            {/* Custom SKU */}
            <div className='border-t border-stroke-soft-200 pt-4'>
              <label className='text-label-xs text-text-sub-600'>Custom SKU ID (optional)</label>
              <div className='mt-1 flex items-center gap-2'>
                <input placeholder='e.g. BPC157-5MG' className='h-9 flex-1 rounded-10 border border-stroke-soft-200 bg-bg-white-0 px-3 text-paragraph-sm text-text-strong-950 placeholder:text-text-disabled-300 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16' />
                <button className='flex size-7 items-center justify-center rounded-full bg-success-base text-white cursor-pointer'>
                  <RiCheckLine className='size-4' />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
