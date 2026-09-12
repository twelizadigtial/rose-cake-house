'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, User, Heart, ShoppingBag, ChevronDown, Cake, Menu, X } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { useWishlist } from '@/context/wishlist-context';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const pathname = usePathname();
  const { setIsOpen: setCartOpen, totalItems } = useCart();
  const { wishlistCount } = useWishlist();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMegaMenu, setActiveMegaMenu] = useState<'cakes' | 'occasions' | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cakeCategories = [
    { name: 'Birthday Cakes', href: '/shop?category=Birthday Cakes', desc: 'Festive layer cakes with custom toppers' },
    { name: 'Wedding Cakes', href: '/shop?category=Wedding Cakes', desc: 'Tiered elegance for unforgettable receptions' },
    { name: 'Anniversary Cakes', href: '/shop?category=Anniversary Cakes', desc: 'Romantic floral and gold leaf creations' },
    { name: 'Photo Cakes', href: '/shop?category=Photo Cakes', desc: 'Edible high-def photo prints' },
    { name: 'Bento Cakes', href: '/shop?category=Bento Cakes', desc: 'Korean minimalist lunchbox surprises' },
    { name: 'Cheesecakes', href: '/shop?category=Cheesecakes', desc: 'Baked New York style with wild berries' },
  ];

  const occasions = [
    { name: 'Birthdays', href: '/shop?occasion=Birthday' },
    { name: 'Weddings', href: '/shop?occasion=Wedding' },
    { name: 'Anniversaries', href: '/shop?occasion=Anniversary' },
    { name: 'Baby Showers', href: '/shop?occasion=Baby Shower' },
    { name: 'Graduation', href: '/shop?occasion=Graduation' },
    { name: 'Corporate Events', href: '/shop?occasion=Corporate' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      <nav
        className={`w-full bg-white/95 backdrop-blur-md transition-shadow duration-300 border-b border-pink-soft/40 ${
          scrolled ? 'shadow-luxury py-3' : 'py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-dark p-2 hover:text-pink-primary"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Brand Logo: Rose Cake House */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-primary to-pink-rose flex items-center justify-center text-white shadow-soft-pink group-hover:scale-105 transition-transform">
              <Cake className="w-6 h-6" />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-dark block leading-none">
                Rose <span className="text-pink-primary italic">Cake House</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase text-graytext block font-sans">
                Luxury Artisan Bakery
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Menu */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              href="/"
              className={`font-sans text-sm font-medium transition-colors hover:text-pink-primary ${
                pathname === '/' ? 'text-pink-primary font-semibold' : 'text-dark/80'
              }`}
            >
              Home
            </Link>

            <Link
              href="/shop"
              className={`font-sans text-sm font-medium transition-colors hover:text-pink-primary ${
                pathname === '/shop' ? 'text-pink-primary font-semibold' : 'text-dark/80'
              }`}
            >
              Shop
            </Link>

            {/* Cakes Mega Menu Trigger */}
            <div
              className="relative"
              onMouseEnter={() => setActiveMegaMenu('cakes')}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <button className="flex items-center gap-1 font-sans text-sm font-medium text-dark/80 hover:text-pink-primary py-2">
                <span>Cakes</span>
                <ChevronDown className="w-4 h-4 text-graytext" />
              </button>

              <AnimatePresence>
                {activeMegaMenu === 'cakes' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full -left-20 w-[540px] bg-white rounded-3xl shadow-luxury border border-pink-soft/50 p-6 grid grid-cols-2 gap-4 z-50"
                  >
                    {cakeCategories.map((cat) => (
                      <Link
                        key={cat.name}
                        href={cat.href}
                        className="p-3 rounded-2xl hover:bg-cream transition-colors group"
                      >
                        <div className="font-serif text-sm font-semibold text-dark group-hover:text-pink-primary transition-colors">
                          {cat.name}
                        </div>
                        <div className="text-xs text-graytext mt-0.5">{cat.desc}</div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Occasions Mega Menu Trigger */}
            <div
              className="relative"
              onMouseEnter={() => setActiveMegaMenu('occasions')}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <button className="flex items-center gap-1 font-sans text-sm font-medium text-dark/80 hover:text-pink-primary py-2">
                <span>Occasions</span>
                <ChevronDown className="w-4 h-4 text-graytext" />
              </button>

              <AnimatePresence>
                {activeMegaMenu === 'occasions' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 w-64 bg-white rounded-3xl shadow-luxury border border-pink-soft/50 p-4 z-50 flex flex-col gap-1"
                  >
                    {occasions.map((occ) => (
                      <Link
                        key={occ.name}
                        href={occ.href}
                        className="px-4 py-2.5 rounded-xl font-sans text-sm font-medium text-dark/80 hover:bg-pink-soft/40 hover:text-pink-primary transition-colors"
                      >
                        {occ.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/custom-cake"
              className={`font-sans text-sm font-semibold transition-colors px-3 py-1.5 rounded-full bg-pink-soft text-pink-primary hover:bg-pink-primary hover:text-white ${
                pathname === '/custom-cake' ? 'bg-pink-primary text-white' : ''
              }`}
            >
              Custom Cakes
            </Link>

            <Link
              href="/about"
              className="font-sans text-sm font-medium text-dark/80 hover:text-pink-primary transition-colors"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="font-sans text-sm font-medium text-dark/80 hover:text-pink-primary transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="p-2 text-dark hover:text-pink-primary transition-colors rounded-full hover:bg-pink-soft/40"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account Icon */}
            <Link
              href="/checkout"
              className="hidden sm:flex p-2 text-dark hover:text-pink-primary transition-colors rounded-full hover:bg-pink-soft/40"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-2 text-dark hover:text-pink-primary transition-colors rounded-full hover:bg-pink-soft/40"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-pink-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Cart Drawer Trigger */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2.5 bg-gradient-to-r from-pink-primary to-pink-deep text-white rounded-full shadow-soft-pink hover:scale-105 transition-transform"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-dark text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-pink-soft px-6 py-6 space-y-4 shadow-luxury"
          >
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-sans text-base font-semibold text-dark hover:text-pink-primary"
            >
              Home
            </Link>
            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-sans text-base font-semibold text-dark hover:text-pink-primary"
            >
              Shop All Cakes
            </Link>
            <Link
              href="/custom-cake"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-sans text-base font-semibold text-pink-primary"
            >
              ✨ Custom Cake Studio
            </Link>
            <Link
              href="/wishlist"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-sans text-base font-semibold text-dark hover:text-pink-primary"
            >
              Wishlist ({wishlistCount})
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-sans text-base font-medium text-graytext"
            >
              Our Story
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-sans text-base font-medium text-graytext"
            >
              Contact & Support
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <AnimatePresence>
        {searchModalOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-dark/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 w-full max-w-xl shadow-2xl relative border border-pink-soft"
            >
              <button
                onClick={() => setSearchModalOpen(false)}
                className="absolute top-5 right-5 text-graytext hover:text-dark p-2"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="font-serif text-2xl font-bold text-dark mb-4">Search Rose Cake House</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    window.location.href = `/shop?query=${encodeURIComponent(searchQuery)}`;
                    setSearchModalOpen(false);
                  }
                }}
                className="relative"
              >
                <input
                  type="text"
                  placeholder="e.g. Red Velvet, Bento, Wedding..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-cream border border-pink-rose/50 focus:outline-none focus:ring-2 focus:ring-pink-primary text-dark font-sans text-sm"
                />
                <Search className="w-5 h-5 text-graytext absolute left-4 top-1/2 -translate-y-1/2" />
                <button
                  type="submit"
                  className="mt-4 w-full bg-pink-primary text-white font-sans text-sm font-semibold py-3 rounded-2xl shadow-soft-pink hover:bg-pink-deep transition-colors"
                >
                  Search Bakery Store
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
