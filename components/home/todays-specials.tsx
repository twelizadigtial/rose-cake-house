'use client';

import React, { useState, useEffect } from 'react';
import { MOCK_PRODUCTS } from '@/lib/shopify/mock-data';
import { ProductCard } from './product-card';
import { Flame, Clock } from 'lucide-react';

export function TodaysSpecials() {
  const specialProducts = MOCK_PRODUCTS.filter((p) => p.isSpecial || p.discountPercentage);

  const [timeLeft, setTimeLeft] = useState({ hours: 8, minutes: 42, seconds: 15 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 bg-cream/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-500 text-xs font-bold mb-2">
              <Flame className="w-4 h-4 fill-red-500" />
              <span>Limited Time Offer</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-dark">
              Today&apos;s Specials
            </h2>
          </div>

          {/* Countdown Timer Display */}
          <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl shadow-sm border border-pink-soft">
            <Clock className="w-5 h-5 text-pink-primary" />
            <span className="text-xs font-medium text-graytext">Ends in:</span>
            <div className="flex items-center gap-1.5 font-mono text-sm font-bold text-dark">
              <span className="bg-pink-soft text-pink-primary px-2 py-1 rounded-lg">
                {String(timeLeft.hours).padStart(2, '0')}h
              </span>
              <span>:</span>
              <span className="bg-pink-soft text-pink-primary px-2 py-1 rounded-lg">
                {String(timeLeft.minutes).padStart(2, '0')}m
              </span>
              <span>:</span>
              <span className="bg-pink-soft text-pink-primary px-2 py-1 rounded-lg">
                {String(timeLeft.seconds).padStart(2, '0')}s
              </span>
            </div>
          </div>
        </div>

        {/* Horizontal Scrolling Card Container */}
        <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x">
          {specialProducts.map((product) => (
            <div key={product.id} className="min-w-[280px] sm:min-w-[320px] snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
