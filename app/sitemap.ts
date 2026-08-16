import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { getAllStates } from "@/lib/states";

// Required for static export — see https://nextjs.org/docs/advanced-features/static-html-export
export const dynamic = "force-static";

// Static export bakes this to a fixed sitemap.xml at build time — same URL shape
// (/laender/{slug}/) the Jekyll site used, so no redirects are needed on relaunch.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const states = getAllStates().filter((state) => state.status !== "draft");

  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "yearly",
      priority: 1,
    },
    ...states.map((state) => ({
      url: `${SITE_URL}/laender/${state.slug}/`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
