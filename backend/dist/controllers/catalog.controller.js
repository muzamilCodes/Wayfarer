"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPackage = exports.listPackages = exports.getDestination = exports.listDestinations = void 0;
const zod_1 = require("zod");
const Destination_1 = require("../models/Destination");
const Package_1 = require("../models/Package");
const ApiError_1 = require("../utils/ApiError");
const asyncHandler_1 = require("../utils/asyncHandler");
const response_1 = require("../utils/response");
const page = zod_1.z.object({ page: zod_1.z.coerce.number().min(1).default(1), limit: zod_1.z.coerce.number().min(1).max(50).default(12) });
exports.listDestinations = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { page: p, limit } = page.parse(req.query);
    const filter = { isPublished: true };
    if (typeof req.query.region === 'string')
        filter.region = req.query.region;
    const [items, total] = await Promise.all([
        Destination_1.Destination.find(filter).sort({ popularity: -1 }).skip((p - 1) * limit).limit(limit).lean(),
        Destination_1.Destination.countDocuments(filter),
    ]);
    (0, response_1.ok)(res, 'Destinations', { items, total, page: p, pages: Math.ceil(total / limit) });
});
exports.getDestination = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const d = await Destination_1.Destination.findOne({ slug: req.params.slug, isPublished: true }).lean();
    if (!d)
        throw new ApiError_1.ApiError(404, 'Destination not found');
    (0, response_1.ok)(res, 'Destination', d);
});
exports.listPackages = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const q = page.extend({
        destination: zod_1.z.string().optional(), minPrice: zod_1.z.coerce.number().optional(), maxPrice: zod_1.z.coerce.number().optional(),
        minDays: zod_1.z.coerce.number().optional(), maxDays: zod_1.z.coerce.number().optional(), minRating: zod_1.z.coerce.number().optional(),
    }).parse(req.query);
    const filter = { isPublished: true };
    if (q.destination) {
        const d = await Destination_1.Destination.findOne({ slug: q.destination }, '_id');
        filter.destination = d?._id;
    }
    if (q.minPrice || q.maxPrice)
        filter.basePrice = { ...(q.minPrice && { $gte: q.minPrice }), ...(q.maxPrice && { $lte: q.maxPrice }) };
    if (q.minDays || q.maxDays)
        filter.durationDays = { ...(q.minDays && { $gte: q.minDays }), ...(q.maxDays && { $lte: q.maxDays }) };
    if (q.minRating)
        filter.rating = { $gte: q.minRating };
    const [items, total] = await Promise.all([
        Package_1.Package.find(filter).select('-itinerary -terms').populate('destination', 'name slug')
            .sort({ rating: -1 }).skip((q.page - 1) * q.limit).limit(q.limit).lean(),
        Package_1.Package.countDocuments(filter),
    ]);
    (0, response_1.ok)(res, 'Packages', { items, total, page: q.page, pages: Math.ceil(total / q.limit) });
});
exports.getPackage = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const p = await Package_1.Package.findOne({ slug: req.params.slug, isPublished: true })
        .populate('destination', 'name slug location').populate('hotels', 'name slug pricePerNight rating').lean();
    if (!p)
        throw new ApiError_1.ApiError(404, 'Package not found');
    (0, response_1.ok)(res, 'Package', p);
});
