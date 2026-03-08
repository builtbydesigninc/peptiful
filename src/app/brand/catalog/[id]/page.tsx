'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { cn } from '@/utils/cn';
import { Badge } from '@/components/ui/badge-new';
import { Button } from '@/components/ui/button-new';
import {
  RiArrowLeftLine,
  RiShoppingCartLine,
  RiInformationLine,
  RiShieldCheckLine,
  RiCheckLine,
  RiStarFill,
} from '@remixicon/react';
import { catalogApi, brandApi } from '@/lib/api-client';

export default function CatalogProductDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [product, setProduct] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [addingToStore, setAddingToStore] = React.useState(false);
  const [added, setAdded] = React.useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const p = await catalogApi.getProduct(id as string);
      setProduct(p);

      // Check if already added to store
      const brandProducts = await brandApi.getProducts({ limit: 100 });
      const isAdded = brandProducts.data?.some((bp: any) => bp.productId === id);
      setAdded(isAdded);
    } catch (error) {
      console.error('Failed to fetch product details:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (id) fetchData();
  }, [id]);

  const handleAddToStore = async () => {
    if (!product) return;
    setAddingToStore(true);
    try {
      await brandApi.addProduct(product.id, Number(product.suggestedRetail));
      setAdded(true);
      router.push('/brand/products');
    } catch (error) {
      console.error('Failed to add product to store:', error);
    } finally {
      setAddingToStore(false);
    }
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center p-24'>
        <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-primary-base' />
      </div>
    );
  }

  if (!product) {
    return (
      <div className='p-24 text-center text-text-sub-600'>Product not found.</div>
    );
  }

  const wholesalePrice = Number(product.wholesalePrice);
  const retailPrice = Number(product.suggestedRetail);
  const margin = (((retailPrice - wholesalePrice) / retailPrice) * 100).toFixed(0);

  const benefits = Array.isArray(product.benefits) ? product.benefits : [
    'Accelerates tissue repair and wound healing',
    'Supports gut lining integrity',
    'Promotes tendon and ligament recovery',
    'Neuroprotective properties',
  ];

  const specs = typeof product.specs === 'object' && product.specs !== null ? product.specs : {
    'Manufacturer\'s Country': 'USA',
    'Product Amount': 'Variable',
    'SKU': product.sku,
    'Category': product.category?.name,
    'Purity': '≥98% (HPLC verified)',
    'Storage': 'Store at correct temperature. Keep away from light.',
  };

  const certifications = Array.isArray(product.certifications) && product.certifications.length > 0
    ? product.certifications
    : ['GMP Certified', 'Lab Tested', 'Cruelty Free', 'USA Made', 'COA Available', 'Third Party Verified'];

  return (
    <div className='space-y-6'>
      <button onClick={() => router.back()} className='flex items-center gap-1.5 text-label-sm text-text-sub-600 hover:text-primary-base transition-colors cursor-pointer'>
        <RiArrowLeftLine className='size-4' />
        Back to Catalog
      </button>

      <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
        <div>
          <div className='relative flex aspect-square items-center justify-center rounded-xl border border-stroke-soft-200 bg-bg-weak-50 overflow-hidden'>
            <Image
              src={product.images?.[0] || '/peptiful-vial.png'}
              alt={product.name}
              fill
              className='object-cover'
              sizes='(max-width: 1024px) 100vw, 50vw'
              priority
            />
          </div>
          <div className='mt-3 flex gap-2'>
            {(product.images?.length > 0 ? product.images : [1]).map((img: any, i: number) => (
              <div key={i} className={cn('relative flex size-16 items-center justify-center rounded-lg border overflow-hidden bg-bg-weak-50 cursor-pointer', i === 0 ? 'border-primary-base ring-2 ring-primary-alpha-10' : 'border-stroke-soft-200')}>
                <Image src={product.images?.[i] || '/peptiful-vial.png'} alt='' fill className='object-cover' sizes='64px' />
              </div>
            ))}
          </div>
        </div>

        <div className='space-y-5'>
          <div>
            <div className='flex items-center gap-2 mb-2'>
              <Badge variant='light' color='success' size='sm'>{product.category?.name}</Badge>
              <div className='flex items-center gap-1 text-paragraph-xs text-text-sub-600'>
                <RiStarFill className='size-3.5 text-yellow-500' />
                4.8 (142 reviews)
              </div>
            </div>
            <h1 className='text-title-h4 text-text-strong-950'>{product.name}</h1>
          </div>

          <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-5 shadow-regular-xs'>
            <div className='flex items-baseline gap-3 mb-4'>
              <span className='text-title-h4 text-text-strong-950'>${wholesalePrice.toFixed(2)}</span>
              <span className='text-paragraph-sm text-text-sub-600'>wholesale per unit</span>
            </div>
            <div className='space-y-2'>
              <div className='flex justify-between text-paragraph-sm'>
                <span className='text-text-sub-600'>Estimated Shipping</span>
                <span className='text-text-strong-950'>From ${Number(product.shippingCost || 0).toFixed(2)}</span>
              </div>
              <div className='flex justify-between text-paragraph-sm'>
                <span className='text-text-sub-600'>Fulfillment fee</span>
                <span className='text-text-strong-950'>${Number(product.fulfillmentFee || 0).toFixed(2)}</span>
              </div>
              <div className='border-t border-stroke-soft-200 pt-2 flex justify-between text-paragraph-sm'>
                <span className='text-text-sub-600'>Suggested retail price</span>
                <span className='text-label-sm text-text-strong-950'>${retailPrice.toFixed(2)}</span>
              </div>
              <div className='flex justify-between text-paragraph-sm'>
                <span className='text-text-sub-600'>Potential margin</span>
                <Badge variant='light' color='success' size='sm'>{margin}%</Badge>
              </div>
            </div>
          </div>

          <div className='flex gap-3'>
            {!added ? (
              <Button size='lg' className='flex-1' onClick={handleAddToStore} disabled={addingToStore}>
                {addingToStore ? (
                  <div className='animate-spin rounded-full h-4 w-4 border-t-2 border-white' />
                ) : (
                  <RiShoppingCartLine className='size-4' />
                )}
                {addingToStore ? 'Adding to Store...' : 'Customize & Sell'}
              </Button>
            ) : (
              <Button size='lg' className='flex-1' variant='success' asChild>
                <Link href='/brand/products'>
                  <RiCheckLine className='size-4' />
                  Already in My Products
                </Link>
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

      <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-6 shadow-regular-xs'>
        <h3 className='mb-3 text-label-md text-text-strong-950'>Description</h3>
        <p className='text-paragraph-sm text-text-sub-600 leading-relaxed'>{product.description}</p>

        <h4 className='mt-5 mb-2 text-label-sm text-text-strong-950'>Key Benefits</h4>
        <ul className='space-y-1.5'>
          {benefits.map((b: any) => (
            <li key={b} className='flex items-start gap-2 text-paragraph-sm text-text-sub-600'>
              <RiCheckLine className='mt-0.5 size-4 shrink-0 text-success-base' />
              {b}
            </li>
          ))}
        </ul>
      </div>

      <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-6 shadow-regular-xs'>
        <h3 className='mb-3 text-label-md text-text-strong-950'>Product Specifications</h3>
        <div className='space-y-2'>
          {Object.entries(specs).map(([key, val]: [string, any]) => (
            <div key={key} className='flex justify-between border-b border-stroke-soft-200 py-2.5 last:border-0'>
              <span className='text-label-xs text-text-sub-600'>{key}</span>
              <span className='text-paragraph-sm text-text-strong-950 text-right max-w-[60%]'>{String(val)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-6 shadow-regular-xs'>
        <h3 className='mb-4 text-label-md text-text-strong-950'>Certifications</h3>
        <div className='grid grid-cols-3 gap-3 sm:grid-cols-6'>
          {certifications.map((c: any) => (
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
