import { source } from '@/lib/source'; // Adjust this path to where your Fumadocs source loader is defined
import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourwebsite.com';

  // Fetch all documentation pages mapped by Fumadocs
  const docPages = source.getPages()
    .filter((page) => !page.data.draft)
    .map((page) => ({
    url: `${baseUrl}${page.url}`,
    // If you track modified times or have custom frontmatter data, 
    // you can pass page.data.lastModified here
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Include your main marketing/landing pages manually
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1.0,
    },
  ];

  return [...staticPages, ...docPages];
}