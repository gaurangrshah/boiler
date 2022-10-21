import { useSpotify } from '@/hooks';
import { cancelRetry, dev, onPromise } from '@/utils';
import { Button, chakra, Code, HStack, VStack } from '@chakra-ui/react';
import { PageLayout } from 'chakra.ui';

import { useInfinitePlaylists } from '@/hooks';
import type { NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

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
  const { ref, inView } = useInView({ threshold: 0.9 });
  const { data: sessionData } = useSession();
  const { spotifyUser } = useSpotify();

  const { playlists, fetchNextPage } = useInfinitePlaylists(
    String(spotifyUser?.id)
  );

  useEffect(() => {
    if (!inView) return;

    void fetchNextPage();
  }, [fetchNextPage, inView]);

  return (
    <VStack align="center" justify="center">
      {/* {sessionData && (
        <Code>Logged in as {JSON.stringify(sessionData, null, 2)}</Code>
      )} */}
      {/* {spotifyUser && <code>{JSON.stringify(spotifyUser, null, 2)}</code>} */}
      {playlists && <Code>{JSON.stringify(playlists, null, 2)}</Code>}
      <Code>userlists: {playlists?.length}</Code>
      <span ref={ref}></span>
      <Button
        onClick={onPromise(sessionData ? () => signOut() : () => signIn())}
      >
        {sessionData ? 'Sign out' : 'Sign in'}
      </Button>
      <Button onClick={onPromise(() => fetchNextPage())}>Fetch Next</Button>
    </VStack>
  );
};
