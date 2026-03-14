'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { storefrontApi } from '@/lib/api-client';
import { useCart } from '@/utils/cart-context';
import Link from 'next/link';
import {
    RiArrowLeftLine,
    RiShieldLine,
    RiTruckLine,
    RiSecurePaymentLine,
    RiFlaskLine
} from '@remixicon/react';
import { Button } from '@/components/ui/button-new';
import { Input } from '@/components/ui/input';

export default function CheckoutPage() {
    const { slug } = useParams();
    const router = useRouter();
    const { items, totalAmount, cartId } = useCart();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        country: 'US'
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res: any = await storefrontApi.createCheckout(slug as string, {
                cartId: cartId!,
                email: formData.email,
                name: `${formData.firstName} ${formData.lastName}`.trim(),
                shippingAddress: {
                    addressLine1: formData.address,
                    city: formData.city,
                    state: formData.state,
                    zip: formData.zip,
                    country: formData.country,
                    // Note: firstName and lastName are not in the ShippingAddressDto
                }
            });

            if (res.url) {
                // Stripe Checkout Redirect
                window.location.href = res.url;
            } else if (res.orderId) {
                // Successful checkout (terminal)
                router.push(`/${slug}/checkout/success?orderId=${res.orderId}&email=${encodeURIComponent(formData.email)}`);
            }
        } catch (error) {
            console.error('Checkout failed:', error);
            alert('Checkout failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
                <h1 className="text-2xl font-bold">Your bag is empty</h1>
                <p className="mt-2 text-gray-500">Add some research compounds to begin checkout.</p>
                <Link href={`/${slug}/products`} className="mt-8 text-primary-base font-bold underline">Back to Shop</Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-x-16">
                    {/* Form Side */}
                    <div>
                        <Link href={`/${slug}`} className="mb-10 flex items-center text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors">
                            <RiArrowLeftLine className="size-4 mr-2" />
                            Return to Store
                        </Link>

                        <div className="space-y-12">
                            <section>
                                <h2 className="text-2xl font-extrabold text-gray-900 border-b border-gray-100 pb-4">Contact Information</h2>
                                <div className="mt-6">
                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400">Email Address</label>
                                    <Input
                                        name="email"
                                        type="email"
                                        required
                                        className="h-14 mt-2 rounded-2xl border-gray-200 bg-white"
                                        placeholder="researcher@example.com"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                    <p className="mt-2 text-xs text-gray-400">We'll send order updates and tracking validation to this address.</p>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-extrabold text-gray-900 border-b border-gray-100 pb-4">Shipping Address</h2>
                                <div className="mt-6 grid grid-cols-2 gap-4">
                                    <div className="col-span-1">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">First Name</label>
                                        <Input
                                            name="firstName"
                                            required
                                            className="h-14 mt-2 rounded-2xl border-gray-200 bg-white"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Last Name</label>
                                        <Input
                                            name="lastName"
                                            required
                                            className="h-14 mt-2 rounded-2xl border-gray-200 bg-white"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Address</label>
                                        <Input
                                            name="address"
                                            required
                                            className="h-14 mt-2 rounded-2xl border-gray-200 bg-white"
                                            placeholder="123 Science Way"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">City</label>
                                        <Input
                                            name="city"
                                            required
                                            className="h-14 mt-2 rounded-2xl border-gray-200 bg-white"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">State / Province</label>
                                        <Input
                                            name="state"
                                            required
                                            className="h-14 mt-2 rounded-2xl border-gray-200 bg-white"
                                            placeholder="California"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">ZIP / Postal Code</label>
                                        <Input
                                            name="zip"
                                            required
                                            className="h-14 mt-2 rounded-2xl border-gray-200 bg-white"
                                            value={formData.zip}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Country</label>
                                        <Input
                                            name="country"
                                            required
                                            disabled
                                            className="h-14 mt-2 rounded-2xl border-gray-200 bg-white opacity-50"
                                            value={formData.country}
                                        />
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-extrabold text-gray-900 border-b border-gray-100 pb-4">Security & Verification</h2>
                                <div className="mt-6 flex flex-col space-y-4">
                                    <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white border border-gray-100">
                                        <div className="size-10 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
                                            <RiSecurePaymentLine className="size-5 text-emerald-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">Encrypted checkout</p>
                                            <p className="text-xs text-gray-500">Your connection is secured with 256-bit AES encryption.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white border border-gray-100">
                                        <div className="size-10 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0">
                                            <RiShieldLine className="size-5 text-indigo-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">Fraud protection</p>
                                            <p className="text-xs text-gray-500">Real-time IP and validation monitoring enabled.</p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>

                    {/* Summary Side */}
                    <div className="mt-16 lg:mt-0">
                        <div className="sticky top-28 space-y-8">
                            <div className="rounded-[2.5rem] bg-white shadow-xl shadow-gray-200/40 p-10 border border-gray-100">
                                <h2 className="text-xl font-extrabold text-gray-900">Order Summary</h2>

                                <div className="mt-8 space-y-6">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex justify-between items-center">
                                            <div className="flex items-center space-x-4">
                                                <div className="size-16 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center text-gray-300">
                                                    {item.image ? (
                                                        <img src={item.image} className="h-full w-full object-cover" />
                                                    ) : (
                                                        <RiFlaskLine className="size-6" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900">{item.productName}</p>
                                                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                                </div>
                                            </div>
                                            <p className="text-sm font-black text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-10 space-y-4 border-t border-gray-50 pt-8">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-bold text-gray-400">Subtotal</span>
                                        <span className="font-bold text-gray-900">${totalAmount.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="font-bold text-gray-400">Shipping</span>
                                        <span className="font-bold text-emerald-600">Calculated at next step</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="font-bold text-gray-400">Taxes</span>
                                        <span className="font-bold text-gray-900">$0.00</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-4">
                                        <span className="text-lg font-extrabold text-gray-900">Total</span>
                                        <span className="text-3xl font-black text-gray-900">${totalAmount.toFixed(2)}</span>
                                    </div>
                                </div>

                                <Button
                                    className="h-16 w-full mt-10 rounded-2xl bg-gray-900 text-base font-bold shadow-xl shadow-gray-200"
                                    onClick={handleSubmit}
                                    loading={loading}
                                >
                                    Proceed to Payment
                                </Button>

                                <p className="mt-6 text-center text-xs text-gray-400 p-2">
                                    By proceeding, you agree to our Terms of Service <br /> and Research Compound Handling Agreement.
                                </p>
                            </div>

                            <div className="flex items-center justify-center space-x-8 text-gray-300">
                                <RiSecurePaymentLine className="size-8" />
                                <RiTruckLine className="size-8" />
                                <RiShieldLine className="size-8" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
