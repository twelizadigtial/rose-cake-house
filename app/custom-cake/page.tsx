'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/cart-context';
import { CustomCakeConfig, Product } from '@/lib/shopify/types';
import {
  Sparkles,
  Palette,
  Upload,
  Calendar,
  MessageCircle,
  ShoppingBag,
  CheckCircle2,
  Check,
  MapPin,
  Clock,
  Layers,
  Award,
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';

export default function CustomCakeBuilderPage() {
  const { addToCart } = useCart();

  // Customization State
  const [shape, setShape] = useState<'Round' | 'Heart' | 'Square'>('Round');
  const [size, setSize] = useState<string>('1kg (8-10 Slices)');
  const [cakeType, setCakeType] = useState<string>('Tiered Celebration Cake');
  const [flavor, setFlavor] = useState<string>('Rich Dark Chocolate Ganache');
  const [frostingType, setFrostingType] = useState<string>('Silky Swiss Buttercream');
  const [fillingLayer, setFillingLayer] = useState<string>('Fresh Strawberry Compote');
  const [designTheme, setDesignTheme] = useState<string>('Floral Elegance');
  const [frostingColor, setFrostingColor] = useState<string>('#F857A6');
  const [selectedDecorations, setSelectedDecorations] = useState<string[]>([
    'Handcrafted Sugar Roses',
    'Edible 24K Gold Leaf',
  ]);
  const [message, setMessage] = useState<string>('Happy Birthday Sarah!');
  const [photoName, setPhotoName] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [fulfillmentType, setFulfillmentType] = useState<'delivery' | 'pickup'>('delivery');
  const [deliveryDate, setDeliveryDate] = useState<string>(
    new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]
  );
  const [timeWindow, setTimeWindow] = useState<string>('Afternoon (12 PM - 4 PM)');
  const [orderAdded, setOrderAdded] = useState(false);

  // Options Data
  const shapes: ('Round' | 'Heart' | 'Square')[] = ['Round', 'Heart', 'Square'];

  const sizes = [
    { label: '500g (4-6 Slices)', basePrice: 3800, tiers: 1, scale: 0.8 },
    { label: '1kg (8-10 Slices)', basePrice: 5800, tiers: 1, scale: 1.0 },
    { label: '2kg (16-20 Slices)', basePrice: 10500, tiers: 2, scale: 1.15 },
    { label: '3kg (25-30 Slices)', basePrice: 15500, tiers: 2, scale: 1.3 },
    { label: '5kg Grand Tier (45+ Slices)', basePrice: 26000, tiers: 3, scale: 1.45 },
  ];

  const cakeTypes = [
    { title: 'Tiered Celebration Cake', priceAdd: 0, desc: 'Classic multi-layer stacked perfection' },
    { title: 'Fondant Sculpted Art', priceAdd: 1200, desc: '3D smooth fondant wrapped canvas' },
    { title: 'Minimalist Korean Bento', priceAdd: -1000, desc: 'Compact aesthetic lunchbox surprise' },
    { title: 'Classic Dripping Glaze', priceAdd: 500, desc: 'Silky ganache dripping effect' },
    { title: 'Rustic Naked Floral', priceAdd: 300, desc: 'Exposed sponge with organic rose petals' },
  ];

  const flavors = [
    'Rich Dark Chocolate Ganache',
    'Madagascar Bourbon Vanilla',
    'Velvet Crimson Red Velvet',
    'Fresh Strawberry Bliss',
    'Caramel Butterscotch Crunch',
    'Wild Blueberry Mousse',
    'Earl Grey Lavender Tea',
  ];

  const frostingTypes = [
    'Silky Swiss Buttercream',
    'Whipped Fresh Vanilla Cream',
    'Philadelphia Cream Cheese',
    'Belgian Chocolate Ganache',
    'Smooth Fondant Wrap',
  ];

  const fillingLayers = [
    { name: 'Fresh Strawberry Compote', color: '#E11D48' },
    { name: 'Salted Caramel Drizzle', color: '#D97706' },
    { name: 'Nutella Hazelnut Praline', color: '#451A03' },
    { name: 'Passionfruit Curd', color: '#F59E0B' },
    { name: 'Belgian Dark Chocolate Ganache', color: '#27120A' },
    { name: 'No Extra Filling', color: 'transparent' },
  ];

  const designThemes = [
    'Floral Elegance',
    'Vintage Buttercream Piping',
    'Birthday Extravaganza',
    'Minimalist Modern',
    'Baby Shower Pastels',
    '24K Luxury Gold Leaf',
  ];

  const frostingSwatches = [
    { name: 'Rose Pink', color: '#F857A6' },
    { name: 'Soft Cream', color: '#FFF9FB' },
    { name: 'Blush Pink', color: '#FDE8F2' },
    { name: 'Royal Gold', color: '#D4AF37' },
    { name: 'Lavender', color: '#C084FC' },
    { name: 'Sky Blue', color: '#60A5FA' },
    { name: 'Sage Green', color: '#34D399' },
    { name: 'Velvet Red', color: '#DC2626' },
  ];

  const decorationOptions = [
    { name: 'Handcrafted Sugar Roses', price: 950 },
    { name: 'Edible 24K Gold Leaf', price: 800 },
    { name: 'Fresh Macarons (4 Pcs)', price: 950 },
    { name: 'Chocolate Truffle Balls', price: 750 },
    { name: 'Fresh Organic Berries', price: 850 },
    { name: 'Custom Sparkler Candles', price: 350 },
  ];

  // Dynamic Tier & Filling Details for Realistic Canvas
  const activeSizeObj = sizes.find((s) => s.label === size) || sizes[1];
  const activeFillingObj = fillingLayers.find((f) => f.name === fillingLayer) || fillingLayers[0];

  // Dynamic Price Calculation (LKR)
  const unitPrice = useMemo(() => {
    let price = activeSizeObj.basePrice;

    const typeObj = cakeTypes.find((t) => t.title === cakeType);
    if (typeObj) price += typeObj.priceAdd;

    if (flavor.includes('Red Velvet') || flavor.includes('Blueberry')) price += 600;
    if (frostingType.includes('Fondant') || frostingType.includes('Ganache')) price += 700;

    const decorTotal = selectedDecorations.reduce((acc, name) => {
      const found = decorationOptions.find((d) => d.name === name);
      return acc + (found ? found.price : 0);
    }, 0);

    if (photoName) price += 750;

    return Math.max(2800, price + decorTotal);
  }, [activeSizeObj, cakeType, flavor, frostingType, selectedDecorations, photoName]);

  const totalPrice = unitPrice * quantity;

  const toggleDecoration = (name: string) => {
    setSelectedDecorations((prev) =>
      prev.includes(name) ? prev.filter((d) => d !== name) : [...prev, name]
    );
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoName(e.target.files[0].name);
    }
  };

  const handleAddToCart = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
    });

    const customConfig: CustomCakeConfig = {
      shape,
      size: size as any,
      flavor: flavor as any,
      frostingColor,
      decorations: selectedDecorations,
      message,
      deliveryDate,
      estimatedPrice: unitPrice,
      photoUrl: photoName ? `/uploads/${photoName}` : undefined,
    };

    const mockProduct: Product = {
      id: `custom-rose-cake-${Date.now()}`,
      handle: `custom-rose-cake`,
      title: `Bespoke ${shape} ${cakeType} (${size})`,
      description: `Custom ${designTheme} cake with ${flavor}, ${frostingType}, and ${selectedDecorations.join(', ')}.`,
      category: 'Custom Cakes',
      flavor,
      rating: 5.0,
      reviewCount: 1,
      priceRange: {
        minVariantPrice: { amount: unitPrice.toString(), currencyCode: 'LKR' },
      },
      images: [
        {
          url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop',
          altText: 'Custom Rose Cake House Creation',
        },
      ],
      variants: [
        {
          id: `custom-v-${size}`,
          title: `${size} Bespoke`,
          price: { amount: unitPrice.toString(), currencyCode: 'LKR' },
          availableForSale: true,
          selectedOptions: [{ name: 'Size', value: size }],
        },
      ],
    };

    addToCart(mockProduct, mockProduct.variants[0], quantity, {
      customMessage: message,
      deliveryDate: `${deliveryDate} (${fulfillmentType === 'delivery' ? 'Delivery' : 'Store Pickup'})`,
      customCakeConfig: customConfig,
    });

    setOrderAdded(true);
    setTimeout(() => setOrderAdded(false), 3000);
  };

  return (
    <div className="min-h-screen bg-cream/30 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-soft text-pink-primary text-xs font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Interactive Real-Time Cake Visualizer</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-dark">
            Rose Cake House Studio
          </h1>
          <p className="text-xs sm:text-sm text-graytext font-sans">
            Customize your cake size, tiers, flavors, frosting, toppings & theme. See your 3D structure update live on the canvas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Customization Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Shape & Size / Tiers */}
            <div className="bg-white rounded-4xl p-6 sm:p-8 border border-pink-soft/60 shadow-luxury space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-pink-soft">
                <span className="w-7 h-7 rounded-full bg-pink-primary text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h3 className="font-serif text-lg font-bold text-dark">
                  Select Shape & Size / Tiers
                </h3>
              </div>

              {/* Shape Pills */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-dark uppercase tracking-wider block">Cake Shape:</label>
                <div className="grid grid-cols-3 gap-3">
                  {shapes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setShape(s)}
                      className={`py-3 px-4 rounded-2xl text-xs font-bold transition-all border ${
                        shape === s
                          ? 'bg-pink-primary text-white border-pink-primary shadow-soft-pink'
                          : 'bg-cream border-pink-rose/50 text-dark hover:bg-pink-soft'
                      }`}
                    >
                      {s === 'Round' ? '🔴 Round' : s === 'Heart' ? '❤️ Heart' : '⬛ Square'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-dark uppercase tracking-wider block">Weight & Number of Tiers:</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {sizes.map((s) => (
                    <button
                      key={s.label}
                      onClick={() => setSize(s.label)}
                      className={`p-4 rounded-2xl text-left border transition-all ${
                        size === s.label
                          ? 'bg-pink-soft/60 border-pink-primary text-dark font-semibold shadow-sm'
                          : 'bg-cream border-pink-rose/50 text-graytext hover:bg-white'
                      }`}
                    >
                      <div className="text-xs font-bold text-dark">{s.label}</div>
                      <div className="text-[11px] text-pink-primary font-semibold mt-1">
                        {s.tiers} Tier{s.tiers > 1 ? 's' : ''} • From {formatPrice(s.basePrice)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 2: Cake Structure Type */}
            <div className="bg-white rounded-4xl p-6 sm:p-8 border border-pink-soft/60 shadow-luxury space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-pink-soft">
                <span className="w-7 h-7 rounded-full bg-pink-primary text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h3 className="font-serif text-lg font-bold text-dark">
                  Choose Cake Structure & Style
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {cakeTypes.map((t) => (
                  <button
                    key={t.title}
                    onClick={() => setCakeType(t.title)}
                    className={`p-4 rounded-2xl text-left border transition-all ${
                      cakeType === t.title
                        ? 'bg-pink-soft/60 border-pink-primary text-dark font-semibold shadow-sm'
                        : 'bg-cream border-pink-rose/50 text-graytext hover:bg-white'
                    }`}
                  >
                    <div className="text-xs font-bold text-dark">{t.title}</div>
                    <div className="text-[11px] text-graytext mt-0.5">{t.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Sponge Batter & Flavor */}
            <div className="bg-white rounded-4xl p-6 sm:p-8 border border-pink-soft/60 shadow-luxury space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-pink-soft">
                <span className="w-7 h-7 rounded-full bg-pink-primary text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h3 className="font-serif text-lg font-bold text-dark">
                  Select Sponge Batter & Flavor
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {flavors.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFlavor(f)}
                    className={`px-4 py-2.5 rounded-full text-xs font-semibold transition-all border ${
                      flavor === f
                        ? 'bg-dark text-white border-dark shadow-sm'
                        : 'bg-cream border-pink-rose/50 text-dark hover:bg-pink-soft'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Cream, Frosting & Filling Ribbon */}
            <div className="bg-white rounded-4xl p-6 sm:p-8 border border-pink-soft/60 shadow-luxury space-y-6">
              <div className="flex items-center gap-2 pb-3 border-b border-pink-soft">
                <span className="w-7 h-7 rounded-full bg-pink-primary text-white text-xs font-bold flex items-center justify-center">
                  4
                </span>
                <h3 className="font-serif text-lg font-bold text-dark">
                  Cream, Frosting & Interlayer Filling Ribbon
                </h3>
              </div>

              {/* Frosting Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-dark uppercase tracking-wider block">
                  Outer Frosting Type:
                </label>
                <div className="flex flex-wrap gap-2">
                  {frostingTypes.map((fr) => (
                    <button
                      key={fr}
                      onClick={() => setFrostingType(fr)}
                      className={`px-3.5 py-2 rounded-2xl text-xs font-semibold border transition-all ${
                        frostingType === fr
                          ? 'bg-pink-primary text-white border-pink-primary shadow-sm'
                          : 'bg-cream border-pink-rose/50 text-dark hover:bg-pink-soft'
                      }`}
                    >
                      {fr}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filling Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-dark uppercase tracking-wider block">
                  Inner Interlayer Filling Ribbon:
                </label>
                <div className="flex flex-wrap gap-2">
                  {fillingLayers.map((fil) => (
                    <button
                      key={fil.name}
                      onClick={() => setFillingLayer(fil.name)}
                      className={`px-3.5 py-2 rounded-2xl text-xs font-semibold border transition-all ${
                        fillingLayer === fil.name
                          ? 'bg-dark text-white border-dark shadow-sm'
                          : 'bg-cream border-pink-rose/50 text-dark hover:bg-pink-soft'
                      }`}
                    >
                      {fil.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 5: Design Theme & Color Swatches */}
            <div className="bg-white rounded-4xl p-6 sm:p-8 border border-pink-soft/60 shadow-luxury space-y-6">
              <div className="flex items-center gap-2 pb-3 border-b border-pink-soft">
                <span className="w-7 h-7 rounded-full bg-pink-primary text-white text-xs font-bold flex items-center justify-center">
                  5
                </span>
                <h3 className="font-serif text-lg font-bold text-dark">
                  Design Theme & Frosting Color Palette
                </h3>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-dark uppercase tracking-wider block">
                  Design Aesthetic / Theme:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {designThemes.map((th) => (
                    <button
                      key={th}
                      onClick={() => setDesignTheme(th)}
                      className={`p-3 rounded-2xl text-xs font-bold border transition-all ${
                        designTheme === th
                          ? 'bg-pink-soft border-pink-primary text-pink-primary shadow-sm'
                          : 'bg-cream border-pink-rose/50 text-dark hover:bg-pink-soft'
                      }`}
                    >
                      {th}
                    </button>
                  ))}
                </div>
              </div>

              {/* Swatches */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-dark uppercase tracking-wider block">
                  Frosting Color Swatch:
                </label>
                <div className="flex flex-wrap gap-3">
                  {frostingSwatches.map((swatch) => (
                    <button
                      key={swatch.name}
                      onClick={() => setFrostingColor(swatch.color)}
                      style={{ backgroundColor: swatch.color }}
                      className={`w-9 h-9 rounded-full border-2 transition-transform shadow-sm flex items-center justify-center ${
                        frostingColor === swatch.color
                          ? 'border-dark scale-110 shadow-md'
                          : 'border-white hover:scale-105'
                      }`}
                      title={swatch.name}
                    >
                      {frostingColor === swatch.color && (
                        <Check className="w-4 h-4 text-dark font-bold" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 6: Toppings & Handwritten Message */}
            <div className="bg-white rounded-4xl p-6 sm:p-8 border border-pink-soft/60 shadow-luxury space-y-6">
              <div className="flex items-center gap-2 pb-3 border-b border-pink-soft">
                <span className="w-7 h-7 rounded-full bg-pink-primary text-white text-xs font-bold flex items-center justify-center">
                  6
                </span>
                <h3 className="font-serif text-lg font-bold text-dark">
                  Toppings, Message & Reference Photo
                </h3>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-dark uppercase tracking-wider block">
                  Toppings & Cake Decor:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {decorationOptions.map((option) => {
                    const isChecked = selectedDecorations.includes(option.name);
                    return (
                      <div
                        key={option.name}
                        onClick={() => toggleDecoration(option.name)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between text-xs ${
                          isChecked
                            ? 'bg-pink-soft/60 border-pink-primary text-dark font-semibold'
                            : 'bg-cream border-pink-rose/50 text-graytext hover:bg-white'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                            className="accent-pink-primary w-4 h-4"
                          />
                          {option.name}
                        </span>
                        <span className="font-bold text-pink-primary">+Rs. {option.price}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Custom Message */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-dark uppercase tracking-wider flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4 text-pink-primary" />
                  <span>Handwritten Message on Cake:</span>
                </label>
                <input
                  type="text"
                  maxLength={40}
                  placeholder="e.g. Happy Birthday Sarah! ❤️"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-cream border border-pink-rose/50 text-xs font-sans focus:outline-none focus:ring-2 focus:ring-pink-primary text-dark"
                />
              </div>

              {/* Photo Upload */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-dark uppercase tracking-wider flex items-center gap-1.5">
                  <Upload className="w-4 h-4 text-pink-primary" />
                  <span>Upload Reference Image (+Rs. 750):</span>
                </label>
                <label className="w-full px-4 py-3 rounded-2xl bg-cream border border-pink-rose/50 text-xs font-sans text-graytext flex items-center justify-between cursor-pointer hover:bg-pink-soft">
                  <span className="truncate">{photoName || 'Choose image from device...'}</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                </label>
              </div>
            </div>

            {/* Step 7: Fulfillment & Schedule */}
            <div className="bg-white rounded-4xl p-6 sm:p-8 border border-pink-soft/60 shadow-luxury space-y-6">
              <div className="flex items-center gap-2 pb-3 border-b border-pink-soft">
                <span className="w-7 h-7 rounded-full bg-pink-primary text-white text-xs font-bold flex items-center justify-center">
                  7
                </span>
                <h3 className="font-serif text-lg font-bold text-dark">
                  Delivery / Pickup & Schedule
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setFulfillmentType('delivery')}
                  className={`p-3.5 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    fulfillmentType === 'delivery'
                      ? 'bg-pink-primary text-white border-pink-primary shadow-soft-pink'
                      : 'bg-cream border-pink-rose/50 text-dark hover:bg-pink-soft'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span>Colombo Delivery</span>
                </button>

                <button
                  onClick={() => setFulfillmentType('pickup')}
                  className={`p-3.5 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    fulfillmentType === 'pickup'
                      ? 'bg-pink-primary text-white border-pink-primary shadow-soft-pink'
                      : 'bg-cream border-pink-rose/50 text-dark hover:bg-pink-soft'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Store Pickup</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-dark uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-pink-primary" />
                    <span>Select Date:</span>
                  </label>
                  <input
                    type="date"
                    value={deliveryDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-cream border border-pink-rose/50 text-xs font-sans text-dark focus:outline-none focus:ring-2 focus:ring-pink-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-dark uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-pink-primary" />
                    <span>Time Window:</span>
                  </label>
                  <select
                    value={timeWindow}
                    onChange={(e) => setTimeWindow(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-cream border border-pink-rose/50 text-xs font-sans font-semibold text-dark focus:outline-none focus:ring-2 focus:ring-pink-primary"
                  >
                    <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                    <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                    <option value="Evening (4 PM - 7 PM)">Evening (4 PM - 7 PM)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: REALISTIC DYNAMIC LIVE CAKE CANVAS (5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <div className="bg-white rounded-4xl p-6 sm:p-8 border border-pink-soft/60 shadow-luxury space-y-6 flex flex-col items-center">
              <div className="w-full flex items-center justify-between pb-2 border-b border-pink-soft">
                <h3 className="font-serif text-lg font-bold text-dark flex items-center gap-2">
                  <Palette className="w-5 h-5 text-pink-primary" /> Live Cake Structure Canvas
                </h3>
                <span className="text-[10px] bg-pink-soft text-pink-primary px-2.5 py-1 rounded-full font-bold uppercase">
                  {shape} • {activeSizeObj.tiers} Tier{activeSizeObj.tiers > 1 ? 's' : ''}
                </span>
              </div>

              {/* Realistic 3D Multi-Tiered Dynamic SVG Cake Canvas */}
              <div className="relative w-full h-80 sm:h-96 rounded-3xl bg-gradient-to-b from-cream via-pink-soft/30 to-white border border-pink-rose/40 flex items-center justify-center p-6 shadow-inner overflow-hidden">
                {/* Plate Base */}
                <div className="absolute bottom-6 w-64 sm:w-72 h-8 bg-slate-200 rounded-full shadow-lg border-b-4 border-slate-300 flex items-center justify-center">
                  <div className="w-56 sm:w-64 h-3 bg-white/70 rounded-full" />
                </div>

                {/* Cake Tier Stack Container */}
                <motion.div
                  layout
                  className="relative flex flex-col items-center justify-end pb-8 h-full z-10"
                >
                  {/* Tier 3 (Top Tier - rendered if 3 tiers) */}
                  {activeSizeObj.tiers >= 3 && (
                    <motion.div
                      key={`t3-${shape}-${frostingColor}`}
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      style={{ backgroundColor: frostingColor }}
                      className={`relative w-28 h-16 shadow-md border-2 border-white flex items-center justify-center ${
                        shape === 'Round' ? 'rounded-t-3xl' : shape === 'Heart' ? 'rounded-t-2xl' : 'rounded-t-xl'
                      }`}
                    >
                      {/* Inner Filling Ribbon Line */}
                      {activeFillingObj.color !== 'transparent' && (
                        <div
                          className="w-full h-2 absolute top-7 left-0 opacity-90"
                          style={{ backgroundColor: activeFillingObj.color }}
                        />
                      )}
                    </motion.div>
                  )}

                  {/* Tier 2 (Middle Tier - rendered if 2 or 3 tiers) */}
                  {activeSizeObj.tiers >= 2 && (
                    <motion.div
                      key={`t2-${shape}-${frostingColor}`}
                      initial={{ y: -15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      style={{ backgroundColor: frostingColor }}
                      className={`relative w-40 h-20 shadow-lg border-2 border-white -mt-1 flex items-center justify-center ${
                        shape === 'Round' ? 'rounded-t-3xl' : shape === 'Heart' ? 'rounded-t-2xl' : 'rounded-t-xl'
                      }`}
                    >
                      {/* Inner Filling Ribbon Line */}
                      {activeFillingObj.color !== 'transparent' && (
                        <div
                          className="w-full h-2.5 absolute top-9 left-0 opacity-90"
                          style={{ backgroundColor: activeFillingObj.color }}
                        />
                      )}

                      {/* Cake Drip Glaze Effect */}
                      {cakeType === 'Classic Dripping Glaze' && (
                        <svg className="absolute -top-1 left-0 w-full h-6 text-pink-primary opacity-80" viewBox="0 0 100 20" preserveAspectRatio="none">
                          <path d="M0,0 Q10,18 20,0 Q30,15 40,0 Q50,18 60,0 Q70,12 80,0 Q90,16 100,0 V0 H0 Z" fill="currentColor" />
                        </svg>
                      )}
                    </motion.div>
                  )}

                  {/* Tier 1 (Base Tier - always rendered) */}
                  <motion.div
                    key={`t1-${shape}-${frostingColor}`}
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    style={{ backgroundColor: frostingColor }}
                    className={`relative shadow-2xl border-4 border-white flex flex-col items-center justify-center transition-all ${
                      activeSizeObj.tiers === 1 ? 'w-52 h-32 rounded-t-4xl' : 'w-52 h-24 rounded-t-3xl -mt-1'
                    }`}
                  >
                    {/* Inner Filling Ribbon Line */}
                    {activeFillingObj.color !== 'transparent' && (
                      <div
                        className="w-full h-3 absolute top-1/2 -translate-y-1/2 left-0 opacity-90 shadow-sm"
                        style={{ backgroundColor: activeFillingObj.color }}
                      />
                    )}

                    {/* Vintage Piping Effect */}
                    {designTheme === 'Vintage Buttercream Piping' && (
                      <div className="w-full h-4 absolute top-1 left-0 border-t-4 border-b-4 border-dashed border-white/60" />
                    )}

                    {/* Cake Drip Glaze Effect */}
                    {cakeType === 'Classic Dripping Glaze' && activeSizeObj.tiers === 1 && (
                      <svg className="absolute -top-1 left-0 w-full h-8 text-pink-primary opacity-85" viewBox="0 0 100 20" preserveAspectRatio="none">
                        <path d="M0,0 Q10,18 20,0 Q30,15 40,0 Q50,18 60,0 Q70,12 80,0 Q90,16 100,0 V0 H0 Z" fill="currentColor" />
                      </svg>
                    )}

                    {/* Handwritten Message Banner Overlay */}
                    {message && (
                      <span className="font-serif text-xs font-bold text-dark bg-white/90 px-3 py-1 rounded-full shadow-md text-center max-w-[150px] truncate z-20 border border-pink-soft">
                        {message}
                      </span>
                    )}
                  </motion.div>

                  {/* Floating Dynamic Toppings Overlay */}
                  <div className="absolute top-2 inset-x-0 flex justify-center items-center gap-2 pointer-events-none z-30">
                    {selectedDecorations.includes('Edible 24K Gold Leaf') && (
                      <span className="text-amber-400 font-bold text-xs bg-dark/80 text-amber-300 px-2 py-0.5 rounded-full shadow animate-pulse">
                        ✨ 24K Gold
                      </span>
                    )}
                    {selectedDecorations.includes('Handcrafted Sugar Roses') && (
                      <span className="text-pink-primary font-bold text-xs bg-white/90 px-2 py-0.5 rounded-full shadow border border-pink-soft">
                        🌹 Sugar Roses
                      </span>
                    )}
                    {selectedDecorations.includes('Fresh Macarons (4 Pcs)') && (
                      <span className="text-purple-600 font-bold text-xs bg-white/90 px-2 py-0.5 rounded-full shadow border border-pink-soft">
                        🧁 Macarons
                      </span>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Real-time Dynamic Specification Summary Box */}
              <div className="w-full bg-pink-soft/50 rounded-2xl p-4 text-center border border-pink-primary/30 space-y-1">
                <span className="text-xs text-graytext uppercase font-semibold">Estimated Unit Price</span>
                <div className="font-sans text-3xl font-bold text-pink-primary">
                  {formatPrice(unitPrice)}
                </div>
                <span className="text-[11px] text-graytext block">Rose Cake House • Handcrafted fresh in Colombo</span>
              </div>

              {/* Quantity Selector */}
              <div className="w-full flex items-center justify-between pt-2 border-t border-pink-soft">
                <span className="text-xs font-bold text-dark">Quantity:</span>
                <div className="flex items-center gap-3 bg-cream px-3 py-1.5 rounded-2xl border border-pink-rose/50">
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
              </div>

              {/* Live Specifications Breakdown */}
              <div className="w-full text-xs space-y-1.5 text-graytext pt-3 border-t border-pink-soft">
                <div className="flex justify-between">
                  <span>Structure & Shape:</span>
                  <span className="font-semibold text-dark truncate max-w-[170px]">{shape} • {size}</span>
                </div>
                <div className="flex justify-between">
                  <span>Batter & Filling:</span>
                  <span className="font-semibold text-dark truncate max-w-[170px]">{flavor}</span>
                </div>
                <div className="flex justify-between">
                  <span>Filling Ribbon:</span>
                  <span className="font-semibold text-dark truncate max-w-[170px]">{fillingLayer}</span>
                </div>
                <div className="flex justify-between">
                  <span>Theme & Toppings:</span>
                  <span className="font-semibold text-pink-primary truncate max-w-[170px]">
                    {designTheme} ({selectedDecorations.length})
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-dark pt-2 border-t border-pink-soft">
                  <span>Total Price ({quantity} Cake{quantity > 1 ? 's' : ''}):</span>
                  <span className="text-pink-primary">{formatPrice(totalPrice)}</span>
                </div>
              </div>

              {/* Add to Bag CTA */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-pink-primary to-pink-deep text-white font-sans text-sm font-bold py-4 rounded-2xl shadow-soft-pink hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
              >
                {orderAdded ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Added Custom Cake to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>Add Custom Cake to Bag • {formatPrice(totalPrice)}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
