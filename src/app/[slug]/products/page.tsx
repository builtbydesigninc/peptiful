'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { storefrontApi, catalogApi } from '@/lib/api-client';
import { cn } from '@/utils/cn';
import Link from 'next/link';
import {
    RiFilter3Line,
    RiSearchLine,
    RiArrowDropDownLine,
    RiStarFill,
    RiArrowRightSLine
} from '@remixicon/react';
import { Badge } from '@/components/ui/badge-new';
import { Button } from '@/components/ui/button-new';

export default function ProductsListingPage() {
    const { slug } = useParams();
    const searchParams = useSearchParams();
    const categoryQuery = searchParams.get('category');

    const [products, setProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState(categoryQuery || 'all');
    const [sortBy, setSortBy] = useState('newest');
    const [isSortOpen, setIsSortOpen] = useState(false);

    const sortOptions = [
        { id: 'newest', label: 'Newest' },
        { id: 'price-low', label: 'Price: Low to High' },
        { id: 'price-high', label: 'Price: High to Low' },
    ];

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [productsRes, categoriesRes] = await Promise.all([
                    storefrontApi.getProducts(slug as string, {
                        categoryId: activeCategory === 'all' ? undefined : activeCategory,
                        search: search || undefined
                    }),
                    catalogApi.getCategories()
                ]);
                let fetchedProducts = productsRes.data || [];

                // Client-side sorting
                if (sortBy === 'price-low') {
                    fetchedProducts.sort((a: any, b: any) => parseFloat(a.retailPrice) - parseFloat(b.retailPrice));
                } else if (sortBy === 'price-high') {
                    fetchedProducts.sort((a: any, b: any) => parseFloat(b.retailPrice) - parseFloat(a.retailPrice));
                }

                setProducts(fetchedProducts);
                setCategories(categoriesRes || []);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            } finally {
                setLoading(false);
            }
        };

        if (slug) fetchData();
    }, [slug, activeCategory, search, sortBy]);

    return (
        <div className="bg-white min-h-screen">
            {/* Header / Intro */}
            <div className="bg-gray-50 border-b border-gray-100 py-16 sm:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">Explore Our Collection</h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl leading-relaxed">
                        Precision-engineered research compounds. Every product is synthesized with rigorous quality control and laboratory verification.
                    </p>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                {/* Filters Bar */}
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 pb-10 border-b border-gray-100">
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setActiveCategory('all')}
                            className={cn(
                                "px-6 py-2 rounded-full text-sm font-bold transition-all",
                                activeCategory === 'all'
                                    ? "bg-gray-900 text-white shadow-lg"
                                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                            )}
                        >
                            All Products
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={cn(
                                    "px-6 py-2 rounded-full text-sm font-bold transition-all",
                                    activeCategory === cat.id
                                        ? "bg-gray-900 text-white shadow-lg"
                                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                                )}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search compounds..."
                                className="h-11 w-full sm:w-64 rounded-xl border border-gray-200 pl-10 pr-4 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 transition-all bg-gray-50/50"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <button
                                onClick={() => setIsSortOpen(!isSortOpen)}
                                className="flex h-11 items-center space-x-2 rounded-xl border border-gray-200 bg-white px-4 text-sm font-bold text-gray-900 hover:bg-gray-50 transition-colors"
                            >
                                <span className="text-gray-400 font-medium">Sort by:</span>
                                <span>{sortOptions.find(o => o.id === sortBy)?.label}</span>
                                <RiArrowDropDownLine className={cn("size-5 transition-transform duration-200", isSortOpen && "rotate-180")} />
                            </button>

                            {isSortOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setIsSortOpen(false)}
                                    />
                                    <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white shadow-2xl shadow-gray-200/50 border border-gray-100 py-2 z-20 animate-in fade-in zoom-in-95 duration-200">
                                        {sortOptions.map((option) => (
                                            <button
                                                key={option.id}
                                                onClick={() => {
                                                    setSortBy(option.id);
                                                    setIsSortOpen(false);
                                                }}
                                                className={cn(
                                                    "w-full text-left px-4 py-2 text-sm transition-colors",
                                                    sortBy === option.id
                                                        ? "text-gray-900 font-bold bg-gray-50"
                                                        : "text-gray-500 font-medium hover:text-gray-900 hover:bg-gray-50/50"
                                                )}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 py-20">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="animate-pulse space-y-4">
                                <div className="aspect-square w-full rounded-[2rem] bg-gray-100" />
                                <div className="h-4 w-2/3 bg-gray-100 rounded" />
                                <div className="h-4 w-1/3 bg-gray-100 rounded" />
                            </div>
                        ))}
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-1 gap-y-12 gap-x-8 sm:grid-cols-2 lg:grid-cols-4 py-16">
                        {products.map((product) => (
                            <Link key={product.id} href={`/${slug}/products/${product.handle}`} className="group relative">
                                <div className="aspect-square w-full overflow-hidden rounded-[2.5rem] bg-gray-100 transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-1">
                                    <img
                                        src={product.images?.[0] || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800'}
                                        alt={product.custom_name || product.product?.name}
                                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-lg">
                                            <RiArrowRightSLine className="size-6 text-gray-900" />
                                        </div>
                                    </div>
                                    {product.is_new && (
                                        <div className="absolute top-5 left-5 bg-gray-900/90 backdrop-blur px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.15em] text-white">
                                            Latest Batch
                                        </div>
                                    )}
                                </div>
                                <div className="mt-6 flex flex-col px-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-base font-extrabold text-gray-900 leading-tight">
                                                {product.custom_name || product.product?.name}
                                            </h3>
                                            <p className="mt-1 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                                                {product.product?.category?.name || 'Protocol Compound'}
                                            </p>
                                        </div>
                                        <p className="text-lg font-black text-gray-900">${parseFloat(product.retailPrice || product.retail_price).toFixed(2)}</p>
                                    </div>
                                    <div className="mt-3 flex items-center">
                                        <div className="flex items-center space-x-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <RiStarFill key={i} className={cn("size-3", i < 4 ? "text-amber-400" : "text-gray-200")} />
                                            ))}
                                        </div>
                                        <span className="ml-2 text-[10px] font-bold text-gray-400">4.9/5.0</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-32 text-center">
                        <div className="size-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                            <RiSearchLine className="size-8 text-gray-200" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">No products found</h2>
                        <p className="mt-2 text-gray-600">Try adjusting your filters or search query.</p>
                        <button
                            onClick={() => { setActiveCategory('all'); setSearch(''); }}
                            className="mt-8 text-sm font-bold text-gray-900 border-b-2 border-gray-900"
                        >
                            Reset all filters
                        </button>
                    </div>
                )}

                {/* Pagination (Simplified) */}
                {products.length > 0 && (
                    <div className="mt-12 flex items-center justify-center border-t border-gray-100 pt-12 pb-24">
                        <nav className="flex items-center space-x-2">
                            <Button variant="secondary" disabled className="h-10 w-10 p-0 rounded-xl">1</Button>
                            <Button variant="ghost" className="h-10 w-10 p-0 rounded-xl">2</Button>
                            <Button variant="ghost" className="h-10 w-10 p-0 rounded-xl">3</Button>
                            <span className="px-2 text-gray-300">...</span>
                            <Button variant="ghost" className="h-10 w-10 p-0 rounded-xl">12</Button>
                        </nav>
                    </div>
                )}
            </div>
        </div>
    );
}
