import { User } from '@prisma/client';
import { prisma } from '@/server/db/client';
import { omit } from '@/utils';

type AuthorizeFnCredentials = Record<'email' | 'password', string> | undefined;

type UserWithPw = User & {
  password: string;
};

export async function authorize(
  credentials: AuthorizeFnCredentials
): Promise<Omit<UserWithPw, 'password'> | null> {
  const { email, password } = credentials as {
    email: string;
    password: string;
  };

  try {
    const user = await prisma.user.findFirstOrThrow({ where: { email } });
    // if (user && user.email === email && typeof user.password !== 'string') {
      // const result = await comparePasswords(password, user.password)
      // const _user = omit(user, password)
      // return result && _user ? _user : null;
    // }
  } catch (error) {
    console.log('Authorization Error', error);
  }
  return null;
}
