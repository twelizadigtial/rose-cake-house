'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { formatPrice } from '@/lib/utils';
import { ShieldCheck, Lock, Truck, CreditCard, CheckCircle2, ArrowRight, Wallet } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutPage() {
  const { cart, subtotal, appliedCoupon, freeShippingThreshold, clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'payhere' | 'cod'>('card');
  const [placedOrder, setPlacedOrder] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Colombo',
    postalCode: '',
  });

  const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discountPercent) / 100 : 0;
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 450;
  const grandTotal = subtotal - discountAmount + shippingFee;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.5 },
    });
    setPlacedOrder(true);
    clearCart();
  };

  if (placedOrder) {
    return (
      <div className="min-h-screen bg-cream/40 py-20 px-4">
        <div className="max-w-md mx-auto bg-white rounded-4xl p-8 sm:p-10 text-center space-y-6 shadow-2xl border border-pink-soft">
          <div className="w-16 h-16 bg-pink-soft text-pink-primary rounded-full flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-10 h-10 stroke-[2]" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-dark">Order Confirmed! 🎉</h1>
          <p className="text-xs text-graytext leading-relaxed font-sans">
            Thank you for ordering with Maison du Gâteau. Your cake order <strong>#MG-{Math.floor(100000 + Math.random() * 900000)}</strong> has been received and our master pastry chefs are preparing your fresh order.
          </p>
          <div className="bg-cream p-4 rounded-2xl text-xs text-dark space-y-1 font-sans">
            <div className="flex justify-between">
              <span>Estimated Delivery:</span>
              <span className="font-bold text-pink-primary">Tomorrow by 4:00 PM ({formData.city})</span>
            </div>
            <div className="flex justify-between">
              <span>Payment Status:</span>
              <span className="font-bold text-emerald-600">Verified (LKR)</span>
            </div>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-pink-primary text-white text-xs font-bold px-8 py-3.5 rounded-2xl shadow-soft-pink hover:bg-pink-deep transition-all"
          >
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream/30 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-soft text-pink-primary text-xs font-semibold">
            <Lock className="w-3.5 h-3.5" /> 256-Bit Encrypted Express Checkout (Sri Lanka)
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-dark">
            Complete Your Order
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Area (7 cols) */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 bg-white rounded-4xl p-6 sm:p-10 border border-pink-soft/60 shadow-luxury space-y-8">
            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-dark pb-2 border-b border-pink-soft">
                1. Contact & Customer Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-dark uppercase tracking-wider block mb-1">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    placeholder="e.g. Kasun"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-2xl bg-cream border border-pink-rose/50 text-xs text-dark focus:outline-none focus:ring-2 focus:ring-pink-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-dark uppercase tracking-wider block mb-1">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    placeholder="e.g. Perera"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-2xl bg-cream border border-pink-rose/50 text-xs text-dark focus:outline-none focus:ring-2 focus:ring-pink-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-dark uppercase tracking-wider block mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="kasun@example.lk"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-2xl bg-cream border border-pink-rose/50 text-xs text-dark focus:outline-none focus:ring-2 focus:ring-pink-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-dark uppercase tracking-wider block mb-1">Phone Number (LK +94) *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+94 77 123 4567"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-2xl bg-cream border border-pink-rose/50 text-xs text-dark focus:outline-none focus:ring-2 focus:ring-pink-primary"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-dark pb-2 border-b border-pink-soft">
                2. Sri Lanka Delivery Address
              </h3>
              <div>
                <label className="text-xs font-bold text-dark uppercase tracking-wider block mb-1">Street Address / House No. *</label>
                <input
                  type="text"
                  name="address"
                  required
                  placeholder="e.g. No. 15, Galle Road"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl bg-cream border border-pink-rose/50 text-xs text-dark focus:outline-none focus:ring-2 focus:ring-pink-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-dark uppercase tracking-wider block mb-1">City / District *</label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-2xl bg-cream border border-pink-rose/50 text-xs font-semibold text-dark focus:outline-none focus:ring-2 focus:ring-pink-primary"
                  >
                    <option value="Colombo">Colombo (1 - 15)</option>
                    <option value="Dehiwala / Mount Lavinia">Dehiwala / Mount Lavinia</option>
                    <option value="Nugegoda / Kotte">Nugegoda / Kotte</option>
                    <option value="Gampaha / Negombo">Gampaha / Negombo</option>
                    <option value="Kandy">Kandy</option>
                    <option value="Galle">Galle</option>
                    <option value="Other District">Other District (Islandwide Express)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-dark uppercase tracking-wider block mb-1">Postal Code *</label>
                  <input
                    type="text"
                    name="postalCode"
                    required
                    placeholder="e.g. 00300"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-2xl bg-cream border border-pink-rose/50 text-xs text-dark focus:outline-none focus:ring-2 focus:ring-pink-primary"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-dark pb-2 border-b border-pink-soft">
                3. Payment Method (LKR)
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-pink-soft border-pink-primary text-pink-primary shadow-sm'
                      : 'bg-cream border-pink-rose/50 text-dark hover:bg-white'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Visa / MasterCard</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('payhere')}
                  className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === 'payhere'
                      ? 'bg-pink-soft border-pink-primary text-pink-primary shadow-sm'
                      : 'bg-cream border-pink-rose/50 text-dark hover:bg-white'
                  }`}
                >
                  <Wallet className="w-5 h-5" />
                  <span>PayHere / Koko</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === 'cod'
                      ? 'bg-pink-soft border-pink-primary text-pink-primary shadow-sm'
                      : 'bg-cream border-pink-rose/50 text-dark hover:bg-white'
                  }`}
                >
                  <ShieldCheck className="w-5 h-5" />
                  <span>Cash on Delivery</span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={cart.length === 0}
              className="w-full bg-gradient-to-r from-pink-primary to-pink-deep text-white font-sans text-sm font-bold py-4 rounded-2xl shadow-soft-pink hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>Place Order • {formatPrice(grandTotal)}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Order Summary Sidebar (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-4xl p-6 sm:p-8 border border-pink-soft/60 shadow-luxury space-y-6">
            <h3 className="font-serif text-lg font-bold text-dark pb-2 border-b border-pink-soft">
              Order Summary ({cart.length} items)
            </h3>

            {cart.length === 0 ? (
              <p className="text-xs text-graytext py-6 text-center">Your bag is empty.</p>
            ) : (
              <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
                {cart.map((item) => {
                  const itemPrice = item.customCakeConfig
                    ? item.customCakeConfig.estimatedPrice
                    : parseFloat(item.selectedVariant.price.amount);

                  return (
                    <div key={item.id} className="flex gap-3 text-xs border-b border-pink-soft/40 pb-3">
                      <div className="w-14 h-14 relative rounded-xl overflow-hidden bg-pink-soft flex-shrink-0">
                        <Image src={item.product.images[0]?.url || ''} alt={item.product.title} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif font-bold text-dark truncate">{item.product.title}</h4>
                        <span className="text-graytext text-[11px]">Qty: {item.quantity}</span>
                        {item.customMessage && (
                          <div className="text-[10px] text-pink-primary font-medium truncate">
                            &quot;{item.customMessage}&quot;
                          </div>
                        )}
                      </div>
                      <div className="font-bold text-dark">
                        {formatPrice(itemPrice * item.quantity)}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Price Calculations */}
            <div className="space-y-2 text-xs text-graytext pt-2 border-t border-pink-soft">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="font-bold text-dark">{formatPrice(subtotal)}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-pink-primary">
                  <span>Discount ({appliedCoupon.code}):</span>
                  <span className="font-bold">-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Sri Lanka Delivery Fee:</span>
                <span className="font-bold text-dark">{shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-dark pt-3 border-t border-pink-soft">
                <span>Grand Total:</span>
                <span className="text-pink-primary">{formatPrice(grandTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
