import { notFound } from 'next/navigation';
import { getProductBySlug, getAllProducts, formatPrice, getProductVariant } from '@/lib/products';
import ProductPageClient from '@/components/ProductPageClient';
import ProductImageGallery from '@/components/ProductImageGallery';
import type { Metadata } from 'next';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.fullName} - Prakhar Psychological Testing`,
    description: product.description,
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/images/favicon-32.webp", sizes: "32x32", type: "image/webp" },
        { url: "/images/favicon-48.webp", sizes: "48x48", type: "image/webp" },
        { url: "/images/favicon-192.webp", sizes: "192x192", type: "image/webp" },
      ],
      apple: [
        { url: "/images/favicon-192.webp", sizes: "192x192", type: "image/webp" },
      ],
      shortcut: "/favicon.ico",
    },
    openGraph: {
      title: product.fullName,
      description: product.description,
      type: 'website',
      images: [
        {
          url: '/images/placeholder-test.svg',
          width: 400,
          height: 300,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.fullName,
      description: product.description,
      images: ['/images/placeholder-test.svg'],
    },
    authors: [{ name: 'Prakhar Psychological Testing and Research Centre' }],
    alternates: {
      canonical: `/${product.slug}`,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Generate JSON-LD structured data
  const pack100Variant = getProductVariant(product, 100);
  const pack500Variant = getProductVariant(product, 500);
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.fullName,
    description: product.description,
    image: product.image || '/images/placeholder-test.svg',
    offers: [
      {
        '@type': 'Offer',
        price: pack100Variant.price,
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        itemCondition: 'https://schema.org/NewCondition',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: pack100Variant.price,
          priceCurrency: 'INR',
          unitText: 'Pack of 100',
        },
      },
      {
        '@type': 'Offer',
        price: pack500Variant.price,
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        itemCondition: 'https://schema.org/NewCondition',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: pack500Variant.price,
          priceCurrency: 'INR',
          unitText: 'Pack of 500',
        },
      },
    ],
    brand: {
      '@type': 'Brand',
      name: 'Prakhar Psychological Testing and Research Centre',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-white relative min-h-screen py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Floral animated background */}
        <div className="floral-banner-bg absolute inset-0 pointer-events-none">
          <div className="floral-orb-banner floral-orb-banner-1"></div>
          <div className="floral-orb-banner floral-orb-banner-2"></div>
          <div className="floral-orb-banner floral-orb-banner-3"></div>
          <div className="floral-orb-banner floral-orb-banner-4"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image Gallery */}
            <div className="glass-card rounded-3xl p-8">
              <ProductImageGallery
                images={
                  product.images && product.images.length > 0
                    ? product.images
                    : product.image
                    ? [product.image]
                    : ['/images/placeholder-test.svg']
                }
                productName={product.name}
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-col space-y-6">
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-slate-900">
                {product.fullName}
              </h1>

              {/* Product Meta Information */}
              <div className="glass-card rounded-2xl p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/60 rounded-xl border border-white/30">
                    <p className="text-sm text-slate-600 mb-1">Age Range</p>
                    <p className="font-semibold text-slate-900">{product.ageRange} years</p>
                  </div>
                  <div className="p-4 bg-white/60 rounded-xl border border-white/30">
                    <p className="text-sm text-slate-600 mb-1">Language</p>
                    <p className="font-semibold text-slate-900">{product.language}</p>
                  </div>
                  <div className="p-4 bg-white/60 rounded-xl border border-white/30">
                    <p className="text-sm text-slate-600 mb-1">Items</p>
                    <p className="font-semibold text-slate-900">{product.itemCount} items</p>
                  </div>
                  <div className="p-4 bg-white/60 rounded-xl border border-white/30">
                    <p className="text-sm text-slate-600 mb-1">Price Range</p>
                    <p className="font-semibold text-slate-900">
                      {formatPrice(getProductVariant(product, 100).price)} - {formatPrice(getProductVariant(product, 500).price)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Pack Size Selector and Add to Cart */}
              <ProductPageClient product={product} />
            </div>
          </div>

          {/* Product Description Section - Full Width */}
          <div className="glass-card rounded-2xl p-6 mt-12">
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">Description</h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-700 leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
