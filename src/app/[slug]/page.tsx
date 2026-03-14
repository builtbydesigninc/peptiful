'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { storefrontApi } from '@/lib/api-client';
import Link from 'next/link';
import {
    RiArrowRightSLine,
    RiStarFill,
    RiTruckLine,
    RiShieldCheckLine,
    RiFocus2Line
} from '@remixicon/react';
import { Button } from '@/components/ui/button-new';

export default function StorefrontHomePage() {
    const { slug } = useParams();
    const [config, setConfig] = useState<any>(null);
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const reservedSlugs = [
        'admin', 'affiliate', 'brand', 'partner', 'promoter',
        'lab', 'login', 'register', 'onboarding', 'forgot-password'
    ];

    useEffect(() => {
        if (!slug || reservedSlugs.includes(slug as string)) return;

        const fetchData = async () => {
            try {
                const [configData, productsData] = await Promise.all([
                    storefrontApi.getConfig(slug as string),
                    storefrontApi.getProducts(slug as string, { limit: 8 })
                ]);
                setConfig(configData);
                setProducts(productsData.data || []);
            } catch (error) {
                console.error('Failed to fetch homepage data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (slug) fetchData();
    }, [slug]);

    if (loading) return null;

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden bg-gray-900">
                <div className="absolute inset-0 opacity-40">
                    <img
                        src="https://images.unsplash.com/photo-1579165466511-703d8dfc382b?auto=format&fit=crop&q=80&w=2000"
                        alt="Science backdrop"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                </div>

                <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl">
                        <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                            Premium Research Peptides
                        </span>
                        <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-white sm:text-7xl">
                            {config.brand_name} <br />
                            <span className="text-gray-400">Scientifically Optimized.</span>
                        </h1>
                        <p className="mt-8 text-xl text-gray-300 leading-relaxed max-w-lg">
                            {config.description || "The highest purity peptides for research and optimization. Laboratory verified and shipped with precision."}
                        </p>
                        <div className="mt-10 flex flex-wrap gap-4">
                            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 min-w-[160px] h-14 rounded-full text-base font-bold" asChild>
                                <Link href={`/${slug}/products`}>Shop All Peptides</Link>
                            </Button>
                            <Button variant="secondary" size="lg" className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm min-w-[160px] h-14 rounded-full text-base font-bold">
                                Learn More
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce rounded-full p-2 text-white/40">
                    <RiArrowRightSLine className="size-8 rotate-90" />
                </div>
            </section>

            {/* Featured Section */}
            <section className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row mb-12">
                        <div>
                            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Featured Collections</h2>
                            <p className="mt-4 text-lg text-gray-600">Explore our most sought-after research compounds.</p>
                        </div>
                        <Link href={`/${slug}/products`} className="flex items-center text-sm font-bold text-gray-900 hover:text-gray-700">
                            View All <RiArrowRightSLine className="size-5 ml-1" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
                        {products.map((product) => (
                            <Link key={product.id} href={`/${slug}/products/${product.handle}`} className="group relative">
                                <div className="aspect-square w-full overflow-hidden rounded-3xl bg-gray-100 transition-shadow duration-300 group-hover:shadow-xl">
                                    <img
                                        src={product.images?.[0] || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800'}
                                        alt={product.custom_name || product.product?.name}
                                        className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                    />
                                    {product.is_new && (
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-900">
                                            New Release
                                        </div>
                                    )}
                                </div>
                                <div className="mt-4 flex justify-between px-2">
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-900">{product.custom_name || product.product?.name}</h3>
                                        <p className="mt-1 text-xs text-gray-500 uppercase tracking-wide">{product.product?.category?.name || 'Research Compound'}</p>
                                    </div>
                                    <p className="text-sm font-black text-gray-900">${parseFloat(product.retailPrice || product.retail_price).toFixed(2)}</p>
                                </div>
                                <div className="mt-2 flex items-center px-1">
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <RiStarFill key={i} className={cn("size-3", i < 4 ? "text-amber-400" : "text-gray-200")} />
                                        ))}
                                    </div>
                                    <span className="ml-2 text-[11px] font-medium text-gray-400">(24 reviews)</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Value Props */}
            <section className="bg-gray-50 py-24 border-y border-gray-100">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
                        <div className="flex flex-col items-center text-center">
                            <div className="size-16 rounded-3xl bg-white shadow-sm flex items-center justify-center mb-6">
                                <RiShieldCheckLine className="size-8 text-gray-900" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Laboratory Verified</h3>
                            <p className="mt-3 text-sm leading-relaxed text-gray-600 max-w-xs">Third-party purity analysis with COA available for every Batch produced.</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="size-16 rounded-3xl bg-white shadow-sm flex items-center justify-center mb-6">
                                <RiTruckLine className="size-8 text-gray-900" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Precision Logistics</h3>
                            <p className="mt-3 text-sm leading-relaxed text-gray-600 max-w-xs">Secure, climate-controlled shipping to preserve molecular integrity.</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="size-16 rounded-3xl bg-white shadow-sm flex items-center justify-center mb-6">
                                <RiFocus2Line className="size-8 text-gray-900" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Potency Guaranteed</h3>
                            <p className="mt-3 text-sm leading-relaxed text-gray-600 max-w-xs">Optimized stability profiles for consistent research performance.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Category Grid / Banner */}
            <section className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <div className="group relative overflow-hidden rounded-[2.5rem] h-[500px] bg-gray-900">
                            <img
                                src="https://images.unsplash.com/photo-1532187863486-abf51ad95999?auto=format&fit=crop&q=80&w=1200"
                                className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                            <div className="absolute bottom-12 left-12 right-12">
                                <h3 className="text-3xl font-extrabold text-white">Advanced Research</h3>
                                <p className="mt-4 text-gray-300">Discover cutting-edge compounds for experimental protocols.</p>
                                <Button className="mt-8 bg-white text-gray-900 hover:bg-gray-100 rounded-full font-bold px-8 h-12">Explore Collection</Button>
                            </div>
                        </div>
                        <div className="grid grid-rows-2 gap-6">
                            <div className="group relative overflow-hidden rounded-[2rem] bg-indigo-900">
                                <img
                                    src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200"
                                    className="absolute inset-0 h-full w-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/80 to-transparent" />
                                <div className="absolute inset-0 flex flex-col justify-center p-12">
                                    <h3 className="text-2xl font-bold text-white">Optimization Kits</h3>
                                    <Link href="#" className="mt-4 flex items-center text-sm font-bold text-white group-hover:translate-x-2 transition-transform">
                                        Shop Kits <RiArrowRightSLine className="size-5 ml-1" />
                                    </Link>
                                </div>
                            </div>
                            <div className="group relative overflow-hidden rounded-[2rem] bg-emerald-900">
                                <img
                                    src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1200"
                                    className="absolute inset-0 h-full w-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/80 to-transparent" />
                                <div className="absolute inset-0 flex flex-col justify-center p-12">
                                    <h3 className="text-2xl font-bold text-white">Wellness Support</h3>
                                    <Link href="#" className="mt-4 flex items-center text-sm font-bold text-white group-hover:translate-x-2 transition-transform">
                                        View Products <RiArrowRightSLine className="size-5 ml-1" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ');
}
