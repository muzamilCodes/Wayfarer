"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const hpp_1 = __importDefault(require("hpp"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const env_1 = require("./config/env");
const routes_1 = __importDefault(require("./routes"));
const rateLimit_1 = require("./middleware/rateLimit");
const error_1 = require("./middleware/error");
exports.app = (0, express_1.default)();
exports.app.set('trust proxy', 1);
const allowedOrigins = [
    env_1.env.CLIENT_URL,
    env_1.env.FRONTEND_URL,
    'https://wayfarer-nine-delta.vercel.app',
    'https://sportify-kashmir1.vercel.app',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
    'http://127.0.0.1:3002',
].filter(Boolean);
exports.app.use((0, helmet_1.default)({ crossOriginResourcePolicy: false }));
exports.app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.includes(origin) ||
            /\.vercel\.app$/.test(origin) ||
            /^http:\/\/localhost:\d+$/.test(origin) ||
            /^http:\/\/127\.0\.0\.1:\d+$/.test(origin)) {
            return callback(null, true);
        }
        return callback(null, false);
    },
    credentials: true,
}));
exports.app.use(express_1.default.json({ limit: '100kb' }));
exports.app.use((0, cookie_parser_1.default)());
exports.app.use((0, hpp_1.default)());
exports.app.use('/api', rateLimit_1.apiLimiter, routes_1.default);
exports.app.use(rateLimit_1.apiLimiter, routes_1.default);
exports.app.get('/', (_req, res) => res.json({
    name: 'Paradise Journey API',
    version: '1.0.0',
    status: 'online',
    health: '/health',
    endpoints: {
        auth: '/api/auth',
        destinations: '/api/destinations',
        packages: '/api/packages',
        hotels: '/api/hotels',
        activities: '/api/activities',
        blogs: '/api/blogs',
        bookings: '/api/bookings',
        admin: '/api/admin',
    },
    message: 'Welcome to Paradise Journey - The Himalayan Haven API.',
}));
exports.app.get('/health', (_q, s) => s.json({ ok: true }));
exports.app.use(error_1.notFound);
exports.app.use(error_1.errorHandler);
