import { TRPCError } from '@trpc/server';
import { ContextInner } from '../context';

export async function getMe({
  ctx,
}: {
  ctx: ContextInner;
}): Promise<SpotifyApi.CurrentUsersProfileResponse | null> {
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
}): Promise<SpotifyApi.ListOfFeaturedPlaylistsResponse['playlists'] | null> {
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
