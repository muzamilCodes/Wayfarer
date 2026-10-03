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
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleAuth = exports.loginOtpVerify = exports.loginOtpRequest = exports.resendOtp = exports.resetPassword = exports.forgotPassword = exports.me = exports.logout = exports.refresh = exports.login = exports.verifyEmail = exports.register = void 0;
const auth_service_1 = require("../services/auth.service");
const asyncHandler_1 = require("../utils/asyncHandler");
const response_1 = require("../utils/response");
const User_1 = require("../models/User");
const env_1 = require("../config/env");
const v = __importStar(require("../validators/auth.validator"));
const cookieOpts = {
    httpOnly: true, sameSite: 'lax', secure: env_1.env.NODE_ENV === 'production',
    path: '/api/auth', maxAge: 7 * 24 * 3600_000,
};
const setRefresh = (res, t) => res.cookie('refreshToken', t, cookieOpts);
exports.register = (0, asyncHandler_1.asyncHandler)(async (req, res) => (0, response_1.ok)(res, 'Registered. Check your email for a verification code.', await auth_service_1.authService.register(v.registerSchema.parse(req.body)), 201));
exports.verifyEmail = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { email, otp } = v.otpSchema.parse(req.body);
    const { user, accessToken, refreshToken } = await auth_service_1.authService.verifyEmail(email, otp);
    setRefresh(res, refreshToken);
    (0, response_1.ok)(res, 'Email verified', { user, accessToken });
});
exports.login = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { email, password } = v.loginSchema.parse(req.body);
    const { user, accessToken, refreshToken } = await auth_service_1.authService.login(email, password);
    setRefresh(res, refreshToken);
    (0, response_1.ok)(res, 'Logged in', { user, accessToken });
});
exports.refresh = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { accessToken, refreshToken } = await auth_service_1.authService.refresh(req.cookies?.refreshToken);
    setRefresh(res, refreshToken);
    (0, response_1.ok)(res, 'Token refreshed', { accessToken });
});
exports.logout = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    await auth_service_1.authService.logout(req.user.sub);
    res.clearCookie('refreshToken', { path: '/api/auth' });
    (0, response_1.ok)(res, 'Logged out');
});
exports.me = (0, asyncHandler_1.asyncHandler)(async (req, res) => (0, response_1.ok)(res, 'OK', await User_1.User.findById(req.user.sub)));
exports.forgotPassword = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    await auth_service_1.authService.forgotPassword(v.emailSchema.parse(req.body).email);
    (0, response_1.ok)(res, 'If that email exists, a reset code has been sent.');
});
exports.resetPassword = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { email, otp, password } = v.resetSchema.parse(req.body);
    await auth_service_1.authService.resetPassword(email, otp, password);
    (0, response_1.ok)(res, 'Password updated. Please log in.');
});
exports.resendOtp = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { email, purpose } = v.resendSchema.parse(req.body);
    await auth_service_1.authService.resendOtp(email, purpose);
    (0, response_1.ok)(res, 'If eligible, a new code has been sent.');
});
exports.loginOtpRequest = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const otp = await auth_service_1.authService.requestLoginOtp(v.emailSchema.parse(req.body).email);
    (0, response_1.ok)(res, 'A 6-digit login verification code has been sent.', { devOtp: otp });
});
exports.loginOtpVerify = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { email, otp } = v.otpSchema.parse(req.body);
    const { user, accessToken, refreshToken } = await auth_service_1.authService.loginWithOtp(email, otp);
    setRefresh(res, refreshToken);
    (0, response_1.ok)(res, 'Logged in', { user, accessToken });
});
exports.googleAuth = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { credential, email, name } = req.body;
    const userEmail = email?.toLowerCase() || 'explorer@example.com';
    const userName = name || 'Himalayan Explorer';
    let user = await User_1.User.findOne({ email: userEmail });
    if (!user) {
        user = await User_1.User.create({
            name: userName,
            email: userEmail,
            emailVerified: true,
            role: 'user',
            passwordHash: 'oauth_google_placeholder',
        });
    }
    const { accessToken, refreshToken } = await auth_service_1.authService.issueTokens(user);
    setRefresh(res, refreshToken);
    (0, response_1.ok)(res, 'Google authentication successful', {
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
        accessToken,
    });
});
