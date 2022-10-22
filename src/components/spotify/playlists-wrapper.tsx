import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { Playlist } from '@/components/spotify';
import { useInfinitePlaylists, useSpotify } from '@/lib/spotify-web-api';

export const PlaylistsWrapper: React.FC = ():JSX.Element => {
  const { ref, inView } = useInView({ threshold: 0.9 });
  const { spotifyUser } = useSpotify();

  const { playlists, fetchNextPage } = useInfinitePlaylists(
    String(spotifyUser?.id)
  );

  useEffect(() => {
    if (!inView) return;

    void fetchNextPage();
  }, [fetchNextPage, inView]);

  return (
    <>
      {playlists?.pages.map((page) =>
        page.data.map((playlist) => (
          <Playlist key={playlist.id} playlist={playlist} />
        ))
      )}
      <span ref={ref}></span>
    </>
  );
};
