import { Schema, model } from 'mongoose';

const paymentSchema = new Schema({
  booking: { type: Schema.Types.ObjectId, ref: 'Booking', required: true, index: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  provider: { type: String, default: 'razorpay' },
  orderId: { type: String, index: true },
  paymentId: { type: String, index: true },
  amount: { type: Number, required: true },        // INR
  status: { type: String, enum: ['created', 'paid', 'failed', 'refunded'], default: 'created' },
  refundId: String,
}, { timestamps: true });

export const Payment = model('Payment', paymentSchema);
