'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight, Star, Heart, Award } from 'lucide-react';

const HERO_SLIDES = [
  {
    id: 1,
    headline: 'Artisan Creations by',
    highlight: 'Rose Cake House',
    subtitle: 'Handcrafted luxury cakes baked daily in Colombo using organic French cocoa, Madagascar vanilla, and real fruit compotes. Islandwide delivery available.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1200&auto=format&fit=crop',
    tag: '✨ Rose Cake House Signature',
    badgeText: '3D Sculpted Ganache'
  },
  {
    id: 2,
    headline: 'Unforgettable Tiered',
    highlight: 'Wedding Masterpieces',
    subtitle: 'Custom designed tier cakes crafted with hand-piped sugar roses, champagne mousse, and 24K edible gold leaf accents by Rose Cake House master chefs.',
    image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?q=80&w=1200&auto=format&fit=crop',
    tag: '💒 Grand Wedding Collection',
    badgeText: 'Handcrafted Sugar Petals'
  },
  {
    id: 3,
    headline: 'Minimalist Korean',
    highlight: 'Cute Bento Delights',
    subtitle: 'Adorable 300g lunchbox cakes with vintage buttercream piping and custom handwritten love notes. Perfect for intimate moments.',
    image: 'https://images.unsplash.com/photo-1562440499-64c9a111f713?q=80&w=1200&auto=format&fit=crop',
    tag: '💖 Daily Fresh Bento Boxes',
    badgeText: 'Silky Buttercream Piping'
  }
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream via-pink-soft/30 to-white py-12 lg:py-20">
      {/* Floating Ambient Glow & Floral Elements */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-pink-rose/50 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-pink-soft/70 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[500px]">
          {/* Left Column: Text & CTAs */}
          <div className="space-y-6 text-center lg:text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-soft border border-pink-rose text-pink-primary text-xs font-semibold tracking-wide shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{slide.tag}</span>
                </div>

                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-dark leading-[1.15]">
                  {slide.headline}{' '}
                  <span className="text-pink-primary bg-gradient-to-r from-pink-primary to-pink-deep bg-clip-text text-transparent underline decoration-pink-rose decoration-wavy">
                    {slide.highlight}
                  </span>
                </h1>

                <p className="font-sans text-sm sm:text-base text-graytext max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  {slide.subtitle}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/shop"
                className="w-full sm:w-auto bg-gradient-to-r from-pink-primary to-pink-deep text-white font-sans text-sm font-bold px-8 py-4 rounded-full shadow-soft-pink hover:scale-105 hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
              >
                <span>Shop All Cakes</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/custom-cake"
                className="w-full sm:w-auto bg-white border-2 border-pink-primary text-pink-primary font-sans text-sm font-bold px-8 py-3.5 rounded-full hover:bg-pink-soft/50 transition-all text-center"
              >
                Customize Cake Studio
              </Link>
            </div>

            {/* Social Proof & Rating pill */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-3 text-xs text-dark font-medium">
              <div className="flex -space-x-2">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop"
                  alt="Rose Cake House Customer"
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-white object-cover"
                />
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop"
                  alt="Rose Cake House Customer"
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-white object-cover"
                />
                <Image
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=100&auto=format&fit=crop"
                  alt="Rose Cake House Customer"
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-white object-cover"
                />
              </div>
              <div className="flex items-center gap-1">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-bold">4.9/5</span>
                <span className="text-graytext">(3,100+ Sri Lankan reviews)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Premium High-Quality Visual Cake Showcase */}
          <div className="relative flex justify-center items-center">
            {/* Spinning Glow Backdrop Ring */}
            <div className="absolute w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] rounded-full bg-gradient-to-tr from-pink-rose via-pink-soft to-white shadow-2xl animate-spin-slow opacity-70" />

            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ scale: 0.88, opacity: 0, rotateY: -15, y: 15 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0, y: 0 }}
                exit={{ scale: 0.88, opacity: 0, rotateY: 15, y: -15 }}
                transition={{ duration: 0.7, type: 'spring', damping: 20 }}
                className="relative w-[310px] h-[310px] sm:w-[410px] sm:h-[410px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white group"
              >
                <Image
                  src={slide.image}
                  alt={slide.headline}
                  fill
                  priority
                  sizes="(max-width: 768px) 310px, 410px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Glassmorphic 3D Craft Badge Overlay */}
                <div className="absolute top-4 left-4 bg-white/85 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md border border-pink-soft flex items-center gap-1.5 text-xs font-bold text-dark">
                  <Award className="w-4 h-4 text-pink-primary" />
                  <span>{slide.badgeText}</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Floating Micro-Badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute -bottom-4 -left-4 sm:left-4 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-pink-soft flex items-center gap-2 z-20"
            >
              <div className="w-8 h-8 rounded-full bg-pink-soft flex items-center justify-center text-pink-primary">
                <Heart className="w-4 h-4 fill-pink-primary" />
              </div>
              <div>
                <span className="text-[11px] text-graytext font-medium block">Freshly Baked Daily</span>
                <span className="text-xs font-bold text-dark">100% Eggless & Custom Options</span>
              </div>
            </motion.div>

            {/* Carousel Navigation Controls */}
            <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 flex gap-2 z-20">
              <button
                onClick={prevSlide}
                className="p-3 rounded-full bg-white/90 backdrop-blur-md text-dark hover:bg-pink-primary hover:text-white shadow-lg transition-all"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="p-3 rounded-full bg-white/90 backdrop-blur-md text-dark hover:bg-pink-primary hover:text-white shadow-lg transition-all"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
