"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enquiry = void 0;
const mongoose_1 = require("mongoose");
const enquirySchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String, maxlength: 20 },
    destination: { type: String, maxlength: 80 },
    travelDate: Date,
    travellers: { type: Number, min: 1, max: 100 },
    message: { type: String, maxlength: 3000 },
    status: { type: String, enum: ['new', 'contacted', 'closed'], default: 'new', index: true },
}, { timestamps: true });
exports.Enquiry = (0, mongoose_1.model)('Enquiry', enquirySchema);
