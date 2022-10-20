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

// Extend the build-in session types
declare module 'next-auth' {
  interface Session {
    accessToken: string;
  }
}
// Extend the build-in types for JWT
declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
    user: User;
    error?: 'RefreshAccessTokenDenied';
  }
}
