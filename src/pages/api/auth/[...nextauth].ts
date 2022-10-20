import { env } from '@/env/server.mjs';
import {
  events,
  jwtCallback,
  maxAge,
  providers,
  redirectCallback,
  sessionCallback,
  signInCallback,
} from '@/lib/next-auth';
import { prisma } from '@/server/db/client';
import { debug as globalDebug, dev } from '@/utils';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { type NextAuthOptions } from 'next-auth';

const debug: boolean = globalDebug || true;

export const authOptions: NextAuthOptions = {
  debug,
  logger: {
    warn: (code) => dev.log('next-auth:warning: ', code),
    error: (code) => dev.error('next-auth:error: ', code),
    debug: (code, metadata) =>
      dev.log('next-auth:debug: ', { code, metadata }, debug),
  },
  cookies: {
    //
  },
  jwt: {
    maxAge,
    secret: env.NEXTAUTH_SECRET,
  },
  session: {
    maxAge,
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

  pages: {
    /**
     * overwite default next-auth auth pages
     * @link: https://next-auth.js.org/configuration/pages
     *
     * */
    signIn: '/auth/signin',
    //   signOut: '/auth/signout',
    //   error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/register', // New users will be directed here on first sign in
    // NOTE: see here for error handling: https://next-auth.js.org/configuration/pages#error-codes
  },

  events,
};

export default NextAuth(authOptions);
