'use client';

import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge-new';
import { Button } from '@/components/ui/button-new';
import {
  RiArrowLeftLine, RiTruckLine, RiMapPinLine, RiUserLine,
  RiFileList3Line, RiPercentLine, RiTimeLine,
} from '@remixicon/react';

const order = {
  id: '#PEP-4821',
  date: 'Feb 22, 2026 at 2:34 PM',
  status: 'delivered',
  brand: 'PeptideGains',
  customer: { name: 'Alex Thompson', email: 'alex@gmail.com', phone: '+1 (555) 123-4567' },
  shipping: { address: '285 Arcadia Ave', city: 'Uniondale', state: 'NY', zip: '11553', country: 'US' },
  items: [
    { name: 'BPC-157 (Body Protective Compound)', qty: 1, wholesale: 22.0, retail: 89.99 },
    { name: 'NAD+ Precursor Complex', qty: 1, wholesale: 15.0, retail: 79.99 },
  ],
  tracking: { carrier: 'USPS', number: '9400111899223456789012', url: '#' },
  commissions: [
    { actor: 'Marcus Rivera', type: 'Partner', rate: '5% of wholesale', amount: '$1.85' },
    { actor: 'Jessica Parker', type: 'L1 Affiliate', rate: '15% of retail', amount: '$25.50' },
    { actor: 'Mike Chen', type: 'L2 Affiliate', rate: '30% of L1 cut', amount: '$7.65' },
  ],
  timeline: [
    { event: 'Order placed', time: 'Feb 22, 2:34 PM' },
    { event: 'Payment captured (Stripe)', time: 'Feb 22, 2:34 PM' },
    { event: 'Sent to fulfillment', time: 'Feb 22, 2:45 PM' },
    { event: 'Shipped via USPS', time: 'Feb 22, 4:12 PM' },
    { event: 'Delivered', time: 'Feb 24, 11:20 AM' },
  ],
};

const totalRetail = order.items.reduce((s, i) => s + i.retail * i.qty, 0);
const totalWholesale = order.items.reduce((s, i) => s + i.wholesale * i.qty, 0);

