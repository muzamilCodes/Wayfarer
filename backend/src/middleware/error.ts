import { ErrorRequestHandler, RequestHandler } from 'express';
import { ZodError } from 'zod';
import { ApiError } from '../utils/ApiError';
import { env } from '../config/env';

export const notFound: RequestHandler = (_req, res) =>
  res.status(404).json({ success: false, message: 'Route not found' });

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ZodError)
    return res.status(400).json({ success: false, message: 'Validation failed', errors: err.flatten().fieldErrors });
  if (err instanceof ApiError)
    return res.status(err.status).json({ success: false, message: err.message });
  if (err?.code === 11000)
    return res.status(409).json({ success: false, message: 'Duplicate value' });
  console.error(err);
  res.status(500).json({
    success: false,
    message: 'Something went wrong',
    ...(env.NODE_ENV !== 'production' && { stack: err?.stack }),
  });
};
