"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activity = void 0;
const mongoose_1 = require("mongoose");
const activitySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    destination: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Destination', required: true, index: true },
    description: String,
    images: [{ url: String, publicId: String }],
    durationHours: Number,
    price: { type: Number, required: true, min: 0 },
    minAge: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
}, { timestamps: true });
exports.Activity = (0, mongoose_1.model)('Activity', activitySchema);
