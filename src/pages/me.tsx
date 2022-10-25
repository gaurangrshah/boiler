import {
  PlaylistsWrapper,
  UserTopArtists,
  UserTopTracks,
} from '@/components/spotify';
import { useSpotify } from '@/lib/spotify-web-api';
import { Box, chakra, HStack } from '@chakra-ui/react';
import { PageLayout } from 'chakra.ui';

export default function Me(): JSX.Element {
  const { spotifyUser } = useSpotify();
  const displayName = spotifyUser?.display_name as string;
  return (
    <PageLayout title={displayName} type="default">
      <Box w="full" mb={12}>
        <chakra.h1 textAlign="center">{`${displayName}'s Spotify Details`}</chakra.h1>
        <HStack
          position="relative"
          w="full"
          mb={6}
          alignItems="flex-start"
          gap={6}
        >
          <UserTopTracks />
          <UserTopArtists />
        </HStack>
        <PlaylistsWrapper />
      </Box>
    </PageLayout>
  );
}

Me.auth = true;
