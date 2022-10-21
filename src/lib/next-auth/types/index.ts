import { Session, User } from 'next-auth';
import { BuiltInProviderType } from 'next-auth/providers';
import { ClientSafeProvider, LiteralUnion } from 'next-auth/react';

export type NextAuthProvider = Record<
  LiteralUnion<BuiltInProviderType, string>,
  ClientSafeProvider
> | null;

export type NextAuthProviders = {
  [key: string]: NextAuthProvider;
};
export interface SessionWithUser extends Session {
  id: string;
  email: string;
  image: string;
  emailVerified?: string;
}
