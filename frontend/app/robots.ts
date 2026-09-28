import { MetadataRoute } from 'next';
import { SITE } from '@/lib/api';
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/account'] }, sitemap: `${SITE}/sitemap.xml` };
}
