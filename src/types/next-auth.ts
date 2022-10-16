import { Session } from 'next-auth';

export interface SessionWithUser extends Session {
  id: string;
  email: string;
  image: string;
  emailVerified?: string;
}
