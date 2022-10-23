import { DefaultSession } from 'next-auth';

// @link: https://next-auth.js.org/getting-started/typescript

// using "module augmentation"
declare module 'next-auth' {
  // Extend the build-in session types
  interface Session {
    user?: {
      id: string;
      accessToken?: string;
      refreshToken?: string;
    } & DefaultSession['user'];
    error?: string; //'RefreshAccessTokenError' | 'RefreshAccessTokenDenied';
  }
}
// Extend the build-in types for JWT
declare module 'next-auth/jwt' {
  interface JWT {
    // name?: string | null;
    // email?: string | null;
    // picture?: string | null;
    // sub?: string;
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    username?: string;
    user?: User;
    error?: string; // 'RefreshAccessTokenDenied';
  }
}
