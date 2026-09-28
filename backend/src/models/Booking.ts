import { Schema, model } from 'mongoose';

const lineItem = new Schema({
  kind: { type: String, enum: ['package', 'hotel', 'vehicle', 'activity'], required: true },
  refId: { type: Schema.Types.ObjectId, required: true },
  title: String,
  quantity: { type: Number, default: 1 },
  unitPrice: { type: Number, required: true },   // snapshot at booking time
}, { _id: false });

const bookingSchema = new Schema({
  bookingId: { type: String, unique: true, index: true },   // TRV-2026-000123
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  items: { type: [lineItem], validate: (v: unknown[]) => v.length > 0 },
  travelDate: { type: Date, required: true },
  adults: { type: Number, min: 1, default: 1 },
  children: { type: Number, min: 0, default: 0 },
  travellers: [{ name: String, age: Number, gender: String }],
  subtotal: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  total: { type: Number, required: true },
  coupon: String,
  status: { type: String,
    enum: ['pending', 'confirmed', 'payment_failed', 'processing', 'completed', 'cancelled', 'refunded'],
    default: 'pending', index: true },
}, { timestamps: true });

export const Booking = model('Booking', bookingSchema);
