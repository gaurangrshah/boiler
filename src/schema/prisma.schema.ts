import { z } from 'zod';
import { errorMessages, typeErrorMessage } from '../utils/zod/index';

// NOTE: all inferred ts types can be found at: "@/types/zod/prisma.ts"

export const accountSchema = z.object({
  id: z.string(errorMessages('id', 'string')),
  userid: z.string(errorMessages('userId', 'string')),
  type: z.string(errorMessages('type', 'string')),
  provider: z.string(errorMessages('provider', 'string')),
  providerAccountId: z.string(errorMessages('providerAccountId', 'string')),
  refresh_token: z.optional(z.string(errorMessages('refresh_token', 'string'))),
  access_token: z.optional(z.string(errorMessages('access_token', 'string'))),
  expires_at: z.optional(z.string(errorMessages('expires_at', 'number'))),
  token_type: z.optional(z.string(errorMessages('token_type', 'string'))),
  scope: z.optional(z.string(errorMessages('scope', 'string'))),
  id_token: z.optional(z.string(errorMessages('id_token', 'string'))),
  session_state: z.optional(z.string(errorMessages('session_state', 'string'))),
});

export const sessionSchema = z.object({
  id: z.string(errorMessages('id', 'string')),
  sessionToken: z.string(errorMessages('sessionToken', 'string')),
  userid: z.string(errorMessages('userId', 'string')),
  expires: z.string(errorMessages('expires', 'date')),
});

export const verificationTokenSchema = z.object({
  identifier: z.string(errorMessages('id', 'string')),
  token: z.string(errorMessages('token', 'string')),
  expires: z.string(errorMessages('expires', 'date')),
});

export const colorSchemeSchema = z.object({
  id: z.string(errorMessages('id', 'string')),
  primary: z.string(errorMessages('primary', 'string')),
  primaryDark: z.string(errorMessages('primaryDark', 'string')),
  secondary: z.string(errorMessages('secondary', 'string')),
  secondaryDark: z.string(errorMessages('secondaryDark', 'string')),
  bg: z.string(errorMessages('bg', 'string')),
  bgDark: z.string(errorMessages('bgDark', 'string')),
  accent: z.string(errorMessages('accent', 'string')),
  accentDark: z.string(errorMessages('accentDark', 'string')),
  gray: z.string(errorMessages('gray', 'string')),
  grayDark: z.string(errorMessages('grayDark', 'string')),
  preferenceId: z.optional(
    z.string(typeErrorMessage('preferenceId', 'string'))
  ),
});

export const preferenceSchema = z.object({
  id: z.string(errorMessages('id', 'string')),
  theme: z.string(errorMessages('theme', 'string')),
  userId: z.optional(z.string().nullable()),
  colorScheme: z.optional(z.array(colorSchemeSchema)),
});

export const appDetailSchema = z.object({
  id: z.string(errorMessages('id', 'string')),
  name: z.string(errorMessages('name', 'string')).nullable(),
  useCase: z.string(errorMessages('useCase', 'string')),
  domain: z.string(errorMessages('domain', 'string')),
  port: z.number(errorMessages('port', 'number')),
  private: z.boolean(errorMessages('private', 'boolean')),
  userId: z.optional(z.string(typeErrorMessage('userId', 'string')).nullable()),
});

export const prismaUserSchema = z.object({
  id: z.string(errorMessages('id', 'string')),
  name: z.string(typeErrorMessage('name', 'string')).nullable(),
  email: z.string(typeErrorMessage('email', 'string')).nullable(),
  emailVerified: z.optional(
    z.date(typeErrorMessage('emailVerified', 'date')).nullable()
  ),
  isActive: z.optional(z.boolean(errorMessages('isActive', 'boolean'))),
  image: z.string(typeErrorMessage('image', 'string')).nullable(),
  session: z.optional(z.array(sessionSchema)),
  account: z.optional(z.array(accountSchema)),
  appDetail: z.optional(z.array(appDetailSchema)),
  preferences: z.optional(z.array(preferenceSchema)),
});

export const prismaUserWithPasswordSchema = prismaUserSchema.merge(
  z.object({
    password: z.string(typeErrorMessage('password', 'string')).nullable(),
  })
);
