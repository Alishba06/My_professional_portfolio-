import { MetadataRoute } from 'next';
import { publicEnv } from '@/utils/env';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = publicEnv.siteUrl || 'https://alishba.dev';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
