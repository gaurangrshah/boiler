import { z } from 'zod';
import { getFeaturedPlaylists, getMe } from '../services';
import { protectedProcedure, router } from '../trpc';

export const spotifyRouter = router({
  me: protectedProcedure.query(
    async ({ ctx }): Promise<SpotifyApi.CurrentUsersProfileResponse | null> =>
      await getMe({ ctx })
  ),
  featuredPlaylists: protectedProcedure
    .input(z.object({ country: z.string() }))
    .query(
      ({
        ctx,
        input,
      }): Promise<
        SpotifyApi.ListOfFeaturedPlaylistsResponse['playlists'] | null
      > => getFeaturedPlaylists({ ctx, country: input.country })
    ),
});
