import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { dev } from './utils';

export async function middleware(req: NextRequest) {
  const start = Date.now();
  dev.log('middleware running...', { start }, true);
  //token will exist if user is logged in
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  dev.log('token at middleware', token);

  const { pathname } = req.nextUrl;

  if (pathname.includes('api/auth') || token) {
    dev.log('response.next at middleware');
    return NextResponse.next();
  }

  //redirect them to login if they don't have token and are
  //requesting a protected route

  const protectedRoutes = ['admin', 'me'];

  const isProtectedRoute = protectedRoutes.every((path) => path === pathname);

  if (!token && isProtectedRoute) {
    console.log('redirect to login middleware');
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }

  const end = Date.now();
  dev.log('middleware ended', { start, end, elapsed: end - start });
}

export const config = {
  matcher: '/',
};
