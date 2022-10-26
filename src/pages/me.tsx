import {
  PlaylistsWrapper,
  ProfileHeader,
  UserTopArtists,
  UserTopTracks,
} from '@/components/spotify';
import { useSpotify } from '@/lib/spotify-web-api';
import { Container, HStack, VStack } from '@chakra-ui/react';
import { SpotifyLayout } from 'chakra.ui';

export default function Me(): JSX.Element {
  const { spotifyUser } = useSpotify();
  const displayName = spotifyUser?.display_name as string;
  return (
    <SpotifyLayout title={displayName} type="default">
      <VStack w="full">
        <ProfileHeader user={spotifyUser} />
        <Container w="full" mb={12} maxW="container.lg">
          <HStack layerStyle="flex-widget-panels">
            <UserTopTracks />
            <UserTopArtists />
          </HStack>
          <PlaylistsWrapper />
        </Container>
      </VStack>
    </SpotifyLayout>
  );
}

Me.auth = true;
