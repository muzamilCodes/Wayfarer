"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vehicle = void 0;
const mongoose_1 = require("mongoose");
const vehicleSchema = new mongoose_1.Schema({
    category: { type: String, enum: ['sedan', 'suv', 'premium', 'tempo_traveller', 'bus'], required: true },
    name: { type: String, required: true },
    seats: { type: Number, required: true },
    pricePerKm: { type: Number, required: true, min: 0 },
    baseFare: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
exports.Vehicle = (0, mongoose_1.model)('Vehicle', vehicleSchema);
