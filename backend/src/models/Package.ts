import { Schema, model } from 'mongoose';

const dayItinerary = new Schema({
  day: { type: Number, required: true },
  title: { type: String, required: true },
  description: String,
  meals: [String],
  stay: String,
}, { _id: false });

const packageSchema = new Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  destination: { type: Schema.Types.ObjectId, ref: 'Destination', required: true, index: true },
  durationDays: { type: Number, required: true, min: 1 },
  basePrice: { type: Number, required: true, min: 0 },       // per person, INR
  discountPercent: { type: Number, min: 0, max: 90, default: 0 },
  images: [{ url: String, publicId: String }],
  videos: [String],
  overview: String,
  highlights: [String],
  itinerary: [dayItinerary],
  hotels: [{ type: Schema.Types.ObjectId, ref: 'Hotel' }],
  activities: [{ type: Schema.Types.ObjectId, ref: 'Activity' }],
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

export const Package = model('Package', packageSchema);
