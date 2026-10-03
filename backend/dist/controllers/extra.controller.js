"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEnquiry = exports.getBlog = exports.listBlogs = exports.listVehicles = exports.listActivities = exports.listHotels = void 0;
const zod_1 = require("zod");
const Activity_1 = require("../models/Activity");
const Blog_1 = require("../models/Blog");
const Destination_1 = require("../models/Destination");
const Enquiry_1 = require("../models/Enquiry");
const Hotel_1 = require("../models/Hotel");
const Vehicle_1 = require("../models/Vehicle");
const ApiError_1 = require("../utils/ApiError");
const asyncHandler_1 = require("../utils/asyncHandler");
const response_1 = require("../utils/response");
const pg = zod_1.z.object({ page: zod_1.z.coerce.number().min(1).default(1), limit: zod_1.z.coerce.number().min(1).max(50).default(12), destination: zod_1.z.string().optional() });
async function destFilter(slug) {
    if (!slug)
        return {};
    const d = await Destination_1.Destination.findOne({ slug }, '_id');
    return { destination: d?._id };
}
const lister = (Model, sort) => (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const q = pg.parse(req.query);
    const filter = { isPublished: true, ...(await destFilter(q.destination)) };
    const [items, total] = await Promise.all([
        Model.find(filter).populate('destination', 'name slug').sort(sort).skip((q.page - 1) * q.limit).limit(q.limit).lean(),
        Model.countDocuments(filter),
    ]);
    (0, response_1.ok)(res, 'OK', { items, total, page: q.page, pages: Math.ceil(total / q.limit) });
});
exports.listHotels = lister(Hotel_1.Hotel, { rating: -1 });
exports.listActivities = lister(Activity_1.Activity, { price: 1 });
exports.listVehicles = (0, asyncHandler_1.asyncHandler)(async (_req, res) => (0, response_1.ok)(res, 'Vehicles', { items: await Vehicle_1.Vehicle.find({ isActive: true }).sort({ seats: 1 }).lean() }));
exports.listBlogs = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const q = pg.parse(req.query);
    const filter = { isPublished: true };
    if (typeof req.query.category === 'string')
        filter.category = req.query.category;
    const [items, total] = await Promise.all([
        Blog_1.Blog.find(filter).select('-content').sort({ createdAt: -1 }).skip((q.page - 1) * q.limit).limit(q.limit).lean(),
        Blog_1.Blog.countDocuments(filter),
    ]);
    (0, response_1.ok)(res, 'Blogs', { items, total, page: q.page, pages: Math.ceil(total / q.limit) });
});
exports.getBlog = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const b = await Blog_1.Blog.findOne({ slug: req.params.slug, isPublished: true }).lean();
    if (!b)
        throw new ApiError_1.ApiError(404, 'Article not found');
    (0, response_1.ok)(res, 'Article', b);
});
const enquirySchema = zod_1.z.object({
    name: zod_1.z.string().min(2).max(80), email: zod_1.z.string().email(), phone: zod_1.z.string().max(20).optional(),
    destination: zod_1.z.string().max(80).optional(), travelDate: zod_1.z.coerce.date().optional(),
    travellers: zod_1.z.coerce.number().int().min(1).max(100).optional(), message: zod_1.z.string().max(3000).optional(),
});
exports.createEnquiry = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const e = await Enquiry_1.Enquiry.create(enquirySchema.parse(req.body));
    (0, response_1.ok)(res, 'Thanks! Our team will contact you shortly.', { id: e.id }, 201);
});
