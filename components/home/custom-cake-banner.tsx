'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowRight, Palette } from 'lucide-react';
import { motion } from 'framer-motion';

export function CustomCakeBanner() {
  return (
    <section className="py-16 bg-gradient-to-r from-pink-soft/80 via-cream to-pink-rose/40 relative overflow-hidden my-8">
      {/* Background Floral Shapes */}
      <div className="absolute -top-10 -right-10 w-96 h-96 bg-pink-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-pink-rose/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-white/70 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-pink-rose/60 shadow-luxury">
          {/* Left Text */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-soft text-pink-primary text-xs font-semibold">
              <Palette className="w-4 h-4" />
              <span>Rose Cake House Studio</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-dark leading-tight">
              Your Dream Cake, <br />
              <span className="text-pink-primary italic">Crafted Just for You</span>
            </h2>

            <p className="font-sans text-sm text-graytext max-w-md leading-relaxed">
              Tell us your theme, favorite flavors, size, and custom decorations. Our master pastry chefs turn your vision into a sweet, memorable masterpiece.
            </p>

            <div className="pt-2">
              <Link
                href="/custom-cake"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-primary to-pink-deep text-white font-sans text-sm font-bold px-8 py-4 rounded-2xl shadow-soft-pink hover:scale-105 transition-all group"
              >
                <span>Order Custom Cake</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative flex justify-center">
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4 }}
              className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
            >
              <Image
                src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop"
                alt="Custom Luxury Rose Cake House Creation"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Floating Sparkle Pill */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-pink-soft flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-primary" />
              <span className="text-xs font-bold text-dark">100% Tailored to Your Theme</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
