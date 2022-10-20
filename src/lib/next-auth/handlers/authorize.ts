import { prisma } from '@/server/db/client';
import { dev } from '@/utils';
import { User } from '@prisma/client';
import { comparePasswords } from '../../argon2';

type AuthorizeFnCredentials = Record<'email' | 'password', string> | undefined;

/**
 * Unused in this project, - used for credentials auth
 */

export async function authorize(
  credentials: AuthorizeFnCredentials
): Promise<User | null> {
  const { email, password } = credentials as {
    email: string;
    password: string;
  };

  try {
    dev.log('🔒 authorizing user', email);
    const user = await prisma.user.findFirstOrThrow({ where: { email } });
    dev.log('🙋‍♂️ userFound:', !!user);
    if (!user || !user.password || typeof user.password !== 'string') {
      return null;
    }
    const pwMatch = await comparePasswords(
      String(password),
      String(user.password)
    );

    dev.log('🔵 | authorize: pws match:', pwMatch);
    if (pwMatch) {
      return user;
    } else throw new Error('Invalid Credentails.');

    return null;
  } catch (error) {
    dev.error('Authorization Error', error);
  }
  return null;
}
