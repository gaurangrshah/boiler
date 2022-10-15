// @TODO: use for auth-components
import { signIn, SignInResponse } from 'next-auth/react';

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

export async function credentialsLogin({
  email,
  password,
}: AuthenticateUserInput): Promise<SignInResponse | undefined> {
  return await signIn('credentials', {
    callbackUrls: '/?success="Welcome!"',
    redirect: true,
    email,
    password,
  });
}
