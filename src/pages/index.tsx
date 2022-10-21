import { useSpotify } from '@/hooks';
import { cancelRetry, dev, onPromise } from '@/utils';
import { Button, chakra, Code, HStack, VStack } from '@chakra-ui/react';
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
  const { data: sessionData } = useSession();
  const { spotifyUser } = useSpotify();

  const { data: featuredPlaylists } = trpc.spotify.featuredPlaylists.useQuery(
    { country: String(spotifyUser?.country) },
    {
      enabled: !!spotifyUser,
      ...cancelRetry,
      onSuccess: (): void =>
        dev.log(
          'file: index.tsx | line 52 | featuredPlaylists',
          featuredPlaylists
        ),
    }
  );

  return (
    <VStack align="center" justify="center">
      {sessionData && (
        <Code>Logged in as {JSON.stringify(sessionData, null, 2)}</Code>
      )}
      {spotifyUser && <code>{JSON.stringify(spotifyUser, null, 2)}</code>}
      {featuredPlaylists && (
        <code>{JSON.stringify(featuredPlaylists, null, 2)}</code>
      )}
      <Button
        onClick={onPromise(sessionData ? () => signOut() : () => signIn())}
      >
        {sessionData ? 'Sign out' : 'Sign in'}
      </Button>
    </VStack>
  );
};
