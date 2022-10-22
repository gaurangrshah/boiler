import {
  PlaylistsWrapper,
  UserTopArtists,
  UserTopTracks,
} from '@/components/spotify';
import { useSpotify } from '@/lib/spotify-web-api';
import { trpc } from '@/utils/trpc';
import { Box, chakra, HStack, VStack } from '@chakra-ui/react';
import { PageLayout } from 'chakra.ui';

export default function Me(): JSX.Element {
  const { spotifyUser } = useSpotify();
  const displayName = spotifyUser?.display_name as string;
  return (
    <PageLayout title={displayName} type="default">
      <Box w="full">
        <chakra.h1
          textAlign="center"
          fontSize="4xl"
          fontWeight={800}
        >{`${displayName}'s Spotify Details`}</chakra.h1>
        <HStack w="full" gap={6}>
          <UserTopTracks />
          <UserTopArtists />
        </HStack>
        <PlaylistsWrapper />
      </Box>
    </PageLayout>
  );
}

Me.auth = true;
