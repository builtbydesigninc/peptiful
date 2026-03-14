'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { storefrontApi } from '@/lib/api-client';
import { cn } from '@/utils/cn';
import Link from 'next/link';
import {
    RiShoppingBag3Line,
    RiUser3Line,
    RiMenuFill,
    RiCloseLine,
    RiSearchLine,
    RiAddLine,
    RiSubtractLine,
    RiFlaskLine
} from '@remixicon/react';
import { Button } from '@/components/ui/button-new';

import { CartProvider, useCart } from '@/utils/cart-context';

export default function StorefrontLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { slug } = useParams();
    const [config, setConfig] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Reserved keywords that should never be treated as brand slugs
    const reservedSlugs = [
        'admin', 'affiliate', 'brand', 'partner', 'promoter',
        'lab', 'login', 'register', 'onboarding', 'forgot-password',
        'api', 'static', 'images', 'favicon.ico'
    ];

    useEffect(() => {
        if (!slug || reservedSlugs.includes(slug as string)) {
            setLoading(false);
            return;
        }

        const fetchConfig = async () => {
            try {
                const data = await storefrontApi.getConfig(slug as string);
                setConfig(data);

                // Set CSS variables for brand colors
                if (data.primary_color) {
                    document.documentElement.style.setProperty('--brand-primary', data.primary_color);
                }
            } catch (error) {
                console.error('Failed to fetch storefront config:', error);
            } finally {
                setLoading(false);
            }
        };

        if (slug) fetchConfig();
    }, [slug]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white">
                <div className="size-12 animate-spin rounded-full border-4 border-gray-200 border-t-primary-base" />
            </div>
        );
    }

    if (!config || config.status === 'not_found') {
        // If it's a reserved slug, just render children without storefront UI
        if (slug && reservedSlugs.includes(slug as string)) {
            return <>{children}</>;
        }

        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 text-center">
                <h1 className="text-4xl font-bold text-gray-900">404</h1>
                <p className="mt-4 text-lg text-gray-600">Storefront not found or has been disabled.</p>
                <Link href="/" className="mt-8 text-primary-base hover:underline">Return to Home</Link>
            </div>
        );
    }

    return (
        <CartProvider brandSlug={slug as string}>
            <StorefrontContent
                config={config}
                slug={slug as string}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
            >
                {children}
            </StorefrontContent>
        </CartProvider>
    );
}

