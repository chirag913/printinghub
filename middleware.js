/* ============================================================
   Vercel Edge Middleware — real server-side auth for the admin.
   ------------------------------------------------------------
   This runs on Vercel's edge BEFORE any file is served, so the
   password is never sent to the browser and cannot be bypassed
   by viewing source or disabling JavaScript.

   Required environment variables (Vercel → Settings →
   Environment Variables):
     ADMIN_USER   the login name you give the client
     ADMIN_PASS   the password you give the client

   If either is missing, access is denied rather than left open.
   ============================================================ */

import { next } from '@vercel/edge';

export const config = {
  matcher: ['/admin.html', '/admin', '/api/publish']
};

/* Compare without leaking length/position through early exit. */
function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function unauthorized(message) {
  return new Response(message || 'Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="PrintingHub Admin", charset="UTF-8"',
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store'
    }
  });
}

export default function middleware(request) {
  const user = process.env.ADMIN_USER;
  const pass = process.env.ADMIN_PASS;

  // Fail closed: an unconfigured deployment must not expose the admin.
  if (!user || !pass) {
    return new Response(
      'Admin is not configured.\n\n' +
      'Set ADMIN_USER and ADMIN_PASS in your Vercel project settings ' +
      '(Settings -> Environment Variables), then redeploy.',
      { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' } }
    );
  }

  const header = request.headers.get('authorization') || '';
  if (!header.toLowerCase().startsWith('basic ')) return unauthorized();

  let decoded;
  try {
    decoded = atob(header.slice(6).trim());
  } catch (e) {
    return unauthorized('Malformed credentials.');
  }

  // Only split on the FIRST colon — passwords may contain colons.
  const i = decoded.indexOf(':');
  if (i === -1) return unauthorized('Malformed credentials.');

  const okUser = safeEqual(decoded.slice(0, i), user);
  const okPass = safeEqual(decoded.slice(i + 1), pass);
  if (!(okUser && okPass)) return unauthorized('Incorrect username or password.');

  // Authenticated — continue, but never let the response be cached publicly.
  return next({
    headers: {
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow'
    }
  });
}
