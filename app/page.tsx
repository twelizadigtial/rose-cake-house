import React from 'react';
import { HeroCarousel } from '@/components/home/hero-carousel';
import { FeaturesStrip } from '@/components/home/features-strip';
import { CategoryCircles } from '@/components/home/category-circles';
import { BestSellers } from '@/components/home/best-sellers';
import { CustomCakeBanner } from '@/components/home/custom-cake-banner';
import { TodaysSpecials } from '@/components/home/todays-specials';
import { Testimonials } from '@/components/home/testimonials';
import { InstagramGallery } from '@/components/home/instagram-gallery';
import { NewsletterSection } from '@/components/home/newsletter-section';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <HeroCarousel />
      <FeaturesStrip />
      <CategoryCircles />
      <BestSellers />
      <CustomCakeBanner />
      <TodaysSpecials />
      <Testimonials />
      <InstagramGallery />
      <NewsletterSection />
    </main>
  );
}
