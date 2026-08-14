import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  // Preserves the existing /laender/thueringen/ URL shape from the Jekyll site
  // (SEO/bookmarks depend on the trailing slash).
  trailingSlash: true,
};

export default nextConfig;
