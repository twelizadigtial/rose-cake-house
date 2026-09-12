'use client';

import React, { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MOCK_PRODUCTS } from '@/lib/shopify/mock-data';
import { ProductCard } from '@/components/home/product-card';
import { useCart } from '@/context/cart-context';
import { useWishlist } from '@/context/wishlist-context';
import { formatPrice } from '@/lib/utils';
import {
  Star,
  Heart,
  ShoppingBag,
  Zap,
  Calendar,
  MessageSquare,
  Upload,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Truck,
  Sparkles,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = use(params);
  const product = MOCK_PRODUCTS.find((p) => p.handle === handle) || MOCK_PRODUCTS[0];

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [cakeMessage, setCakeMessage] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [uploadedPhotoName, setUploadedPhotoName] = useState('');
  const [activeAccordion, setActiveAccordion] = useState<'ingredients' | 'delivery' | 'care' | null>('ingredients');
  const [addedToast, setAddedToast] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const price = parseFloat(selectedVariant.price.amount);
  const comparePrice = product.compareAtPrice ? parseFloat(product.compareAtPrice.amount) : null;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedPhotoName(e.target.files[0].name);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity, {
      customMessage: cakeMessage,
      deliveryDate: deliveryDate,
      photoUrl: uploadedPhotoName ? `/uploads/${uploadedPhotoName}` : undefined,
    });
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    window.location.href = '/checkout';
  };

  const relatedProducts = MOCK_PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-cream/30 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Breadcrumb */}
        <div className="text-xs font-sans text-graytext flex items-center gap-2">
          <Link href="/" className="hover:text-pink-primary">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-pink-primary">
            Shop
          </Link>
          <span>/</span>
          <span className="text-dark font-semibold">{product.title}</span>
        </div>

        {/* Top Product Detail Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start bg-white rounded-4xl p-6 sm:p-10 border border-pink-soft/60 shadow-luxury">
          {/* Left: Gallery & Zoom Preview */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-pink-soft/30 border border-pink-soft group">
              <Image
                src={product.images[selectedImage]?.url || product.images[0].url}
                alt={product.title}
                fill
                priority
                className="object-cover group-hover:scale-110 transition-transform duration-700 cursor-zoom-in"
              />
              <button
                onClick={() => toggleWishlist(product)}
                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md shadow-md transition-transform ${
                  isFavorited ? 'bg-pink-primary text-white' : 'bg-white/80 text-dark hover:bg-white'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-white' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Carousel */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      selectedImage === idx
                        ? 'border-pink-primary scale-105 shadow-soft-pink'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image src={img.url} alt={img.altText} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info & Actions */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-pink-primary uppercase tracking-widest block font-sans">
                {product.category}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-dark mt-1">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-3 text-xs">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-bold text-dark">{product.rating}</span>
                <span className="text-graytext">({product.reviewCount} verified reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="font-sans text-3xl font-bold text-dark">
                {formatPrice(price * quantity)}
              </span>
              {comparePrice && (
                <span className="text-base text-graytext line-through font-sans">
                  {formatPrice(comparePrice * quantity)}
                </span>
              )}
            </div>

            <p className="font-sans text-xs sm:text-sm text-graytext leading-relaxed">
              {product.description}
            </p>

            {/* Weight / Size Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-dark uppercase tracking-wider block">
                Select Cake Weight / Size:
              </label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                      selectedVariant.id === variant.id
                        ? 'bg-pink-primary text-white shadow-soft-pink'
                        : 'bg-cream border border-pink-rose/50 text-dark hover:bg-pink-soft'
                    }`}
                  >
                    {variant.title} ({formatPrice(parseFloat(variant.price.amount))})
                  </button>
                ))}
              </div>
            </div>

            {/* Cake Message Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-dark uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-pink-primary" />
                <span>Custom Message on Cake (Optional):</span>
              </label>
              <input
                type="text"
                maxLength={35}
                placeholder="e.g. Happy Birthday Sarah! ❤️"
                value={cakeMessage}
                onChange={(e) => setCakeMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-cream border border-pink-rose/50 text-xs font-sans focus:outline-none focus:ring-2 focus:ring-pink-primary text-dark"
              />
              <span className="text-[10px] text-graytext block text-right">
                {cakeMessage.length}/35 characters
              </span>
            </div>

            {/* Delivery Date Picker & Photo Upload */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-dark uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-pink-primary" />
                  <span>Select Delivery Date:</span>
                </label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-cream border border-pink-rose/50 text-xs font-sans text-dark focus:outline-none focus:ring-2 focus:ring-pink-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-dark uppercase tracking-wider flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5 text-pink-primary" />
                  <span>Upload Photo for Cake Print:</span>
                </label>
                <label className="w-full px-4 py-2.5 rounded-2xl bg-cream border border-pink-rose/50 text-xs font-sans text-graytext flex items-center justify-between cursor-pointer hover:bg-pink-soft">
                  <span className="truncate">{uploadedPhotoName || 'Choose image file...'}</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                </label>
              </div>
            </div>

            {/* Quantity Controls & CTA Buttons */}
            <div className="space-y-4 pt-4 border-t border-pink-soft">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 bg-cream px-3 py-2 rounded-2xl border border-pink-rose/50">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="text-dark font-bold hover:text-pink-primary px-2"
                  >
                    -
                  </button>
                  <span className="text-xs font-bold text-dark min-w-[20px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="text-dark font-bold hover:text-pink-primary px-2"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-pink-primary to-pink-deep text-white font-sans text-sm font-bold py-3.5 rounded-2xl shadow-soft-pink hover:scale-105 transition-transform flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{addedToast ? 'Added to Bag! 🎉' : 'Add to Bag'}</span>
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full bg-dark text-white font-sans text-sm font-bold py-3.5 rounded-2xl shadow-lg hover:bg-pink-primary transition-colors flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>Buy Now with Express Checkout</span>
              </button>
            </div>

            {/* Accordion Information */}
            <div className="space-y-2 pt-4 border-t border-pink-soft text-xs">
              {/* Ingredients Accordion */}
              <div className="border border-pink-soft rounded-2xl overflow-hidden">
                <button
                  onClick={() =>
                    setActiveAccordion(activeAccordion === 'ingredients' ? null : 'ingredients')
                  }
                  className="w-full px-4 py-3 bg-cream flex justify-between items-center font-bold text-dark"
                >
                  <span>Premium Ingredients</span>
                  {activeAccordion === 'ingredients' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {activeAccordion === 'ingredients' && (
                  <div className="p-4 bg-white space-y-1 text-graytext">
                    <ul className="list-disc list-inside space-y-1">
                      {product.ingredients?.map((ing, idx) => (
                        <li key={idx}>{ing}</li>
                      )) || <li>Belgian Dark Chocolate, Organic Butter, Madagascar Vanilla, Fresh Cream.</li>}
                    </ul>
                  </div>
                )}
              </div>

              {/* Delivery Info Accordion */}
              <div className="border border-pink-soft rounded-2xl overflow-hidden">
                <button
                  onClick={() =>
                    setActiveAccordion(activeAccordion === 'delivery' ? null : 'delivery')
                  }
                  className="w-full px-4 py-3 bg-cream flex justify-between items-center font-bold text-dark"
                >
                  <span>Delivery & Handing</span>
                  {activeAccordion === 'delivery' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {activeAccordion === 'delivery' && (
                  <div className="p-4 bg-white text-graytext leading-relaxed">
                    {product.deliveryInfo || 'Hand delivered in temperature-controlled luxury insulated packaging to prevent melting.'}
                  </div>
                )}
              </div>

              {/* Care Instructions Accordion */}
              <div className="border border-pink-soft rounded-2xl overflow-hidden">
                <button
                  onClick={() =>
                    setActiveAccordion(activeAccordion === 'care' ? null : 'care')
                  }
                  className="w-full px-4 py-3 bg-cream flex justify-between items-center font-bold text-dark"
                >
                  <span>Care & Storage Instructions</span>
                  {activeAccordion === 'care' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {activeAccordion === 'care' && (
                  <div className="p-4 bg-white text-graytext leading-relaxed">
                    {product.careInstructions || 'Keep refrigerated between 2°C - 4°C. Consume within 48 hours.'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6 pt-10">
            <h2 className="font-serif text-2xl font-bold text-dark">You May Also Love</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
