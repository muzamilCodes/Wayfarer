/**
 * Wayfarer Route Access Configuration
 * Controls authentication and role-based permissions across pages.
 */

/**
 * When set to true, EVERY page except /login and /signup (and auth reset/verify flows)
 * requires the user to be logged in.
 */
export const PROTECT_ALL_PAGES = false;

export const PUBLIC_ROUTES = [
  '/',
  '/destinations',
  '/tours',
  '/hotels',
  '/cabs',
  '/activities',
  '/blog',
  '/about',
  '/contact',
  '/offers',
  '/terms',
  '/privacy',
  '/cancellation-policy',
  '/refund-policy',
  '/login',
  '/signup',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/verify-email',
];

export const AUTH_REQUIRED_ROUTES = [
  '/plan',
  '/account',
  '/bookings',
  '/checkout',
];

export const ADMIN_PREFIX = '/admin';

/** Check whether a given pathname is explicitly public */
export function isPublicPath(pathname: string): boolean {
  // Check exact matches or sub-routes of public paths (e.g. /destinations/srinagar, /blog/best-time...)
  return PUBLIC_ROUTES.some((route) => {
    if (route === '/') return pathname === '/';
    return pathname === route || pathname.startsWith(`${route}/`);
  });
}

/** Check whether a given pathname requires authentication */
export function requiresAuth(pathname: string): boolean {
  if (PROTECT_ALL_PAGES) {
    // Only /login, /signup, /register, and recovery are excluded when PROTECT_ALL_PAGES is active
    const allowed = ['/login', '/signup', '/register', '/forgot-password', '/reset-password', '/verify-email'];
    const isAllowed = allowed.some((r) => pathname === r || pathname.startsWith(`${r}/`));
    return !isAllowed;
  }

  return (
    pathname.startsWith(ADMIN_PREFIX) ||
    AUTH_REQUIRED_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`))
  );
}

/** Check whether a given pathname requires admin role */
export function requiresAdmin(pathname: string): boolean {
  return pathname === ADMIN_PREFIX || pathname.startsWith(`${ADMIN_PREFIX}/`);
}
