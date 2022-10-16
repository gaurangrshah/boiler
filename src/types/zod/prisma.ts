import { z } from 'zod';
import * as prismaSchema from '@/schema/prisma.schema';

// @NOTE: these types have been inferred from zod schema for prisma as imported above.

export type PrismaAccount = z.TypeOf<typeof prismaSchema.accountSchema>;
export type PrismaSession = z.TypeOf<typeof prismaSchema.sessionSchema>;
export type PrismaVerificationToken = z.TypeOf<
  typeof prismaSchema.verificationTokenSchema
>;
export type PrismaColorScheme = z.TypeOf<typeof prismaSchema.colorSchemeSchema>;
export type PrismaPreference = z.TypeOf<typeof prismaSchema.preferenceSchema>;
export type PrismaAppDetail = z.TypeOf<typeof prismaSchema.appDetailSchema>;
export type PrismaUser = z.TypeOf<typeof prismaSchema.prismaUserSchema>;
export type PrismaUserWithPassword = z.TypeOf<
  typeof prismaSchema.prismaUserWithPasswordSchema
>;
