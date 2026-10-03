"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Package = void 0;
const mongoose_1 = require("mongoose");
const dayItinerary = new mongoose_1.Schema({
    day: { type: Number, required: true },
    title: { type: String, required: true },
    description: String,
    meals: [String],
    stay: String,
}, { _id: false });
const packageSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    destination: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Destination', required: true, index: true },
    durationDays: { type: Number, required: true, min: 1 },
    basePrice: { type: Number, required: true, min: 0 }, // per person, INR
    discountPercent: { type: Number, min: 0, max: 90, default: 0 },
    images: [{ url: String, publicId: String }],
    videos: [String],
    overview: String,
    highlights: [String],
    itinerary: [dayItinerary],
    hotels: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Hotel' }],
    activities: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Activity' }],
    transport: String,
    included: [String],
    excluded: [String],
    pickupLocation: String,
    cancellationPolicy: String,
    terms: String,
    maxTravellers: { type: Number, default: 12 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: false, index: true },
}, { timestamps: true });
packageSchema.index({ basePrice: 1, durationDays: 1, rating: -1 });
exports.Package = (0, mongoose_1.model)('Package', packageSchema);
