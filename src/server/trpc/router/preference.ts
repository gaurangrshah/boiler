import { router, publicProcedure, protectedProcedure } from '../trpc';
import { z } from 'zod';
import { PrismaUser } from '@/types/zod/prisma';

export const preferenceRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? 'world'}`,
      };
    }),

  all: protectedProcedure.query(async ({ ctx }): Promise<PrismaUser> => {
    if (!ctx.session.user.id) throw new Error('No user found.');
    console.log(ctx.session.user.id);

    return await ctx.prisma.user.findFirstOrThrow({
      where: { id: ctx.session.user.id },
      include: {
        appDetail: true,
        preferences: {
          include: {
            colorScheme: true,
          },
        },
      },
    });
  }),
});
