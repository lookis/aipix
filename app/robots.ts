import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';
export const revalidate = 86400; // Revalidate daily (24 hours)

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/', // Block API routes if you have search endpoints or internal APIs
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}