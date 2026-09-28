import { Schema, model } from 'mongoose';

const enquirySchema = new Schema({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  email: { type: String, required: true, lowercase: true },
  phone: { type: String, maxlength: 20 },
  destination: { type: String, maxlength: 80 },
  travelDate: Date,
  travellers: { type: Number, min: 1, max: 100 },
  message: { type: String, maxlength: 3000 },
  status: { type: String, enum: ['new', 'contacted', 'closed'], default: 'new', index: true },
}, { timestamps: true });

export const Enquiry = model('Enquiry', enquirySchema);
