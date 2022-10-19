import { prisma } from '@/server/db/client';
import { CreateUserInput, UserInput } from '@/types';
import { User } from '@prisma/client';

export const createUser = async (
  input: Omit<CreateUserInput, 'passwordConfirm'>
): Promise<UserInput> => {
  return (await prisma.user.create({
    data: input,
  })) as UserInput;
};

export const findUserWithPW = async (email: UserInput['email']) => {
  return await prisma.user.findUniqueOrThrow({
    where: { email },
  });
};

export const updateUser = async (
  email: UserInput['email'],
  data: Partial<User>
) => {
  return await prisma.user.update({
    where: { email },
    data: {
      name: data.name,
      // do not allow email to be updated.
      password: data.password,
    },
  });
};
