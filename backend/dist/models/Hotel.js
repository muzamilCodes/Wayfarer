"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hotel = void 0;
const mongoose_1 = require("mongoose");
const hotelSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    destination: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Destination', required: true, index: true },
    address: String,
    images: [{ url: String, publicId: String }],
    amenities: [String],
    pricePerNight: { type: Number, required: true, min: 0 },
    rating: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
}, { timestamps: true });
exports.Hotel = (0, mongoose_1.model)('Hotel', hotelSchema);
