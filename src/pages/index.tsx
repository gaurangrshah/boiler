import { cancelRetry, dev, onPromise } from '@/utils';
import { Button, chakra, HStack, VStack } from '@chakra-ui/react';
import { PageLayout } from 'chakra.ui';
import type { NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';
import { trpc } from '../utils/trpc';

const Home: NextPage = () => {
  return (
    <>
      <PageLayout
        type="default"
        title="My Landing Page"
        description="This is the landing page for my product, brand or service."
      >
        <HStack align="center" justify="center" w="full" minH="100vh">
          <VStack w="full" minH="100vh" align="center" justify="center">
            <chakra.h1 m={0} fontSize="7xl" fontWeight="bold" lineHeight="1.5">
              Create <chakra.span color="brand.400">T3</chakra.span> App
            </chakra.h1>
            <AuthShowcase />
          </VStack>
        </HStack>
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
    }
  );
  const { data: sessionData } = useSession();

  return (
    <VStack align="center" justify="center">
      {sessionData && <p>Logged in as {sessionData?.user?.name}</p>}
      {secretMessage && <p>{secretMessage}</p>}
      <Button
        onClick={onPromise(sessionData ? () => signOut() : () => signIn())}
      >
        {sessionData ? 'Sign out' : 'Sign in'}
      </Button>
    </VStack>
  );
};
