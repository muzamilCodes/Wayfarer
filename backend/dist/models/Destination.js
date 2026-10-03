"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Destination = void 0;
const mongoose_1 = require("mongoose");
const destinationSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    region: { type: String, required: true, index: true },
    country: { type: String, default: 'India' },
    description: { type: String, required: true },
    images: [{ url: String, publicId: String }],
    location: { type: { type: String, enum: ['Point'], default: 'Point' }, coordinates: { type: [Number], required: true } },
    bestTime: String,
    startingPrice: { type: Number, min: 0, default: 0 },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    popularity: { type: Number, default: 0, index: true },
    isPublished: { type: Boolean, default: true, index: true },
}, { timestamps: true });
destinationSchema.index({ location: '2dsphere' });
exports.Destination = (0, mongoose_1.model)('Destination', destinationSchema);
