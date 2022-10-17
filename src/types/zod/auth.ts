import { z } from 'zod';
import * as auth from '@/schema';

export type UserInput = z.TypeOf<typeof auth.userInputSchema>;

export type AuthenticateUserInput = z.TypeOf<
  typeof auth.authenticateUserInputSchema
>;

export type MagicAuthInput = z.TypeOf<typeof auth.magicAuthInputSchema>;

export type CreateUserInput = z.TypeOf<typeof auth.createUserInputSchema>;

export type CreateUserOutput = z.TypeOf<typeof auth.createUserOutputSchema>;
