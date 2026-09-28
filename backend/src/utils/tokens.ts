import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { env } from '../config/env';

export type Role = 'user' | 'admin' | 'staff' | 'travel_manager';
export interface JwtPayload { sub: string; role: Role }

export const signAccess = (p: JwtPayload) => jwt.sign(p, env.JWT_SECRET, { expiresIn: '15m' });
export const signRefresh = (p: JwtPayload) => jwt.sign(p, env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
export const verifyAccess = (t: string) => jwt.verify(t, env.JWT_SECRET) as JwtPayload;
export const verifyRefresh = (t: string) => jwt.verify(t, env.JWT_REFRESH_SECRET) as JwtPayload;
export const sha256 = (s: string) => crypto.createHash('sha256').update(s).digest('hex');
export const genOtp = () => crypto.randomInt(100000, 999999).toString();
