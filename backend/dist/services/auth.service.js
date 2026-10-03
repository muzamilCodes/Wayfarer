"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const argon2_1 = __importDefault(require("argon2"));
const User_1 = require("../models/User");
const ApiError_1 = require("../utils/ApiError");
const tokens_1 = require("../utils/tokens");
const email_service_1 = require("./email.service");
const SUBJECT = { verify: 'Verify your email', reset: 'Reset your password', login: 'Your login code' };
const TTL = 10 * 60_000, COOLDOWN = 30_000;
async function issueTokens(user) {
    const userId = String(user.id || user._id);
    const payload = { sub: userId, role: user.role };
    const refresh = (0, tokens_1.signRefresh)(payload);
    await User_1.User.findByIdAndUpdate(userId, { refreshTokenHash: (0, tokens_1.sha256)(refresh) });
    return { accessToken: (0, tokens_1.signAccess)(payload), refreshToken: refresh };
}
/** Sends a code and returns the generated OTP. */
async function sendOtp(email, purpose) {
    const u = await User_1.User.findOne({ email }).select('+otpExpires');
    if (!u)
        return null;
    const otp = (0, tokens_1.genOtp)();
    await User_1.User.updateOne({ email }, { otpHash: (0, tokens_1.sha256)(otp), otpPurpose: purpose, otpExpires: new Date(Date.now() + TTL) });
    void (0, email_service_1.sendEmail)(email, SUBJECT[purpose], `Your code is ${otp}. It expires in 10 minutes. If you did not request it, ignore this email.`).catch(console.error);
    return otp;
}
async function checkOtp(email, otp, purpose) {
    const user = await User_1.User.findOne({ email }).select('+otpHash +otpPurpose +otpExpires');
    if (!user || user.otpPurpose !== purpose || !user.otpExpires || user.otpExpires < new Date() || user.otpHash !== (0, tokens_1.sha256)(otp))
        throw new ApiError_1.ApiError(400, 'Invalid or expired code');
    return user;
}
const publicUser = (u) => ({ id: u.id, name: u.name, email: u.email, role: u.role });
exports.authService = {
    async register(d) {
        const e = d.email.toLowerCase().trim();
        const existing = await User_1.User.findOne({ email: e });
        if (existing) {
            if (!existing.emailVerified) {
                existing.name = d.name;
                if (d.phone)
                    existing.phone = d.phone;
                existing.passwordHash = await argon2_1.default.hash(d.password);
                await existing.save();
                const otp = await sendOtp(existing.email, 'verify');
                return { id: existing.id, email: existing.email, devOtp: otp };
            }
            throw new ApiError_1.ApiError(409, 'Email already registered');
        }
        const passwordHash = await argon2_1.default.hash(d.password);
        const isAdmin = e === 'warmuzamil113@gmail.com' ||
            e === 'admin@wayfarer.com' ||
            e === 'admin@demo.local' ||
            e.startsWith('admin@');
        const user = await User_1.User.create({
            name: d.name,
            email: e,
            phone: d.phone,
            passwordHash,
            role: isAdmin ? 'admin' : 'user',
            emailVerified: false,
        });
        const otp = await sendOtp(user.email, 'verify');
        return { id: user.id, email: user.email, devOtp: otp };
    },
    async verifyEmail(email, otp) {
        const user = await checkOtp(email.toLowerCase(), otp, 'verify');
        user.emailVerified = true;
        user.otpHash = undefined;
        user.otpExpires = undefined;
        await user.save();
        void (0, email_service_1.sendEmail)(user.email, 'Welcome!', `Welcome aboard, ${user.name}.`).catch(console.error);
        const tokens = await issueTokens(user);
        return { user: publicUser(user), ...tokens };
    },
    async resendOtp(email, purpose) {
        const e = email.toLowerCase();
        if (purpose === 'verify' && (await User_1.User.exists({ email: e, emailVerified: true })))
            return;
        await sendOtp(e, purpose);
    },
    async login(email, password) {
        const user = await User_1.User.findOne({ email: email.toLowerCase() }).select('+passwordHash');
        if (!user || !user.isActive || !(await argon2_1.default.verify(user.passwordHash, password)))
            throw new ApiError_1.ApiError(401, 'Invalid email or password');
        if (!user.emailVerified) {
            await sendOtp(user.email, 'verify');
            throw new ApiError_1.ApiError(403, 'Please verify your email first. We sent you a new code.');
        }
        return { user: publicUser(user), ...(await issueTokens(user)) };
    },
    /** Passwordless OTP login: auto-provisions account if needed, sets admin role for admin emails */
    async requestLoginOtp(email) {
        const e = email.toLowerCase().trim();
        let user = await User_1.User.findOne({ email: e });
        const isAdmin = e === 'warmuzamil113@gmail.com' ||
            e === 'admin@wayfarer.com' ||
            e === 'admin@demo.local' ||
            e.startsWith('admin@');
        if (!user) {
            user = await User_1.User.create({
                name: isAdmin ? 'Wayfarer Administrator' : e.split('@')[0],
                email: e,
                emailVerified: true,
                role: isAdmin ? 'admin' : 'user',
                passwordHash: await argon2_1.default.hash('OtpLoginOnly123!'),
            });
        }
        else {
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
    async loginWithOtp(email, otp) {
        const user = await checkOtp(email.toLowerCase(), otp, 'login');
        if (!user.isActive)
            throw new ApiError_1.ApiError(403, 'Account disabled');
        user.otpHash = undefined;
        user.otpExpires = undefined;
        await user.save();
        return { user: publicUser(user), ...(await issueTokens(user)) };
    },
    async refresh(token) {
        if (!token)
            throw new ApiError_1.ApiError(401, 'No refresh token');
        let p;
        try {
            p = (0, tokens_1.verifyRefresh)(token);
        }
        catch {
            throw new ApiError_1.ApiError(401, 'Invalid refresh token');
        }
        const user = await User_1.User.findById(p.sub).select('+refreshTokenHash');
        if (!user || user.refreshTokenHash !== (0, tokens_1.sha256)(token))
            throw new ApiError_1.ApiError(401, 'Refresh token revoked');
        return issueTokens(user);
    },
    async logout(userId) { await User_1.User.findByIdAndUpdate(userId, { $unset: { refreshTokenHash: 1 } }); },
    async forgotPassword(email) { await sendOtp(email.toLowerCase(), 'reset'); },
    async resetPassword(email, otp, password) {
        const user = await checkOtp(email.toLowerCase(), otp, 'reset');
        user.passwordHash = await argon2_1.default.hash(password);
        user.otpHash = undefined;
        user.otpExpires = undefined;
        user.refreshTokenHash = undefined;
        await user.save();
    },
    issueTokens,
};
