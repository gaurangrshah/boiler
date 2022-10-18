import { createUser } from '../services';
import { createOrUpdateUserHandler } from '../controllers';
import { router, publicProcedure, protectedProcedure } from '../trpc';
import { createUserInputSchema, userInputSchema } from '@/schema';
import { getProviders, getCsrfToken } from 'next-auth/react';

export interface AuthFormUtils {
  providers: {
    [key: string]: {
      callbackUrl: string;
      id: string;
      name: string;
      signinUrl: string;
      type: string;
    };
  } | null;
  csrfToken?: string | undefined;
}

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return 'You are logged in and can see this secret message!';
  }),
  registerUser: publicProcedure
    .input(userInputSchema)
    .mutation(({ ctx, input }) => createOrUpdateUserHandler({ ctx, input })),
  createUser: publicProcedure
    .input(createUserInputSchema)
    .output(userInputSchema)
    .mutation(({ input }) => createUser(input)),
  formUtils: publicProcedure.query(async (): Promise<AuthFormUtils> => {
    const providers = await getProviders();
    const csrfToken = await getCsrfToken();

    return {
      providers,
      csrfToken: csrfToken ?? null,
    } as AuthFormUtils;
  }),
});
