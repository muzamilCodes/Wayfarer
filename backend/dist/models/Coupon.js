"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coupon = void 0;
const mongoose_1 = require("mongoose");
const couponSchema = new mongoose_1.Schema({
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    type: { type: String, enum: ['percent', 'fixed'], required: true },
    value: { type: Number, required: true, min: 0 },
    minOrder: { type: Number, default: 0 },
    maxDiscount: Number,
    expiresAt: { type: Date, required: true },
    usageLimit: { type: Number, default: 0 }, // 0 = unlimited
    usedCount: { type: Number, default: 0 },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }, // user-specific coupon
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
exports.Coupon = (0, mongoose_1.model)('Coupon', couponSchema);
