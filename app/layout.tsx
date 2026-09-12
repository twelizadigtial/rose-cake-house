import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/cart-context';
import { WishlistProvider } from '@/context/wishlist-context';
import { AnnouncementBar } from '@/components/layout/announcement-bar';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { MobileNav } from '@/components/layout/mobile-nav';
import { CartDrawer } from '@/components/cart/cart-drawer';

export const metadata: Metadata = {
  title: 'Rose Cake House | Premium Luxury Artisan Cakes Sri Lanka',
  description:
    'Rose Cake House — Handcrafted luxury artisan cakes, tiered wedding masterworks, custom bento boxes, brownies & cheesecakes. Doorstep delivery across Colombo & Sri Lanka.',
  keywords: [
    'Rose Cake House',
    'Rose Cake House Sri Lanka',
    'Custom Birthday Cakes Colombo',
    'Tiered Wedding Cakes',
    'Bento Cakes Colombo',
    'Luxury Bakery Sri Lanka',
  ],
  openGraph: {
    title: 'Rose Cake House | Premium Luxury Bakery Sri Lanka',
    description: 'Delicious artisan cakes for every celebration. Doorstep delivery across Sri Lanka.',
    images: ['https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1200'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased selection:bg-pink-rose selection:text-pink-primary flex flex-col min-h-screen">
        <CartProvider>
          <WishlistProvider>
            <AnnouncementBar />
            <Navbar />
            <div className="flex-1">{children}</div>
            <Footer />
            <MobileNav />
            <CartDrawer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
