import { User } from '@prisma/client';
import { prisma } from '@/server/db/client';
import { CreateUserInput, UserInput } from '@/types';

export const createUser = async (
  input: CreateUserInput
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
