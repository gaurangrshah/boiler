import { cancelRetry, dev } from '@/utils';
import { trpc } from '@/utils/trpc';
import { useState } from 'react';
type PlayListState = SpotifyApi.PlaylistObjectSimplified[] | [];

export function useInfinitePlaylists(userId: string) {
  const [playlists, setPlaylists] = useState<PlayListState>([]);
  const {
    data: userLists,
    fetchNextPage,
    hasNextPage,
    hasPreviousPage,
  } = trpc.spotify.infiniteUserPlaylists.useInfiniteQuery(
    { userId },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      enabled: !!userId,
      ...cancelRetry,
      onSuccess: (data): void => {
        dev.log('file: index.tsx | line 52 | featuredPlaylists', userLists),
          data.pages.map((page) => {
            setPlaylists((prevState) => [...prevState, ...page.body.items]);
          });
      },
    }
  );

  return { playlists, fetchNextPage, hasNextPage, hasPreviousPage };
}
