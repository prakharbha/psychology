import productsData from '@/data/products.json';

export interface Product {
  id: string;
  name: string;
  fullName: string;
  description: string;
  ageRange: string;
  language: string;
  itemCount: number;
  slug: string;
  image?: string; // Optional image path (defaults to placeholder if not provided) - DEPRECATED: Use images array
  images?: string[]; // Array of image paths (supports multiple images per product)
  price100?: number; // Optional: Custom price for pack of 100 (defaults to PRODUCT_VARIANTS[100])
  price500?: number; // Optional: Custom price for pack of 500 (defaults to PRODUCT_VARIANTS[500])
  removed?: boolean; // Optional: Mark products as removed (commented out)
}

export interface ProductVariant {
  packSize: 100 | 500;
  price: number;
}

// Default pricing for all products
export const PRODUCT_VARIANTS: Record<number, number> = {
  100: 1000,  // ₹1,000 for pack of 100
  500: 4500,  // ₹4,500 for pack of 500
};

export function getAllProducts(): Product[] {
  // Filter out products marked as removed
  return (productsData as Product[]).filter((product) => !product.removed);
}

export function getProductBySlug(slug: string): Product | undefined {
  // Filter out removed products
  return (productsData as Product[]).find((product) => product.slug === slug && !product.removed) as Product | undefined;
}

export function getProductVariant(product: Product, packSize: 100 | 500): ProductVariant {
  // Use custom pricing if available, otherwise use default
  const customPrice = packSize === 100 ? product.price100 : product.price500;
  const price = customPrice ?? PRODUCT_VARIANTS[packSize];
  
  return {
    packSize,
    price,
  };
}

export function formatPrice(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`;
}

