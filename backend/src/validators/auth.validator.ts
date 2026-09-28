import { z } from 'zod';
const password = z.string().min(8).max(72);
export const registerSchema = z.object({
  name: z.string().min(2).max(80), email: z.string().email(), phone: z.string().optional(), password });
export const loginSchema = z.object({ email: z.string().email(), password: z.string().min(1) });
export const otpSchema = z.object({ email: z.string().email(), otp: z.string().length(6) });
export const emailSchema = z.object({ email: z.string().email() });
export const resetSchema = z.object({ email: z.string().email(), otp: z.string().length(6), password });
export const resendSchema = z.object({ email: z.string().email(), purpose: z.enum(['verify', 'reset']) });
