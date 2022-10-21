// src/server/trpc/router/_app.ts
import { router } from '../trpc';
import { authRouter } from './auth';
import { preferenceRouter } from './preference';
import { spotifyRouter } from './spotify';

export const appRouter = router({
  auth: authRouter,
  preference: preferenceRouter,
  spotify: spotifyRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
