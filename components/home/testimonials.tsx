'use client';

import React from 'react';
import Image from 'next/image';
import { MOCK_TESTIMONIALS } from '@/lib/shopify/mock-data';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

export function Testimonials() {
  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-pink-soft/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-pink-primary block mb-1 font-sans">
            Client Love
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-dark">
            Customer Testimonials
          </h2>
          <div className="w-16 h-1 bg-pink-primary mx-auto mt-3 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_TESTIMONIALS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-cream/60 backdrop-blur-md rounded-3xl p-8 border border-pink-soft/80 shadow-sm hover:shadow-luxury hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative group"
            >
              <Quote className="w-10 h-10 text-pink-rose/50 absolute top-6 right-6" />

              <div className="space-y-4 relative z-10">
                {/* Rating */}
                <div className="flex text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="font-sans text-xs sm:text-sm text-dark/80 leading-relaxed italic">
                  &quot;{item.review}&quot;
                </p>
              </div>

              {/* Customer Avatar & Details */}
              <div className="flex items-center gap-3 pt-6 mt-6 border-t border-pink-soft/60">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                  <Image src={item.avatar} alt={item.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-dark">{item.name}</h4>
                  <span className="text-[11px] text-pink-primary font-medium">{item.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
