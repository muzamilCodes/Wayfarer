import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import * as auth from '../controllers/auth.controller';
import * as catalog from '../controllers/catalog.controller';
import * as extra from '../controllers/extra.controller';
import * as admin from '../controllers/admin.controller';
import { requireAuth, requireRole } from '../middleware/auth';
import { authLimiter } from '../middleware/rateLimit';

const r = Router();
const enquiryLimiter = rateLimit({
  windowMs: 60 * 60_000,
  limit: 10,
  message: { success: false, message: 'Too many enquiries, try later' },
});

// Authentication routes
r.post('/auth/register', authLimiter, auth.register);
r.post('/auth/verify-email', authLimiter, auth.verifyEmail);
r.post('/auth/resend-otp', authLimiter, auth.resendOtp);
r.post('/auth/login', authLimiter, auth.login);
r.post('/auth/google', authLimiter, auth.googleAuth);
r.post('/auth/login-otp/request', authLimiter, auth.loginOtpRequest);
r.post('/auth/login-otp/verify', authLimiter, auth.loginOtpVerify);
r.post('/auth/refresh', auth.refresh);
r.post('/auth/logout', requireAuth, auth.logout);
r.post('/auth/forgot-password', authLimiter, auth.forgotPassword);
r.post('/auth/reset-password', authLimiter, auth.resetPassword);
r.get('/auth/me', requireAuth, auth.me);

// Catalog public routes
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

// Admin-only routes (strictly protected by requireAuth + requireRole('admin'))
const adminAuth = [requireAuth, requireRole('admin')];

r.get('/admin/ping', ...adminAuth, (_req: any, res: any) => res.json({ success: true, message: 'admin ok', data: {} }));
r.get('/admin/stats', adminAuth, admin.getStats);

// Admin Tours / Packages
r.get('/admin/tours', adminAuth, admin.listTours);
r.post('/admin/tours', adminAuth, admin.createTour);
r.put('/admin/tours/:id', adminAuth, admin.updateTour);
r.delete('/admin/tours/:id', adminAuth, admin.deleteTour);

// Admin Destinations
r.get('/admin/destinations', adminAuth, admin.listDestinations);
r.post('/admin/destinations', adminAuth, admin.createDestination);
r.put('/admin/destinations/:id', adminAuth, admin.updateDestination);
r.delete('/admin/destinations/:id', adminAuth, admin.deleteDestination);

// Admin Hotels
r.get('/admin/hotels', adminAuth, admin.listHotels);
r.post('/admin/hotels', adminAuth, admin.createHotel);
r.put('/admin/hotels/:id', adminAuth, admin.updateHotel);
r.delete('/admin/hotels/:id', adminAuth, admin.deleteHotel);

// Admin Vehicles
r.get('/admin/vehicles', adminAuth, admin.listVehicles);
r.post('/admin/vehicles', adminAuth, admin.createVehicle);
r.put('/admin/vehicles/:id', adminAuth, admin.updateVehicle);
r.delete('/admin/vehicles/:id', adminAuth, admin.deleteVehicle);

// Admin Bookings
r.get('/admin/bookings', adminAuth, admin.listBookings);
r.put('/admin/bookings/:id', adminAuth, admin.updateBookingStatus);

// Admin Users
r.get('/admin/users', adminAuth, admin.listUsers);
r.put('/admin/users/:id/role', adminAuth, admin.updateUserRole);

export default r;
