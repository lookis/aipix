import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourwebsite.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/', // Block API routes if you have search endpoints or internal APIs
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}