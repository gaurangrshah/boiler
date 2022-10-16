import { z } from 'zod';
import {
  userInputSchema,
  authenticateUserInputSchema,
  magicAuthInputSchema,
  createUserInputSchema,
} from '@/schema';

export type UserInput = z.TypeOf<typeof userInputSchema>;

export type AuthenticateUserInput = z.TypeOf<
  typeof authenticateUserInputSchema
>;

export type MagicAuthInput = z.TypeOf<typeof magicAuthInputSchema>;

export type CreateUserInput = z.TypeOf<typeof createUserInputSchema>;
