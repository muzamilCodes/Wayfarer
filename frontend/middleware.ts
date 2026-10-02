import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { requiresAuth, requiresAdmin, PROTECT_ALL_PAGES } from './route-access';

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Read session cookie
  const sessionCookie = request.cookies.get('wf_session')?.value;
  let user: { role?: string; email?: string } | null = null;

  if (sessionCookie) {
    try {
      user = JSON.parse(sessionCookie);
    } catch {
      user = null;
    }
  }

  const isAuthenticated = Boolean(user?.email);
  const isAdmin = user?.role === 'admin';

  // 1. Check if the page requires authentication (or if PROTECT_ALL_PAGES is enabled)
  if (requiresAuth(pathname) && !isAuthenticated) {
    const nextUrl = encodeURIComponent(pathname + search);
    const loginUrl = new URL(`/login?next=${nextUrl}`, request.url);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Check if route requires admin authorization
  if (requiresAdmin(pathname)) {
    if (!isAuthenticated) {
      const nextUrl = encodeURIComponent(pathname + search);
      const loginUrl = new URL(`/login?next=${nextUrl}`, request.url);
      return NextResponse.redirect(loginUrl);
    }

    if (!isAdmin) {
      // Forbidden: authenticated user is not an admin
      const forbiddenUrl = new URL('/account?error=admin_required', request.url);
      return NextResponse.redirect(forbiddenUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, svgs, etc.)
     * - api routes (/api/*)
     */
    '/((?!_next/static|_next/image|favicon.ico|images|api).*)',
  ],
};
