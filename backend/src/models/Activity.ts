import { Schema, model } from 'mongoose';

const activitySchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  destination: { type: Schema.Types.ObjectId, ref: 'Destination', required: true, index: true },
  description: String,
  images: [{ url: String, publicId: String }],
  durationHours: Number,
  price: { type: Number, required: true, min: 0 },
  minAge: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: true },
}, { timestamps: true });

export const Activity = model('Activity', activitySchema);
