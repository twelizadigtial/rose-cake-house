import { Product, Collection } from './types';

export const MOCK_COLLECTIONS: Collection[] = [
  {
    id: 'col-1',
    handle: 'birthday-cakes',
    title: 'Birthday Cakes',
    description: 'Festive layer cakes decorated with handcrafted sugar roses and 24k gold leaf.',
    image: {
      url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop',
      altText: 'Rose Cake House Birthday Cakes'
    }
  },
  {
    id: 'col-2',
    handle: 'wedding-cakes',
    title: 'Wedding Cakes',
    description: 'Tiered elegance created for unforgettable wedding receptions in Sri Lanka.',
    image: {
      url: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?q=80&w=800&auto=format&fit=crop',
      altText: 'Rose Cake House Tiered Wedding Cakes'
    }
  },
  {
    id: 'col-3',
    handle: 'anniversary-cakes',
    title: 'Anniversary Cakes',
    description: 'Romantic and sophisticated creations crafted with organic cocoa and floral essence.',
    image: {
      url: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=800&auto=format&fit=crop',
      altText: 'Rose Cake House Anniversary Cakes'
    }
  },
  {
    id: 'col-4',
    handle: 'photo-cakes',
    title: 'Photo Cakes',
    description: 'Personalized edible print cakes with vivid food colors and velvet frosting.',
    image: {
      url: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=800&auto=format&fit=crop',
      altText: 'Rose Cake House Custom Photo Cakes'
    }
  },
  {
    id: 'col-5',
    handle: 'cupcakes',
    title: 'Cupcakes',
    description: 'Bite-sized luxury crowned with silky buttercream and gold dust.',
    image: {
      url: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?q=80&w=800&auto=format&fit=crop',
      altText: 'Rose Cake House Cupcakes'
    }
  },
  {
    id: 'col-6',
    handle: 'bento-cakes',
    title: 'Bento Cakes',
    description: 'Cute Korean-style minimalist lunchbox cakes ideal for intimate moments.',
    image: {
      url: 'https://images.unsplash.com/photo-1562440499-64c9a111f713?q=80&w=800&auto=format&fit=crop',
      altText: 'Rose Cake House Bento Cakes'
    }
  },
  {
    id: 'col-7',
    handle: 'brownies',
    title: 'Brownies',
    description: 'Fudgy Belgian dark chocolate slabs with caramelized walnuts.',
    image: {
      url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800&auto=format&fit=crop',
      altText: 'Rose Cake House Brownies'
    }
  },
  {
    id: 'col-8',
    handle: 'cheesecakes',
    title: 'Cheesecakes',
    description: 'Slow-baked New York style cheesecakes with fresh berry compote.',
    image: {
      url: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=800&auto=format&fit=crop',
      altText: 'Rose Cake House Cheesecakes'
    }
  }
];

