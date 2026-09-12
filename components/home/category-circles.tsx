'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MOCK_COLLECTIONS } from '@/lib/shopify/mock-data';
import { motion } from 'framer-motion';

export function CategoryCircles() {
  return (
    <section className="py-16 bg-cream/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-semibold text-pink-primary uppercase tracking-widest">
            Curated Collections
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-dark">
            Explore Bakery Categories
          </h2>
          <p className="text-xs sm:text-sm text-graytext font-sans">
            Handcrafted for birthdays, grand weddings, anniversaries, and everyday sweet moments.
          </p>
        </div>

        {/* 8 Circular Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 sm:gap-8">
          {MOCK_COLLECTIONS.map((col, idx) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              viewport={{ once: true }}
            >
              <Link
                href={`/shop?category=${encodeURIComponent(col.title)}`}
                className="group flex flex-col items-center text-center space-y-3"
              >
                {/* Image Circle Container */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-pink-primary via-pink-rose to-white shadow-md group-hover:shadow-pink-rose group-hover:scale-105 transition-all duration-300">
                  <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white bg-pink-soft">
                    <Image
                      src={col.image?.url || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=400&auto=format&fit=crop'}
                      alt={col.title}
                      fill
                      sizes="112px"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Category Title */}
                <div>
                  <h3 className="font-serif text-sm font-bold text-dark group-hover:text-pink-primary transition-colors">
                    {col.title}
                  </h3>
                  <span className="text-[11px] text-graytext block">Explore Collection →</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
