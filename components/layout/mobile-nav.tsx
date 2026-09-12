'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Store, Sparkles, Heart, ShoppingBag, MessageCircle } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { useWishlist } from '@/context/wishlist-context';

export function MobileNav() {
  const pathname = usePathname();
  const { setIsOpen: setCartOpen, totalItems } = useCart();
  const { wishlistCount } = useWishlist();

  return (
    <>
      {/* Floating WhatsApp Action Button */}
      <a
        href="https://wa.me/94771234567?text=Hello!%20I%20would%20like%20to%20order%20a%20luxury%20cake%20in%20Sri%20Lanka."
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-20 right-5 z-40 w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform animate-pulse-slow sm:bottom-6"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-white" />
      </a>

      {/* Mobile Fixed Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-pink-soft px-4 py-2 flex items-center justify-around shadow-luxury">
        <Link
          href="/"
          className={`flex flex-col items-center gap-1 text-[11px] font-medium transition-colors ${
            pathname === '/' ? 'text-pink-primary font-bold' : 'text-dark/70'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </Link>

        <Link
          href="/shop"
          className={`flex flex-col items-center gap-1 text-[11px] font-medium transition-colors ${
            pathname === '/shop' ? 'text-pink-primary font-bold' : 'text-dark/70'
          }`}
        >
          <Store className="w-5 h-5" />
          <span>Shop</span>
        </Link>

        <Link
          href="/custom-cake"
          className={`flex flex-col items-center gap-1 text-[11px] font-medium transition-colors ${
            pathname === '/custom-cake' ? 'text-pink-primary font-bold' : 'text-dark/70'
          }`}
        >
          <div className="w-8 h-8 -mt-4 bg-gradient-to-tr from-pink-primary to-pink-rose rounded-full text-white flex items-center justify-center shadow-soft-pink">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-pink-primary font-bold">Custom</span>
        </Link>

        <Link
          href="/wishlist"
          className={`relative flex flex-col items-center gap-1 text-[11px] font-medium transition-colors ${
            pathname === '/wishlist' ? 'text-pink-primary font-bold' : 'text-dark/70'
          }`}
        >
          <Heart className="w-5 h-5" />
          <span>Wishlist</span>
          {wishlistCount > 0 && (
            <span className="absolute -top-1 right-2 bg-pink-primary text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
        </Link>

        <button
          onClick={() => setCartOpen(true)}
          className="relative flex flex-col items-center gap-1 text-[11px] font-medium text-dark/70"
        >
          <ShoppingBag className="w-5 h-5 text-pink-primary" />
          <span>Cart</span>
          {totalItems > 0 && (
            <span className="absolute -top-1 right-1 bg-dark text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </>
  );
}
