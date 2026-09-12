'use client';

import React from 'react';
import { Truck, Award, Sparkles, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const FEATURES = [
  {
    icon: Truck,
    title: 'Fast Delivery',
    desc: 'On time, every time in temperature-controlled boxes',
  },
  {
    icon: Award,
    title: 'Premium Ingredients',
    desc: 'Organic French cocoa & pure Madagascar vanilla',
  },
  {
    icon: Sparkles,
    title: 'Freshly Baked Daily',
    desc: 'Handcrafted early morning specifically for your order',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Payments',
    desc: '100% encrypted checkout & buyer protection',
  },
];

export function FeaturesStrip() {
  return (
    <section className="py-8 bg-white border-y border-pink-soft/40 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-5 rounded-2xl bg-cream/70 border border-pink-soft/60 hover:bg-white hover:shadow-luxury hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-pink-soft flex items-center justify-center text-pink-primary group-hover:bg-pink-primary group-hover:text-white transition-colors shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-sm font-bold text-dark group-hover:text-pink-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="font-sans text-xs text-graytext mt-0.5">{feature.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
