import { prisma } from '@/server/db/client';
import { omit } from '@/utils';
import { User } from '@prisma/client';
import { comparePasswords } from '../argon2';

type AuthorizeFnCredentials = Record<'email' | 'password', string> | undefined;

export async function authorize(
  credentials: AuthorizeFnCredentials
): Promise<User | null> {
  const { email, password } = credentials as {
    email: string;
    password: string;
  };

  try {
    console.log('🔒 authorizing user', email);
    const user = await prisma.user.findFirstOrThrow({ where: { email } });
    console.log('🙋‍♂️ userFound:', !!user);
    if (!user || !user.password || typeof user.password !== 'string') {
      return null;
    }
    const pwMatch = await comparePasswords(password, user.password.toString());

    if (pwMatch) {
      console.log('🚀 | file: authorize.ts | line 18 | user', user);
      return user;
    } else throw new Error('Invalid Credentails.');

    return null;
  } catch (error) {
    console.log('Authorization Error', error);
  }
  return null;
}
