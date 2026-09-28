import { Schema, model } from 'mongoose';

const reviewSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  booking: { type: Schema.Types.ObjectId, ref: 'Booking', required: true, unique: true }, // one review per booking => verified
  package: { type: Schema.Types.ObjectId, ref: 'Package', index: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  text: { type: String, maxlength: 2000 },
  images: [String],
  status: { type: String, enum: ['pending', 'approved', 'rejected', 'hidden'], default: 'pending', index: true },
}, { timestamps: true });

export const Review = model('Review', reviewSchema);
