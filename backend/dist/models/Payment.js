"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const mongoose_1 = require("mongoose");
const paymentSchema = new mongoose_1.Schema({
    booking: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Booking', required: true, index: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    provider: { type: String, default: 'razorpay' },
    orderId: { type: String, index: true },
    paymentId: { type: String, index: true },
    amount: { type: Number, required: true }, // INR
    status: { type: String, enum: ['created', 'paid', 'failed', 'refunded'], default: 'created' },
    refundId: String,
}, { timestamps: true });
exports.Payment = (0, mongoose_1.model)('Payment', paymentSchema);
