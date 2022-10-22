import { getNextCursor } from '@/lib/spotify-web-api';
import { debug as globalDebug, dev } from '@/utils';
import { TRPCError } from '@trpc/server';
import { ContextInner } from '../context';

type GetMe = Promise<SpotifyApi.CurrentUsersProfileResponse | null>;
type FeaturedPlaylists = Promise<
  SpotifyApi.ListOfFeaturedPlaylistsResponse['playlists'] | null
>;
type GetUserPlaylistServiceOutput = {
  data: SpotifyApi.PlaylistObjectSimplified[];
  nextCursor: number | undefined;
};

const debug: boolean = globalDebug || true;

export async function getMe({ ctx }: { ctx: ContextInner }): GetMe {
  try {
    const { body: user } = await ctx.spotifyApi.getMe();
    return user;
  } catch (error) {
    dev.error('🔴 spotify.getMe', error, debug);
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'An unexpected error occurred, please try again later.',
      cause: error,
    });
  }
}

export async function getFeaturedPlaylists({
  ctx,
  country,
}: {
  ctx: ContextInner;
  country: string;
}): FeaturedPlaylists {
  try {
    const {
      body: { playlists },
    } = await ctx.spotifyApi.getFeaturedPlaylists({ country });
    return playlists;
  } catch (error) {
    dev.error('🔴 spotify.getFeaturedPlaylists', error, debug);
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'An unexpected error occurred, please try again later.',
      cause: error,
    });
  }
}

export async function getUserPlaylists({
  ctx,
  userId,
  cursor = 0,
}: {
  ctx: ContextInner;
  userId: string;
  cursor: number | undefined;
}): Promise<GetUserPlaylistServiceOutput> {
  const LIMIT = 20;
  const OFFSET = cursor ? cursor * LIMIT : 1;
  dev.log(
    'getUserPlaylist.service:inputs',
    { userId, cursor, LIMIT, OFFSET },
    true
  );
  try {
    const response = await ctx.spotifyApi.getUserPlaylists(userId, {
      limit: LIMIT,
      offset: OFFSET,
    });

    dev.log('getUserPlaylist.service:response', response, false);
    const nextCursor = getNextCursor(LIMIT, cursor, response.body.total);
    return {
      data: response.body.items,
      nextCursor: nextCursor,
    };
  } catch (error) {
    dev.error('🔴 spotify.getUserPlaylists', error, debug);
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'An unexpected error occurred, please try again later.',
      cause: error,
    });
  }
}
