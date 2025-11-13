import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable source maps for production builds
  // Note: In production, you may want to only serve source maps to authenticated users
  // to avoid exposing your source code
  productionBrowserSourceMaps: true,
};

export default nextConfig;
