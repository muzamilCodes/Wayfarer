"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    booking: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Booking', required: true, unique: true }, // one review per booking => verified
    package: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Package', index: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    text: { type: String, maxlength: 2000 },
    images: [String],
    status: { type: String, enum: ['pending', 'approved', 'rejected', 'hidden'], default: 'pending', index: true },
}, { timestamps: true });
exports.Review = (0, mongoose_1.model)('Review', reviewSchema);
