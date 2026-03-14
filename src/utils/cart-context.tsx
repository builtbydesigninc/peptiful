'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { storefrontApi } from '@/lib/api-client';

interface CartItem {
    id: string;
    brandProductId: string;
    productName: string;
    handle: string;
    image: string;
    price: number;
    quantity: number;
}

interface CartContextType {
    cartId: string | null;
    items: CartItem[];
    totalAmount: number;
    addItem: (product: any, quantity: number) => Promise<void>;
    updateQuantity: (itemId: string, quantity: number) => Promise<void>;
    removeItem: (itemId: string) => Promise<void>;
    clearCart: () => void;
    totalCount: number;
    isCartOpen: boolean;
    setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children, brandSlug }: { children: React.ReactNode; brandSlug: string }) {
    const [cartId, setCartId] = useState<string | null>(null);
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Load cart from localStorage or create new
    useEffect(() => {
        const storedCartId = localStorage.getItem(`cart_${brandSlug}`);
        if (storedCartId && storedCartId !== 'undefined' && storedCartId !== 'null') {
            setCartId(storedCartId);
            fetchCart(storedCartId);
        }
    }, [brandSlug]);

    const fetchCart = async (id: string) => {
        try {
            const data = await storefrontApi.getCart(brandSlug, id);
            // Map backend items to frontend CartItem interface
            const mappedItems: CartItem[] = (data.items || []).map((item: any) => ({
                id: item.brandProductId, // Using brandProductId as the unique item ID for now
                brandProductId: item.brandProductId,
                productName: item.name,
                handle: item.handle || '', // Ensure handle exists if available
                image: item.images?.[0], // Removed || '' fallback
                price: parseFloat(item.retailPrice),
                quantity: item.quantity
            }));
            setItems(mappedItems);
        } catch (error) {
            console.error('Failed to fetch cart:', error);
            // If cart not found or invalid signature, clear local
            localStorage.removeItem(`cart_${brandSlug}`);
            setCartId(null);
        }
    };

    const addItem = async (product: any, quantity: number) => {
        try {
            let currentCartId = cartId;
            if (!currentCartId || currentCartId === 'undefined') {
                const res = await storefrontApi.createCart(brandSlug);
                currentCartId = res.cartId; // backend returns { cartId: signedId }
                setCartId(currentCartId);
                localStorage.setItem(`cart_${brandSlug}`, currentCartId!);
            }

            // Map local product to CartItem
            const newItem: CartItem = {
                id: product.id,
                brandProductId: product.id,
                productName: product.name || product.custom_name || product.product?.name || 'Research Compound',
                handle: product.handle,
                image: (product.images?.[0] || (product.product?.images?.[0])) || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400',
                price: parseFloat(product.retailPrice || product.retail_price || product.price || '0'),
                quantity
            };

            const updatedItems = [...items];
            const existingIndex = updatedItems.findIndex(i => i.brandProductId === product.id);
            if (existingIndex > -1) {
                updatedItems[existingIndex].quantity += quantity;
            } else {
                updatedItems.push(newItem);
            }

            // Sync with backend using the UpdateCart API
            // The backend expects an array of { brandProductId, quantity }
            const syncItems = updatedItems.map(item => ({
                brandProductId: item.brandProductId,
                quantity: item.quantity
            }));

            await storefrontApi.updateCart(brandSlug, currentCartId!, syncItems);
            setItems(updatedItems);
        } catch (error) {
            console.error('Failed to add to cart:', error);
        }
    };

    const updateQuantity = async (itemId: string, quantity: number) => {
        if (!cartId) return;
        const updatedItems = items.map(item =>
            item.id === itemId ? { ...item, quantity } : item
        );
        setItems(updatedItems);

        const syncItems = updatedItems.map(item => ({
            brandProductId: item.brandProductId,
            quantity: item.quantity
        }));
        await storefrontApi.updateCart(brandSlug, cartId, syncItems);
    };

    const removeItem = async (itemId: string) => {
        if (!cartId) return;
        const updatedItems = items.filter(item => item.id !== itemId);
        setItems(updatedItems);
        await storefrontApi.removeItem(brandSlug, cartId, itemId);
    };

    const clearCart = () => {
        setItems([]);
        setCartId(null);
        localStorage.removeItem(`cart_${brandSlug}`);
    };

    const totalAmount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cartId,
            items,
            totalAmount,
            addItem,
            updateQuantity,
            removeItem,
            clearCart,
            totalCount,
            isCartOpen,
            setIsCartOpen
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
