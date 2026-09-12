import { MOCK_PRODUCTS, MOCK_COLLECTIONS } from './mock-data';
import { Product, Collection } from './types';

const domain = process.env.SHOPIFY_STORE_DOMAIN || '';
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_TOKEN || '';

const PRODUCTS_QUERY = `
  query getProducts($first: Int = 20) {
    products(first: $first) {
      edges {
        node {
          id
          handle
          title
          description
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 3) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 5) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
              }
            }
          }
        }
      }
    }
  }
`;

export async function shopifyFetch<T>({
  query,
  variables = {},
}: {
  query: string;
  variables?: Record<string, any>;
}): Promise<T | null> {
  if (!domain || !storefrontAccessToken) {
    return null;
  }

  try {
    const endpoint = `https://${domain}/api/2024-01/graphql.json`;
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 },
    });

    const data = await res.json();
    if (data.errors) {
      console.warn('Shopify GraphQL response info:', data.errors);
      return null;
    }
    return data.data;
  } catch (error) {
    console.warn('Shopify connection fallback:', error);
    return null;
  }
}

export async function getProducts(options?: {
  category?: string;
  query?: string;
  sortKey?: string;
  reverse?: boolean;
}): Promise<Product[]> {
  let products: Product[] = [];

  // Try live fetch if credentials exist
  if (domain && storefrontAccessToken) {
    const data = await shopifyFetch<{
      products: {
        edges: {
          node: any;
        }[];
      };
    }>({ query: PRODUCTS_QUERY });

    if (data?.products?.edges && data.products.edges.length > 0) {
      products = data.products.edges.map(({ node }) => ({
        id: node.id,
        handle: node.handle,
        title: node.title,
        description: node.description || 'Artisan handmade cake.',
        category: 'Birthday Cakes',
        rating: 4.9,
        reviewCount: 42,
        priceRange: {
          minVariantPrice: {
            amount: node.priceRange.minVariantPrice.amount,
            currencyCode: node.priceRange.minVariantPrice.currencyCode || 'INR',
          },
        },
        images: node.images.edges.map((imgEdge: any) => ({
          url: imgEdge.node.url,
          altText: imgEdge.node.altText || node.title,
        })),
        variants: node.variants.edges.map((vEdge: any) => ({
          id: vEdge.node.id,
          title: vEdge.node.title,
          price: {
            amount: vEdge.node.price.amount,
            currencyCode: vEdge.node.price.currencyCode || 'INR',
          },
          availableForSale: vEdge.node.availableForSale,
          selectedOptions: [{ name: 'Option', value: vEdge.node.title }],
        })),
      }));
    }
  }

  // Fallback to rich mock data if live API has no products yet
  if (products.length === 0) {
    products = [...MOCK_PRODUCTS];
  }

  if (options?.category && options.category !== 'All') {
    products = products.filter(
      (p) => p.category.toLowerCase() === options.category?.toLowerCase()
    );
  }

  if (options?.query) {
    const q = options.query.toLowerCase();
    products = products.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }

  if (options?.sortKey) {
    if (options.sortKey === 'PRICE_LOW_HIGH') {
      products.sort(
        (a, b) =>
          parseFloat(a.priceRange.minVariantPrice.amount) -
          parseFloat(b.priceRange.minVariantPrice.amount)
      );
    } else if (options.sortKey === 'PRICE_HIGH_LOW') {
      products.sort(
        (a, b) =>
          parseFloat(b.priceRange.minVariantPrice.amount) -
          parseFloat(a.priceRange.minVariantPrice.amount)
      );
    } else if (options.sortKey === 'RATING') {
      products.sort((a, b) => b.rating - a.rating);
    }
  }

  return products;
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  const products = await getProducts();
  const product = products.find((p) => p.handle === handle);
  return product || MOCK_PRODUCTS[0];
}

export async function getCollections(): Promise<Collection[]> {
  return MOCK_COLLECTIONS;
}
