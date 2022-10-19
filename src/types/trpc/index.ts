import { TRPC_ERROR_CODE_KEY } from '@trpc/server/rpc';
import { Session } from 'next-auth';
import { type PrismaClientType } from '../prisma';

interface WithUser extends Session {
  id?: string;
  email?: string;
  image?: string;
}

export type AppContextWithPrisma = {
  session: WithUser | null;
  prisma: PrismaClientType;
};

// WIP: unused, need to type error handling in _app.tsx
export type TRPCErrorResult = {
  message?: string;
  code: TRPC_ERROR_CODE_KEY;
  originalError: unknown;
  cause: Error | undefined;
};

/**
 *
 * TRPC_ERROR_CODE_KEY:
 * PARSE_ERROR | BAD_REQUEST | INTERNAL_SERVER_ERROR | UNAUTHORIZED |
 * FORBIDDEN | NOT_FOUND | METHOD_NOT_SUPPORTED | TIMEOUT | CONFLICT |
 * PRECONDITION_FAILED | PAYLOAD_TOO_LARGE | CLIENT_CLOSED_REQUEST
 *
 */
