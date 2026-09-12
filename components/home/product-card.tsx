'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/shopify/types';
import { useCart } from '@/context/cart-context';
import { useWishlist } from '@/context/wishlist-context';
import { Heart, ShoppingBag, Eye, Star, Check } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const inWishlist = isInWishlist(product.id);
  const primaryImage = product.images[0]?.url || '';
  const secondaryImage = product.images[1]?.url || primaryImage;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedVariant);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3 }}
        className="group relative bg-white rounded-3xl p-4 border border-pink-soft/60 shadow-card hover:shadow-luxury transition-all flex flex-col justify-between"
      >
        <div>
          {/* Image Container with Badges */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-pink-soft/30 mb-4">
            <Image
              src={primaryImage}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Discount Badge */}
            {product.discountPercentage && (
              <span className="absolute top-3 left-3 bg-pink-primary text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                -{product.discountPercentage}% OFF
              </span>
            )}

            {/* Best Seller Badge */}
            {product.isBestSeller && !product.discountPercentage && (
              <span className="absolute top-3 left-3 bg-dark text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                Best Seller
              </span>
            )}

            {/* Wishlist Button */}
            <button
              onClick={handleWishlist}
              className={`absolute top-3 right-3 p-2.5 rounded-full shadow-md backdrop-blur-md transition-all ${
                inWishlist
                  ? 'bg-pink-primary text-white scale-110'
                  : 'bg-white/80 text-dark hover:bg-white hover:text-pink-primary'
              }`}
              aria-label="Wishlist toggle"
            >
              <Heart className={`w-4 h-4 ${inWishlist ? 'fill-white' : ''}`} />
            </button>

            {/* Quick View Button */}
            <button
              onClick={() => setQuickViewOpen(true)}
              className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md text-dark text-xs font-semibold px-4 py-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-1.5 hover:bg-pink-primary hover:text-white"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Quick View</span>
            </button>
          </div>

          {/* Product Title & Info */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-graytext">
              <span className="font-medium">{product.category}</span>
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{product.rating}</span>
                <span className="text-graytext text-[10px]">({product.reviewCount})</span>
              </div>
            </div>

            <Link href={`/products/${product.handle}`} className="block">
              <h3 className="font-serif text-base font-bold text-dark group-hover:text-pink-primary transition-colors line-clamp-1">
                {product.title}
              </h3>
            </Link>

            <p className="text-xs text-graytext line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>

        {/* Price & Add to Cart */}
        <div className="pt-4 mt-3 border-t border-pink-soft/50 flex items-center justify-between">
          <div>
            <div className="font-sans font-bold text-base text-dark">
              {formatPrice(parseFloat(selectedVariant.price.amount))}
            </div>
            {product.compareAtPrice && (
              <div className="text-xs text-graytext line-through">
                {formatPrice(parseFloat(product.compareAtPrice.amount))}
              </div>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className={`p-3 rounded-2xl font-semibold text-xs transition-all flex items-center gap-1.5 ${
              addedAnimation
                ? 'bg-emerald-500 text-white'
                : 'bg-pink-soft text-pink-primary hover:bg-pink-primary hover:text-white shadow-soft-pink'
            }`}
            aria-label="Add to cart"
          >
            {addedAnimation ? (
              <>
                <Check className="w-4 h-4" />
                <span className="hidden sm:inline">Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Add</span>
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-dark/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-4xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative border border-pink-soft"
            >
              <button
                onClick={() => setQuickViewOpen(false)}
                className="absolute top-4 right-4 p-2 text-graytext hover:text-dark rounded-full hover:bg-cream"
              >
                ✕
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-pink-soft">
                  <Image src={primaryImage} alt={product.title} fill className="object-cover" />
                </div>

                <div className="space-y-4">
                  <span className="text-xs font-semibold text-pink-primary uppercase tracking-wider">
                    {product.category}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-dark">{product.title}</h3>

                  <div className="flex items-center gap-2 text-xs">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="font-bold text-dark">{product.rating}</span>
                    <span className="text-graytext">({product.reviewCount} customer reviews)</span>
                  </div>

                  <p className="text-xs text-graytext leading-relaxed">{product.description}</p>

                  <div className="font-sans text-2xl font-bold text-pink-primary">
                    {formatPrice(parseFloat(selectedVariant.price.amount))}
                  </div>

                  {/* Variant Selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-dark uppercase">Weight / Size:</label>
                    <div className="flex gap-2">
                      {product.variants.map((v) => (
                        <button
                          key={v.id}
                          onClick={() => setSelectedVariant(v)}
                          className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
                            selectedVariant.id === v.id
                              ? 'bg-pink-primary text-white border-pink-primary'
                              : 'bg-cream text-dark border-pink-rose/50 hover:bg-pink-soft'
                          }`}
                        >
                          {v.title}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-gradient-to-r from-pink-primary to-pink-deep text-white font-sans font-bold text-sm py-3.5 rounded-2xl shadow-soft-pink flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag • {formatPrice(parseFloat(selectedVariant.price.amount))}</span>
                  </button>

                  <Link
                    href={`/products/${product.handle}`}
                    onClick={() => setQuickViewOpen(false)}
                    className="block text-center text-xs text-pink-primary font-semibold hover:underline"
                  >
                    View Full Product Details →
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
