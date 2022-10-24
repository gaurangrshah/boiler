import { refreshAccessToken } from '@/lib/spotify-web-api/token';
import { z } from 'zod';
import { getFeaturedPlaylists, getMe, getUserPlaylists } from '../services';
import { protectedProcedure, router } from '../trpc';

export const spotifyRouter = router({
  // refreshToken: protectedProcedure.mutation(
  //   async ({ ctx }) => await refreshAccessToken(ctx.session.user)
  // ),
  me: protectedProcedure.query(
    ({ ctx }): Promise<SpotifyApi.CurrentUsersProfileResponse | null> =>
      getMe({ ctx })
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
  infiniteUserPlaylists: protectedProcedure
    .input(z.object({ userId: z.string(), cursor: z.number().optional() }))
    .query(({ ctx, input }) =>
      getUserPlaylists({
        ctx,
        userId: input.userId,
        cursor: input.cursor,
      })
    ),
  myTopTracks: protectedProcedure.query(
    async ({ ctx }): Promise<SpotifyApi.TrackObjectFull[]> => {
      const { body } = await ctx.spotifyApi.getMyTopTracks();
      return body.items;
    }
  ),
  myTopArtists: protectedProcedure.query(
    async ({ ctx }): Promise<SpotifyApi.ArtistObjectFull[]> => {
      const { body } = await ctx.spotifyApi.getMyTopArtists();
      return body.items;
    }
  ),
  getArtistsByIds: protectedProcedure
    .input(z.object({ artistIds: z.array(z.string()) }))
    .query(async ({ ctx, input }): Promise<SpotifyApi.ArtistObjectFull[]> => {
      const { body } = await ctx.spotifyApi.getArtists(input.artistIds);

      return body.artists;
    }),
  getAudioFeaturesForTracks: protectedProcedure
    .input(z.object({ trackIds: z.array(z.string()) }))
    .query(
      async ({ ctx, input }): Promise<SpotifyApi.AudioFeaturesObject[]> => {
        const { body } = await ctx.spotifyApi.getAudioFeaturesForTracks(
          input.trackIds
        );

        return body.audio_features;
      }
    ),
});
