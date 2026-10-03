"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resendSchema = exports.resetSchema = exports.emailSchema = exports.otpSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
const password = zod_1.z.string().min(8).max(72);
exports.registerSchema = zod_1.z.object({
    name: zod_1.z.string().min(2).max(80), email: zod_1.z.string().email(), phone: zod_1.z.string().optional(), password
});
exports.loginSchema = zod_1.z.object({ email: zod_1.z.string().email(), password: zod_1.z.string().min(1) });
exports.otpSchema = zod_1.z.object({ email: zod_1.z.string().email(), otp: zod_1.z.string().length(6) });
exports.emailSchema = zod_1.z.object({ email: zod_1.z.string().email() });
exports.resetSchema = zod_1.z.object({ email: zod_1.z.string().email(), otp: zod_1.z.string().length(6), password });
exports.resendSchema = zod_1.z.object({ email: zod_1.z.string().email(), purpose: zod_1.z.enum(['verify', 'reset']) });
