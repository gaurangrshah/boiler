import NextAuth, { type NextAuthOptions } from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';
import EmailProvider from 'next-auth/providers/email';
import CredentialsProvider from 'next-auth/providers/credentials';
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '../../../server/db/client';
import { env } from '../../../env/server.mjs';
import { ONE_DAY, omit } from '@/utils';
import { User } from '@prisma/client';
import { authorize } from '@/lib/next-auth/authorize';

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  jwt: {
    maxAge: 30 * ONE_DAY,
  },
  session: {
    maxAge: 30 * ONE_DAY,
    // strategy: 'jwt
  },
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user = omit(session.user, 'password') as User;
      }
      return session;
    },
  },

  adapter: PrismaAdapter(prisma),
  providers: [
    SpotifyProvider({
      clientId: env.SPOTIFY_CLIENT_ID,
      clientSecret: env.SPOTIFY_CLIENT_SECRET,
    }),

    // EmailProvider({
    //   server: {
    //     host: process.env.SMTP_HOST,
    //     port: Number(process.env.SMTP_PORT),
    //     auth: {
    //       user: process.env.EMAIL_FROM,
    //       pass: process.env.SMTP_PASS,
    //     },
    //   },
    //   from: process.env.EMAIL_FROM,
    //   maxAge: ONE_DAY, // email login links valid for 24 hrs.

    //   /**
    //    * @link: https://next-auth.js.org/providers/email
    //    * tap into the builtin email verification request
    //    */
    //   // sendVerificationRequest({
    //   //   identifier: email,
    //   //   url,
    //   //   provider: { server, from },
    //   // }) {
    //   //   /* your function */
    //   // },
    // }),

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
    // signIn: '/auth/signin',
    //   signOut: '/auth/signout',
    //   error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/register', // New users will be directed here on first sign in
    // NOTE: see here for error handling: https://next-auth.js.org/configuration/pages#error-codes
  },
};

export default NextAuth(authOptions);
