"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = exports.requireAuth = void 0;
const ApiError_1 = require("../utils/ApiError");
const tokens_1 = require("../utils/tokens");
const requireAuth = (req, _res, next) => {
    const h = req.headers.authorization;
    if (!h?.startsWith('Bearer '))
        return next(new ApiError_1.ApiError(401, 'Authentication required'));
    try {
        req.user = (0, tokens_1.verifyAccess)(h.slice(7));
        next();
    }
    catch {
        next(new ApiError_1.ApiError(401, 'Invalid or expired token'));
    }
};
exports.requireAuth = requireAuth;
const requireRole = (...roles) => (req, _res, next) => req.user && roles.includes(req.user.role) ? next() : next(new ApiError_1.ApiError(403, 'Forbidden'));
exports.requireRole = requireRole;
