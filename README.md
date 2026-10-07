# Wayfarer — Kashmir, Ladakh & Himalayan Tours

A full-stack, creative-frontend travel platform featuring real-time 3D animation on every route, robust authentication & authorization, resilient data caching with graceful seed fallbacks, and a complete administrative management area.

---

## 🏔️ Complete Directory of All Tourist Places (J&K)
👉 **[Read the Full Tourist Places Guide & Directory (All 20 Districts & 140+ Spots)](TOURIST_PLACES_README.md)**
- **Top 10 Trending Destinations**: Live Maps & Highlights
- **Kashmir Valley**: Srinagar, Gulmarg, Pahalgam, Sonamarg, Doodhpathri, Gurez, Lolab, Aharbal, Pulwama, Shopian
- **Jammu Division**: Vaishno Devi (Katra), Patnitop, Bhaderwah, Kishtwar, Jammu, Basohli, Samba, Ramban, Rajouri, Poonch
- **Actions**: Direct Google Maps links, Photo Galleries, Live Embeds for every tourist place.

---

## 🚀 Quick Setup & Getting Started

### 1. Backend Setup
```bash
cd backend
npm install
npm run seed     # Seeds demo destinations, tours, hotels, cabs, blogs, and admin user
npm run dev      # Runs Express API on http://localhost:5000
```
- **Default Seed Admin**: `admin@demo.local` / `ChangeMe123!`

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev      # Runs Next.js App Router on http://localhost:3000
```

---

## 🔐 Environment Variables

### Frontend (`frontend/.env.local` or `.env`)
```ini
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP=9682645127
NEXT_PUBLIC_PROTECT_ALL_PAGES=false
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

### Backend (`backend/.env`)
```ini
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:3000
MONGODB_URI=mongodb://127.0.0.1:27017/TRAVEL2
JWT_SECRET=your_jwt_secret_min_32_characters
JWT_REFRESH_SECRET=your_jwt_refresh_secret_min_32_characters
```

---

## 🛡️ Route Protection & How to Toggle `PROTECT_ALL_PAGES`

Route access is managed via a single source of truth: [`frontend/route-access.ts`](file:///c:/Users/warmu/OneDrive/Desktop/WAYFARER/frontend/route-access.ts) and enforced by [`frontend/middleware.ts`](file:///c:/Users/warmu/OneDrive/Desktop/WAYFARER/frontend/middleware.ts).

### How to toggle `PROTECT_ALL_PAGES`:
Open `frontend/route-access.ts` and change line 7:
```typescript
// When true, EVERY page except /login and /signup (and recovery) requires authentication.
// Unauthenticated visitors are automatically redirected to /login?next=<original-url>.
export const PROTECT_ALL_PAGES = true; // or false (default)
```

### Route Access Rules:
- **Public Routes**: `/`, `/destinations`, `/tours`, `/hotels`, `/cabs`, `/activities`, `/blog`, `/about`, `/contact`, `/offers`, policy pages (`/terms`, `/privacy`, `/cancellation-policy`, `/refund-policy`), `/login`, `/signup`, `/forgot-password`, `/reset-password`, `/verify-email`
- **Login Required**: `/plan`, `/account`, `/bookings`, `/checkout`
- **Admin Only**: `/admin/*` (Strictly verified on **both** Next.js middleware client-side and Express JWT middleware server-side)

---

## 👑 How to Make a User Admin

### Method 1: Via the Seed Script (Development)
Run `npm run seed` inside `/backend`. This creates the demo admin:
- Email: `admin@demo.local`
- Password: `ChangeMe123!`

### Method 2: Via the `/admin` Dashboard Role Switcher
1. Log in as an existing admin (e.g. `admin@demo.local`).
2. Navigate to [`/admin`](http://localhost:3000/admin).
3. Click the **Users** tab.
4. Locate any user and click **Make Admin** to grant instant administrator privileges.

### Method 3: Via MongoDB / Backend API
Run an update query in Mongo Shell:
```javascript
db.users.updateOne({ email: "user@example.com" }, { $set: { role: "admin" } })
```

---

## 🏔️ 3D Animation Architecture

- **Smooth Scrolling**: Lenis smooth scrolling with spring physics.
- **Global Scene**: Real-time falling snow particles ([`ParticlesSnow.tsx`](file:///c:/Users/warmu/OneDrive/Desktop/WAYFARER/frontend/components/3d/ParticlesSnow.tsx)) + soft aurora ambient gradient.
- **Atmospheric Cursor**: Radial desktop cursor glow with spring interpolation ([`CursorGlow.tsx`](file:///c:/Users/warmu/OneDrive/Desktop/WAYFARER/frontend/components/3d/CursorGlow.tsx)).
- **Progress Tracking**: Hardware-accelerated top scroll progress bar ([`ScrollProgress.tsx`](file:///c:/Users/warmu/OneDrive/Desktop/WAYFARER/frontend/components/3d/ScrollProgress.tsx)).
- **Interactive 3D Tilt Cards**: [`TiltCard3D.tsx`](file:///c:/Users/warmu/OneDrive/Desktop/WAYFARER/frontend/components/3d/TiltCard3D.tsx) on destinations, packages, hotels, cabs, and offers with mouse tracking, dynamic glare, and 3D depth layers.
- **Procedural Floating 3D Elements**: [`FloatingIcon3D.tsx`](file:///c:/Users/warmu/OneDrive/Desktop/WAYFARER/frontend/components/3d/FloatingIcon3D.tsx) rendering 3D mountain peaks, hotels, cabs, Dal Lake shikaras, skis, boots, compasses, envelopes, and discount tags.
- **Interactive 3D Globe**: Rotates with mouse interaction, shows flight arcs, and focuses on markers (Kashmir, Delhi, Dubai, Bali, Paris).
- **3D Snow Globe Scene**: Split layout on `/login`, `/signup`, `/forgot-password`, `/reset-password`, and `/verify-email`.
- **Performance & A11y**: Dynamic imports with `ssr: false`, Suspense fallbacks, automatic render pausing when out of view, DPR clamped to `[1, 1.5]`, and full support for `prefers-reduced-motion`.
