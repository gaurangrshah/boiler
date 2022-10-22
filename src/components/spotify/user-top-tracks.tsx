import { cancelRetry } from '@/utils/';
import { trpc } from '@/utils/trpc';
import { chakra, VStack } from '@chakra-ui/react';

export const UserTopTracks: React.FC = ():JSX.Element => {
  const { data: topTracks } = trpc.spotify.myTopTracks.useQuery(undefined, {
    ...cancelRetry,
  });
  return (
    <VStack w="full" alignItems="flex-start" border="1px solid" p={4}>
      <chakra.h2 textAlign="center" fontSize="2xl" fontWeight={800}>
        Your Top Tracks
      </chakra.h2>
      {topTracks?.length &&
        topTracks.map((track) => (
          <p key={track.name}>
            {track.album.artists.map((artist) => artist.name).join(', ')}
            {' - '}
            {track.name}
          </p>
        ))}
    </VStack>
  );
};
