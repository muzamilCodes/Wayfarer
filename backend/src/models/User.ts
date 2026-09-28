import { Schema, model } from 'mongoose';

const userSchema = new Schema({
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

export const User = model('User', userSchema);
