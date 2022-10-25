import { prisma } from '@/server/db/client';
import { PrismaUser } from '@/types/zod/prisma';
import { dev } from '@/utils';
import { getUsernameFromEmail } from '@/utils/fns';
import newAppDetail from '__data/prisma-defaults/new-app-detail.json';
import newColorScheme from '__data/prisma-defaults/new-colorScheme.json';
import newPreference from '__data/prisma-defaults/new-preference.json';

export const onCreateuser = async ({
  id,
  name,
  email,
}: Pick<PrismaUser, 'id' | 'name' | 'email'>) => {
  dev.log('onCreateUser.ts | line 13', { id, name, email });
  return await prisma.user.update({
    where: {
      id,
    },
    data: {
      name: name ?? getUsernameFromEmail(email),
      appDetail: {
        create: {
          ...newAppDetail,
        },
      },
      preferences: {
        create: {
          ...newPreference,
          colorScheme: {
            create: {
              ...newColorScheme,
            },
          },
        },
      },
    },
  });
};
