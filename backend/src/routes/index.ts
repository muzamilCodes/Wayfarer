import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import * as auth from '../controllers/auth.controller';
import * as catalog from '../controllers/catalog.controller';
import * as extra from '../controllers/extra.controller';
import { requireAuth, requireRole } from '../middleware/auth';
import { authLimiter } from '../middleware/rateLimit';

const r = Router();
const enquiryLimiter = rateLimit({ windowMs: 60 * 60_000, limit: 10, message: { success: false, message: 'Too many enquiries, try later' } });

r.post('/auth/register', authLimiter, auth.register);
r.post('/auth/verify-email', authLimiter, auth.verifyEmail);
r.post('/auth/resend-otp', authLimiter, auth.resendOtp);
r.post('/auth/login', authLimiter, auth.login);
r.post('/auth/login-otp/request', authLimiter, auth.loginOtpRequest);
r.post('/auth/login-otp/verify', authLimiter, auth.loginOtpVerify);
r.post('/auth/refresh', auth.refresh);
r.post('/auth/logout', requireAuth, auth.logout);
r.post('/auth/forgot-password', authLimiter, auth.forgotPassword);
r.post('/auth/reset-password', authLimiter, auth.resetPassword);
r.get('/auth/me', requireAuth, auth.me);

r.get('/destinations', catalog.listDestinations);
r.get('/destinations/:slug', catalog.getDestination);
r.get('/packages', catalog.listPackages);
r.get('/packages/:slug', catalog.getPackage);
r.get('/hotels', extra.listHotels);
r.get('/activities', extra.listActivities);
r.get('/vehicles', extra.listVehicles);
r.get('/blogs', extra.listBlogs);
r.get('/blogs/:slug', extra.getBlog);
r.post('/enquiries', enquiryLimiter, extra.createEnquiry);

r.get('/admin/ping', requireAuth, requireRole('admin', 'staff', 'travel_manager'), (_q, s) => s.json({ success: true, message: 'admin ok', data: {} }));

export default r;
