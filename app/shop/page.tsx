'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { MOCK_PRODUCTS, MOCK_COLLECTIONS } from '@/lib/shopify/mock-data';
import { ProductCard } from '@/components/home/product-card';
import { SlidersHorizontal, X, Search, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialOccasion = searchParams.get('occasion') || 'All';
  const initialQuery = searchParams.get('query') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedOccasion, setSelectedOccasion] = useState<string>(initialOccasion);
  const [selectedFlavor, setSelectedFlavor] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(50000);
  const [minRating, setMinRating] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [sortBy, setSortBy] = useState<string>('popular');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const flavors = ['All', 'Chocolate', 'Vanilla', 'Red Velvet', 'Fruit', 'Blueberry', 'Rose Water'];
  const occasions = ['All', 'Birthday', 'Wedding', 'Anniversary', 'Everyday', 'Graduation'];

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      // Category match
      if (
        selectedCategory !== 'All' &&
        product.category.toLowerCase() !== selectedCategory.toLowerCase()
      ) {
        return false;
      }
      // Occasion match
      if (
        selectedOccasion !== 'All' &&
        product.occasion?.toLowerCase() !== selectedOccasion.toLowerCase()
      ) {
        return false;
      }
      // Flavor match
      if (
        selectedFlavor !== 'All' &&
        product.flavor?.toLowerCase() !== selectedFlavor.toLowerCase()
      ) {
        return false;
      }
      // Price match
      const price = parseFloat(product.priceRange.minVariantPrice.amount);
      if (price > maxPrice) {
        return false;
      }
      // Rating match
      if (product.rating < minRating) {
        return false;
      }
      // Query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = product.title.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesCat = product.category.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesCat) return false;
      }
      return true;
    }).sort((a, b) => {
      const priceA = parseFloat(a.priceRange.minVariantPrice.amount);
      const priceB = parseFloat(b.priceRange.minVariantPrice.amount);
      if (sortBy === 'price_asc') return priceA - priceB;
      if (sortBy === 'price_desc') return priceB - priceA;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.reviewCount - a.reviewCount; // popular default
    });
  }, [selectedCategory, selectedOccasion, selectedFlavor, maxPrice, minRating, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedOccasion('All');
    setSelectedFlavor('All');
    setMaxPrice(50000);
    setMinRating(0);
    setSearchQuery('');
    setSortBy('popular');
  };

  return (
    <div className="min-h-screen bg-cream/30 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-pink-primary block font-sans">
            Freshly Baked Everyday
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-dark">
            Our Bakery Collection
          </h1>
          <p className="text-xs sm:text-sm text-graytext font-sans">
            Explore our artisan range of cakes, bento boxes, brownies & cheesecakes.
          </p>
        </div>

        {/* Top Control Bar: Mobile Filter Button, Search & Sort */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-pink-soft/60 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden w-full md:w-auto flex items-center justify-center gap-2 bg-pink-soft text-pink-primary font-semibold text-xs py-3 px-5 rounded-2xl"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filter Products ({filteredProducts.length})</span>
          </button>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search cakes by name or flavor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-cream border border-pink-rose/50 text-xs font-sans focus:outline-none focus:ring-2 focus:ring-pink-primary text-dark"
            />
            <Search className="w-4 h-4 text-graytext absolute left-3.5 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-graytext hover:text-dark text-xs"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
            <span className="text-xs text-graytext font-sans">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-cream border border-pink-rose/50 text-xs font-semibold text-dark rounded-2xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-primary"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Layout Grid: Sidebar Filters + Product Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block space-y-6 bg-white rounded-3xl p-6 border border-pink-soft/60 shadow-sm h-fit sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-pink-soft">
              <h3 className="font-serif text-lg font-bold text-dark flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-pink-primary" /> Filters
              </h3>
              <button
                onClick={resetFilters}
                className="text-xs text-pink-primary hover:underline flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-dark uppercase tracking-wider block">
                Category
              </label>
              <div className="space-y-1 text-xs font-sans">
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`w-full text-left px-3 py-2 rounded-xl transition-colors ${
                    selectedCategory === 'All'
                      ? 'bg-pink-primary text-white font-bold'
                      : 'text-dark/80 hover:bg-cream'
                  }`}
                >
                  All Categories
                </button>
                {MOCK_COLLECTIONS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.title)}
                    className={`w-full text-left px-3 py-2 rounded-xl transition-colors ${
                      selectedCategory.toLowerCase() === c.title.toLowerCase()
                        ? 'bg-pink-primary text-white font-bold'
                        : 'text-dark/80 hover:bg-cream'
                    }`}
                  >
                    {c.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter Slider */}
            <div className="space-y-2 pt-4 border-t border-pink-soft">
              <div className="flex justify-between items-center text-xs font-bold text-dark">
                <span>Max Price:</span>
                <span className="text-pink-primary">Rs. {maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="2000"
                max="50000"
                step="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-pink-primary cursor-pointer"
              />
            </div>

            {/* Flavor Filter */}
            <div className="space-y-2 pt-4 border-t border-pink-soft">
              <label className="text-xs font-bold text-dark uppercase tracking-wider block">
                Flavor
              </label>
              <div className="flex flex-wrap gap-1.5">
                {flavors.map((f) => (
                  <button
                    key={f}
                    onClick={() => setSelectedFlavor(f)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      selectedFlavor === f
                        ? 'bg-dark text-white shadow-sm'
                        : 'bg-cream text-dark/80 hover:bg-pink-soft'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Occasion Filter */}
            <div className="space-y-2 pt-4 border-t border-pink-soft">
              <label className="text-xs font-bold text-dark uppercase tracking-wider block">
                Occasion
              </label>
              <div className="flex flex-wrap gap-1.5">
                {occasions.map((occ) => (
                  <button
                    key={occ}
                    onClick={() => setSelectedOccasion(occ)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      selectedOccasion === occ
                        ? 'bg-pink-primary text-white shadow-sm'
                        : 'bg-cream text-dark/80 hover:bg-pink-soft'
                    }`}
                  >
                    {occ}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Active Filter Pills */}
            {(selectedCategory !== 'All' ||
              selectedOccasion !== 'All' ||
              selectedFlavor !== 'All' ||
              searchQuery) && (
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-graytext font-medium">Active Filters:</span>
                {selectedCategory !== 'All' && (
                  <span className="bg-pink-soft text-pink-primary px-3 py-1 rounded-full font-semibold flex items-center gap-1">
                    {selectedCategory}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => setSelectedCategory('All')}
                    />
                  </span>
                )}
                {selectedFlavor !== 'All' && (
                  <span className="bg-pink-soft text-pink-primary px-3 py-1 rounded-full font-semibold flex items-center gap-1">
                    Flavor: {selectedFlavor}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => setSelectedFlavor('All')}
                    />
                  </span>
                )}
                {selectedOccasion !== 'All' && (
                  <span className="bg-pink-soft text-pink-primary px-3 py-1 rounded-full font-semibold flex items-center gap-1">
                    Occasion: {selectedOccasion}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => setSelectedOccasion('All')}
                    />
                  </span>
                )}
                <button
                  onClick={resetFilters}
                  className="text-pink-primary font-bold hover:underline ml-2"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Results Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center space-y-4 border border-pink-soft">
                <h3 className="font-serif text-xl font-bold text-dark">No cakes match your filters</h3>
                <p className="text-xs text-graytext max-w-sm mx-auto">
                  Try adjusting your price range, flavor, or search query.
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-pink-primary text-white font-semibold text-xs px-6 py-3 rounded-2xl shadow-soft-pink hover:bg-pink-deep transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream/30 p-10 text-center font-serif">Loading Bakery Shop...</div>}>
      <ShopContent />
    </Suspense>
  );
}
