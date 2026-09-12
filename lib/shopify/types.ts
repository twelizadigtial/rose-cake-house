export interface ProductImage {
  url: string;
  altText: string;
  width?: number;
  height?: number;
}

export interface ProductVariant {
  id: string;
  title: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  compareAtPrice?: {
    amount: string;
    currencyCode: string;
  } | null;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    maxVariantPrice?: {
      amount: string;
      currencyCode: string;
    };
  };
  compareAtPrice?: {
    amount: string;
    currencyCode: string;
  } | null;
  images: ProductImage[];
  variants: ProductVariant[];
  category: string;
  flavor?: string;
  occasion?: string;
  rating: number;
  reviewCount: number;
  isBestSeller?: boolean;
  isSpecial?: boolean;
  discountPercentage?: number;
  ingredients?: string[];
  careInstructions?: string;
  deliveryInfo?: string;
}

export interface Collection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: ProductImage;
}

export interface CartItem {
  id: string;
  product: Product;
  selectedVariant: ProductVariant;
  quantity: number;
  customMessage?: string;
  deliveryDate?: string;
  photoUrl?: string;
  customCakeConfig?: CustomCakeConfig;
}

export interface CustomCakeConfig {
  shape: 'Round' | 'Heart' | 'Square';
  size: '500g' | '1kg' | '2kg' | '3kg';
  flavor: 'Chocolate' | 'Vanilla' | 'Red Velvet' | 'Blueberry' | 'Butterscotch' | 'Strawberry' | 'Coffee';
  frostingColor: string;
  decorations: string[];
  photoUrl?: string;
  message: string;
  deliveryDate: string;
  estimatedPrice: number;
}
