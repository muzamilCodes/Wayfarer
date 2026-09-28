import { Schema, model } from 'mongoose';

const couponSchema = new Schema({
  code: { type: String, required: true, unique: true, uppercase: true, trim: true },
  type: { type: String, enum: ['percent', 'fixed'], required: true },
  value: { type: Number, required: true, min: 0 },
  minOrder: { type: Number, default: 0 },
  maxDiscount: Number,
  expiresAt: { type: Date, required: true },
  usageLimit: { type: Number, default: 0 },   // 0 = unlimited
  usedCount: { type: Number, default: 0 },
  user: { type: Schema.Types.ObjectId, ref: 'User' },  // user-specific coupon
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const Coupon = model('Coupon', couponSchema);
