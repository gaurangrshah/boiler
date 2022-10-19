// src/pages/_app.tsx
// import '../styles/globals.css';
import { type SessionWithUser } from '@/lib/next-auth';
import { dev, ErrorBoundary } from '@/utils';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { MessageRouter } from 'chakra.ui';
import { ChakraWrapper, FullScreenLoader } from 'chakra.ui/'; // theme provider: chakraui/utils/color-mode-manager.tsx
import { NextComponentType } from 'next';
import { SessionProvider, useSession } from 'next-auth/react';
import type { AppType } from 'next/app';
import Head from 'next/head';
import { NextRouter } from 'next/router';
import { trpc } from '../utils/trpc';

const MyApp: AppType<{ session: SessionWithUser | null; cookies: string }> = ({
  Component,
  pageProps: { session, cookies, ...pageProps },
  router,
}) => {
  const { asPath } = router as NextRouter;
  const { auth } = Component as NextComponentType & { auth?: boolean };
  dev.log('file: _app.tsx | line 23 | asPath', asPath, false);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      <ErrorBoundary>
        <SessionProvider session={session}>
          <ChakraWrapper cookies={cookies}>
            <MessageRouter asPath={decodeURIComponent(asPath)} />
            {auth ? (
              <Auth>
                <Component {...pageProps} />
              </Auth>
            ) : (
              <Component {...pageProps} />
            )}
          </ChakraWrapper>
        </SessionProvider>
      </ErrorBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export default trpc.withTRPC(MyApp);

function Auth({ children }: { children: React.ReactNode }) {
  // @link: https://next-auth.js.org/getting-started/client#custom-client-session-handling
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true });

  if (status === 'loading') {
    return <FullScreenLoader />;
  }

  return <>{children}</>;
}
