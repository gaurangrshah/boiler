import { TRPCError } from '@trpc/server';
import { ContextInner } from '../context';

type GetMe = Promise<SpotifyApi.CurrentUsersProfileResponse | null>;
type FeaturedPlaylists = Promise<
  SpotifyApi.ListOfFeaturedPlaylistsResponse['playlists'] | null
>;
type UserPlaylists = {
  body: Promise<SpotifyApi.ListOfUsersPlaylistsResponse | null>;
  nextCursor: number;
};

export async function getMe({ ctx }: { ctx: ContextInner }): GetMe {
  try {
    const { body: user } = await ctx.spotifyApi.getMe();
    return user;
  } catch (error) {
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
  cursor,
}: {
  ctx: ContextInner;
  userId: string;
  cursor?: number;
}) {
  const LIMIT = 20;
  const OFFSET = cursor || 0;

  try {
    const { body } = await ctx.spotifyApi.getUserPlaylists(userId, {
      limit: LIMIT,
      offset: OFFSET,
    });

    let nextCursor: typeof cursor | undefined = undefined;
    if ((cursor || 1) * LIMIT < body.total) {
      nextCursor = (cursor || 1) * LIMIT;
    }
    return {
      body,
      nextCursor: Number(nextCursor),
    };
  } catch (error) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'An unexpected error occurred, please try again later.',
      cause: error,
    });
  }
}
