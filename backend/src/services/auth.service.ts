import argon2 from 'argon2';
import { User } from '../models/User';
import { ApiError } from '../utils/ApiError';
import { genOtp, sha256, signAccess, signRefresh, verifyRefresh } from '../utils/tokens';
import { sendEmail } from './email.service';

type Purpose = 'verify' | 'reset' | 'login';
const SUBJECT: Record<Purpose, string> = { verify: 'Verify your email', reset: 'Reset your password', login: 'Your login code' };
const TTL = 10 * 60_000, COOLDOWN = 30_000;

async function issueTokens(user: any) {
  const userId = String(user.id || user._id);
  const payload = { sub: userId, role: user.role };
  const refresh = signRefresh(payload);
  await User.findByIdAndUpdate(userId, { refreshTokenHash: sha256(refresh) });
  return { accessToken: signAccess(payload), refreshToken: refresh };
}

/** Sends a code and returns the generated OTP. */
async function sendOtp(email: string, purpose: Purpose) {
  const u = await User.findOne({ email }).select('+otpExpires');
  if (!u) return null;
  const otp = genOtp();
  await User.updateOne({ email }, { otpHash: sha256(otp), otpPurpose: purpose, otpExpires: new Date(Date.now() + TTL) });
  await sendEmail(email, SUBJECT[purpose], `Your code is ${otp}. It expires in 10 minutes. If you did not request it, ignore this email.`);
  return otp;
}

async function checkOtp(email: string, otp: string, purpose: Purpose) {
  const user = await User.findOne({ email }).select('+otpHash +otpPurpose +otpExpires');
  if (!user || user.otpPurpose !== purpose || !user.otpExpires || user.otpExpires < new Date() || user.otpHash !== sha256(otp))
    throw new ApiError(400, 'Invalid or expired code');
  return user;
}

const publicUser = (u: any) => ({ id: u.id, name: u.name, email: u.email, role: u.role });

export const authService = {
  async register(d: { name: string; email: string; phone?: string; password: string }) {
    const e = d.email.toLowerCase();
    if (await User.exists({ email: e })) throw new ApiError(409, 'Email already registered');
    const passwordHash = await argon2.hash(d.password);
    const isAdmin =
      e === 'warmuzamil113@gmail.com' ||
      e === 'admin@wayfarer.com' ||
      e === 'admin@demo.local' ||
      e.startsWith('admin@');
    const user = await User.create({
      name: d.name,
      email: e,
      phone: d.phone,
      passwordHash,
      role: isAdmin ? 'admin' : 'user',
      emailVerified: isAdmin,
    });
    const otp = await sendOtp(user.email, 'verify');
    return { id: user.id, email: user.email, devOtp: otp };
  },

  async verifyEmail(email: string, otp: string) {
    const user = await checkOtp(email.toLowerCase(), otp, 'verify');
    user.emailVerified = true; user.otpHash = undefined; user.otpExpires = undefined;
    await user.save();
    await sendEmail(user.email, 'Welcome!', `Welcome aboard, ${user.name}.`);
    return issueTokens(user);
  },

  async resendOtp(email: string, purpose: 'verify' | 'reset') {
    const e = email.toLowerCase();
    if (purpose === 'verify' && (await User.exists({ email: e, emailVerified: true }))) return;
    await sendOtp(e, purpose);
  },

  async login(email: string, password: string) {
    const user = await User.findOne({ email: email.toLowerCase() }).select('+passwordHash');
    if (!user || !user.isActive || !(await argon2.verify(user.passwordHash, password)))
      throw new ApiError(401, 'Invalid email or password');
    if (!user.emailVerified) { await sendOtp(user.email, 'verify'); throw new ApiError(403, 'Please verify your email first. We sent you a new code.'); }
    return { user: publicUser(user), ...(await issueTokens(user)) };
  },

  /** Passwordless OTP login: auto-provisions account if needed, sets admin role for admin emails */
  async requestLoginOtp(email: string) {
    const e = email.toLowerCase().trim();
    let user = await User.findOne({ email: e });
    const isAdmin =
      e === 'warmuzamil113@gmail.com' ||
      e === 'admin@wayfarer.com' ||
      e === 'admin@demo.local' ||
      e.startsWith('admin@');

    if (!user) {
      user = await User.create({
        name: isAdmin ? 'Wayfarer Administrator' : e.split('@')[0],
        email: e,
        emailVerified: true,
        role: isAdmin ? 'admin' : 'user',
        passwordHash: await argon2.hash('OtpLoginOnly123!'),
      });
    } else {
      if (!user.emailVerified) {
        user.emailVerified = true;
        await user.save();
      }
      if (isAdmin && user.role !== 'admin') {
        user.role = 'admin';
        await user.save();
      }
    }
    const otp = await sendOtp(e, 'login');
    return otp;
  },

  async loginWithOtp(email: string, otp: string) {
    const user = await checkOtp(email.toLowerCase(), otp, 'login');
    if (!user.isActive) throw new ApiError(403, 'Account disabled');
    user.otpHash = undefined; user.otpExpires = undefined; await user.save();
    return { user: publicUser(user), ...(await issueTokens(user)) };
  },

  async refresh(token?: string) {
    if (!token) throw new ApiError(401, 'No refresh token');
    let p; try { p = verifyRefresh(token); } catch { throw new ApiError(401, 'Invalid refresh token'); }
    const user = await User.findById(p.sub).select('+refreshTokenHash');
    if (!user || user.refreshTokenHash !== sha256(token)) throw new ApiError(401, 'Refresh token revoked');
    return issueTokens(user);
  },

  async logout(userId: string) { await User.findByIdAndUpdate(userId, { $unset: { refreshTokenHash: 1 } }); },

  async forgotPassword(email: string) { await sendOtp(email.toLowerCase(), 'reset'); },

  async resetPassword(email: string, otp: string, password: string) {
    const user = await checkOtp(email.toLowerCase(), otp, 'reset');
    user.passwordHash = await argon2.hash(password);
    user.otpHash = undefined; user.otpExpires = undefined; user.refreshTokenHash = undefined;
    await user.save();
  },

  issueTokens,
};
