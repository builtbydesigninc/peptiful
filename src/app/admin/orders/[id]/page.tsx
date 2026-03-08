'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge-new';
import { Button } from '@/components/ui/button-new';
import {
  RiArrowLeftLine, RiTruckLine, RiMapPinLine, RiUserLine,
  RiFileList3Line, RiPercentLine, RiTimeLine,
} from '@remixicon/react';
import { adminApi } from '@/lib/api-client';

export default function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = React.use(params);

  const [order, setOrder] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  const fetchOrder = async () => {
    setLoading(true);
    try {
      const data = await adminApi.getOrder(id);
      setOrder(data);
    } catch (error) {
      console.error('Failed to fetch order:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className='flex items-center justify-center p-24'>
        <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-primary-base' />
      </div>
    );
  }

  if (!order) {
    return (
      <div className='p-12 text-center'>
        <p className='text-text-sub-600 mb-4'>Order not found</p>
        <Button onClick={() => router.push('/admin/orders')}>Back to Orders</Button>
      </div>
    );
  }

  const subtotal = Number(order.subtotal);
  const total = Number(order.total);
  const shipping = Number(order.shippingAmount);
  const tax = Number(order.taxAmount);
  const wholesaleTotal = Number(order.wholesaleTotal);
  const commissionTotal = Number(order.commissionTotal);

  // Platform net: what stays after paying lab cost and commissions
  const net = total - Number(order.labCostTotal || 0) - commissionTotal;

  return (
    <div className='space-y-6'>
      <button onClick={() => router.back()} className='flex items-center gap-1.5 text-label-sm text-text-sub-600 hover:text-primary-base transition-colors cursor-pointer'>
        <RiArrowLeftLine className='size-4' />Back to Orders
      </button>

      <div className='flex items-center justify-between'>
        <div>
          <div className='flex items-center gap-3'>
            <h1 className='text-title-h4 text-text-strong-950'>#{order.orderNumber}</h1>
            <Badge
              variant='light'
              color={
                order.status === 'DELIVERED' || order.status === 'SHIPPED' ? 'success' :
                  order.status === 'CANCELLED' || order.status === 'PAYMENT_FAILED' ? 'error' :
                    'primary'
              }
              size='md'
              dot
            >
              {order.status.charAt(0).toUpperCase() + order.status.slice(1).toLowerCase().replace('_', ' ')}
            </Badge>
          </div>
          <p className='mt-1 text-paragraph-sm text-text-sub-600'>
            {new Date(order.createdAt).toLocaleString()} — {order.brand?.name}
          </p>
        </div>
      </div>

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
        {/* Left column */}
        <div className='lg:col-span-2 space-y-6'>
          {/* Line Items */}
          <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs overflow-hidden'>
            <div className='border-b border-stroke-soft-200 px-5 py-4 flex items-center gap-2'>
              <RiFileList3Line className='size-4 text-text-soft-400' />
              <h3 className='text-label-md text-text-strong-950'>Line Items</h3>
            </div>
            <table className='w-full'>
              <thead>
                <tr className='border-b border-stroke-soft-200 bg-bg-weak-50'>
                  {['Product', 'Qty', 'Wholesale', 'Retail', 'Profit'].map((h) => (
                    <th key={h} className='px-5 py-2.5 text-left text-label-xs uppercase tracking-wider text-text-sub-600'>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {order.items.map((item: any) => {
                  const retail = Number(item.retailPrice);
                  const wholesale = Number(item.wholesalePrice);
                  return (
                    <tr key={item.id} className='border-b border-stroke-soft-200 last:border-0'>
                      <td className='px-5 py-3.5'>
                        <div className='text-label-sm text-text-strong-950'>{item.product?.name}</div>
                        {item.product?.sku && <div className='text-paragraph-xs text-text-soft-400 font-mono uppercase'>{item.product.sku}</div>}
                      </td>
                      <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{item.quantity}</td>
                      <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>${wholesale.toFixed(2)}</td>
                      <td className='px-5 py-3.5 text-label-sm text-text-strong-950'>${retail.toFixed(2)}</td>
                      <td className='px-5 py-3.5 text-label-sm text-success-base'>${(retail - wholesale).toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className='bg-bg-weak-50'>
                  <td className='px-5 py-3 text-label-sm text-text-strong-950'>Subtotal</td>
                  <td className='px-5 py-3 text-paragraph-sm text-text-sub-600'>{order.items.reduce((s: number, i: any) => s + i.quantity, 0)}</td>
                  <td className='px-5 py-3 text-label-sm text-text-sub-600'>${wholesaleTotal.toFixed(2)}</td>
                  <td className='px-5 py-3 text-label-sm text-text-strong-950'>${subtotal.toFixed(2)}</td>
                  <td className='px-5 py-3 text-label-sm text-success-base'>${(subtotal - wholesaleTotal).toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Commission Breakdown */}
          <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 shadow-regular-xs overflow-hidden'>
            <div className='border-b border-stroke-soft-200 px-5 py-4 flex items-center gap-2'>
              <RiPercentLine className='size-4 text-text-soft-400' />
              <h3 className='text-label-md text-text-strong-950'>Commission Breakdown</h3>
            </div>
            <div className='divide-y divide-stroke-soft-200'>
              {order.commissions?.length > 0 ? order.commissions.map((c: any) => (
                <div key={c.id} className='flex items-center justify-between px-5 py-3.5'>
                  <div>
                    <div className='flex items-center gap-2'>
                      <p className='text-label-sm text-text-strong-950'>{c.recipientType}</p>
                      <Badge variant='light' color='primary' size='sm'>{c.status}</Badge>
                    </div>
                    <p className='text-paragraph-xs text-text-sub-600'>Created {new Date(c.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span className='text-label-sm text-text-strong-950'>${Number(c.amount).toFixed(2)}</span>
                </div>
              )) : (
                <div className='px-5 py-8 text-center text-paragraph-sm text-text-soft-400'>No commissions generated</div>
              )}
            </div>
          </div>

          {/* Timeline */}
          <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-5 shadow-regular-xs'>
            <div className='flex items-center gap-2 mb-4'>
              <RiTimeLine className='size-4 text-text-soft-400' />
              <h3 className='text-label-md text-text-strong-950'>Order Activity</h3>
            </div>
            <div className='space-y-4'>
              {order.timeline?.map((t: any, i: number) => (
                <div key={t.id} className='flex gap-3'>
                  <div className='flex flex-col items-center'>
                    <div className='size-2.5 rounded-full bg-primary-base' />
                    {i < order.timeline.length - 1 && <div className='w-px flex-1 bg-stroke-soft-200' />}
                  </div>
                  <div className='pb-4'>
                    <p className='text-label-xs text-text-strong-950'>{t.event}</p>
                    <p className='text-paragraph-xs text-text-soft-400'>{new Date(t.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className='space-y-6'>
          {/* Customer */}
          <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-5 shadow-regular-xs'>
            <div className='flex items-center gap-2 mb-3'>
              <RiUserLine className='size-4 text-text-soft-400' />
              <h3 className='text-label-md text-text-strong-950'>Customer</h3>
            </div>
            <div className='space-y-2 text-paragraph-sm'>
              <p className='text-text-strong-950'>{order.customer?.name}</p>
              <p className='text-text-sub-600'>{order.customer?.email}</p>
              {order.customer?.phone && <p className='text-text-sub-600'>{order.customer.phone}</p>}
            </div>
          </div>

          {/* Shipping */}
          <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-5 shadow-regular-xs'>
            <div className='flex items-center gap-2 mb-3'>
              <RiMapPinLine className='size-4 text-text-soft-400' />
              <h3 className='text-label-md text-text-strong-950'>Shipping Address</h3>
            </div>
            {order.shippingAddress ? (
              <div className='space-y-1 text-paragraph-sm text-text-sub-600'>
                <p>{(order.shippingAddress as any).name || order.customer?.name}</p>
                <p>{(order.shippingAddress as any).addressLine1}</p>
                {(order.shippingAddress as any).addressLine2 && <p>{(order.shippingAddress as any).addressLine2}</p>}
                <p>{(order.shippingAddress as any).city}, {(order.shippingAddress as any).state} {(order.shippingAddress as any).postalCode}</p>
                <p>{(order.shippingAddress as any).country}</p>
              </div>
            ) : (
              <p className='text-paragraph-sm text-text-soft-400'>N/A</p>
            )}
          </div>

          {/* Tracking */}
          <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-5 shadow-regular-xs'>
            <div className='flex items-center gap-2 mb-3'>
              <RiTruckLine className='size-4 text-text-soft-400' />
              <h3 className='text-label-md text-text-strong-950'>Tracking</h3>
            </div>
            {order.trackingNumber ? (
              <div className='space-y-2'>
                <div className='flex justify-between text-paragraph-sm'>
                  <span className='text-text-sub-600'>Carrier</span>
                  <span className='text-text-strong-950'>{order.trackingCarrier}</span>
                </div>
                <div className='text-paragraph-xs text-primary-base font-mono break-all'>{order.trackingNumber}</div>
                {order.trackingUrl && (
                  <Button variant='secondary' size='xs' className='w-full mt-2' asChild>
                    <a href={order.trackingUrl} target='_blank' rel='noreferrer'>Track Shipment</a>
                  </Button>
                )}
              </div>
            ) : (
              <p className='text-paragraph-sm text-text-soft-400 italic font-medium'>No tracking info yet</p>
            )}
          </div>

          {/* Summary */}
          <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-5 shadow-regular-xs'>
            <h3 className='text-label-md text-text-strong-950 mb-3'>Order Summary</h3>
            <div className='space-y-2'>
              {[
                { label: 'Subtotal', value: `$${subtotal.toFixed(2)}` },
                { label: 'Shipping', value: `$${shipping.toFixed(2)}` },
                { label: 'Tax', value: `$${tax.toFixed(2)}` },
                { label: 'Total Paid', value: `$${total.toFixed(2)}`, bold: true },
              ].map((r) => (
                <div key={r.label} className={`flex justify-between text-paragraph-sm ${r.bold ? 'border-t border-stroke-soft-200 pt-2 font-medium' : ''}`}>
                  <span className='text-text-sub-600'>{r.label}</span>
                  <span className='text-text-strong-950'>{r.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
