import NextAuth, { type NextAuthOptions } from 'next-auth';
// Prisma adapter for NextAuth, optional and can be removed
import { env } from '@/env/server.mjs';
import {
  events,
  jwtCallback,
  // maxAge,
  providers,
  redirectCallback,
  sessionCallback,
  signInCallback,
} from '@/lib/next-auth';
import { prisma } from '@/server/db/client';
import { debug as globalDebug, dev, ONE_DAY } from '@/utils';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
const debug: boolean = globalDebug || true;

export const authOptions: NextAuthOptions = {
  debug,
  logger: {
    warn: (code) => dev.log('next-auth:warning: ', code),
    error: (code) => dev.error('next-auth:error: ', code),
    debug: (code, metadata) =>
      dev.log('next-auth:debug: ', { code, metadata }, true),
  },
  cookies: {
    //
  },
  jwt: {
    maxAge: 30 * ONE_DAY,
    secret: env.NEXTAUTH_SECRET,
  },
  session: {
    maxAge: 30 * ONE_DAY,
    strategy: 'database',
  },
  callbacks: {
    redirect: redirectCallback,
    signIn: signInCallback,
    jwt: jwtCallback,
    session: sessionCallback,
  },

  adapter: PrismaAdapter(prisma),
  providers,

  /**
   * overwite default next-auth auth pages
   * @link: https://next-auth.js.org/configuration/pages
   * */
  pages: {
    signIn: '/auth/signin',
    //   signOut: '/auth/signout',
    //   error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/register', // New users will be directed here on first sign in
    // NOTE: see here for error handling: https://next-auth.js.org/configuration/pages#error-codes
  },

  // @link: https://next-auth.js.org/configuration/options#events
  events,
};

export default NextAuth(authOptions);
