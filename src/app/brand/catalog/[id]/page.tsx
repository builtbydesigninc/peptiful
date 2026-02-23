'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { cn } from '@/utils/cn';
import { Badge } from '@/components/ui/badge-new';
import { Button } from '@/components/ui/button-new';
import {
  RiArrowLeftLine,
  RiShoppingCartLine,
  RiInformationLine,
  RiTruckLine,
  RiShieldCheckLine,
  RiLeafLine,
  RiFlaskLine,
  RiTestTubeLine,
  RiCheckLine,
  RiStarFill,
} from '@remixicon/react';

const product = {
  id: 'p1',
  name: 'BPC-157 (Body Protective Compound)',
  category: 'Recovery',
  wholesale: 22.0,
  priceRange: '$18.50 - $24.00',
  suggestedRetail: 89.99,
  shippingCost: 4.50,
  fulfillmentFee: 3.98,
  description:
    'BPC-157 is a synthetic peptide derived from a protein found in human gastric juice. It has been extensively researched for its tissue-healing properties, including tendons, ligaments, muscles, and the nervous system. This 5mg lyophilized peptide comes in a sealed vial for reconstitution.',
  benefits: [
    'Accelerates tissue repair and wound healing',
    'Supports gut lining integrity',
    'Promotes tendon and ligament recovery',
    'Neuroprotective properties',
  ],
  specs: {
    'Manufacturer\'s Country': 'USA',
    'Product Amount': '5mg lyophilized powder',
    'Gross Weight': '2.7 oz / 0.17lbs / 76g',
    'Suggested Use': 'For research purposes. Reconstitute with bacteriostatic water.',
    Purity: '≥98% (HPLC verified)',
    Storage: 'Store at -20°C. Keep away from light.',
  },
  certifications: ['GMP Certified', 'Lab Tested', 'Cruelty Free', 'USA Made', 'COA Available', 'Third Party Verified'],
  rating: 4.8,
  reviews: 142,
};

