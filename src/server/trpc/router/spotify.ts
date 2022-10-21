import { z } from 'zod';
import { protectedProcedure, router } from '../trpc';

export const spotifyRouter = router({
  me: protectedProcedure.query(
    async ({ ctx }): Promise<SpotifyApi.CurrentUsersProfileResponse | null> => {
      const { body: user } = await ctx.spotifyApi.getMe();
      return user;
    }
  ),
  // featuredPlaylist: protectedProcedure.input(z.object({ country: z.string() }))).query()
  //   .mutation(),
});
