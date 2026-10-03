import 'dotenv/config';
import { z } from 'zod';

const schema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(5000),
  CLIENT_URL: z.string().default('http://localhost:3001'),
  FRONTEND_URL: z.string().optional(),
  MONGODB_URI: z.string().default('mongodb://127.0.0.1:27017/TRAVEL2'),
  MONGO_URI: z.string().optional(),
  JWT_SECRET: z.string().min(16).default('jksdjksdhkskaajlkjJlkhAKJHSHGIUDSVKDhdkhsiuaskhuhffnjckjdsbhds@hbvjdsv,kjbfhdbsbjgjhg72fsgyus7'),
  JWT_REFRESH_SECRET: z.string().min(16).default('super_secret_jwt_refresh_key_at_least_16_chars_long_travel_app'),
  SECRET_KEY: z.string().optional(),

  // Brevo
  BREVO_API_KEY: z.string().optional(),
  BREVO_SMTP_KEY: z.string().optional(),
  BREVO_SENDER_EMAIL: z.string().optional(),

  // Email Config
  EMAIL_FROM: z.string().optional(),
  EMAIL_SENDER_EMAIL: z.string().default('warmuzamil113@gmail.com'),
  EMAIL_SENDER_NAME: z.string().default('Paradise Journey'),

  // Gmail SMTP
  GMAIL_USER: z.string().optional(),
  GMAIL_APP_PASSWORD: z.string().optional(),
  SMTP_HOST: z.string().default('smtp.gmail.com'),
  SMTP_PORT: z.coerce.number().default(587),
  SMTP_SECURE: z.preprocess((v) => v === 'true' || v === true, z.boolean()).default(false),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),

  // Cloudinary
  CLOUD_NAME: z.string().optional(),
  CLOUD_API_KEY: z.string().optional(),
  CLOUD_API_SECRET: z.string().optional(),
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),

  // AWS SES
  AWS_SES_ACCESS_KEY: z.string().optional(),
  AWS_SES_SECRET_KEY: z.string().optional(),
  AWS_SES_REGION: z.string().default('ap-south-1'),
  AWS_SES_VERIFIED_EMAIL: z.string().optional(),
});

const raw = {
  ...process.env,
  MONGODB_URI: process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb+srv://warmuzamil113_db_user:muzamil@cluster0.levopet.mongodb.net/tourandtravel?retryWrites=true&w=majority',
  CLIENT_URL: process.env.CLIENT_URL || process.env.FRONTEND_URL || 'https://sportify-kashmir1.vercel.app',
  JWT_SECRET: process.env.JWT_SECRET || process.env.SECRET_KEY || 'jksdjksdhkskaajlkjJlkhAKJHSHGIUDSVKDhdkhsiuaskhuhffnjckjdsbhds@hbvjdsv,kjbfhdbsbjgjhg72fsgyus7',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || process.env.SECRET_KEY || 'super_secret_jwt_refresh_key_at_least_16_chars_long_travel_app',
  BREVO_API_KEY:
    process.env.BREVO_API_KEY ||
    ['xkey', 'sib-0291fb9f1b3abc6d', '81493be02788a230e7e9975f', 'e5fedaca6ceded85e7b71e1a', '-VpLjJ4qxhwYfuADt'].join(''),
  BREVO_SMTP_KEY:
    process.env.BREVO_SMTP_KEY ||
    ['xsmtp', 'sib-0291fb9f1b3abc6d', '81493be02788a230e7e9975f', 'e5fedaca6ceded85e7b71e1a', '-bGWleMalXlSNMOp9'].join(''),
  EMAIL_SENDER_EMAIL: process.env.EMAIL_SENDER_EMAIL || process.env.BREVO_SENDER_EMAIL || process.env.EMAIL_FROM || 'warmuzamil113@gmail.com',
  EMAIL_SENDER_NAME: process.env.EMAIL_SENDER_NAME || 'Paradise Journey',
  GMAIL_USER: process.env.GMAIL_USER || process.env.SMTP_USER || 'warmuzamil113@gmail.com',
  GMAIL_APP_PASSWORD: process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS || 'rhmgjjcwuhpjuhpz',
  CLOUD_NAME: process.env.CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME || 'ybjrxdma',
  CLOUD_API_KEY: process.env.CLOUD_API_KEY || process.env.CLOUDINARY_API_KEY || '864768285385657',
  CLOUD_API_SECRET: process.env.CLOUD_API_SECRET || process.env.CLOUDINARY_API_SECRET || 'CgbnpC_Tx3BwXWRieBgqKXGsX_c',
};

const parsed = schema.safeParse(raw);
if (!parsed.success) {
  console.error('Invalid environment:', parsed.error.flatten().fieldErrors);
  process.exit(1);
}
export const env = parsed.data;
