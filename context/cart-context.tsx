'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, ProductVariant, CustomCakeConfig } from '@/lib/shopify/types';

interface CartContextType {
  cart: CartItem[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addToCart: (
    product: Product,
    variant?: ProductVariant,
    quantity?: number,
    customizations?: {
      customMessage?: string;
      deliveryDate?: string;
      photoUrl?: string;
      customCakeConfig?: CustomCakeConfig;
    }
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  subtotal: number;
  totalItems: number;
  freeShippingThreshold: number;
  appliedCoupon: { code: string; discountPercent: number } | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountPercent: number } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem('luxury_cake_shop_cart');
      if (stored) {
        setCart(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem('luxury_cake_shop_cart', JSON.stringify(cart));
      } catch (e) {
        console.error('Failed to save cart to localStorage', e);
      }
    }
  }, [cart, mounted]);

  const addToCart = (
    product: Product,
    variant?: ProductVariant,
    quantity = 1,
    customizations?: {
      customMessage?: string;
      deliveryDate?: string;
      photoUrl?: string;
      customCakeConfig?: CustomCakeConfig;
    }
  ) => {
    const selectedVariant = variant || product.variants[0];
    const itemId = `${product.id}-${selectedVariant.id}-${customizations?.deliveryDate || 'default'}-${Date.now()}`;

    const newItem: CartItem = {
      id: itemId,
      product,
      selectedVariant,
      quantity,
      customMessage: customizations?.customMessage,
      deliveryDate: customizations?.deliveryDate,
      photoUrl: customizations?.photoUrl,
      customCakeConfig: customizations?.customCakeConfig,
    };

    setCart((prev) => [...prev, newItem]);
    setIsOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const subtotal = cart.reduce((acc, item) => {
    const itemPrice = item.customCakeConfig
      ? item.customCakeConfig.estimatedPrice
      : parseFloat(item.selectedVariant.price.amount);
    return acc + itemPrice * item.quantity;
  }, 0);

  const totalItems = mounted ? cart.reduce((acc, item) => acc + item.quantity, 0) : 0;
  const freeShippingThreshold = 6000;

  const applyCoupon = (code: string) => {
    const cleanCode = code.toUpperCase().trim();
    if (cleanCode === 'LUXURY10' || cleanCode === 'SWEET10') {
      setAppliedCoupon({ code: cleanCode, discountPercent: 10 });
      return true;
    } else if (cleanCode === 'FIRST15') {
      setAppliedCoupon({ code: cleanCode, discountPercent: 15 });
      return true;
    }
    return false;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        setIsOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        totalItems,
        freeShippingThreshold,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
