import {
  PlaylistsWrapper,
  ProfileHeader,
  UserTopArtists,
  UserTopTracks,
} from '@/components/spotify';
import { useSpotify } from '@/lib/spotify-web-api';
import { Box, HStack } from '@chakra-ui/react';
import { PageLayout } from 'chakra.ui';

export default function Me(): JSX.Element {
  const { spotifyUser } = useSpotify();
  const displayName = spotifyUser?.display_name as string;
  return (
    <PageLayout title={displayName} type="default">
      <Box w="full" mb={12}>
        <ProfileHeader user={spotifyUser} />
        <HStack layerStyle="flex-widget-panels">
          <UserTopTracks />
          <UserTopArtists />
        </HStack>
        <PlaylistsWrapper />
      </Box>
    </PageLayout>
  );
}

Me.auth = true;
