"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ['user', 'admin', 'staff', 'travel_manager'], default: 'user', index: true },
    emailVerified: { type: Boolean, default: false },
    otpHash: { type: String, select: false },
    otpPurpose: { type: String, enum: ['verify', 'reset', 'login'], select: false },
    otpExpires: { type: Date, select: false },
    refreshTokenHash: { type: String, select: false },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
exports.User = (0, mongoose_1.model)('User', userSchema);
