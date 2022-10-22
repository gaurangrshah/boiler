// src/server/router/context.ts
import spotifyApi from '@/lib/spotify-web-api';
import { JWTWithTokens, refreshAccessToken } from '@/lib/spotify-web-api/token';
import { PrismaClient } from '@prisma/client';
import type { inferAsyncReturnType } from '@trpc/server';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import type { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import SpotifyWebApi from 'spotify-web-api-node';
import { getServerAuthSession } from '../common/get-server-auth-session';
import { prisma } from '../db/client';

export type CreateContextOptions = {
  session: Session | null;
  prisma?: PrismaClient;
  spotifyApi?: typeof SpotifyWebApi;
};

/** Use this helper for:
 * - testing, so we dont have to mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 **/
// eslint-disable-next-line @typescript-eslint/require-await
export const createContextInner = async (opts: CreateContextOptions) => {
  if (opts.session) {
    if (opts.session.error === 'RefreshAccessTokenError') {
      const userWithTokens: JWTWithTokens | JWT | undefined =
        opts?.session?.user;
      if (userWithTokens) {
        // @TODO: token should refresh, but it is not
        void refreshAccessToken(userWithTokens);
      }
    }
    spotifyApi.setAccessToken(String(opts?.session.user?.accessToken));
  }
  return {
    session: opts.session,
    prisma,
    spotifyApi,
  };
};

export type ContextInner = inferAsyncReturnType<typeof createContextInner>;

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;

  // Get the session from the server using the unstable_getServerSession wrapper function
  const session = await getServerAuthSession({ req, res });

  return await createContextInner({
    session,
  });
};

export type Context = inferAsyncReturnType<typeof createContext>;
