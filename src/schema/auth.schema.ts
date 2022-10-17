import { z } from 'zod';

export const userInputSchema = z.object({
  name: z.string().min(3, 'Full name is required').max(100),
  email: z
    .string()
    .min(6, 'Email address is required')
    .email('Email address is invalid'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
});

export const authenticateUserInputSchema = userInputSchema.pick({
  email: true,
  password: true,
});

export const magicAuthInputSchema = userInputSchema.pick({
  email: true,
});

export const passwordConfirmSchema = z.object({
  passwordConfirm: z.string().min(8, 'Please confirm your password.'),
});

export const createUserOutputSchema = userInputSchema.merge(
  passwordConfirmSchema
);

export const createUserInputSchema = userInputSchema
  .merge(
    z.object({
      passwordConfirm: z
        .string()
        .min(1, 'Password is required')
        .min(8, 'Password must be more than 8 characters')
        .max(32, 'Password must be less than 32 characters'),
    })
  )
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'passwords do not match',
  });
