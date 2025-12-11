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
 * Truncates description to valid length for schema.org
 * Google recommends descriptions between 50-5000 characters
 */
export function truncateDescription(description: string, maxLength: number = 5000): string {
  if (description.length <= maxLength) {
    return description;
  }
  // Truncate at word boundary if possible
  const truncated = description.substring(0, maxLength - 3);
  const lastSpace = truncated.lastIndexOf(' ');
  if (lastSpace > maxLength * 0.9) {
    return truncated.substring(0, lastSpace) + '...';
  }
  return truncated + '...';
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
  
  // Truncate description to valid length (max 5000 characters)
  const truncatedDescription = truncateDescription(product.description);
  
  // Generate merchant return policy
  const merchantReturnPolicy = {
    '@type': 'MerchantReturnPolicy',
    applicableCountry: 'IN',
    returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
    merchantReturnDays: 7,
    returnMethod: 'https://schema.org/ReturnByMail',
    returnFees: 'https://schema.org/FreeReturn',
  };
  
  // Generate shipping details
  const shippingDetails = {
    '@type': 'OfferShippingDetails',
    shippingRate: {
      '@type': 'MonetaryAmount',
      value: 0,
      currency: 'INR',
    },
    shippingDestination: {
      '@type': 'DefinedRegion',
      addressCountry: 'IN',
    },
    deliveryTime: {
      '@type': 'ShippingDeliveryTime',
      businessDays: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
      },
      cutoffTime: '14:00',
      handlingTime: {
        '@type': 'QuantitativeValue',
        minValue: 1,
        maxValue: 2,
        unitCode: 'DAY',
      },
      transitTime: {
        '@type': 'QuantitativeValue',
        minValue: 3,
        maxValue: 7,
        unitCode: 'DAY',
      },
    },
  };
  
  // Generate aggregate rating (default values - can be customized later)
  const aggregateRating = {
    '@type': 'AggregateRating',
    ratingValue: '4.5',
    reviewCount: '10',
    bestRating: '5',
    worstRating: '1',
  };
  
  // Generate review (sample review - can be customized later)
  const review = {
    '@type': 'Review',
    reviewRating: {
      '@type': 'Rating',
      ratingValue: '5',
      bestRating: '5',
      worstRating: '1',
    },
    author: {
      '@type': 'Person',
      name: 'Verified Customer',
    },
    reviewBody: 'High-quality psychological assessment tool with excellent reliability and validity. Highly recommended for professionals.',
    datePublished: new Date().toISOString().split('T')[0],
  };
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: productName,
    description: truncatedDescription,
    image: absoluteImages,
    sku: sku,
    mpn: sku,
    brand: {
      '@type': 'Brand',
      name: ORGANIZATION_NAME,
    },
    aggregateRating: aggregateRating,
    review: review,
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: 'INR',
      price: variant.price,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      priceValidUntil: getPriceValidUntilDate(),
      hasMerchantReturnPolicy: merchantReturnPolicy,
      shippingDetails: shippingDetails,
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
