'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { RiSearchLine, RiArrowDownSLine } from '@remixicon/react';
import { cn } from '@/utils/cn';
import { PageHeader } from '@/components/ui/page-header-new';
import { Badge } from '@/components/ui/badge-new';
import { Button } from '@/components/ui/button-new';

const CATEGORIES = [
  'All',
  'Weight Loss',
  'Sexual Wellness',
  'Recovery',
  'Cognitive',
  'Immune',
  'Longevity',
  'Bio Regulators',
  'Vitamins',
  'Research Grade',
] as const;

const CATEGORY_COLORS: Record<string, 'primary' | 'success' | 'information' | 'warning' | 'feature' | 'gray' | 'error'> = {
  'Weight Loss': 'warning',
  'Sexual Wellness': 'feature',
  'Recovery': 'success',
  'Cognitive': 'information',
  'Immune': 'primary',
  'Longevity': 'success',
  'Bio Regulators': 'feature',
  'Vitamins': 'warning',
  'Research Grade': 'error',
};

const PRODUCTS = [
  {
    id: 1,
    name: 'BPC-157 (Body Protective Compound)',
    category: 'Recovery',
    wholesale: '$18.50 - $24.00',
    retail: '$89.99',
    initials: 'BPC',
    gradient: 'from-emerald-50 to-emerald-100',
    isNew: true,
    desc: '5mg lyophilized peptide for tissue repair',
  },
  {
    id: 2,
    name: 'Semaglutide (GLP-1 Agonist)',
    category: 'Weight Loss',
    wholesale: '$32.00 - $45.00',
    retail: '$189.99',
    initials: 'SEM',
    gradient: 'from-orange-50 to-orange-100',
    isNew: true,
    desc: 'GLP-1 receptor agonist for metabolic support',
  },
  {
    id: 3,
    name: 'PT-141 (Bremelanotide)',
    category: 'Sexual Wellness',
    wholesale: '$14.00 - $20.00',
    retail: '$79.99',
    initials: 'PT',
    gradient: 'from-purple-50 to-purple-100',
    isNew: false,
    desc: 'Melanocortin receptor agonist',
  },
  {
    id: 4,
    name: 'TB-500 (Thymosin Beta-4)',
    category: 'Recovery',
    wholesale: '$22.00 - $28.00',
    retail: '$99.99',
    initials: 'TB',
    gradient: 'from-teal-50 to-teal-100',
    isNew: false,
    desc: '5mg peptide for accelerated healing',
  },
  {
    id: 5,
    name: 'Selank (Anxiolytic Peptide)',
    category: 'Cognitive',
    wholesale: '$12.00 - $16.00',
    retail: '$69.99',
    initials: 'SEL',
    gradient: 'from-blue-50 to-blue-100',
    isNew: true,
    desc: 'Tuftsin analog for cognitive enhancement',
  },
  {
    id: 6,
    name: 'Thymalin (Thymic Peptide)',
    category: 'Immune',
    wholesale: '$8.00 - $14.00',
    retail: '$59.99',
    initials: 'THY',
    gradient: 'from-sky-50 to-sky-100',
    isNew: false,
    desc: 'Bioregulator for immune modulation',
  },
  {
    id: 7,
    name: 'Epithalon (Epitalon)',
    category: 'Longevity',
    wholesale: '$15.00 - $22.00',
    retail: '$84.99',
    initials: 'EPI',
    gradient: 'from-green-50 to-green-100',
    isNew: true,
    desc: 'Telomerase activator for anti-aging',
  },
  {
    id: 8,
    name: 'Tirzepatide (Dual GIP/GLP-1)',
    category: 'Weight Loss',
    wholesale: '$38.00 - $52.00',
    retail: '$219.99',
    initials: 'TIR',
    gradient: 'from-amber-50 to-amber-100',
    isNew: true,
    desc: 'Dual incretin agonist for weight management',
  },
  {
    id: 9,
    name: 'NAD+ Precursor Complex',
    category: 'Longevity',
    wholesale: '$12.00 - $18.00',
    retail: '$79.99',
    initials: 'NAD',
    gradient: 'from-violet-50 to-violet-100',
    isNew: false,
    desc: 'Nicotinamide riboside + NMN blend',
  },
  {
    id: 10,
    name: 'Semax (Nootropic Peptide)',
    category: 'Cognitive',
    wholesale: '$10.00 - $15.00',
    retail: '$64.99',
    initials: 'SMX',
    gradient: 'from-indigo-50 to-indigo-100',
    isNew: false,
    desc: 'ACTH analog for neuroprotection',
  },
  {
    id: 11,
    name: 'Khavinson Bio Regulator Kit',
    category: 'Bio Regulators',
    wholesale: '$24.00 - $32.00',
    retail: '$129.99',
    initials: 'KBR',
    gradient: 'from-fuchsia-50 to-fuchsia-100',
    isNew: false,
    desc: 'Multi-organ peptide bioregulator set',
  },
  {
    id: 12,
    name: 'Vitamin D3 + K2 Complex',
    category: 'Vitamins',
    wholesale: '$3.50 - $7.00',
    retail: '$28.99',
    initials: 'D3K',
    gradient: 'from-yellow-50 to-yellow-100',
    isNew: false,
    desc: 'Synergistic vitamin complex for bone health',
  },
];

