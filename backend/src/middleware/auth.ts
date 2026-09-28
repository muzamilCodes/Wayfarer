import { RequestHandler } from 'express';
import { ApiError } from '../utils/ApiError';
import { JwtPayload, Role, verifyAccess } from '../utils/tokens';

declare global { namespace Express { interface Request { user?: JwtPayload } } }

export const requireAuth: RequestHandler = (req, _res, next) => {
  const h = req.headers.authorization;
  if (!h?.startsWith('Bearer ')) return next(new ApiError(401, 'Authentication required'));
  try { req.user = verifyAccess(h.slice(7)); next(); }
  catch { next(new ApiError(401, 'Invalid or expired token')); }
};

export const requireRole = (...roles: Role[]): RequestHandler => (req, _res, next) =>
  req.user && roles.includes(req.user.role) ? next() : next(new ApiError(403, 'Forbidden'));
