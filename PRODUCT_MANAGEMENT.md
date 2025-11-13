# How to Edit Products

## File Locations

### 1. Product Descriptions & Basic Info
**File:** `/data/products.json`

Edit the `description` field for each product. You can also add optional fields:
- `image` - Path to product image (e.g., `/images/product-name.webp`)
- `price100` - Custom price for pack of 100 (optional, defaults to ₹1,000)
- `price500` - Custom price for pack of 500 (optional, defaults to ₹4,500)

### 2. Default Pricing
**File:** `/lib/products.ts`

Edit the `PRODUCT_VARIANTS` object:
```typescript
export const PRODUCT_VARIANTS: Record<number, number> = {
  100: 1000,  // ₹1,000 for pack of 100
  500: 4500,  // ₹4,500 for pack of 500
};
```

### 3. Product Images
**Location:** `/public/images/`

1. Add your product images to `/public/images/`
2. Recommended format: WebP (for best performance)
3. Name them descriptively (e.g., `adjustment-inventory.webp`)
4. Reference them in `products.json`:

```json
{
  "id": "adjustment-inventory",
  "name": "The Adjustment Inventory",
  "image": "/images/adjustment-inventory.webp",
  ...
}
```

## Example Product Entry

```json
{
  "id": "adjustment-inventory",
  "name": "The Adjustment Inventory",
  "fullName": "The Adjustment Inventory : (Bilingual)",
  "description": "A psychological tool designed to assess adjustment levels in individuals aged 15-21 across five key areas. The inventory consists of 50 items presented in a yes/no format.",
  "ageRange": "15-21",
  "language": "Bilingual",
  "itemCount": 50,
  "slug": "adjustment-inventory",
  "image": "/images/adjustment-inventory.webp",
  "price100": 1000,
  "price500": 4500
}
```

## Notes

- **Image**: If not provided, uses placeholder `/images/placeholder-test.svg`
- **Pricing**: If `price100` or `price500` are not specified, uses default from `PRODUCT_VARIANTS`
- **Slug**: Must match the URL slug (e.g., `adjustment-inventory` → `/adjustment-inventory`)
- **Required fields**: `id`, `name`, `fullName`, `description`, `ageRange`, `language`, `itemCount`, `slug`

## Adding New Products

1. Add product image to `/public/images/`
2. Add product entry to `/data/products.json`
3. Ensure slug is unique and URL-friendly
4. Restart dev server: `npm run dev`

