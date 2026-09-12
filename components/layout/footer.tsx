'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Cake, MessageCircle, Send, ShieldCheck, Heart } from 'lucide-react';
import { InstagramIcon, FacebookIcon } from '@/components/ui/icons';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-cream border-t border-pink-soft pt-16 pb-8 text-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-primary to-pink-rose flex items-center justify-center text-white shadow-soft-pink">
                <Cake className="w-6 h-6" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-dark block leading-none">
                  Rose <span className="text-pink-primary italic">Cake House</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase text-graytext block font-sans">
                  Luxury Artisan Bakery • Sri Lanka
                </span>
              </div>
            </Link>

            <p className="font-sans text-xs text-graytext leading-relaxed">
              We bake more than luxury cakes, we bake pure happiness and memorable celebrations across Sri Lanka. Handcrafted fresh daily in Colombo 03.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white border border-pink-soft flex items-center justify-center text-dark hover:text-pink-primary hover:border-pink-primary transition-all shadow-sm"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white border border-pink-soft flex items-center justify-center text-dark hover:text-pink-primary hover:border-pink-primary transition-all shadow-sm"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/94771234567"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white border border-pink-soft flex items-center justify-center text-dark hover:text-pink-primary hover:border-pink-primary transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-serif text-base font-bold text-dark mb-4 relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-pink-primary rounded-full" />
            </h4>
            <ul className="space-y-2.5 text-xs font-sans">
              <li>
                <Link href="/" className="text-graytext hover:text-pink-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-graytext hover:text-pink-primary transition-colors">
                  Shop All Cakes
                </Link>
              </li>
              <li>
                <Link href="/custom-cake" className="text-pink-primary font-semibold hover:underline">
                  Custom Cake Studio
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-graytext hover:text-pink-primary transition-colors">
                  About Us & Story
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-graytext hover:text-pink-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Service */}
          <div>
            <h4 className="font-serif text-base font-bold text-dark mb-4 relative inline-block">
              Customer Service
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-pink-primary rounded-full" />
            </h4>
            <ul className="space-y-2.5 text-xs font-sans">
              <li>
                <Link href="/checkout" className="text-graytext hover:text-pink-primary transition-colors">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="text-graytext hover:text-pink-primary transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-graytext hover:text-pink-primary transition-colors">
                  Islandwide Delivery Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-graytext hover:text-pink-primary transition-colors">
                  Return & Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-graytext hover:text-pink-primary transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="font-serif text-base font-bold text-dark mb-4 relative inline-block">
              V.I.P Club
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-pink-primary rounded-full" />
            </h4>
            <p className="font-sans text-xs text-graytext mb-4">
              Subscribe to get sweet updates, secret discounts & seasonal cake releases from Rose Cake House.
            </p>

            {subscribed ? (
              <div className="bg-pink-soft p-3 rounded-2xl text-xs text-pink-primary font-semibold flex items-center gap-2">
                <Heart className="w-4 h-4 fill-pink-primary" />
                <span>Thank you! You are on our VIP list.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-2xl bg-white border border-pink-rose/50 text-xs font-sans text-dark focus:outline-none focus:ring-2 focus:ring-pink-primary"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 bottom-1.5 bg-pink-primary text-white px-4 rounded-xl text-xs font-bold hover:bg-pink-deep transition-colors flex items-center gap-1 shadow-soft-pink"
                  >
                    <span>Join</span>
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="border-t border-pink-soft/80 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-graytext font-sans">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Rose Cake House. All Rights Reserved.</span>
          </div>

          <div className="flex items-center gap-4 text-dark/70 font-semibold">
            <span className="flex items-center gap-1 text-[11px]">
              <ShieldCheck className="w-4 h-4 text-pink-primary" /> 256-bit Encrypted Checkout (LKR)
            </span>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-white border border-pink-soft rounded text-[10px]">VISA</span>
              <span className="px-2 py-1 bg-white border border-pink-soft rounded text-[10px]">MC</span>
              <span className="px-2 py-1 bg-white border border-pink-soft rounded text-[10px]">PayHere</span>
              <span className="px-2 py-1 bg-white border border-pink-soft rounded text-[10px]">Koko</span>
              <span className="px-2 py-1 bg-white border border-pink-soft rounded text-[10px]">Mintpay</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
