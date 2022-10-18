import { signIn } from 'next-auth/react';

export type AuthenticateUserInput = {
  email: string;
  password: string;
};

export async function emailLogin(email: string): Promise<void> {
  await signIn('email', {
    callbackUrl:
      '/verify-request?success="please check your email for access."',
    redirect: true,
    email,
  });
}
