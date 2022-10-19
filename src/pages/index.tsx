import { cancelRetry, dev, onPromise } from '@/utils';
import { Button, chakra } from '@chakra-ui/react';
import { PageLayout } from 'chakra.ui';
import type { NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';
import { trpc } from '../utils/trpc';
import styles from './index.module.css';

const Home: NextPage = () => {
  return (
    <>
      <PageLayout
        type="default"
        title="My Landing Page"
        description="This is the landing page for my product, brand or service."
      >
        <div className={styles.containerOuter}>
          <div className={styles.containerInner}>
            <h1 className={styles.title}>
              Create <chakra.span color="brand.400">T3</chakra.span> App
            </h1>
            <AuthShowcase />
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined,
    {
      ...cancelRetry,
      onSuccess: (data): void => {
        dev.log('file: index.tsx | line 38 | secretMessage', data);
      },
      onError: (error): void => {
        dev.error('file: index.tsx | line 41 | secretMessage:Error', error);
      },
    }
  );
  const { data: sessionData } = useSession();

  return (
    <div className={styles.authShowcase}>
      {sessionData && <p>Logged in as {sessionData?.user?.name}</p>}
      {secretMessage && <p>{secretMessage}</p>}
      <Button
        onClick={onPromise(sessionData ? () => signOut() : () => signIn())}
      >
        {sessionData ? 'Sign out' : 'Sign in'}
      </Button>
    </div>
  );
};
