// src/utils/trpc.ts
import { httpBatchLink, loggerLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import superjson from 'superjson';
import type { AppRouter } from '../server/trpc/router/_app';
import { debug, ONE_SECOND } from './constants';
import { getBaseUrl } from './fns';
import { dev } from './logger';

export const trpc = createTRPCNext<AppRouter>({
  config({ ctx }) {
    return {
      transformer: superjson,
      queryClientConfig: {
        logger: {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          log: (...args) => dev.log('querylog:', ...args),
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          warn: (...args) => dev.log('querylog:', ...args),
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          error: (...args) => dev.error('querylog:', ...args),
        },
        defaultOptions: {
          queries: {
            staleTime: 5 * ONE_SECOND,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            retry: (failureCount, error: any) => {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
              const trcpErrorCode = error?.data?.code;
              if (trcpErrorCode === 'NOT_FOUND') {
                return false;
              }
              if (failureCount < 3) {
                return true;
              }
              return false;
            },
          },
        },
      },
      links: [
        loggerLink({
          enabled: (opts) =>
            debug ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          fetch(url, options) {
            return fetch(url, {
              ...options,
              credentials: 'include',
            });
          },
        }),
      ],
      // To use SSR properly you need to forward the client's headers to the server
      headers: () => {
        if (ctx?.req) {
          const headers = ctx?.req?.headers;
          delete headers?.connection;
          return {
            ...headers,
            'x-ssr': '1',
          };
        }
        return {};
      },
    };
  },
  ssr: false,
});
