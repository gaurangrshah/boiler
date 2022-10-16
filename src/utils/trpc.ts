// src/utils/trpc.ts
import { httpBatchLink, loggerLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import type { AppRouter } from '../server/trpc/router/_app';
import superjson from 'superjson';
import { getBaseUrl } from './fns';
import { ONE_SECOND } from './constants';

export const trpc = createTRPCNext<AppRouter>({
  config({ ctx }) {
    return {
      transformer: superjson,
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 5 * ONE_SECOND,
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
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
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
