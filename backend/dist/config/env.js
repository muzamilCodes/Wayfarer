"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
require("dotenv/config");
const zod_1 = require("zod");
const schema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(['development', 'production', 'test']).default('development'),
    PORT: zod_1.z.coerce.number().default(5000),
    CLIENT_URL: zod_1.z.string().default('http://localhost:3001'),
    FRONTEND_URL: zod_1.z.string().optional(),
    MONGODB_URI: zod_1.z.string().default('mongodb://127.0.0.1:27017/TRAVEL2'),
    MONGO_URI: zod_1.z.string().optional(),
    JWT_SECRET: zod_1.z.string().min(16).default('jksdjksdhkskaajlkjJlkhAKJHSHGIUDSVKDhdkhsiuaskhuhffnjckjdsbhds@hbvjdsv,kjbfhdbsbjgjhg72fsgyus7'),
    JWT_REFRESH_SECRET: zod_1.z.string().min(16).default('super_secret_jwt_refresh_key_at_least_16_chars_long_travel_app'),
    SECRET_KEY: zod_1.z.string().optional(),
    // Brevo
    BREVO_API_KEY: zod_1.z.string().optional(),
    BREVO_SMTP_KEY: zod_1.z.string().optional(),
    BREVO_SENDER_EMAIL: zod_1.z.string().optional(),
    // Email Config
    EMAIL_FROM: zod_1.z.string().optional(),
    EMAIL_SENDER_EMAIL: zod_1.z.string().default('warmuzamil113@gmail.com'),
    EMAIL_SENDER_NAME: zod_1.z.string().default('Wayfarer J&K Travel'),
    // Gmail SMTP
    GMAIL_USER: zod_1.z.string().optional(),
    GMAIL_APP_PASSWORD: zod_1.z.string().optional(),
    SMTP_HOST: zod_1.z.string().default('smtp.gmail.com'),
    SMTP_PORT: zod_1.z.coerce.number().default(587),
    SMTP_SECURE: zod_1.z.preprocess((v) => v === 'true' || v === true, zod_1.z.boolean()).default(false),
    SMTP_USER: zod_1.z.string().optional(),
    SMTP_PASS: zod_1.z.string().optional(),
    // Cloudinary
    CLOUD_NAME: zod_1.z.string().optional(),
    CLOUD_API_KEY: zod_1.z.string().optional(),
    CLOUD_API_SECRET: zod_1.z.string().optional(),
    CLOUDINARY_CLOUD_NAME: zod_1.z.string().optional(),
    CLOUDINARY_API_KEY: zod_1.z.string().optional(),
    CLOUDINARY_API_SECRET: zod_1.z.string().optional(),
    // AWS SES
    AWS_SES_ACCESS_KEY: zod_1.z.string().optional(),
    AWS_SES_SECRET_KEY: zod_1.z.string().optional(),
    AWS_SES_REGION: zod_1.z.string().default('ap-south-1'),
    AWS_SES_VERIFIED_EMAIL: zod_1.z.string().optional(),
});
const raw = {
    ...process.env,
    MONGODB_URI: process.env.MONGODB_URI || process.env.MONGO_URI,
    CLIENT_URL: process.env.CLIENT_URL || process.env.FRONTEND_URL,
    JWT_SECRET: process.env.JWT_SECRET || process.env.SECRET_KEY,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || process.env.SECRET_KEY,
    EMAIL_SENDER_EMAIL: process.env.EMAIL_SENDER_EMAIL || process.env.BREVO_SENDER_EMAIL || process.env.EMAIL_FROM || 'warmuzamil113@gmail.com',
    GMAIL_USER: process.env.GMAIL_USER || process.env.SMTP_USER || 'warmuzamil113@gmail.com',
    GMAIL_APP_PASSWORD: process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS,
    CLOUD_NAME: process.env.CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME,
    CLOUD_API_KEY: process.env.CLOUD_API_KEY || process.env.CLOUDINARY_API_KEY,
    CLOUD_API_SECRET: process.env.CLOUD_API_SECRET || process.env.CLOUDINARY_API_SECRET,
};
const parsed = schema.safeParse(raw);
if (!parsed.success) {
    console.error('Invalid environment:', parsed.error.flatten().fieldErrors);
    process.exit(1);
}
exports.env = parsed.data;
