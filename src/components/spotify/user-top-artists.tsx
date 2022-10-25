import { cancelRetry } from '@/utils/';
import { trpc } from '@/utils/trpc';
import { VStack } from '@chakra-ui/react';
import { PanelLoader } from 'chakra.ui';
import { ArtistItem } from './artist-item';
import { Widget } from './widget';

const mapArtists = (artist: SpotifyApi.ArtistObjectFull) => (
  <ArtistItem key={artist.name} {...artist} />
);

export const UserTopArtists: React.FC = (): JSX.Element => {
  const { data: topArtists, isLoading } = trpc.spotify.myTopArtists.useQuery(
    undefined,
    {
      ...cancelRetry,
    }
  );

  return (
    <Widget title="Your Top Artists">
      <VStack layerStyle="widget-col">
        {isLoading && !topArtists ? (
          <PanelLoader />
        ) : (
          topArtists?.length && topArtists?.map(mapArtists)
        )}
      </VStack>
    </Widget>
  );
};
