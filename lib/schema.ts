import { Product, getProductVariant } from './products';

const BASE_URL = 'https://www.prakharpsychologicaltest.com';
const ORGANIZATION_NAME = 'Prakhar Psychological Testing and Research Centre';

/**
 * Converts a relative image path to an absolute URL
 */
export function getAbsoluteImageUrl(imagePath: string, baseUrl: string = BASE_URL): string {
  // If already absolute, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  // Ensure path starts with /
  const normalizedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${baseUrl}${normalizedPath}`;
}

/**
 * Returns March 31st of next year in ISO format (YYYY-MM-DD)
 * Always returns March 31st of the next calendar year
 */
export function getPriceValidUntilDate(): string {
  const now = new Date();
  const nextYear = now.getFullYear() + 1;
  return `${nextYear}-03-31`;
}

/**
 * Generates Product schema for a specific pack size variant
 */
export function generateProductSchema(
  product: Product,
  packSize: 100 | 500,
  baseUrl: string = BASE_URL
): object {
  const variant = getProductVariant(product, packSize);
  const packSizeText = packSize === 100 ? 'Pack of 100' : 'Pack of 500';
  
  // Get product images - prefer images array, fallback to image, then placeholder
  const productImages = product.images && product.images.length > 0
    ? product.images
    : product.image
    ? [product.image]
    : ['/images/placeholder-test.svg'];
  
  // Convert to absolute URLs
  const absoluteImages = productImages.map(img => getAbsoluteImageUrl(img, baseUrl));
  
  // Generate SKU/MPN: product-id-packSize
  const sku = `${product.id}-${packSize}`;
  
  // Product name with pack size
  const productName = `${product.fullName} (${packSizeText})`;
  
  // Product URL
  const productUrl = `${baseUrl}/${product.slug}`;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: productName,
    description: product.description,
    image: absoluteImages,
    sku: sku,
    mpn: sku,
    brand: {
      '@type': 'Brand',
      name: ORGANIZATION_NAME,
    },
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: 'INR',
      price: variant.price,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      priceValidUntil: getPriceValidUntilDate(),
    },
  };
}

/**
 * Generates BreadcrumbList schema for a product page
 */
export function generateBreadcrumbSchema(
  product: Product,
  baseUrl: string = BASE_URL
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Products',
        item: `${baseUrl}/products`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.fullName,
        item: `${baseUrl}/${product.slug}`,
      },
    ],
  };
}

/**
 * Generates Organization schema
 */
export function generateOrganizationSchema(baseUrl: string = BASE_URL): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: ORGANIZATION_NAME,
    url: baseUrl,
  };
}
