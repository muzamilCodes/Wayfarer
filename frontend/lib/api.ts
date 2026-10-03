import { Destination, Paged, TourPackage } from '@/types';
import {
  SEED_DESTINATIONS,
  SEED_PACKAGES,
  SEED_HOTELS,
  SEED_VEHICLES,
  SEED_ACTIVITIES,
  SEED_BLOGS,
} from './seed-data';

const rawApi = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/api';
const cleanApi = rawApi.replace(/\/+$/, '');
export const API = cleanApi.endsWith('/api') ? cleanApi : `${cleanApi}/api`;
export const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export interface Listing {
  _id: string;
  name: string;
  slug: string;
  images: { url: string }[];
  rating?: number;
  pricePerNight?: number;
  price?: number;
  amenities?: string[];
  durationHours?: number;
  destination?: { name: string; slug: string };
}
export interface Vehicle {
  _id: string;
  category: string;
  name: string;
  seats: number;
  pricePerKm: number;
  baseFare: number;
}
export interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string[];
  category?: string;
  tags: string[];
  author: string;
  createdAt: string;
}

/** Robust fetch with retry and fallback data */
async function fetchWithRetry<T>(
  path: string,
  fallback: T,
  retries = 1,
  timeoutMs = 3000
): Promise<T> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

      const res = await fetch(`${API}${path}`, {
        next: { revalidate: 60 },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          // If it's a paged response and items array is empty, use seed fallback
          if (
            json.data.items &&
            Array.isArray(json.data.items) &&
            json.data.items.length === 0 &&
            (fallback as any)?.items
          ) {
            return fallback;
          }
          return json.data as T;
        }
      }
    } catch {
      // Retry once after delay or fallback
      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, 400));
      }
    }
  }
  return fallback;
}

const paged = <T>(items: T[]): Paged<T> => ({
  items,
  total: items.length,
  page: 1,
  pages: 1,
});

export const getDestinations = async (qs = '') => {
  return fetchWithRetry<Paged<Destination>>(
    `/destinations?limit=50${qs}`,
    paged(SEED_DESTINATIONS)
  );
};

export const getDestination = async (slug: string) => {
  const fallback =
    SEED_DESTINATIONS.find((d) => d.slug === slug) ?? SEED_DESTINATIONS[0];
  return fetchWithRetry<Destination>(`/destinations/${slug}`, fallback);
};

export const getPackages = async (qs = '') => {
  return fetchWithRetry<Paged<TourPackage>>(
    `/packages?${qs}`,
    paged(SEED_PACKAGES)
  );
};

export const getPackage = async (slug: string) => {
  const fallback =
    SEED_PACKAGES.find((p) => p.slug === slug) ?? SEED_PACKAGES[0];
  return fetchWithRetry<TourPackage>(`/packages/${slug}`, fallback);
};

export const getHotels = async (qs = '') => {
  return fetchWithRetry<Paged<Listing>>(
    `/hotels?limit=24${qs}`,
    paged(SEED_HOTELS)
  );
};

export const getActivities = async (qs = '') => {
  return fetchWithRetry<Paged<Listing>>(
    `/activities?limit=24${qs}`,
    paged(SEED_ACTIVITIES)
  );
};

export const getVehicles = async () => {
  return fetchWithRetry<{ items: Vehicle[] }>(
    '/vehicles',
    { items: SEED_VEHICLES }
  );
};

export const getBlogs = async (qs = '') => {
  return fetchWithRetry<Paged<Blog>>(
    `/blogs?limit=12${qs}`,
    paged(SEED_BLOGS)
  );
};

export const getBlog = async (slug: string) => {
  const fallback = SEED_BLOGS.find((b) => b.slug === slug) ?? SEED_BLOGS[0];
  return fetchWithRetry<Blog>(`/blogs/${slug}`, fallback);
};

/** Browser-side call for auth & actions */
export async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.message ?? 'Request failed');
  return json.data as T;
}
