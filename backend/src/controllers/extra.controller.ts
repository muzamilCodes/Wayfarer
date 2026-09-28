import { z } from 'zod';
import { Activity } from '../models/Activity';
import { Blog } from '../models/Blog';
import { Destination } from '../models/Destination';
import { Enquiry } from '../models/Enquiry';
import { Hotel } from '../models/Hotel';
import { Vehicle } from '../models/Vehicle';
import { ApiError } from '../utils/ApiError';
import { asyncHandler } from '../utils/asyncHandler';
import { ok } from '../utils/response';

const pg = z.object({ page: z.coerce.number().min(1).default(1), limit: z.coerce.number().min(1).max(50).default(12), destination: z.string().optional() });

async function destFilter(slug?: string) {
  if (!slug) return {};
  const d = await Destination.findOne({ slug }, '_id');
  return { destination: d?._id };
}

const lister = (Model: any, sort: object) => asyncHandler(async (req, res) => {
  const q = pg.parse(req.query);
  const filter = { isPublished: true, ...(await destFilter(q.destination)) };
  const [items, total] = await Promise.all([
    Model.find(filter).populate('destination', 'name slug').sort(sort).skip((q.page - 1) * q.limit).limit(q.limit).lean(),
    Model.countDocuments(filter),
  ]);
  ok(res, 'OK', { items, total, page: q.page, pages: Math.ceil(total / q.limit) });
});

export const listHotels = lister(Hotel, { rating: -1 });
export const listActivities = lister(Activity, { price: 1 });

export const listVehicles = asyncHandler(async (_req, res) =>
  ok(res, 'Vehicles', { items: await Vehicle.find({ isActive: true }).sort({ seats: 1 }).lean() }));

export const listBlogs = asyncHandler(async (req, res) => {
  const q = pg.parse(req.query);
  const filter: any = { isPublished: true };
  if (typeof req.query.category === 'string') filter.category = req.query.category;
  const [items, total] = await Promise.all([
    Blog.find(filter).select('-content').sort({ createdAt: -1 }).skip((q.page - 1) * q.limit).limit(q.limit).lean(),
    Blog.countDocuments(filter),
  ]);
  ok(res, 'Blogs', { items, total, page: q.page, pages: Math.ceil(total / q.limit) });
});

export const getBlog = asyncHandler(async (req, res) => {
  const b = await Blog.findOne({ slug: req.params.slug, isPublished: true }).lean();
  if (!b) throw new ApiError(404, 'Article not found');
  ok(res, 'Article', b);
});

const enquirySchema = z.object({
  name: z.string().min(2).max(80), email: z.string().email(), phone: z.string().max(20).optional(),
  destination: z.string().max(80).optional(), travelDate: z.coerce.date().optional(),
  travellers: z.coerce.number().int().min(1).max(100).optional(), message: z.string().max(3000).optional(),
});

export const createEnquiry = asyncHandler(async (req, res) => {
  const e = await Enquiry.create(enquirySchema.parse(req.body));
  ok(res, 'Thanks! Our team will contact you shortly.', { id: e.id }, 201);
});
