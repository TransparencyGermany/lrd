import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

// Required for static export — see https://nextjs.org/docs/advanced-features/static-html-export
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The embed view is only meant to be loaded inside iframes elsewhere, not indexed directly.
      disallow: "/embed",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
