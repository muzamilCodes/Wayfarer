export interface Img { url: string; publicId?: string }
export interface Destination {
  _id: string; name: string; slug: string; region: string; country: string; description: string;
  images: Img[]; bestTime?: string; startingPrice: number; rating: number; popularity: number;
  location: { coordinates: [number, number] };
}
export interface DayPlan { day: number; title: string; description?: string; meals?: string[] }
export interface TourPackage {
  _id: string; title: string; slug: string; durationDays: number; basePrice: number; discountPercent: number;
  images: Img[]; overview?: string; highlights: string[]; itinerary?: DayPlan[]; included: string[]; excluded: string[];
  pickupLocation?: string; transport?: string; cancellationPolicy?: string; maxTravellers: number;
  rating: number; reviewCount: number; destination: { name: string; slug: string };
}
export interface Paged<T> { items: T[]; total: number; page: number; pages: number }
