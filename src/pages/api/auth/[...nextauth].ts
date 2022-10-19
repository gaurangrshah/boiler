import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import EmailProvider from 'next-auth/providers/email';
import SpotifyProvider from 'next-auth/providers/spotify';
// Prisma adapter for NextAuth, optional and can be removed
import { env } from '@/env/server.mjs';
import { authorize } from '@/lib/next-auth/authorize';
import { onCreateuser } from '@/lib/next-auth/onCreateUser';
import { prisma } from '@/server/db/client';
import { PrismaUser } from '@/types/zod/prisma';
import { debug as globalDebug, dev, omit, ONE_DAY, wait } from '@/utils';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

const debug: boolean = globalDebug || false;

export const authOptions: NextAuthOptions = {
  debug,
  jwt: {
    maxAge: 30 * ONE_DAY,
  },
  session: {
    maxAge: 30 * ONE_DAY,
    strategy: 'database',
  },
  callbacks: {
    redirect({ url, baseUrl }) {
      dev.log('callback:redirect', { url, baseUrl }, debug);
      return baseUrl;
    },
    signIn({ user, account, profile, email, credentials }) {
      dev.log(
        'callback:signin',
        {
          user,
          account,
          profile,
          email,
          credentials,
        },
        debug
      );
      return true;
    },
    jwt({ token, user, account, profile, isNewUser }) {
      dev.log(
        'callback:jwt',
        {
          token,
          user,
          account,
          profile,
          isNewUser,
        },
        debug
      );

      if (isNewUser) {
      }
      return token;
    },
    session({ session, user }) {
      dev.log('callback:session', { session, user }, debug);
      if (session.user) {
        session.user.id = user.id;
        session.user = omit(session.user, 'password') as PrismaUser;
      }
      dev.log('callback:session | session-omit-pw', session, debug);
      return session;
    },
  },

  adapter: PrismaAdapter(prisma),
  providers: [
    SpotifyProvider({
      clientId: env.SPOTIFY_CLIENT_ID,
      clientSecret: env.SPOTIFY_CLIENT_SECRET,
    }),

    EmailProvider({
      server: {
        host: env.SMTP_HOST,
        port: Number(env.SMTP_PORT),
        auth: {
          user: env.EMAIL_FROM,
          pass: env.SMTP_PASS,
        },
      },
      from: env.EMAIL_FROM,
      maxAge: ONE_DAY, // email login links valid for 24 hrs.

      /**
       * @link: https://next-auth.js.org/providers/email
       * tap into the builtin email verification request
       */
      // sendVerificationRequest({
      //   identifier: email,
      //   url,
      //   provider: { server, from },
      // }) {
      //   /* your function */
      // },
    }),

    CredentialsProvider({
      type: 'credentials',
      credentials: {
        // @link: https://next-auth.js.org/configuration/providers/credentials#how-to
        // The credentials is used to generate a suitable form on the sign in page.
        // You can specify whatever fields you are expecting to be submitted.
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'you@youremail.com',
        },
        password: { label: 'Password', type: 'password' },
      },

      authorize: async (
        credentials: Record<'email' | 'password', string> | undefined
      ) => authorize(credentials),
    }),

    // ...add more providers here
  ],

  /**
   * overwite default next-auth auth pages
   * @link: https://next-auth.js.org/configuration/pages
   * */
  pages: {
    signIn: '/auth/signin',
    //   signOut: '/auth/signout',
    //   error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/signin/register', // New users will be directed here on first sign in
    // NOTE: see here for error handling: https://next-auth.js.org/configuration/pages#error-codes
  },

  // @link: https://next-auth.js.org/configuration/options#events
  events: {
    async signIn(message) {
      await wait(50);
      dev.log('event:signIn | message', message, debug);
    },
    async signOut(message) {
      await wait(50);
      dev.log('event:signOut | message', message, debug);
    },
    async createUser(message) {
      dev.log('event:createUser | message', message, debug);
      await onCreateuser({
        id: message?.user?.id,
        name: String(message?.user?.name),
        email: String(message?.user?.email),
      });
    },
    async updateUser(message) {
      await wait(50);
      dev.log('event:updateUser | message', message, debug);
    },
    async linkAccount(message) {
      dev.log('event:linkAccount| message', message, debug);

      if (!message.account && !message.user.name) {
        await wait(50);
        dev.error('event:linkAccount | no account or user.name found');
      }
    },
    async session(message) {
      dev.log('event:session | message', message, debug);
      await wait(50);
      dev.log('event:session - active');
    },
  },
};

export default NextAuth(authOptions);
