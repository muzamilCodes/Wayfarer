import { Schema, model } from 'mongoose';

const hotelSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  destination: { type: Schema.Types.ObjectId, ref: 'Destination', required: true, index: true },
  address: String,
  images: [{ url: String, publicId: String }],
  amenities: [String],
  pricePerNight: { type: Number, required: true, min: 0 },
  rating: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: true },
}, { timestamps: true });

export const Hotel = model('Hotel', hotelSchema);
