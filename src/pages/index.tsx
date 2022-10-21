import { useSpotify } from '@/hooks';
import { cancelRetry, dev, onPromise } from '@/utils';
import { Button, chakra, HStack, VStack } from '@chakra-ui/react';
import { PageLayout } from 'chakra.ui';
import type { NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
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
  const { spotifyApi, spotifyUser } = useSpotify();
  const { data: me } = trpc.spotify.me.useQuery();
  const [fp, setFp] =
    useState<SpotifyApi.ListOfFeaturedPlaylistsResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { body: featuredPlaylist } =
          await spotifyApi.getFeaturedPlaylists({
            country: String(spotifyUser?.country),
          });
        setFp(featuredPlaylist);
        console.log('featured', featuredPlaylist);
      } catch (error) {
        console.log('error at index.tsx', error);
      }
    };
    void fetchData();
  }, [spotifyApi, spotifyUser]);

  return (
    <VStack align="center" justify="center">
      {sessionData && <p>Logged in as {sessionData?.user?.name}</p>}
      {secretMessage && <p>{secretMessage}</p>}
      {me && <p>{JSON.stringify(me, null, 2)}</p>}
      <Button
        onClick={onPromise(sessionData ? () => signOut() : () => signIn())}
      >
        {sessionData ? 'Sign out' : 'Sign in'}
      </Button>
    </VStack>
  );
};
