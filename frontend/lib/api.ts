import { Destination, Paged, TourPackage } from '@/types';

export const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/api';
export const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

/** Server-side fetch. Returns null when the API is unreachable so pages can show an error state. */
async function get<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API}${path}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return (await res.json()).data as T;
  } catch { return null; }
}

export const getDestinations = (qs = '') => get<Paged<Destination>>(`/destinations?limit=50${qs}`);
export const getDestination = (slug: string) => get<Destination>(`/destinations/${slug}`);
export const getPackages = (qs = '') => get<Paged<TourPackage>>(`/packages?${qs}`);
export const getPackage = (slug: string) => get<TourPackage>(`/packages/${slug}`);

/** Browser-side call for auth (cookies included for the refresh token). */
export async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message ?? 'Request failed');
  return json.data as T;
}

export interface Listing { _id: string; name: string; slug: string; images: { url: string }[]; rating?: number; pricePerNight?: number; price?: number; amenities?: string[]; durationHours?: number; destination?: { name: string; slug: string } }
export interface Vehicle { _id: string; category: string; name: string; seats: number; pricePerKm: number; baseFare: number }
export interface Blog { _id: string; title: string; slug: string; excerpt: string; content?: string[]; category?: string; tags: string[]; author: string; createdAt: string }
export const getHotels = (qs = '') => get<Paged<Listing>>(`/hotels?limit=24${qs}`);
export const getActivities = (qs = '') => get<Paged<Listing>>(`/activities?limit=24${qs}`);
export const getVehicles = () => get<{ items: Vehicle[] }>('/vehicles');
export const getBlogs = (qs = '') => get<Paged<Blog>>(`/blogs?limit=12${qs}`);
export const getBlog = (slug: string) => get<Blog>(`/blogs/${slug}`);
