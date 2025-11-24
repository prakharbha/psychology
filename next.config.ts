import type { NextConfig } from "next";
import { redirects } from "./lib/redirects";

const nextConfig: NextConfig = {
  // Enable source maps for production builds
  // Note: In production, you may want to only serve source maps to authenticated users
  // to avoid exposing your source code
  productionBrowserSourceMaps: true,
  
  // 301 Redirects from old site URLs to new URLs
  async redirects() {
    return Object.entries(redirects).map(([source, destination]) => ({
      source,
      destination,
      permanent: true, // 301 redirect
    }));
  },
};

export default nextConfig;
