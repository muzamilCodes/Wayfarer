import { Response } from 'express';
export const ok = (res: Response, message: string, data: unknown = {}, status = 200) =>
  res.status(status).json({ success: true, message, data });
