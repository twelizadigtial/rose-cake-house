'use client';

import React from 'react';
import Image from 'next/image';
import { INSTAGRAM_POSTS } from '@/lib/shopify/mock-data';
import { Heart, MessageCircle } from 'lucide-react';
import { InstagramIcon } from '@/components/ui/icons';
import { motion } from 'framer-motion';

export function InstagramGallery() {
  return (
    <section className="py-16 bg-cream/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <div className="max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-soft text-pink-primary text-xs font-semibold">
            <InstagramIcon className="w-4 h-4" />
            <span>@maisondugateau</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-dark">
            Follow Us on Instagram
          </h2>
          <p className="text-xs text-graytext">
            Tag #MaisonDuGateau to be featured on our official luxury feed
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INSTAGRAM_POSTS.map((post, idx) => (
            <motion.a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="relative aspect-square rounded-3xl overflow-hidden group shadow-md"
            >
              <Image
                src={post.image}
                alt="Instagram Post"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-dark/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 text-white font-sans text-sm font-bold backdrop-blur-xs">
                <div className="flex items-center gap-1.5">
                  <Heart className="w-5 h-5 fill-white" />
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>{post.comments}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
