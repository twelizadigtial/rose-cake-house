'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useWishlist } from '@/context/wishlist-context';
import { useCart } from '@/context/cart-context';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-cream/30 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="w-12 h-12 rounded-full bg-pink-soft text-pink-primary flex items-center justify-center mx-auto">
            <Heart className="w-6 h-6 fill-pink-primary" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-dark">
            Your Wishlist ({wishlist.length})
          </h1>
          <p className="text-xs text-graytext font-sans">
            Saved artisan creations ready for your future celebrations.
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center max-w-md mx-auto space-y-4 border border-pink-soft shadow-sm">
            <h3 className="font-serif text-xl font-bold text-dark">Your wishlist is empty</h3>
            <p className="text-xs text-graytext">
              Save your favorite cakes by clicking the heart icon on any cake card.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-pink-primary text-white text-xs font-bold px-6 py-3 rounded-2xl shadow-soft-pink hover:bg-pink-deep transition-all"
            >
              <span>Explore Bakery Shop</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-3xl p-4 border border-pink-soft shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-pink-soft">
                  <Image src={product.images[0]?.url || ''} alt={product.title} fill className="object-cover" />
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-3 right-3 p-2 bg-white/90 rounded-full text-red-500 hover:scale-110 transition-transform"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-pink-primary uppercase tracking-wider block">
                    {product.category}
                  </span>
                  <h3 className="font-serif text-sm font-bold text-dark truncate">{product.title}</h3>
                  <div className="font-sans text-sm font-bold text-dark">
                    {formatPrice(parseFloat(product.priceRange.minVariantPrice.amount))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    addToCart(product, product.variants[0], 1);
                    toggleWishlist(product);
                  }}
                  className="w-full bg-pink-primary text-white font-sans text-xs font-bold py-3 rounded-2xl shadow-soft-pink hover:bg-pink-deep transition-all flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Move to Bag</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