function StorefrontContent({
    config,
    slug,
    children,
    isMenuOpen,
    setIsMenuOpen,
}: any) {
    const { items, totalAmount, totalCount, removeItem, updateQuantity, isCartOpen, setIsCartOpen } = useCart();

    if (config.status === 'paused') {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center">
                <div className="size-20 bg-amber-50 rounded-full flex items-center justify-center mb-6">
                    <RiShoppingBag3Line className="size-10 text-amber-500" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900">{config.brand_name} is taking a break</h1>
                <p className="mt-4 text-lg text-gray-600 max-w-md mx-auto">{config.message || "We'll be back soon! Check back later for our premium products."}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
            {/* Announcement Bar */}
            <div className="bg-gray-900 py-2.5 text-center text-[13px] font-medium text-white">
                Free shipping on orders over $75
            </div>

            {/* Navigation */}
            <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    {/* Mobile Menu Button */}
                    <div className="flex flex-1 items-center lg:hidden">
                        <button
                            type="button"
                            className="rounded-md p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-500"
                            onClick={() => setIsMenuOpen(true)}
                        >
                            <RiMenuFill className="size-6" />
                        </button>
                    </div>

                    {/* Logo */}
                    <Link href={`/${slug}`} className="flex items-center">
                        {config.logo_url ? (
                            <img src={config.logo_url} alt={config.brand_name} className="h-8 w-auto" />
                        ) : (
                            <span className="text-xl font-bold tracking-tight text-gray-900">{config.brand_name}</span>
                        )}
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:ml-10 lg:flex lg:space-x-8">
                        <Link href={`/${slug}/products`} className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">Shop All</Link>
                        <Link href={`/${slug}/products?category=best-sellers`} className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">Best Sellers</Link>
                        <Link href={`/${slug}/products?category=new-arrivals`} className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">New Arrivals</Link>
                        <Link href="#" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">Research</Link>
                    </nav>

                    {/* Right Actions */}
                    <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
                        <button className="hidden p-2 text-gray-400 hover:text-gray-500 sm:block">
                            <RiSearchLine className="size-5" />
                        </button>
                        <Link href={`/${slug}/account`} className="p-2 text-gray-400 hover:text-gray-500 transition-colors">
                            <RiUser3Line className="size-5" />
                        </Link>
                        <button
                            className="flex items-center space-x-2 p-2 text-gray-400 hover:text-gray-500 transition-colors group"
                            onClick={() => setIsCartOpen(true)}
                        >
                            <div className="relative">
                                <RiShoppingBag3Line className="size-5" />
                                {totalCount > 0 && (
                                    <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gray-900 px-1 text-[9px] font-bold text-white ring-2 ring-white">
                                        {totalCount}
                                    </span>
                                )}
                            </div>
                        </button>
                    </div>
                </div>
            </header>

            {/* Cart Drawer */}
            <div className={cn(
                "fixed inset-0 z-[100] transition-opacity duration-300",
                isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            )}>
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
                <div className={cn(
                    "fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl transition-transform duration-300 ease-in-out transform",
                    isCartOpen ? "translate-x-0" : "translate-x-full"
                )}>
                    <div className="flex h-full flex-col">
                        <div className="flex h-16 items-center justify-between px-6 border-b border-gray-100">
                            <h2 className="text-lg font-bold text-gray-900">Your Bag ({totalCount})</h2>
                            <button onClick={() => setIsCartOpen(false)} className="rounded-xl p-2 hover:bg-gray-100 transition-colors">
                                <RiCloseLine className="size-6 text-gray-400" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto px-6 py-8">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <div className="size-20 bg-gray-50 rounded-[2rem] flex items-center justify-center mb-6">
                                        <RiShoppingBag3Line className="size-8 text-gray-300" />
                                    </div>
                                    <p className="text-gray-500 font-medium">Your research bag is empty</p>
                                    <Button
                                        onClick={() => { setIsCartOpen(false); }}
                                        className="mt-6 rounded-full px-8"
                                        asChild
                                    >
                                        <Link href={`/${slug}/products`}>Explore Compounds</Link>
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-8">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex space-x-4">
                                            <div className="size-24 shrink-0 overflow-hidden rounded-2xl bg-gray-50 flex items-center justify-center text-gray-300">
                                                {item.image ? (
                                                    <img src={item.image} alt={item.productName} className="h-full w-full object-cover" />
                                                ) : (
                                                    <RiFlaskLine className="size-10" />
                                                )}
                                            </div>
                                            <div className="flex flex-1 flex-col justify-between">
                                                <div>
                                                    <div className="flex justify-between">
                                                        <h3 className="text-sm font-bold text-gray-900">{item.productName}</h3>
                                                        <p className="text-sm font-black text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                                                    </div>
                                                    <p className="mt-1 text-xs text-gray-400 leading-none">Research Compound</p>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center rounded-lg border border-gray-100 p-0.5">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                            className="p-1 hover:bg-gray-50 rounded"
                                                        >
                                                            <RiSubtractLine className="size-3" />
                                                        </button>
                                                        <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="p-1 hover:bg-gray-50 rounded"
                                                        >
                                                            <RiAddLine className="size-3" />
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="text-xs font-bold text-gray-400 hover:text-red-500"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {items.length > 0 && (
                            <div className="border-t border-gray-100 p-6 space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium text-gray-500">Subtotal</span>
                                    <span className="font-black text-gray-900">${totalAmount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium text-gray-500">Shipping</span>
                                    <span className="font-bold text-emerald-600">Free</span>
                                </div>
                                <div className="pt-4 border-t border-gray-50">
                                    <div className="flex justify-between items-center mb-6">
                                        <span className="text-lg font-extrabold">Total</span>
                                        <span className="text-2xl font-black">${totalAmount.toFixed(2)}</span>
                                    </div>
                                    <Button className="h-16 w-full rounded-2xl bg-gray-900 text-base font-bold text-white hover:bg-gray-800" asChild>
                                        <Link
                                            href={`/${slug}/checkout`}
                                            onClick={() => setIsCartOpen(false)}
                                        >
                                            Proceed to Checkout
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar Navigation */}
            <div className={cn(
                "fixed inset-0 z-[60] lg:hidden transition-opacity duration-300",
                isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            )}>
                <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
                <div className={cn(
                    "fixed inset-y-0 left-0 w-full max-w-xs bg-white shadow-xl transition-transform duration-300 ease-in-out",
                    isMenuOpen ? "translate-x-0" : "-translate-x-full"
                )}>
                    <div className="flex h-16 items-center justify-between px-6 border-b border-gray-100">
                        <span className="text-lg font-bold">{config.brand_name}</span>
                        <button onClick={() => setIsMenuOpen(false)} className="p-2">
                            <RiCloseLine className="size-6 text-gray-400" />
                        </button>
                    </div>
                    <div className="flex flex-col space-y-6 px-6 py-8">
                        <Link href={`/${slug}/products`} onClick={() => setIsMenuOpen(false)} className="text-lg font-bold">Shop All</Link>
                        <Link href={`/${slug}/products?category=best-sellers`} onClick={() => setIsMenuOpen(false)} className="text-lg font-bold">Best Sellers</Link>
                        <Link href={`/${slug}/products?category=new-arrivals`} onClick={() => setIsMenuOpen(false)} className="text-lg font-bold">New Arrivals</Link>
                        <Link href="#" className="text-lg font-bold">Research Portal</Link>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main>{children}</main>

            {/* Footer */}
            <footer className="border-t border-gray-100 bg-gray-50 py-12 sm:py-20 mt-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="space-y-6">
                            <div className="flex items-center">
                                {config.logo_url ? (
                                    <img src={config.logo_url} alt={config.brand_name} className="h-8 w-auto" />
                                ) : (
                                    <span className="text-xl font-bold tracking-tight">{config.brand_name}</span>
                                )}
                            </div>
                            <p className="text-sm leading-relaxed text-gray-500 max-w-xs">{config.description || `Premium research compounds by ${config.brand_name}. High purity, laboratory-verified excellence.`}</p>
                        </div>

                        <div>
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-900">Explore</h3>
                            <ul className="mt-6 space-y-4 text-sm text-gray-500">
                                <li><Link href={`/${slug}/products`} className="hover:text-gray-900 transition-colors">Catalog</Link></li>
                                <li><Link href={`/${slug}/products?category=best-sellers`} className="hover:text-gray-900 transition-colors">Best Sellers</Link></li>
                                <li><Link href="#" className="hover:text-gray-900 transition-colors">Research Verification</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-900">Company</h3>
                            <ul className="mt-6 space-y-4 text-sm text-gray-500">
                                <li><Link href="#" className="hover:text-gray-900 transition-colors">About {config.brand_name}</Link></li>
                                <li><Link href="#" className="hover:text-gray-900 transition-colors">Shipping & Returns</Link></li>
                                <li><Link href="#" className="hover:text-gray-900 transition-colors">Lab Results</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-900">Support</h3>
                            <ul className="mt-6 space-y-4 text-sm text-gray-500">
                                <li><Link href="#" className="hover:text-gray-900 transition-colors">Contact Support</Link></li>
                                <li><Link href="#" className="hover:text-gray-900 transition-colors">FAQ</Link></li>
                                <li><Link href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-20 border-t border-gray-200 pt-8 flex flex-col sm:flex-row justify-between items-center gap-6">
                        <p className="text-xs font-medium text-gray-400">© {new Date().getFullYear()} {config.brand_name}. Secure Research Platform.</p>
                        <div className="flex items-center space-x-3 text-[10px] text-gray-400">
                            <span className="uppercase tracking-widest font-bold">Powered by</span>
                            <span className="font-black tracking-tighter text-gray-700 text-sm uppercase">Peptiful</span>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Minimal CSS for dynamic brand primary color */}
            <style jsx global>{`
                :root {
                    --brand-primary: ${config.primary_color || '#0a0a0a'};
                }
            `}</style>
        </div>
    );
}
