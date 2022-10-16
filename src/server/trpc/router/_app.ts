// src/server/trpc/router/_app.ts
import { router } from '../trpc';
// import { exampleRouter } from "./example";
import { preferenceRouter } from './preference';
import { authRouter } from './auth';

export const appRouter = router({
  // example: exampleRouter,
  auth: authRouter,
  preference: preferenceRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
