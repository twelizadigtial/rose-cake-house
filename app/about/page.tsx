'use client';

import React from 'react';
import Image from 'next/image';
import { Award, Sparkles, UtensilsCrossed } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream/30 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-soft text-pink-primary text-xs font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Our Story & Heritage</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-dark">
            Rose Cake House Story
          </h1>
          <p className="text-xs sm:text-sm text-graytext font-sans leading-relaxed">
            Founded with a passion for luxury cake artistry in Colombo 03, Rose Cake House combines timeless pastry traditions with modern aesthetic designs for every celebration in Sri Lanka.
          </p>
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white rounded-4xl p-8 sm:p-12 border border-pink-soft/60 shadow-luxury">
          <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <Image
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1000&auto=format&fit=crop"
              alt="Artisan Pastry Chef at Rose Cake House"
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-6">
            <h2 className="font-serif text-3xl font-bold text-dark">
              Only the Finest Organic Ingredients
            </h2>
            <p className="font-sans text-xs sm:text-sm text-graytext leading-relaxed">
              We source our cacao directly from single-origin chocolate producers in Belgium and France. Our vanilla beans are hand-harvested, and our fresh organic cream arrives daily from local dairy farms.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-cream border border-pink-rose/50">
                <UtensilsCrossed className="w-6 h-6 text-pink-primary mb-2" />
                <h4 className="font-serif font-bold text-dark text-sm">100% Handcrafted</h4>
                <p className="text-[11px] text-graytext">Baked fresh every morning in Colombo</p>
              </div>
              <div className="p-4 rounded-2xl bg-cream border border-pink-rose/50">
                <Award className="w-6 h-6 text-pink-primary mb-2" />
                <h4 className="font-serif font-bold text-dark text-sm">Award-Winning</h4>
                <p className="text-[11px] text-graytext">Sri Lanka&apos;s Premier Cake House</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
