import { PlaylistsContainer } from '@/components/spotify/playlists-wrapper';
import { useSpotify } from '@/lib/spotify-web-api';
import { cancelRetry, dev, onPromise } from '@/utils';
import { Button, chakra, Code, HStack, VStack } from '@chakra-ui/react';
import { PageLayout } from 'chakra.ui';

import type { NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';

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


  return (
    <VStack align="center" justify="center">
      <PlaylistsContainer />
      <Button
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? 'Sign out' : 'Sign in'}
      </Button>
    </VStack>
  );
};
