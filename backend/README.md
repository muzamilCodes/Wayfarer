# Travel Platform — Phase 1 (backend foundation)

    cd backend && cp .env.example .env   # fill MONGODB_URI + two 16+ char JWT secrets
    npm install
    npm run seed     # demo data only
    npm run dev

Try: GET /api/destinations, GET /api/packages, GET /api/packages/kashmir-7-days,
POST /api/auth/register -> verify-email (OTP printed in the server console in dev) -> login.
Admin check: GET /api/admin/ping with the admin token.

Next: Phase 2 (Next.js frontend catalog + Cloudinary), then booking/payments.
