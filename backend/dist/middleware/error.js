"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFound = void 0;
const zod_1 = require("zod");
const ApiError_1 = require("../utils/ApiError");
const env_1 = require("../config/env");
const notFound = (_req, res) => res.status(404).json({ success: false, message: 'Route not found' });
exports.notFound = notFound;
const errorHandler = (err, _req, res, _next) => {
    if (err instanceof zod_1.ZodError)
        return res.status(400).json({ success: false, message: 'Validation failed', errors: err.flatten().fieldErrors });
    if (err instanceof ApiError_1.ApiError)
        return res.status(err.status).json({ success: false, message: err.message });
    if (err?.code === 11000)
        return res.status(409).json({ success: false, message: 'Duplicate value' });
    console.error(err);
    res.status(500).json({
        success: false,
        message: 'Something went wrong',
        ...(env_1.env.NODE_ENV !== 'production' && { stack: err?.stack }),
    });
};
exports.errorHandler = errorHandler;
