import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  output: 'standalone',
  reactStrictMode: true,
  async headers() {
    return [
      {
        // HTML pages: browser always revalidates, CDN caches 1 hour
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=3600, must-revalidate',
          },
        ],
      },
      // Note: _next/static/* headers are handled by public/_headers
      // because Cloudflare Workers don't serve static assets
    ];
  },
};

export default withMDX(config);
