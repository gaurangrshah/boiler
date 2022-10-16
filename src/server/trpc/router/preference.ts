import { router, publicProcedure, protectedProcedure } from '../trpc';
import { z } from 'zod';
import { prismaUserSchema } from '@/schema';

export const preferenceRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? 'world'}`,
      };
    }),

  all: protectedProcedure.output(prismaUserSchema).query(async ({ ctx }) => {
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
