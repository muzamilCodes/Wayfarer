import { z } from 'zod';
import { Destination } from '../models/Destination';
import { Package } from '../models/Package';
import { ApiError } from '../utils/ApiError';
import { asyncHandler } from '../utils/asyncHandler';
import { ok } from '../utils/response';

const page = z.object({ page: z.coerce.number().min(1).default(1), limit: z.coerce.number().min(1).max(50).default(12) });

export const listDestinations = asyncHandler(async (req, res) => {
  const { page: p, limit } = page.parse(req.query);
  const filter: any = { isPublished: true };
  if (typeof req.query.region === 'string') filter.region = req.query.region;
  const [items, total] = await Promise.all([
    Destination.find(filter).sort({ popularity: -1 }).skip((p - 1) * limit).limit(limit).lean(),
    Destination.countDocuments(filter),
  ]);
  ok(res, 'Destinations', { items, total, page: p, pages: Math.ceil(total / limit) });
});

export const getDestination = asyncHandler(async (req, res) => {
  const d = await Destination.findOne({ slug: req.params.slug, isPublished: true }).lean();
  if (!d) throw new ApiError(404, 'Destination not found');
  ok(res, 'Destination', d);
});

export const listPackages = asyncHandler(async (req, res) => {
  const q = page.extend({
    destination: z.string().optional(), minPrice: z.coerce.number().optional(), maxPrice: z.coerce.number().optional(),
    minDays: z.coerce.number().optional(), maxDays: z.coerce.number().optional(), minRating: z.coerce.number().optional(),
  }).parse(req.query);
  const filter: any = { isPublished: true };
  if (q.destination) { const d = await Destination.findOne({ slug: q.destination }, '_id'); filter.destination = d?._id; }
  if (q.minPrice || q.maxPrice) filter.basePrice = { ...(q.minPrice && { $gte: q.minPrice }), ...(q.maxPrice && { $lte: q.maxPrice }) };
  if (q.minDays || q.maxDays) filter.durationDays = { ...(q.minDays && { $gte: q.minDays }), ...(q.maxDays && { $lte: q.maxDays }) };
  if (q.minRating) filter.rating = { $gte: q.minRating };
  const [items, total] = await Promise.all([
    Package.find(filter).select('-itinerary -terms').populate('destination', 'name slug')
      .sort({ rating: -1 }).skip((q.page - 1) * q.limit).limit(q.limit).lean(),
    Package.countDocuments(filter),
  ]);
  ok(res, 'Packages', { items, total, page: q.page, pages: Math.ceil(total / q.limit) });
});

export const getPackage = asyncHandler(async (req, res) => {
  const p = await Package.findOne({ slug: req.params.slug, isPublished: true })
    .populate('destination', 'name slug location').populate('hotels', 'name slug pricePerNight rating').lean();
  if (!p) throw new ApiError(404, 'Package not found');
  ok(res, 'Package', p);
});
