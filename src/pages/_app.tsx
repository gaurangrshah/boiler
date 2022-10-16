// src/pages/_app.tsx
// import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import type { AppType } from 'next/app';
import { trpc } from '../utils/trpc';
import { NextComponentType } from 'next';
import { NextRouter } from 'next/router';
import { ErrorBoundary } from '@/utils';
import { ChakraWrapper, FullScreenLoader } from 'chakra.ui/'; // theme provider: chakraui/utils/color-mode-manager.tsx
import Head from 'next/head';
import { type SessionWithUser } from '@/types';
import { useSession } from 'next-auth/react';
import { MessageRouter } from 'chakra.ui';

const MyApp: AppType<{ session: SessionWithUser | null; cookies: string }> = ({
  Component,
  pageProps: { session, cookies, ...pageProps },
  router,
}) => {
  const { asPath } = router as NextRouter;
  const { auth } = Component as NextComponentType & { auth?: boolean };

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
            {auth ? (
              <Auth>
                <Component {...pageProps} />
              </Auth>
            ) : (
              <Component {...pageProps} />
            )}
            <MessageRouter asPath={decodeURIComponent(asPath)} />
          </ChakraWrapper>
        </SessionProvider>
      </ErrorBoundary>
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
