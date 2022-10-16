import { createUser } from '../services';
import { router, publicProcedure, protectedProcedure } from '../trpc';
import { createUserInputSchema, userInputSchema } from '@/schema';

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return 'You are logged in and can see this secret message!';
  }),
  createUser: publicProcedure
    .input(createUserInputSchema)
    .output(userInputSchema)
    .mutation(({ input }) => createUser(input)),
});