export default function CatalogProductDetailPage() {
  const router = useRouter();
  const [added, setAdded] = React.useState(false);

  const margin = (((product.suggestedRetail - product.wholesale) / product.suggestedRetail) * 100).toFixed(0);

  return (
    <div className='space-y-6'>
      {/* Back */}
      <button onClick={() => router.back()} className='flex items-center gap-1.5 text-label-sm text-text-sub-600 hover:text-primary-base transition-colors cursor-pointer'>
        <RiArrowLeftLine className='size-4' />
        Back to Catalog
      </button>

      <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
        {/* Left: Product Image */}
        <div>
          <div className='relative flex aspect-square items-center justify-center rounded-xl border border-stroke-soft-200 bg-bg-weak-50 overflow-hidden'>
            <Image src='/peptiful-vial.png' alt={product.name} fill className='object-cover' sizes='(max-width: 1024px) 100vw, 50vw' priority />
          </div>
          {/* Thumbnail row */}
          <div className='mt-3 flex gap-2'>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={cn('relative flex size-16 items-center justify-center rounded-lg border overflow-hidden bg-bg-weak-50 cursor-pointer', i === 1 ? 'border-primary-base ring-2 ring-primary-alpha-10' : 'border-stroke-soft-200')}>
                <Image src='/peptiful-vial.png' alt='' fill className='object-cover' sizes='64px' />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className='space-y-5'>
          <div>
            <div className='flex items-center gap-2 mb-2'>
              <Badge variant='light' color='success' size='sm'>{product.category}</Badge>
              <div className='flex items-center gap-1 text-paragraph-xs text-text-sub-600'>
                <RiStarFill className='size-3.5 text-yellow-500' />
                {product.rating} ({product.reviews} reviews)
              </div>
            </div>
            <h1 className='text-title-h4 text-text-strong-950'>{product.name}</h1>
          </div>

          {/* Pricing Card */}
          <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-5 shadow-regular-xs'>
            <div className='flex items-baseline gap-3 mb-4'>
              <span className='text-title-h4 text-text-strong-950'>${product.wholesale.toFixed(2)}</span>
              <span className='text-paragraph-sm text-text-sub-600'>wholesale per unit</span>
            </div>
            <div className='space-y-2'>
              <div className='flex justify-between text-paragraph-sm'>
                <span className='text-text-sub-600'>Price range</span>
                <span className='text-text-strong-950'>{product.priceRange}</span>
              </div>
              <div className='flex justify-between text-paragraph-sm'>
                <span className='text-text-sub-600'>Shipping cost</span>
                <span className='text-text-strong-950'>From ${product.shippingCost.toFixed(2)}</span>
              </div>
              <div className='flex justify-between text-paragraph-sm'>
                <span className='text-text-sub-600'>Fulfillment fee</span>
                <span className='text-text-strong-950'>${product.fulfillmentFee.toFixed(2)}</span>
              </div>
              <div className='border-t border-stroke-soft-200 pt-2 flex justify-between text-paragraph-sm'>
                <span className='text-text-sub-600'>Suggested retail price</span>
                <span className='text-label-sm text-text-strong-950'>${product.suggestedRetail.toFixed(2)}</span>
              </div>
              <div className='flex justify-between text-paragraph-sm'>
                <span className='text-text-sub-600'>Your margin at suggested retail</span>
                <Badge variant='light' color='success' size='sm'>{margin}%</Badge>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className='flex gap-3'>
            {!added ? (
              <Button size='lg' className='flex-1' onClick={() => setAdded(true)}>
                <RiShoppingCartLine className='size-4' />
                Customize & Sell
              </Button>
            ) : (
              <Button size='lg' className='flex-1' variant='success' disabled>
                <RiCheckLine className='size-4' />
                Added to My Products
              </Button>
            )}
            <Button variant='secondary' size='lg'>
              Save to Drafts
            </Button>
          </div>

          <div className='rounded-10 border border-information-light bg-information-lighter p-3'>
            <p className='text-paragraph-xs text-text-sub-600'>
              <RiInformationLine className='mr-1 inline size-3.5 text-information-base' />
              After adding, you can customize the product name, description, price, and upload your own label before publishing.
            </p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-6 shadow-regular-xs'>
        <h3 className='mb-3 text-label-md text-text-strong-950'>Description</h3>
        <p className='text-paragraph-sm text-text-sub-600 leading-relaxed'>{product.description}</p>

        <h4 className='mt-5 mb-2 text-label-sm text-text-strong-950'>Key Benefits</h4>
        <ul className='space-y-1.5'>
          {product.benefits.map((b) => (
            <li key={b} className='flex items-start gap-2 text-paragraph-sm text-text-sub-600'>
              <RiCheckLine className='mt-0.5 size-4 shrink-0 text-success-base' />
              {b}
            </li>
          ))}
        </ul>
      </div>

      {/* Specs */}
      <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-6 shadow-regular-xs'>
        <h3 className='mb-3 text-label-md text-text-strong-950'>Product Specifications</h3>
        <div className='space-y-2'>
          {Object.entries(product.specs).map(([key, val]) => (
            <div key={key} className='flex justify-between border-b border-stroke-soft-200 py-2.5 last:border-0'>
              <span className='text-label-xs text-text-sub-600'>{key}</span>
              <span className='text-paragraph-sm text-text-strong-950 text-right max-w-[60%]'>{val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-6 shadow-regular-xs'>
        <h3 className='mb-4 text-label-md text-text-strong-950'>Certifications</h3>
        <div className='grid grid-cols-3 gap-3 sm:grid-cols-6'>
          {product.certifications.map((c) => (
            <div key={c} className='flex flex-col items-center gap-2 rounded-xl border border-stroke-soft-200 bg-bg-weak-50 p-3 text-center'>
              <RiShieldCheckLine className='size-6 text-success-base' />
              <span className='text-label-2xs text-text-sub-600'>{c}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
