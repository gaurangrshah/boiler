import { cancelRetry, dev } from '@/utils';
import { trpc } from '@/utils/trpc';

export function useInfinitePlaylists(userId: string) {
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
        dev.log('file: index.tsx | line 52 | UserPlaylists', data);
      },
    }
  );

  return {
    playlists: userLists,
    fetchNextPage,
    hasNextPage,
    hasPreviousPage,
  };
}
