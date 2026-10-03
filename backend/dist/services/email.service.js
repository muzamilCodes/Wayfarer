"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = sendEmail;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_1 = require("../config/env");
// Primary Transporter: Google Gmail SMTP with App Password
const gmailTransporter = env_1.env.GMAIL_USER && env_1.env.GMAIL_APP_PASSWORD
    ? nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: env_1.env.GMAIL_USER,
            pass: env_1.env.GMAIL_APP_PASSWORD.replace(/\s+/g, ''),
        },
    })
    : null;
/**
 * Sends transactional emails via Gmail SMTP (Google App Password) with Brevo fallback.
 * Includes a responsive, beautifully styled HTML template for OTP codes and account alerts.
 */
async function sendEmail(to, subject, text, customHtml) {
    console.log(`[email:dispatch] to=${to} subject="${subject}"`);
    // Detect 6-digit OTP code in text for dedicated badge highlight
    const otpMatch = text.match(/\b\d{6}\b/);
    const otpCode = otpMatch ? otpMatch[0] : null;
    const htmlContent = customHtml ||
        `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; }
          .container { max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.06); }
          .header { background: linear-gradient(135deg, #091e3a 0%, #1e3a5f 100%); padding: 32px 24px; text-align: center; }
          .logo { color: #f8fafc; font-size: 22px; font-weight: 800; letter-spacing: 3px; text-transform: uppercase; margin: 0; }
          .tagline { color: #94a3b8; font-size: 12px; margin-top: 6px; letter-spacing: 0.5px; }
          .body { padding: 32px 28px; color: #334155; line-height: 1.6; }
          .title { font-size: 18px; font-weight: 700; color: #0f172a; margin-top: 0; margin-bottom: 12px; }
          .message { font-size: 14px; color: #475569; margin-bottom: 20px; }
          .otp-box { background: #f0fdf4; border: 2px dashed #86efac; border-radius: 12px; padding: 20px; text-align: center; margin: 24px 0; }
          .otp-code { font-family: 'Courier New', Courier, monospace; font-size: 34px; font-weight: 800; letter-spacing: 8px; color: #059669; }
          .otp-expiry { font-size: 12px; color: #15803d; margin-top: 8px; font-weight: 500; }
          .footer { background: #f8fafc; border-top: 1px solid #f1f5f9; padding: 20px 24px; text-align: center; font-size: 11px; color: #94a3b8; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="logo">WAYFARER</h1>
            <div class="tagline">Jammu & Kashmir Himalayan Expeditions</div>
          </div>
          <div class="body">
            <h2 class="title">${subject}</h2>
            <p class="message">${text}</p>
            ${otpCode
            ? `
            <div class="otp-box">
              <div class="otp-code">${otpCode}</div>
              <div class="otp-expiry">This code expires in 10 minutes. Do not share it with anyone.</div>
            </div>
            `
            : ''}
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Wayfarer Travel. Srinagar & Jammu, J&K.</p>
            <p>If you did not make this request, you can safely ignore this email.</p>
          </div>
        </div>
      </body>
    </html>
  `;
    // 1. Try sending via Gmail SMTP (Google App Password)
    if (gmailTransporter) {
        try {
            const info = await gmailTransporter.sendMail({
                from: `"${env_1.env.EMAIL_SENDER_NAME}" <${env_1.env.GMAIL_USER}>`,
                to,
                subject,
                text,
                html: htmlContent,
            });
            console.log(`[email:gmail-smtp:success] Delivered to ${to} (MessageId: ${info.messageId})`);
            return;
        }
        catch (err) {
            console.warn('[email:gmail-smtp:error] Gmail SMTP failed, attempting Brevo fallback:', err.message);
        }
    }
    // 2. Fallback to Brevo REST API
    if (env_1.env.BREVO_API_KEY) {
        try {
            const res = await fetch('https://api.brevo.com/v3/smtp/email', {
                method: 'POST',
                headers: {
                    'api-key': env_1.env.BREVO_API_KEY,
                    'Content-Type': 'application/json',
                    accept: 'application/json',
                },
                body: JSON.stringify({
                    sender: {
                        name: env_1.env.EMAIL_SENDER_NAME,
                        email: env_1.env.EMAIL_SENDER_EMAIL,
                    },
                    to: [{ email: to }],
                    subject,
                    textContent: text,
                    htmlContent,
                }),
            });
            if (!res.ok) {
                const errJson = await res.json().catch(() => ({}));
                console.error('[email:brevo:error] Brevo API rejected email:', res.status, errJson);
            }
            else {
                const data = await res.json().catch(() => ({}));
                console.log(`[email:brevo:success] Delivered via Brevo to ${to} (MessageId: ${data.messageId})`);
                return;
            }
        }
        catch (err) {
            console.error('[email:brevo:exception] Brevo fallback failed:', err.message);
        }
    }
    console.warn('[email] No active email provider delivered the message. Logged to console only.');
}
