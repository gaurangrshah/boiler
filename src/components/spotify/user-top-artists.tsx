import { cancelRetry } from '@/utils/';
import { trpc } from '@/utils/trpc';
import { VStack } from '@chakra-ui/react';
import { Artist } from './artist';
import { Widget } from './widget';

const mapArtists = (artist: SpotifyApi.ArtistObjectFull) => (
  <Artist key={artist.name} {...artist} />
);

export const UserTopArtists: React.FC = (): JSX.Element => {
  const { data: topArtists } = trpc.spotify.myTopArtists.useQuery(undefined, {
    ...cancelRetry,
  });
  return (
    <Widget title="Your Top Artists">
      <VStack w="full" alignItems="flex-start" maxH={'675px'} overflowY="auto">
        {topArtists?.length && topArtists?.map(mapArtists)}
      </VStack>
    </Widget>
  );
};