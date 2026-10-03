import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import { env } from './config/env';
import routes from './routes';
import { apiLimiter } from './middleware/rateLimit';
import { errorHandler, notFound } from './middleware/error';

export const app = express();
app.set('trust proxy', 1);
const allowedOrigins = [
  env.CLIENT_URL,
  env.FRONTEND_URL,
  'https://wayfarer-nine-delta.vercel.app',
  'https://sportify-kashmir1.vercel.app',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
  'http://127.0.0.1:3002',
].filter(Boolean);

app.use(helmet({ crossOriginResourcePolicy: false }));

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.includes(origin) ||
        /\.vercel\.app$/.test(origin) ||
        /^http:\/\/localhost:\d+$/.test(origin) ||
        /^http:\/\/127\.0\.0\.1:\d+$/.test(origin)
      ) {
        return callback(null, true);
      }
      return callback(null, false);
    },
    credentials: true,
  })
);
app.use(express.json({ limit: '100kb' }));
app.use(cookieParser());
app.use(hpp());
app.use('/api', apiLimiter, routes);
app.use(apiLimiter, routes);
app.get('/', (_req, res) =>
  res.json({
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
  })
);
app.get('/health', (_q, s) => s.json({ ok: true }));
app.use(notFound);
app.use(errorHandler);
