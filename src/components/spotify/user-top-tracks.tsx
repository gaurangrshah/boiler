import { cancelRetry } from '@/utils/';
import { trpc } from '@/utils/trpc';
import { VStack } from '@chakra-ui/react';
import { Track } from './track';
import { Widget } from './widget';

export type Artist = {
  details?: SpotifyApi.ArtistObjectFull;
  external_urls: SpotifyApi.ArtistObjectSimplified['external_urls'];
  href: SpotifyApi.ArtistObjectSimplified['href'];
  id: SpotifyApi.ArtistObjectSimplified['id'];
  name: SpotifyApi.ArtistObjectSimplified['name'];
  type: SpotifyApi.ArtistObjectSimplified['type'];
  uri: SpotifyApi.ArtistObjectSimplified['uri'];
};

export type Track = {
  album: SpotifyApi.AlbumObjectSimplified;
  artists: Artist[];
  available_markets?: SpotifyApi.TrackObjectFull['available_markets'];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: SpotifyApi.TrackObjectFull['external_ids'];
  external_urls: SpotifyApi.TrackObjectFull['external_urls'];
  href: string;
  id: string;
  is_local?: boolean | undefined;
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: SpotifyApi.TrackObjectFull['type'];
  uri: string;
  audioFeatures?: SpotifyApi.AudioFeaturesObject;
};

const mapTracks = (track: Track): JSX.Element => (
  <Track key={track.name} {...track} />
);

export const UserTopTracks: React.FC = (): JSX.Element => {
  const { data: topTracks } = trpc.spotify.myTopTracks.useQuery(undefined, {
    ...cancelRetry,
  });

  const artistIds = topTracks
    ?.map((track) => track.artists.map((artist) => artist?.id))
    .flat();

  const { data: artists } = trpc.spotify.getArtistsByIds.useQuery(
    {
      artistIds: artistIds?.length ? artistIds : [],
    },
    {
      enabled: !!artistIds?.length,
      ...cancelRetry,
    }
  );

  const trackIds = topTracks?.map((track) => track.id).flat();

  const { data: audioFeatures } =
    trpc.spotify.getAudioFeaturesForTracks.useQuery(
      { trackIds: trackIds?.length ? trackIds : [] },
      { enabled: !!trackIds?.length, ...cancelRetry }
    );

  const tracks = [
    ...new Set(
      topTracks?.map((track): Track => {
        track.artists = track.artists.map((tArtist) => ({
          ...tArtist,
          details: artists?.filter((artist) => artist.id === tArtist.id)[0],
        }));

        return {
          ...track,
          audioFeatures: audioFeatures?.filter(
            (feature) => feature.track_href === track.href
          )[0],
        };
      })
    ),
  ];

  console.log('tracks', tracks);
  return (
    <Widget title="Your Top Tracks">
      <VStack layerStyle="widget-col">
        {tracks?.length && tracks.map(mapTracks)}
      </VStack>
    </Widget>
  );
};