export default function AdminOrderDetailPage() {
  const router = useRouter();

  return (
    <div className='space-y-6'>
      <button onClick={() => router.back()} className='flex items-center gap-1.5 text-label-sm text-text-sub-600 hover:text-primary-base transition-colors cursor-pointer'>
        <RiArrowLeftLine className='size-4' />Back to Orders
      </button>

      <div className='flex items-center justify-between'>
        <div>
          <div className='flex items-center gap-3'>
            <h1 className='text-title-h4 text-text-strong-950'>{order.id}</h1>
            <Badge variant='light' color='success' size='md' dot>Delivered</Badge>
          </div>
          <p className='mt-1 text-paragraph-sm text-text-sub-600'>{order.date} — {order.brand}</p>
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
                {order.items.map((item) => (
                  <tr key={item.name} className='border-b border-stroke-soft-200 last:border-0'>
                    <td className='px-5 py-3.5 text-label-sm text-text-strong-950'>{item.name}</td>
                    <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>{item.qty}</td>
                    <td className='px-5 py-3.5 text-paragraph-sm text-text-sub-600'>${item.wholesale.toFixed(2)}</td>
                    <td className='px-5 py-3.5 text-label-sm text-text-strong-950'>${item.retail.toFixed(2)}</td>
                    <td className='px-5 py-3.5 text-label-sm text-success-base'>${(item.retail - item.wholesale).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className='bg-bg-weak-50'>
                  <td className='px-5 py-3 text-label-sm text-text-strong-950'>Total</td>
                  <td className='px-5 py-3 text-paragraph-sm text-text-sub-600'>{order.items.reduce((s, i) => s + i.qty, 0)}</td>
                  <td className='px-5 py-3 text-label-sm text-text-sub-600'>${totalWholesale.toFixed(2)}</td>
                  <td className='px-5 py-3 text-label-sm text-text-strong-950'>${totalRetail.toFixed(2)}</td>
                  <td className='px-5 py-3 text-label-sm text-success-base'>${(totalRetail - totalWholesale).toFixed(2)}</td>
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
              {order.commissions.map((c) => (
                <div key={c.actor} className='flex items-center justify-between px-5 py-3.5'>
                  <div>
                    <p className='text-label-sm text-text-strong-950'>{c.actor}</p>
                    <p className='text-paragraph-xs text-text-sub-600'>{c.type} — {c.rate}</p>
                  </div>
                  <span className='text-label-sm text-text-strong-950'>{c.amount}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-5 shadow-regular-xs'>
            <div className='flex items-center gap-2 mb-4'>
              <RiTimeLine className='size-4 text-text-soft-400' />
              <h3 className='text-label-md text-text-strong-950'>Activity Timeline</h3>
            </div>
            <div className='space-y-4'>
              {order.timeline.map((t, i) => (
                <div key={i} className='flex gap-3'>
                  <div className='flex flex-col items-center'>
                    <div className='size-2.5 rounded-full bg-primary-base' />
                    {i < order.timeline.length - 1 && <div className='w-px flex-1 bg-stroke-soft-200' />}
                  </div>
                  <div className='pb-4'>
                    <p className='text-label-xs text-text-strong-950'>{t.event}</p>
                    <p className='text-paragraph-xs text-text-soft-400'>{t.time}</p>
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
              <p className='text-text-strong-950'>{order.customer.name}</p>
              <p className='text-text-sub-600'>{order.customer.email}</p>
              <p className='text-text-sub-600'>{order.customer.phone}</p>
            </div>
          </div>

          {/* Shipping */}
          <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-5 shadow-regular-xs'>
            <div className='flex items-center gap-2 mb-3'>
              <RiMapPinLine className='size-4 text-text-soft-400' />
              <h3 className='text-label-md text-text-strong-950'>Shipping Address</h3>
            </div>
            <div className='space-y-1 text-paragraph-sm text-text-sub-600'>
              <p>{order.shipping.address}</p>
              <p>{order.shipping.city}, {order.shipping.state} {order.shipping.zip}</p>
              <p>{order.shipping.country}</p>
            </div>
          </div>

          {/* Tracking */}
          <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-5 shadow-regular-xs'>
            <div className='flex items-center gap-2 mb-3'>
              <RiTruckLine className='size-4 text-text-soft-400' />
              <h3 className='text-label-md text-text-strong-950'>Tracking</h3>
            </div>
            <div className='space-y-2'>
              <div className='flex justify-between text-paragraph-sm'>
                <span className='text-text-sub-600'>Carrier</span>
                <span className='text-text-strong-950'>{order.tracking.carrier}</span>
              </div>
              <div className='text-paragraph-xs text-primary-base break-all'>{order.tracking.number}</div>
            </div>
          </div>

          {/* Summary */}
          <div className='rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-5 shadow-regular-xs'>
            <h3 className='text-label-md text-text-strong-950 mb-3'>Order Summary</h3>
            <div className='space-y-2'>
              {[
                { label: 'Retail Total', value: `$${totalRetail.toFixed(2)}` },
                { label: 'Wholesale Cost', value: `$${totalWholesale.toFixed(2)}` },
                { label: 'Total Commissions', value: '$35.00' },
                { label: 'Peptiful Net', value: `$${(totalWholesale - 1.85).toFixed(2)}`, bold: true },
              ].map((r) => (
                <div key={r.label} className={`flex justify-between text-paragraph-sm ${r.bold ? 'border-t border-stroke-soft-200 pt-2' : ''}`}>
                  <span className='text-text-sub-600'>{r.label}</span>
                  <span className={r.bold ? 'text-label-sm text-text-strong-950' : 'text-text-strong-950'}>{r.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
