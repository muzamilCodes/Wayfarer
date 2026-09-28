import { MetadataRoute } from 'next';
import { SITE, getDestinations, getPackages } from '@/lib/api';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [d, p] = await Promise.all([getDestinations(), getPackages('limit=50')]);
  return [
    { url: SITE }, { url: `${SITE}/destinations` }, { url: `${SITE}/tours` },
    ...(d?.items ?? []).map((x) => ({ url: `${SITE}/destinations/${x.slug}` })),
    ...(p?.items ?? []).map((x) => ({ url: `${SITE}/tours/${x.slug}` })),
  ];
}
