import { comparePasswords, hashPassword } from '@/lib/argon2';
import { type AppContextWithPrisma, type AuthenticateUserInput } from '@/types';
import { dev, omit, debug as globalDebug } from '@/utils';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as trpc from '@trpc/server';
import { createUser, findUserWithPW, updateUser } from '../services';


const debug:boolean = globalDebug || true;

/**
 *
 * NOTE: some of these methods are no longer in use after the removal of JWT strategy.
 *
 */
export const createOrUpdateUserHandler = async ({
  input,
}: {
  input: Partial<User>;
  ctx: AppContextWithPrisma;
}) => {
  const { email, password: plainPassword } = input;
  let userExists: boolean; // if user exists update else create user
  try {
    if (!email) throw new Error('Valid email required.');

    const user = await findUserWithPW(email ?? '');

    userExists = !!user;
  } catch (error) {
    userExists = false;
  }

  const password = await hashPassword(String(plainPassword));

  if (userExists) {
    dev.log('👍 Updating User', null, debug);
    input.password = password;
    try {
      let _user: Partial<User> | undefined;

      const user = await updateUser(email ?? '', input);

      if (user?.password) {
        _user = omit(user, 'password');
      }
      return _user ?? user;
    } catch (error) {
      throw new trpc.TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Something went wrong',
      });
    }
  } else {
    dev.log('👎 Creating User', null, debug);
    try {
      const user = await createUser({
        name: String(input.name),
        email: String(input.email),
        password: password,
      });
      dev.log('👍 user created', user, debug);
      return {
        status: 'success',
        data: { user },
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new trpc.TRPCError({
            code: 'CONFLICT',
            message: 'User Already Exists.',
          });
        }
        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Something went wrong',
        });
      }
    }
  }
};

export const authenticateUserHandler = async ({
  input,
}: {
  input: AuthenticateUserInput;
}) => {
  const { email, password } = input;
  try {
    const user = await findUserWithPW(email);
    if (user.password) {
      const result = await comparePasswords(password, user?.password);
      if (result) {
        const _user = omit(user, 'password');
        return _user;
      } else {
        throw new Error('Please check your credentials and try again.');
      }
    } else {
      throw new Error('No password found.');
    }
  } catch (error) {
    dev.log('🔴', error, debug);
    // throw generic error if not related to prisma
    throw new trpc.TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Something went wrong',
    });
  }
};
