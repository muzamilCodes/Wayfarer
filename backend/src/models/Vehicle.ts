import { Schema, model } from 'mongoose';

const vehicleSchema = new Schema({
  category: { type: String, enum: ['sedan', 'suv', 'premium', 'tempo_traveller', 'bus'], required: true },
  name: { type: String, required: true },
  seats: { type: Number, required: true },
  pricePerKm: { type: Number, required: true, min: 0 },
  baseFare: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const Vehicle = model('Vehicle', vehicleSchema);
