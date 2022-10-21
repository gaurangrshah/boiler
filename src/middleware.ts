import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { dev } from './utils';

export async function middleware(req: NextRequest) {
  //token will exist if user is logged in
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  dev.log('token at middleware', token);

  const { pathname } = req.nextUrl;

  if (pathname.includes('api/auth') || token) {
    dev.log('respons.next at middleware');
    return NextResponse.next();
  }

  //redirect them to login if they don't have token and are
  //requesting a protected route
  if (!token && pathname !== '/auth/signin') {
    console.log('redirect to login middleware');
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }
}

export const config = {
  matcher: '/',
};
