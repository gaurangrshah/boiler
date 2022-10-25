import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { Playlist } from '@/components/spotify';
import { useInfinitePlaylists, useSpotify } from '@/lib/spotify-web-api';
import { Box, VStack } from '@chakra-ui/react';
import { PanelLoader } from 'chakra.ui';
import { Widget } from './widget';

export const PlaylistsWrapper: React.FC = (): JSX.Element => {
  const { ref, inView } = useInView({ threshold: 0.7 });
  const { spotifyUser } = useSpotify();

  const { playlists, fetchNextPage, hasNextPage } = useInfinitePlaylists(
    String(spotifyUser?.id)
  );

  useEffect(() => {
    if (!inView) return;

    void fetchNextPage();
  }, [fetchNextPage, inView]);

  return (
    <Widget title="Your Playlists">
      <VStack w="full" align="flex-start" maxH={'675px'} overflowY="auto">
        {!playlists?.pages.length && hasNextPage ? (
          <PanelLoader />
        ) : (
          playlists?.pages.map((page) =>
            page.data.map((playlist) => (
              <Playlist key={playlist.id} playlist={playlist} />
            ))
          )
        )}
        <Box minH={8} ref={ref}></Box>
      </VStack>
    </Widget>
  );
};
