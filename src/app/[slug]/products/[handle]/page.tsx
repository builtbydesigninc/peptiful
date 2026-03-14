'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { storefrontApi } from '@/lib/api-client';
import { cn } from '@/utils/cn';
import Link from 'next/link';
import {
    RiStarFill,
    RiSubtractLine,
    RiAddLine,
    RiTruckLine,
    RiShieldCheckLine,
    RiFlaskLine,
    RiArrowLeftLine
} from '@remixicon/react';
import { Button } from '@/components/ui/button-new';
import { Badge } from '@/components/ui/badge-new';
import { useCart } from '@/utils/cart-context';

export default function ProductDetailPage() {
    const { slug, handle } = useParams();
    const [product, setProduct] = useState<any>(null);
    const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [addingToCart, setAddingToCart] = useState(false);
    const [justAdded, setJustAdded] = useState(false);
    const { addItem, setIsCartOpen } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await storefrontApi.getProduct(slug as string, handle as string);
                setProduct(data);

                // Fetch related products (same category)
                const related = await storefrontApi.getProducts(slug as string, { limit: 4 });
                setRelatedProducts(related.data?.filter((p: any) => p.handle !== handle) || []);
            } catch (error) {
                console.error('Failed to fetch product:', error);
            } finally {
                setLoading(false);
            }
        };

        if (slug && handle) fetchProduct();
    }, [slug, handle]);

    const handleAddToCart = async () => {
        setAddingToCart(true);
        try {
            await addItem(product, quantity);
            setIsCartOpen(true);
            setJustAdded(true);
            setTimeout(() => setJustAdded(false), 2000);
        } finally {
            setAddingToCart(false);
        }
    };

    if (loading) return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="size-12 animate-spin rounded-full border-4 border-gray-100 border-t-primary-base" />
        </div>
    );

    if (!product) return (
        <div className="flex min-h-screen items-center justify-center flex-col p-6 text-center">
            <h1 className="text-2xl font-bold">Product not found</h1>
            <Link href={`/${slug}/products`} className="mt-4 text-primary-base">Back to Shop</Link>
        </div>
    );

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Breadcrumbs */}
                <nav className="mb-8 flex items-center space-x-2 text-sm font-medium text-gray-500">
                    <Link href={`/${slug}/products`} className="flex items-center hover:text-gray-900">
                        <RiArrowLeftLine className="size-4 mr-2" />
                        Back to Shop
                    </Link>
                </nav>

                <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-square overflow-hidden rounded-[2.5rem] bg-gray-100">
                            <img
                                src={product.images?.[0] || product.product?.images?.[0] || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=1200'}
                                alt={product.name || product.custom_name || product.product?.name}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="aspect-square rounded-2xl bg-gray-50 overflow-hidden cursor-pointer border-2 border-transparent hover:border-gray-900/10">
                                    <img
                                        src={product.images?.[0] || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400'}
                                        className="h-full w-full object-cover opacity-60"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                        <div className="flex flex-col space-y-2">
                            <div className="flex items-center justify-between">
                                <Badge variant="light" color="gray" className="text-[10px] font-black uppercase tracking-widest px-3 py-1">
                                    {product.product?.category?.name || 'Research Grade'}
                                </Badge>
                                {product.is_new && <Badge variant="light" color="primary" className="text-[10px] font-black uppercase tracking-widest">New Arrival</Badge>}
                            </div>
                            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">{product.name || product.custom_name || product.product?.name}</h1>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                            <p className="text-3xl font-black text-gray-900">${parseFloat(product.retailPrice || product.retail_price || product.price || '0').toFixed(2)}</p>
                            <div className="flex items-center space-x-2">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <RiStarFill key={i} className={cn("size-4", i < 4 ? "text-amber-400" : "text-gray-200")} />
                                    ))}
                                </div>
                                <span className="text-sm font-medium text-gray-400">4.9 (86 reviews)</span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <p className="text-base text-gray-600 leading-relaxed">
                                {product.custom_description || product.product?.description || "A high-purity research compound meticulously synthesized for laboratory optimization applications. Laboratory verified for molecular integrity."}
                            </p>
                        </div>

                        <div className="mt-10 border-t border-gray-100 pt-10">
                            <div className="space-y-6">
                                {/* Quantity Selector */}
                                <div className="flex items-center space-x-4">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Quantity</label>
                                    <div className="flex items-center rounded-2xl border border-gray-200 p-1">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="p-2 hover:bg-gray-50 rounded-xl transition-colors"
                                        >
                                            <RiSubtractLine className="size-4" />
                                        </button>
                                        <span className="w-12 text-center text-sm font-bold">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="p-2 hover:bg-gray-50 rounded-xl transition-colors"
                                        >
                                            <RiAddLine className="size-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
                                    <Button
                                        loading={addingToCart}
                                        onClick={handleAddToCart}
                                        className="h-16 flex-1 rounded-2xl bg-gray-900 text-base font-bold text-white hover:bg-gray-800"
                                    >
                                        {justAdded ? 'Added to Bag!' : 'Add to Bag'}
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        className="h-16 size-16 rounded-2xl border-gray-200 p-0 hover:bg-gray-50"
                                    >
                                        <RiStarFill className="size-6 text-amber-400" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Product Support Details */}
                        <div className="mt-10 space-y-6 rounded-[2rem] bg-gray-50 p-8">
                            <div className="flex items-start space-x-4">
                                <RiFlaskLine className="size-6 text-gray-900 mt-1 shrink-0" />
                                <div>
                                    <h4 className="text-sm font-bold text-gray-900">Lab Tested & Verified</h4>
                                    <p className="mt-1 text-sm text-gray-600">Each batch undergoes HPLC and Mass Spec testing to guarantee &gt;99% purity.</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <RiShieldCheckLine className="size-6 text-gray-900 mt-1 shrink-0" />
                                <div>
                                    <h4 className="text-sm font-bold text-gray-900">Secure molecular storage</h4>
                                    <p className="mt-1 text-sm text-gray-600">Shipped in light-resistant, climate-sealed containers for maximum durability.</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <RiTruckLine className="size-6 text-gray-900 mt-1 shrink-0" />
                                <div>
                                    <h4 className="text-sm font-bold text-gray-900">Priority Research Shipping</h4>
                                    <p className="mt-1 text-sm text-gray-600">Typically processed and dispatched within 24 hours of successful validation.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Detailed Info Tabs-like Section */}
                <div className="mt-20 lg:mt-32">
                    <div className="border-b border-gray-100">
                        <div className="flex space-x-8">
                            <button className="border-b-2 border-gray-900 pb-4 text-sm font-bold text-gray-900">Description</button>
                            <button className="pb-4 text-sm font-bold text-gray-400 hover:text-gray-600">Specifications</button>
                            <button className="pb-4 text-sm font-bold text-gray-400 hover:text-gray-600">Handling & Storage</button>
                            <button className="pb-4 text-sm font-bold text-gray-400 hover:text-gray-600">Verification</button>
                        </div>
                    </div>
                    <div className="py-10 prose prose-gray max-w-none">
                        <p className="text-gray-600 leading-loose">
                            {product.product?.description || "This compound is designed for high-end research applications. It has been synthesized using proprietary protocols to ensure the highest degree of structural integrity and biological activity for experimental use."}
                        </p>
                        <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-sm text-gray-600 list-none p-0">
                            <li className="flex items-center py-2 border-b border-gray-50"><span className="font-bold text-gray-900 w-32 shrink-0">Purity</span> <span>&gt;99% (verified)</span></li>
                            <li className="flex items-center py-3 border-b border-gray-50"><span className="font-bold text-gray-900 w-32 shrink-0">Form</span> <span>Lyophilized powder</span></li>
                            <li className="flex items-center py-3 border-b border-gray-50"><span className="font-bold text-gray-900 w-32 shrink-0">Storage</span> <span>2-8°C (long term)</span></li>
                            <li className="flex items-center py-3 border-b border-gray-50"><span className="font-bold text-gray-900 w-32 shrink-0">Molecular Weight</span> <span>{product.product?.specs?.mw || '1340.5'} g/mol</span></li>
                        </ul>
                    </div>
                </div>

                {/* Related Products */}
                <div className="mt-24 sm:mt-32 border-t border-gray-100 pt-24">
                    <h2 className="text-2xl font-extrabold text-gray-900">You may also be interested in</h2>
                    <div className="mt-10 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
                        {relatedProducts.map((p) => (
                            <Link key={p.id} href={`/${slug}/products/${p.handle}`} className="group relative">
                                <div className="aspect-square w-full overflow-hidden rounded-[2rem] bg-gray-100 group-hover:shadow-md transition-all">
                                    <img
                                        src={p.images?.[0] || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800'}
                                        alt={p.custom_name || p.product?.name}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <h3 className="text-sm font-bold text-gray-900">{p.custom_name || p.product?.name}</h3>
                                    <p className="text-sm font-black text-gray-900">${parseFloat(p.retailPrice || p.retail_price).toFixed(2)}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
