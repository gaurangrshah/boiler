import type { NextPage } from 'next';
import { trpc } from '../utils/trpc';
import { signIn, signOut, useSession } from 'next-auth/react';
import styles from './index.module.css';
import { onPromise } from '@/utils';
import { chakra, Spinner } from '@chakra-ui/react';
import { PageLayout } from 'chakra.ui';

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
  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery();

  const { data: sessionData } = useSession();

  return (
    <div className={styles.authShowcase}>
      {sessionData && <p>Logged in as {sessionData?.user?.name}</p>}
      {secretMessage && <p>{secretMessage}</p>}
      <button
        className={styles.signInButton}
        onClick={onPromise(sessionData ? () => signOut() : () => signIn())}
      >
        {sessionData ? 'Sign out' : 'Sign in'}
      </button>
    </div>
  );
};
