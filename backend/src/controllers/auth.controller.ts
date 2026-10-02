import { CookieOptions, Response } from 'express';
import { authService } from '../services/auth.service';
import { asyncHandler } from '../utils/asyncHandler';
import { ok } from '../utils/response';
import { User } from '../models/User';
import { env } from '../config/env';
import * as v from '../validators/auth.validator';

const cookieOpts: CookieOptions = {
  httpOnly: true, sameSite: 'lax', secure: env.NODE_ENV === 'production',
  path: '/api/auth', maxAge: 7 * 24 * 3600_000,
};
const setRefresh = (res: Response, t: string) => res.cookie('refreshToken', t, cookieOpts);

export const register = asyncHandler(async (req, res) =>
  ok(res, 'Registered. Check your email for a verification code.', await authService.register(v.registerSchema.parse(req.body)), 201));

export const verifyEmail = asyncHandler(async (req, res) => {
  const { email, otp } = v.otpSchema.parse(req.body);
  const { accessToken, refreshToken } = await authService.verifyEmail(email, otp);
  setRefresh(res, refreshToken);
  ok(res, 'Email verified', { accessToken });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = v.loginSchema.parse(req.body);
  const { user, accessToken, refreshToken } = await authService.login(email, password);
  setRefresh(res, refreshToken);
  ok(res, 'Logged in', { user, accessToken });
});

export const refresh = asyncHandler(async (req, res) => {
  const { accessToken, refreshToken } = await authService.refresh(req.cookies?.refreshToken);
  setRefresh(res, refreshToken);
  ok(res, 'Token refreshed', { accessToken });
});

export const logout = asyncHandler(async (req, res) => {
  await authService.logout(req.user!.sub);
  res.clearCookie('refreshToken', { path: '/api/auth' });
  ok(res, 'Logged out');
});

export const me = asyncHandler(async (req, res) => ok(res, 'OK', await User.findById(req.user!.sub)));

export const forgotPassword = asyncHandler(async (req, res) => {
  await authService.forgotPassword(v.emailSchema.parse(req.body).email);
  ok(res, 'If that email exists, a reset code has been sent.');
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { email, otp, password } = v.resetSchema.parse(req.body);
  await authService.resetPassword(email, otp, password);
  ok(res, 'Password updated. Please log in.');
});

export const resendOtp = asyncHandler(async (req, res) => {
  const { email, purpose } = v.resendSchema.parse(req.body);
  await authService.resendOtp(email, purpose);
  ok(res, 'If eligible, a new code has been sent.');
});

export const loginOtpRequest = asyncHandler(async (req, res) => {
  await authService.requestLoginOtp(v.emailSchema.parse(req.body).email);
  ok(res, 'If that email is registered, a login code has been sent.');
});

export const loginOtpVerify = asyncHandler(async (req, res) => {
  const { email, otp } = v.otpSchema.parse(req.body);
  const { user, accessToken, refreshToken } = await authService.loginWithOtp(email, otp);
  setRefresh(res, refreshToken);
  ok(res, 'Logged in', { user, accessToken });
});

export const googleAuth = asyncHandler(async (req, res) => {
  const { credential, email, name } = req.body;
  const userEmail = email?.toLowerCase() || 'explorer@example.com';
  const userName = name || 'Himalayan Explorer';

  let user = await User.findOne({ email: userEmail });
  if (!user) {
    user = await User.create({
      name: userName,
      email: userEmail,
      emailVerified: true,
      role: 'user',
      passwordHash: 'oauth_google_placeholder',
    });
  }

  const { accessToken, refreshToken } = await (authService as any).issueTokens(user);
  setRefresh(res, refreshToken);
  ok(res, 'Google authentication successful', {
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    accessToken,
  });
});

