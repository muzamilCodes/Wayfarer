"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const auth = __importStar(require("../controllers/auth.controller"));
const catalog = __importStar(require("../controllers/catalog.controller"));
const extra = __importStar(require("../controllers/extra.controller"));
const admin = __importStar(require("../controllers/admin.controller"));
const auth_1 = require("../middleware/auth");
const rateLimit_1 = require("../middleware/rateLimit");
const r = (0, express_1.Router)();
const enquiryLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 60_000,
    limit: 10,
    message: { success: false, message: 'Too many enquiries, try later' },
});
// Authentication routes
r.post('/auth/register', rateLimit_1.authLimiter, auth.register);
r.post('/auth/verify-email', rateLimit_1.authLimiter, auth.verifyEmail);
r.post('/auth/resend-otp', rateLimit_1.authLimiter, auth.resendOtp);
r.post('/auth/login', rateLimit_1.authLimiter, auth.login);
r.post('/auth/google', rateLimit_1.authLimiter, auth.googleAuth);
r.post('/auth/login-otp/request', rateLimit_1.authLimiter, auth.loginOtpRequest);
r.post('/auth/login-otp/verify', rateLimit_1.authLimiter, auth.loginOtpVerify);
r.post('/auth/refresh', auth.refresh);
r.post('/auth/logout', auth_1.requireAuth, auth.logout);
r.post('/auth/forgot-password', rateLimit_1.authLimiter, auth.forgotPassword);
r.post('/auth/reset-password', rateLimit_1.authLimiter, auth.resetPassword);
r.get('/auth/me', auth_1.requireAuth, auth.me);
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
const adminAuth = [auth_1.requireAuth, (0, auth_1.requireRole)('admin')];
r.get('/admin/ping', ...adminAuth, (_req, res) => res.json({ success: true, message: 'admin ok', data: {} }));
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
exports.default = r;