export const MOCK_PRODUCTS: Product[] = [
  // --- BIRTHDAY CAKES ---
  {
    id: 'prod-1',
    handle: 'royal-rose-chocolate-delight',
    title: 'Royal Rose Chocolate Truffle',
    description: 'Indulge in layers of rich 70% Belgian dark chocolate ganache, infused with organic rose water and decorated with handcrafted chocolate curls and edible 24k gold leaf.',
    category: 'Birthday Cakes',
    flavor: 'Chocolate',
    occasion: 'Birthday',
    rating: 4.9,
    reviewCount: 142,
    isBestSeller: true,
    priceRange: { minVariantPrice: { amount: '4800', currencyCode: 'LKR' } },
    compareAtPrice: { amount: '5500', currencyCode: 'LKR' },
    discountPercentage: 13,
    images: [
      { url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1000&auto=format&fit=crop', altText: 'Royal Rose Chocolate Truffle' },
      { url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1000&auto=format&fit=crop', altText: 'Chocolate Detail' }
    ],
    variants: [
      { id: 'v-1-500g', title: '500g', price: { amount: '4800', currencyCode: 'LKR' }, availableForSale: true, selectedOptions: [{ name: 'Weight', value: '500g' }] },
      { id: 'v-1-1kg', title: '1kg', price: { amount: '7800', currencyCode: 'LKR' }, availableForSale: true, selectedOptions: [{ name: 'Weight', value: '1kg' }] }
    ],
    ingredients: ['70% Belgian Dark Chocolate', 'Organic French Cream', 'Madagascar Bourbon Vanilla', 'Edible 24K Gold Leaf'],
    careInstructions: 'Keep refrigerated between 2-4°C.',
    deliveryInfo: 'Delivered across Colombo & suburbs in temperature-controlled insulated packaging.'
  },
  {
    id: 'prod-1b',
    handle: 'golden-confetti-vanilla-burst',
    title: 'Golden Confetti Vanilla Birthday Burst',
    description: 'Fluffy Madagascar vanilla sponge layered with white chocolate buttercream, colorful sugar pearls, and a sparkling birthday crown topper.',
    category: 'Birthday Cakes',
    flavor: 'Vanilla',
    occasion: 'Birthday',
    rating: 4.8,
    reviewCount: 89,
    isBestSeller: true,
    priceRange: { minVariantPrice: { amount: '4600', currencyCode: 'LKR' } },
    compareAtPrice: null,
    images: [
      { url: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=1000&auto=format&fit=crop', altText: 'Golden Confetti Vanilla Birthday Burst' }
    ],
    variants: [
      { id: 'v-1b-500g', title: '500g', price: { amount: '4600', currencyCode: 'LKR' }, availableForSale: true, selectedOptions: [{ name: 'Weight', value: '500g' }] },
      { id: 'v-1b-1kg', title: '1kg', price: { amount: '7400', currencyCode: 'LKR' }, availableForSale: true, selectedOptions: [{ name: 'Weight', value: '1kg' }] }
    ],
    ingredients: ['Madagascar Bourbon Vanilla', 'White Chocolate Ganache', 'Sprinkles', 'Swiss Buttercream'],
    careInstructions: 'Store in refrigerator. Serve at room temperature.',
    deliveryInfo: 'Same-day express delivery in Colombo.'
  },

  // --- WEDDING CAKES ---
  {
    id: 'prod-3',
    handle: 'grand-wedding-tiered-elegance',
    title: 'Opulent Multi-Tier Wedding Dream',
    description: 'A masterpiece tier cake with delicate sugar-crafted roses, vanilla bean sponge, and champagne-infused mousse filling.',
    category: 'Wedding Cakes',
    flavor: 'Vanilla',
    occasion: 'Wedding',
    rating: 5.0,
    reviewCount: 47,
    isBestSeller: true,
    priceRange: { minVariantPrice: { amount: '24000', currencyCode: 'LKR' } },
    compareAtPrice: { amount: '28000', currencyCode: 'LKR' },
    discountPercentage: 14,
    images: [
      { url: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?q=80&w=1000&auto=format&fit=crop', altText: 'Opulent Multi-Tier Wedding Dream' },
      { url: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=1000&auto=format&fit=crop', altText: 'Wedding Cake Detail' }
    ],
    variants: [
      { id: 'v-3-2kg', title: '2kg (2 Tiers)', price: { amount: '24000', currencyCode: 'LKR' }, availableForSale: true, selectedOptions: [{ name: 'Weight', value: '2kg' }] },
      { id: 'v-3-4kg', title: '4kg (3 Tiers)', price: { amount: '45000', currencyCode: 'LKR' }, availableForSale: true, selectedOptions: [{ name: 'Weight', value: '4kg' }] }
    ],
    ingredients: ['Madagascar Bourbon Vanilla', 'Champagne Mousse', 'Handcrafted Sugar Petals'],
    careInstructions: 'Requires refrigerated storage. Venue setup provided.',
    deliveryInfo: 'Includes white-glove venue delivery and setup in Colombo & Western Province.'
  },
  {
    id: 'prod-3b',
    handle: 'ivory-pearl-rose-symphony',
    title: 'Ivory Pearl & Rose Water Wedding Symphony',
    description: 'Smooth ivory fondant wrapping over almond sponge infused with rose water, silver sugar pearls, and cascading sugar orchids.',
    category: 'Wedding Cakes',
    flavor: 'Rose Water',
    occasion: 'Wedding',
    rating: 4.9,
    reviewCount: 32,
    priceRange: { minVariantPrice: { amount: '28000', currencyCode: 'LKR' } },
    compareAtPrice: null,
    images: [
      { url: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=1000&auto=format&fit=crop', altText: 'Ivory Pearl & Rose Water Wedding Symphony' }
    ],
    variants: [
      { id: 'v-3b-3kg', title: '3kg (2 Tiers)', price: { amount: '28000', currencyCode: 'LKR' }, availableForSale: true, selectedOptions: [{ name: 'Weight', value: '3kg' }] }
    ],
    ingredients: ['Rose Essence', 'Almond Sponge', 'Fondant Wrap', 'Sugar Pearls'],
    careInstructions: 'Refrigerated venue storage.',
    deliveryInfo: 'Venue consultation & delivery setup included.'
  },

  // --- ANNIVERSARY CAKES ---
  {
    id: 'prod-2',
    handle: 'velvet-blossom-red-velvet',
    title: 'Velvet Blossom Red Velvet',
    description: 'Classic crimson cocoa layers infused with buttermilk, layered with ultra-smooth cream cheese frosting and studded with fresh organic raspberries.',
    category: 'Anniversary Cakes',
    flavor: 'Red Velvet',
    occasion: 'Anniversary',
    rating: 4.8,
    reviewCount: 98,
    isBestSeller: true,
    priceRange: { minVariantPrice: { amount: '5200', currencyCode: 'LKR' } },
    compareAtPrice: { amount: '6000', currencyCode: 'LKR' },
    discountPercentage: 13,
    images: [
      { url: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=1000&auto=format&fit=crop', altText: 'Velvet Blossom Red Velvet' }
    ],
    variants: [
      { id: 'v-2-500g', title: '500g', price: { amount: '5200', currencyCode: 'LKR' }, availableForSale: true, selectedOptions: [{ name: 'Weight', value: '500g' }] },
      { id: 'v-2-1kg', title: '1kg', price: { amount: '8500', currencyCode: 'LKR' }, availableForSale: true, selectedOptions: [{ name: 'Weight', value: '1kg' }] }
    ],
    ingredients: ['Dutch Cocoa', 'Philadelphia Cream Cheese', 'Organic Buttermilk'],
    careInstructions: 'Refrigerate until 15 mins before serving.',
    deliveryInfo: 'Same-day delivery in Colombo.'
  },
  {
    id: 'prod-2b',
    handle: 'romantic-strawberry-chocolate-heart',
    title: 'Romantic Strawberry Chocolate Heart',
    description: 'Heart-shaped Belgian dark chocolate cake crowned with fresh strawberries, chocolate dip, and rose gold leaf flecks.',
    category: 'Anniversary Cakes',
    flavor: 'Strawberry Chocolate',
    occasion: 'Anniversary',
    rating: 4.9,
    reviewCount: 64,
    priceRange: { minVariantPrice: { amount: '5600', currencyCode: 'LKR' } },
    compareAtPrice: null,
    images: [
      { url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1000&auto=format&fit=crop', altText: 'Romantic Strawberry Chocolate Heart' }
    ],
    variants: [
      { id: 'v-2b-1kg', title: '1kg Heart', price: { amount: '5600', currencyCode: 'LKR' }, availableForSale: true, selectedOptions: [{ name: 'Weight', value: '1kg' }] }
    ],
    ingredients: ['Belgian Chocolate', 'Fresh Strawberries', 'Rose Gold Leaf'],
    careInstructions: 'Keep chilled.',
    deliveryInfo: 'Delivered in luxury gift box.'
  },

  // --- PHOTO CAKES ---
  {
    id: 'prod-5',
    handle: 'custom-photo-memory-cake',
    title: 'Custom High-Def Photo Cake',
    description: 'Turn your favorite cherished memory into edible art. Printed with 100% FDA-approved edible food colors on velvety cream icing.',
    category: 'Photo Cakes',
    flavor: 'Chocolate',
    occasion: 'Birthday',
    rating: 4.9,
    reviewCount: 110,
    priceRange: { minVariantPrice: { amount: '6800', currencyCode: 'LKR' } },
    compareAtPrice: { amount: '7800', currencyCode: 'LKR' },
    discountPercentage: 12,
    images: [
      { url: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=1000&auto=format&fit=crop', altText: 'Custom Photo Memory Cake' }
    ],
    variants: [
      { id: 'v-5-1kg', title: '1kg', price: { amount: '6800', currencyCode: 'LKR' }, availableForSale: true, selectedOptions: [{ name: 'Weight', value: '1kg' }] }
    ],
    ingredients: ['Edible Sugar Sheet', 'Natural Dyes', 'Chocolate Base'],
    careInstructions: 'Keep away from direct sunlight.',
    deliveryInfo: 'Requires photo upload during ordering.'
  },
  {
    id: 'prod-5b',
    handle: 'edible-floral-frame-photo-cake',
    title: 'Edible Floral Frame Photo Cake',
    description: 'Edible print framed by hand-piped buttercream flowers, delicate sugar pearls, and customizable congratulatory banner.',
    category: 'Photo Cakes',
    flavor: 'Vanilla',
    occasion: 'Graduation',
    rating: 4.8,
    reviewCount: 45,
    priceRange: { minVariantPrice: { amount: '7200', currencyCode: 'LKR' } },
    compareAtPrice: null,
    images: [
      { url: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=1000&auto=format&fit=crop', altText: 'Edible Floral Frame Photo Cake' }
    ],
    variants: [
      { id: 'v-5b-1kg', title: '1kg', price: { amount: '7200', currencyCode: 'LKR' }, availableForSale: true, selectedOptions: [{ name: 'Weight', value: '1kg' }] }
    ],
    ingredients: ['Sugar Sheet', 'Vanilla Bean', 'Buttercream'],
    careInstructions: 'Refrigerate until serving.',
    deliveryInfo: 'Express delivery in Colombo.'
  },

  // --- CUPCAKES ---
  {
    id: 'prod-c1',
    handle: 'velvet-rose-buttercream-cupcake-box',
    title: 'Velvet Rose Buttercream Cupcake Box (6 Pcs)',
    description: 'Six artisanal cupcakes crowned with piped buttercream roses, edible gold dust, and soft vanilla sponge base.',
    category: 'Cupcakes',
    flavor: 'Vanilla',
    occasion: 'Everyday',
    rating: 4.9,
    reviewCount: 112,
    priceRange: { minVariantPrice: { amount: '3600', currencyCode: 'LKR' } },
    compareAtPrice: null,
    images: [
      { url: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?q=80&w=1000&auto=format&fit=crop', altText: 'Velvet Rose Buttercream Cupcake Box' }
    ],
    variants: [
      { id: 'v-c1-6pcs', title: 'Box of 6', price: { amount: '3600', currencyCode: 'LKR' }, availableForSale: true, selectedOptions: [{ name: 'Count', value: '6' }] }
    ],
    ingredients: ['Buttercream', 'Madagascar Vanilla', 'Gold Dust'],
    careInstructions: 'Store in cool place.',
    deliveryInfo: 'Includes gift box packaging.'
  },
  {
    id: 'prod-c2',
    handle: 'belgian-chocolate-gold-dust-cupcakes',
    title: 'Belgian Dark Chocolate Cupcakes (6 Pcs)',
    description: 'Rich dark chocolate sponge topped with silky cocoa ganache swirl, toasted hazelnuts, and 24K gold foil flakes.',
    category: 'Cupcakes',
    flavor: 'Chocolate',
    occasion: 'Everyday',
    rating: 4.8,
    reviewCount: 78,
    priceRange: { minVariantPrice: { amount: '3800', currencyCode: 'LKR' } },
    compareAtPrice: null,
    images: [
      { url: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?q=80&w=1000&auto=format&fit=crop', altText: 'Belgian Dark Chocolate Cupcakes' }
    ],
    variants: [
      { id: 'v-c2-6pcs', title: 'Box of 6', price: { amount: '3800', currencyCode: 'LKR' }, availableForSale: true, selectedOptions: [{ name: 'Count', value: '6' }] }
    ],
    ingredients: ['Belgian Chocolate', 'Hazelnuts', '24K Gold Leaf'],
    careInstructions: 'Keep chilled.',
    deliveryInfo: 'Same-day express delivery.'
  },

  // --- BENTO CAKES ---
  {
    id: 'prod-6',
    handle: 'pastal-bento-lunchbox-cake',
    title: 'Minimalist Korean Pastel Bento Cake',
    description: 'Charming 300g bento cake with aesthetic vintage piping and soft pastel frosting. Includes mini wooden spoon and candle.',
    category: 'Bento Cakes',
    flavor: 'Vanilla',
    occasion: 'Everyday',
    rating: 4.9,
    reviewCount: 204,
    isSpecial: true,
    priceRange: { minVariantPrice: { amount: '2800', currencyCode: 'LKR' } },
    compareAtPrice: null,
    images: [
      { url: 'https://images.unsplash.com/photo-1562440499-64c9a111f713?q=80&w=1000&auto=format&fit=crop', altText: 'Minimalist Korean Pastel Bento Cake' }
    ],
    variants: [
      { id: 'v-6-300g', title: '300g Bento Box', price: { amount: '2800', currencyCode: 'LKR' }, availableForSale: true, selectedOptions: [{ name: 'Weight', value: '300g' }] }
    ],
    ingredients: ['Pastel Buttercream', 'Fluffy Vanilla Chiffon', 'Strawberry Compote'],
    careInstructions: 'Store chilled in box.',
    deliveryInfo: 'Includes aesthetic gift wrapping.'
  },
  {
    id: 'prod-6b',
    handle: 'vintage-pink-heart-bento-cake',
    title: 'Vintage Pink Heart Bento Cake',
    description: 'Heart-shaped 300g bento cake with delicate pink ruffles, written text overlay, and edible sugar pearls.',
    category: 'Bento Cakes',
    flavor: 'Red Velvet',
    occasion: 'Anniversary',
    rating: 4.9,
    reviewCount: 95,
    priceRange: { minVariantPrice: { amount: '2950', currencyCode: 'LKR' } },
    compareAtPrice: null,
    images: [
      { url: 'https://images.unsplash.com/photo-1562440499-64c9a111f713?q=80&w=1000&auto=format&fit=crop', altText: 'Vintage Pink Heart Bento Cake' }
    ],
    variants: [
      { id: 'v-6b-300g', title: '300g Bento Box', price: { amount: '2950', currencyCode: 'LKR' }, availableForSale: true, selectedOptions: [{ name: 'Weight', value: '300g' }] }
    ],
    ingredients: ['Red Velvet Sponge', 'Pink Cream Cheese', 'Sugar Pearls'],
    careInstructions: 'Keep refrigerated.',
    deliveryInfo: 'Includes mini wooden cutlery & candle.'
  },

  // --- BROWNIES ---
  {
    id: 'prod-7',
    handle: 'artisanal-brownie-tower-box',
    title: 'Artisanal Walnut & Fudge Brownie Box (8 Pcs)',
    description: 'Decadent slow-baked dark chocolate fudge brownies topped with sea salt flakes, toasted walnuts, and dulce de leche swirls.',
    category: 'Brownies',
    flavor: 'Chocolate',
    occasion: 'Everyday',
    rating: 4.8,
    reviewCount: 76,
    priceRange: { minVariantPrice: { amount: '3500', currencyCode: 'LKR' } },
    compareAtPrice: null,
    images: [
      { url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1000&auto=format&fit=crop', altText: 'Artisanal Brownie Box' }
    ],
    variants: [
      { id: 'v-7-box8', title: 'Box of 8', price: { amount: '3500', currencyCode: 'LKR' }, availableForSale: true, selectedOptions: [{ name: 'Count', value: '8' }] }
    ],
    ingredients: ['72% Valrhona Dark Chocolate', 'California Walnuts', 'Maldon Sea Salt'],
    careInstructions: 'Warm in microwave for 10s for gooey center.',
    deliveryInfo: 'Express delivery available across Sri Lanka.'
  },
  {
    id: 'prod-7b',
    handle: 'salted-caramel-double-chocolate-slab',
    title: 'Salted Caramel Double Chocolate Slab (12 Pcs)',
    description: 'Fudgy dark chocolate brownies layered with homemade salted caramel, chocolate chips, and gold dust.',
    category: 'Brownies',
    flavor: 'Caramel Chocolate',
    occasion: 'Everyday',
    rating: 4.9,
    reviewCount: 52,
    priceRange: { minVariantPrice: { amount: '4200', currencyCode: 'LKR' } },
    compareAtPrice: null,
    images: [
      { url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1000&auto=format&fit=crop', altText: 'Salted Caramel Double Chocolate Slab' }
    ],
    variants: [
      { id: 'v-7b-12pcs', title: 'Box of 12', price: { amount: '4200', currencyCode: 'LKR' }, availableForSale: true, selectedOptions: [{ name: 'Count', value: '12' }] }
    ],
    ingredients: ['Dark Chocolate', 'Salted Caramel', 'Butter'],
    careInstructions: 'Store in airtight container.',
    deliveryInfo: 'Express courier across Western Province.'
  },

  // --- CHEESECAKES ---
  {
    id: 'prod-8',
    handle: 'wild-blueberry-new-york-cheesecake',
    title: 'Wild Blueberry New York Cheesecake',
    description: 'Authentic dense and creamy New York cheesecake baked over a cinnamon graham cracker crust, blanketed with wild blueberry topping.',
    category: 'Cheesecakes',
    flavor: 'Blueberry',
    occasion: 'Anniversary',
    rating: 4.9,
    reviewCount: 165,
    isSpecial: true,
    priceRange: { minVariantPrice: { amount: '7500', currencyCode: 'LKR' } },
    compareAtPrice: { amount: '8500', currencyCode: 'LKR' },
    discountPercentage: 12,
    images: [
      { url: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=1000&auto=format&fit=crop', altText: 'Wild Blueberry New York Cheesecake' }
    ],
    variants: [
      { id: 'v-8-1kg', title: '1kg', price: { amount: '7500', currencyCode: 'LKR' }, availableForSale: true, selectedOptions: [{ name: 'Weight', value: '1kg' }] }
    ],
    ingredients: ['Philadelphia Cream Cheese', 'Wild Blueberries', 'Graham Crust'],
    careInstructions: 'Must be kept chilled at all times.',
    deliveryInfo: 'Refrigerated local express courier.'
  },
  {
    id: 'prod-8b',
    handle: 'mango-passionfruit-baked-cheesecake',
    title: 'Mango Passionfruit Baked Cheesecake',
    description: 'Creamy baked cheesecake infused with tropical mango glaze and passionfruit compote over a buttery biscuit base.',
    category: 'Cheesecakes',
    flavor: 'Mango Passionfruit',
    occasion: 'Birthday',
    rating: 4.8,
    reviewCount: 88,
    priceRange: { minVariantPrice: { amount: '7800', currencyCode: 'LKR' } },
    compareAtPrice: null,
    images: [
      { url: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=1000&auto=format&fit=crop', altText: 'Mango Passionfruit Baked Cheesecake' }
    ],
    variants: [
      { id: 'v-8b-1kg', title: '1kg', price: { amount: '7800', currencyCode: 'LKR' }, availableForSale: true, selectedOptions: [{ name: 'Weight', value: '1kg' }] }
    ],
    ingredients: ['Cream Cheese', 'Fresh Mangoes', 'Passionfruit'],
    careInstructions: 'Keep strictly chilled.',
    deliveryInfo: 'Delivered in insulated cold bag.'
  }
];

export const MOCK_TESTIMONIALS = [
  {
    id: 't-1',
    name: 'Sophia Perera',
    role: 'Bride & Event Designer (Colombo)',
    review: 'The tiered wedding cake was an absolute showstopper at our Mount Lavinia reception! Not only was the floral craftwork beyond breathtaking, but the champagne mousse flavor was praised by every single guest.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 't-2',
    name: 'Dilshan Silva',
    role: 'Corporate Executive (Kandy)',
    review: 'Ordered the Royal Rose Chocolate Truffle for my mother\'s 60th birthday in Kandy. Delivery was punctual to the minute, packaging was royalty-grade, and the chocolate quality was supreme.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 't-3',
    name: 'Elena Fernando',
    role: 'Food & Lifestyle Critic (Galle)',
    review: 'The Korean Bento Cakes are perfection. The vintage buttercream piping and soft textures remind me of high-end bakeries in Paris and Seoul. Highly recommended in Sri Lanka!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop'
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: 'insta-1',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop',
    likes: '2.4k',
    comments: '184',
    url: 'https://instagram.com'
  },
  {
    id: 'insta-2',
    image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?q=80&w=600&auto=format&fit=crop',
    likes: '4.1k',
    comments: '312',
    url: 'https://instagram.com'
  },
  {
    id: 'insta-3',
    image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=600&auto=format&fit=crop',
    likes: '1.9k',
    comments: '96',
    url: 'https://instagram.com'
  }
];
