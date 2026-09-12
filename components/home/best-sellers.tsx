'use client';

import React from 'react';
import Link from 'next/link';
import { MOCK_PRODUCTS } from '@/lib/shopify/mock-data';
import { ProductCard } from './product-card';
import { ArrowRight } from 'lucide-react';

export function BestSellers() {
  const bestSellers = MOCK_PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <section className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-pink-primary block mb-1 font-sans">
              Most Loved Creations
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-dark">
              Best Sellers
            </h2>
          </div>

          <Link
            href="/shop"
            className="font-sans text-xs font-bold text-pink-primary hover:text-pink-deep flex items-center gap-1.5 group"
          >
            <span>View All Bestsellers</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
