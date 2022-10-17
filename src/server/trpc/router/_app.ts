// src/server/trpc/router/_app.ts
import { router } from '../trpc';
import { preferenceRouter } from './preference';
import { authRouter } from './auth';

export const appRouter = router({
  auth: authRouter,
  preference: preferenceRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
