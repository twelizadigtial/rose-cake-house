'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Tag, Truck } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function CartDrawer() {
  const {
    cart,
    isOpen,
    setIsOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    freeShippingThreshold,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discountPercent) / 100 : 0;
  const deliveryFee = subtotal >= freeShippingThreshold ? 0 : 450;
  const finalTotal = subtotal - discountAmount + deliveryFee;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) return;
    const success = applyCoupon(couponInput);
    if (success) {
      setCouponInput('');
    } else {
      setCouponError('Invalid promo code. Try "LUXURY10" or "FIRST15"');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-dark/60 backdrop-blur-sm flex justify-end">
        {/* Backdrop click to close */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0"
          onClick={() => setIsOpen(false)}
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10"
        >
          {/* Header */}
          <div className="p-6 border-b border-pink-soft flex items-center justify-between bg-cream">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-pink-soft flex items-center justify-center text-pink-primary">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-dark">Your Shopping Bag</h2>
                <p className="text-xs text-graytext">Handcrafted luxury items</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-graytext hover:text-dark rounded-full hover:bg-pink-soft/40 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-pink-soft/50 p-4 border-b border-pink-rose/30">
            <div className="flex items-center justify-between text-xs font-medium mb-1.5 text-dark">
              <span className="flex items-center gap-1">
                <Truck className="w-4 h-4 text-pink-primary" />
                {remainingForFreeShipping > 0
                  ? `Add ${formatPrice(remainingForFreeShipping)} for FREE Delivery`
                  : '🎉 You unlocked FREE Islandwide Delivery!'}
              </span>
              <span>{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full h-2 bg-white rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-primary to-pink-rose transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-20 h-20 bg-pink-soft rounded-full flex items-center justify-center mx-auto text-pink-primary">
                  <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-dark">Your bag is empty</h3>
                <p className="text-sm text-graytext max-w-xs mx-auto">
                  Treat yourself or a loved one to our fresh artisanal cakes.
                </p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="mt-2 inline-flex items-center gap-2 bg-pink-primary text-white text-sm font-semibold px-6 py-3 rounded-2xl shadow-soft-pink hover:bg-pink-deep transition-all"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const itemPrice = item.customCakeConfig
                  ? item.customCakeConfig.estimatedPrice
                  : parseFloat(item.selectedVariant.price.amount);

                return (
                  <div
                    key={item.id}
                    className="flex gap-4 p-3 rounded-2xl bg-cream border border-pink-rose/30 relative group"
                  >
                    <div className="w-20 h-20 relative rounded-xl overflow-hidden bg-pink-soft flex-shrink-0">
                      <Image
                        src={item.product.images[0]?.url || ''}
                        alt={item.product.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-sm font-bold text-dark truncate">
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-graytext hover:text-red-500 p-1 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-xs text-pink-primary font-medium mt-0.5">
                        Variant: {item.selectedVariant.title}
                      </div>

                      {item.customMessage && (
                        <div className="text-[11px] text-graytext bg-white px-2 py-0.5 rounded border border-pink-soft mt-1 inline-block">
                          Message: &quot;{item.customMessage}&quot;
                        </div>
                      )}

                      {item.deliveryDate && (
                        <div className="text-[11px] text-graytext mt-0.5">
                          📅 Delivery: {item.deliveryDate}
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-3">
                        <span className="font-sans text-sm font-bold text-dark">
                          {formatPrice(itemPrice * item.quantity)}
                        </span>

                        <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-xl border border-pink-soft shadow-sm">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 text-dark hover:text-pink-primary"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-bold text-dark min-w-[16px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 text-dark hover:text-pink-primary"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-pink-soft bg-white space-y-4 shadow-luxury">
              {/* Coupon Form */}
              <div className="space-y-2">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-pink-soft/50 px-3 py-2 rounded-xl text-xs font-semibold text-pink-primary border border-pink-primary/30">
                    <span className="flex items-center gap-1.5">
                      <Tag className="w-4 h-4" /> Code {appliedCoupon.code} applied (-
                      {appliedCoupon.discountPercent}%)
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-dark hover:text-red-500 text-xs underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleCouponSubmit} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. LUXURY10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl bg-cream border border-pink-rose/50 text-xs font-sans focus:outline-none focus:ring-1 focus:ring-pink-primary"
                    />
                    <button
                      type="submit"
                      className="bg-dark text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-pink-primary transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && <p className="text-[11px] text-red-500">{couponError}</p>}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-graytext border-t border-pink-soft pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-dark">{formatPrice(subtotal)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-pink-primary font-medium">
                    <span>Discount ({appliedCoupon.discountPercent}%)</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="text-dark font-medium">
                    {subtotal >= freeShippingThreshold ? 'FREE' : formatPrice(450)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-dark pt-2 border-t border-pink-soft">
                  <span>Total</span>
                  <span className="text-pink-primary">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <Link
                href="/checkout"
                onClick={() => setIsOpen(false)}
                className="w-full bg-gradient-to-r from-pink-primary to-pink-deep text-white font-sans font-bold text-sm py-4 rounded-2xl shadow-soft-pink flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
