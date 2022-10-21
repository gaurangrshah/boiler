// src/server/router/context.ts
import spotifyApi from '@/lib/spotify-web-api';
import { PrismaClient } from '@prisma/client';
import type { inferAsyncReturnType } from '@trpc/server';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import type { Session } from 'next-auth';
import { signIn } from 'next-auth/react';
import SpotifyWebApi from 'spotify-web-api-node';
import { getServerAuthSession } from '../common/get-server-auth-session';
import { prisma } from '../db/client';

type CreateContextOptions = {
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
      void signIn();
    }
    spotifyApi.setAccessToken(String(opts?.session.user?.accessToken));
  }
  return {
    session: opts.session,
    prisma,
    spotifyApi,
  };
};

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