export default function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [search, setSearch] = useState('');

  const filtered = PRODUCTS.filter((p) => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className='space-y-6'>
      <PageHeader
        title='Product Catalog'
        description='Browse our curated catalog of peptides, supplements, and wellness products'
        actions={
          <div className='relative w-72 sm:w-80'>
            <RiSearchLine className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-soft-400' />
            <input
              type='search'
              placeholder='Search products...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='h-9 w-full rounded-10 border border-stroke-soft-200 bg-bg-white-0 pl-9 pr-3 text-label-sm text-text-strong-950 placeholder:text-text-soft-400 shadow-custom-input focus:outline-none focus:ring-2 focus:ring-primary-alpha-16'
            />
          </div>
        }
      />

      <div className='sticky top-0 z-10 -mx-6 -mt-2 bg-bg-weak-50/95 px-6 py-4 backdrop-blur-sm lg:-mx-8 lg:px-8'>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div className='flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1'>
            {CATEGORIES.map((cat) => (
              <Button
                key={cat}
                variant='ghost'
                size='xs'
                className={cn(
                  activeCategory === cat &&
                    'bg-primary-alpha-10 text-primary-base hover:bg-primary-alpha-16',
                )}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
          <div className='flex items-center gap-4'>
            <button className='flex items-center gap-1.5 text-label-xs text-text-sub-600 hover:text-text-strong-950 cursor-pointer'>
              Sort by: Recommended
              <RiArrowDownSLine className='size-4' />
            </button>
            <span className='text-paragraph-xs text-text-soft-400'>
              {filtered.length} products
            </span>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {filtered.map((product) => (
          <Link
            key={product.id}
            href={`/brand/catalog/${product.id}`}
            className='group flex flex-col overflow-hidden rounded-xl border border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs transition-shadow hover:shadow-regular-sm'
          >
            <div className='relative h-[180px] shrink-0'>
              <div
                className={cn(
                  'relative flex h-full w-full items-center justify-center bg-gradient-to-br',
                  product.gradient,
                )}
              >
                <Image
                  src='/peptiful-vial.jpg'
                  alt={product.name}
                  fill
                  className='object-contain p-4 transition-transform duration-300 group-hover:scale-105'
                  sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
                />
              </div>
              {product.isNew && (
                <Badge
                  variant='filled'
                  color='primary'
                  size='sm'
                  className='absolute left-3 top-3'
                >
                  NEW
                </Badge>
              )}
            </div>
            <div className='flex flex-1 flex-col gap-2.5 p-4'>
              <Badge
                variant='light'
                color={CATEGORY_COLORS[product.category] ?? 'gray'}
                size='sm'
                className='w-fit'
              >
                {product.category}
              </Badge>
              <h3 className='text-label-sm text-text-strong-950 line-clamp-2'>
                {product.name}
              </h3>
              <p className='text-paragraph-xs text-text-soft-400 line-clamp-1'>
                {product.desc}
              </p>
              <div className='mt-auto space-y-1 pt-2'>
                <div className='flex items-center justify-between'>
                  <span className='text-paragraph-xs text-text-sub-600'>Wholesale</span>
                  <span className='text-paragraph-xs text-text-sub-600'>{product.wholesale}</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-label-xs text-text-sub-600'>Suggested Retail</span>
                  <span className='text-label-sm text-text-strong-950'>{product.retail}</span>
                </div>
              </div>
              <div className='mt-2 flex h-8 w-full items-center justify-center rounded-10 border border-stroke-soft-200 text-label-xs text-text-sub-600 transition-colors group-hover:border-primary-alpha-16 group-hover:text-primary-base'>
                View Details
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className='flex flex-col items-center justify-between gap-4 border-t border-stroke-soft-200 pt-6 sm:flex-row'>
        <p className='text-paragraph-sm text-text-sub-600'>
          Showing 1-{filtered.length} of {filtered.length} products
        </p>
        <div className='flex items-center gap-1'>
          <Button variant='ghost' size='sm' disabled>
            Previous
          </Button>
          <Button variant='primary' size='sm'>
            1
          </Button>
          <Button variant='ghost' size='sm'>
            2
          </Button>
          <Button variant='ghost' size='sm'>
            3
          </Button>
          <Button variant='ghost' size='sm'>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
