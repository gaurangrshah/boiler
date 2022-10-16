import { DefaultSession } from 'next-auth';

// @link: https://next-auth.js.org/getting-started/typescript

// using "module augmentation"
declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    // add id to the session interface
    user?: {
      id: string;
    } & DefaultSession['user'];
  }
}
